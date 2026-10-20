# Derivadas: cambio instantáneo y modelos

**Idea central:** derivar permite medir cómo cambia una magnitud respecto de otra. Ficha de preparación, no resolución completa de TP3.

## Fuentes y recorrido

Fuente: [tp3 derivadas.pdf](../material/pdf/tp3%20derivadas.pdf).

| Página y ejercicio | Foco |
|---|---|
| p. 1, ej. 1, ítems 1–6 | Potencias, suma, producto, cociente, exponencial y trigonometría. |
| pp. 1–2, desafío grupal 1 | Relacionar signos de `f` y `f′` mediante el juego de funciones. |
| p. 2, ej. 2, ítems 1–6 | Composición y regla de la cadena. |
| p. 2, ej. 3, ítems 1–6 | Posición y velocidad en `t=0,5,10 s`; verificar dominio antes de evaluar. |
| p. 3, ej. 4–6 | Descarga, consumo según brillo y temperatura de CPU. |
| p. 3, ej. 7; p. 4, ej. 8–9 | Capacitor, potencia de lámpara y corriente alterna; extensión electrónica condicionada a supuestos físicos. |

## Dependencias y conceptos

Requiere [límites](02-limites.md), pendiente de recta, composición y dominios de logaritmo y cociente. Repasar exponenciales y trigonometría en radianes.

- Partir de `f′(a)=lim [f(a+h)−f(a)]/h`, cuando existe; distinguir secante de tangente.
- Organizar reglas de suma, potencia, producto y cociente; la derivada de un producto no es el producto de las derivadas.
- En `(f∘g)′(x)=f′(g(x))g′(x)`, identificar función externa e interna antes de operar.
- El signo de la derivada informa crecimiento o decrecimiento; no es el signo del valor de la función.

## Ejemplos docentes de referencia

**Elaboración docente sobre TP3 p. 2, ej. 2.1:** con `f(x)=3x²−2x`, resulta `L(x)=3x⁴−2x²` y `L′(x)=12x³−4x`. Contrastar expansión y regla de la cadena.

**Elaboración docente sobre TP3 p. 3, ej. 4:** `V(t)=50(1−e^(−0,3t))` en MB/s, `t≥0`. Entonces `V′(t)=15e^(−0,3t)` en MB/s²; `V′(0)=15` y `V′(10)≈0,747`. La velocidad aumenta, pero cada vez más despacio.

**Elaboración docente sobre TP3 p. 3, ej. 5:** si `C(b)=20+0,05b²`, `C′(50)=5 W` por punto porcentual. Para subir de 50 a 51, la aproximación lineal es `5 W`, mientras que el incremento exacto es `C(51)−C(50)=5,05 W`. Aquí `Δb=1`, no `0,01`.

## Alertas de dominio, unidades y física

- TP3 p. 2, ej. 3.5: `sen(t)/t` no está definida en `t=0`; no se puede pedir su velocidad allí sin definir antes una extensión. Su límite es 1 (radianes), pero eso no cambia automáticamente el dominio original. Con extensión continua, su derivada en 0 es 0.
- Para `ln(2t+1)`, exigir `t>−1/2`; para situaciones temporales, además `t≥0`. En el juego, `ln(x)` requiere `x>0` aunque se sugiera un intervalo simétrico.
- TP3 p. 3, ej. 6: `T′(t)=5e^(−0,1t)>0` para todo tiempo finito. La meseta de 80 °C es asintótica, nunca se alcanza exactamente. Definir un umbral de cambio para hablar de «casi estable», sin inventar un instante único.
- En posición/tiempo, la velocidad tiene unidades de posición por segundo; no asignar metros si no se fijaron. En descarga, derivar MB/s produce MB/s², no cantidad descargada.
- Electrónica opcional: con resistencia constante positiva, `P(U)=U²/R`; una subida finita de 1 V no coincide exactamente con `P′(U)·1 V`. Sin rango de tensión no hay un máximo global de rapidez de aumento para `U≥0`.
- Para el capacitor no suponer que brillo es proporcional a tensión sin un modelo físico. Para el inductor ideal, `u_L=L·di/dt` según convención de signos; faltan `L` y, para otras magnitudes del circuito, parámetros adicionales. No exigir números únicos ausentes.

## Evidencia de aprendizaje

El estudiante elige y explica la regla, deriva una composición y comprueba su dominio. Interpreta una tasa con unidades, distingue incremento exacto de aproximación y justifica por qué una meseta exige un criterio práctico.

**Siguiente paso:** reconstruir magnitudes y acumular tasas mediante [integrales](04-integrales.md).
