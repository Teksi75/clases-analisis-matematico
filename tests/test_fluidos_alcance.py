"""Comprobar que el material ajeno a los apuntes queda marcado como ampliación opcional."""
import re
import unittest
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[1]
FLUIDOS = RAIZ / 'fluidos'
PAGINA = FLUIDOS / 'index.html'
CSS = FLUIDOS / 'fluidos.css'


class AlcanceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not PAGINA.exists():
            raise unittest.SkipTest('Falta fluidos/index.html: ejecutar python3 fluidos/generar.py')
        cls.html = PAGINA.read_text(encoding='utf-8')

    def test_hay_bloques_de_ampliacion(self):
        marcas = re.findall(r'<div class="ampliacion"', self.html)
        self.assertGreaterEqual(len(marcas), 8, 'Los desarrollos ajenos al apunte deben ir marcados')

    def test_la_advertencia_es_visible_y_legible(self):
        css = CSS.read_text(encoding='utf-8')
        self.assertIn('.ampliacion::before', css)
        self.assertIn('no está en el apunte', css)

    def test_la_marca_de_ampliacion_se_explica_sola(self):
        # La etiqueta la pone el CSS: la página no necesita una leyenda editorial.
        self.assertIn('Ampliación · no está en el apunte', CSS.read_text(encoding='utf-8'))
        texto = re.sub(r'<[^>]*>', '', self.html)
        self.assertNotIn('Cómo leer este cuaderno', texto)
        self.assertNotIn('agregan contexto', texto)

    def test_las_ampliaciones_no_sustituyen_al_temario(self):
        # El criterio de estabilidad de un cuerpo sumergido es del apunte y va sin marcar.
        self.assertIn('Regla para un cuerpo totalmente sumergido', self.html)


if __name__ == '__main__':
    unittest.main()
