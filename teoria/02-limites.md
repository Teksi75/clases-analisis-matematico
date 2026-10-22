# Límites: acercarse, comparar y decidir continuidad

Un límite describe el comportamiento de las salidas cuando las entradas se acercan a un lugar o se alejan indefinidamente. No pregunta necesariamente qué ocurre justo en un punto. Vamos a construir esa idea antes de usar reglas de cálculo, con el nivel intuitivo necesario para TP2.

**Recorrido:** aproximación → laterales y gráficos → cálculo y factorización → asíntotas → continuidad. Antes conviene leer [funciones](01-funciones.md); el [índice](README.md) reúne fuentes y navegación.

## 1. Acercarse no es llegar

**Ejemplo original de elaboración docente:** consideremos $f(x)=2x+1$ y entradas próximas a 2. Elegimos valores a ambos lados, sin usar todavía el propio 2:

| $x<2$ | $f(x)$ | $x>2$ | $f(x)$ |
|---|---|---|---|
| 1,9 | 4,8 | 2,1 | 5,2 |
| 1,99 | 4,98 | 2,01 | 5,02 |
| 1,999 | 4,998 | 2,001 | 5,002 |

Por la izquierda las salidas se acercan a 5 desde abajo; por la derecha, desde arriba. Escribimos:

$$
\lim_{x\to2}f(x)=5.
$$

Se lee «el límite de $f(x)$ cuando $x$ tiende a 2 es 5». La expresión $x\to a$ habla de las **entradas** y $f(x)\to L$ de las **salidas**. No significa que $x$ valga siempre $a$, ni que las salidas deban alcanzar exactamente $L$.

La tabla permite explorar, pero una cantidad finita de valores no demuestra por sí sola un límite: podría ocultar otro comportamiento entre ellos. En este caso la fórmula confirma la tendencia: si $x$ se acerca a 2, $2x+1$ se acerca a 5.

### El valor puntual es otra pregunta

**Ejemplo original:** definamos $g(x)=2x+1$ para $x\ne2$, dejando $g(2)$ sin definir. La tabla anterior no cambia. El límite sigue siendo 5, aunque hay un **hueco** en $(2,5)$.

Si ahora definimos $g(2)=9$, solo cambia ese punto: el límite continúa siendo 5 y el valor puntual es 9. Si elegimos $g(2)=5$, llenamos el hueco de manera coherente con la aproximación. Por tanto, conocer $f(a)$ no basta para conocer el límite, y conocer el límite no obliga a que $f(a)$ esté definido.

## 2. Límites laterales y lectura gráfica

El límite por la **izquierda**, $\lim_{x\to a^-}f(x)$, usa entradas menores que $a$. El límite por la **derecha**, $\lim_{x\to a^+}f(x)$, usa entradas mayores. Los signos $-$ y $+$ no indican que la salida sea negativa o positiva.

En un punto con dominio a ambos lados, existe un límite bilateral **finito** si los dos laterales existen como números reales y coinciden:

$$
\lim_{x\to a}f(x)=L
\quad\Longleftrightarrow\quad
\lim_{x\to a^-}f(x)=\lim_{x\to a^+}f(x)=L.
$$

Si los laterales son diferentes, no existe un único límite bilateral. No se promedian y no se elige el que coincide con el valor puntual.

Para leer un gráfico, recorré cada rama hacia la vertical $x=a$ y observá a qué altura se acerca. Después, por separado, buscá el punto que define $f(a)$:

- Un **círculo abierto** indica que ese punto no está incluido en esa rama. Puede señalar la altura de aproximación, pero no define por sí solo el valor puntual.
- Un **punto cerrado** pertenece al gráfico; en la vertical $x=a$ determina $f(a)$.
- Si no hay punto cerrado en esa vertical, la función no está definida allí. Puede aun así tener límite.

**Práctica con la fuente:** [TP2, p. 1, ej. 1, ítems 1–24](../material/pdf/TP2%20LIMITES.pdf) requiere mirar los gráficos del PDF. El texto extraído no conserva sus curvas: este apunte no inventa sus valores ni reemplaza esa lectura.

### Ejemplo por tramos de TP2

**Desarrollo docente basado en [TP2, p. 1, ej. 2](../material/pdf/TP2%20LIMITES.pdf):**

$$
f(x)=\begin{cases}
x+2,&x<1,\\
3,&x=1,\\
x^2,&x>1.
\end{cases}
$$

A la izquierda corresponde la fórmula $x+2$: al acercarse $x$ a 1, la salida se acerca a 3. A la derecha corresponde $x^2$: la salida se acerca a 1. En el propio 1 usamos la fila especial, que da 3.

| Pregunta | Resultado | Motivo |
|---|---|---|
| $\lim_{x\to1^-}f(x)$ | 3 | Rama $x+2$ |
| $\lim_{x\to1^+}f(x)$ | 1 | Rama $x^2$ |
| $\lim_{x\to1}f(x)$ | No existe | Los laterales no coinciden |
| $f(1)$ | 3 | Fila $x=1$ |

Para dibujar, la rama izquierda termina con círculo abierto en $(1,3)$, pero la fila puntual coloca allí un punto cerrado. La rama derecha tiene círculo abierto en $(1,1)$. Cambiar solo $f(1)$ no lograría unir las dos aproximaciones.

## 3. Cuándo se puede sustituir directamente

Para límites finitos, si $\lim_{x\to a}f(x)=A$ y $\lim_{x\to a}g(x)=B$, con $A,B$ reales, se pueden combinar resultados:

| Operación | Límite |
|---|---|
| Suma o resta | $A+B$ o $A-B$ |
| Producto | $AB$ |
| Multiplicación por constante $k$ | $kA$ |
| Cociente | $A/B$, **solo si $B\ne0$** |
| Potencia entera positiva | $A^n$ |

Los polinomios permiten sustituir en cualquier entrada real. En un cociente de polinomios podemos sustituir si el denominador no se anula. Para raíces pares, además debe respetarse el dominio real; la aproximación se hace con entradas donde la expresión existe.

**Ejemplo original:** $\lim_{x\to2}(x^2+3)=7$ y $\lim_{x\to2}(x+1)/(x+2)=3/4$. En cambio, si el denominador tiende a cero, la regla del cociente no permite dividir entre cero. Hace falta otro análisis.

### $0/0$ no es una respuesta

Si sustituir produce numerador cero y denominador cero, se obtiene la **forma indeterminada** $0/0$. No es un número, no significa que el límite sea cero y no demuestra que el límite no exista. Es una señal para transformar la expresión o estudiar su comportamiento.

**Ejemplo original:** cerca de 0, $x/x=1$, $x^2/x=x$ y $x/x^2=1/x$, siempre con $x\ne0$. Las tres expresiones dan la forma $0/0$ al intentar sustituir, pero sus comportamientos son diferentes: límite 1, límite 0 y ausencia de límite bilateral finito, respectivamente.

## 4. Factorizar sin perder restricciones

Factorizar es escribir una suma como producto. Se pueden cancelar **factores comunes no nulos**, no términos sueltos de una suma. Este repertorio prepara [TP2, p. 2, ej. 3](../material/pdf/TP2%20LIMITES.pdf):

| Herramienta | Identidad | Ejemplo |
|---|---|---|
| Factor común | $AB+AC=A(B+C)$ | $x^2-x=x(x-1)$ |
| Diferencia de cuadrados | $u^2-v^2=(u-v)(u+v)$ | $x^2-4=(x-2)(x+2)$ |
| Trinomio mónico | $x^2+(r+s)x+rs=(x+r)(x+s)$ | $x^2+3x+2=(x+1)(x+2)$ |
| Cuadrado perfecto | $u^2+2uv+v^2=(u+v)^2$ | $x^2+4x+4=(x+2)^2$ |
| Diferencia de cubos | $u^3-v^3=(u-v)(u^2+uv+v^2)$ | $x^3-1=(x-1)(x^2+x+1)$ |

Las identidades son válidas para todos los reales, pero al cancelar en un **cociente** conservamos las exclusiones de su denominador original. Por ejemplo, $(x^3-1)/(x-1)=x^2+x+1$ solo para $x\ne1$. La simplificación no agrega el valor que faltaba.

### Ejemplo desarrollado: un hueco, no una división entre cero

**Desarrollo docente basado en [TP2, p. 2, ej. 3.1](../material/pdf/TP2%20LIMITES.pdf):**

$$
\lim_{x\to2}\frac{x^2-4}{x-2}.
$$

La sustitución produce $0/0$. Factorizamos y, para las entradas cercanas con $x\ne2$, podemos cancelar:

$$
\frac{(x-2)(x+2)}{x-2}=x+2,\qquad x\ne2.
$$

Así, $\lim_{x\to2}(x^2-4)/(x-2)=\lim_{x\to2}(x+2)=4$. La función original sigue sin estar definida en 2. Su gráfico coincide con la recta $y=x+2$, excepto por el hueco en $(2,4)$.

Esto funciona porque el límite estudia entradas próximas a 2, distintas de 2. No escribimos que $0/0=4$: calculamos un límite mediante una igualdad válida fuera del punto excluido.

## 5. Límites infinitos y asíntotas verticales

Cuando las salidas crecen sin cota superior al acercarnos a $a$, escribimos $f(x)\to+\infty$; cuando disminuyen sin cota inferior, $f(x)\to-\infty$. **Infinito no es un valor real de la función**. Un límite infinito no es un límite finito, aunque usemos la misma notación de aproximación.

**Ejemplo original:** para $1/(x-1)$, el denominador es negativo y muy pequeño en valor absoluto a la izquierda de 1: las salidas son negativas con magnitud cada vez mayor. A la derecha, son positivas y crecen sin cota:

$$
\lim_{x\to1^-}\frac1{x-1}=-\infty,
\qquad
\lim_{x\to1^+}\frac1{x-1}=+\infty.
$$

No hay límite bilateral finito ni un mismo límite infinito bilateral. Sin embargo, la recta $x=1$ es una **asíntota vertical**: basta que al menos un límite lateral sea $+\infty$ o $-\infty$.

### Contrastar una asíntota con un hueco

**Desarrollo docente basado en [TP2, p. 2, ej. 4.2](../material/pdf/TP2%20LIMITES.pdf):**

$$
r(x)=\frac{x+1}{x^2-1}
=\frac{x+1}{(x-1)(x+1)}
=\frac1{x-1},\qquad x\ne-1,1.
$$

El dominio original excluye **dos** entradas. En $x=-1$, la expresión simplificada se acerca a $1/(-2)=-1/2$ desde ambos lados: hay un hueco en $(-1,-1/2)$, no una asíntota vertical.

En $x=1$, queda un denominador que tiende a cero y el numerador simplificado vale 1. Analizamos signos sin sustituir «infinito» como si fuera un número:

| Acercamiento | Signo de $x-1$ | Comportamiento de $r(x)$ |
|---|---|---|
| $x\to1^-$ | Negativo | $-\infty$ |
| $x\to1^+$ | Positivo | $+\infty$ |

Por eso $x=1$ sí es asíntota vertical. Una raíz del denominador es solo una **candidata**: primero hay que factorizar, conservar restricciones y estudiar los límites.

## 6. Límites al infinito y asíntotas horizontales

Ahora cambia la pregunta: $x\to+\infty$ significa entradas cada vez mayores; $x\to-\infty$, entradas negativas de magnitud cada vez mayor. No nos acercamos a una entrada finita. Por ejemplo, $1/x$ se acerca a 0 en ambos sentidos, aunque no vale cero para ninguna entrada de su dominio.

Si $\lim_{x\to+\infty}f(x)=L$ o $\lim_{x\to-\infty}f(x)=L$, con $L$ real, la recta $y=L$ es una **asíntota horizontal** en ese sentido. Hay que estudiar ambos sentidos: en otras familias pueden dar resultados diferentes. Una asíntota horizontal describe el comportamiento lejano y no prohíbe que el gráfico la cruce.

### Normalizar un cociente

**Desarrollo docente basado en [TP2, p. 2, ej. 5.1](../material/pdf/TP2%20LIMITES.pdf):** dividimos numerador y denominador por la mayor potencia del denominador, $x^2$, para $x\ne0$:

$$
\frac{2x^2+3}{x^2+1}
=\frac{2+3/x^2}{1+1/x^2}.
$$

Cuando $x\to+\infty$ o $x\to-\infty$, los términos $1/x^2$ y $3/x^2$ tienden a cero. El denominador transformado tiende a 1, que no es cero, por lo que el límite es $2/1=2$ en ambos sentidos. La asíntota horizontal es $y=2$.

La restricción $x\ne0$ se usa para esta transformación, no para quitar el 0 del dominio original: el límite al infinito trabaja con entradas de gran magnitud.

### Guía por grados para funciones racionales

Si $P$ y $Q$ son polinomios no nulos, con coeficientes principales $a$ y $b$, comparamos sus grados en $P(x)/Q(x)$:

| Comparación | Límite al infinito | Asíntota horizontal |
|---|---|---|
| Grado de $P$ menor que grado de $Q$ | 0 en ambos sentidos | $y=0$ |
| Grados iguales | $a/b$ en ambos sentidos | $y=a/b$ |
| Grado de $P$ mayor que grado de $Q$ | No hay límite finito; estudiar signos en cada sentido | No hay horizontal |

En el último caso, para polinomios no nulos el cociente crece en magnitud sin cota. El signo depende de los coeficientes y de la diferencia de grados: por ejemplo, $x^3/x^2=x$ tiende a $+\infty$ a la derecha y a $-\infty$ a la izquierda. La guía no autoriza escribir «$\infty/\infty$» como resultado ni reemplaza el análisis del dominio en entradas finitas.

## 7. Continuidad: que el valor acompañe la aproximación

En un punto interior $a$ del dominio, la función es **continua** si se cumplen juntas estas tres condiciones:

1. $f(a)$ está definida.
2. Existe un límite bilateral finito $\lim_{x\to a}f(x)$.
3. Ese límite coincide con $f(a)$.

La idea de «dibujar sin levantar el lápiz» puede ayudar visualmente, pero estas condiciones explican qué se está comprobando. Los polinomios son continuos en todo $\mathbb{R}$; las funciones racionales lo son en cada punto de su dominio.

### Qué pasa en un extremo del dominio

Si el dominio es $[0,90]$, en 0 solo hay entradas cercanas **por la derecha** y en 90 solo por la izquierda. La continuidad se analiza relativamente al dominio: pedimos que el límite desde las entradas admitidas coincida con el valor del extremo. No exigimos una rama fuera del dominio.

Así, el modelo físico $h$ de EVA1 es continuo también en sus extremos: $\lim_{x\to0^+}h(x)=h(0)=0$ y $\lim_{x\to90^-}h(x)=h(90)=0$. La falta de entradas físicas menores que 0 no produce una discontinuidad.

### Tres maneras de fallar

| Tipo | Qué sucede | Ejemplo ya estudiado |
|---|---|---|
| Evitable o removible | Existe límite finito, pero falta el valor o es distinto | Hueco en $(2,4)$ de $(x^2-4)/(x-2)$ |
| De salto | Hay laterales finitos diferentes | Función por tramos de TP2 en 1 |
| Infinita | Al menos un lateral es infinito | $1/(x-1)$ en 1 |

Cuando el punto no pertenece al dominio, hablamos aquí de hueco o discontinuidad en el sentido gráfico escolar; estrictamente la función no puede evaluarse ni ser continua **en ese punto** sin extender su dominio. No todo comportamiento discontinuo pertenece necesariamente a una de estas tres categorías, pero son las que necesitamos en este recorrido.

### Reparar un hueco

**Ejemplo original que retoma el cociente de TP2:** buscamos qué valor asignar en 2 para obtener una función continua:

$$
F(x)=\begin{cases}
\dfrac{x^2-4}{x-2},&x\ne2,\\
k,&x=2.
\end{cases}
$$

El límite ya calculado es 4, independientemente de $k$. Para cumplir las tres condiciones elegimos **$k=4$**: ahora $F(2)=4=\lim_{x\to2}F(x)$. Esta nueva función coincide con $x+2$ en todo $\mathbb{R}$ y es continua.

Un salto no se repara cambiando solo un punto: los laterales seguirían siendo diferentes. Una asíntota vertical tampoco se elimina asignando un valor real en el punto.

## 8. Resumen conceptual

Un límite estudia aproximaciones y no necesariamente el valor puntual. Para un bilateral finito interior, los laterales deben coincidir. La sustitución exige operaciones válidas; $0/0$ pide analizar, no responder. Factorizar permite simplificar cerca del punto sin borrar restricciones. Un hueco tiene límite finito; una asíntota vertical se reconoce por un lateral infinito. Las asíntotas horizontales describen entradas lejanas. La continuidad exige que el valor acompañe al límite, usando solo el lado disponible en extremos del dominio.

### Autocontrol — elaboración docente original

1. Si $f(2)=9$, ¿necesariamente el límite en 2 vale 9?
2. En la función por tramos de TP2, ¿se puede lograr continuidad en 1 cambiando solo $f(1)$?
3. ¿Qué permite cancelar $x-2$ en el cociente trabajado? ¿La función original adquiere valor en 2?
4. En $(x+1)/(x^2-1)$, ¿por qué $-1$ y 1 no producen el mismo fenómeno?
5. ¿Cuál es la diferencia entre $x\to1$ con salida infinita y $x\to+\infty$ con salida finita?
6. ¿La continuidad de $\sqrt{x}$ en 0 necesita entradas negativas?

### Respuestas breves para revisar después

1. No; el valor aislado no determina el comportamiento cercano. Puede haber límite diferente o no existir.
2. No; los laterales son 3 y 1 y no cambian al modificar un único valor.
3. Trabajar con $x\ne2$, donde el factor no es cero. La función original sigue sin valor en 2.
4. En $-1$ se cancela el factor responsable y el límite es $-1/2$; en 1 queda una división con denominador tendiendo a cero y laterales infinitos de signos opuestos.
5. En el primer caso las entradas se acercan a un número y las salidas no tienen cota; en el segundo las entradas se alejan y las salidas se acercan a un número.
6. No; su dominio real es $[0,+\infty)$ y el límite por la derecha es $0=\sqrt{0}$.

## Fuentes y siguiente uso

Los desarrollos basados en el PDF local están identificados junto a cada ejemplo: [TP2](../material/pdf/TP2%20LIMITES.pdf), p. 1, ej. 1–2; p. 2, ej. 3.1, 4.2 y 5.1. Para practicar continuidad, consultar p. 3, ej. 6; no se incluye su solucionario completo. Los ejemplos marcados como originales son elaboración docente, no transcripciones del PDF.

Como referencia complementaria de enfoque se consultó **solo la descripción** de [Límite de funciones — Educ.ar / INET](https://www.educ.ar/recursos/152410), dirigido a estudiantes de 4.º año del Segundo Ciclo de Escuela Secundaria Técnica. Esa descripción propone una aproximación intuitiva y menos formal con actividades; no se descargó ni se analizó el documento enlazado. Estos apuntes son un desarrollo propio, no una cita de ese documento ni un programa oficial.

Volvé al [índice de teoría](README.md) para distinguir fuentes, apuntes y fichas docentes.
