"""Contracts on the generated offline reading interface, not implementation internals."""
import re
import unittest
import xml.etree.ElementTree as ET
from pathlib import Path

FOLDER = Path(__file__).resolve().parents[1] / 'teoria'


class ReadingUXTests(unittest.TestCase):
    def setUp(self):
        self.html = (FOLDER / 'index.html').read_text()
        self.css = (FOLDER / 'teoria.css').read_text()

    def test_native_navigation_and_progressive_enhancement(self):
        self.assertRegex(self.html, r'<details class="contents-disclosure">\s*<summary>Índice de lectura</summary>')
        self.assertIn('class="chapter-shortcuts"', self.html)
        self.assertIn('id="tema-actual"', self.html)
        self.assertEqual(re.findall(r'<script[^>]*src="([^"]+)"[^>]*></script>', self.html), ['lectura.js'])
        js = (FOLDER / 'lectura.js').read_text()
        for token in ['IntersectionObserver', 'aria-current', 'tema-actual', 'matchMedia']:
            self.assertIn(token, js)
        self.assertNotRegex(js, r'localStorage|sessionStorage|fetch\(|XMLHttpRequest|scrollIntoView|\.focus\(')
        self.assertIn('a[aria-current="location"]', self.css)

    def test_cover_identifies_etec_with_requested_wording(self):
        for text in [self.html, (FOLDER / 'plantilla.html').read_text()]:
            heading = re.search(r'<section class="hero"[^>]*>\s*<div class="eyebrow">([^<]+)</div>', text)[1]
            self.assertEqual(heading, 'Teoría de matemática para ETec')

    def test_cover_label_describes_the_site_without_limiting_future_topics(self):
        for text in [self.html, (FOLDER / 'plantilla.html').read_text()]:
            banner = re.search(r'<div class="edition-line">(.*?)</div>', text, re.S)[1]
            self.assertIn('Apuntes de Matemática · Nivel secundario', banner)
            self.assertNotIn('Lectura sin conexión', banner)
            self.assertNotIn('Sin derivadas', banner)

    def test_active_topic_has_larger_heavier_type(self):
        active = re.search(r'\.contents a\[aria-current="location"\]\s*\{([^}]+)\}', self.css)[1]
        normal = re.search(r'\.contents\s*\{([^}]+)\}', self.css)[1]
        active_size = re.search(r'font-size:\s*([\d.]+)rem', active)
        self.assertIsNotNone(active_size, 'The active topic needs its own larger type size')
        normal_size = re.search(r'font-size:\s*([\d.]+)rem', normal)
        self.assertGreater(float(active_size[1]), float(normal_size[1]))
        self.assertRegex(active, r'font-weight:\s*(?:[6-9]\d\d|bold)')

    def test_restrained_hierarchy_and_print(self):
        for kind in ['idea', 'ejemplo', 'advertencia']:
            self.assertIn('class="reading-note ' + kind + '"', self.html)
        self.assertIn('data-generated="label"', self.html)
        self.assertIn('prefers-reduced-motion', self.css)
        self.assertIn('.contents-disclosure', self.css)
        self.assertIn('.study-figure', self.css.split('@media print')[-1])
        self.assertNotRegex(self.html, r'<details(?! class="contents-disclosure")')

    def test_mathematical_figures_are_labelled_and_sampled(self):
        figures = {ET.fromstring(svg).attrib['id']: ET.fromstring(svg) for svg in
                   re.findall(r'<svg class="study-plot".*?</svg>', self.html, re.S)}
        self.assertEqual(set(figures), {'parabola', 'limite-punto', 'hueco', 'salto', 'asintota'})
        formulas = {
            'parabola': lambda x: -(x-45)**2/135+15,
            'limite-punto': lambda x: 2*x+1,
            'hueco': lambda x: x+2,
            'salto': lambda x: x+2 if x < 1 else x*x,
            'asintota': lambda x: 1/(x-1),
        }
        for name, svg in figures.items():
            with self.subTest(figure=name):
                self.assertEqual(svg.attrib['role'], 'img')
                self.assertIsNotNone(svg.find('title'))
                self.assertIsNotNone(svg.find('desc'))
                paths = svg.findall('.//path[@data-samples]')
                self.assertTrue(paths)
                xmin, xmax, ymin, ymax = map(float, svg.attrib['data-domain'].split())
                for path in paths:
                    samples = [tuple(map(float, pair.split(','))) for pair in path.attrib['data-samples'].split()]
                    coords = re.findall(r'[ML]([\d.]+),([\d.]+)', path.attrib['d'])
                    self.assertEqual(len(samples), len(coords))
                    for (x, y), (px, py) in zip(samples, coords):
                        self.assertAlmostEqual(y, formulas[name](x), places=4)
                        self.assertAlmostEqual(float(px), 52+(x-xmin)*340/(xmax-xmin), places=2)
                        self.assertAlmostEqual(float(py), 225-(y-ymin)*175/(ymax-ymin), places=2)
        for label in ['(0,0)', '(90,0)', '(45,15)', '(2,5)', '(2,9)', '(2,4)', '(1,3)', '(1,1)', 'x = 1', 'distancia x (m)', 'altura h(x) (m)', 'izquierda', 'derecha']:
            self.assertIn(label, self.html)
        self.assertRegex(self.html, r'class="point open"[^>]*data-point="2,5"')
        self.assertRegex(self.html, r'class="point filled"[^>]*data-point="2,9"')
        self.assertRegex(self.html, r'class="point open"[^>]*data-point="2,4"')
        self.assertRegex(self.html, r'class="point filled"[^>]*data-point="1,3"')
        self.assertRegex(self.html, r'class="point open"[^>]*data-point="1,1"')
        self.assertIn('class="asymptote"', self.html)


if __name__ == '__main__':
    unittest.main()
