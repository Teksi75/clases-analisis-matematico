## 5. Principio de Pascal y prensa hidráulica {#cap-5}

Los capítulos anteriores describen cómo varía la presión con la profundidad. Pascal agrega algo distinto: qué ocurre cuando se **modifica** la presión en alguna parte de un fluido confinado.

### Enunciado y alcance {#cap-5-enunciado}

> Un incremento de presión aplicado a un fluido confinado en reposo se transmite íntegramente a todos los puntos del fluido.

La palabra clave es **incremento**. Pascal no dice que la presión total sea igual en todos los puntos: si el fluido está en un campo gravitatorio, la presión total sigue aumentando con la profundidad. Lo que se transmite sin cambios es la variación $\Delta p$.

::: {.aviso}
**El error conceptual más frecuente.** Escribir «$p_1=p_2$ por Pascal» solo es válido si los dos puntos están **al mismo nivel** y el fluido está en reposo. Si están a alturas distintas, hay que sumar la diferencia hidrostática:
$$p_2=p_1+\rho g\,(h_2-h_1).$$
La igualdad del capítulo anterior y el principio de Pascal se combinan; no se reemplazan.
:::

### La prensa hidráulica {#cap-5-prensa}

Una prensa hidráulica tiene dos émbolos de áreas distintas, conectados por un fluido confinado. Si los émbolos están al mismo nivel, la presión es la misma en los dos:

$$\frac{F_1}{A_1}=\frac{F_2}{A_2}\qquad\Longrightarrow\qquad F_2=F_1\frac{A_2}{A_1}.$$

Para émbolos circulares de diámetros $d_1$ y $d_2$, las áreas son proporcionales a $d^2$:

$$F_2=F_1\left(\frac{d_2}{d_1}\right)^{2}.$$

La **ventaja mecánica** ideal es $M=A_2/A_1$: con un émbolo mayor, una fuerza pequeña sostiene una carga grande.

![Prensa hidráulica ideal: la presión se transmite y la fuerza se multiplica según las áreas.](../diagramas/07.svg)

### Lo que no se multiplica: la energía {#cap-5-energia}

::: {.ampliacion}
Los apuntes no lo desarrollan, pero completa la idea de la prensa. Si la fuerza se multiplica por $M$, el desplazamiento se reduce en la misma proporción. En una prensa ideal no hay pérdidas, así que el trabajo se conserva:

$$F_1d_1=F_2d_2.$$

Como el líquido es incompresible, el volumen que baja de un lado es el que sube del otro:

$$A_1d_1=A_2d_2.$$

De ahí sale $d_1/d_2=A_2/A_1=M$. Para levantar la carga unos centímetros, el émbolo pequeño recorre varios metros. La prensa **no crea energía**: redistribuye fuerza y desplazamiento.
:::

::: {.definicion}
**Para resolver un problema de prensa**
1. Convertí los diámetros a áreas: $A=\pi d^2/4$.
2. Verificá si los émbolos están al mismo nivel. Si no, corregí con $\rho g\,\Delta h$.
3. Aplicá $F_2=F_1A_2/A_1$ para fuerzas o $p=F/A$ para presiones.
4. Si piden desplazamientos, usá $A_1d_1=A_2d_2$.
:::

### Cuándo falla el modelo ideal {#cap-5-limites}

La prensa real pierde por rozamiento en los émbolos, fugas de líquido y peso propio de los componentes. Además, si los émbolos están a distinta altura, la diferencia hidrostática modifica la relación de fuerzas. En los ejercicios trabajamos con la prensa ideal, al mismo nivel y sin pérdidas, y lo indicamos en cada caso.

### Para practicar {#cap-5-practicar}

- [Ejercicio 11](#ejercicio-11): prensa hidráulica con dos lecturas posibles de la carga.
- [Ejercicio 12](#ejercicio-12): recipiente comunicado con un pistón cargado.

Los dos ejercicios tienen datos incompletos en el apunte original. En cada uno están explícitas las hipótesis necesarias para resolverlos.
