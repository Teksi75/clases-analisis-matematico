# Límites, asíntotas y continuidad

**Idea central:** acercarse a un punto no equivale a evaluar la función en él. Ficha de preparación; no es un solucionario.

## Fuentes y recorrido

Fuente: [TP2 LIMITES.pdf](../material/pdf/TP2%20LIMITES.pdf).

| Página y ejercicio | Trabajo propuesto |
|---|---|
| p. 1, ej. 1, ítems 1–24 | Leer límites laterales, límite bilateral y valores puntuales en los gráficos originales. |
| p. 1, ej. 2, ítems 1–5 | Comparar las ramas `x+2`, `3` y `x²` alrededor de `x=1`. |
| p. 2, ej. 3, ítems 1–6 | Resolver indeterminaciones por factorización, conservando las restricciones. |
| p. 2, ej. 4 y 5, ítems 1–6 de cada uno | Distinguir asíntotas verticales y horizontales mediante límites. |
| p. 3, ej. 6, ítems 1–6 | Justificar continuidad con límites y valor puntual. |
| p. 3, desafío grupal 1, ítems 1–4 | Modelar tarifas por tramos, horarios y corte del servicio. Leer el cartel en el PDF. |

## Dependencias y conceptos

Requiere [funciones y dominio](01-funciones.md), coordenadas, signos y factorización (diferencia de cuadrados, trinomios y diferencia de cubos).

- Para un límite bilateral finito, ambos límites laterales deben existir y coincidir.
- Continuidad en `a`: `f(a)` está definida, existe el límite y ambos son iguales.
- `0/0` indica que falta analizar; no es un resultado ni autoriza cancelar sumandos.
- Una raíz del denominador es candidata a asíntota vertical, no garantía: puede haber un hueco.
- La asíntota horizontal describe el comportamiento cuando `x→+∞` o `x→−∞`; no prohíbe cruzar la recta.

## Ejemplos docentes de referencia

**Elaboración docente sobre TP2 p. 2, ej. 3.1:** `(x²−4)/(x−2)=x+2` solo para `x≠2`. El límite en 2 vale 4, pero la expresión original no define `f(2)`.

**Elaboración docente sobre TP2 p. 2, ej. 4.2:** `(x+1)/(x²−1)=1/(x−1)` para `x≠−1,1`. En `x=−1` hay un hueco con límite `−1/2`; en `x=1` hay asíntota vertical (lateral izquierdo `−∞`, derecho `+∞`).

**Elaboración docente sobre TP2 p. 1, ej. 2:** en 1 el límite izquierdo es 3, el derecho es 1 y el valor puntual es 3. No existe límite bilateral ni hay continuidad, aunque un lateral coincida con el valor.

## Alertas de dominio y contexto

No recuperar respuestas numéricas de los gráficos del ej. 1 ni tarifas del desafío desde el texto extraído: faltan los elementos visuales. Revisar círculos abiertos/cerrados y horarios exactos en el PDF. En el peaje, los límites expresan tarifas antes/después de una hora; el valor exacto depende de la convención del tramo. Indicar moneda y unidad temporal del cartel sin inventarlas.

En funciones por tramos, verificar primero qué fórmula rige a cada lado. Con raíces y cocientes, conservar el dominio incluso después de simplificar.

## Evidencia de aprendizaje

El estudiante entrega una tabla con `límite izquierdo / derecho / valor / continuidad`, justifica una cancelación indicando `x≠a` y distingue un hueco de una asíntota. Puede explicar una discontinuidad del peaje en lenguaje cotidiano.

**Siguiente paso:** usar el cociente incremental como puente hacia [derivadas](03-derivadas.md).
