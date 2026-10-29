::: {style="max-width: 70ch; margin: 0 auto; padding: 2rem 5%;"}

# Examen de diagnóstico B: Geometría analítica

Las consignas proceden de James Stewart, sexta edición, examen de diagnóstico B, página impresa xxii (página física 24 del PDF). Las resoluciones son **elaboración docente**. Primero intentá resolver los ejercicios.

## Ejercicio 1 {#ejercicio-1}

Encuentre una ecuación para la recta que pasa por el punto $(2,-5)$ y

- **(a)** tiene pendiente $-3$
- (b) es paralela al eje $x$
- (c) es paralela al eje $y$
- (d) es paralela a la recta $2x-4y=3$

---

<script defer src="consulta-incisos.js"></script>

<section class="consulta-incisos consulta-geometria" data-consulta-incisos aria-labelledby="geo-1-titulo">
<h3 id="geo-1-titulo">Consultá una resolución</h3>

<details id="geo-1-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

La recta es $y=-3x+1$: usamos la pendiente y el punto dados.

<details>
<summary>Paso a paso</summary>

En la forma punto-pendiente $y-y_1=m(x-x_1)$ sustituimos: $y+5=-3(x-2)$. Al distribuir y despejar, $y=-3x+1$. Para comprobar, si $x=2$, resulta $y=-5$.

</details>
</details>

<details id="geo-1-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

La recta es $y=-5$: una paralela al eje $x$ es horizontal.

<details>
<summary>Paso a paso</summary>

En una recta horizontal todos los puntos tienen la misma ordenada. El punto dado tiene ordenada $-5$, de modo que $y=-5$ para cualquier $x$. Su pendiente es $0$.

</details>
</details>

<details id="geo-1-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

La recta es $x=2$: una paralela al eje $y$ es vertical y no tiene pendiente definida.

<details>
<summary>Paso a paso</summary>

Todos los puntos de una recta vertical tienen igual abscisa. Como el punto dado tiene abscisa $2$, la ecuación es $x=2$. No puede escribirse como $y=mx+b$.

</details>
</details>

<details id="geo-1-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

La recta es $y=\frac12x-6$: las paralelas tienen igual pendiente.

<details>
<summary>Paso a paso</summary>

Despejamos $2x-4y=3$: $y=\frac12x-\frac34$. La pendiente es $\frac12$. Con el punto dado, $y+5=\frac12(x-2)$; al despejar obtenemos $y=\frac12x-6$, equivalente a $x-2y=12$. Comprobamos: $2-2(-5)=12$.

</details>
</details>
</section>

## Ejercicio 2 {#ejercicio-2}

Encuentre una ecuación para el círculo que tiene centro en $(-1,4)$ y pasa por el punto $(3,-2)$.

---

<section class="consulta-incisos consulta-geometria" aria-labelledby="geo-2-titulo">
<h3 id="geo-2-titulo">Consultá una resolución</h3>

<details id="geo-2-resolucion">
<summary>Explicación breve</summary>

La ecuación es $(x+1)^2+(y-4)^2=52$: el radio es la distancia del centro al punto dado.

<details>
<summary>Paso a paso</summary>

Calculamos $r^2=(3-(-1))^2+(-2-4)^2=16+36=52$; entonces $r=2\sqrt{13}$. Sustituimos el centro $(-1,4)$ y $r^2=52$ en $(x-h)^2+(y-k)^2=r^2$.

</details>
</details>
</section>

## Ejercicio 3 {#ejercicio-3}

Encuentre el centro y radio del círculo con ecuación $x^2+y^2-6x+10y+9=0$.

---

<section class="consulta-incisos consulta-geometria" aria-labelledby="geo-3-titulo">
<h3 id="geo-3-titulo">Consultá una resolución</h3>

<details id="geo-3-resolucion">
<summary>Explicación breve</summary>

El centro es $(3,-5)$ y el radio es $5$. Para identificarlos, completamos cuadrados.

<details>
<summary>Paso a paso</summary>

Agrupamos $(x^2-6x)+(y^2+10y)=-9$. Sumamos $9$ y $25$ a ambos miembros: $(x-3)^2+(y+5)^2=25$. Al comparar con $(x-h)^2+(y-k)^2=r^2$, obtenemos $h=3$, $k=-5$ y $r=5$.

</details>
</details>
</section>

## Ejercicio 4 {#ejercicio-4}

Sean $A(-7,4)$ y $B(5,-12)$ puntos en el plano.

- **(a)** Encuentre la pendiente de la recta que contiene $A$ y $B$.
- (b) Encuentre una ecuación de la recta que pasa por $A$ y $B$. ¿Cuáles son los puntos de intersección con los ejes?
- (c) Encuentre el punto medio del segmento $AB$.
- (d) Encuentre la longitud del segmento $AB$.
- (e) Encuentre una ecuación de la perpendicular que biseca a $AB$.
- (f) Encuentre una ecuación del círculo para el cual $AB$ es un diámetro.

---

<section class="consulta-incisos consulta-geometria" data-consulta-incisos aria-labelledby="geo-4-titulo">
<h3 id="geo-4-titulo">Consultá una resolución</h3>

<details id="geo-4-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

La pendiente es $-\frac43$: dividimos el cambio vertical por el horizontal.

<details>
<summary>Paso a paso</summary>

Como las abscisas son distintas, el cambio horizontal $5-(-7)=12$ no es cero. El cambio vertical es $-12-4=-16$. Entonces $m=\frac{-16}{12}=-\frac43$.

</details>
</details>

<details id="geo-4-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

Una ecuación es $4x+3y+16=0$. Usamos un punto y la pendiente; los cortes son $(-4,0)$ y $(0,-\frac{16}{3})$.

<details>
<summary>Paso a paso</summary>

Con $A$ y pendiente $-\frac43$, $y-4=-\frac43(x+7)$. Al multiplicar y ordenar resulta $4x+3y+16=0$; también pasa por $B$ porque $20-36+16=0$. Si $y=0$, obtenemos $x=-4$; si $x=0$, obtenemos $y=-\frac{16}{3}$.

</details>
</details>

<details id="geo-4-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

El punto medio es $(-1,-4)$: promediamos las coordenadas correspondientes.

<details>
<summary>Paso a paso</summary>

La abscisa a mitad de camino es $\frac{-7+5}{2}=-1$; la ordenada es $\frac{4-12}{2}=-4$. Así $M=(-1,-4)$.

</details>
</details>

<details id="geo-4-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

La longitud es $20$: aplicamos la fórmula de distancia entre dos puntos.

<details>
<summary>Paso a paso</summary>

Los cambios horizontal y vertical son $12$ y $-16$. Por Pitágoras, $AB=\sqrt{12^2+(-16)^2}=\sqrt{144+256}=\sqrt{400}=20$.

</details>
</details>

<details id="geo-4-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

La mediatriz es $3x-4y-13=0$: pasa por el punto medio y es perpendicular a $AB$.

<details>
<summary>Paso a paso</summary>

La pendiente de $AB$ es $-\frac43$; la perpendicular tiene pendiente recíproca opuesta $\frac34$. Pasa por $M=(-1,-4)$, por lo que $y+4=\frac34(x+1)$. Al ordenar, $3x-4y-13=0$. En $M$ se cumple $-3+16-13=0$.

</details>
</details>

<details id="geo-4-f" data-inciso="f">
<summary><strong>(f)</strong> Explicación breve</summary>

La ecuación es $(x+1)^2+(y+4)^2=100$: el centro es el punto medio del diámetro y el radio es su mitad.

<details>
<summary>Paso a paso</summary>

El centro es $M=(-1,-4)$ y el radio es $20/2=10$. En $(x-h)^2+(y-k)^2=r^2$ sustituimos esos valores. Comprobamos los extremos: $(-6)^2+8^2=100$ y $6^2+(-8)^2=100$.

</details>
</details>
</section>

## Ejercicio 5 {#ejercicio-5}

Trace la región en el plano $xy$ definida por la ecuación o desigualdades.

- **(a)** $-1\leq y\leq 3$
- (b) $|x|<4$ y $|y|<2$
- (c) $y<1-\frac12x$
- (d) $y\geq x^2-1$
- (e) $x^2+y^2<4$
- (f) $9x^2+16y^2=144$

---

<section class="consulta-incisos consulta-geometria" data-consulta-incisos aria-labelledby="geo-5-titulo">
<h3 id="geo-5-titulo">Consultá una resolución</h3>

<details id="geo-5-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

Es la franja horizontal entre $y=-1$ y $y=3$, con ambas rectas incluidas. No hay restricción sobre $x$.

<details>
<summary>Paso a paso</summary>

Trazá ambas rectas continuas porque las igualdades están incluidas y sombreá entre ellas, sin límite horizontal. El origen pertenece; $(0,4)$ queda fuera.

</details>
</details>

<details id="geo-5-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

Es el interior de un rectángulo: la frontera no se incluye porque ambas desigualdades son estrictas.

<details>
<summary>Paso a paso</summary>

Las condiciones equivalen a $-4<x<4$ y $-2<y<2$ y deben cumplirse a la vez. Marcá como referencia los vértices $(\pm4,\pm2)$: no pertenecen a la región. Dibujá los lados punteados y sombreá el interior. $(0,0)$ pertenece; $(4,0)$ no.

</details>
</details>

<details id="geo-5-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

Es el lado de la recta que contiene al origen, por debajo de ella; la recta no se incluye.

<details>
<summary>Paso a paso</summary>

La frontera $y=1-\frac12x$ pasa por $(0,1)$ y $(2,0)$; trazala punteada porque la desigualdad es estricta. El origen cumple $0<1$, así que se sombrea su lado. La región se extiende sin límite.

</details>
</details>

<details id="geo-5-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

Es la región por encima de la parábola $y=x^2-1$ e incluye la parábola.

<details>
<summary>Paso a paso</summary>

La frontera tiene vértice $(0,-1)$ y corta el eje $x$ en $(\pm1,0)$. Trazala continua porque se admite la igualdad. El origen cumple $0\geq-1$; sombreá la región por encima de la curva. $(0,-2)$ queda fuera.

</details>
</details>

<details id="geo-5-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

Es el interior de la circunferencia de centro $(0,0)$ y radio $2$; la circunferencia no se incluye.

<details>
<summary>Paso a paso</summary>

La frontera $x^2+y^2=4$ pasa por $(\pm2,0)$ y $(0,\pm2)$. Trazala punteada: la distancia al origen debe ser menor que $2$. Sombreá el interior; el origen pertenece y $(2,0)$ no.

</details>
</details>

<details id="geo-5-f" data-inciso="f">
<summary><strong>(f)</strong> Explicación breve</summary>

Es una elipse: la igualdad pide solo la curva, no su interior.

<details>
<summary>Paso a paso</summary>

Al dividir por $144$ resulta $\frac{x^2}{16}+\frac{y^2}{9}=1$. El centro es el origen y los semiejes son $4$ y $3$. Marcá $(\pm4,0)$ y $(0,\pm3)$ y trazá la elipse continua, sin sombrear. El origen no cumple la igualdad.

</details>
</details>
</section>

:::
