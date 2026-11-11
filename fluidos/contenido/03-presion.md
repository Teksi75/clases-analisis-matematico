## 3. Presión {#cap-3}

La densidad describe cuánta masa hay en un volumen. Para entender por qué un líquido empuja las paredes del recipiente, por qué una aguja penetra y una mano no, o por qué una prensa multiplica fuerzas, hace falta otra magnitud: la presión.

### Presión media {#cap-3-definicion}

Cuando una fuerza actúa perpendicular a una superficie, la **presión media** es el cociente entre el módulo de esa fuerza y el área:

$$p=\frac{F_\perp}{A}\qquad [p]=\frac{\mathrm{N}}{\mathrm{m^2}}=\mathrm{Pa}.$$

El pascal es la unidad del SI: $1\ \mathrm{Pa}=1\ \mathrm{N/m^2}$.

![Fuerza normal sobre una superficie: la presión es la componente perpendicular por unidad de área.](../diagramas/02.svg)

Si la fuerza no es perpendicular, solo cuenta su **componente normal** a la superficie; la componente tangencial produce esfuerzo de corte, no presión. Y si la fuerza está distribuida de manera desigual, el cociente anterior da un valor medio.

::: {.definicion}
**Presión en un punto.** Para una superficie de área muy pequeña alrededor de un punto, la presión se define como el límite
$$p=\frac{dF_\perp}{dA}.$$
Para una presión uniforme, la integral se reduce a $F_\perp=pA$.
:::

### Presión no es fuerza {#cap-3-presion-no-es-fuerza}

Esta distinción es la fuente de la mitad de los errores del tema. Una misma presión aplicada sobre áreas distintas produce fuerzas distintas:

$$F_\perp=pA.$$

Un clavo penetra porque su punta tiene un área muy pequeña y la misma fuerza genera una presión enorme. Una persona con raquetas de nieve no se hunde por la razón inversa: su peso se reparte sobre un área mayor. La **fuerza** es la misma en los dos casos; lo que cambia es la presión.

### Presión en un fluido en reposo {#cap-3-fluido}

En un fluido en reposo, la presión tiene tres propiedades que conviene tener presentes:

1. Actúa **perpendicular** a cualquier superficie en contacto con el fluido.
2. En un punto dado tiene el mismo valor **en todas las direcciones**: si imaginamos una placa pequeña dentro del líquido, la presión sobre ella no depende de cómo la orientemos.
3. Varía de un punto a otro si cambia la profundidad; de eso trata el capítulo siguiente.

La segunda propiedad es la que permite hablar de «la presión en un punto» sin especificar una dirección.

### Unidades de presión {#cap-3-unidades}

| Unidad | Equivalencia | Uso típico |
|---|---:|---|
| pascal (Pa) | $1\ \mathrm{N/m^2}$ | SI, cálculos |
| kilopascal (kPa) | $1000\ \mathrm{Pa}$ | presiones industriales |
| bar | $10^5\ \mathrm{Pa}=100\ \mathrm{kPa}$ | neumática, meteorología |
| kgf/cm² | $98\,066{,}5\ \mathrm{Pa}$ | taller, calibres antiguos |
| atmósfera (atm) | $101\,325\ \mathrm{Pa}$ | referencia estándar |
| milímetro de mercurio (mmHg) | $133{,}322\ \mathrm{Pa}$ | medicina, barómetros |

::: {.ampliacion}
Los apuntes usan pascal, $\mathrm{kgf/m^2}$, milímetros de mercurio y metros de columna de agua. Las filas de `bar`, `kgf/cm²` y `atm`, y la equivalencia $1\ \mathrm{mmHg}=133{,}322\ \mathrm{Pa}$, se agregan para poder leer instrumentos y enunciados de taller.
:::

El **kgf/cm²** y el **mmHg** no pertenecen al SI. El primero se usa mucho en talleres y el segundo en instrumentos; por eso aparecen en los apuntes. Convertir siempre a pascal antes de operar evita mezclas.

::: {.aviso}
**Dos conversiones que se confunden.** $1\ \mathrm{kgf/cm^2}=98066{,}5\ \mathrm{Pa}$ (no $9806{,}65$: el área está en centímetros cuadrados, no en metros cuadrados). Y $1\ \mathrm{bar}=100\,000\ \mathrm{Pa}$, valor cercano pero **no igual** a $1\ \mathrm{atm}=101\,325\ \mathrm{Pa}$.
:::

### Para practicar {#cap-3-practicar}

- [Ejercicio 5](#ejercicio-05): presión en el fondo de un recipiente cúbico y fuerza sobre el fondo.
- [Ejercicio 6](#ejercicio-06): fuerza total sobre un terreno a partir de una presión uniforme.

El [ejercicio 10](#ejercicio-10) retoma estas unidades para convertir columnas de líquido; conviene tener a mano esta tabla.
