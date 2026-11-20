"""Regresiones de los esquemas del Trabajo Práctico n.º 1 de Mecánica de los Fluidos."""
import unittest
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
FLUIDOS = ROOT / 'fluidos'
CAPITULO = FLUIDOS / 'contenido/96-trabajo-practico.md'
PRENSA = FLUIDOS / 'graficos/tp-1-prensa.svg'
PONTON = FLUIDOS / 'graficos/tp-1-ponton.svg'
SVG = '{http://www.w3.org/2000/svg}'

# Datos que la hoja impresa imprime y que el esquema debe dejar legibles por sí solo (S9).
DATOS_PRENSA = ('40 mm', '200 mm', '100 mm', '120 mm', '150 mm', '300 N', '900 kg/m³')
DATOS_PONTON = ('4,00 m', '2,00 m', '1,00 m', '5 mm', '7850', '1,2 kg/m³', '1025 kg/m³')


def identificados(ruta):
    root = ET.parse(ruta).getroot()
    elementos = {nodo.get('id'): nodo for nodo in root.iter() if nodo.get('id')}
    textos = ' '.join(''.join(nodo.itertext()) for nodo in root.iter(SVG + 'text'))
    return root, elementos, textos


class TrabajoPracticoGraficosTests(unittest.TestCase):
    def test_los_dos_ejercicios_tienen_su_esquema(self):
        for ruta in (PRENSA, PONTON):
            with self.subTest(esquema=ruta.name):
                self.assertTrue(ruta.is_file(), f'El capítulo publica {ruta.name}')

    def test_los_esquemas_declaran_los_datos_impresos_en_titulo_y_descripcion(self):
        for ruta, datos in ((PRENSA, DATOS_PRENSA), (PONTON, DATOS_PONTON)):
            root, _, _ = identificados(ruta)
            titulo = root.find(SVG + 'title')
            descripcion = root.find(SVG + 'desc')
            self.assertIsNotNone(titulo, f'{ruta.name} necesita <title>')
            self.assertIsNotNone(descripcion, f'{ruta.name} necesita <desc>')
            texto = f"{titulo.text or ''} {descripcion.text or ''}"
            for dato in datos:
                with self.subTest(esquema=ruta.name, dato=dato):
                    self.assertIn(dato, texto)

    def test_la_prensa_dibuja_dos_embolos_de_1_a_5_con_la_carrera_del_tope(self):
        _, elementos, textos = identificados(PRENSA)
        chico, grande = elementos['embolo-1'], elementos['embolo-2']
        ancho_chico, ancho_grande = float(chico.get('width')), float(grande.get('width'))
        self.assertEqual(ancho_grande, 5 * ancho_chico)  # 200 mm contra 40 mm
        cara_chica = float(chico.get('y')) + float(chico.get('height'))
        cara_grande = float(grande.get('y')) + float(grande.get('height'))
        self.assertEqual(cara_chica, cara_grande)  # caras al mismo nivel en el modelo ideal
        tope = elementos['tope']
        carrera = float(tope.get('y')) - cara_chica
        self.assertAlmostEqual(carrera / float(chico.get('height')), 150 / 100)
        self.assertEqual(float(tope.get('width')), ancho_chico)
        self.assertIn('tope', textos.casefold())

    def test_el_ponton_flota_a_media_altura_y_muestra_la_chapa(self):
        _, elementos, textos = identificados(PONTON)
        casco = elementos['casco']
        tope, fondo = float(casco.get('y')), float(casco.get('y')) + float(casco.get('height'))
        superficie = float(elementos['superficie-agua'].get('y1'))
        self.assertGreater(superficie, tope)
        self.assertLess(superficie, fondo)
        sumergida = elementos['parte-sumergida']
        self.assertEqual(float(sumergida.get('y')), superficie)
        self.assertEqual(float(sumergida.get('y')) + float(sumergida.get('height')), fondo)
        for cara in ('tapa', 'costado'):
            self.assertEqual(elementos[cara].tag, SVG + 'polygon')
        for leyenda in ('AIRE', '1,99 m', '0,99 m', '5 mm'):
            with self.subTest(leyenda=leyenda):
                self.assertIn(leyenda, textos)

    def test_los_esquemas_no_copian_las_fotografias_ni_las_citan(self):
        rastros = ('imagenes/originales', 'transcripciones/', '.jpeg', '.jpg', 'base64')
        for ruta in (PRENSA, PONTON):
            texto = ruta.read_text(encoding='utf-8')
            for rastro in rastros:
                with self.subTest(esquema=ruta.name, rastro=rastro):
                    self.assertNotIn(rastro, texto)

    def test_el_capitulo_publica_los_esquemas_en_su_ejercicio(self):
        fuente = CAPITULO.read_text(encoding='utf-8')
        self.assertIn('(graficos/tp-1-prensa.svg)', fuente)
        self.assertIn('(graficos/tp-1-ponton.svg)', fuente)


if __name__ == '__main__':
    unittest.main()
