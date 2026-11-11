## 1. Cohesión y estados de la materia {#cap-1}

Este cuaderno estudia la **hidrostática**: el comportamiento de los fluidos en reposo. Antes de calcular presiones y empujes conviene acordar qué es un fluido, por qué un líquido y un gas se comportan distinto y qué hipótesis vamos a usar en todo el material. Las fórmulas de los capítulos siguientes solo valen dentro de esas hipótesis.

### Qué es un fluido {#cap-1-que-es-un-fluido}

Un **fluido** es una sustancia que se deforma de manera continua cuando se le aplica un esfuerzo de corte, es decir, una fuerza tangencial a su superficie. Los líquidos y los gases son fluidos; un sólido elástico, en cambio, se deforma hasta cierto punto y después resiste sin seguir deformándose.

Esta definición es la que se usa en mecánica. La idea escolar de que «fluido es lo que fluye» sirve como primera aproximación, pero no alcanza para decidir casos límite: la arena fina se comporta como un fluido en algunos experimentos y la miel fluye muy lentamente.

::: {.definicion}
**Fluido:** sustancia que no puede sostener un esfuerzo de corte en reposo. En reposo, un fluido solo transmite fuerzas **normales** a la superficie (presión).
:::

### Cohesión y energía térmica {#cap-1-cohesion}

Las moléculas de una sustancia se atraen entre sí; esa atracción se llama **cohesión**. Al mismo tiempo, la agitación térmica tiende a separarlas. El estado de agregación depende del resultado de esa competencia:

| Estado | Cohesión frente a la agitación térmica | Forma | Volumen |
|---|---|---|---|
| Sólido | Predomina la cohesión | Propia | Propio |
| Líquido | Cohesión y agitación están balanceadas | Adopta la del recipiente | Propio |
| Gas | Predomina la agitación térmica | Adopta la del recipiente | Adopta el del recipiente |

La comparación es relativa: la cohesión cambia con la temperatura y la presión. El agua hierve a 100 °C a presión atmosférica, pero a menor presión hierve a menor temperatura. Por eso el estado no es una propiedad fija de una sustancia, sino de la sustancia **en ciertas condiciones**.

::: {.aviso}
**Cuidado con la generalización.** Decir «toda sustancia con baja cohesión fluye» es una simplificación que falla en casos concretos. Lo que define el comportamiento es la **respuesta mecánica** de la sustancia: cómo reacciona ante un esfuerzo de corte, y eso depende del material y de sus condiciones, no solo de una etiqueta.
:::

### Líquidos y gases: por qué importa la diferencia {#cap-1-liquidos-gases}

Para la hidrostática, la diferencia práctica más importante es la **compresibilidad**:

- Un **líquido** es muy poco compresible: su densidad cambia muy poco con la presión. Por eso, en todo este material, tratamos a los líquidos como **incompresibles**.
- Un **gas** es muy compresible: su densidad depende fuertemente de la presión y de la temperatura. Un gas en un recipiente abierto ocupa todo el volumen disponible.

También difieren en la **tensión superficial** (relevante en gotas y capilares, no en los problemas de este cuaderno) y en la **viscosidad**, que importa cuando el fluido se mueve. En hidrostática no hay movimiento, así que la viscosidad no interviene.

::: {.definicion}
**Hipótesis de trabajo de este material.** Salvo que se indique lo contrario: fluido **homogéneo e incompresible** (densidad constante), **en reposo**, bajo **gravedad uniforme** con $g=9{,}80665\ \mathrm{m/s^2}$, y presiones **manométricas** medidas respecto de la superficie libre. Los ejercicios indican cuándo se usan otros valores.
:::

### Masa, peso y las magnitudes que vamos a usar {#cap-1-magnitudes}

Conviene separar desde el principio dos cosas que el lenguaje cotidiano mezcla: la **masa** es una medida de la cantidad de materia y se mide en kilogramos; el **peso** es una fuerza y se mide en newtons. Un cuerpo de 1 kg tiene una masa de 1 kg en cualquier lugar, pero su peso cambia si cambia la gravedad.

| Magnitud | Símbolo | Unidad del SI | Otras unidades frecuentes |
|---|---|---|---|
| Masa | $m$ | $\mathrm{kg}$ | $\mathrm{g}$, $\mathrm{t}$ |
| Peso (fuerza gravitatoria) | $W$ | $\mathrm{N}$ | $\mathrm{kgf}$ |
| Volumen | $V$ | $\mathrm{m^3}$ | $\mathrm{L}$, $\mathrm{mL}$, $\mathrm{cm^3}$ |
| Densidad | $\rho$ | $\mathrm{kg/m^3}$ | $\mathrm{g/cm^3}$ |
| Peso específico | $\gamma$ | $\mathrm{N/m^3}$ | $\mathrm{kgf/m^3}$ |
| Presión | $p$ | $\mathrm{Pa}=\mathrm{N/m^2}$ | $\mathrm{kgf/cm^2}$, $\mathrm{bar}$, $\mathrm{mmHg}$ |

El **kilogramo-fuerza** ($\mathrm{kgf}$) es la fuerza con la que la gravedad estándar atrae a una masa de 1 kg:

$$1\ \mathrm{kgf} = 1\ \mathrm{kg}\times 9{,}80665\ \mathrm{m/s^2} = 9{,}80665\ \mathrm{N}.$$

Aparece en muchos enunciados de taller y en tablas antiguas, por eso lo vamos a usar en algunos ejercicios.

### Para practicar {#cap-1-practicar}

Este capítulo es de conceptos, así que su ejercicio es de lectura y justificación: [Ejercicio 1](#ejercicio-01). Los cálculos numéricos empiezan en el [capítulo 2](#cap-2), con densidad y peso específico.
