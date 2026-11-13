# Auditoría de Física y lecturas

La transcripción fiel está separada en [`resultado/apuntes_originales.md`](../resultado/apuntes_originales.md). Esta auditoría se apoya en una revisión independiente de las 12 fotografías y transcripciones; los resultados condicionales no son texto recuperado del manuscrito. Los ID remiten al [inventario](inventario.md). Para los desarrollos y las hipótesis completas, ver [ejercicios resueltos](../resultado/ejercicios_resueltos.md) y [`calculos.py`](calculos.py), ejecutado con Python 3 y código 0.

Se usa, salvo indicación contraria, \(g=9,80665\ \mathrm{m/s^2}\), \(1\ \mathrm{kgf}=9,80665\ \mathrm N\), agua de \(1000\ \mathrm{kg/m^3}\) y presión manométrica. Los fragmentos dudosos se mantienen en [dudas OCR](dudas_ocr.md).

| Foto | Expresión o afirmación original | Clasificación | Problema y corrección justificada |
|---|---|---|---|
| 02 | «\(\gamma=\frac{\text{peso}}{8m^3}=1000\frac{kg}{m^3}\)» | Error de unidades | \(1000\ \mathrm{kg/m^3}\) es densidad. Para el agua, \(\gamma=9806,65\ \mathrm{N/m^3}=1000\ \mathrm{kgf/m^3}\). El peso escrito de 8000 kgf sí es coherente para 8 m³. |
| 02 | «\(101325\cdot15000=1.519.875.000\)» | Error de unidades | La multiplicación es correcta; la fuerza resultante es \(1.519.875.000\ \mathrm N\), si la presión es uniforme. |
| 03 | «la presión … se transmite íntegramente … en todos los sentidos» | Error conceptual del apunte | Pascal se refiere al **incremento** de presión aplicado a un fluido confinado; la presión total varía con la profundidad. |
| 03 | «contenedor cúbico con aristas de 4m contiene en su interior agua» | Dato insuficiente | No se afirma expresamente que esté lleno; sin nivel de agua no hay presión única en los puntos. |
| 04 | «Aquellas sustancias con baja cohesión tendrán la capacidad de Fluir» | Error conceptual del apunte | Es una generalización: la respuesta mecánica y las condiciones importan; no basta clasificar universalmente por cohesión. |
| 04 | «\(7''\cdot39,37\ldots=[267,4/287,4]\,m\)» | Interpretación ambigua; error de unidades | Fragmento tenue. Si son 7 pulgadas, equivalen a 0,1778 m; no es posible reconstruir el factor completo con certeza. |
| 04 | «\(760\frac{kgF}{m^3}\cdot\frac{9,8N}{1kgF}\cdot\frac{1m^3}{[ILEGIBLE]}\)» y expresión análoga con 10 | Dato insuficiente | Último factor y resultado ilegibles. Antes de ese factor: 7450,4 y 98 N/m³, respectivamente, usando 9,8 N/kgf. |
| 04 | «\(760mL\cdot[0,00001/0,000001]m^3=0,00076\)» | Interpretación ambigua; error de unidades | La igualdad correcta es 760 mL = 0,00076 m³, con factor \(10^{-6}\ \mathrm{m^3/mL}\). No puede afirmarse cuál factor se escribió. |
| 04 | «\(250T\cdot9800N=2\ 450\ 000\)» | Error de unidades | Si T es tonelada de masa y \(g=9,8\), el factor es 9800 N/T y el resultado 2.450.000 N; con gravedad estándar, 2.451.662,5 N. |
| 04 | «\(\frac43\pi(1m)^3=4,186m^3\)» | Error de cálculo | Con \(\pi=3,14\), el valor es 4,18667 m³; con \(\pi\) completo, 4,18879 m³. Las masas resultantes son 3392,92 kg de etanol y 5,02655 kg de aire, con las densidades escritas. |
| 05 | «\(10330/13600=0,75m\)» y «750 mmHg» | Error de cálculo | La división da 0,7595588 m = 759,56 mm ≈ **760 mmHg**. Para agua, 10330/1000 = 10,33 m; el denominador manuscrito admite 1000/2000. |
| 05 | «Determine la presión en 1, 2 y 3» | Interpretación ambigua | Los puntos no fijan inequívocamente sus profundidades; la última capa admite 2000/3000 y kgf/kg. Los resultados son condicionales, no valores recuperados de la foto. |
| 05 | Presión independiente de la forma del recipiente | Interpretación ambigua | La paradoja requiere mismo fluido, profundidad, gravedad y presión superficial. No implica fuerzas iguales sobre fondos de distintas áreas. |
| 06 | «\(6840\ kg/m^2=700\ kg/m^3\cdot h+1000\cdot2,5\)» | Error de unidades; dato insuficiente | Con \(g=9,8\), 67032 Pa = 6840 kgf/m² y 700/1000 deben expresarse como pesos específicos en kgf/m³, o introducir \(g\). El enunciado y la configuración están recortados. |
| 07 | «\(150.000\ Pa=15306\ kg/m^2\)» | Error de unidades | Con \(g=9,8\), corresponde a 15306,12 kgf/m². Las sumas posteriores son compatibles con el redondeo. |
| 07 | «\(P=[1645/164,5]\ kg/m^2+0,5\)» | Dato insuficiente; error de unidades | La suma visible es incompleta o dimensionalmente incompatible; no permite calcular un resultado único. |
| 07 | «\(P1=P2\) (por pascal)» | Error conceptual del apunte | La igualdad de presiones requiere puntos al mismo nivel en la situación ideal; a distintas alturas hay diferencia hidrostática. La igualdad de incrementos no elimina esa diferencia. |
| 07 | «elevar un peso de [2600/2800] kg» | Interpretación ambigua; error de unidades | kg es unidad de masa. Hay dos lecturas posibles; para calcular la fuerza deben explicitarse masa, gravedad y condiciones ideales. |
| 08 | «peso de 500 kgf», «\(r=1,5m\)», «\(\rho=780\ kg/m^3\)» | Interpretación ambigua | El dibujo no identifica inequívocamente la geometría y los niveles. Se ofrece una solución condicionada en ejercicios; el rótulo del dibujo dice 500 kg. |
| 08 | «\(\vec E=vol.\,\gamma\)» | Error de unidades o notación | A la izquierda hay un vector y a la derecha un escalar. Puede escribirse \(E=V\gamma\) o \(\vec E=V\gamma\,\hat z\), con eje vertical ascendente. |
| 09 | «dependerá exclusivamente de la profundidad» | Error conceptual del apunte | La presión también depende de densidad, gravedad y presión superficial; para capas se suman \(\rho_i g h_i\). |
| 09 | «\(800\ kgF/m^3\cdot0,785m^3=[628/620]\ kg\)» y «\(P=805,12\ldots\)» | Error de unidades y de cálculo | El producto de las cifras es 628 kgf. Se mezclan redondeos de área y volumen: con área coherente, 800 kgf/m² en la interfaz si la posición y el orden de fluidos son los supuestos. |
| 09 | «\(F=64000\ kg\)» en la franja superior | Dato insuficiente; error de unidades | La foto corta el ejercicio y kg no es unidad de fuerza. No se puede reconstruir el enunciado. |
| 10 | «\(h_s=0,0917m^{[3/\text{sin exponente}]}\)», «\(\vec E=0,917\ kg\)» | Error de unidades; interpretación ambigua | La altura se expresa en m; el exponente es dudoso. El empuje es 0,917 kgf = 8,99270 N, no 0,917 kg de fuerza. |
| 10–11 | «centro de gravedad del cuerpo … por debajo del fluido» | Error conceptual del apunte | Para estabilidad rotacional de un cuerpo totalmente sumergido, el centro de gravedad debe estar por debajo del **centro de empuje**; por encima es inestable y coincidentes es indiferente en condiciones ideales. Para cuerpos parcialmente flotantes se requiere el criterio metacéntrico. |
| 12 | «\(V=0,03m^3\)», «\(E=34,5kg\)», «\(P=300,25kg\)» | Error de unidades y de consistencia del redondeo | Usando el volumen no redondeado 0,0335103 m³: masa 300,2525 kg, peso 2944,47 N y empuje 338,48 N. Los resultados no corresponden al producto literal por 0,03 m³ y kg no es fuerza. |
| 12 | «\(\rho_1\ [\leq/<]\rho_{Liq}\)» | Interpretación ambigua | El signo es dudoso. Para flotación parcial sin otras fuerzas y densidades uniformes, \(\rho_c<\rho_l\); la igualdad corresponde al equilibrio neutro completamente sumergido. |
| 12 | Operaciones del cubo al pie | Dato insuficiente | Los desarrollos están fuera de cuadro y no pueden corregirse como si se vieran. Con el enunciado visible, el peso y empuje son 1,22583 N cada uno si el cubo está completamente sumergido. |

## Comprobaciones que no son errores

- Foto 01: la masa total 11.304 kg es consistente con \(\pi=3,14\); 900 kg/m³ es la densidad compuesta para volúmenes iguales y la densidad relativa 0,8 es correcta con agua de 1000 kg/m³. Con \(\pi\) completo cambia el redondeo, no el procedimiento.
- Foto 02: \(P=F_\perp/A\) describe presión uniforme o presión media; localmente se usa \(p=dF_\perp/dA\).
- Foto 04: la conversión de 1,5 m³/s da 5.400.000 L/h; el resultado manuscrito sigue siendo una lectura incierta.
- Foto 06: \(\Delta P=\gamma(h_2-h_1)\) requiere peso específico constante; \(P_{abs}=P_{rel}+P_{atm}\). El límite de presión relativa depende de la presión atmosférica de referencia.
- Foto 08: el módulo del empuje es el peso del fluido desplazado; bajo gravedad uniforme actúa verticalmente hacia arriba en la línea que pasa por el centro de empuje.
