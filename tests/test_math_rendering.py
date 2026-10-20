"""Check mathematical notation in the published offline HTML, not its source renderer."""
import re
import unittest
import xml.etree.ElementTree as ET
from pathlib import Path

FOLDER = Path(__file__).resolve().parents[1] / "evaluaciones" / "diagnosticos"
PAGES = ["01-funciones", "02-limites-continuidad", "03-derivadas",
         "04-integrales", "guia-docente"]
NS = {"m": "http://www.w3.org/1998/Math/MathML"}


def formulas(name):
    html = (FOLDER / (name + ".html")).read_text()
    return [ET.fromstring(fragment) for fragment in
            re.findall(r"<math\b.*?</math>", html, re.DOTALL)]


def annotated(name):
    def normalize(text):
        return text.strip().removeprefix(r"\displaystyle ").replace(r"\lim\limits_", r"\lim_")
    return {normalize(formula.find(".//m:annotation", NS).text): formula
            for formula in formulas(name)}


class MathRenderingTests(unittest.TestCase):
    def test_fractions_are_structured_in_every_math_page(self):
        for name in PAGES:
            with self.subTest(page=name):
                items = formulas(name)
                self.assertTrue(items, "Expected rendered MathML")
                self.assertTrue(any(item.find(".//m:mfrac", NS) is not None for item in items),
                                "Expected stacked fractions")
                for item in items:
                    annotation = item.find(".//m:annotation", NS)
                    self.assertIsNotNone(annotation)
                    self.assertEqual(annotation.get("encoding"), "application/x-tex")
                    self.assertNotEqual(annotation.text, "")

    def test_limits_preserve_direction_and_approach(self):
        items = annotated("02-limites-continuidad")
        for expression in [r"\lim_{x\to 1^-} f(x)", r"\lim_{x\to 1^+} f(x)",
                           r"\lim_{x\to 1} f(x)",
                           r"\lim_{x\to 2}\frac{x^2-4}{x-2}",
                           r"\lim_{x\to -1}\frac{x^2+3x+2}{x+1}"]:
            with self.subTest(expression=expression):
                self.assertIn(expression, items)
                self.assertIsNotNone(items[expression].find(".//m:munder", NS))

    def test_derivative_primes_and_quotient_remain(self):
        items = annotated("03-derivadas")
        self.assertIn("f'(x)", items)
        self.assertIn("′", "".join(items["f'(x)"].find("m:semantics", NS)[0].itertext()))
        self.assertIn(r"h(x)=\frac{x^2+x}{x^3}", items)
        self.assertIn("L(x)=f(x^2)", items)
        self.assertIn(r"f'\left(\frac{1}{2}\right)", items)

    def test_integrals_preserve_integrands_and_endpoints(self):
        items = annotated("04-integrales")
        for expression in [r"\int (e^x+x^2)\,\mathrm{d}x",
                           r"\int \frac{1}{x^3}\,\mathrm{d}x",
                           r"\int (\operatorname{sen}(x)-\cos(x))\,\mathrm{d}x",
                           r"\int 3\operatorname{sen}(4x)\,\mathrm{d}x",
                           r"\int e^{6x}\,\mathrm{d}x"]:
            self.assertIn(expression, items)
        definite = r"\int_0^3 r(x)\,\mathrm{d}x"
        self.assertIn(definite, items)
        operator = items[definite].find(".//m:msubsup", NS)
        self.assertIsNotNone(operator)
        self.assertEqual(["".join(child.itertext()) for child in operator], ["∫", "0", "3"])

    def test_original_model_and_reference_answers_are_preserved(self):
        self.assertIn(r"h(x)=-\frac{(x-45)^2}{135}+15", annotated("01-funciones"))
        answers = annotated("guia-docente")
        for expression in [r"\frac{160}{27}\approx 5{,}93\,\mathrm{m}",
                           r"\sqrt{10^2+\left(\frac{160}{27}\right)^2}\approx 11{,}62\,\mathrm{m}",
                           "L'(x)=12x^3-4x", r"-\frac{3}{4}\cos(4x)+C",
                           r"\left[4x+x^2\right]_0^3=21"]:
            self.assertIn(expression, answers)

    def test_math_pages_work_without_scripts_or_external_assets(self):
        for name in ["index", *PAGES]:
            with self.subTest(page=name):
                html = (FOLDER / (name + ".html")).read_text()
                self.assertFalse(re.search(r"<script\b", html), "Unexpected script")
                self.assertFalse(re.search(r'(?:src|href)="(?:https?:)?//', html),
                                 "Unexpected external resource")
                if name != "index":
                    self.assertFalse(re.search(r"<code\b", html), "Math is still formatted as code")
                    self.assertFalse('class="math' in html, "Unrendered math fallback")


if __name__ == "__main__":
    unittest.main()
