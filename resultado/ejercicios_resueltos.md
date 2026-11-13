# Ejercicios y operaciones de los apuntes

Cada sección apunta a la transcripción de la fotografía de origen. Los desarrollos son **correcciones**, no transcripciones: no añaden datos al manuscrito y señalan explícitamente cuándo un resultado depende de una hipótesis. Las regiones recortadas o ilegibles permanecen sin completar. Ver [auditoría](../revision/errores_detectados.md), [dudas](../revision/dudas_ocr.md) y el cálculo reproducible [`revision/calculos.py`](../revision/calculos.py).

Salvo indicación expresa se usa \(g=9,80665\ \mathrm{m/s^2}\), \(1\ \mathrm{kgf}=9,80665\ \mathrm N\), \(\rho_{agua}=1000\ \mathrm{kg/m^3}\) y presiones **manométricas**, respecto de la superficie del líquido. Los valores se redondean al presentarlos.

## 1. Recipiente esférico: etanol y aire — foto 04

**Datos visibles:** radio 10 dm = 1 m; densidades utilizadas en el desarrollo: 810 kg/m³ para etanol y 1,2 kg/m³ para aire. [Fuente](../transcripciones/04.md).

\[
V=\frac{4\pi r^3}{3}=4,18879\ \mathrm{m^3},\qquad m=\rho V.
\]

**Resultado:** etanol \(m=3392,92\ \mathrm{kg}\); aire \(m=5,02655\ \mathrm{kg}\). Con \(\pi=3,14\), el volumen es 4,18667 m³. El valor 4,186 m³ escrito en el apunte no es ese resultado redondeado a tres decimales.

## 2. Tanque cilíndrico con agua y aceite — foto 01

**Datos:** altura 4 m, radio 1 m; agua y aceite ocupan cada uno la mitad del volumen; \(\rho_{aceite}=800\ \mathrm{kg/m^3}\), \(\rho_{agua}=1000\ \mathrm{kg/m^3}\). [Fuente](../transcripciones/01.md).

\[
V=\pi r^2h=12,56637\ \mathrm{m^3},\quad V_{cada\ líquido}=6,28319\ \mathrm{m^3}.
\]

El aceite tiene masa 5026,55 kg y el agua 6283,19 kg; **masa total** \(=11309,73\ \mathrm{kg}\). El resultado original de 11.304 kg es coherente con \(\pi=3,14\), por lo que la diferencia es de redondeo. La densidad relativa del aceite es \(800/1000=0,8\); la densidad global es \((800+1000)/2=900\ \mathrm{kg/m^3}\), porque los volúmenes son iguales.

## 3. Recipiente cúbico lleno de agua — foto 02, apartado a

**Datos:** arista 2 m; volumen 8 m³; área del fondo \(A=4\ \mathrm{m^2}\); altura de agua 2 m. [Fuente](../transcripciones/02.md).

\[
p=\rho gh=1000\cdot9,80665\cdot2=19613,3\ \mathrm{Pa}.
\]

La fuerza manométrica sobre el fondo es \(F=pA=78453,2\ \mathrm N=8000\ \mathrm{kgf}\). El número 1000 kg/m³ del apunte es densidad; el peso específico correspondiente es 9806,65 N/m³ o 1000 kgf/m³.

## 4. Presión sobre un terreno — foto 02, apartado b

**Datos:** 100 m × 150 m y 101325 Pa. [Fuente](../transcripciones/02.md).

Si la presión es uniforme, \(A=15000\ \mathrm{m^2}\) y \(F=pA=101325\cdot15000=\mathbf{1.519.875.000\ N}\). El producto numérico del apunte es correcto; la unidad de fuerza debe indicarse.

## 5. Contenedor cúbico de 4 m — foto 03

**Datos visibles:** arista 4 m, agua, puntos a mitad y al fondo. El enunciado no dice inequívocamente que el contenedor esté lleno. [Fuente](../transcripciones/03.md).

**Solo si está lleno:** las profundidades son 2 m y 4 m. Por \(p=\rho gh\), las presiones manométricas son respectivamente **19.613,3 Pa** y **39.226,6 Pa**. Sin conocer el nivel de la superficie libre no se puede obtener un valor único.

## 6. Conversiones de la franja superior — foto 04

La fotografía conserva operaciones previas, algunas parcialmente ilegibles. [Fuente y lecturas inciertas](../transcripciones/04.md).

- **a)** Si \(7''\) significa 7 pulgadas: \(7\cdot0,0254=0,1778\ \mathrm m\). El factor completo y el resultado manuscritos no pueden asegurarse.
- **b) y c)** Antes del factor final ilegible, \(760\ \mathrm{kgf/m^3}\times9,8=7450,4\ \mathrm{N/m^3}\) y \(10\ \mathrm{kgf/m^3}\times9,8=98\ \mathrm{N/m^3}\). No se puede completar la conversión restante.
- **d)** \(1,5\ \mathrm{m^3/s}\times1000\ \mathrm{L/m^3}\times3600\ \mathrm{s/h}=5.400.000\ \mathrm{L/h}\). La lectura del resultado escrito sigue siendo incierta.
- **e)** \(760\ \mathrm{mL}\times10^{-6}\ \mathrm{m^3/mL}=0,00076\ \mathrm{m^3}\); el factor manuscrito admite dos lecturas.
- **f)** Si 250 T son toneladas de masa, con \(g=9,8\) el peso es \(250\times9800=2.450.000\ \mathrm N\); con gravedad estándar, \(2.451.662,5\ \mathrm N\). El factor debe tener unidad N/T.

## 7. Tres capas y columnas de líquido — foto 05

**Datos visibles:** alturas 4000, 5000 y 4000 mm; valores 300, 900 y [2000/3000], con incertidumbre en los valores/unidades y en la localización exacta de los puntos 1, 2 y 3. [Fuente](../transcripciones/05.md); [esquema](../diagramas/05.svg).

**Hipótesis de cálculo, no lectura recuperada:** los puntos están en las dos interfaces y el fondo; las unidades son kgf/m³ y las presiones son relativas a la superficie. Las alturas son 4, 5 y 4 m. Se suman las contribuciones \(\gamma_i h_i\):

| Peso específico de la última capa | Primera interfaz | Segunda interfaz | Fondo |
|---|---:|---:|---:|
| 2000 kgf/m³ | 1200 kgf/m² = 11.767,98 Pa | 5700 kgf/m² = 55.897,91 Pa | 13.700 kgf/m² = 134.351,11 Pa |
| 3000 kgf/m³ | 1200 kgf/m² = 11.767,98 Pa | 5700 kgf/m² = 55.897,91 Pa | 17.700 kgf/m² = 173.577,71 Pa |

La foto no permite adjudicar con seguridad estos valores a los números de los puntos.

**Columnas equivalentes:** con los valores escritos, \(10330/13600=0,75956\ \mathrm m\) de mercurio, es decir **759,56 mm ≈ 760 mmHg**; 750 mmHg es un error aritmético. Con 1000 kgf/m³ para el agua, \(10330/1000=10,33\ \mathrm{mca}\); la lectura del denominador manuscrito es incierta.

## 8. Actividad 1: presión, altura y masas — foto 06

**Fragmentos visibles:** \(p_3=67032\ \mathrm{Pa}\); valores 700 y 1000, altura 2,5 m; geometría 3 m × 3 m en las operaciones. El enunciado y parte del dibujo no están disponibles. [Fuente](../transcripciones/06.md).

Para reproducir el cálculo del apunte se usa \(g=9,8\):

\[
67032/9,8=6840\ \mathrm{kgf/m^2},\qquad
h=\frac{6840-1000\cdot2,5}{700}=6,2\ \mathrm m.
\]

Aquí 700 y 1000 se interpretan como pesos específicos en kgf/m³; si son densidades en kg/m³ debe incluirse \(g\). Si la presión atmosférica de referencia es 101325 Pa, \(p_{abs}=67032+101325=168357\ \mathrm{Pa}\). Con las dimensiones y densidades usadas en los productos escritos, las masas son \(1000\cdot2,5\cdot3\cdot3=22500\ \mathrm{kg}\) y \(700\cdot6,2\cdot3\cdot3=39060\ \mathrm{kg}\). No es posible verificar por completo la configuración física sin el enunciado faltante.

## 9. Actividad 2: presiones — foto 07

**Fragmentos visibles:** presión 150000 Pa y aportes calculados de 1125 y 2600; el enunciado completo no aparece. [Fuente](../transcripciones/07.md).

Con \(g=9,8\), \(p_1=150000/9,8=15306,12\ \mathrm{kgf/m^2}\). Sumando los incrementos escritos: \(p_2=16431,12\ \mathrm{kgf/m^2}\) y \(p_3=19031,12\ \mathrm{kgf/m^2}\). El apunte redondea a 15306, 16431 y 19031, pero rotula algunas presiones en kg/m² en lugar de kgf/m².

El apartado «\(P=[1645/164,5]\ \mathrm{kg/m^2}+0,5\)» carece de contexto o unidades suficientes para resolverse. No se sustituye la palabra dudosa del desarrollo de densidad por el nombre de otro fluido.

## 10. Prensa hidráulica — foto 07

**Datos visibles:** diámetro menor 0,2 m, mayor 1,5 m; cifra de la carga [2600/2800] kg. [Fuente](../transcripciones/07.md).

**Hipótesis:** esas cifras son masas; émbolos al mismo nivel; prensa ideal sin rozamiento ni peso propio. Entonces \(F_2=mg\), \(F_1=F_2(d_1/d_2)^2\), y \(p=F_2/(\pi d_2^2/4)\).

| Lectura posible | Fuerza menor | Presión |
|---|---:|---:|
| 2600 kg | 46,222 kgf = 453,29 N | 14.428,51 Pa |
| 2800 kg | 49,778 kgf = 488,15 N | 15.538,40 Pa |

No hay base visual suficiente para elegir una carga. A distinta altura de émbolos debe incluirse la diferencia hidrostática.

## 11. Recipiente comunicado bajo carga — foto 08

**Datos visibles:** peso 500 kgf, \(r=1,5\ \mathrm m\) y \(\rho=780\ \mathrm{kg/m^3}\). El dibujo rotula la carga como 500 kg. [Fuente](../transcripciones/08.md); [esquema](../diagramas/08.svg).

**Solo si** \(r\) es el radio del pistón circular, \(h\) es la diferencia de niveles y se desprecia toda pérdida:

\[
 p=\frac{500g}{\pi(1,5)^2}=693,68\ \mathrm{Pa},\qquad
 h=\frac{p}{780g}=0,09069\ \mathrm m.
\]

La geometría y todos los niveles no se identifican inequívocamente en la imagen; este resultado es condicional.

## 12. Cilindro con aceite y agua — foto 09

**Datos visibles:** radio 50 cm, altura 2 m; mitad aceite de peso específico 800 kgf/m³ y mitad agua. [Fuente](../transcripciones/09.md).

**Si** el aceite ocupa el metro superior, el agua el metro inferior y los puntos están en interfaz y fondo, con \(\gamma_{agua}=1000\ \mathrm{kgf/m^3}\):

\[
p_{interfaz}=800\cdot1=800\ \mathrm{kgf/m^2}=7845,32\ \mathrm{Pa},
\]
\[
p_{fondo}=800\cdot1+1000\cdot1=1800\ \mathrm{kgf/m^2}=17651,97\ \mathrm{Pa}.
\]

La ubicación exacta de los puntos no queda suficientemente clara. El producto \(800\cdot0,785=628\) es kgf, no kg; el cálculo de 805,12 mezcla valores de área redondeados. En la parte superior hay otro ejercicio recortado con «F = 64000 kg»: faltan sus datos y kg no es una unidad de fuerza; no puede resolverse.

## 13. Cubo de hielo flotante — foto 10

**Datos:** arista 0,1 m, \(\rho_{hielo}=917\) y \(\rho_{agua}=1000\ \mathrm{kg/m^3}\). [Fuente](../transcripciones/10.md); [dibujo](../diagramas/10.svg).

Para flotación libre con peso y empuje equilibrados:

\[
h_s=0,1\frac{917}{1000}=0,0917\ \mathrm m,\qquad
h_L=0,1-h_s=0,0083\ \mathrm m.
\]

\[
E=\rho_{hielo}Vg=917(0,1)^3g=0,917\ \mathrm{kgf}=8,99270\ \mathrm N.
\]

La altura se expresa en metros; el exponente visible en el resultado manuscrito es incierto. La cifra 0,917 kg corresponde a masa, no a unidad de empuje.

## 14. Esfera de cobre en agua salada — foto 12

**Datos:** radio 0,2 m; densidad del cobre 8960 kg/m³; densidad del agua salada 1030 kg/m³. Se supone la esfera totalmente sumergida y sin apoyo. [Fuente](../transcripciones/12.md).

\[
V=\frac{4\pi}{3}(0,2)^3=0,0335103\ \mathrm{m^3}.
\]

La masa es \(m=8960V=300,2525\ \mathrm{kg}\), por lo que el **peso** es \(W=mg=2944,47\ \mathrm N\). La masa de líquido desplazado es \(1030V=34,5156\ \mathrm{kg}\), y el **empuje** es \(E=1030Vg=338,48\ \mathrm N\). Los resultados manuscritos se aproximan al volumen sin redondear, no al producto por el volumen redondeado de 0,03 m³; además kg no es unidad de fuerza.

## 15. Cubo de igual densidad que el agua — foto 12

**Datos:** arista 5 cm = 0,05 m; densidades del cubo y agua 1000 kg/m³. [Fuente](../transcripciones/12.md).

Si está completamente sumergido, \(V=(0,05)^3=0,000125\ \mathrm{m^3}\) y \(m=0,125\ \mathrm{kg}\). El **peso** y el **empuje** tienen igual módulo:

\[
W=E=0,125g=1,22583\ \mathrm N=0,125\ \mathrm{kgf}.
\]

Las operaciones al pie de la foto están cortadas; no se les atribuyen resultados ni una fórmula que no pueda leerse.
