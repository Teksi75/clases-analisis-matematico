"""Relaciones físicas y publicación de los diagramas didácticos de hidrostática."""
import re
import unittest
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
FLUIDOS = ROOT / 'fluidos'
SVG = '{http://www.w3.org/2000/svg}'


class HidrostaticaGraficosTests(unittest.TestCase):
    def figura(self, section_id, filename, terms):
        html = (FLUIDOS / 'index.html').read_text(encoding='utf-8')
        section = html.split(f'id="{section_id}"', 1)[1].split('<h3', 1)[0]
        match = re.search(r'<img\s+([^>]+)>\s*<figcaption\b[^>]*>(.*?)</figcaption>', section, re.S)
        self.assertIsNotNone(match)
        attrs, caption = match.groups()
        self.assertIn(f'src="graficos/{filename}"', attrs)
        alt = re.search(r'alt="([^"]+)"', attrs)
        self.assertIsNotNone(alt)
        for term in terms:
            self.assertIn(term.casefold(), alt.group(1).casefold())
            self.assertIn(term.casefold(), caption.casefold())
        root = ET.parse(FLUIDOS / 'graficos' / filename).getroot()
        self.assertFalse(any('transform' in node.attrib for node in root.iter()))
        return root, {node.get('id'): node for node in root.iter() if node.get('id')}

    def test_vasos_misma_profundidad_y_aportes_de_capas(self):
        root, e = self.figura('cap-4-paradoja', 'vasos-y-capas.svg',
                              ('mismo líquido', 'misma profundidad', 'presión superficial', 'capas', 'espesor'))
        surfaces = [e[f'superficie-{i}'] for i in (1, 2, 3)]
        bottoms = [e[f'fondo-{i}'] for i in (1, 2, 3)]
        self.assertEqual(len({s.get('y1') for s in surfaces}), 1)
        self.assertEqual(len({b.get('y1') for b in bottoms}), 1)
        for surface, bottom in zip(surfaces, bottoms):
            self.assertEqual(surface.get('y1'), surface.get('y2'))
            self.assertEqual(bottom.get('y1'), bottom.get('y2'))
            self.assertLess(float(surface.get('y1')), float(bottom.get('y1')))
        self.assertGreater(len({float(b.get('x2')) - float(b.get('x1')) for b in bottoms}), 1)
        layers = [e[f'capa-{i}'] for i in (1, 2, 3)]
        for upper, lower in zip(layers, layers[1:]):
            self.assertEqual(float(upper.get('y')) + float(upper.get('height')), float(lower.get('y')))
        self.assertEqual(len({float(layer.get('height')) for layer in layers}), 3)
        labels = ' '.join(''.join(node.itertext()) for node in root.iter(SVG + 'text'))
        for term in ('p₀', 'γ₁', 'γ₂', 'γ₃', 'h₁', 'h₂', 'h₃', 'p₀ + γ₁h₁ + γ₂h₂ + γ₃h₃'):
            self.assertIn(term, labels)

    def test_escalas_referencias_y_presion_manometrica_negativa(self):
        root, e = self.figura('cap-4-escalas', 'escalas-de-presion.svg',
                              ('vacío', 'atmosférica local', 'manométrica negativa', 'absoluta'))
        vacuum, atmosphere, sample = (float(e[name].get('y1')) for name in ('vacio', 'atmosfera', 'ejemplo'))
        self.assertGreater(vacuum, atmosphere)
        self.assertLess(sample, atmosphere)
        negative = e['rango-negativo']
        self.assertEqual(float(negative.get('y1')), atmosphere)
        self.assertEqual(float(negative.get('y2')), vacuum)
        labels = ' '.join(''.join(node.itertext()) for node in root.iter(SVG + 'text'))
        for term in ('p_abs = p_atm + p_man', 'vacío', 'atmosférica local', 'negativa'):
            self.assertIn(term, labels)
        self.assertNotIn('101325', labels)
        self.assertNotIn('101 325', labels)

    def test_prensa_fuerzas_areas_y_nivel(self):
        root, e = self.figura('cap-5-prensa', 'prensa-hidraulica.svg',
                              ('aplicada', 'fluido', 'émbolo', 'área', 'mismo nivel', 'ideal'))
        small, large = e['piston-1'], e['piston-2']
        self.assertLess(float(small.get('width')), float(large.get('width')))
        self.assertEqual(float(small.get('y')) + float(small.get('height')),
                         float(large.get('y')) + float(large.get('height')))
        for name, piston, down in (('fuerza-entrada', small, True), ('fuerza-salida', large, False)):
            force, tip = e[name], e[name + '-punta']
            x1, y1, x2, y2 = (float(force.get(k)) for k in ('x1', 'y1', 'x2', 'y2'))
            self.assertEqual(x1, x2)
            self.assertEqual(y1 < y2, down)
            self.assertLess(float(piston.get('x')), x2)
            self.assertLess(x2, float(piston.get('x')) + float(piston.get('width')))
            points = [tuple(map(float, point.split(','))) for point in tip.get('points').split()]
            self.assertIn((x2, y2), points)
            self.assertTrue(all((y < y2) == down for x, y in points if (x, y) != (x2, y2)))
        labels = ' '.join(''.join(node.itertext()) for node in root.iter(SVG + 'text'))
        for term in ('F₁', 'F₂', 'A₁', 'A₂', 'fluido', 'F₁/A₁ = F₂/A₂', 'mismo nivel', 'ideal'):
            self.assertIn(term, labels)

    def test_prensa_flecha_de_salida_mayor_que_entrada(self):
        _, e = self.figura('cap-5-prensa', 'prensa-hidraulica.svg',
                           ('aplicada', 'fluido', 'mismo nivel'))
        self.assertGreater(float(e['piston-2'].get('width')), float(e['piston-1'].get('width')))
        entrada, salida = e['fuerza-entrada'], e['fuerza-salida']
        largo_entrada = abs(float(entrada.get('y2')) - float(entrada.get('y1')))
        largo_salida = abs(float(salida.get('y2')) - float(salida.get('y1')))
        self.assertGreater(largo_entrada, 0)
        self.assertGreaterEqual(largo_salida, 1.5 * largo_entrada,
                                'La fuerza de salida debe verse claramente mayor que la entrada')

    def test_preserva_presion_ecuaciones_y_lector(self):
        html = (FLUIDOS / 'index.html').read_text(encoding='utf-8')
        for fragment in ('graficos/presion-media.svg', 'p=p_0+\\rho g h=p_0+\\gamma h',
                         'p=p_0+\\sum_{i=1}^{n}\\rho_i g h_i=p_0+\\sum_{i=1}^{n}\\gamma_i h_i',
                         'p_{abs}=p_{man}+p_{atm}', '\\frac{F_1}{A_1}=\\frac{F_2}{A_2}',
                         'class="reading-controls"', 'src="lector.js"', 'href="#cap-5-prensa"'):
            self.assertIn(fragment, html)


if __name__ == '__main__':
    unittest.main()
