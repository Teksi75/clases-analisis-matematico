"""Comprobar geometría física y publicación de los gráficos de flotación."""
import re
import unittest
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
FLUIDOS = ROOT / 'fluidos'
NS = '{http://www.w3.org/2000/svg}'


class FlotacionGraficosTests(unittest.TestCase):
    def figura(self, section, name, words):
        html = (FLUIDOS / 'index.html').read_text(encoding='utf-8')
        block = html.split(f'id="{section}"', 1)[1].split('<h3', 1)[0]
        match = re.search(r'<img\s+([^>]+)>\s*<figcaption\b[^>]*>(.*?)</figcaption>', block, re.S)
        self.assertIsNotNone(match)
        attrs, caption = match.groups()
        self.assertIn(f'src="graficos/{name}"', attrs)
        alt = re.search(r'alt="([^"]+)"', attrs).group(1)
        for word in words:
            self.assertIn(word.casefold(), alt.casefold())
            self.assertIn(word.casefold(), caption.casefold())
        root = ET.parse(FLUIDOS / 'graficos' / name).getroot()
        self.assertFalse(any('transform' in node.attrib for node in root.iter()))
        return root, {node.get('id'): node for node in root.iter() if node.get('id')}

    def force(self, e, name, up):
        line, tip = e[name], e[name + '-punta']
        x1, y1, x2, y2 = (float(line.get(k)) for k in ('x1', 'y1', 'x2', 'y2'))
        self.assertEqual(x1, x2)
        self.assertEqual(y2 < y1, up)
        points = [tuple(map(float, point.split(','))) for point in tip.get('points').split()]
        self.assertIn((x2, y2), points)
        self.assertTrue(all((y > y2) == up for x, y in points if (x, y) != (x2, y2)))
        return abs(y2 - y1)

    def test_hielo_geometria_y_publicacion(self):
        _, e = self.figura('cap-6-flotacion', 'hielo-en-agua.svg',
                            ('hielo', 'superficie', '91,7', 'volumen'))
        body, waterline = e['hielo'], e['superficie']
        top, height = float(body.get('y')), float(body.get('height'))
        level = float(waterline.get('y1'))
        self.assertEqual(level, float(waterline.get('y2')))
        self.assertGreater(level, top)
        self.assertLess(level, top + height)
        self.assertAlmostEqual((top + height - level) / height, 0.917, places=3)
        submerged = e['hielo-sumergido']
        self.assertEqual(float(submerged.get('y')), level)
        self.assertAlmostEqual(float(submerged.get('height')), top + height - level)
        self.assertEqual(submerged.get('width'), body.get('width'))
        self.assertEqual(submerged.get('x'), body.get('x'))

    def test_flotacion_fuerzas_y_apoyo(self):
        root, e = self.figura('cap-6-tres-casos', 'equilibrio-y-apoyo.svg',
                              ('parcialmente', 'neutro', 'apoyo', 'reacción'))
        for case in ('flota', 'neutro', 'apoyo'):
            empuje = self.force(e, case + '-empuje', True)
            peso = self.force(e, case + '-peso', False)
            if case == 'apoyo':
                normal = self.force(e, case + '-normal', True)
                self.assertGreater(normal, 0)
                self.assertAlmostEqual(empuje + normal, peso)
                self.assertLess(empuje, peso)
            else:
                self.assertEqual(empuje, peso)
        level = float(e['nivel'].get('y1'))
        self.assertEqual(level, float(e['nivel'].get('y2')))
        for case in ('flota', 'neutro', 'apoyo'):
            body = e[case + '-cuerpo']
            top, bottom = float(body.get('y')), float(body.get('y')) + float(body.get('height'))
            self.assertLess(top, level) if case == 'flota' else self.assertGreater(top, level)
            self.assertGreater(bottom, level)
        supported = e['apoyo-cuerpo']
        support = e['apoyo-punto']
        self.assertEqual(float(supported.get('y')) + float(supported.get('height')), float(support.get('cy')) - float(support.get('r')))
        self.assertLess(2 * float(support.get('r')), float(supported.get('width')) / 4)
        labels = ' '.join(''.join(n.itertext()) for n in root.iter(NS + 'text'))
        for text in ('ρc < ρf', 'ρc = ρf', 'ρc > ρf', 'E + N = W'):
            self.assertIn(text, labels)

    def test_estabilidad_centros_inclinacion_y_par(self):
        root, e = self.figura('cap-7-sumergido', 'estabilidad-sumergido.svg',
                              ('estable', 'inestable', 'indiferente', 'empuje', 'peso'))
        for case in ('estable', 'inestable', 'indiferente'):
            g, b = e[case + '-g'], e[case + '-b']
            gx, gy, bx, by = (float(g.get('cx')), float(g.get('cy')), float(b.get('cx')), float(b.get('cy')))
            axis = e[case + '-eje']
            ax, ay, ex, ey = (float(axis.get(k)) for k in ('x1', 'y1', 'x2', 'y2'))
            self.assertLess(ax, ex)
            for x, y in ((gx, gy), (bx, by)):
                self.assertAlmostEqual((x - ax) * (ey - ay), (y - ay) * (ex - ax))
            if case == 'estable':
                self.assertLess(by, gy)
                self.assertLess(bx, gx)  # par horario devuelve el eje inclinado hacia la vertical
            elif case == 'inestable':
                self.assertGreater(by, gy)
                self.assertGreater(bx, gx)  # par antihorario aumenta la inclinación
            else:
                self.assertEqual((gx, gy), (bx, by))
            self.assertEqual(self.force(e, case + '-empuje', True), self.force(e, case + '-peso', False))
            for force, x, y in (('empuje', bx, by), ('peso', gx, gy)):
                arrow = e[case + '-' + force]
                self.assertEqual((float(arrow.get('x1')), float(arrow.get('y1'))), (x, y))
        labels = ' '.join(''.join(n.itertext()) for n in root.iter(NS + 'text'))
        for text in ('Estable', 'Inestable', 'Indiferente', 'E = W', 'orientación'):
            self.assertIn(text, labels)

    def test_preserva_ecuaciones_recursos_y_lector(self):
        html = (FLUIDOS / 'index.html').read_text(encoding='utf-8')
        for fragment in ('graficos/presion-media.svg', 'graficos/vasos-y-capas.svg',
                         'graficos/escalas-de-presion.svg', 'graficos/prensa-hidraulica.svg',
                         '../diagramas/08.svg', 'E=\\rho_{f}\\,g\\,V_{desplazado}=\\gamma_{f}\\,V_{desplazado}',
                         '\\frac{V_{sumergido}}{V_{total}}=\\frac{\\rho_{c}}{\\rho_{f}}',
                         'GM=BM-BG', 'class="reading-controls"', 'src="lector.js"',
                         'id="cap-3-presion-no-es-fuerza"'):
            self.assertIn(fragment, html)


if __name__ == '__main__':
    unittest.main()
