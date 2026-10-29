"""Comportamiento publicado del piloto de explicaciones de Álgebra."""
import unittest
from html.parser import HTMLParser
from pathlib import Path

PAGE = Path(__file__).resolve().parents[1] / 'evaluaciones/stewart/algebra.html'
STATEMENTS = [r'\left(-3\right)^4', r'-3^4', r'3^{-4}', r'\dfrac{5^{23}}{5^{21}}',
              r'\left(\dfrac{2}{3}\right)^{-2}', r'16^{-3/4}']
RESULTS = ['81', '-81', r'\frac{1}{81}', '25', r'\frac{9}{4}', r'\frac{1}{8}']


class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []

    def descendants(self, tag):
        for child in self.children:
            if isinstance(child, Node):
                if child.tag == tag:
                    yield child
                yield from child.descendants(tag)

    def text(self):
        return ''.join(c.text() if isinstance(c, Node) else c for c in self.children)


class Tree(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.stack = [self.root]
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in ('area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'):
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if self.stack[-1].tag == tag:
            self.stack.pop()

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def tex(node):
    return [a.text() for a in node.descendants('annotation')
            if a.attrs.get('encoding') == 'application/x-tex']


class PilotTests(unittest.TestCase):
    def setUp(self):
        html = PAGE.read_text(encoding='utf-8')
        section = html.split('id="ejercicio-1"', 1)[1].split('id="ejercicio-2"', 1)[0]
        self.root = Tree(section).root

    def test_consultation_panel_is_a_local_progressive_enhancement(self):
        panels = [n for n in self.root.descendants('section') if 'data-consulta-incisos' in n.attrs]
        self.assertEqual(len(panels), 1)
        panel = panels[0]
        self.assertIn('Consultá una resolución', panel.text())
        controls = [n for n in panel.children if isinstance(n, Node) and n.tag == 'details']
        self.assertEqual([n.attrs.get('data-inciso') for n in controls], list('abcdef'))
        self.assertTrue(all('open' not in n.attrs and 'hidden' not in n.attrs for n in controls))

    def test_visible_original_statements_and_closed_independent_explanations(self):
        details = list(self.root.descendants('details'))
        outer = [node for node in details if any(
            isinstance(child, Node) and child.tag == 'summary' and 'Explicación breve' in child.text()
            for child in node.children)]
        self.assertEqual(len(outer), 6)
        self.assertEqual(len(details), 12)
        # Solo las consignas aparecen fuera de cualquier control cerrado.
        visible_tex = []
        for child in self.root.children:
            if isinstance(child, Node) and child.tag not in ('details', 'section'):
                visible_tex.extend(tex(child))
        self.assertEqual(visible_tex, STATEMENTS)
        statement_math = next(self.root.descendants('math'))
        power = next(statement_math.descendants('msup'))
        self.assertEqual(next(c for c in power.children if isinstance(c, Node)).tag, 'mrow')
        for letter, result, control in zip('abcdef', RESULTS, outer):
            with self.subTest(inciso=letter):
                self.assertNotIn('open', control.attrs)
                summary = next(c for c in control.children if isinstance(c, Node) and c.tag == 'summary')
                self.assertIn(f'({letter})', summary.text())
                self.assertEqual(tex(summary), [])
                nested = list(control.descendants('details'))
                self.assertEqual(len(nested), 1)
                self.assertNotIn('open', nested[0].attrs)
                inner_summary = next(c for c in nested[0].children if isinstance(c, Node) and c.tag == 'summary')
                self.assertIn('Paso a paso', inner_summary.text())
                self.assertEqual(tex(inner_summary), [])
                brief = [c for c in control.children if isinstance(c, Node) and c.tag not in ('summary', 'details')]
                self.assertIn(result, [value for child in brief for value in tex(child)])
                self.assertTrue(tex(nested[0]))
                self.assertTrue(all(m.attrs.get('xmlns') == 'http://www.w3.org/1998/Math/MathML'
                                    for m in control.descendants('math')))

    def test_statements_are_grouped_before_the_separated_disclosures(self):
        elements = [c for c in self.root.children if isinstance(c, Node)]
        panel_index = next(i for i, node in enumerate(elements) if 'data-consulta-incisos' in node.attrs)
        statements = [node for node in elements[:panel_index] if tex(node) == STATEMENTS]
        self.assertEqual(len(statements), 1)
        for letter in 'abcdef':
            self.assertIn(f'({letter})', statements[0].text())
        self.assertTrue(any(node.tag == 'hr' for node in elements[:panel_index]))
        self.assertNotIn('Desarrollo docente', self.root.text())
        controls = [n for n in elements[panel_index].children if isinstance(n, Node) and n.tag == 'details']
        self.assertEqual(len(controls), 6)
        for letter, control in zip('abcdef', controls):
            summary = next(c for c in control.children if isinstance(c, Node) and c.tag == 'summary')
            self.assertIn(f'({letter})', summary.text())

    def test_existing_exercises_and_separate_book_key_remain(self):
        html = PAGE.read_text(encoding='utf-8')
        for number in range(2, 11):
            self.assertIn(f'id="ejercicio-{number}"', html)
            self.assertIn(f'id="respuestas-{number}"', html)
        key = html.split('id="respuestas-1"', 1)[1].split('id="respuestas-2"', 1)[0]
        for result in ('81', '-81', r'\frac1{81}', '25', r'\frac94', r'\frac18'):
            self.assertIn(result, key)
        self.assertIn('id="respuestas-del-libro"', html)


if __name__ == '__main__':
    unittest.main()
