# Integración de conceptos y revisión EVA2

**Idea central:** antes de calcular, identificar si se pide un valor, un incremento, una tasa instantánea o una acumulación. «Integración» aquí nombra la articulación del curso, no solo la técnica de integrar.

## Fuentes y dependencias

Requiere [funciones](01-funciones.md), [límites](02-limites.md), [derivadas](03-derivadas.md) e [integrales](04-integrales.md).

Fuente principal: [EVA2](../material/pdf/eva2.pdf), p. 1, incisos a–e; p. 2, resolución manuscrita de referencia. Consultar la [transcripción revisada y sus correcciones de unidades](../material/texto/eva2-transcripcion.md), no tratar el manuscrito como clave infalible. EVA1 p. 1, a–d permite recuperar lectura de modelos; TP3 p. 3, ej. 4 y TP4 p. 1, ej. 3 ofrecen un contraste de descarga.

## Mapa de decisiones para EVA2

Modelo: `v(t)=100(1−e^(−0,5t))` Mbps, `t≥0` en segundos.

| Inciso (p. 1) | Herramienta y justificación esperada |
|---|---|
| a: datos en los primeros 2 s | Integral entre 0 y 2; área bajo la velocidad; resultado en Mbits. |
| b: incremento entre las mediciones en 4 y 6 s | Diferencia `v(6)−v(4)` en Mbps; no confundir con dividir por 2 s. |
| c: datos entre 10 y 15 s, sin integrales | Estimar área mediante un rectángulo cercano a 100 Mbps de altura y 5 s de base. |
| d: cambio instantáneo inicial | Derivada `v′(0)`; pendiente de la tangente; Mbps/s. |
| e: familia y función de datos | Primitiva con `+C`; condición `D(0)=0` para acumulación desde el inicio. |

## Ejemplos docentes de referencia

**Elaboración docente sobre EVA2 p. 1, a, b, d y e:**

- `D(t)=100t+200e^(−0,5t)−200` Mbits; verifica `D(0)=0` y `D′(t)=v(t)`.
- `D(2)=200/e≈73,58 Mbits`; no Mbps. El redondeo del manuscrito se conserva como antecedente, no como valor exacto.
- `v(6)−v(4)=100(e^(−2)−e^(−3))≈8,55 Mbps`. Si se pidiera tasa media, habría que dividir por 2 s.
- `v′(0)=50 Mbps/s`.

**Elaboración docente sobre EVA2 p. 1, c:** como `v` es creciente, el área entre 10 y 15 s queda entre `5v(10)≈496,63` y `5v(15)≈499,72 Mbits`. El rectángulo de altura 100 da una estimación de `500 Mbits`, ligeramente por exceso, no una igualdad exacta. Este argumento no requiere integrar.

## Alertas de interpretación

EVA2 usa **100** y **0,5** en **Mbps**; TP3/TP4 usan **50** y **0,3** en **MB/s**. No trasladar coeficientes ni unidades entre modelos. Ocho bits equivalen a un byte: 8 Mbits equivalen a 1 MB con prefijos decimales.

La distancia de 78 km contextualiza el enlace: no es un límite de integración temporal ni permite deducir una latencia sin más datos. La velocidad se aproxima a 100 Mbps sin alcanzarlos en tiempo finito. Los valores leídos de cualquier gráfico requieren cotejo con el PDF original.

## Evidencia de aprendizaje y devolución

Pedir que el estudiante, antes de operar, escriba **magnitud buscada → herramienta → intervalo → unidad**. Luego revisar planteo, procedimiento e interpretación por separado. Un resultado numérico correcto con unidad de tasa en lugar de cantidad aún requiere revisión.

Cerrar con una comparación breve entre EVA1 (valor y dominio de una altura) y EVA2 (tasa y acumulación). Usar los errores observados para volver a la ficha pertinente, sin convertir esta base inicial en un solucionario completo.
