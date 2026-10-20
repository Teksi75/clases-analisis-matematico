# Integrales: primitivas y acumulación

**Idea central:** una primitiva reconstruye una familia de funciones; una integral definida mide acumulación neta en un intervalo. Ficha de preparación, no solucionario de TP4.

## Fuentes y recorrido

Fuente: [tp4 integrales.pdf](../material/pdf/tp4%20integrales.pdf).

| Página y ejercicio | Foco |
|---|---|
| p. 1, ej. 1, ítems 1–6 | Primitivas de potencias, exponenciales y funciones trigonométricas. |
| p. 1, ej. 2, ítems 1–6 | Factores internos constantes y comprobación por derivación. |
| p. 1, ej. 3, ítems 1–3 | Descarga acumulada a 7 s y 60 s; tiempo para 550 MB. |
| pp. 1–2, ej. 4, ítems 1–3 | Interpretación de `v(t)=4+2t` en `0≤t≤5`; acumulación entre 0 y 3 s. |
| p. 2, ej. 5, ítems 1–2 | Potencia variable y energía en los primeros 8 s. |
| p. 2, ej. 6, ítems 1–2 | Escritura de RAM, conversión de kB a Bytes y tiempo para 130 kB. |

## Dependencias y conceptos

Requiere [derivadas](03-derivadas.md), potencias fraccionarias/negativas, radianes y unidades. Introducir sumas de rectángulos antes de usar `∫[a,b] f(t)dt=F(b)−F(a)` para funciones continuas.

- Escribir `+C` en integrales indefinidas; una condición inicial selecciona una función.
- Comprobar una primitiva derivándola. En `∫e^(kt)dt` y trigonométricas con argumento lineal, atender al factor `1/k`.
- La regla `∫xⁿ dx=x^(n+1)/(n+1)+C` no incluye `n=−1`.
- La integral definida es área con signo; coincide con cantidad acumulada de datos cuando la tasa es no negativa.

## Ejemplos docentes de referencia

**Elaboración docente sobre TP4 p. 1, ej. 1.1 y 2.1:** primitivas respectivas `x³−x²+C` y `−(3/4)cos(4x)+C`. Derivar ambas para comprobar.

**Elaboración docente sobre TP4 pp. 1–2, ej. 4.3:** `∫[0,3](4+2t)dt=[4t+t²][0,3]=21 MB`. La tasa inicial es 4 MB/s, no 4 MB acumulados.

**Elaboración docente sobre TP4 p. 1, ej. 3:** con `V(t)=50(1−e^(−0,3t))`, la cantidad desde el inicio es `D(t)=50t+(500/3)(e^(−0,3t)−1)` MB para `t≥0`. Para 550 MB, plantear `D(t)=550` y resolver numéricamente; no dividir 550 por una velocidad variable.

**Elaboración docente sobre TP4 p. 2, ej. 5:** una primitiva de `50+10cos(πt/4)` es `50t+(40/π)sen(πt/4)`. Entre 0 y 8 s, la energía es `400 J` porque el término seno se anula en ambos extremos.

## Alertas de dominio y unidades

- En TP4 p. 1, ej. 1.3, `1/x³` excluye 0; las primitivas se consideran por intervalos del dominio. En ej. 1.5, `x^(−1/2)` exige `x>0`; en ej. 2.3, la raíz está definida para `x≥0` y la comprobación usual se hace en el interior.
- MB/s por segundos da MB; W por segundos da J. No mezclar estas tasas con los Mbps de [EVA2](05-integracion.md).
- TP4 p. 2, ej. 6 usa kB/s: declarar la convención decimal `1 kB=1000 B` antes de convertir. Si se empleara una convención binaria, explicitarla y distinguir KiB. Respetar `0≤t≤10`.
- Para invertir una acumulación, comprobar que la cantidad solicitada está dentro del alcance del intervalo y justificar unicidad mediante la tasa positiva. No prolongar un modelo fuera del dominio sin advertirlo.

## Evidencia de aprendizaje

El estudiante verifica una primitiva por derivación, usa extremos en orden, fija una constante con condición inicial y escribe la unidad de una acumulación. Puede plantear una ecuación para un tiempo desconocido y explicar por qué no basta una división.

**Siguiente paso:** elegir entre valor, diferencia, derivada e integral en [la integración EVA2](05-integracion.md).
