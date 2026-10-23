# Funciones: relacionar, representar e interpretar

Una función permite describir cómo una cantidad depende de otra. Antes de calcular, necesitamos saber qué representan las cantidades y qué valores tienen sentido. Este apunte prepara la lectura de EVA1 y de las funciones que aparecen en TP2, a nivel secundario y sin derivadas.

**Recorrido:** bases → definición y representaciones → dominio e imagen → lectura del comportamiento → familias → modelo de EVA1. Podés volver al [índice de teoría](README.md) o continuar con [límites](02-limites.md).

## 1. Bases que vamos a usar

Un punto del plano se escribe $(x,y)$: primero la coordenada horizontal, luego la vertical. Por ejemplo, $(2,5)$ se ubica avanzando 2 unidades hacia la derecha y 5 hacia arriba desde el origen $(0,0)$. Los ejes necesitan nombre, escala y, si representan magnitudes, unidades. Una unidad dibujada no tiene por qué medir lo mismo en ambos ejes.

Los intervalos sirven para describir conjuntos de números reales. Los corchetes incluyen un extremo y los paréntesis lo excluyen:

| Escritura | Lectura |
|---|---|
| $[0,4]$ | $0\leq x\leq4$ |
| $(0,4)$ | $0<x<4$ |
| $[0,4)$ | $0\leq x<4$ |
| $(-\infty,4]$ | Todos los reales menores o iguales que 4 |
| $\mathbb{R}$ | Todos los números reales |

El símbolo $\infty$ no es un número real ni un extremo que pueda incluirse: siempre lleva paréntesis. Para reunir dos intervalos usamos $\cup$, que se lee «unión».

**Sustituir** es reemplazar una letra por un valor, conservando las operaciones. Si $f(x)=2x^2-1$, entonces $f(-3)=2(-3)^2-1=17$. Los paréntesis evitan confundir $(-3)^2=9$ con $-3^2=-9$.

**Resolver una ecuación** es buscar los valores que hacen verdadera una igualdad. En $2x+1=7$, restamos 1 y dividimos por 2: $x=3$. En $x^2=9$ hay dos soluciones, $x=3$ y $x=-3$. Estas herramientas se usarán para buscar entradas, no solo para calcular salidas.

## 2. Qué hace que una relación sea una función

Una función asigna a **cada entrada de su dominio una única salida**. Puede haber entradas distintas con la misma salida; lo que no puede haber son dos salidas distintas para una misma entrada.

**Ejemplo original de elaboración docente:** si cada cuaderno cuesta $1500$ pesos, el costo de $n$ cuadernos es $C(n)=1500n$. Elegir $n=2$ determina una sola salida, $3000$ pesos. Aquí $n$ solo toma enteros no negativos: no compramos $-2$ cuadernos ni medio cuaderno en este modelo.

**No ejemplo original:** la relación $y^2=x$ no define una función de $x$ en $\mathbb{R}$ si se permiten ambas soluciones. Para $x=4$ admite $y=2$ y $y=-2$. En cambio, elegir solo $y=\sqrt{x}$ sí define una función para $x\geq0$.

En una gráfica, esta unicidad se verifica con la **prueba de la recta vertical**: ninguna recta vertical puede cortar el gráfico en más de un punto. Una circunferencia completa no pasa la prueba; una parábola vertical sí.

La variable **independiente** es la entrada que elegimos dentro del dominio. La **dependiente** es la salida determinada por esa elección. La escritura $y=f(x)$ se lee «$y$ es efe de equis»; $f(x)$ no significa $f$ multiplicado por $x$. El nombre podría ser $h$, $C$ u otro: importa la relación que define.

## 3. Cuatro maneras de representar la misma función

Una descripción verbal explica la relación y su contexto; una tabla muestra pares; una fórmula permite calcular; un gráfico permite observar tendencias. Ninguna representación reemplaza automáticamente a las otras.

**Ejemplo original:** un tanque contiene inicialmente 10 litros y recibe 2 litros por minuto durante 5 minutos, sin pérdidas ni desbordes.

$$
V(t)=10+2t,\qquad 0\leq t\leq5.
$$

| Tiempo $t$ (min) | 0 | 1 | 2 | 3 | 5 |
|---|---|---|---|---|---|
| Volumen $V(t)$ (L) | 10 | 12 | 14 | 16 | 20 |

En palabras, el volumen aumenta 2 litros por cada minuto. En el gráfico, colocamos $t$ en el eje horizontal y $V$ en el vertical: los puntos quedan sobre un segmento de recta desde $(0,10)$ hasta $(5,20)$. Se une el segmento porque el modelo admite tiempos intermedios.

Una tabla finita por sí sola no informa todos los valores intermedios ni determina una única fórmula. La unión de sus puntos debe justificarse por la relación o el contexto. Para cuadernos vendidos, por ejemplo, se marcarían puntos de entradas enteras, no todas las fracciones entre ellos.

## 4. Dominio, codominio e imagen

El **dominio** es el conjunto de entradas admitidas. El **codominio** es el conjunto de llegada declarado al definir la función. La **imagen** es el conjunto de salidas que efectivamente se obtienen. La imagen está contenida en el codominio, pero no tiene por qué llenarlo.

Por ejemplo, si declaramos $f:\mathbb{R}\to\mathbb{R}$ mediante $f(x)=x^2$, el dominio y el codominio son $\mathbb{R}$, mientras que la imagen es $[0,+\infty)$. No se obtiene ninguna salida negativa. La fórmula sola no siempre informa qué codominio se eligió.

Para encontrar el dominio algebraico real de una expresión, preguntamos qué operaciones pueden realizarse:

| Expresión | Restricción | Dominio algebraico real |
|---|---|---|
| $2x^2-1$ | Ninguna | $\mathbb{R}$ |
| $\dfrac{1}{x-3}$ | El denominador no puede ser cero | $\mathbb{R}\setminus\{3\}$ |
| $\sqrt{x+2}$ | El radicando debe ser no negativo | $[-2,+\infty)$ |

El símbolo $\setminus$ indica que se quitan elementos. Si hay varias restricciones, deben cumplirse todas: para $1/\sqrt{x-1}$ necesitamos $x>1$, porque la raíz debe existir y además no puede valer cero.

El **dominio contextual** agrega las condiciones de la situación. La fórmula del tanque admite cualquier real algebraicamente, pero el modelo solo describe $t\in[0,5]$. Su imagen contextual es $[10,20]$ litros; no son los minutos de funcionamiento. Siempre preguntamos qué mide cada intervalo.

## 5. Evaluar, buscar preimágenes y encontrar raíces

**Evaluar** parte de una entrada conocida y calcula su salida. **Buscar preimágenes** parte de una salida y pregunta qué entradas la producen. Puede haber ninguna, una o varias preimágenes.

**Ejemplo original:** para $f(x)=x^2-4$, evaluar en 3 da $f(3)=5$. Buscar las preimágenes de 5 exige resolver:

$$
x^2-4=5\quad\Longrightarrow\quad x^2=9\quad\Longrightarrow\quad x=\pm3.
$$

Los dos números, $-3$ y $3$, tienen imagen 5. Si el dominio se restringiera a $[0,+\infty)$, solo quedaría 3. La salida $-5$ no tiene preimagen real porque pediría $x^2=-1$.

Las **raíces o ceros** son las preimágenes de 0: las soluciones de $f(x)=0$. Para esta función son $-2$ y $2$. En el gráfico corresponden a los puntos $(-2,0)$ y $(2,0)$ sobre el eje horizontal.

La intersección con el eje vertical se obtiene con $x=0$, si pertenece al dominio: aquí es $(0,-4)$. Una raíz es una entrada; el punto de corte incluye ambas coordenadas.

## 6. Qué podemos leer en una gráfica

El **signo** compara la salida con cero. El gráfico está por encima del eje horizontal cuando $f(x)>0$ y por debajo cuando $f(x)<0$. No hay que confundir el signo de la entrada con el de la salida.

Para $f(x)=x^2-4=(x-2)(x+2)$, los ceros separan intervalos:

| Entradas | $(-\infty,-2)$ | $\{-2,2\}$ | $(-2,2)$ | $(2,+\infty)$ |
|---|---|---|---|---|
| Signo de $f(x)$ | Positivo | Cero | Negativo | Positivo |

Una función es **creciente** en un intervalo cuando, al aumentar la entrada, aumenta la salida; es **decreciente** cuando la salida disminuye. Para compararlo elegimos $x_1<x_2$: en el caso creciente resulta $f(x_1)<f(x_2)$. Si las salidas no cambian, es constante en ese intervalo.

En el ejemplo, la función decrece hasta $x=0$ y luego crece: es decreciente en $(-\infty,0]$ y creciente en $[0,+\infty)$. Aunque sea positiva a la izquierda de $-2$, allí es decreciente: signo y crecimiento son preguntas diferentes.

Un **máximo** es un valor de salida mayor o igual que los comparados; un **mínimo**, menor o igual. Es absoluto si se compara con todo el dominio y local si solo se compara con entradas cercanas. Hay que indicar dónde se alcanza y cuánto vale. En este ejemplo hay mínimo absoluto $-4$ en $x=0$, sin máximo absoluto.

Los extremos incluidos importan: en $g(x)=x$ sobre $[0,1]$ hay mínimo 0 y máximo 1; sobre $(0,1)$ no se alcanza ninguno de esos valores y no hay máximo ni mínimo absoluto.

## 7. Familias para reconocer en TP2

Reconocer la familia ayuda a anticipar forma y restricciones; no reemplaza estudiar el dominio de cada expresión.

| Familia | Fórmula de referencia | Lectura inicial |
|---|---|---|
| Constante | $f(x)=c$ | Recta horizontal; siempre la misma salida. |
| Afín | $f(x)=mx+b$ | Recta; $b$ es el corte vertical y $m$ el cambio de salida por unidad de entrada. |
| Cuadrática | $f(x)=ax^2+bx+c$, $a\ne0$ | Parábola; admite un vértice y hasta dos raíces reales. |
| Racional | $f(x)=P(x)/Q(x)$ | Cociente de polinomios; se excluyen los ceros de $Q$. |
| Raíz cuadrada | $f(x)=\sqrt{x}$ | Dominio e imagen $[0,+\infty)$; el radicando impone restricciones. |

En una afín, $m>0$ indica crecimiento y $m<0$ decrecimiento; con $m=0$ resulta constante. En una racional, un denominador nulo no garantiza una asíntota: puede haber un hueco, como veremos en límites.

### Leer una parábola sin derivadas

En $ax^2+bx+c$, el signo de $a$ determina la concavidad: hacia arriba si $a>0$ y hacia abajo si $a<0$. El valor de $|a|$ modifica la abertura: con ejes y escalas iguales, un valor mayor produce una parábola más cerrada. El coeficiente $c=f(0)$ da el corte vertical; $b$ también influye en la posición del eje de simetría.

La forma $f(x)=a(x-p)^2+q$ permite leer directamente el **vértice** $(p,q)$ y el eje de simetría $x=p$. Desde la forma desarrollada se obtiene $p=-b/(2a)$ y luego $q=f(p)$. Si abre hacia arriba, $q$ es el mínimo; si abre hacia abajo, es el máximo.

Las raíces se buscan igualando a cero. Si se usa la fórmula general,

$$
x=\frac{-b\pm\sqrt{b^2-4ac}}{2a},
$$

el discriminante $b^2-4ac$ indica dos raíces reales si es positivo, una raíz doble si es cero y ninguna raíz real si es negativo. Una parábola puede, por tanto, no cortar el eje horizontal.

## 8. Modelo de EVA1: la altura de una pelota

Para seguir todos los pasos de los incisos a–d, consultar la [resolución pedagógica de EVA1](../evaluaciones/eva1.html), con gráfica y distinción entre altura y distancias.

**Desarrollo docente basado en el PDF local [EVA1, p. 1, incisos a–d](../material/pdf/eva1.pdf).** La fórmula y el contexto proceden del enunciado; las explicaciones y la tabla siguientes se elaboraron para este apunte, no se transcribieron de un solucionario.

$$
h(x)=-\frac{(x-45)^2}{135}+15.
$$

Aquí $x$ es la distancia horizontal entre el punto de lanzamiento y la sombra de la pelota, en metros; $h(x)$ es la altura sobre el suelo, también en metros. **La entrada no es el tiempo.** El modelo considera el vuelo sin rebotes.

Como $(x-45)^2\geq0$, al multiplicar por $-1/135$ resulta $h(x)\leq15$. La igualdad se alcanza en $x=45$: el vértice es $(45,15)$, la altura máxima es 15 m y el eje de simetría es $x=45$. La concavidad es hacia abajo.

Para encontrar dónde está en el suelo buscamos las raíces:

$$
h(x)=0\ \Longleftrightarrow\ (x-45)^2=2025
\ \Longleftrightarrow\ x-45=\pm45
\ \Longleftrightarrow\ x=0\ \text{o}\ x=90.
$$

El polinomio tiene dominio algebraico $\mathbb{R}$ e imagen $(-\infty,15]$. Si lo declaramos con codominio $\mathbb{R}$, ese codominio no coincide con la imagen. En el vuelo físico usamos dominio $[0,90]$ e imagen $[0,15]$: se incluyen lanzamiento y caída. Las alturas negativas fuera del intervalo no describen este vuelo. Por eso no se prolonga el vuelo hasta un arco situado a 100 m.

### Una tabla para construir el gráfico

En papel cuadriculado, rotulá el eje horizontal «distancia $x$ (m)» y el vertical «altura $h(x)$ (m)». Elegí escalas que permitan ver 90 m de alcance y 15 m de altura. Estos puntos orientan el dibujo:

| $x$ (m) | $h(x)$ exacta (m) | Aproximación (m) |
|---|---|---|
| 0 | $0$ | 0 |
| 10 | $160/27$ | 5,93 |
| 30 | $40/3$ | 13,33 |
| 45 | $15$ | 15 |
| 60 | $40/3$ | 13,33 |
| 80 | $160/27$ | 5,93 |
| 90 | $0$ | 0 |

Marcá raíces y vértice, y trazá un arco suave respetando la simetría; no una sucesión de segmentos rectos. Destacá solo el tramo físico. La altura crece en $[0,45]$, decrece en $[45,90]$ y es positiva en $(0,90)$. Los mínimos físicos son 0 m en ambos extremos.

Este polinomio no tiene asíntotas verticales ni horizontales: no se dispara cerca de ninguna entrada finita y, al alejarnos indefinidamente, su altura algebraica disminuye sin acercarse a una constante. Tampoco tiene asíntota oblicua: la diferencia con cualquier recta no tiende a cero. El eje $x=45$ es de **simetría**, no una asíntota. Estas ideas se precisan en el próximo apunte.

### Tres distancias que no son intercambiables

Evaluar a los 10 m horizontales da:

$$
h(10)=-\frac{(10-45)^2}{135}+15
=-\frac{1225}{135}+15=\frac{160}{27}\approx5{,}93\ \text{m}.
$$

La distancia a la sombra es **10 m**, no $h(10)$. Suponiendo al lanzador en el origen, la distancia en línea recta a la pelota es la hipotenusa del triángulo horizontal-vertical:

$$
d=\sqrt{10^2+\left(\frac{160}{27}\right)^2}\approx11{,}62\ \text{m}.
$$

Ninguna de esas tres magnitudes es la longitud del arco recorrido por la pelota. La gráfica de altura frente a distancia no informa directamente cuánto tiempo pasó.

## 9. Resumen conceptual

Una función tiene una sola salida por entrada admitida. Dominio, codominio e imagen responden preguntas diferentes. Evaluar calcula una salida; buscar preimágenes resuelve una ecuación. Raíces, signo, crecimiento y extremos describen aspectos distintos del gráfico. En un modelo, las unidades y el dominio contextual son parte de la interpretación, no un agregado al final.

### Autocontrol — elaboración docente original

1. ¿Puede una función tener $f(2)=5$ y $f(3)=5$? ¿Y dos salidas distintas en 2?
2. Para $f(x)=x^2$ con dominio y codominio $\mathbb{R}$, ¿cuál es la imagen? ¿Qué entradas dan 9?
3. ¿Ser positiva implica ser creciente? Buscá un ejemplo en este apunte.
4. En EVA1, ¿qué representan 45 y 15? ¿Por qué no usamos $x=100$ como parte del vuelo?
5. ¿Por qué $h(10)$ no responde cuánto mide la distancia recta a la pelota?

### Respuestas breves para revisar después

1. Sí: entradas diferentes pueden compartir salida. No puede haber dos salidas distintas para una misma entrada.
2. La imagen es $[0,+\infty)$; las preimágenes de 9 son $-3$ y $3$.
3. No. $x^2-4$ es positiva y decreciente en $(-\infty,-2)$.
4. La altura máxima de 15 m ocurre a 45 m horizontales. El vuelo sin rebotes termina en $x=90$.
5. $h(10)$ mide la altura vertical; la distancia recta combina esa altura con los 10 m horizontales.

## Fuentes y continuación

La fuente local del modelo es [EVA1, p. 1](../material/pdf/eva1.pdf). Para preparar el siguiente tema, ver [TP2, pp. 1–3](../material/pdf/TP2%20LIMITES.pdf). Los demás ejemplos de este apunte son elaboración docente original.

Como referencia complementaria de nivel se consultó la descripción de la colección [Matemática para la Educación Secundaria Técnica. Ciclo Básico — Educ.ar](https://www.educ.ar/recursos/151034/matematica-para-la-educacion-secundaria-tecnica-ciclo-basico), que incluye funciones cuadráticas, raíces, funciones elementales y modelización. No se reproduce aquí su contenido ni se afirma una equivalencia de programas. El [índice](README.md) aclara el alcance institucional de las referencias.

**Siguiente lectura:** [Límites, asíntotas y continuidad](02-limites.md).
