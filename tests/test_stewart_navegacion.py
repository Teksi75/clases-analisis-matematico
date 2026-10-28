"""Navegación entre el cuaderno y los exámenes de Stewart."""
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STEWART = ROOT / 'evaluaciones/stewart'
EXAMS = ('algebra', 'geometria', 'funciones', 'trigonometria')


class Elements(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.elements = []
        self.feed(path.read_text(encoding='utf-8'))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.elements.append((tag, attrs, tuple(self.stack)))
        if tag not in ('area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'):
            self.stack.append((tag, attrs))

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                break

    def links_in(self, tag, cls):
        return [a['href'] for t, a, parents in self.elements if t == 'a' and 'href' in a
                and any(p == tag and cls in attrs.get('class', '').split() for p, attrs in parents)]


class Navigation(unittest.TestCase):
    def test_theory_header_and_visible_separate_sidebar(self):
        doc = Elements(ROOT / 'teoria/index.html')
        dest = '../evaluaciones/stewart/index.html'
        header = doc.links_in('header', 'masthead')
        self.assertIn(dest, header)
        self.assertIn('../evaluaciones/eva1.html', header)
        self.assertIn('#lectura', header)
        self.assertIn(dest, doc.links_in('nav', 'stewart-sidebar'))
        sidebar = next(parents for tag, attrs, parents in doc.elements
                       if tag == 'nav' and 'stewart-sidebar' in attrs.get('class', '').split())
        self.assertFalse(any(tag == 'details' for tag, _ in sidebar))
        ids = {attrs['id'] for _, attrs, _ in doc.elements if 'id' in attrs}
        self.assertTrue({'funciones', 'limites'} <= ids)
        self.assertIn(dest, doc.links_in('aside', 'related-diagnostics'))

    def test_four_cards_and_breadcrumbs(self):
        doc = Elements(STEWART / 'index.html')
        self.assertEqual(doc.links_in('nav', 'exam-cards'), [f'{name}.html' for name in EXAMS])
        for name in ('index', *EXAMS):
            with self.subTest(page=name):
                page = Elements(STEWART / f'{name}.html')
                links = page.links_in('nav', 'breadcrumbs')
                self.assertIn('../../teoria/index.html#funciones', links)
                self.assertIn('../../teoria/index.html#limites', links)
                if name != 'index':
                    self.assertIn('index.html', links)


if __name__ == '__main__':
    unittest.main()
