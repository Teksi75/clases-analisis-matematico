"""Contrato público del diagnóstico de Trigonometría."""
import re
import unittest
from pathlib import Path
from test_stewart_piloto import Node, Tree, nodes, normalized, tex

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / 'evaluaciones/stewart/trigonometria.html'
STATEMENTS = {
    1: ("Convierta de grados a radianes.", [r'300^\circ', r'-18^\circ']),
    2: ("Convierta de radianes a grados.", [r'5\pi/6', '2']),
    3: ("Encuentre la longitud de un arco de círculo con radio de 12 cm si el arco subtiende un ángulo central de", [r'30^\circ']),
    4: ("Encuentre los valores exactos.", [r'\tan(\pi/3)', r'\operatorname{sen}(7\pi/6)', r'\sec(5\pi/3)']),
    5: ("Exprese las longitudes", ['a', 'b', r'\theta']),
    6: ("Si", [r'\operatorname{sen}x=\frac13', r'\sec y=\frac54', 'x', 'y', '0', r'\pi/2', r'\operatorname{sen}(x+y)']),
    7: ("Demuestre las identidades.", [r'\tan\theta\operatorname{sen}\theta+\cos\theta=\sec\theta', r'\dfrac{2\tan x}{1+\tan^2 x}=\operatorname{sen}2x']),
    8: ("Encuentre todos los valores de", ['x', r'\operatorname{sen}2x=\operatorname{sen}x', r'0\leq x\leq2\pi']),
    9: ("Trace la gráfica de la función", [r'y=1+\operatorname{sen}2x']),
}
LETTERS = {1: 'ab', 2: 'ab', 4: 'abc', 7: 'ab'}
RESULTS = {
    1: [r'300^\circ=\frac{5\pi}{3}\text{ rad}', r'-18^\circ=-\frac{\pi}{10}\text{ rad}'],
    2: [r'\frac{5\pi}{6}\text{ rad}=150^\circ', r'2\text{ rad}=\left(\frac{360}{\pi}\right)^\circ'],
    3: [r's=r\theta=2\pi\text{ cm}'],
    4: [r'\tan\left(\frac{\pi}{3}\right)=\sqrt3', r'\operatorname{sen}\left(\frac{7\pi}{6}\right)=-\frac12', r'\sec\left(\frac{5\pi}{3}\right)=2'],
    5: [r'a=24\operatorname{sen}\theta,\qquad b=24\cos\theta.'],
    6: [r'\operatorname{sen}(x+y)=\frac{4+6\sqrt2}{15}'],
    7: [r'\cos\theta\ne0', r'\cos x\ne0'],
    8: [r'x\in\left\{0,\frac{\pi}{3},\pi,\frac{5\pi}{3},2\pi\right\}'],
    9: [r'T=\frac{2\pi}{2}=\pi.'],
}


def direct(node, tag):
    return [n for n in node.children if isinstance(n, Node) and n.tag == tag]


def exercise(html, number):
    end = f'id="ejercicio-{number + 1}"' if number < 9 else '</article>'
    return Tree(html.split(f'id="ejercicio-{number}"', 1)[1].split(end, 1)[0]).root


class TrigonometriaTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = PAGE.read_text(encoding='utf-8')
        cls.page = Tree(cls.html).root

    def test_nine_original_statements_grouped_before_each_disclosure(self):
        for number, (instruction, formulas) in STATEMENTS.items():
            with self.subTest(exercise=number):
                root = exercise(self.html, number)
                elements = [n for n in root.children if isinstance(n, Node)]
                panels = [n for n in elements if n.tag == 'section' and 'consulta-trigonometria' in n.attrs.get('class', '')]
                self.assertEqual(len(panels), 1)
                before = elements[:elements.index(panels[0])]
                self.assertIn(instruction, normalized(' '.join(n.text() for n in before)))
                self.assertEqual([v for n in before for v in tex(n)], formulas)
                self.assertTrue(any(n.tag == 'hr' for n in before))
                for letter in LETTERS.get(number, ''):
                    self.assertIn(f'({letter})', normalized(' '.join(n.text() for n in before)))
                self.assertNotIn('Desarrollo docente', root.text())
                self.assertFalse(normalized(' '.join(n.text() for n in elements[elements.index(panels[0]) + 1:])))
        images = list(exercise(self.html, 5).descendants('img'))
        self.assertEqual([n.attrs.get('src') for n in images], ['trigonometria-assets/triangulo.svg'])

    def test_closed_controls_results_and_graph(self):
        for number, results in RESULTS.items():
            with self.subTest(exercise=number):
                root = exercise(self.html, number)
                panel = next(n for n in root.descendants('section') if 'consulta-trigonometria' in n.attrs.get('class', ''))
                controls = direct(panel, 'details')
                letters = LETTERS.get(number)
                self.assertEqual('data-consulta-incisos' in panel.attrs, bool(letters))
                self.assertEqual(len(controls), len(results))
                self.assertEqual([n.attrs.get('data-inciso') for n in controls], list(letters) if letters else [None])
                for control, result in zip(controls, results):
                    self.assertNotIn('open', control.attrs)
                    self.assertNotIn('hidden', control.attrs)
                    self.assertIn('Explicación breve', direct(control, 'summary')[0].text())
                    self.assertEqual(tex(direct(control, 'summary')[0]), [])
                    brief = [n for n in control.children if isinstance(n, Node) and n.tag not in ('summary', 'details')]
                    self.assertIn(''.join(result.split()).rstrip('.'), [''.join(v.split()).rstrip('.') for n in brief for v in tex(n)])
                    nested = direct(control, 'details')
                    self.assertEqual(len(nested), 1)
                    self.assertNotIn('open', nested[0].attrs)
                    self.assertEqual(normalized(direct(nested[0], 'summary')[0].text()), 'Paso a paso')
                    self.assertTrue(normalized(nested[0].text().replace('Paso a paso', '')))
                if number == 9:
                    self.assertEqual([n.attrs.get('src') for n in controls[0].descendants('img')], ['trigonometria-assets/grafica.svg'])
                    self.assertEqual(list(root.descendants('img')), list(controls[0].descendants('img')))

    def test_unique_labels_script_and_scoped_amber(self):
        all_nodes = list(nodes(self.page))
        ids = [n.attrs['id'] for n in all_nodes if n.attrs.get('id')]
        self.assertEqual(len(ids), len(set(ids)))
        panels = [n for n in self.page.descendants('section') if 'consulta-trigonometria' in n.attrs.get('class', '')]
        self.assertEqual(len(panels), 9)
        for panel in panels:
            self.assertEqual(ids.count(panel.attrs.get('aria-labelledby')), 1)
            self.assertTrue(any(n.attrs.get('id') == panel.attrs.get('aria-labelledby') for n in nodes(panel)))
            for control in direct(panel, 'details'):
                self.assertEqual(ids.count(control.attrs.get('id')), 1)
        scripts = [n for n in self.page.descendants('script') if n.attrs.get('src') == 'consulta-incisos.js']
        self.assertEqual(len(scripts), 1)
        self.assertIn('defer', scripts[0].attrs)
        css = (PAGE.parent / 'stewart.css').read_text(encoding='utf-8')
        self.assertIn('.consulta-incisos.consulta-trigonometria', css)
        self.assertIn('#e4bd79', css)
        self.assertIn('#a18455', css)

    def test_focus_indicator_contrasts_with_dark_panel(self):
        css = (PAGE.parent / 'stewart.css').read_text(encoding='utf-8')
        match = re.search(r'\.consulta-incisos\.consulta-trigonometria\s+:is\(button, summary\):focus-visible\s*\{\s*outline-color:\s*#([0-9a-fA-F]{6})', css)
        self.assertIsNotNone(match, 'Trigonometría needs an explicit focus color')

        def rgb(value):
            return [int(value[i:i + 2], 16) / 255 for i in (0, 2, 4)]

        def luminance(color):
            linear = [v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in color]
            return sum(c * v for c, v in zip((0.2126, 0.7152, 0.0722), linear))

        # The panel's #e4bd7912 background is composited over --paper #202020.
        alpha = 0x12 / 255
        panel = [a * alpha + b * (1 - alpha) for a, b in zip(rgb('e4bd79'), rgb('202020'))]
        light, dark = sorted((luminance(rgb(match.group(1))), luminance(panel)), reverse=True)
        self.assertGreaterEqual((light + 0.05) / (dark + 0.05), 3.0)

    def test_offline_math_figures_and_original_key_preserved_separately(self):
        self.assertIn('lang="es"', self.html)
        self.assertIn('../../teoria/teoria.css', self.html)
        self.assertGreaterEqual(len(list(self.page.descendants('math'))), 30)
        for node in nodes(self.page):
            if node.tag in ('img', 'script', 'link'):
                path = node.attrs.get('src', node.attrs.get('href', ''))
                self.assertFalse(path.startswith(('http:', 'https:', '//')), path)
                self.assertTrue((PAGE.parent / path).is_file(), path)
        self.assertNotIn('id="respuestas-del-libro"', self.html)
        self.assertNotIn('errata', self.html.lower())
        answer_section = (ROOT / 'odd/referencias/stewart-claves-y-erratas.md').read_text(encoding='utf-8').split('# Trigonometría', 1)[1]
        for number in range(1, 9):
            self.assertIn(f'{{#respuesta-{number}}}', answer_section)
        for excerpt in (r'5\pi/3', r'-\pi/10', r'150^\circ', r'360/\pi\approx114.6^\circ', r'2\pi', r'\sqrt3', r'-\frac12', r'24\operatorname{sen}\theta', r'24\cos\theta', r'-\frac{1}{15}(4+6\sqrt2)', r'0,\pi/3,\pi,5\pi/3,2\pi', 'trigonometria-assets/grafica.svg'):
            self.assertIn(excerpt, answer_section)
        self.assertIn('errata', answer_section.lower())
        self.assertIn('numeración', answer_section.lower())


if __name__ == '__main__':
    unittest.main()
