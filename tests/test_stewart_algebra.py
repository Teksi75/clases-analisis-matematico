"""Estructura y notación de la transcripción local del diagnóstico de álgebra."""
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "evaluaciones/stewart/algebra.html"
SOURCE = PAGE.with_suffix(".md")
COUNTS = [6, 3, 5, 6, 4, 2, 2, 7, 5, 6]


class Document(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.headings = []
        self.text = []
        self.resources = []
        self.lang = None
        self.current_heading = None
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.lang = attrs.get("lang")
        if tag in ("h1", "h2", "h3"):
            self.current_heading = []
        if tag in ("script", "link", "img"):
            self.resources.append(attrs.get("src", attrs.get("href", "")))

    def handle_data(self, data):
        self.text.append(data)
        if self.current_heading is not None:
            self.current_heading.append(data)

    def handle_endtag(self, tag):
        if tag in ("h1", "h2", "h3") and self.current_heading is not None:
            self.headings.append((tag, "".join(self.current_heading).strip()))
            self.current_heading = None


class AlgebraTests(unittest.TestCase):
    def setUp(self):
        self.html = PAGE.read_text(encoding="utf-8")
        self.page = Document(self.html)

    def test_spanish_offline_and_editable(self):
        self.assertTrue(SOURCE.is_file())
        self.assertEqual(self.page.lang, "es")
        self.assertIn("../../teoria/teoria.css", self.page.resources)
        self.assertFalse(re.search(r'(?:src|href)="(?:https?:)?//', self.html))
        self.assertNotIn("<script", self.html)
        self.assertRegex(self.html, r'<math\b[^>]*xmlns="http://www\.w3\.org/1998/Math/MathML"')
        self.assertIn("<mfrac>", self.html)

    def test_ten_exercises_each_followed_by_teacher_development(self):
        headings = self.page.headings
        exercises = [(i, text) for i, (tag, text) in enumerate(headings)
                     if tag == "h2" and re.fullmatch(r"Ejercicio \d+", text)]
        self.assertEqual([text for _, text in exercises],
                         [f"Ejercicio {i}" for i in range(1, 11)])
        answer_index = headings.index(("h2", "Respuestas del libro"))
        for position, (index, _) in enumerate(exercises):
            end = exercises[position + 1][0] if position < 9 else answer_index
            self.assertEqual(headings[index + 1:end].count(("h3", "Desarrollo docente")), 1)
        self.assertGreater(answer_index, exercises[-1][0])

    def test_all_subparts_and_book_answers_present(self):
        # Cada inciso aparece una vez en la consigna, una en el desarrollo y otra en la clave.
        for number, count in enumerate(COUNTS, 1):
            with self.subTest(exercise=number):
                start = self.html.index(f'id="ejercicio-{number}"')
                end = (self.html.index(f'id="ejercicio-{number + 1}"') if number < 10
                       else self.html.index('id="respuestas-del-libro"'))
                section = self.html[start:end]
                answers = self.html[self.html.index(f'id="respuestas-{number}"'):]
                if number < 10:
                    answers = answers[:answers.index(f'id="respuestas-{number + 1}"')]
                for letter in "abcdefg"[:count]:
                    marker = f"<strong>({letter})</strong>"
                    self.assertEqual(section.count(marker), 2, (number, marker))
                    self.assertEqual(answers.count(marker), 1, (number, marker))

    def test_book_typo_is_explicit_and_original_is_retained(self):
        text = " ".join(self.page.text)
        self.assertIn("errata", text.lower())
        for item in ("5(c)", "8(c)", "8(e)"):
            self.assertIn(item, text)
        # Printed and corrected expressions remain visible in MathML annotations.
        for expression in ("-3, 4", "-1, 2", r"\pm1\pm\sqrt2", r"\pm1,\pm\sqrt2"):
            self.assertIn(expression, self.html)


if __name__ == "__main__":
    unittest.main()
