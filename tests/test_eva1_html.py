"""Checks of the published, self-contained EVA1 solution and its entry points."""
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "evaluaciones/eva1.html"
SECTIONS = [
    "interpretación-del-modelo",
    "a-dónde-está-la-pelota-en-el-suelo-llega-al-arco",
    "b-qué-valores-de-x-no-tienen-sentido-en-esta-situación",
    "c-qué-sucede-cuando-la-sombra-recorrió-10-metros",
    "d-gráfica-altura-máxima-y-asíntotas",
]


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.elements, self.words = [], []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))

    def handle_data(self, text):
        self.words.extend(text.split())

    def attrs(self, tag):
        return [attrs for name, attrs in self.elements if name == tag]


class Eva1HTMLTests(unittest.TestCase):
    def setUp(self):
        self.assertTrue(PAGE.is_file(), "Falta la resolución publicada evaluaciones/eva1.html")
        self.html = PAGE.read_text(encoding="utf-8")
        self.page = Page(self.html)

    def test_accessible_navigation_and_local_targets(self):
        self.assertEqual(self.page.attrs("html")[0]["lang"], "es")
        self.assertEqual(len(self.page.attrs("main")), 1)
        self.assertEqual(self.page.attrs("main")[0]["id"], "contenido")
        self.assertEqual(self.page.attrs("main")[0]["tabindex"], "-1")
        ids = [attrs["id"] for _, attrs in self.page.elements if "id" in attrs]
        self.assertEqual(len(ids), len(set(ids)))
        links = [attrs["href"] for attrs in self.page.attrs("a")]
        self.assertIn("#contenido", links)
        self.assertEqual(links.count("../teoria/index.html"), 2)
        self.assertIn("../material/pdf/eva1.pdf", links)
        self.assertIn('class="skip-link"', self.html)
        self.assertIn(":focus-visible", self.html)
        self.assertTrue(any(attrs.get("aria-label") for attrs in self.page.attrs("nav")))
        for section in SECTIONS:
            self.assertIn(section, ids)
            self.assertIn("#" + section, links)
        for link in links:
            target = urlsplit(link)
            self.assertFalse(target.scheme or target.netloc, link)
            path = PAGE.parent / unquote(target.path) if target.path else PAGE
            self.assertTrue(path.is_file(), link)
            if target.fragment:
                self.assertIn(unquote(target.fragment), ids)
        first_heading = self.html.index("<h1")
        self.assertLess(self.html.index('href="../teoria/index.html"'), first_heading)
        self.assertGreater(self.html.rindex('href="../teoria/index.html"'), self.html.rindex("</table>"))

    def test_complete_offline_pedagogy_math_graph_and_tables(self):
        for tag, count in {"math": 89, "annotation": 89, "svg": 1,
                           "table": 3, "tr": 21, "h2": 5, "h3": 7}.items():
            self.assertEqual(len(self.page.attrs(tag)), count, tag)
        text = " ".join(self.page.words)
        for phrase in ["representa una distancia, no el tiempo.",
                       "es la raíz principal", "cae 10 metros antes",
                       "dominio físico del modelo", "teorema de Pitágoras",
                       "No es la longitud de la trayectoria curva",
                       "La parábola es simétrica", "disminuyen sin límite"]:
            self.assertIn(phrase, text)
        for formula in [r"h(10)=\frac{160}{27}", r"d\approx11{,}62",
                        r"V=(45;15)", r"0\leq x\leq90"]:
            self.assertIn(formula, self.html)
        svg = self.page.attrs("svg")[0]
        self.assertEqual(svg["role"], "img")
        self.assertEqual(svg["aria-labelledby"], "eva1-titulo")
        self.assertTrue(self.page.attrs("polyline")[0]["points"].endswith("595.00,245.00"))
        self.assertFalse(self.page.attrs("script"))
        self.assertFalse(self.page.attrs("link"))
        self.assertNotRegex(self.html, r"@import|url\(")
        for _, attrs in self.page.elements:
            for name in ("src", "href", "xlink:href"):
                if name in attrs:
                    self.assertFalse(urlsplit(attrs[name]).scheme, attrs[name])
        self.assertIn("html.eva1-document", self.html)
        self.assertIn("@media print", self.html)
        self.assertIn("overflow-x: auto", self.html)
        self.assertIn("prolongación matemática", text)
        self.assertIn("Una curva puede cruzar una asíntota", text)

    def test_published_and_editable_entry_points(self):
        for filename in ("teoria/plantilla.html", "teoria/index.html"):
            html = (ROOT / filename).read_text(encoding="utf-8")
            links = [attrs.get("href") for attrs in Page(html).attrs("a")]
            self.assertIn("../evaluaciones/eva1.html", links, filename)
            self.assertIn("Sobre los apuntes", html)
            self.assertLess(html.index('href="../evaluaciones/eva1.html"'), html.index('<section class="hero"'))
        lesson = (ROOT / "teoria/01-funciones.md").read_text(encoding="utf-8")
        model = lesson.split("## 8. Modelo de EVA1:")[1].split("## 9.")[0]
        self.assertIn("(../evaluaciones/eva1.html)", model)
        self.assertIn("(evaluaciones/eva1.html)", (ROOT / "README.md").read_text(encoding="utf-8"))
        published = (ROOT / "teoria/index.html").read_text(encoding="utf-8")
        self.assertGreaterEqual(published.count('href="../evaluaciones/eva1.html"'), 2)


if __name__ == "__main__":
    unittest.main()
