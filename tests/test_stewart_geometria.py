"""Estructura y notación de la edición sin conexión del examen B de Stewart."""
import re
import unittest
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "evaluaciones/stewart/geometria.html"
SOURCE = PAGE.with_suffix(".md")


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.lang = None
        self.headings = []
        self.current = None
        self.sections = {}
        self.links = []
        self.images = []
        self.math = 0
        self.scripts = 0
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.lang = attrs.get("lang")
        if tag in {"h2", "h3"}:
            self.current = attrs.get("id")
            self.headings.append(self.current)
            self.sections[self.current] = []
        if tag == "math":
            self.math += 1
        if tag == "script":
            self.scripts += 1
        if tag == "a":
            self.links.append(attrs.get("href", ""))
        if tag == "link":
            self.links.append(attrs.get("href", ""))
        if tag == "img":
            self.images.append(attrs)

    def handle_data(self, text):
        if self.current:
            self.sections[self.current].append(text)

    def text(self, section):
        return " ".join(" ".join(self.sections[section]).split())


class StewartGeometriaTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = PAGE.read_text(encoding="utf-8")
        cls.page = Page(cls.html)

    def test_exercises_have_immediate_teacher_developments_and_final_answers(self):
        expected = []
        for number in range(1, 6):
            expected.extend([f"ejercicio-{number}", f"desarrollo-{number}"])
        expected.append("respuestas-del-libro")
        self.assertEqual(self.page.headings, expected)
        for number in range(1, 6):
            self.assertIn("Desarrollo docente", self.page.text(f"desarrollo-{number}"))
        self.assertTrue(SOURCE.is_file())

    def test_all_original_subparts_and_answer_labels_are_present(self):
        for number, letters in [(1, "abcd"), (4, "abcdef"), (5, "abcdef")]:
            for letter in letters:
                with self.subTest(exercise=number, part=letter):
                    self.assertIn(f"({letter})", self.page.text(f"ejercicio-{number}"))
                    self.assertIn(f"({letter})", self.page.text(f"desarrollo-{number}"))
        answers = self.page.text("respuestas-del-libro")
        for number in range(1, 6):
            self.assertIn(f"{number}.", answers)
        for letter in "abcdef":
            self.assertIn(f"({letter})", answers)

    def test_original_math_is_rendered_as_mathml(self):
        self.assertGreater(self.page.math, 60)
        for formula in [r"2x-4y=3", r"x^2+y^2-6x+10y+9=0",
                        r"-1\leq y\leq 3", r"|x|<4", r"y\geq x^2-1",
                        r"9x^2+16y^2=144", r"(x+1)^2+(y-4)^2=52",
                        r"3x-4y=13", r"(x+1)^2+(y+4)^2=100"]:
            with self.subTest(formula=formula):
                self.assertIn(formula, unescape(self.html))
        self.assertIn('xmlns="http://www.w3.org/1998/Math/MathML"', self.html)
        self.assertIn("<mfrac>", self.html)

    def test_offline_page_and_book_graphs(self):
        self.assertEqual(self.page.lang, "es")
        self.assertEqual(self.page.scripts, 0)
        self.assertIn("../../teoria/teoria.css", self.page.links)
        self.assertTrue(self.page.images, "Faltan las seis gráficas de respuestas del libro")
        for image in self.page.images:
            self.assertTrue(image.get("alt"))
            self.assertTrue((PAGE.parent / image["src"]).is_file())
        for link in self.page.links:
            parsed = urlsplit(link)
            self.assertFalse(parsed.scheme or parsed.netloc, link)
            if parsed.path:
                self.assertTrue((PAGE.parent / parsed.path).exists(), link)


if __name__ == "__main__":
    unittest.main()
