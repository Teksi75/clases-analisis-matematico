# Guía docente · Diagnósticos de Matemática

**No entregar junto con las hojas del estudiante.** Respuestas de referencia y criterios para interpretar evidencia; admitir procedimientos equivalentes correctos. No confundir un error aritmético aislado con desconocimiento del concepto.

## Registro sugerido

Usar por ejercicio, sin convertirlo automáticamente en nota:

- **2 · Autónomo:** interpreta y resuelve correctamente, justificando los incisos.
- **1 · En desarrollo:** reconoce parte de la idea, pero omite una justificación o presenta un error localizado. Registrar qué inciso falta.
- **0 · A recuperar:** el intento muestra una confusión conceptual que impide resolver.
- **NV · No visto:** el estudiante declara que aún no estudió el contenido; no equivale a cero.
- **SE · Sin evidencia:** no respondió o no alcanzó el tiempo; indagar antes de asignar causa.

Registrar además si hubo ayuda. La autoevaluación del estudiante complementa, pero no reemplaza, la resolución observada. No usar un total o porcentaje de corte para avanzar: revisar las dependencias de cada tema.

## 1 · Funciones

Hoja: [diagnóstico 1](01-funciones.md). Modelo `h(x)=−(x−45)²/135+15`.

| Ítem | Respuesta esperada | Qué observar |
|---|---|---|
| F1 | `h(10)` es la altura cuando la sombra está a 10 m horizontalmente; no son segundos. `h(0)=0 m`, lanzamiento desde el suelo. | Diferencia entre variable de entrada y salida; unidades. |
| F2 | `(x−45)²=2025`; `x−45=±45`; raíces `x=0` y `x=90`. Lanzamiento y caída. | Si obtiene solo una raíz, revisar el doble signo. |
| F3 | Vértice `(45,15)`, eje `x=45`, máximo `15 m`. Como un cuadrado es no negativo, `h(x)≤15`. Boceto cóncavo hacia abajo, ceros `(0,0)` y `(90,0)`, ejes en m. | No confundir vértice, raíz y eje de simetría. Se admite una justificación equivalente sin derivadas. |
| F4 | Dominio algebraico ℝ; intervalo contextual `[0,90]`. Fuera del intervalo la altura es negativa. No llega al arco a 100 m durante el vuelo sin rebotes. | Distinguir fórmula y modelo, sin aceptar una prolongación física bajo el suelo. |
| F5 | Altura `160/27≈5,93 m`; horizontal `10 m`; recta `√(10²+(160/27)²)≈11,62 m`. Son magnitudes distintas. | Planteo pitagórico con altura exacta o aproximación razonable. La recta no es longitud de trayectoria. |

**Decisión didáctica:** si falla F1, trabajar lectura de variables y sustitución antes de límites. F2 requiere ecuaciones y cuadrados; F3, coordenadas y parábola; F4, dominio; F5, lectura geométrica. Un error aislado en la raíz cuadrada no invalida el resto del bloque.

## 2 · Límites y continuidad

Hoja: [diagnóstico 2](02-limites-continuidad.md).

| Ítem | Respuesta esperada | Qué observar |
|---|---|---|
| L1 | `f(1)=3`, lateral izquierdo 3 y derecho 1. No existe límite bilateral; no hay continuidad. Boceto: rama `x+2` por izquierda que termina en el punto cerrado `(1,3)`; rama `x²` por derecha con punto abierto `(1,1)`. | No inferir límite a partir del valor puntual; distinguir marcas abiertas/cerradas. |
| L2a | `(x²−4)/(x−2)=x+2` para `x≠2`; límite 4. | Factorizar antes de cancelar. |
| L2b | `(x²+3x+2)/(x+1)=x+2` para `x≠−1`; límite 1. Ninguna de las expresiones originales está definida en su punto excluido, aunque exista el límite. | No tratar `0/0` como resultado. |
| L3 | Dominio `ℝ\{−1,1}`; expresión reducida `1/(x−1)` con ambas exclusiones. En −1, límite `−1/2` y hueco. En 1, lateral izquierdo `−∞`, derecho `+∞`; asíntota vertical `x=1`. | No declarar asíntota en todo cero del denominador ni recuperar el punto excluido al simplificar. |
| L4 | Al dividir por `x²`, el cociente tiende a 2 en ambos infinitos. Asíntota horizontal `y=2`. | Diferenciar la ecuación de una recta horizontal de una vertical. |
| L5 | `q(1)=2`; para `x≠1`, `q(x)=x+1`, por lo que el límite es 2. Coinciden: es continua en 1. La definición puntual completa la primera rama. | Verificar las tres condiciones, sin ignorar la segunda rama. |

**Decisión didáctica:** L2 débil requiere factorización y restricciones; L1/L5 débiles requieren separar valor y aproximación. L3 exige ambos saberes antes de automatizar reglas de asíntotas. L4 se recupera con comparación de grados, sin agregar asíntotas oblicuas al diagnóstico.

## 3 · Derivadas

Hoja: [diagnóstico 3](03-derivadas.md).

| Ítem | Respuesta esperada | Qué observar |
|---|---|---|
| D1 | `f′(x)=6x−2`; `f′(1)=4`, pendiente de la tangente a la gráfica de `f` en `x=1`. | No confundir `f(1)=1` con la pendiente. No se pide la ecuación de la tangente. |
| D2a | `g′(x)=eˣx²+2xeˣ=eˣ(x²+2x)`. | Regla del producto, no producto de derivadas. |
| D2b | Dominio `x≠0`; `h=x⁻¹+x⁻²`; `h′=−x⁻²−2x⁻³=−(x+2)/x³`, para `x≠0`. Se admite cociente directo equivalente. | Simplificación y potencias negativas sin perder dominio. |
| D3 | `j′(x)=cos²(x)−sen²(x)`. Producto: derivar un factor por vez y sumar; no `cos(x)·(−sen(x))`. Se admite `cos(2x)`. | Signo de la derivada del coseno y regla elegida. |
| D4 | `L(x)=3x⁴−2x²`; `L′(x)=12x³−4x`. Interna `x²`, externa `f(u)=3u²−2u`; cadena `(6x²−2)·2x`. | Diferenciar evaluar en `x²` de elevar toda `f(x)` al cuadrado. |
| D5 | `f(1/2)=−1/4` y `f′(1/2)=1`. Punto bajo el eje, función creciente localmente (la derivada es positiva en un entorno). El signo del valor no es el signo de la tasa. | No concluir «decrece» porque el valor es negativo. |

**Decisión didáctica:** D1 evalúa la base; D2/D3, estructura de reglas; D4, composición; D5, interpretación. Una ejecución mecánica correcta con D5 incorrecto requiere lectura de función/derivada antes de aplicaciones. No introducir técnicas de optimización no evaluadas aquí.

## 4 · Integrales

Hoja: [diagnóstico 4](04-integrales.md).

| Ítem | Respuesta esperada | Qué observar |
|---|---|---|
| I1 | `∫(3x²−2x)dx=x³−x²+C`. Al derivar se recupera el integrando. Las constantes tienen derivada cero; por eso hay una familia. | Distinguir derivar e integrar, y justificar `C`. |
| I2a | `eˣ+x³/3+C`. | Integral de una suma y potencia. |
| I2b | `−1/(2x²)+C`, en `(-∞,0)` o `(0,+∞)`. Pueden elegirse constantes independientes en ambos intervalos. | Exponente `−3`, no regla logarítmica; conservar exclusión de cero. |
| I3a | `−cos(x)−sen(x)+C`. | Comprobar signos derivando. |
| I3b | `−(3/4)cos(4x)+C`. Derivada: `−(3/4)(−sen(4x))·4=3sen(4x)`. | Compensar el factor interno sin exigir sustitución general. |
| I4 | `(1/6)e^(6x)+C`; derivada `(1/6)·6e^(6x)=e^(6x)`. | No multiplicar por 6 al integrar. |
| I5 | Primitiva `4x+x²`; evaluación `[4x+x²]₀³=21`. Región entre `y=4+2x`, eje horizontal y rectas `x=0`, `x=3`; positiva porque `r(x)>0` en el intervalo. Si se incluye `C`, se cancela al restar extremos. Área 21 unidades cuadradas, sin unidades informáticas. | No confundir primitiva con valor definido ni omitir extremo inferior. |

**Decisión didáctica:** I1/I2 permiten revisar potencias y vínculo con derivadas; I3/I4 detectan errores de factores internos; I5 separa familia, evaluación y área. Si no se vio integral definida, registrar NV en I5 y no interpretar esa ausencia como falla de las primitivas.

## Trazabilidad de consignas

Todos los números de página son del PDF. Las preguntas explicativas y los valores de evaluación agregados son adaptaciones dentro del mismo tema, no técnicas nuevas.

| Ítems | Fuente y ubicación | Adaptación |
|---|---|---|
| F1–F5 | [EVA1](../../material/pdf/eva1.pdf), p. 1, a–d. | Misma parábola; separación de variables, ceros, dominio, gráfica y distancias. |
| L1 | [TP2](../../material/pdf/TP2%20LIMITES.pdf), p. 1, ej. 2. | Misma función por tramos; boceto manual en lugar de software. |
| L2 | TP2, p. 2, ej. 3.1–3.2. | Mismos límites; explicitar restricciones. |
| L3 | TP2, p. 2, ej. 4.2. | Misma función; contrastar hueco y asíntota. |
| L4 | TP2, p. 2, ej. 5.1. | Misma función y límites en ambos infinitos. |
| L5 | TP2, p. 3, ej. 6.2. | Misma definición por tramos. |
| D1, D2, D3 | [TP3](../../material/pdf/tp3%20derivadas.pdf), p. 1, ej. 1.1–1.4. | Mismas funciones; se agrega interpretación de pendiente en D1. |
| D4 | TP3, p. 2, ej. 2.1. | Misma composición. |
| D5 | TP3, p. 1, ej. 1.1 y desafío grupal, pp. 1–2. | Comparar signos en `x=1/2`, sin contexto aplicado. |
| I1, I2, I3a | [TP4](../../material/pdf/tp4%20integrales.pdf), p. 1, ej. 1.1–1.4. | Mismos integrandos; agregar comprobación y dominio. |
| I3b, I4 | TP4, p. 1, ej. 2.1–2.2. | Mismos integrandos con argumento lineal. |
| I5 | TP4, pp. 1–2, ej. 4. | Misma función `4+2x`, mismo dominio `[0,5]` y mismos extremos 0 y 3; se sustituye `t` por `x` y se elimina el contexto informático. |

No se evalúan las clases HTML de Programación ni las aplicaciones informáticas/electrónicas de los PDF. EVA2 se deja fuera de estas consignas por su contexto informático; no se necesita otra fuente para cubrir los contenidos matemáticos seleccionados.

## Planilla de devolución

Repetir por estudiante, sin almacenar datos personales en el repositorio compartido:

| Prueba/ítem | Registro (2/1/0/NV/SE) | Evidencia o inciso pendiente | Ayuda recibida | Próxima intervención |
|---|---|---|---|---|
| ______ | ______ | ______ | ______ | ______ |

Devolver una fortaleza observada, un contenido concreto a recuperar y una actividad del PDF correspondiente. Estas pruebas orientan la preparación de clases; no certifican dominio completo de todos los ejercicios del material.
