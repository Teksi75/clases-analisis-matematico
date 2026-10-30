---
pagetitle: 'Examen de diagnóstico C: Funciones'
lang: es
---

<main style="margin: 0 auto; padding: 2rem 5% 6rem">

# Examen de diagnóstico C: Funciones

**Fuente:** James Stewart, *Cálculo*, sexta edición, página física 25 (página impresa xxiii), [PDF local](../../material/pdf/JAMES_STEWART_Sexta_edicion_Sexta_edicio.pdf). Se reproducen las consignas; los desarrollos son de elaboración docente. Las estimaciones gráficas son aproximadas.

<style>
.consulta-incisos.consulta-funciones { --consulta-accent: #c3a7ec; --consulta-outline: #8c73ad; background: #c3a7ec12; }
.consulta-incisos.consulta-funciones .consulta-selector button:not([aria-pressed="true"]) { background: #c3a7ec26; }
.consulta-incisos.consulta-funciones .consulta-selector button[aria-pressed="true"] { color: #24201b; }
.consulta-incisos.consulta-funciones :is(button, summary):focus-visible { outline-color: #c3a7ec; }
@media print {
  .consulta-incisos.consulta-funciones { background: transparent; }
  .consulta-incisos.consulta-funciones :is(button, summary):focus-visible { outline-color: #59417b; }
}
</style>

## Ejercicio 1

La gráfica de una función $f$ se da a la izquierda.

<figure class="study-figure">
<svg class="study-plot" viewBox="207 305 238 210" role="img" aria-label="Gráfica original del ejercicio 1: curva sobre una cuadrícula con ejes x e y">
<image href="funciones-assets/pagina-025.png" width="1606" height="2007"/>
</svg>
<figcaption>Gráfica original del ejercicio 1, tomada de la página indicada.</figcaption>
</figure>

**(a)** Exprese el valor de $f(-1)$.

**(b)** Estime el valor de $f(2)$.

**(c)** ¿Para qué valores de $x$ es $f(x)=2$?

**(d)** Estime los valores de $x$ tales que $f(x)=0$.

**(e)** Exprese el dominio y rango de $f$.

---

<script defer src="consulta-incisos.js"></script>

<section class="consulta-incisos consulta-funciones" data-consulta-incisos aria-labelledby="func-1-titulo">
<h3 id="func-1-titulo">Consultá una resolución</h3>

<details id="func-1-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

$f(-1)=-2$: buscamos la altura de la curva cuando la entrada es $-1$.

<details>
<summary>Paso a paso</summary>

Cada división de la cuadrícula representa una unidad. Desde el origen, ubicamos $x=-1$ una unidad a la izquierda; en esa vertical buscamos el punto de la curva. Su altura es $y=-2$, dos unidades debajo del eje horizontal. Por definición, esa altura es $f(-1)=-2$.

</details>
</details>

<details id="func-1-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

$f(2)\approx2.8$: leemos la altura de la curva sobre $x=2$; es una estimación.

<details>
<summary>Paso a paso</summary>

Ubicamos $x=2$ dos unidades a la derecha del origen y seguimos la vertical hasta la curva. El punto queda entre las alturas $2$ y $3$, cerca de $3$. La lectura aproximada es $y=2.8$, por lo que $f(2)\approx2.8$; el dibujo no permite asegurar todos sus decimales.

</details>
</details>

<details id="func-1-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

$f(x)=2$ en $x=-3$ y $x=1$: buscamos dónde la curva alcanza la altura $2$.

<details>
<summary>Paso a paso</summary>

Trazamos mentalmente la horizontal $y=2$, dos unidades por encima del eje $x$. Esta corta la curva en dos puntos. Proyectamos cada punto verticalmente sobre el eje $x$: las entradas leídas son $-3$ y $1$. Por tanto, los valores pedidos son $x=-3$ y $x=1$.

</details>
</details>

<details id="func-1-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

Los ceros son aproximadamente $x=-2.5$ y $x=0.3$: son los cortes con el eje horizontal.

<details>
<summary>Paso a paso</summary>

La condición $f(x)=0$ pide puntos de altura cero, es decir, intersecciones con el eje $x$. La curva lo cruza una vez entre $-3$ y $-2$, aproximadamente a mitad de camino, y otra entre $0$ y $1$, cerca de $0$. Leemos $x\approx-2.5$ y $x\approx0.3$; son aproximaciones del gráfico, no valores exactos deducidos de una fórmula.

</details>
</details>

<details id="func-1-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

El dominio es $[-3,3]$ y el rango es $[-2,3]$: leemos, respectivamente, las entradas y las alturas que alcanza la curva.

<details>
<summary>Paso a paso</summary>

El dominio reúne los valores de $x$ para los que hay un punto de la gráfica. La curva comienza en $x=-3$, termina en $x=3$ y cubre los valores intermedios; sus extremos están incluidos. Así, el dominio es $[-3,3]$.

El rango reúne las alturas $y$ alcanzadas. La menor es $-2$ y la mayor es $3$; ambas se alcanzan y la curva pasa por las alturas intermedias. Por eso el rango es $[-2,3]$. Los corchetes indican inclusión de los extremos.

</details>
</details>
</section>

## Ejercicio 2

Si $f(x)=x^3$, evalúe el cociente de diferencia $\dfrac{f(2+h)-f(2)}{h}$ y simplifique su respuesta.

---

<section class="consulta-incisos consulta-funciones" aria-labelledby="func-2-titulo">
<h3 id="func-2-titulo">Consultá una resolución</h3>

<details id="func-2-resolucion">
<summary>Explicación breve</summary>

El cociente es $12+6h+h^2$, con $h\ne0$. Sustituimos en la función, desarrollamos el cubo y cancelamos el factor $h$.

<details>
<summary>Paso a paso</summary>

La expresión original exige $h\ne0$ porque $h$ es el denominador. Como $f(u)=u^3$, al reemplazar la entrada por $2+h$ y por $2$ obtenemos $f(2+h)=(2+h)^3$ y $f(2)=2^3=8$.

Multiplicamos primero $(2+h)^2=4+4h+h^2$ y después por $2+h$:

$$(2+h)^3=(4+4h+h^2)(2+h)=8+4h+8h+4h^2+2h^2+h^3=8+12h+6h^2+h^3.$$

Sustituyendo y restando $8$:

$$\frac{f(2+h)-f(2)}{h}=\frac{8+12h+6h^2+h^3-8}{h}=\frac{h(12+6h+h^2)}{h}=12+6h+h^2.$$

La cancelación es válida solo para $h\ne0$. Aunque el polinomio simplificado admite $h=0$, el cociente original no está definido allí.

</details>
</details>
</section>

## Ejercicio 3

Encuentre el dominio de la función.

**(a)** $f(x)=\dfrac{2x+1}{x^2+x-2}$

**(b)** $g(x)=\dfrac{\sqrt[3]{x}}{x^2+1}$

**(c)** $h(x)=\sqrt{4-x}+\sqrt{x^2-1}$

---

<section class="consulta-incisos consulta-funciones" data-consulta-incisos aria-labelledby="func-3-titulo">
<h3 id="func-3-titulo">Consultá una resolución</h3>

<details id="func-3-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

El dominio es $(-\infty,-2)\cup(-2,1)\cup(1,\infty)$: el denominador no puede ser cero.

<details>
<summary>Paso a paso</summary>

El numerador $2x+1$ existe para todo real. En cambio, debemos exigir $x^2+x-2\ne0$. Buscamos dos números cuyo producto sea $-2$ y suma $1$: son $2$ y $-1$. Entonces

$$x^2+x-2=(x+2)(x-1).$$

El producto se anula en $x=-2$ o $x=1$. Excluimos esos dos valores y admitimos todos los demás: $(-\infty,-2)\cup(-2,1)\cup(1,\infty)$. Los paréntesis excluyen los valores prohibidos.

</details>
</details>

<details id="func-3-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

El dominio es $(-\infty,\infty)$: toda raíz cúbica real existe y $x^2+1$ nunca se anula.

<details>
<summary>Paso a paso</summary>

La raíz cúbica admite entradas negativas, cero y positivas: para cada real $x$ existe un real cuyo cubo es $x$. Además, $x^2\geq0$, por lo que $x^2+1\geq1>0$ y el denominador nunca es cero. No hay restricciones: el dominio es $(-\infty,\infty)$.

</details>
</details>

<details id="func-3-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

El dominio es $(-\infty,-1]\cup[1,4]$: las dos cantidades dentro de las raíces deben ser no negativas simultáneamente.

<details>
<summary>Paso a paso</summary>

Para raíces cuadradas reales exigimos $4-x\geq0$ y $x^2-1\geq0$. La primera condición equivale a $x\leq4$.

Para la segunda, $x^2-1=(x-1)(x+1)$. El producto es no negativo cuando ambos factores tienen el mismo signo o alguno es cero: esto ocurre si $x\leq-1$ o $x\geq1$. Al intersectar con $x\leq4$, la primera parte queda intacta y la segunda queda $1\leq x\leq4$. Entonces el dominio es $(-\infty,-1]\cup[1,4]$; se incluyen $-1$, $1$ y $4$ porque la raíz de cero existe.

</details>
</details>
</section>

## Ejercicio 4

¿Cómo se obtienen las gráficas de las funciones a partir de la gráfica de $f$?

**(a)** $y=-f(x)$

**(b)** $y=2f(x)-1$

**(c)** $y=(x-3)+2$

---

<section class="consulta-incisos consulta-funciones" data-consulta-incisos aria-labelledby="func-4-titulo">
<h3 id="func-4-titulo">Consultá una resolución</h3>

<details id="func-4-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

Reflejamos la gráfica respecto del eje $x$: cada altura cambia de signo.

<details>
<summary>Paso a paso</summary>

Si $(a,b)$ pertenece a la gráfica original, entonces $f(a)=b$. En la nueva gráfica, para la misma entrada $a$, la altura es $-f(a)=-b$. Por tanto $(a,b)$ pasa a $(a,-b)$: conserva su distancia al eje $x$, pero queda del lado opuesto. Los puntos del eje permanecen fijos. El dominio no cambia.

</details>
</details>

<details id="func-4-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

Multiplicamos cada altura por $2$ y luego bajamos $1$: estiramiento vertical de factor $2$ seguido de un desplazamiento hacia abajo.

<details>
<summary>Paso a paso</summary>

Para un punto $(a,b)$ de $f$, se cumple $f(a)=b$. La nueva altura en la misma entrada es $2f(a)-1=2b-1$. Primero $(a,b)$ pasa a $(a,2b)$, duplicando la distancia vertical al eje; después pasa a $(a,2b-1)$, una unidad hacia abajo. El orden importa: bajar primero y duplicar daría $2(b-1)$, no $2b-1$. El dominio sigue siendo el de $f$.

</details>
</details>

<details id="func-4-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

Tal como está escrita, la fórmula da $y=x-1$ y no depende de $f$; es una recta, no una transformación determinada de la gráfica dada.

<details>
<summary>Paso a paso</summary>

En la expresión impresa no aparece $f$. Quitamos paréntesis y sumamos las constantes: $(x-3)+2=x-3+2=x-1$. Es una recta de pendiente $1$ y ordenada al origen $-1$: pasa, por ejemplo, por $(0,-1)$ y $(1,0)$.

Si se pretendiera escribir $y=f(x-3)+2$, entonces cada punto $(a,b)$ de $f$ pasaría a $(a+3,b+2)$: tres unidades a la derecha y dos arriba. Esa es una interpretación alternativa, no la fórmula que aparece en la consigna.

</details>
</details>
</section>

## Ejercicio 5

Sin usar calculadora, haga un bosquejo aproximado de la gráfica.

**(a)** $y=x^3$

**(b)** $y=(x+1)^3$

**(c)** $y=(x-2)^3+3$

**(d)** $y=4-x^2$

**(e)** $y=\sqrt{x}$

**(f)** $y=2\sqrt{x}$

**(g)** $y=-2^x$

**(h)** $y=1+x^{-1}$

---

<section class="consulta-incisos consulta-funciones" data-consulta-incisos aria-labelledby="func-5-titulo">
<h3 id="func-5-titulo">Consultá una resolución</h3>

<details id="func-5-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

La cúbica creciente pasa por $(-1,-1)$, $(0,0)$ y $(1,1)$; uní esos puntos con una curva suave.

<details>
<summary>Paso a paso</summary>

Calculamos $(-1)^3=-1$, $0^3=0$ y $1^3=1$ y marcamos los tres puntos. La función está definida para todo real y crece al aumentar $x$. Dibujamos una curva suave en forma de S, que continúa hacia abajo a la izquierda y hacia arriba a la derecha; cambia de concavidad en $(0,0)$.

</details>
</details>

<details id="func-5-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

Es una cúbica trasladada una unidad a la izquierda; su punto central es $(-1,0)$.

<details>
<summary>Paso a paso</summary>

En $y=(x+1)^3$, la entrada de la cúbica básica es $x+1$. Para que tome los valores $-1$, $0$ y $1$, elegimos $x=-2$, $-1$ y $0$, respectivamente. Así obtenemos $(-2,-1)$, $(-1,0)$ y $(0,1)$. Unimos con la misma S creciente y prolongamos a ambos lados. Cada punto de $y=x^3$ se desplazó una unidad a la izquierda; el dominio es todo real.

</details>
</details>

<details id="func-5-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

Es una cúbica trasladada dos unidades a la derecha y tres hacia arriba; su punto central es $(2,3)$.

<details>
<summary>Paso a paso</summary>

En $y=(x-2)^3+3$, para que la entrada del cubo sea $-1$, $0$ y $1$, usamos $x=1$, $2$ y $3$. Las alturas son $-1+3=2$, $0+3=3$ y $1+3=4$. Marcamos $(1,2)$, $(2,3)$ y $(3,4)$ y trazamos la S creciente. La gráfica básica se desplazó dos a la derecha y tres hacia arriba; está definida para todo real.

</details>
</details>

<details id="func-5-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

La parábola abre hacia abajo, tiene vértice $(0,4)$ y corta el eje $x$ en $(-2,0)$ y $(2,0)$.

<details>
<summary>Paso a paso</summary>

Como $y=4-x^2$, reflejamos $y=x^2$ respecto del eje $x$ y después subimos cuatro unidades. El vértice pasa de $(0,0)$ a $(0,4)$ y el eje de simetría es $x=0$. Para los cortes con el eje horizontal resolvemos $4-x^2=0$, es decir, $x^2=4$, de donde $x=-2$ o $x=2$. Marcamos esos puntos y el vértice y unimos con una parábola hacia abajo. Su dominio es todo real y sus alturas cumplen $y\leq4$.

</details>
</details>

<details id="func-5-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

La curva comienza en $(0,0)$ y pasa por $(1,1)$ y $(4,2)$; solo existe para $x\geq0$.

<details>
<summary>Paso a paso</summary>

Una raíz cuadrada real requiere $x\geq0$ y es no negativa. Elegimos cuadrados fáciles: $\sqrt0=0$, $\sqrt1=1$ y $\sqrt4=2$. Marcamos $(0,0)$, $(1,1)$ y $(4,2)$; trazamos desde el origen una curva creciente que se aplana hacia la derecha. No hay gráfica para $x<0$ y el rango es $[0,\infty)$.

</details>
</details>

<details id="func-5-f" data-inciso="f">
<summary><strong>(f)</strong> Explicación breve</summary>

Duplicamos las alturas de la raíz: la curva pasa por $(0,0)$, $(1,2)$ y $(4,4)$, con $x\geq0$.

<details>
<summary>Paso a paso</summary>

La raíz exige $x\geq0$. Evaluamos $2\sqrt0=0$, $2\sqrt1=2$ y $2\sqrt4=4$. Marcamos $(0,0)$, $(1,2)$ y $(4,4)$ y los unimos con una curva creciente que se aplana. Respecto de $y=\sqrt{x}$, cada altura se duplica; el dominio y el rango siguen siendo $[0,\infty)$.

</details>
</details>

<details id="func-5-g" data-inciso="g">
<summary><strong>(g)</strong> Explicación breve</summary>

$y=-2^x$ significa $y=-(2^x)$: la curva pasa por $(0,-1)$, es negativa y se aproxima a $y=0$ desde abajo hacia la izquierda.

<details>
<summary>Paso a paso</summary>

Primero calculamos la potencia positiva y luego cambiamos su signo: $2^{-1}=1/2$, $2^0=1$ y $2^1=2$. Obtenemos $(-1,-1/2)$, $(0,-1)$ y $(1,-2)$. Reflejamos así $y=2^x$ respecto del eje $x$: la curva es decreciente y siempre negativa. Hacia la izquierda se acerca a la asíntota horizontal $y=0$ sin tocarla; hacia la derecha baja sin límite. Dominio: todos los reales; rango: $(-\infty,0)$.

</details>
</details>

<details id="func-5-h" data-inciso="h">
<summary><strong>(h)</strong> Explicación breve</summary>

$y=1+1/x$ es una hipérbola trasladada hacia arriba; pasa por $(1,2)$ y $(-1,0)$, con asíntotas $x=0$ e $y=1$.

<details>
<summary>Paso a paso</summary>

Como $x^{-1}=1/x$, debemos excluir $x=0$. Para $x=1$, $y=1+1=2$; para $x=-1$, $y=1-1=0$. Para $x>0$, $1/x>0$ y la rama queda por encima de $y=1$; para $x<0$, queda por debajo.

Al acercarse $x$ a cero, $1/x$ crece sin límite en valor absoluto, así que $x=0$ es asíntota vertical. Cuando $x$ crece en valor absoluto, $1/x$ se acerca a cero: $y=1$ es asíntota horizontal, que nunca se alcanza. Dibujamos las dos ramas separadas, sin unirlas a través de $x=0$. Dominio: $\mathbb R\setminus\{0\}$; rango: $\mathbb R\setminus\{1\}$.

</details>
</details>
</section>

## Ejercicio 6

Sea $f(x)=\begin{cases}1-x^2 & \text{si }x\leq0,\\ 2x+1 & \text{si }x>0.\end{cases}$

**(a)** Evaluación $f(-2)$ y $f(1)$.

**(b)** Dibuje la gráfica de $f$.

---

<section class="consulta-incisos consulta-funciones" data-consulta-incisos aria-labelledby="func-6-titulo">
<h3 id="func-6-titulo">Consultá una resolución</h3>

<details id="func-6-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

$f(-2)=-3$ y $f(1)=3$: para cada entrada elegimos la regla cuyo intervalo la contiene.

<details>
<summary>Paso a paso</summary>

Como $-2\leq0$, corresponde la primera regla, $1-x^2$. Sustituyendo, $f(-2)=1-(-2)^2=1-4=-3$. Como $1>0$, corresponde la segunda regla, $2x+1$: $f(1)=2(1)+1=2+1=3$. No intercambiamos las reglas porque cada una vale solo en su tramo.

</details>
</details>

<details id="func-6-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

Dibujamos la mitad izquierda de la parábola y la semirrecta de la derecha; el punto $(0,1)$ pertenece a la primera rama.

<details>
<summary>Paso a paso</summary>

Para $x\leq0$ usamos $y=1-x^2$: $f(0)=1$, $f(-1)=0$ y $f(-2)=-3$. Marcamos $(0,1)$, $(-1,0)$ y $(-2,-3)$ y dibujamos únicamente la mitad izquierda de la parábola, con punto cerrado en $(0,1)$ porque $0$ está incluido.

Para $x>0$ usamos $y=2x+1$: por ejemplo, $x=1$ da $(1,3)$ y $x=2$ da $(2,5)$. Dibujamos la parte de la recta a la derecha del eje. Su extremo en $(0,1)$ sería abierto para esta regla, pero el punto ya está incluido por la primera; la gráfica completa lo muestra cerrado. El dominio es todo real: los dos tramos cubren $x\leq0$ y $x>0$.

</details>
</details>
</section>

## Ejercicio 7

Si $f(x)=x^2+2x-1$ y $g(x)=2x-3$, encuentre cada una de las siguientes funciones.

**(a)** $f\circ g$

**(b)** $g\circ f$

**(c)** $g\circ g\circ g$

---

<section class="consulta-incisos consulta-funciones" data-consulta-incisos aria-labelledby="func-7-titulo">
<h3 id="func-7-titulo">Consultá una resolución</h3>

<details id="func-7-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

$(f\circ g)(x)=4x^2-8x+2$: aplicamos primero $g$ y usamos su resultado como entrada de $f$.

<details>
<summary>Paso a paso</summary>

Por definición, $(f\circ g)(x)=f(g(x))$. Como $g(x)=2x-3$ y $f(u)=u^2+2u-1$, sustituimos toda la expresión $2x-3$ en cada lugar de $u$:

$$f(g(x))=(2x-3)^2+2(2x-3)-1.$$

Desarrollamos el cuadrado y distribuimos el $2$:

$$4x^2-12x+9+4x-6-1=4x^2-8x+2.$$

Ambas funciones son polinomios definidos para todo real, así que el dominio de la composición es $\mathbb R$.

</details>
</details>

<details id="func-7-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

$(g\circ f)(x)=2x^2+4x-5$: aplicamos primero $f$ y luego $g$.

<details>
<summary>Paso a paso</summary>

Por definición, $(g\circ f)(x)=g(f(x))$. La regla $g(u)=2u-3$ duplica su entrada y le resta $3$. Reemplazamos $u$ por $x^2+2x-1$:

$$g(f(x))=2(x^2+2x-1)-3=2x^2+4x-2-3=2x^2+4x-5.$$

Las dos funciones aceptan cualquier entrada real, por lo que el dominio es $\mathbb R$. El orden es distinto del inciso (a) y el resultado también.

</details>
</details>

<details id="func-7-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

$(g\circ g\circ g)(x)=8x-21$: aplicamos $g$ tres veces, usando cada resultado como siguiente entrada.

<details>
<summary>Paso a paso</summary>

Empezamos con $g(x)=2x-3$. Para la segunda aplicación sustituimos esa expresión en $g(u)=2u-3$:

$$g(g(x))=2(2x-3)-3=4x-6-3=4x-9.$$

Aplicamos $g$ una tercera vez a $4x-9$:

$$g(g(g(x)))=2(4x-9)-3=8x-18-3=8x-21.$$

Cada aplicación está definida para todo real, de modo que el dominio es $\mathbb R$.

</details>
</details>
</section>

</main>
