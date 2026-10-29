"""La edición pública conserva el contenido y la estructura visual del modelo."""
import re
import subprocess
import unittest
import xml.etree.ElementTree as ET
from pathlib import Path

DIR = Path(__file__).resolve().parents[1] / 'evaluaciones/stewart'
PAGES = ('index', 'algebra', 'geometria', 'funciones', 'trigonometria')


class Estetica(unittest.TestCase):
    def test_generated_pages_have_model_layout_and_local_navigation(self):
        for name in PAGES:
            with self.subTest(page=name):
                html = (DIR / (name + '.html')).read_text(encoding='utf-8')
                for marker in ('class="skip-link"', 'class="masthead"', 'class="hero"',
                               'class="reading-layout"', 'class="contents"',
                               'Índice de lectura', '<main id="contenido"', '<article',
                               'class="edition-line"', 'class="chapter-label"',
                               '../../teoria/teoria.css', 'stewart.css'):
                    self.assertIn(marker, html)
                self.assertIn('href="#contenido"', html)
                self.assertIn('href="#inicio"', html)
                if name != 'index':
                    self.assertIn('href="#ejercicio-1"', html)
                    self.assertNotIn('href="#respuestas-del-libro"', html)

    def test_exam_cover_motifs_are_distinct_and_related_to_the_topic(self):
        titles = {
            'algebra': 'Factorización de una diferencia de cuadrados',
            'geometria': 'Circunferencia y radio en el plano cartesiano',
            'funciones': 'Correspondencia entre entradas y salidas de una función',
            'trigonometria': 'Seno y coseno en la circunferencia unitaria',
        }
        drawings = []
        for name, title in titles.items():
            with self.subTest(page=name):
                html = (DIR / (name + '.html')).read_text(encoding='utf-8')
                motif = re.search(r'<svg class="motif".*?</svg>', html, re.S).group()
                svg = ET.fromstring(motif)
                self.assertEqual(svg.get('data-topic'), name)
                self.assertEqual(svg.findtext('title'), title)
                self.assertEqual(svg.get('aria-hidden'), 'true')
                self.assertEqual(svg.get('focusable'), 'false')
                drawings.append(motif)
        self.assertEqual(len(set(drawings)), 4)

    def test_index_cover_keeps_its_existing_motif(self):
        html = (DIR / 'index.html').read_text(encoding='utf-8')
        self.assertIn('M35 15Q125 175 215 15', html)

    def test_original_pandoc_fragment_is_unchanged_in_each_exam(self):
        for name in PAGES[1:]:
            with self.subTest(page=name):
                args = ['pandoc', name + '.md', '--to=html5', '--mathml']
                if name == 'trigonometria':
                    args.append('--from=markdown-fancy_lists')
                fragment = subprocess.run(args, cwd=DIR, check=True, capture_output=True, text=True).stdout
                if name == 'funciones':
                    fragment = fragment.replace('<main style=', '<div style=', 1).replace('</main>', '</div>', 1)
                self.assertIn(fragment, (DIR / (name + '.html')).read_text(encoding='utf-8'))
