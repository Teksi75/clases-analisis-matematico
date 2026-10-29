"""Integración local y regeneración reproducible de los exámenes Stewart."""
import subprocess
import sys
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
DIR = ROOT / 'evaluaciones/stewart'
EXAMS = ('algebra', 'geometria', 'funciones', 'trigonometria')


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.links, self.ids, self.navs = [], [], 0
        self.lang = None
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html':
            self.lang = attrs.get('lang')
        if tag == 'nav' and attrs.get('aria-label'):
            self.navs += 1
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for attr in ('href', 'src'):
            if attr in attrs and tag in ('a', 'link', 'img', 'image', 'script'):
                self.links.append(attrs[attr])


class Integracion(unittest.TestCase):
    def test_exams_do_not_publish_book_keys_or_errata(self):
        for name in EXAMS:
            with self.subTest(page=name):
                html = (DIR / (name + '.html')).read_text(encoding='utf-8')
                doc = Page(html)
                self.assertNotIn('respuestas-del-libro', doc.ids)
                self.assertNotIn('#respuestas-del-libro', doc.links)
                self.assertFalse('respuestas del libro' in html.lower())
                self.assertFalse('errata' in html.lower())

    def test_internal_reference_preserves_keys_and_errata(self):
        reference = ROOT / 'odd/referencias/stewart-claves-y-erratas.md'
        self.assertTrue(reference.is_file())
        text = reference.read_text(encoding='utf-8')
        for excerpt in ('no publicado', 'Álgebra', 'Geometría', 'Funciones', 'Trigonometría',
                        'Errata de la clave, 5(c):', 'errata de rotulación',
                        'Errata de la consigna:', 'Errata de signo:',
                        r'$-\frac{1}{15}(4+6\sqrt2)$', '«03»'):
            with self.subTest(excerpt=excerpt):
                self.assertIn(excerpt, text)
        for name in ('index', *EXAMS):
            doc = Page((DIR / (name + '.html')).read_text(encoding='utf-8'))
            self.assertFalse(any('stewart-claves-y-erratas' in link for link in doc.links))

    def test_navigation_local_links_and_source_graphs(self):
        for name in ('index', *EXAMS):
            with self.subTest(page=name):
                path = DIR / (name + '.html')
                doc = Page(path.read_text(encoding='utf-8'))
                self.assertEqual(doc.lang, 'es')
                self.assertGreaterEqual(doc.navs, 1)
                self.assertEqual(len(doc.ids), len(set(doc.ids)))
                for link in doc.links:
                    parsed = urlsplit(link)
                    self.assertFalse(parsed.scheme or parsed.netloc, link)
                    target = path.parent / unquote(parsed.path) if parsed.path else path
                    self.assertTrue(target.is_file(), link)
                    if parsed.fragment and target.suffix == '.html':
                        self.assertIn(unquote(parsed.fragment), Page(target.read_text(encoding='utf-8')).ids, link)
                links = set(doc.links)
                if name == 'index':
                    for exam in EXAMS:
                        self.assertIn(exam + '.html', links)
                else:
                    self.assertIn('index.html', links)
                    self.assertNotIn('#respuestas-del-libro', links)
                    self.assertIn('stewart.css', links)
        self.assertTrue((DIR / 'funciones-assets/pagina-025.png').is_file())
        self.assertIn('funciones-assets/pagina-025.png', Page((DIR / 'funciones.html').read_text(encoding='utf-8')).links)

    def test_readmes_link_stewart_without_replacing_existing_diagnostics(self):
        root = (ROOT / 'README.md').read_text(encoding='utf-8')
        knowledge = (ROOT / 'conocimiento/README.md').read_text(encoding='utf-8')
        self.assertIn('evaluaciones/diagnosticos/index.html', root)
        self.assertIn('evaluaciones/stewart/index.html', root)
        self.assertIn('../evaluaciones/stewart/index.html', knowledge)

    def test_trigonometria_conserva_etiquetas_de_incisos(self):
        html = (DIR / 'trigonometria.html').read_text(encoding='utf-8')
        for number in (1, 2, 4, 7):
            section = html.split(f'id="ejercicio-{number}"', 1)[1].split('<h3', 1)[0]
            self.assertIn('(a)', section, number)
            self.assertIn('(b)', section, number)
            self.assertNotIn('<ol type="a">', section, number)

    def test_regeneration_check(self):
        result = subprocess.run([sys.executable, str(DIR / 'generar.py'), '--check'],
                                capture_output=True, text=True, cwd=ROOT)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)


if __name__ == '__main__':
    unittest.main()
