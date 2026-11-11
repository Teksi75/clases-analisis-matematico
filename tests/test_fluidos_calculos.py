"""Comprobar la física publicada en el material de fluidos.

Dos comprobaciones por ejercicio:
1. Recalcular la magnitud con las fórmulas del capítulo correspondiente.
2. Verificar que el valor recalculado aparece en el HTML generado.

Si el contenido cambia un número sin cambiar la física (o al revés), la prueba falla.
"""
import html
import math
import re
import unittest
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[1]
PAGINA = RAIZ / 'fluidos' / 'index.html'

G = 9.80665          # m/s^2, gravedad estándar usada en el material
KGF = 9.80665        # N por kgf
AGUA = 1000.0        # kg/m^3
RHO_HIELO = 917.0
RHO_CU = 8960.0
RHO_MAR = 1030.0
RHO_HG = 13600.0


def texto_publicado():
    if not PAGINA.exists():
        raise unittest.SkipTest('Falta fluidos/index.html: ejecutar python3 fluidos/generar.py')
    bruto = PAGINA.read_text(encoding='utf-8')
    texto = html.unescape(re.sub(r'<[^>]*>', '', bruto))
    return texto.replace('\u2212', '-').replace('\u00a0', ' ').replace('\u2009', ' ')


class FisicaTests(unittest.TestCase):
    """Recalcula cada resultado con las fórmulas del cuaderno."""

    def test_esfera_volumen_y_masas(self):
        v = 4 / 3 * math.pi * 1 ** 3
        self.assertAlmostEqual(v, 4.18879, places=5)
        self.assertAlmostEqual(810 * v, 3392.92, places=2)
        self.assertAlmostEqual(1.2 * v, 5.02655, places=5)
        # Con pi = 3,14 el volumen no es el mismo redondeado: es otro calculo.
        self.assertAlmostEqual(4 / 3 * 3.14, 4.186667, places=6)

    def test_tanque_agua_y_aceite(self):
        v = math.pi * 1 ** 2 * 4
        self.assertAlmostEqual(v / 2, 6.283185, places=6)
        self.assertAlmostEqual(800 * v / 2, 5026.55, places=2)
        self.assertAlmostEqual(1000 * v / 2, 6283.19, places=2)
        self.assertAlmostEqual(800 * v / 2 + 1000 * v / 2, 11309.73, places=2)
        self.assertAlmostEqual((800 + 1000) / 2, 900.0)
        # El manuscrito uso pi = 3,14 y por eso llego a 11 304 kg.
        self.assertAlmostEqual(800 * 3.14 * 2 + 1000 * 3.14 * 2, 11304.0, places=6)

    def test_conversiones_de_unidades(self):
        self.assertAlmostEqual(760 * KGF, 7453.05, places=2)
        self.assertAlmostEqual(10 * KGF, 98.07, places=2)
        self.assertAlmostEqual(250 * 1000 * G, 2451662.5, places=1)
        self.assertAlmostEqual(1.5 * 1000 * 3600, 5400000.0)
        self.assertAlmostEqual(760e-6, 7.6e-4, places=10)
        self.assertAlmostEqual(7 * 0.0254, 0.1778, places=6)

    def test_cubo_presion_y_fuerza(self):
        p = AGUA * G * 2
        self.assertAlmostEqual(p, 19613.3, places=1)
        self.assertAlmostEqual(p * 4, 78453.2, places=1)
        # La fuerza sobre el fondo iguala el peso del agua: 8 m^3 dan 8000 kgf.
        self.assertAlmostEqual(p * 4 / KGF, 8000.0, places=3)

    def test_terreno_fuerza(self):
        f = 101325 * 100 * 150
        self.assertEqual(f, 1519875000)

    def test_dos_profundidades(self):
        self.assertAlmostEqual(AGUA * G * 2, 19613.3, places=1)
        self.assertAlmostEqual(AGUA * G * 4, 39226.6, places=1)
        self.assertAlmostEqual(AGUA * G * 4 * 16, 627626.0, places=0)

    def test_tres_capas(self):
        p1 = 300 * 4
        p2 = p1 + 900 * 5
        # Los valores publicados estan redondeados a dos decimales: tolerancia de medio centesimo.
        self.assertAlmostEqual(p1 * KGF, 11767.98, delta=0.006)
        self.assertAlmostEqual(p2 * KGF, 55897.91, delta=0.006)
        self.assertAlmostEqual((p2 + 2000 * 4) * KGF, 134351.11, delta=0.006)
        self.assertAlmostEqual((p2 + 3000 * 4) * KGF, 173577.71, delta=0.006)

    def test_profundidad_desconocida(self):
        kgf_m2 = 67032 / 9.8          # el apunte usa g = 9,8 en este ejercicio
        self.assertAlmostEqual(kgf_m2, 6840.0, places=6)
        self.assertAlmostEqual((kgf_m2 - 1000 * 2.5) / 700, 6.2, places=9)

    def test_columnas_de_liquido(self):
        p = 10330 * KGF
        self.assertAlmostEqual(p, 101302.7, places=1)
        self.assertAlmostEqual(p / (RHO_HG * G), 0.75956, places=5)
        self.assertAlmostEqual(p / (AGUA * G), 10.33, places=2)
        # 750 mmHg no es el valor correcto.
        self.assertGreater(p / (RHO_HG * G) * 1000, 755)
        # Una atmosfera standard coincide con 760 mmHg dentro del 0,1 %.
        self.assertAlmostEqual(101325 / (RHO_HG * G) * 1000, 760, delta=0.6)

    def test_prensa_hidraulica(self):
        a1 = math.pi * 0.2 ** 2 / 4
        a2 = math.pi * 1.5 ** 2 / 4
        self.assertAlmostEqual(a2 / a1, 56.25, places=9)
        f2 = 2600 * G
        self.assertAlmostEqual(f2, 25497.29, places=2)
        self.assertAlmostEqual(f2 * a1 / a2, 453.29, places=2)
        self.assertAlmostEqual(f2 / a2, 14428.5, places=1)
        f2b = 2800 * G
        self.assertAlmostEqual(f2b * a1 / a2, 488.15, places=2)
        self.assertAlmostEqual(f2b / a2, 15538.4, places=1)
        # Conservacion del volumen: 10 cm de la carga equivalen a 5,625 m del embolo menor.
        self.assertAlmostEqual(0.10 * a2 / a1, 5.625, places=9)

    def test_recipiente_comunicado(self):
        a = math.pi * 1.5 ** 2
        p = 500 * KGF / a
        self.assertAlmostEqual(p, 693.68, places=2)
        self.assertAlmostEqual(p / (780 * G), 0.09069, places=5)

    def test_cilindro_aceite_y_agua(self):
        self.assertAlmostEqual(800 * KGF, 7845.32, places=2)
        self.assertAlmostEqual(1800 * KGF, 17651.97, places=2)
        self.assertAlmostEqual(math.pi * 0.25, 0.785398, places=6)

    def test_hielo_flotante(self):
        self.assertAlmostEqual(0.1 * RHO_HIELO / AGUA, 0.0917, places=6)
        self.assertAlmostEqual(0.1 - 0.0917, 0.0083, places=6)
        self.assertAlmostEqual(RHO_HIELO * 0.1 ** 3 * G, 8.9927, places=4)
        self.assertAlmostEqual(RHO_HIELO * 0.1 ** 3, 0.917, places=9)

    def test_esfera_de_cobre(self):
        v = 4 / 3 * math.pi * 0.2 ** 3
        self.assertAlmostEqual(v, 0.0335103, places=7)
        self.assertAlmostEqual(RHO_CU * v, 300.2525, places=4)
        self.assertAlmostEqual(RHO_CU * v * G, 2944.47, places=2)
        self.assertAlmostEqual(RHO_MAR * v, 34.5156, places=4)
        self.assertAlmostEqual(RHO_MAR * v * G, 338.48, places=2)
        self.assertAlmostEqual(RHO_CU * v * G - RHO_MAR * v * G, 2605.99, places=2)
        self.assertGreater(RHO_CU / RHO_MAR, 1.0)

    def test_cubo_equilibrio_neutro(self):
        v = 0.05 ** 3
        self.assertAlmostEqual(v, 1.25e-4, places=12)
        self.assertAlmostEqual(1000 * v, 0.125, places=9)
        self.assertAlmostEqual(0.125 * G, 1.22583, places=5)

    def test_caja_altura_metacentrica(self):
        calado = 0.6
        v = 0.6 * 0.6 * calado
        i = 0.6 * 0.6 ** 3 / 12
        self.assertAlmostEqual(v, 0.216, places=9)
        self.assertAlmostEqual(i, 0.0108, places=9)
        self.assertAlmostEqual(i / v, 0.05, places=9)
        self.assertAlmostEqual(0.5 - calado / 2, 0.2, places=9)
        self.assertLess(i / v - (0.5 - calado / 2), 0)   # GM < 0: inestable

    def test_bajar_el_centro_de_gravedad_cambia_bg_y_no_bm(self):
        # BM depende solo de la geometria de flotacion (I y V), no de donde esta G.
        v = 0.6 * 0.6 * 0.6
        bm = (0.6 * 0.6 ** 3 / 12) / v
        self.assertAlmostEqual(bm, 0.05, places=9)
        anteriores = []
        for altura_g in (0.5, 0.45, 0.40):
            gm = bm - (altura_g - 0.3)
            anteriores.append(gm)
        # Al bajar G, GM crece y BM no se toca: lo que cambia es BG.
        self.assertEqual(anteriores, sorted(anteriores))
        self.assertAlmostEqual(bm, 0.05, places=9)
        self.assertAlmostEqual(anteriores[0], -0.15, places=9)
        self.assertAlmostEqual(anteriores[-1], -0.05, places=9)


class PublicacionTests(unittest.TestCase):
    """El valor recalculado debe aparecer en el HTML, no solo en la prueba."""

    VALORES = [
        '4,18879', '3392,92', '5,02655',              # esfera
        '12,566371', '5026,55', '6283,19', '11309,73',  # tanque
        '7453,05', '98,07', '2451662,5', '5400000',     # conversiones
        '19613,3', '78453,2',                          # cubo 2 m
        '1519875000',                                   # terreno
        '39226,6', '627626',                            # cubo 4 m
        '11767,98', '55897,91', '134351,11', '173577,71',  # tres capas
        '6840', '6,2',                                  # profundidad
        '101302,7', '759,56', '10,33',                  # columnas
        '453,29', '488,15', '14428,5', '15538,4',       # prensa
        '693,68', '0,09069',                            # comunicado
        '7845,32', '17651,97',                          # cilindro
        '0,0917', '0,0083', '8,9927',                   # hielo
        '2944,47', '338,48', '2605,99',                 # cobre
        '1,22583',                                      # cubo neutro
        '0,0108', '0,05', '-0,15',                      # estabilidad
    ]

    def test_valores_publicados(self):
        texto = texto_publicado()
        faltan = [v for v in self.VALORES if v not in texto]
        self.assertEqual(faltan, [], f'Valores ausentes del HTML: {faltan}')

    def test_no_hay_unidades_incompatibles(self):
        texto = texto_publicado()
        # El peso especifico del agua no puede publicarse como 1000 kg/m3.
        self.assertNotRegex(texto, r'\\gamma[^.]{0,40}1000\\ ?kg/m')
        # Ningun empuje puede quedar expresado en kg.
        self.assertNotRegex(texto, r'E=0,917\\ ?kg(?!f)')


if __name__ == '__main__':
    unittest.main()
