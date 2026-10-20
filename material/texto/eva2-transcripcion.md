# EVA2 — transcripción de consulta

Fuente: [eva2.pdf](../pdf/eva2.pdf), páginas 1–2. Transcripción manual del enunciado y síntesis de la resolución, cotejadas visualmente con las [vistas](../vistas/). No es una reproducción literal completa ni un OCR validado de los manuscritos. El PDF es la fuente de autoridad.

## Enunciado (página 1)

EVA 2: SEGUNDO CUATRIMESTRE - MATEMÁTICA - 5TO AÑO - 27/10/2025.

Una instalación remota realiza un enlace de internet con otra estación a 78 km. La velocidad de descarga se modela por `v(t) = 100(1 - e^(-0,5t))`, con `t ≥ 0` en segundos y velocidad en Mbps. La prueba inicia en `t = 0`.

- a) Determinar cuántos datos se descargaron en los primeros 2 segundos e indicar el significado geométrico en el gráfico.
- b) Se mide la velocidad a los 4 segundos, se esperan 2 segundos y se vuelve a medir. Determinar cuánto se incrementó entre las mediciones.
- c) Sin utilizar integrales, estimar con el gráfico cuántos datos se descargaron entre los 10 y 15 segundos.
- d) Encontrar la tasa de cambio instantánea de la velocidad al inicio e indicar su significado geométrico.
- e) Encontrar la familia de funciones de cantidad de datos descargados y la función específica del problema.

La evaluación pide desarrollo prolijo, coherente y completo; planteo analítico inicial correcto y respuesta a la consigna. Cada inciso vale 2 puntos.

## Síntesis del manuscrito y notas de revisión

| Inciso | Desarrollo observado | Nota para uso docente |
|---|---|---|
| a | Integral de 0 a 2 de v(t); resultado aproximado 73,57 | El manuscrito rotula Mbps, pero corresponde **Mbits**: velocidad × tiempo. |
| b | v(4) ≈ 86 Mbps, v(6) ≈ 95 Mbps; incremento ≈ 9 Mbps | Con mayor precisión: 8,55 Mbps. Es diferencia de velocidades, no tasa media. |
| c | Rectángulo de base 5 s y altura aproximada 100 Mbps; ≈ 500 Mbits | Estimación gráfica, no igualdad exacta. |
| d | v'(t) = 50e^(-0,5t); v'(0) = 50 Mbps/s | Pendiente de la tangente al gráfico de velocidad. |
| e | D(t) = 100t + 200e^(-0,5t) + C; D(0)=0 implica C=-200 | D(t)=100t+200e^(-0,5t)-200, en Mbits. |

No confundir esta velocidad con la de TP3 y TP4: allí el modelo es `50(1-e^(-0,3t))` en **MB/s**. Mbit y MB no son la misma unidad.
