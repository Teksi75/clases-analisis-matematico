"""Public artifact checks for the TP2 solution and its reading entry points."""
import re
import struct
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / 'evaluaciones/tp2.html'


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.elements, self.words = [], []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))

    def handle_data(self, data):
        self.words.extend(data.split())


class TP2HTMLTests(unittest.TestCase):
    def setUp(self):
        self.html = PAGE.read_text()
        self.page = Page(self.html)

    def test_precise_separate_graphs_keep_the_whole_source_panel(self):
        images = {attrs['src']: attrs for tag, attrs in self.page.elements if tag == 'img'}
        for name in ('funcion-roja', 'funcion-verde', 'funcion-azul'):
            src = 'tp2-assets/' + name + '.png'
            self.assertIn(src, images)
            data = (PAGE.parent / src).read_bytes()
            self.assertEqual(data[:8], b'\x89PNG\r\n\x1a\n')
            width, height = struct.unpack('>II', data[16:24])
            self.assertGreater(width, 600)
            self.assertEqual(height, 728, 'Keep the full height of the embedded graph, not a page crop')
            self.assertTrue(images[src].get('alt'))
        combined = (PAGE.parent / 'tp2-assets/ej1-graficos.png').read_bytes()
        self.assertEqual(struct.unpack('>II', combined[16:24]), (2694, 728))

    def test_no_redundant_reading_instructions_or_duplicate_title(self):
        self.assertNotIn('Cómo leer esta resolución', self.html)
        self.assertNotIn('Cómo usar esta página', self.html)
        self.assertEqual(len(re.findall(r'<h1\b', self.html)), 1)
        self.assertNotIn('eva1-page', self.html)

    def test_each_graph_point_has_all_five_observables(self):
        for name, points in [('roja', ['0', '2']),
                             ('verde', ['0', '3']), ('azul', ['-3', '0', '1', '4'])]:
            match = re.search(r'<table\b[^>]*id="datos-' + name + r'"[^>]*>(.*?)</table>', self.html, re.S)
            self.assertIsNotNone(match, name)
            rows = re.findall(r'<tr\b[^>]*>(.*?)</tr>', match[1], re.S)
            self.assertEqual(len(rows), len(points) + 1)
            for point, row in zip(points, rows[1:]):
                cells = re.findall(r'<td\b[^>]*>(.*?)</td>', row, re.S)
                self.assertEqual(len(cells), 7)
                self.assertEqual(' '.join(Page(cells[0]).words), point)
                self.assertTrue(all(Page(cell).words for cell in cells))
                self.assertRegex(' '.join(Page(cells[6]).words), r'^\d+(, \d+)*$')
        red = re.search(r'<table\b[^>]*id="datos-roja"[^>]*>.*?</table>', self.html, re.S)[0]
        self.assertNotIn('>-8<', red, 'A point outside the drawn region cannot be a table row')
        self.assertIn('bajo el eje', ' '.join(self.page.words))
        self.assertIn('aproximaciones', ' '.join(self.page.words))
        self.assertNotIn('h(x)≈-1', self.html)

    def test_item_key_answers_all_twenty_four_requests(self):
        match = re.search(r'<table\b[^>]*id="resumen-items"[^>]*>(.*?)</table>', self.html, re.S)
        self.assertIsNotNone(match, 'Missing the answer key in TP item order')
        rows = re.findall(r'<tr\b[^>]*>(.*?)</tr>', match[1], re.S)
        self.assertEqual(len(rows), 25)
        numbers = [' '.join(Page(re.findall(r'<t[dh]\b[^>]*>(.*?)</t[dh]>', row, re.S)[0]).words)
                   for row in rows[1:]]
        self.assertEqual(numbers, [str(number) for number in range(1, 25)])
        self.assertNotIn('Ítems del TP:', self.html)
        self.assertIn('fuera del tramo dibujado', ' '.join(self.page.words))

    def test_reuses_theory_components_and_keeps_offline_math(self):
        self.assertIn('href="../teoria/teoria.css"', self.html)
        self.assertIn('src="../teoria/lectura.js"', self.html)
        for cls in ('hero', 'reading-layout', 'contents-disclosure', 'reading-controls', 'study-figure'):
            self.assertIn('class="' + cls + '"', self.html)
        self.assertGreater(self.html.count('<math'), 40)
        self.assertIn('annotation encoding="application/x-tex"', self.html)
        self.assertNotRegex(self.html, r'<(?:script|link|img)[^>]+(?:href|src)="https?://')

    def test_links_are_valid_and_the_solution_is_discoverable(self):
        ids = [attrs['id'] for _, attrs in self.page.elements if 'id' in attrs]
        self.assertEqual(len(ids), len(set(ids)))
        for tag, attrs in self.page.elements:
            value = attrs.get('href') if tag in ('a', 'link') else attrs.get('src')
            if not value:
                continue
            parsed = urlsplit(value)
            if parsed.scheme:
                continue
            target = PAGE.parent / unquote(parsed.path) if parsed.path else PAGE
            self.assertTrue(target.exists(), value)
            if parsed.fragment and target.suffix == '.html':
                target_ids = {a['id'] for _, a in Page(target.read_text()).elements if 'id' in a}
                self.assertIn(unquote(parsed.fragment), target_ids, value)
        for source in ('README.md', 'conocimiento/02-limites.md', 'teoria/02-limites.md', 'teoria/index.html'):
            self.assertIn('evaluaciones/tp2.html', (ROOT / source).read_text(), source)
        for anchor in ('#limites', '#funciones', '#limites-factorizar-sin-perder-restricciones'):
            self.assertIn('../teoria/index.html' + anchor, self.html)


if __name__ == '__main__':
    unittest.main()
