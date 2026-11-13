"""Recalculate visible exercises; see ejercicios_resueltos.md for hypotheses.

Run: python3 revision/calculos.py
SI values use standard gravity. Page 06–07 also show the notebook's g=9.8.
"""
import math

G = 9.80665

def show(label, **values):
    print(label + ': ' + ', '.join(f'{k}={v:.8g}' for k, v in values.items()))

v04 = 4 * math.pi / 3
show('04 esfera', volumen_m3=v04, etanol_kg=v04 * 810, aire_kg=v04 * 1.2)
show('04 conversiones', pulgadas_7_m=7 * .0254, ml_760_m3=760e-6,
     caudal_L_h=1.5 * 1000 * 3600, peso_250t_N=250000 * G)
v01 = 4 * math.pi
show('01 cilindro', volumen_m3=v01, aceite_kg=800 * v01 / 2,
     agua_kg=1000 * v01 / 2, total_kg=900 * v01, densidad_kg_m3=900)
show('02 y 03 agua', a_2m_Pa=1000 * G * 2, a_4m_Pa=1000 * G * 4,
     fuerza_fondo_02_N=1000 * G * 2 * 4, fuerza_terreno_N=101325 * 100 * 150)
for gamma in (2000, 3000):
    vals = [300 * 4, 300 * 4 + 900 * 5, 300 * 4 + 900 * 5 + gamma * 4]
    show(f'05 capas gamma3={gamma}', p1_kgf_m2=vals[0], p2_kgf_m2=vals[1],
         p3_kgf_m2=vals[2], p1_Pa=vals[0]*G, p2_Pa=vals[1]*G, p3_Pa=vals[2]*G)
show('05 columnas', agua_m=10330 / 1000, mercurio_mm=10330 / 13600 * 1000)
show('06 actividad con g=9.8', presion_kgf_m2=67032 / 9.8,
     altura_m=(67032 / 9.8 - 1000 * 2.5) / 700,
     absoluta_Pa=67032 + 101325, masa_agua_kg=1000 * 2.5 * 3 * 3,
     masa_otro_kg=700 * 6.2 * 3 * 3)
show('07 actividad con g=9.8', p1_kgf_m2=150000 / 9.8,
     p2_kgf_m2=150000 / 9.8 + 1125, p3_kgf_m2=150000 / 9.8 + 1125 + 2600)
for mass in (2600, 2800):
    show(f'07 prensa masa={mass}', fuerza_N=mass * G * (.2 / 1.5)**2,
         fuerza_kgf=mass * (.2 / 1.5)**2,
         presion_Pa=mass * G / (math.pi * (.75)**2))
show('08 equilibrio', h_m=500 / (math.pi * 1.5**2 * 780),
     presion_Pa=500 * G / (math.pi * 1.5**2))
show('09 cilindro', interfaz_Pa=800 * G, fondo_Pa=1800 * G)
show('10 hielo', sumergido_m=.1 * .917, libre_m=.1 * (1 - .917),
     empuje_N=.1**3 * 917 * G, empuje_kgf=.1**3 * 917)
v12 = 4 / 3 * math.pi * .2**3
show('12 esfera', volumen_m3=v12, masa_kg=v12 * 8960, peso_N=v12 * 8960 * G,
     masa_desplazada_kg=v12 * 1030, empuje_N=v12 * 1030 * G)
show('12 cubo', volumen_m3=.05**3, masa_kg=.05**3 * 1000,
     peso_y_empuje_N=.05**3 * 1000 * G)
