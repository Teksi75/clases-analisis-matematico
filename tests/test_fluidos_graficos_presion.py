"""Regresiones públicas de la figura didáctica de presión media."""
import re
import unittest
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
FLUIDOS = ROOT / 'fluidos'
PAGE = FLUIDOS / 'index.html'
FIGURE = FLUIDOS / 'graficos/presion-media.svg'
SVG = '{http://www.w3.org/2000/svg}'


class PresionMediaTests(unittest.TestCase):
    def test_pagina_publica_figura_local_con_descripcion_util(self):
        html = PAGE.read_text(encoding='utf-8')
        section = html.split('id="cap-3-definicion"', 1)[1].split('<h3', 1)[0]
        match = re.search(r'<figure>\s*<img\s+([^>]+)>\s*<figcaption\b[^>]*>(.*?)</figcaption>', section, re.S)
        self.assertIsNotNone(match, 'La presión media debe tener una figura con pie')
        attrs, caption = match.groups()
        self.assertIn('src="graficos/presion-media.svg"', attrs)
        alt = re.search(r'alt="([^"]+)"', attrs)
        self.assertIsNotNone(alt)
        for term in ('perpendicular', 'superficie', 'área A', 'vista lateral'):
            self.assertIn(term.casefold(), alt.group(1).casefold())
            self.assertIn(term.casefold(), caption.casefold())
        self.assertTrue(FIGURE.is_file())

    def test_fuerza_normal_termina_en_superficie_de_area(self):
        self.assertTrue(FIGURE.is_file(), 'Falta la figura didáctica de presión media')
        root = ET.parse(FIGURE).getroot()
        elements = {node.get('id'): node for node in root.iter() if node.get('id')}
        surface, force, arrow = (elements[name] for name in ('superficie', 'fuerza-normal', 'punta-normal'))
        self.assertEqual(surface.tag, SVG + 'line')
        self.assertEqual(force.tag, SVG + 'line')
        self.assertEqual(arrow.tag, SVG + 'polygon')
        # Sin transformaciones, las coordenadas de los elementos son directamente comparables.
        self.assertFalse(any('transform' in node.attrib for node in root.iter()))
        x1, y1, x2, y2 = (float(surface.get(k)) for k in ('x1', 'y1', 'x2', 'y2'))
        fx1, fy1, fx2, fy2 = (float(force.get(k)) for k in ('x1', 'y1', 'x2', 'y2'))
        self.assertGreater(x2 - x1, 0)
        self.assertEqual(y1, y2)
        self.assertEqual(fx1, fx2)  # perpendicular a la superficie horizontal
        self.assertLess(fy1, fy2)  # dirigida hacia la superficie
        self.assertEqual(fy2, y1)
        self.assertLess(x1, fx2)
        self.assertLess(fx2, x2)
        points = [tuple(map(float, pair.split(','))) for pair in arrow.get('points').split()]
        self.assertEqual(len(points), 3)
        self.assertIn((fx2, fy2), points)  # la punta toca la superficie
        base = [point for point in points if point != (fx2, fy2)]
        self.assertEqual(len(base), 2)
        self.assertTrue(all(y < fy2 for _, y in base))
        self.assertLess(min(x for x, _ in base), fx2)
        self.assertGreater(max(x for x, _ in base), fx2)
        labels = ' '.join(''.join(node.itertext()) for node in root.iter(SVG + 'text'))
        self.assertIn('F⊥', labels)
        self.assertIn('área A', labels)
        self.assertIn('vista lateral', labels)

    def test_preserva_contenido_formula_y_controles_del_lector(self):
        html = PAGE.read_text(encoding='utf-8')
        section = html.split('<h3 id="cap-3-presion-no-es-fuerza">', 1)[1].split('<h3', 1)[0]
        self.assertNotIn('class="ampliacion"', section)
        self.assertIn('F_\\perp=pA', section)
        self.assertIn('Un clavo penetra', section)
        self.assertIn('raquetas de nieve', section)
        self.assertIn('p=\\frac{F_\\perp}{A}', html)
        self.assertIn('href="#cap-3-presion-no-es-fuerza"', html)
        self.assertIn('class="reading-controls"', html)
        self.assertIn('src="lector.js"', html)


if __name__ == '__main__':
    unittest.main()
