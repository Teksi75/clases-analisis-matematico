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

La recta es $y=-3x+1$. Partimos de la forma punto-pendiente con $m=-3$ y el punto $(2,-5)$.

<details>
<summary>Paso a paso</summary>

La forma punto-pendiente es $y-y_1=m(x-x_1)$. Al reemplazar $m=-3$, $x_1=2$ e $y_1=-5$, queda $y-(-5)=-3(x-2)$, es decir, $y+5=-3(x-2)$.

Distribuimos: $y+5=-3x+6$. Restamos $5$ en ambos miembros y obtenemos $y=-3x+1$. Para comprobar el punto, si $x=2$, entonces $y=-3(2)+1=-5$. Además, el coeficiente de $x$ confirma que la pendiente es $-3$.

</details>
</details>

<details id="geo-1-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

La recta es $y=-5$: al ser paralela al eje $x$, es horizontal y conserva la ordenada del punto dado.

<details>
<summary>Paso a paso</summary>

Una recta paralela al eje $x$ es horizontal: al desplazarnos por ella cambia $x$, pero no cambia $y$. Como debe pasar por $(2,-5)$, la ordenada constante es $-5$ y su ecuación es $y=-5$, para cualquier valor de $x$.

En particular, $(2,-5)$ cumple la ecuación. Su pendiente es $0$ porque el cambio vertical entre dos puntos distintos de la recta es $0$.

</details>
</details>

<details id="geo-1-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

La recta es $x=2$: es vertical, como el eje $y$, y conserva la abscisa del punto dado. Su pendiente no está definida.

<details>
<summary>Paso a paso</summary>

Una recta paralela al eje $y$ es vertical: $y$ puede variar, pero todos sus puntos tienen la misma abscisa. Como pasa por $(2,-5)$, esa abscisa es $2$ y la ecuación es $x=2$; el punto dado la cumple.

La pendiente se calcula dividiendo el cambio vertical por el horizontal. Aquí el cambio horizontal es $0$, por lo que esa división no está definida. Por eso tampoco puede escribirse en la forma $y=mx+b$.

</details>
</details>

<details id="geo-1-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

La recta es $y=\frac12x-6$. La recta dada tiene pendiente $\frac12$, que debe conservarse en la paralela que pasa por $(2,-5)$.

<details>
<summary>Paso a paso</summary>

Para hallar la pendiente de la recta dada, restamos $2x$ en ambos miembros de $2x-4y=3$: $-4y=3-2x$. Dividimos por $-4$ y obtenemos $y=\frac12x-\frac34$. El coeficiente de $x$ es la pendiente $\frac12$.

Una recta paralela tiene esa misma pendiente. En la forma punto-pendiente, con $(2,-5)$, queda $y+5=\frac12(x-2)$. Distribuimos: $y+5=\frac12x-1$; al restar $5$, resulta $y=\frac12x-6$.

Como comprobación, para $x=2$ obtenemos $y=1-6=-5$. También podemos multiplicar por $2$ y ordenar: $2y=x-12$, equivalente a $x-2y=12$.

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

La ecuación es $(x+1)^2+(y-4)^2=52$. El radio es la distancia del centro $(-1,4)$ al punto $(3,-2)$, cuyo cuadrado es $52$.

<details>
<summary>Paso a paso</summary>

El radio une el centro con un punto de la circunferencia. Los cambios desde $(-1,4)$ hasta $(3,-2)$ son $3-(-1)=4$ en horizontal y $-2-4=-6$ en vertical. Por Pitágoras, $r^2=4^2+(-6)^2=16+36=52$, de modo que $r=\sqrt{52}=2\sqrt{13}$. Tomamos la raíz positiva porque el radio es una longitud.

La ecuación de centro $(h,k)$ es $(x-h)^2+(y-k)^2=r^2$. Sustituyendo $h=-1$, $k=4$ y $r^2=52$, queda $(x+1)^2+(y-4)^2=52$. El punto dado la cumple: $(3+1)^2+(-2-4)^2=16+36=52$.

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

El centro es $(3,-5)$ y el radio es $5$. Al completar cuadrados, la ecuación queda $(x-3)^2+(y+5)^2=25$.

<details>
<summary>Paso a paso</summary>

Pasamos el término constante al segundo miembro y agrupamos: $(x^2-6x)+(y^2+10y)=-9$. Para completar cada cuadrado tomamos la mitad del coeficiente de la variable y la elevamos al cuadrado: $(-6/2)^2=9$ y $(10/2)^2=25$.

Sumamos ambos valores a los dos miembros para conservar la igualdad:

$(x^2-6x+9)+(y^2+10y+25)=-9+9+25$.

Entonces $(x-3)^2+(y+5)^2=25$. Comparando con $(x-h)^2+(y-k)^2=r^2$, el centro es $(3,-5)$: en el segundo paréntesis $y+5=y-(-5)$. Como $r^2=25$ y el radio es positivo, $r=5$.

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

La pendiente es $-\frac43$: el cambio vertical de $A$ a $B$ es $-16$ y el horizontal es $12$.

<details>
<summary>Paso a paso</summary>

Para dos puntos de abscisas distintas, $m=\frac{y_B-y_A}{x_B-x_A}$. Usamos el mismo orden, de $A$ a $B$, en ambas restas: $y_B-y_A=-12-4=-16$ y $x_B-x_A=5-(-7)=12$.

Como el denominador no es cero, podemos dividir: $m=\frac{-16}{12}=-\frac43$, simplificando numerador y denominador por $4$. El signo negativo indica que la recta baja al avanzar hacia la derecha.

</details>
</details>

<details id="geo-4-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

Una ecuación es $4x+3y+16=0$, obtenida con $A$ y la pendiente $-\frac43$. Para hallar los cortes, hacemos $y=0$ en el eje $x$ y $x=0$ en el eje $y$: son $(-4,0)$ y $(0,-\frac{16}{3})$.

<details>
<summary>Paso a paso</summary>

Del inciso (a), la pendiente es $-\frac43$. En $y-y_1=m(x-x_1)$ usamos $A=(-7,4)$: $y-4=-\frac43(x+7)$. Multiplicamos ambos miembros por $3$: $3y-12=-4(x+7)=-4x-28$. Sumamos $4x+28$ a ambos miembros y resulta $4x+3y+16=0$.

La ecuación también contiene a $B$: $4(5)+3(-12)+16=20-36+16=0$. En el eje $x$ se cumple $y=0$, por lo que $4x+16=0$, $4x=-16$ y $x=-4$: el corte es $(-4,0)$. En el eje $y$ se cumple $x=0$, así que $3y+16=0$, $3y=-16$ y $y=-\frac{16}{3}$: el corte es $(0,-\frac{16}{3})$.

</details>
</details>

<details id="geo-4-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

El punto medio es $(-1,-4)$: cada coordenada es el promedio de las coordenadas correspondientes de $A$ y $B$.

<details>
<summary>Paso a paso</summary>

El punto medio de $(x_A,y_A)$ y $(x_B,y_B)$ es $M=(\frac{x_A+x_B}{2},\frac{y_A+y_B}{2})$. Sustituimos las coordenadas de $A$ y $B$: la abscisa es $\frac{-7+5}{2}=\frac{-2}{2}=-1$ y la ordenada es $\frac{4+(-12)}{2}=\frac{-8}{2}=-4$.

Por lo tanto, $M=(-1,-4)$. Desde $A$ hasta $M$ avanzamos $6$ en horizontal y bajamos $8$; desde $M$ hasta $B$ se repiten esos cambios.

</details>
</details>

<details id="geo-4-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

La longitud es $20$: los cambios horizontal y vertical entre los extremos son $12$ y $-16$, y aplicamos Pitágoras.

<details>
<summary>Paso a paso</summary>

De $A$ a $B$, el cambio horizontal es $5-(-7)=12$ y el vertical es $-12-4=-16$. Estos desplazamientos forman los catetos de un triángulo rectángulo cuya hipotenusa es el segmento $AB$.

Por Pitágoras, $AB^2=12^2+(-16)^2=144+256=400$. Como una longitud no es negativa, $AB=\sqrt{400}=20$.

</details>
</details>

<details id="geo-4-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

La mediatriz es $3x-4y-13=0$: pasa por $M=(-1,-4)$ y su pendiente $\frac34$ es la recíproca opuesta de la de $AB$.

<details>
<summary>Paso a paso</summary>

La mediatriz debe pasar por el punto medio $M=(-1,-4)$ y cortar a $AB$ perpendicularmente. La pendiente de $AB$ es $-\frac43$; como no es cero, la pendiente perpendicular es su recíproca opuesta, $\frac34$. Su producto es $-\frac43\cdot\frac34=-1$, como corresponde a estas rectas perpendiculares.

Con $M$ en la forma punto-pendiente: $y-(-4)=\frac34(x-(-1))$, o sea $y+4=\frac34(x+1)$. Multiplicamos por $4$: $4y+16=3x+3$. Pasamos todos los términos al segundo miembro para obtener $0=3x-4y-13$, equivalente a $3x-4y-13=0$. Al sustituir $M$, se verifica $-3+16-13=0$.

</details>
</details>

<details id="geo-4-f" data-inciso="f">
<summary><strong>(f)</strong> Explicación breve</summary>

La ecuación es $(x+1)^2+(y+4)^2=100$: el centro es $M=(-1,-4)$ y el radio es la mitad del diámetro $AB=20$.

<details>
<summary>Paso a paso</summary>

Como $AB$ es un diámetro, el centro está en su punto medio, $M=(-1,-4)$, y el radio es la mitad de su longitud: $r=20/2=10$. En la forma $(x-h)^2+(y-k)^2=r^2$, sustituimos $h=-1$, $k=-4$ y $r^2=10^2=100$: $(x+1)^2+(y+4)^2=100$.

Comprobamos los extremos. Para $A=(-7,4)$, $(-7+1)^2+(4+4)^2=(-6)^2+8^2=100$. Para $B=(5,-12)$, $(5+1)^2+(-12+4)^2=6^2+(-8)^2=100$. Ambos pertenecen a la circunferencia.

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

La desigualdad reúne dos condiciones: $y\geq-1$ y $y\leq3$. Para cada valor de $x$, se admiten las ordenadas desde $-1$ hasta $3$, incluidos los extremos; no se impone ninguna condición a $x$.

Trazá las rectas horizontales $y=-1$ e $y=3$ con línea continua porque los signos $\leq$ incluyen la igualdad. Sombreá entre ellas, extendiendo la franja sin límite hacia ambos lados. El origen pertenece porque $-1\leq0\leq3$; $(0,4)$ queda fuera porque $4>3$.

</details>
</details>

<details id="geo-5-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

Es el interior del rectángulo delimitado por $x=\pm4$ e $y=\pm2$: la frontera no se incluye porque ambas desigualdades son estrictas.

<details>
<summary>Paso a paso</summary>

$|x|<4$ significa que la distancia de $x$ a $0$ es menor que $4$; por eso equivale a $-4<x<4$. De igual manera, $|y|<2$ equivale a $-2<y<2$. Como las condiciones están unidas por «y», deben cumplirse las dos a la vez.

Marcá como referencia los cuatro vértices $(\pm4,\pm2)$ y trazá los lados sobre $x=-4$, $x=4$, $y=-2$ e $y=2$. Usá líneas punteadas: los lados y vértices no pertenecen a la región, ya que en ellos alguna desigualdad se vuelve igualdad. Sombreá el interior. Por ejemplo, $(0,0)$ cumple ambas condiciones, pero $(4,0)$ no cumple $|x|<4$.

</details>
</details>

<details id="geo-5-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

Es el lado de la recta que contiene al origen, por debajo de ella; la recta no se incluye.

<details>
<summary>Paso a paso</summary>

Primero trazamos la frontera $y=1-\frac12x$. Si $x=0$, $y=1$; si $y=0$, entonces $0=1-\frac12x$, de donde $\frac12x=1$ y $x=2$. La recta pasa por $(0,1)$ y $(2,0)$.

Trazala punteada porque $y<1-\frac12x$ no admite igualdad. Para cada $x$ se necesitan ordenadas menores que la de la recta, así que se sombrea por debajo. Como comprobación, el origen cumple $0<1-\frac12(0)=1$ y pertenece a ese lado. La región se extiende sin límite.

</details>
</details>

<details id="geo-5-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

Es la región por encima de la parábola $y=x^2-1$ e incluye la parábola.

<details>
<summary>Paso a paso</summary>

La frontera es $y=x^2-1$: al restar $1$ a $x^2$, su vértice queda en $(0,-1)$ y la parábola abre hacia arriba. Para hallar sus cortes con el eje $x$, hacemos $y=0$: $x^2-1=0$, luego $x^2=1$ y $x=\pm1$. Los cortes son $(\pm1,0)$.

Trazá la parábola continua porque $\geq$ admite igualdad. Para cada $x$, la desigualdad pide una ordenada igual o mayor que $x^2-1$: sombreá por encima de la curva. El origen cumple $0\geq0^2-1=-1$; $(0,-2)$ queda fuera porque $-2\not\geq-1$.

</details>
</details>

<details id="geo-5-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

Es el interior de la circunferencia de centro $(0,0)$ y radio $2$; la circunferencia no se incluye.

<details>
<summary>Paso a paso</summary>

La distancia de $(x,y)$ al origen es $d=\sqrt{x^2+y^2}$. Como $d\geq0$, la condición $x^2+y^2<4=2^2$ equivale a $d<2$: buscamos los puntos a menos de $2$ unidades del origen.

La frontera $x^2+y^2=4$ es la circunferencia de centro $(0,0)$ y radio $2$; pasa por $(\pm2,0)$ y $(0,\pm2)$. Trazala punteada porque la igualdad no se admite y sombreá el interior. El origen pertenece porque $0<4$; $(2,0)$ no pertenece porque $2^2+0^2=4$, no menos que $4$.

</details>
</details>

<details id="geo-5-f" data-inciso="f">
<summary><strong>(f)</strong> Explicación breve</summary>

Es una elipse centrada en el origen, con semiejes $4$ y $3$. La igualdad pide solo la curva, no su interior.

<details>
<summary>Paso a paso</summary>

Dividimos ambos miembros de $9x^2+16y^2=144$ por $144$: $\frac{9x^2}{144}+\frac{16y^2}{144}=1$, es decir, $\frac{x^2}{16}+\frac{y^2}{9}=1$. Esta es la forma de una elipse centrada en el origen, con semieje horizontal $\sqrt{16}=4$ y vertical $\sqrt{9}=3$.

Para hallar los cortes con los ejes, si $y=0$ queda $x^2/16=1$, de donde $x=\pm4$; si $x=0$, queda $y^2/9=1$, de donde $y=\pm3$. Marcá $(\pm4,0)$ y $(0,\pm3)$ y trazá la elipse continua por esos puntos, sin sombrear el interior. Solo se incluyen los puntos que cumplen la igualdad: por ejemplo, el origen da $0\ne144$ y queda fuera de la curva.

</details>
</details>
</section>

:::
