## 4. Presión hidrostática {#cap-4}

En un líquido en reposo, la presión no es la misma en todos los puntos: aumenta con la profundidad. Ese es el hecho central de la hidrostática y explica los vasos comunicantes, la forma del fondo de las represas y el funcionamiento del barómetro.

### Teorema fundamental de la hidrostática {#cap-4-teorema}

Para dos puntos de un mismo líquido homogéneo en reposo, con profundidades $h_1$ y $h_2$ medidas **hacia abajo** desde una misma referencia horizontal:

$$p_2-p_1=\rho g\,(h_2-h_1)=\gamma\,(h_2-h_1).$$

La diferencia de presión depende solo de la diferencia de profundidad, de la densidad del líquido y de la gravedad. No depende de la forma del recipiente ni de la distancia horizontal entre los puntos.

### Presión a una profundidad dada {#cap-4-formula}

Si la superficie libre está a presión $p_0$ y tomamos $h$ hacia abajo desde ella:

$$p=p_0+\rho g h=p_0+\gamma h.$$

Cuando la presión de referencia es la atmosférica y se pide la **presión manométrica**, el término $p_0$ se toma como cero y queda

$$p_{man}=\rho g h.$$

::: {.definicion}
**Densidad o peso específico: elegí uno y sé coherente.**
$$p=p_0+\rho g h \qquad\text{o}\qquad p=p_0+\gamma h.$$
Si usás $\gamma$ en $\mathrm{kgf/m^3}$, la presión sale en $\mathrm{kgf/m^2}$. Si usás $\rho$ en $\mathrm{kg/m^3}$, necesitás $g$ y la presión sale en pascal.
:::

### El mismo nivel, la misma presión {#cap-4-mismo-nivel}

Dos consecuencias directas del teorema, que se usan todo el tiempo:

- En un líquido homogéneo y conectado, **todos los puntos a la misma profundidad tienen la misma presión**.
- La **superficie libre** de un líquido en reposo es horizontal, porque si dos puntos de la superficie tuvieran presiones distintas el líquido se movería.

De la primera surge el principio de los **vasos comunicantes**: si dos recipientes están conectados por abajo, el líquido alcanza el mismo nivel en ambos, cualquiera sea su forma.

### La paradoja hidrostática {#cap-4-paradoja}

La presión en el fondo de un recipiente depende de la profundidad, no de la cantidad de líquido ni de la forma del recipiente. Un tubo fino y un recipiente ancho, llenos con el mismo líquido hasta la misma altura, ejercen la misma presión sobre el fondo.

![Arriba, recipientes de distinta forma con el mismo líquido, la misma profundidad y presión superficial: igual presión en el fondo. Abajo, capas de distinto espesor y peso específico: sus aportes se suman.](graficos/vasos-y-capas.svg)

Esto no significa que las **fuerzas** sean iguales: $F=pA$, y las áreas de los fondos son distintas. La paradoja se refiere a la presión.

::: {.aviso}
**Condiciones de la paradoja.** Que la presión sea independiente de la forma exige **el mismo líquido**, la **misma profundidad**, la **misma gravedad** y la **misma presión superficial**. Si cambia cualquiera de las cuatro, cambia la presión. Y el recipiente más ancho, con más líquido, pesa más: la fuerza sobre el fondo puede ser menor que el peso del líquido, porque las paredes laterales también sostienen parte del peso.
:::

### Capas de líquidos que no se mezclan {#cap-4-capas}

Si hay varios líquidos superpuestos, cada capa aporta su propio incremento de presión. Con $n$ capas de espesores $h_i$ y pesos específicos $\gamma_i$:

$$p=p_0+\sum_{i=1}^{n}\rho_i g h_i=p_0+\sum_{i=1}^{n}\gamma_i h_i.$$

Se suman los aportes **en orden**, desde arriba hacia abajo. La presión en una interfaz incluye todo lo que está por encima de ella.

### Presión absoluta y presión manométrica {#cap-4-escalas}

La misma presión puede expresarse en dos escalas:

- **Absoluta**: se mide respecto del vacío. Es la que aparece en las leyes de los gases.
- **Manométrica** (o relativa): se mide respecto de la presión atmosférica local. Es la que leen la mayoría de los instrumentos.

$$p_{abs}=p_{man}+p_{atm}.$$

![Escalas de presión absoluta y manométrica: el cero absoluto es el vacío y el cero manométrico es la presión atmosférica local; la presión manométrica negativa aparece entre ambos.](graficos/escalas-de-presion.svg)

Una presión manométrica **negativa** significa que la presión absoluta es menor que la atmosférica; no significa presión absoluta negativa. Una presión absoluta negativa no existe.

### Columnas de líquido y escalas equivalentes {#cap-4-columnas}

Como $p=\rho g h$, toda presión puede expresarse como la altura de una columna de cierto líquido:

$$h=\frac{p}{\rho g}.$$

De ahí salen las unidades que aparecen en los instrumentos. Con $p_{atm}=101\,325\ \mathrm{Pa}$:

$$h_{Hg}=\frac{101\,325}{13\,600\times 9{,}80665}=0{,}7596\ \mathrm{m}\approx 760\ \mathrm{mmHg},$$

$$h_{agua}=\frac{101\,325}{1000\times 9{,}80665}=10{,}33\ \mathrm{mca}.$$

«mca» significa **metros de columna de agua**. Una atmósfera equivale a $10{,}33\ \mathrm{mca}$ o a $760\ \mathrm{mmHg}$.

::: {.aviso}
**Conversión que aparece en los apuntes.** $10\,330\ \mathrm{kgf/m^2}$ pasa a columna de mercurio así:
$$\frac{10\,330}{13\,600}=0{,}7596\ \mathrm{m}=759{,}6\ \mathrm{mm}\approx 760\ \mathrm{mmHg}.$$
El valor $750\ \mathrm{mmHg}$ que figura en el manuscrito es un error aritmético. Para agua: $10\,330/1000=10{,}33\ \mathrm{mca}$.
:::

### Instrumentos {#cap-4-instrumentos}

::: {.ampliacion}
Los apuntes no describen instrumentos; se agregan para reconocer las escalas del tema.

- **Barómetro de mercurio:** mide la presión atmosférica con una columna de mercurio cerrada al vacío. A nivel del mar ronda los $760\ \mathrm{mmHg}$.
- **Manómetro en U:** mide una diferencia de presión por la diferencia de alturas entre dos ramas.

Con un líquido manométrico de densidad $\rho_m$:

$$\Delta p=\rho_m g\,\Delta h.$$

Si una rama está abierta a la atmósfera, lo que se lee es la presión manométrica.
:::

### Para practicar {#cap-4-practicar}

- [Ejercicio 7](#ejercicio-07): presión a dos profundidades en un recipiente cúbico.
- [Ejercicio 8](#ejercicio-08): tres capas de líquido y presiones en las interfaces y en el fondo.
- [Ejercicio 9](#ejercicio-09): profundidad desconocida a partir de una presión medida.
- [Ejercicio 10](#ejercicio-10): equivalencias entre pascal, kgf/m², mmHg y mca.
- [Ejercicio 13](#ejercicio-13): cilindro con aceite sobre agua.
