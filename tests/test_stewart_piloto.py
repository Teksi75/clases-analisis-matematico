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

    def test_existing_exercises_remain_without_published_key(self):
        html = PAGE.read_text(encoding='utf-8')
        for number in range(2, 11):
            self.assertIn(f'id="ejercicio-{number}"', html)
            self.assertNotIn(f'id="respuestas-{number}"', html)
        self.assertNotIn('id="respuestas-del-libro"', html)


# Las consignas son datos publicados; la clave se conserva como referencia interna.
EXERCISES = {
    1: ('Sin usar calculadora, evalúe cada una de estas expresiones.', STATEMENTS),
    2: ('Simplifique estas expresiones. Escriba su respuesta sin exponentes negativos.', [
        r'\sqrt{200}-\sqrt{32}', r'(3a^3b^3)(4ab^2)^2',
        r'\left(\dfrac{3x^{3/2}y^3}{x^2y^{-1/2}}\right)^{-2}']),
    3: ('Expanda y simplifique.', [
        r'3(x+6)+4(2x-5)', r'(x+3)(4x-5)',
        r'(\sqrt a+\sqrt b)(\sqrt a-\sqrt b)', r'(2x+3)^2', r'(x+2)^3']),
    4: ('Factorice estas expresiones.', [
        r'4x^2-25', r'2x^2+5x-12', r'x^3-3x^2-4x+12', r'x^4+27x',
        r'3x^{3/2}-9x^{1/2}+6x^{-1/2}', r'x^3y-4xy']),
    5: ('Simplifique la expresión racional.', [
        r'\dfrac{x^2+3x+2}{x^2-x-2}',
        r'\dfrac{2x^2-x-1}{x^2-9}\cdot\dfrac{x+3}{2x+1}',
        r'\dfrac{x^2}{x^2-4}-\dfrac{x-1}{x+2}',
        r'\dfrac{\frac yx-\frac xy}{\frac1y-\frac1x}']),
    6: ('Racionalice la expresión y simplifique.', [
        r'\dfrac{\sqrt{10}}{\sqrt5-2}', r'\dfrac{\sqrt{4+h}-2}{h}']),
    7: ('Complete el cuadrado de lo siguiente.', [r'x^2+x+1', r'2x^2-12x+11']),
    8: ('Resuelva la ecuación. (Encuentre sólo las soluciones reales.)', [
        r'x+5=14-\frac12x', r'\dfrac{2x}{x+1}=\dfrac{2x-1}{x}',
        r'x^2-x-2=0', r'2x^2+4x+1=0', r'x^4-3x^2+2=0',
        r'3|x-4|=10', r'2x(4-x)^{-1/2}-3\sqrt{4-x}=0']),
    9: ('Resuelva estas desigualdades, use notación de intervalo.', [
        r'-4<5-3x\leq17', r'x^2<2x+8', r'x(x-1)(x+2)>0',
        r'|x-4|<3', r'\dfrac{2x-3}{x+1}\leq1']),
    10: ('Exprese si cada una de estas ecuaciones es verdadera o falsa.', [
        r'(p+q)^2=p^2+q^2', r'\sqrt{ab}=\sqrt a\sqrt b',
        r'\sqrt{a^2+b^2}=a+b', r'\dfrac{1+TC}{C}=1+T',
        r'\dfrac1{x-y}=\dfrac1x-\dfrac1y',
        r'\dfrac{1/x}{a/x-b/x}=\dfrac1{a-b}']),
}

BOOK_KEY = {
    1: ['81', '-81', r'\frac1{81}', '25', r'\frac94', r'\frac18'],
    2: [r'6\sqrt2', r'48a^5b^7', r'\dfrac{x}{9y^7}'],
    3: ['11x-2', '4x^2+7x-15', 'a-b', '4x^2+12x+9', 'x^3+6x^2+12x+8'],
    4: ['(2x-5)(2x+5)', '(2x-3)(x+4)', '(x-3)(x-2)(x+2)',
        'x(x+3)(x^2-3x+9)', r'3x^{-1/2}(x-1)(x-2)', 'xy(x-2)(x+2)'],
    5: [r'\dfrac{x+2}{x-2}', r'\dfrac{x-1}{x-3}', r'\dfrac1{x-2}', '-(x+y)'],
    6: [r'5\sqrt2+2\sqrt{10}', r'\dfrac1{\sqrt{4+h}+2}'],
    7: [r'(x+\frac12)^2+\frac34', '2(x-3)^2-7'],
    8: ['6', '1', '-3, 4', r'-1\pm\frac12\sqrt2', r'\pm1\pm\sqrt2',
        r'\frac23,\frac{22}3', r'\frac{12}5'],
    9: ['[-4,3)', '(-2,4)', r'(-2,0)\cup(1,\infty)', '(1,7)', '(-1,4]'],
}


def exercise_section(html, number):
    end = f'id="ejercicio-{number + 1}"' if number < 10 else '</article>'
    return Tree(html.split(f'id="ejercicio-{number}"', 1)[1].split(end, 1)[0]).root


def nodes(node):
    for child in node.children:
        if isinstance(child, Node):
            yield child
            yield from nodes(child)


def normalized(text):
    return ' '.join(text.split())


class CompleteAlgebraTests(unittest.TestCase):
    def setUp(self):
        self.html = PAGE.read_text(encoding='utf-8')
        self.page = Tree(self.html).root

    def test_each_exercise_has_one_panel_after_all_original_statements(self):
        for number, (instruction, statements) in EXERCISES.items():
            with self.subTest(exercise=number):
                root = exercise_section(self.html, number)
                panels = [n for n in root.descendants('section') if 'data-consulta-incisos' in n.attrs]
                self.assertEqual(len(panels), 1)
                panel = panels[0]
                self.assertIn('Consultá una resolución', normalized(panel.text()))
                elements = [n for n in root.children if isinstance(n, Node)]
                self.assertIn(panel, elements)
                index = elements.index(panel)
                before = elements[:index]
                self.assertIn(instruction, normalized(' '.join(n.text() for n in before)))
                self.assertEqual([value for n in before for value in tex(n)], statements)
                statement_blocks = [n for n in before if tex(n) == statements]
                self.assertEqual(len(statement_blocks), 1)
                self.assertEqual([normalized(n.text()) for n in statement_blocks[0].descendants('strong')],
                                 [f'({letter})' for letter in 'abcdefg'[:len(statements)]])
                self.assertTrue(any(n.tag == 'hr' for n in before))
                self.assertFalse(normalized(' '.join(n.text() for n in elements[index + 1:])))
                self.assertNotIn('Desarrollo docente', root.text())
                for math in statement_blocks[0].descendants('math'):
                    self.assertEqual(math.attrs.get('xmlns'), 'http://www.w3.org/1998/Math/MathML')

    def test_ordered_native_disclosures_have_closed_nested_steps(self):
        for number, (_, statements) in EXERCISES.items():
            with self.subTest(exercise=number):
                root = exercise_section(self.html, number)
                panels = [n for n in root.descendants('section') if 'data-consulta-incisos' in n.attrs]
                self.assertEqual(len(panels), 1)
                panel = panels[0]
                controls = [n for n in panel.children if isinstance(n, Node) and n.tag == 'details']
                letters = 'abcdefg'[:len(statements)]
                self.assertEqual([n.attrs.get('data-inciso') for n in controls], list(letters))
                for letter, control in zip(letters, controls):
                    with self.subTest(inciso=letter):
                        self.assertNotIn('open', control.attrs)
                        self.assertNotIn('hidden', control.attrs)
                        summaries = [n for n in control.children if isinstance(n, Node) and n.tag == 'summary']
                        self.assertEqual(len(summaries), 1)
                        self.assertIn(f'({letter})', summaries[0].text())
                        self.assertIn('Explicación breve', summaries[0].text())
                        self.assertEqual(tex(summaries[0]), [])
                        brief = [n for n in control.children if isinstance(n, Node)
                                 and n.tag not in ('summary', 'details')]
                        self.assertTrue(normalized(' '.join(n.text() for n in brief)))
                        nested = list(control.descendants('details'))
                        self.assertEqual(len(nested), 1)
                        self.assertIn(nested[0], control.children)
                        self.assertNotIn('open', nested[0].attrs)
                        self.assertNotIn('hidden', nested[0].attrs)
                        inner = [n for n in nested[0].children if isinstance(n, Node) and n.tag == 'summary']
                        self.assertEqual(len(inner), 1)
                        self.assertIn('Paso a paso', inner[0].text())
                        self.assertEqual(tex(inner[0]), [])
                        self.assertTrue(normalized(' '.join(
                            n.text() for n in nested[0].children if isinstance(n, Node) and n.tag != 'summary')))
                        for math in control.descendants('math'):
                            self.assertEqual(math.attrs.get('xmlns'), 'http://www.w3.org/1998/Math/MathML')

    def test_brief_explanations_preserve_original_domains_and_results(self):
        # Solo se examina el contenido breve del inciso, no su paso a paso ni
        # la clave. Las anotaciones MathML conservan las expresiones publicadas.
        cases = {
            (2, 'c'): ([r'\dfrac{x}{9y^7}', 'x>0', 'y>0'], None),
            (3, 'c'): (['a-b', r'a\geq0', r'b\geq0'], None),
            (4, 'e'): ([r'\dfrac{3(x-1)(x-2)}{\sqrt x}', 'x>0'], None),
            (5, 'a'): ([r'\dfrac{x+2}{x-2}', r'x\ne-1,2'], None),
            (5, 'b'): ([r'\dfrac{x-1}{x-3}', r'x\ne-3,3,-\frac12'], None),
            (5, 'c'): ([r'\dfrac{3x-2}{x^2-4}', r'x\ne-2,2'], None),
            (5, 'd'): (['-(x+y)', r'x\ne0', r'y\ne0', r'x\ne y'], None),
            (6, 'b'): ([r'\dfrac1{\sqrt{4+h}+2}', r'h\geq-4', r'h\ne0'], None),
            (8, 'b'): (['x=1', r'x\ne0,-1'], None),
            (8, 'g'): ([r'x=\dfrac{12}5', 'x<4'], None),
            (9, 'e'): (['(-1,4]', r'x\ne-1'], None),
            (10, 'b'): ([r'a\geq0', r'b\geq0'], 'Verdadera donde ambos lados están definidos:'),
            (10, 'd'): ([r'C\ne0', '1/C+T', '1+T'], 'Falsa en general:'),
            (10, 'e'): ([r'x\ne0', r'y\ne0', r'x\ne y'], 'Falsa:'),
            (10, 'f'): ([r'x\ne0', r'a\ne b', '(a-b)/x'], 'Verdadera'),
        }
        for (number, letter), (expressions, classification) in cases.items():
            with self.subTest(exercise=number, inciso=letter):
                root = exercise_section(self.html, number)
                panels = [n for n in root.descendants('section') if 'data-consulta-incisos' in n.attrs]
                self.assertEqual(len(panels), 1)
                controls = [n for n in panels[0].children if isinstance(n, Node)
                            and n.tag == 'details' and n.attrs.get('data-inciso') == letter]
                self.assertEqual(len(controls), 1)
                brief = [n for n in controls[0].children if isinstance(n, Node)
                         and n.tag not in ('summary', 'details')]
                self.assertTrue(brief)
                self.assertTrue(all('hidden' not in n.attrs and n.attrs.get('aria-hidden') != 'true'
                                    for n in brief))
                annotations = {''.join(value.split()) for node in brief for value in tex(node)}
                for expression in expressions:
                    self.assertIn(''.join(expression.split()), annotations)
                if classification is not None:
                    labels = [normalized(strong.text()) for node in brief for strong in node.descendants('strong')]
                    self.assertIn(classification, labels)

    def test_panel_labels_and_control_ids_are_unique_and_resolve_locally(self):
        all_nodes = list(nodes(self.page))
        all_ids = [n.attrs['id'] for n in all_nodes if n.attrs.get('id')]
        panels = [n for n in self.page.descendants('section') if 'data-consulta-incisos' in n.attrs]
        self.assertEqual(len(panels), 10)
        for number, panel in enumerate(panels, 1):
            with self.subTest(exercise=number):
                label = panel.attrs.get('aria-labelledby', '')
                self.assertTrue(label)
                self.assertEqual(len(label.split()), 1)
                self.assertEqual(all_ids.count(label), 1)
                titles = [n for n in nodes(panel) if n.attrs.get('id') == label]
                self.assertEqual(len(titles), 1)
                self.assertEqual(normalized(titles[0].text()), 'Consultá una resolución')
                controls = [n for n in panel.children if isinstance(n, Node) and n.tag == 'details']
                self.assertEqual(len(controls), len(EXERCISES[number][1]))
                for control in controls:
                    identifier = control.attrs.get('id', '')
                    self.assertTrue(identifier)
                    self.assertEqual(all_ids.count(identifier), 1)

    def test_consultation_script_is_loaded_once(self):
        scripts = [n for n in self.page.descendants('script')
                   if n.attrs.get('src') == 'consulta-incisos.js']
        self.assertEqual(len(scripts), 1)
        self.assertIn('defer', scripts[0].attrs)

    def test_original_book_key_and_identified_errata_are_internal(self):
        text = (PAGE.parents[2] / 'odd/referencias/stewart-claves-y-erratas.md').read_text(encoding='utf-8')
        key = text.split('# Álgebra', 1)[1].split('# Geometría', 1)[0]
        for number in range(1, 11):
            with self.subTest(exercise=number):
                part = key.split(f'### Respuestas {number}\n', 1)[1]
                if number < 10:
                    part = part.split(f'### Respuestas {number + 1}\n', 1)[0]
                for letter in 'abcdefg'[:len(EXERCISES[number][1])]:
                    self.assertIn(f'**({letter})**', part)
                for expression in BOOK_KEY.get(number, []):
                    self.assertIn(expression, part)
        for label in ('Errata de la clave, 5(c):', 'Errata de la clave, 8(c):',
                      'Errata de notación de la clave, 8(e):'):
            self.assertIn(label, key)
        for expression in (r'\dfrac{3x-2}{x^2-4}', '-3, 4', '-1, 2',
                           r'\pm1\pm\sqrt2', r'\pm1,\pm\sqrt2'):
            self.assertIn(expression, key)


if __name__ == '__main__':
    unittest.main()
