"""Regression checks for the published diagnostic pages, using only the standard library."""
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
FOLDER = ROOT / "evaluaciones" / "diagnosticos"
SHEETS = {
    "01-funciones": "F",
    "02-limites-continuidad": "L",
    "03-derivadas": "D",
    "04-integrales": "I",
}


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.text = []
        self.links = []
        self.ids = []
        self.lang = None
        self.main_text = []
        self.in_main = False
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.lang = attrs.get("lang")
        if tag == "main":
            self.in_main = True
        if tag == "a":
            self.links.append(attrs.get("href", ""))
        if "id" in attrs:
            self.ids.append(attrs["id"])

    def handle_endtag(self, tag):
        if tag == "main":
            self.in_main = False

    def handle_data(self, text):
        self.text.append(text)
        if self.in_main:
            self.main_text.append(text)

    def visible_text(self):
        return " ".join(" ".join(self.text).split())


class DiagnosticHTMLTests(unittest.TestCase):
    def test_student_pages_have_no_maintenance_or_teacher_content(self):
        for name in ["index", *SHEETS]:
            with self.subTest(page=name):
                page = Page(FOLDER / (name + ".html"))
                for term in ["Abrí index.html", "Markdown", "Regenerar", "Pandoc",
                             "Versión editable", "Guía docente", "Cómo aplicarlas"]:
                    self.assertNotIn(term, page.visible_text())
                self.assertFalse(any(urlsplit(link).path.endswith(".md")
                                     or "guia-docente" in link for link in page.links))

    def test_school_and_year_are_in_printable_content(self):
        for name in ["index", *SHEETS, "guia-docente"]:
            with self.subTest(page=name):
                page = Page(FOLDER / (name + ".html"))
                self.assertIn("ETec · 5.º año · Matemática", " ".join(page.main_text))

    def test_each_sheet_identifies_the_attempt(self):
        for name in SHEETS:
            with self.subTest(page=name):
                text = Page(FOLDER / (name + ".html")).visible_text()
                for label in ["Nombre y apellido:", "Fecha:", "Instancia:",
                              "Diagnóstico inicial", "Revisión posterior"]:
                    self.assertIn(label, text)

    def test_existing_exercises_and_pdf_references_remain(self):
        for name, prefix in SHEETS.items():
            with self.subTest(page=name):
                page = Page(FOLDER / (name + ".html"))
                self.assertEqual(re.findall(r"\b" + prefix + r"[1-5] ·", page.visible_text()),
                                 [prefix + str(i) + " ·" for i in range(1, 6)])
                self.assertTrue(any(urlsplit(link).path.endswith(".pdf") for link in page.links))
                self.assertIn("No lo vi", page.visible_text())

    def test_existing_navigation_and_links_work(self):
        for name in ["index", *SHEETS, "guia-docente"]:
            path = FOLDER / (name + ".html")
            page = Page(path)
            self.assertEqual(page.lang, "es")
            self.assertIn("index.html", page.links)
            self.assertEqual(len(page.ids), len(set(page.ids)))
            for link in page.links:
                parsed = urlsplit(link)
                if parsed.scheme:
                    continue
                target = path.parent / unquote(parsed.path) if parsed.path else path
                self.assertTrue(target.exists(), (name, link))
                if target == path and parsed.fragment:
                    self.assertIn(unquote(parsed.fragment), page.ids)

    def test_teacher_answers_remain_available_separately(self):
        text = Page(FOLDER / "guia-docente.html").visible_text()
        self.assertIn("No entregar junto con las hojas del estudiante", text)
        self.assertIn("Respuesta esperada", text)
        self.assertIn("Registro sugerido", text)


if __name__ == "__main__":
    unittest.main()
