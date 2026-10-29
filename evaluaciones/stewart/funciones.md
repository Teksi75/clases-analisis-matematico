---
pagetitle: 'Examen de diagnóstico C: Funciones'
lang: es
---

<main style="margin: 0 auto; padding: 2rem 5% 6rem">

# Examen de diagnóstico C: Funciones

**Fuente:** James Stewart, *Cálculo*, sexta edición, página física 25 (página impresa xxiii), [PDF local](../../material/pdf/JAMES_STEWART_Sexta_edicion_Sexta_edicio.pdf). Se reproducen las consignas; los desarrollos intercalados son de elaboración docente. Las estimaciones gráficas son aproximadas.

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

### Desarrollo docente

1. **(a)** En la cuadrícula cada división representa una unidad. Al buscar $x=-1$, la curva está en $y=-2$; por tanto, $f(-1)=-2$.
2. **(b)** Al buscar $x=2$, la altura es aproximadamente $2.8$; entonces $f(2)\approx2.8$.
3. **(c)** La horizontal $y=2$ corta la curva en $x=-3$ y $x=1$.
4. **(d)** Los cortes con el eje horizontal están cerca de $x=-2.5$ y $x=0.3$.
5. **(e)** La curva va desde $x=-3$ hasta $x=3$: el dominio es $[-3,3]$. Su altura mínima es $-2$ y la máxima es $3$: el rango es $[-2,3]$.

## Ejercicio 2

Si $f(x)=x^3$, evalúe el cociente de diferencia $\dfrac{f(2+h)-f(2)}{h}$ y simplifique su respuesta.

### Desarrollo docente

1. Sustituimos: $f(2+h)=(2+h)^3$ y $f(2)=8$.
2. Desarrollamos $(2+h)^3=8+12h+6h^2+h^3$. El numerador queda $12h+6h^2+h^3$.
3. Para $h\ne0$ dividimos por $h$ y obtenemos $12+6h+h^2$. La expresión original no está definida para $h=0$.

## Ejercicio 3

Encuentre el dominio de la función.

**(a)** $f(x)=\dfrac{2x+1}{x^2+x-2}$

**(b)** $g(x)=\dfrac{\sqrt[3]{x}}{x^2+1}$

**(c)** $h(x)=\sqrt{4-x}+\sqrt{x^2-1}$

### Desarrollo docente

1. **(a)** Factorizamos el denominador: $x^2+x-2=(x+2)(x-1)$. Debe ser distinto de cero, por lo que excluimos $-2$ y $1$: $(-\infty,-2)\cup(-2,1)\cup(1,\infty)$.
2. **(b)** La raíz cúbica existe para todo real y $x^2+1>0$ para todo real. El dominio es $(-\infty,\infty)$.
3. **(c)** Las dos raíces cuadradas exigen simultáneamente $4-x\geq0$ y $x^2-1\geq0$. La primera da $x\leq4$; la segunda, $x\leq-1$ o $x\geq1$. Su intersección es $(-\infty,-1]\cup[1,4]$.

## Ejercicio 4

¿Cómo se obtienen las gráficas de las funciones a partir de la gráfica de $f$?

**(a)** $y=-f(x)$

**(b)** $y=2f(x)-1$

**(c)** $y=(x-3)+2$

### Desarrollo docente

1. **(a)** Cada punto $(x,y)$ pasa a $(x,-y)$: reflejamos la gráfica respecto del eje $x$.
2. **(b)** Cada altura primero se duplica y luego se resta 1: estiramos verticalmente por un factor 2 y desplazamos una unidad hacia abajo.
3. **(c)** La fórmula $y=(x-3)+2$ se simplifica a $y=x-1$ y no depende de $f$; su gráfica es una recta de pendiente $1$ y ordenada al origen $-1$.

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

### Desarrollo docente

Para cada bosquejo, marcá los puntos indicados y uní según la forma de la familia.

1. **(a)** La cúbica creciente pasa por $(-1,-1)$, $(0,0)$ y $(1,1)$; su cambio de concavidad está en el origen.
2. **(b)** Partimos de (a) y desplazamos una unidad a la izquierda. El punto central pasa a $(-1,0)$ y la curva pasa también por $(0,1)$.
3. **(c)** Partimos de (a), desplazamos dos unidades a la derecha y tres hacia arriba. El punto central es $(2,3)$; por ejemplo, también pasan $(1,2)$ y $(3,4)$.
4. **(d)** Reflejamos $x^2$ respecto del eje $x$ y subimos cuatro unidades. La parábola abre hacia abajo, tiene vértice $(0,4)$ y corta el eje $x$ en $(-2,0)$ y $(2,0)$.
5. **(e)** La raíz comienza en $(0,0)$ y pasa por $(1,1)$ y $(4,2)$; solo se dibuja para $x\geq0$.
6. **(f)** Duplicamos las alturas de (e): pasa por $(0,0)$, $(1,2)$ y $(4,4)$, con el mismo dominio $x\geq0$.
7. **(g)** El signo menos está fuera de la potencia: $y=-(2^x)$. Pasa por $(0,-1)$ y $(1,-2)$, es negativa y se acerca a $y=0$ por debajo hacia la izquierda.
8. **(h)** Es $y=1+1/x$: trasladamos la hipérbola $1/x$ una unidad hacia arriba. Pasa por $(1,2)$ y $(-1,0)$; sus asíntotas son $x=0$ e $y=1$. Se dibujan las dos ramas sin unirlas a través de $x=0$.

## Ejercicio 6

Sea $f(x)=\begin{cases}1-x^2 & \text{si }x\leq0,\\ 2x+1 & \text{si }x>0.\end{cases}$

**(a)** Evaluación $f(-2)$ y $f(1)$.

**(b)** Dibuje la gráfica de $f$.

### Desarrollo docente

1. **(a)** Como $-2\leq0$, usamos la primera regla: $f(-2)=1-(-2)^2=-3$. Como $1>0$, usamos la segunda: $f(1)=2(1)+1=3$.
2. **(b)** Para $x\leq0$ dibujamos solo la mitad izquierda de la parábola $y=1-x^2$, incluyendo $(0,1)$; pasa por $(-1,0)$ y $(-2,-3)$. Para $x>0$ dibujamos la semirrecta de $y=2x+1$, que pasa por $(1,3)$. La primera rama incluye $(0,1)$; la segunda se aproxima al mismo punto pero no lo incluye por sí sola.

## Ejercicio 7

Si $f(x)=x^2+2x-1$ y $g(x)=2x-3$, encuentre cada una de las siguientes funciones.

**(a)** $f\circ g$

**(b)** $g\circ f$

**(c)** $g\circ g\circ g$

### Desarrollo docente

1. **(a)** Primero aplicamos $g$ y luego $f$: $(f\circ g)(x)=(2x-3)^2+2(2x-3)-1=4x^2-8x+2$.
2. **(b)** Primero aplicamos $f$ y luego $g$: $(g\circ f)(x)=2(x^2+2x-1)-3=2x^2+4x-5$.
3. **(c)** Repetimos $g$: $g(g(x))=2(2x-3)-3=4x-9$ y $g(g(g(x)))=2(4x-9)-3=8x-21$.

</main>
