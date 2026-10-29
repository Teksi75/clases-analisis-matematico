"""Contrato público del examen B, incluidos los controles sin JavaScript."""
import unittest
from pathlib import Path
from urllib.parse import urlsplit
from test_stewart_piloto import Node, Tree, nodes, normalized, tex

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / 'evaluaciones/stewart/geometria.html'

# Datos de las consignas, no de la clave.
STATEMENTS = {
    1: ['(2,-5)', '-3', 'x', 'y', '2x-4y=3'],
    2: ['(-1,4)', '(3,-2)'],
    3: ['x^2+y^2-6x+10y+9=0'],
    4: ['A(-7,4)', 'B(5,-12)', 'A', 'B', 'A', 'B', 'AB', 'AB', 'AB', 'AB'],
    5: ['xy', r'-1\leq y\leq 3', '|x|<4', '|y|<2', r'y<1-\frac12x',
        r'y\geq x^2-1', 'x^2+y^2<4', '9x^2+16y^2=144'],
}
RESULTS = {
    1: [r'y=-3x+1', 'y=-5', 'x=2', r'y=\frac12x-6'],
    2: [r'(x+1)^2+(y-4)^2=52'],
    3: ['(3,-5)', '5'],
    4: [r'-\frac43', '4x+3y+16=0', '(-1,-4)', '20', '3x-4y-13=0', r'(x+1)^2+(y+4)^2=100'],
    5: ['franja', 'rectángulo', 'origen', 'parábola', 'interior', 'elipse'],
}


def section(html, number):
    end = f'id="ejercicio-{number + 1}"' if number < 5 else '</article>'
    return Tree(html.split(f'id="ejercicio-{number}"', 1)[1].split(end, 1)[0]).root


def direct(node, tag):
    return [n for n in node.children if isinstance(n, Node) and n.tag == tag]


class StewartGeometriaTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = PAGE.read_text(encoding='utf-8')
        cls.page = Tree(cls.html).root

    def test_original_statements_before_closed_controls(self):
        for number, formulas in STATEMENTS.items():
            with self.subTest(ejercicio=number):
                root = section(self.html, number)
                elements = [n for n in root.children if isinstance(n, Node)]
                panel = next(n for n in elements if n.tag == 'section' and 'consulta-incisos' in n.attrs.get('class', ''))
                before = elements[:elements.index(panel)]
                self.assertEqual([v for n in before for v in tex(n)], formulas)
                self.assertNotIn('Desarrollo docente', root.text())
                self.assertTrue(any(n.tag == 'hr' for n in before))
                if number in (1, 4, 5):
                    for letter in ('abcd' if number == 1 else 'abcdef'):
                        self.assertIn(f'({letter})', normalized(' '.join(n.text() for n in before)))

    def test_eighteen_two_level_explanations_with_no_answer_labels(self):
        for number, expected in RESULTS.items():
            with self.subTest(ejercicio=number):
                root = section(self.html, number)
                panel = next(n for n in root.descendants('section') if 'consulta-incisos' in n.attrs.get('class', ''))
                controls = direct(panel, 'details')
                letters = 'abcd' if number == 1 else 'abcdef' if number in (4, 5) else None
                self.assertEqual(len(controls), len(letters) if letters else 1)
                self.assertEqual('data-consulta-incisos' in panel.attrs, letters is not None)
                if letters:
                    self.assertEqual([c.attrs.get('data-inciso') for c in controls], list(letters))
                else:
                    self.assertNotIn('data-inciso', controls[0].attrs)
                for index, control in enumerate(controls):
                    self.assertNotIn('open', control.attrs)
                    self.assertNotIn('hidden', control.attrs)
                    summary = direct(control, 'summary')[0]
                    self.assertIn('Explicación breve', summary.text())
                    self.assertEqual(tex(summary), [])
                    if not letters:
                        self.assertNotIn('inciso', summary.text().lower())
                        self.assertNotIn('(a)', summary.text())
                    brief = [n for n in control.children if isinstance(n, Node) and n.tag not in ('summary', 'details')]
                    self.assertTrue(normalized(' '.join(n.text() for n in brief)))
                    nested = direct(control, 'details')
                    self.assertEqual(len(nested), 1)
                    self.assertNotIn('open', nested[0].attrs)
                    self.assertIn('Paso a paso', direct(nested[0], 'summary')[0].text())
                    self.assertEqual(tex(direct(nested[0], 'summary')[0]), [])
                    self.assertTrue(normalized(nested[0].text().replace('Paso a paso', '')))
                    expected_values = expected if number == 3 else [expected[index]]
                    for value in expected_values:
                        content = ' '.join(n.text() for n in brief)
                        annotations = [v for n in brief for v in tex(n)]
                        self.assertTrue(value in content or value in annotations, (number, value, annotations))
                    for math in control.descendants('math'):
                        self.assertEqual(math.attrs.get('xmlns'), 'http://www.w3.org/1998/Math/MathML')

    def test_regions_include_boundaries_and_exclusions(self):
        root = section(self.html, 5)
        panel = next(n for n in root.descendants('section') if 'data-consulta-incisos' in n.attrs)
        controls = direct(panel, 'details')
        for index, terms in enumerate([('incluidas', 'franja'), ('no', 'frontera'),
                                       ('origen', 'no'), ('incluye', 'parábola'),
                                       ('no', 'circunferencia'), ('no', 'interior')]):
            text = normalized(controls[index].text()).lower()
            for term in terms:
                self.assertIn(term, text)
        self.assertIn('vértices', controls[1].text().lower())
        self.assertIn('no pertenecen', controls[1].text().lower())

    def test_unique_ids_local_script_and_no_key(self):
        all_nodes = list(nodes(self.page))
        ids = [n.attrs['id'] for n in all_nodes if n.attrs.get('id')]
        self.assertEqual(len(ids), len(set(ids)))
        sections = [n for n in self.page.descendants('section') if 'consulta-incisos' in n.attrs.get('class', '')]
        self.assertEqual(len(sections), 5)
        for panel in sections:
            label = panel.attrs.get('aria-labelledby')
            self.assertEqual(ids.count(label), 1)
            self.assertTrue(any(n.attrs.get('id') == label for n in nodes(panel)))
            for control in direct(panel, 'details'):
                self.assertEqual(ids.count(control.attrs.get('id')), 1)
        scripts = [n for n in self.page.descendants('script') if n.attrs.get('src') == 'consulta-incisos.js']
        self.assertEqual(len(scripts), 1)
        self.assertIn('defer', scripts[0].attrs)
        self.assertNotIn('respuestas-del-libro', self.html)
        self.assertNotIn('geometria-assets/respuestas-graficas.png', self.html)
        self.assertNotIn('errata', self.html.lower())

    def test_blue_accent_scoped_to_geometry(self):
        self.assertIn('consulta-geometria', self.html)
        css = (PAGE.parent / 'stewart.css').read_text(encoding='utf-8')
        self.assertIn('#90bdf2', css)
        self.assertIn('#5c80a9', css)
        self.assertIn('#85c9c0', css)

    def test_offline_page_and_book_key_preserved(self):
        self.assertIn('lang="es"', self.html)
        self.assertIn('../../teoria/teoria.css', self.html)
        self.assertTrue(PAGE.with_suffix('.md').is_file())
        for node in nodes(self.page):
            if node.tag in ('a', 'link'):
                link = node.attrs.get('href', '')
                parsed = urlsplit(link)
                self.assertFalse(parsed.scheme or parsed.netloc, link)
                if parsed.path:
                    self.assertTrue((PAGE.parent / parsed.path).exists(), link)
            if node.tag == 'img':
                self.assertTrue(node.attrs.get('alt'))
                self.assertTrue((PAGE.parent / node.attrs['src']).is_file())
        reference = (ROOT / 'odd/referencias/stewart-claves-y-erratas.md').read_text(encoding='utf-8')
        answers = reference.split('# Geometría', 1)[1].split('# Funciones', 1)[0]
        for number in range(1, 6):
            self.assertIn(f'**{number}.**', answers)
        for letter in 'abcdef':
            self.assertIn(f'({letter})', answers)


if __name__ == '__main__':
    unittest.main()
