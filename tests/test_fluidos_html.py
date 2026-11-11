"""Offline checks of the fluids generator and its published reading page."""
import re
import subprocess
import sys
import tempfile
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
FOLDER = ROOT / 'fluidos'
GENERATOR = FOLDER / 'generar.py'
PAGE = FOLDER / 'index.html'


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.elements = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))


class GeneratorTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.source = self.root / 'contenido'
        self.source.mkdir()
        self.output = self.root / 'index.html'
        (self.source / '02.md').write_text('## Segundo {#segundo}\n\n### Otra {#otra}\n', encoding='utf-8')
        (self.source / '01.md').write_text('''## Primero {#primero}

### Título {#slug-único}

Texto $x^2$.

::: {.ejercicio #ejercicio-05}
Enunciado.

:::: {.resolucion #solucion-05}
::: {.aviso}
Atención.
:::
Respuesta.
::::
:::

| Dato | Valor |
| --- | --- |
| A | 1 |
''', encoding='utf-8')

    def run_generator(self, *args):
        return subprocess.run([sys.executable, '-B', str(GENERATOR), '--contenido', str(self.source),
                               '--salida', str(self.output), *args], text=True, capture_output=True)

    def test_build_preserves_ids_nesting_math_and_sorted_chapters(self):
        result = self.run_generator()
        self.assertEqual(result.returncode, 0, result.stderr)
        html = self.output.read_text(encoding='utf-8')
        self.assertLess(html.index('id="primero"'), html.index('id="segundo"'))
        self.assertIn('id="slug-único"', html)
        self.assertIn('href="#slug-único"', html)
        self.assertRegex(html, r'<div id="ejercicio-05" class="ejercicio">')
        self.assertRegex(html, r'<details id="solucion-05" class="resolucion"><summary>Ver resolución</summary>')
        self.assertRegex(html, r'(?s)<details id="solucion-05".*?<div class="aviso">.*?</div>\s*<p>Respuesta.</p>\s*</details>')
        self.assertIn('<math', html)
        self.assertIn('class="table-scroll"', html)

    def test_check_detects_stale_and_does_not_write(self):
        self.assertEqual(self.run_generator().returncode, 0)
        before = self.output.read_bytes()
        fresh = self.run_generator('--check')
        self.assertEqual(fresh.returncode, 0, fresh.stderr)
        (self.source / '02.md').write_text('## Cambiado {#segundo}\n', encoding='utf-8')
        stale = self.run_generator('--check')
        self.assertNotEqual(stale.returncode, 0)
        self.assertEqual(self.output.read_bytes(), before)

    def test_missing_asset_fails_without_modifying_output(self):
        self.assertEqual(self.run_generator().returncode, 0)
        before = self.output.read_bytes()
        (self.source / '02.md').write_text('## Segundo\n\n![Falta](no-existe.svg)\n', encoding='utf-8')
        result = self.run_generator()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('no-existe.svg', result.stderr)
        self.assertEqual(self.output.read_bytes(), before)


class PublishedPageTests(unittest.TestCase):
    def setUp(self):
        if not list((FOLDER / 'contenido').glob('*.md')):
            self.skipTest('Contenido real aún no disponible; falta generar el artefacto')
        self.assertTrue(PAGE.exists(), 'Ejecutar python3 fluidos/generar.py')
        self.html = PAGE.read_text(encoding='utf-8')
        self.page = Page(self.html)

    def test_shell_and_offline_math(self):
        self.assertIn('lang="es"', self.html)
        self.assertRegex(self.html, r'<title>.+</title>')
        for link in ('../teoria/teoria.css', '../teoria/lectura.js', 'fluidos.css'):
            self.assertIn(link, self.html)
        self.assertIn('<math', self.html)
        self.assertNotIn('katex', self.html.lower())
        self.assertIn('@media print', (FOLDER / 'fluidos.css').read_text(encoding='utf-8'))

    def test_links_ids_and_exercise_cards(self):
        ids = [attrs['id'] for _, attrs in self.page.elements if 'id' in attrs]
        self.assertEqual(len(ids), len(set(ids)))
        for tag, attrs in self.page.elements:
            if 'ejercicio' in attrs.get('class', '').split():
                self.assertEqual(tag, 'div')
                self.assertTrue(attrs.get('id'))
            if 'resolucion' in attrs.get('class', '').split():
                self.assertEqual(tag, 'details')
            for key in ('href', 'src'):
                if key not in attrs:
                    continue
                value = attrs[key]
                parsed = urlsplit(value)
                self.assertFalse(parsed.scheme or parsed.netloc, value)
                target = FOLDER / unquote(parsed.path) if parsed.path else PAGE
                self.assertTrue(target.exists(), value)
                if not parsed.path and parsed.fragment:
                    self.assertIn(unquote(parsed.fragment), ids, value)

    def test_artifact_fresh(self):
        result = subprocess.run([sys.executable, '-B', str(GENERATOR), '--check'],
                                text=True, capture_output=True)
        self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == '__main__':
    unittest.main()
