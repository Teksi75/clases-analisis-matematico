"""Reglas estructurales del examen de funciones publicado sin conexión."""
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / 'evaluaciones/stewart/funciones.html'
SOURCE = ROOT / 'evaluaciones/stewart/funciones.md'


class Document(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.links = []
        self.text = []
        self.lang = None
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html':
            self.lang = attrs.get('lang')
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for key in ('href', 'src'):
            if key in attrs:
                self.links.append(attrs[key])

    def handle_data(self, data):
        self.text.append(data)


class FuncionesTests(unittest.TestCase):
    def test_page_and_editable_source_exist(self):
        self.assertTrue(SOURCE.is_file())
        self.assertTrue(PAGE.is_file())

    def test_exercises_have_immediate_teacher_developments_and_final_answers(self):
        html = PAGE.read_text(encoding='utf-8')
        headings = re.findall(r'<h[23][^>]*>(.*?)</h[23]>', html, re.S)
        headings = [re.sub('<[^>]+>', '', h).strip() for h in headings]
        expected = []
        for number in range(1, 8):
            expected.extend([f'Ejercicio {number}', 'Desarrollo docente'])
        expected.append('Respuestas del libro')
        expected.extend(f'Respuesta {n}' for n in range(1, 8))
        self.assertEqual(headings, expected)

    def test_subparts_and_source_graphs_are_present(self):
        source = SOURCE.read_text(encoding='utf-8')
        counts = [5, 0, 3, 3, 8, 2, 3]
        for n, count in enumerate(counts, 1):
            exercise = source.split(f'## Ejercicio {n}\n', 1)[1].split('### Desarrollo docente', 1)[0]
            for letter in 'abcdefgh'[:count]:
                self.assertIn(f'**({letter})**', exercise, (n, letter))
        html = PAGE.read_text(encoding='utf-8')
        self.assertIn('Gráfica original del ejercicio 1', html)
        self.assertIn('Gráficas originales de las respuestas 5 y 6', html)
        self.assertIn('Errata', html)

    def test_offline_spanish_and_mathml(self):
        html = PAGE.read_text(encoding='utf-8')
        doc = Document(html)
        self.assertEqual(doc.lang, 'es')
        self.assertEqual(len(doc.ids), len(set(doc.ids)))
        self.assertIn('<math', html)
        self.assertIn('<mfrac>', html)
        self.assertIn('application/x-tex', html)
        self.assertNotRegex(html, r'<script\b')
        for link in doc.links:
            parsed = urlsplit(link)
            self.assertFalse(parsed.scheme or parsed.netloc, link)
            if parsed.path:
                self.assertTrue((PAGE.parent / parsed.path).exists(), link)
            elif parsed.fragment:
                self.assertIn(parsed.fragment, doc.ids)


if __name__ == '__main__':
    unittest.main()
