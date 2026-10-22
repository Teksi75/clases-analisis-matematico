"""Public-artifact checks for the complete, offline student reading edition."""
import re
import subprocess
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
FOLDER = ROOT / "teoria"
CHAPTERS = {"funciones": "01-funciones.md", "limites": "02-limites.md"}


class Content(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.words, self.ids, self.links, self.tags = [], [], [], []
        self.generated_depth = 0
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if self.generated_depth:
            self.generated_depth += 1
            return
        if attrs.get('data-generated') in ('figure', 'label'):
            self.generated_depth = 1
            return
        self.tags.append(tag)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "a":
            self.links.append(attrs.get("href", ""))

    def handle_endtag(self, tag):
        if self.generated_depth:
            self.generated_depth -= 1

    def handle_data(self, text):
        if not self.generated_depth:
            self.words.extend(text.split())


class TheoryHTMLTests(unittest.TestCase):
    def setUp(self):
        self.html = (FOLDER / "index.html").read_text()
        self.page = Content(self.html)

    def test_complete_chapters_tables_and_tex_are_preserved(self):
        for chapter, source in CHAPTERS.items():
            with self.subTest(chapter=chapter):
                expected = subprocess.run(
                    ["/usr/bin/pandoc", "--from=markdown", "--to=html5", "--mathml", str(FOLDER / source)],
                    check=True, capture_output=True, text=True).stdout
                match = re.search(r'<article\b[^>]*id="' + chapter + r'"[^>]*>(.*?)</article>',
                                  self.html, re.S)
                self.assertIsNotNone(match)
                actual = match.group(1)
                self.assertEqual(Content(expected).words, Content(actual).words)
                for tag in ["table", "tr", "th", "td", "p", "li", "math", "annotation"]:
                    self.assertEqual(Content(expected).tags.count(tag), Content(actual).tags.count(tag), tag)
                self.assertEqual(re.findall(r'<math\b.*?</math>', expected, re.S),
                                 re.findall(r'<math\b.*?</math>', actual, re.S))
                self.assertEqual(re.findall(r'<annotation.*?</annotation>', expected, re.S),
                                 re.findall(r'<annotation.*?</annotation>', actual, re.S))
                self.assertIn("<mfrac>", actual)
        self.assertIn("<munder>", self.html)
        self.assertIn("<mtable>", self.html)

    def test_navigation_accessibility_and_local_links(self):
        self.assertIn('lang="es"', self.html)
        self.assertIn("main", self.page.tags)
        self.assertIn("nav", self.page.tags)
        self.assertRegex(self.html, r'<a[^>]+href="#contenido"[^>]*>Saltar al contenido</a>')
        self.assertEqual(len(self.page.ids), len(set(self.page.ids)))
        for chapter in CHAPTERS:
            article = re.search(r'<article\b[^>]*id="' + chapter + r'"[^>]*>(.*?)</article>', self.html, re.S)[1]
            headings = re.findall(r'<h[1-6]\b[^>]*id="([^"]+)"', article)
            self.assertTrue(headings)
            self.assertTrue(all(item.startswith(chapter + "-") for item in headings))
        for link in self.page.links:
            parsed = urlsplit(link)
            if parsed.scheme:
                continue
            path = FOLDER / unquote(parsed.path) if parsed.path else FOLDER / "index.html"
            self.assertTrue(path.exists(), link)
            if path == FOLDER / "index.html" and parsed.fragment:
                self.assertIn(unquote(parsed.fragment), self.page.ids)
        self.assertFalse(any(urlsplit(link).path in CHAPTERS.values() for link in self.page.links))

    def test_offline_responsive_print_and_containment(self):
        self.assertEqual(re.findall(r'<script\b[^>]*>.*?</script>', self.html, re.S),
                         ['<script src="lectura.js" defer></script>'])
        self.assertNotRegex(self.html, r'<(?:link|img)[^>]+(?:href|src)="https?://')
        self.assertIn('href="teoria.css"', self.html)
        self.assertIn('name="viewport"', self.html)
        css = (FOLDER / "teoria.css").read_text()
        for rule in ["@media print", "@media", ":focus-visible", "overflow-x: auto", "scroll-margin"]:
            self.assertIn(rule, css)
        self.assertNotRegex(css, r'@import|url\([\"\x27]?https?://')
        self.assertEqual(self.html.count('class="table-scroll"'), self.page.tags.count("table"))
        self.assertEqual(re.findall(r'<details\b[^>]*>', self.html),
                         ['<details class="contents-disclosure">'])  # Only navigation collapses.


if __name__ == "__main__":
    unittest.main()
