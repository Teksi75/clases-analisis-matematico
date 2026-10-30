"""Contrato público del examen C y respaldo local sin JavaScript."""
import unittest
from pathlib import Path
from urllib.parse import urlsplit
from test_stewart_piloto import Node, Tree, nodes, normalized, tex

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / 'evaluaciones/stewart/funciones.html'
SOURCE = PAGE.with_suffix('.md')
STATEMENTS = {
    1: ['f', 'f(-1)', 'f(2)', 'x', 'f(x)=2', 'x', 'f(x)=0', 'f'],
    2: ['f(x)=x^3', r'\dfrac{f(2+h)-f(2)}{h}'],
    3: [r'f(x)=\dfrac{2x+1}{x^2+x-2}', r'g(x)=\dfrac{\sqrt[3]{x}}{x^2+1}', r'h(x)=\sqrt{4-x}+\sqrt{x^2-1}'],
    4: ['f', 'y=-f(x)', 'y=2f(x)-1', 'y=(x-3)+2'],
    5: ['y=x^3', 'y=(x+1)^3', 'y=(x-2)^3+3', 'y=4-x^2', r'y=\sqrt{x}', r'y=2\sqrt{x}', 'y=-2^x', 'y=1+x^{-1}'],
    6: [r'f(x)=\begin{cases}1-x^2 & \text{si }x\leq0,\\ 2x+1 & \text{si }x>0.\end{cases}', 'f(-2)', 'f(1)', 'f'],
    7: ['f(x)=x^2+2x-1', 'g(x)=2x-3', r'f\circ g', r'g\circ f', r'g\circ g\circ g'],
}
LETTERS = {1: 'abcde', 2: '', 3: 'abc', 4: 'abc', 5: 'abcdefgh', 6: 'ab', 7: 'abc'}
INSTRUCTIONS = {
    1: ['La gráfica de una función', 'se da a la izquierda.', 'Exprese el valor de',
        'Estime el valor de', '¿Para qué valores de', 'Estime los valores de', 'Exprese el dominio y rango de'],
    2: ['evalúe el cociente de diferencia', 'y simplifique su respuesta.'],
    3: ['Encuentre el dominio de la función.'],
    4: ['¿Cómo se obtienen las gráficas de las funciones a partir de la gráfica de'],
    5: ['Sin usar calculadora, haga un bosquejo aproximado de la gráfica.'],
    6: ['Evaluación', 'y', 'Dibuje la gráfica de'],
    7: ['encuentre cada una de las siguientes funciones.'],
}
RESULTS = {
    1: ['-2', '2.8', '-3', '-2.5', '[-3,3]'],
    2: ['12+6h+h^2'],
    3: ['(-\\infty,-2)', '(-\\infty,\\infty)', '(-\\infty,-1]'],
    4: ['eje', '2', 'y=x-1'],
    5: ['(0,0)', '(-1,0)', '(2,3)', '(0,4)', '(4,2)', '(4,4)', '(0,-1)', 'x=0'],
    6: ['-3', '(0,1)'],
    7: ['4x^2-8x+2', '2x^2+4x-5', '8x-21'],
}


def section(html, number):
    end = f'id="ejercicio-{number + 1}"' if number < 7 else '</article>'
    return Tree(html.split(f'id="ejercicio-{number}"', 1)[1].split(end, 1)[0]).root


def direct(node, tag):
    return [n for n in node.children if isinstance(n, Node) and n.tag == tag]


class FuncionesTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = PAGE.read_text(encoding='utf-8')
        cls.page = Tree(cls.html).root

    def test_original_statements_and_graph_precede_each_panel(self):
        self.assertTrue(SOURCE.is_file())
        for number, formulas in STATEMENTS.items():
            with self.subTest(exercise=number):
                root = section(self.html, number)
                elements = [n for n in root.children if isinstance(n, Node)]
                panel = next(n for n in elements if n.tag == 'section' and 'consulta-funciones' in n.attrs.get('class', ''))
                before = elements[:elements.index(panel)]
                self.assertEqual([v for n in before for v in tex(n)], formulas)
                self.assertTrue(any(n.tag == 'hr' for n in before))
                text = normalized(' '.join(n.text() for n in before))
                for instruction in INSTRUCTIONS[number]:
                    self.assertIn(instruction, text)
                for letter in LETTERS[number]:
                    self.assertIn(f'({letter})', text)
                self.assertFalse(normalized(' '.join(n.text() for n in elements[elements.index(panel)+1:])))
                self.assertNotIn('Desarrollo docente', root.text())
        self.assertIn('Gráfica original del ejercicio 1', self.html)
        self.assertIn('funciones-assets/pagina-025.png', self.html)
        self.assertNotIn('Gráficas originales de las respuestas 5 y 6', self.html)
        self.assertNotIn('errata', self.html.lower())

    def test_seven_panels_have_closed_independent_two_level_answers(self):
        for number, letters in LETTERS.items():
            with self.subTest(exercise=number):
                root = section(self.html, number)
                panel = next(n for n in root.descendants('section') if 'consulta-funciones' in n.attrs.get('class', ''))
                controls = direct(panel, 'details')
                self.assertEqual(len(controls), len(letters) or 1)
                self.assertEqual('data-consulta-incisos' in panel.attrs, bool(letters))
                self.assertEqual([c.attrs.get('data-inciso') for c in controls], list(letters) if letters else [None])
                for index, control in enumerate(controls):
                    self.assertNotIn('open', control.attrs)
                    self.assertNotIn('hidden', control.attrs)
                    summary = direct(control, 'summary')[0]
                    self.assertEqual(normalized(summary.text()), f'({letters[index]}) Explicación breve' if letters else 'Explicación breve')
                    self.assertEqual(tex(summary), [])
                    brief = [n for n in control.children if isinstance(n, Node) and n.tag not in ('summary', 'details')]
                    self.assertTrue(normalized(' '.join(n.text() for n in brief)))
                    content = ' '.join(n.text() for n in brief)
                    annotations = [v for n in brief for v in tex(n)]
                    self.assertTrue(RESULTS[number][index] in content or any(RESULTS[number][index] in a for a in annotations))
                    nested = direct(control, 'details')
                    self.assertEqual(len(nested), 1)
                    self.assertNotIn('open', nested[0].attrs)
                    self.assertEqual(normalized(direct(nested[0], 'summary')[0].text()), 'Paso a paso')
                    self.assertTrue(normalized(nested[0].text().replace('Paso a paso', '')))

    def test_important_restrictions_and_intermediate_steps_are_in_nested_details(self):
        checks = {
            (1, 3): ['-2.5', '0.3'], (1, 4): ['[-3,3]', '[-2,3]'],
            (2, 0): [r'h\ne0', '12h', '6h^2'],
            (3, 0): ['(x+2)(x-1)', '-2', '1'],
            (3, 1): [r'x^2\geq0', r'x^2+1\geq1>0'],
            (3, 2): [r'4-x\geq0', '(x-1)(x+1)', r'x\leq4'],
            (4, 2): ['x-1', 'f(x-3)+2'],
            (5, 6): ['2^{-1}', '2^0', '2^1'],
            (5, 7): ['1/x', 'x=0', 'y=1'],
            (6, 0): ['(-2)^2', '2(1)+1'],
            (6, 1): ['(-1,0)', '(-2,-3)', '(1,3)', '(2,5)'],
            (7, 0): ['-12x', '4x-6-1'],
            (7, 1): ['2x^2+4x-2-3'],
            (7, 2): ['4x-9', '8x-18-3'],
        }
        for (number, index), expressions in checks.items():
            with self.subTest(exercise=number, inciso=index):
                panel = next(n for n in section(self.html, number).descendants('section')
                             if 'consulta-funciones' in n.attrs.get('class', ''))
                nested = direct(direct(panel, 'details')[index], 'details')[0]
                annotations = ' '.join(tex(nested))
                for expression in expressions:
                    self.assertIn(expression, annotations)

    def test_unique_ids_local_script_and_offline_mathml(self):
        self.assertIn('lang="es"', self.html)
        self.assertIn('<mfrac>', self.html)
        all_nodes = list(nodes(self.page))
        ids = [n.attrs['id'] for n in all_nodes if n.attrs.get('id')]
        self.assertEqual(len(ids), len(set(ids)))
        panels = [n for n in self.page.descendants('section') if 'consulta-funciones' in n.attrs.get('class', '')]
        self.assertEqual(len(panels), 7)
        for panel in panels:
            self.assertEqual(ids.count(panel.attrs.get('aria-labelledby')), 1)
            self.assertTrue(any(n.attrs.get('id') == panel.attrs.get('aria-labelledby') for n in nodes(panel)))
            for control in direct(panel, 'details'):
                self.assertEqual(ids.count(control.attrs.get('id')), 1)
        scripts = list(self.page.descendants('script'))
        self.assertEqual(len(scripts), 1)
        self.assertEqual(scripts[0].attrs.get('src'), 'consulta-incisos.js')
        self.assertIn('defer', scripts[0].attrs)
        for n in all_nodes:
            for key in ('href', 'src'):
                if key not in n.attrs:
                    continue
                link = n.attrs[key]
                parsed = urlsplit(link)
                self.assertFalse(parsed.scheme or parsed.netloc, link)
                if parsed.path:
                    self.assertTrue((PAGE.parent / parsed.path).exists(), link)
                elif parsed.fragment:
                    self.assertIn(parsed.fragment, ids)
        self.assertIn('application/x-tex', self.html)


if __name__ == '__main__':
    unittest.main()
