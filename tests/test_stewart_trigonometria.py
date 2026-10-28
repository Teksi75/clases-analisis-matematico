import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "evaluaciones/stewart/trigonometria.html"
SOURCE = PAGE.with_suffix(".md")


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.math = 0
        self.images = []
        self.links = []
        self.text = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "math":
            self.math += 1
        if tag == "img":
            self.images.append(attrs.get("src", ""))
        if tag in ("link", "script"):
            self.links.append(attrs.get("href", attrs.get("src", "")))

    def handle_data(self, data):
        self.text.append(data)


class TrigonometriaTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = PAGE.read_text(encoding="utf-8")
        cls.source = SOURCE.read_text(encoding="utf-8")
        cls.page = PageParser()
        cls.page.feed(cls.html)

    def test_nine_exercises_and_immediate_teacher_explanations(self):
        for number in range(1, 10):
            start = self.html.index(f'id="ejercicio-{number}"')
            end = self.html.index(f'id="ejercicio-{number + 1}"') if number < 9 else self.html.index('id="respuestas-del-libro"')
            section = self.html[start:end]
            self.assertIn("Desarrollo docente", section)
        self.assertEqual(self.html.count("Desarrollo docente"), 9)

    def test_named_subparts_and_original_answers(self):
        expected_parts = {1: ("(a)", "(b)"), 2: ("(a)", "(b)"),
                          4: ("(a)", "(b)", "(c)"), 7: ("(a)", "(b)")}
        for number, parts in expected_parts.items():
            exercise = self.source.split(f"## Ejercicio {number} {{#ejercicio-{number}}}", 1)[1].split("### Desarrollo docente", 1)[0]
            for part in parts:
                self.assertIn(part, exercise)
        answers = self.source.split("## Respuestas del libro", 1)[1]
        for excerpt in (r"5\pi/3", r"-\pi/10", r"150^\circ", r"360/\pi\approx114.6^\circ",
                        r"2\pi", r"\sqrt3", r"-\frac12", r"24\operatorname{sen}\theta",
                        r"24\cos\theta", r"-\frac{1}{15}(4+6\sqrt2)",
                        r"0,\pi/3,\pi,5\pi/3,2\pi", "trigonometria-assets/grafica.svg"):
            self.assertIn(excerpt, answers)

    def test_original_answers_and_errata_are_separate(self):
        answer_section = self.html.split('id="respuestas-del-libro"', 1)[1]
        for number in range(1, 9):
            self.assertIn(f'id="respuesta-{number}"', answer_section)
        self.assertIn("errata", answer_section.lower())
        self.assertIn("numeración", answer_section.lower())
        self.assertIn("4+6", self.source)

    def test_standalone_math_and_local_figures(self):
        self.assertGreaterEqual(self.page.math, 30)
        self.assertIn("../../teoria/teoria.css", self.page.links)
        self.assertGreaterEqual(len(self.page.images), 2)
        for path in self.page.images:
            self.assertTrue((PAGE.parent / path).is_file(), path)
        for path in self.page.links + self.page.images:
            self.assertFalse(path.startswith(("http:", "https:", "//")), path)
        self.assertIn('lang="es"', self.html)


if __name__ == "__main__":
    unittest.main()
