# Clase 01 · Leer una función y discutir un modelo

**Estado: primer borrador utilizable, pendiente de ajuste al grupo.** Sesión diagnóstica de funciones basada en EVA1; no requiere derivadas ni una duración fija.

## Objetivo y preparación

Al finalizar, el estudiante podrá interpretar las variables de una función cuadrática, ubicar ceros y máximo, y justificar la diferencia entre dominio algebraico y contextual con unidades correctas.

- **Fuente:** [EVA1](../../material/pdf/eva1.pdf), p. 1, incisos a–d. El enunciado está duplicado en la página: trabajar una sola copia.
- **Apoyo docente:** [funciones y modelos](../../conocimiento/01-funciones.md).
- **Material:** PDF abierto o impreso, papel cuadriculado y calculadora opcional. GeoGebra puede verificar una predicción; no es requisito.
- **Prerrequisitos a diagnosticar:** coordenadas, sustitución en una fórmula, cuadrados y ecuaciones sencillas. No presuponer dominio de factorización.

## Consignas y secuencia para estudiantes

El modelo de EVA1 es `h(x)=−(x−45)²/135+15`. La variable `x` mide distancia horizontal en el terreno y `h(x)` altura; ambas se expresan en metros. Se considera el vuelo sin rebotes y la sombra está verticalmente debajo de la pelota.

| Fase flexible | Propuesta | Qué recoger |
|---|---|---|
| Apertura diagnóstica | Sin resolver toda la evaluación, explicar qué significan `x`, `h(x)` y el punto `(10,h(10))`. ¿Es `x` el tiempo? | Respuesta individual breve; detectar confusión entre variables y unidades. |
| Exploración | Anticipar la forma de la gráfica y qué podría representar `h(x)=0`. Comparar ideas en parejas. | Boceto y explicación, no solo cálculo. |
| Ejemplo guiado | Calcular juntos `h(30)` y comparar con `h(60)`; interpretar la simetría. | Sustitución escrita y una frase con unidades. |
| Práctica | Resolver la selección de EVA1 indicada debajo, con apoyos diferenciados. | Planteos, gráfica y dominio contextual. |
| Puesta en común | Contrastar distancia horizontal, recta y trayectoria; discutir el arco a 100 m. | Argumentos basados en el modelo. |
| Salida individual | Responder las tres preguntas de cierre. | Evidencia para decidir la recuperación o el avance. |

### Ejemplo guiado — elaboración docente a partir del modelo de EVA1

1. Sustituir `x=30`, manteniendo paréntesis: `h(30)=−(30−45)²/135+15`.
2. Explicar qué representa el resultado y su unidad.
3. Antes de calcular `h(60)`, predecir si será igual, mayor o menor. Justificar con las distancias a 45.

### Práctica con la fuente

1. **EVA1 p. 1, a–b:** encontrar dónde la pelota está en el suelo; justificar si llega al arco a 100 m. Separar los valores permitidos por la fórmula de los que representan el vuelo.
2. **EVA1 p. 1, c:** calcular la altura a los 10 m de recorrido de la sombra. Distinguir distancia Messi–sombra y distancia recta Messi–pelota, suponiendo a Messi en el origen del modelo. ¿Cuál de ellas no es la longitud recorrida por la pelota?
3. **EVA1 p. 1, d:** construir el gráfico con ejes y unidades; marcar raíces y vértice, estimar el máximo y decidir si existen asíntotas verticales u horizontales.

**Apoyo:** si cuesta despejar, partir de `h(x)=0 → (x−45)²=2025` y buscar las dos posibilidades para `x−45`. Si cuesta graficar, usar una tabla con `x=0,30,45,60,90`.

**Ampliación — elaboración docente:** explicar por qué `h(−10)` y `h(100)` pueden calcularse pero no describen este vuelo sin rebotes. No usar derivadas para justificar el máximo.

### Preguntas de salida — elaboración docente

1. ¿Qué representa `(45,15)` y por qué no es una raíz?
2. ¿Por qué el dominio de la fórmula es ℝ pero el vuelo se restringe a `[0,90]`?
3. Si la sombra está a 10 m, ¿la altura, la distancia horizontal y la distancia recta a la pelota son la misma magnitud? Explicar.

---

## Referencia docente — no entregar como respuestas iniciales

Los desarrollos siguientes son **elaboración docente de referencia**, no una transcripción de soluciones del PDF.

### Ejemplo guiado y práctica

| Consigna | Respuesta y justificación |
|---|---|
| Ejemplo `h(30)` y `h(60)` | Ambas valen `40/3≈13,33 m`: están a 15 m del eje de simetría `x=45`. |
| EVA1 a | `(x−45)²=2025`, luego `x−45=±45`: raíces 0 y 90 m. La pelota cae antes del arco a 100 m; no llega durante el vuelo sin rebotes. |
| EVA1 b | Dominio algebraico ℝ; contexto `[0,90]`, incluyendo lanzamiento y caída. Fuera de él la fórmula da alturas negativas y no describe este vuelo. |
| EVA1 c | `h(10)=160/27≈5,93 m`. Distancia horizontal 10 m. Distancia recta `√(10²+(160/27)²)≈11,62 m`, con origen en Messi. No es longitud de trayectoria. |
| EVA1 d | Raíces `(0,0)` y `(90,0)`, vértice `(45,15)`, concavidad hacia abajo y simetría respecto de `x=45`. Altura máxima 15 m. La función polinómica no tiene asíntotas verticales ni horizontales. |

Justificar el máximo sin cálculo diferencial: `(x−45)²≥0`, por lo que `h(x)≤15`, con igualdad en `x=45`. No confundir eje de simetría con asíntota; el tramo físico del gráfico se destaca sobre `[0,90]`.

### Respuestas de salida y decisiones

1. `(45,15)` indica altura máxima de 15 m cuando la sombra está a 45 m; una raíz tiene altura cero.
2. El polinomio admite cualquier real, pero solo `[0,90]` describe el vuelo considerado sin alturas negativas.
3. No: la altura es vertical, la distancia a la sombra es horizontal y la recta a la pelota es la hipotenusa; ninguna de estas tres mide la curva recorrida.

**Criterio de logro:** identifica ambas variables y unidades, justifica raíces/dominio y lee el vértice con sentido. Registrar por separado interpretación, procedimiento y comunicación, en consonancia con la rúbrica de EVA1; no imponer una calificación diagnóstica.

**Intervenciones:** ante un solo cero, preguntar por las dos soluciones de un cuadrado; ante `x=tiempo`, releer la definición de la fuente; ante un gráfico extrapolado como vuelo, preguntar por el significado de una altura negativa. Si fallan sustitución y coordenadas, recuperar esas bases antes de avanzar.

## Continuidad de la preparación

Guardar evidencias del diagnóstico para ajustar la [secuencia propuesta](../../planificacion/secuencia.md). El próximo tema será [valor puntual y límites laterales](../../conocimiento/02-limites.md), usando los gráficos originales de TP2. Los encuentros posteriores siguen en estado de esquema.
