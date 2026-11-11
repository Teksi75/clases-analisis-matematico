"""Comprobar que las figuras publicadas existen y no exponen material fotográfico."""
import re
import unittest
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[1]
FLUIDOS = RAIZ / 'fluidos'
PAGINA = FLUIDOS / 'index.html'

# Rastros del material auxiliar descartable: fotos, rutas de originales y transcripciones.
RASTROS = ('imagenes/originales/', 'imagenes/procesadas/', 'transcripciones/', '.jpeg', '.jpg')


class FigurasTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not PAGINA.exists():
            raise unittest.SkipTest('Falta fluidos/index.html: ejecutar python3 fluidos/generar.py')
        cls.html = PAGINA.read_text(encoding='utf-8')
        cls.fuentes = re.findall(r'<img[^>]+src="([^"]+)"', cls.html)

    def test_las_figuras_existen(self):
        self.assertGreaterEqual(len(self.fuentes), 7, 'El cuaderno debe publicar sus esquemas')
        for src in self.fuentes:
            with self.subTest(figura=src):
                self.assertTrue((FLUIDOS / src).resolve().exists(), f'No existe {src}')

    def test_los_esquemas_no_contienen_rastros_fotograficos(self):
        for src in self.fuentes:
            texto = (FLUIDOS / src).resolve().read_text(encoding='utf-8')
            for rastro in RASTROS:
                with self.subTest(figura=src, rastro=rastro):
                    self.assertNotIn(rastro, texto, f'{src} expone {rastro}')

    def test_la_pagina_no_enlaza_fotos_ni_transcripciones(self):
        for rastro in RASTROS:
            with self.subTest(rastro=rastro):
                self.assertNotIn(rastro, self.html)


if __name__ == '__main__':
    unittest.main()
