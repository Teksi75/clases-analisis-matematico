# Mecánica de los fluidos: apuntes para estudiar

Esta es una **versión explicativa y técnicamente corregida**, separada de la [transcripción fiel](apuntes_originales.md). Los enlaces por fotografía identifican el origen de cada tema; las aclaraciones, hipótesis y correcciones no deben confundirse con palabras literales del manuscrito. Los ejercicios están desarrollados aparte en [ejercicios resueltos](ejercicios_resueltos.md) y sus diferencias se justifican en la [auditoría](../revision/errores_detectados.md).

## 1. Cohesión y estados de la materia

La cohesión se relaciona con las fuerzas de atracción entre partículas de una sustancia. Como aproximación escolar, un sólido conserva forma y volumen, un líquido tiene volumen propio pero adopta la forma del recipiente y un gas no conserva una forma ni un volumen propios. La capacidad de fluir no debe deducirse solamente de una etiqueta de cohesión: también importan el material y sus condiciones. [Fuente: fotografía 04](../transcripciones/04.md).

## 2. Densidad y peso específico

La **densidad** es la masa por unidad de volumen; el **peso específico** es el peso por unidad de volumen. En un campo gravitatorio uniforme:

\[
\rho=\frac{m}{V}\quad [\mathrm{kg/m^3}],\qquad
\gamma=\frac{W}{V}=\rho g\quad [\mathrm{N/m^3}].
\]

Masa y peso no son lo mismo: \(W=mg\). También puede expresarse peso específico en kgf/m³, recordando que \(1\ \mathrm{kgf}=9,80665\ \mathrm N\). [Fuentes: fotografías 04 y 01](../transcripciones/04.md); [01](../transcripciones/01.md).

La **densidad relativa** respecto del agua es adimensional:

\[
\rho_r=\frac{\rho_{sustancia}}{\rho_{agua}}.
\]

Para dos volúmenes conocidos, la densidad global del contenido es una media ponderada por volumen:

\[
\rho_{global}=\frac{m_1+m_2}{V_1+V_2}
=\frac{\rho_1V_1+\rho_2V_2}{V_1+V_2}.
\]

En el tanque de las notas los volúmenes son iguales, por eso la media se simplifica. [Fuente: fotografía 01](../transcripciones/01.md).

## 3. Presión y presión hidrostática

La presión es la fuerza normal por unidad de área. Para presión uniforme, o como valor medio sobre un área:

\[
 p=\frac{F_\perp}{A},\qquad 1\ \mathrm{Pa}=1\ \mathrm{N/m^2}.
\]

La presión ejercida por un fluido en reposo es normal a la superficie sobre la que actúa. Localmente puede expresarse como \(p=dF_\perp/dA\). [Fuente: fotografía 02](../transcripciones/02.md); [esquema reconstruido](../diagramas/02.svg).

En un líquido homogéneo en reposo, con gravedad uniforme, la presión a profundidad \(h\) bajo una superficie de presión \(p_0\) es:

\[
 p=p_0+\rho gh=p_0+\gamma h.
\]

Por lo tanto, la **presión manométrica** respecto de la superficie es \(\rho gh\). Para varios líquidos superpuestos se suman los aportes \(\rho_i g h_i\). El resultado depende del líquido, la gravedad, la profundidad y la presión superficial; no solo de la profundidad si las demás condiciones cambian. [Fuentes: fotografías 03 y 09](../transcripciones/03.md); [09](../transcripciones/09.md).

En un mismo líquido conectado y en equilibrio, los puntos a igual profundidad tienen igual presión. La superficie libre es horizontal bajo gravedad uniforme. La **paradoja hidrostática** dice que, si coinciden líquido, profundidad, gravedad y presión superficial, la presión es independiente de la forma del recipiente. La fuerza sobre un fondo también depende de su área: \(F=pA\). [Fuentes: fotografías 03 y 05](../transcripciones/03.md); [05](../transcripciones/05.md); [recipientes y capas](../diagramas/05.svg).

## 4. Teorema fundamental y escalas de presión

Para dos puntos de un mismo líquido homogéneo, con profundidades medidas hacia abajo desde una misma referencia:

\[
 p_2-p_1=\rho g(h_2-h_1)=\gamma(h_2-h_1).
\]

La presión absoluta se mide respecto del vacío; la relativa o manométrica, respecto de la presión atmosférica de referencia:

\[
 p_{abs}=p_{rel}+p_{atm}.
\]

Una presión relativa negativa corresponde a una presión inferior a la atmosférica, no necesariamente a una presión absoluta negativa. El valor de referencia atmosférico puede variar. [Fuente: fotografía 06](../transcripciones/06.md); [escalas y profundidades](../diagramas/06.svg).

Las unidades de columna de líquido se relacionan mediante \(p=\rho gh\). Con las cifras del apunte, \(10330/13600=0,75956\ \mathrm m\) de mercurio: aproximadamente **760 mmHg**, no 750. Para agua con peso específico de 1000 kgf/m³, 10330 kgf/m² corresponden a 10,33 mca. [Fuente: fotografía 05](../transcripciones/05.md); [auditoría y lectura dudosa](../revision/errores_detectados.md).

## 5. Principio de Pascal y prensa hidráulica

Un **incremento** de presión aplicado a un fluido confinado se transmite por el fluido. En una prensa ideal, para puntos de los émbolos al mismo nivel y despreciando pérdidas:

\[
 \frac{F_1}{A_1}=\frac{F_2}{A_2},\qquad
 F_1=F_2\frac{A_1}{A_2}.
\]

Si los puntos están a diferentes alturas hay que considerar la diferencia hidrostática; Pascal no implica que las presiones totales sean iguales a cualquier altura. [Fuentes: fotografías 03 y 07](../transcripciones/03.md); [07](../transcripciones/07.md); [esquema de la prensa](../diagramas/07.svg).

## 6. Empuje, peso aparente y flotación

Según Arquímedes, el módulo del empuje sobre un cuerpo es el peso del fluido desplazado. Para un fluido homogéneo:

\[
 E=\rho_{fluido}gV_{desplazado}=\gamma_{fluido}V_{desplazado}.
\]

Con gravedad uniforme, el empuje es vertical hacia arriba y su línea de acción pasa por el centro de gravedad del fluido desplazado. En equilibrio, si las únicas fuerzas verticales sobre el cuerpo son peso y empuje, \(E=W\). Para un cuerpo sostenido y sumergido, la magnitud del peso aparente es \(W_{ap}=W-E\), cuando la fuerza de sostén es vertical y ascendente. [Fuentes: fotografías 08, 10 y 12](../transcripciones/08.md); [10](../transcripciones/10.md); [12](../transcripciones/12.md).

En un fluido homogéneo y sin fuerzas externas adicionales, un cuerpo de densidad media menor que la del líquido puede flotar parcialmente; si ambas densidades coinciden puede permanecer totalmente sumergido en equilibrio neutro; si la densidad del cuerpo es mayor, tiende a hundirse. Para flotación parcial libre:

\[
\frac{V_{sumergido}}{V_{total}}=\frac{\rho_{cuerpo}}{\rho_{fluido}}.
\]

Las condiciones pueden cambiar si hay apoyos u otras fuerzas. [Fuentes: fotografías 10 y 12](../transcripciones/10.md); [12](../transcripciones/12.md); [hielo](../diagramas/10.svg) y [tres cuerpos](../diagramas/12.svg). El signo del primer caso manuscrito es incierto, como se indica en la transcripción.

## 7. Estabilidad de cuerpos sumergidos

Para un cuerpo **totalmente sumergido** en equilibrio ideal, consideramos el centro de gravedad del cuerpo y el centro de empuje, correspondiente al centro de gravedad del fluido desplazado:

- **Estable:** el centro de gravedad está por debajo del centro de empuje; una pequeña inclinación produce un par restaurador.
- **Inestable:** el centro de gravedad está por encima; una pequeña inclinación produce un par que la aumenta.
- **Indiferente:** los centros coinciden y no aparece ese par restaurador o desestabilizador.

Para cuerpos parcialmente flotantes no alcanza esta regla: debe considerarse el metacentro y la geometría de flotación. Los párrafos y dibujos de las notas se conservaron en su orden original en la transcripción, sin reasignar la numeración por inferencia. [Fuentes: fotografías 10 y 11](../transcripciones/10.md); [11](../transcripciones/11.md); [dibujos originales reconstruidos](../diagramas/11.svg).
