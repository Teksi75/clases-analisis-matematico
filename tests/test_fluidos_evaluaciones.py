"""Comprobar que el enunciado publicado del Tema 1 restituye el agua omitida en el impreso."""
import re
import unittest
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[1]
FLUIDOS = RAIZ / 'fluidos'
PAGINA = FLUIDOS / 'index.html'
FUENTE = FLUIDOS / 'contenido' / '95-evaluaciones.md'


def texto(html):
    """Devolver el texto visible del fragmento, sin etiquetas ni espacios repetidos."""
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]*>', '', html)).strip()


class EvaluacionesTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not PAGINA.exists():
            raise unittest.SkipTest('Falta fluidos/index.html: ejecutar python3 fluidos/generar.py')
        cls.html = PAGINA.read_text(encoding='utf-8')

    def bloque(self, identificador):
        patron = r'<div id="%s" class="ejercicio">(.*?)</div>\s*(?:<details|<figure|<p>|</div>)' % identificador
        coincidencia = re.search(patron, self.html, re.S)
        self.assertIsNotNone(coincidencia, f'No se encontró el ejercicio {identificador}')
        return texto(coincidencia.group(1))

    def test_el_enunciado_del_tema_1_restituye_el_agua(self):
        self.assertIn('contiene agua y aceite (densidad relativa de 0,55)', self.bloque('eval-tema-1-ej-1'))

    def test_el_enunciado_publicado_no_conserva_la_frase_truncada(self):
        self.assertNotIn('contiene y aceite', self.bloque('eval-tema-1-ej-1'))

    def test_la_nota_declara_la_omision_del_impreso(self):
        aviso = re.search(r'Aclaraciones sobre el texto impreso.*?</div>', self.html, re.S)
        self.assertIsNotNone(aviso, 'Falta la nota sobre el texto impreso')
        nota = texto(aviso.group())
        self.assertIn('«contiene y aceite»', nota)
        self.assertIn('«agua»', nota)
        self.assertIn('restituye', nota)

    def test_la_fuente_mantiene_la_lectura_de_tres_sustancias(self):
        fuente = FUENTE.read_text(encoding='utf-8')
        self.assertIn('contiene agua y aceite', fuente)
        self.assertNotIn('\nEl tanque cilíndrico de la imagen contiene y aceite', fuente)


if __name__ == '__main__':
    unittest.main()
