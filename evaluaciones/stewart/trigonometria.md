---
title: "Examen de diagnóstico D: Trigonometría"
lang: es
description: "Consignas de Stewart y resolución docente."
header-includes: |
  <style>
  body { max-width: 78ch; margin: 0 auto; padding: 1rem clamp(1rem, 4vw, 2rem) 4rem; }
  h1 { font-size: clamp(2.4rem, 6vw, 4rem); line-height: 1.05; }
  h2 { margin-top: 3rem; }
  img { max-width: 100%; height: auto; }
  figure { margin: 1.5rem 0; }
  </style>
---

**Fuente:** James Stewart, *Cálculo*, sexta edición, página física 26 del PDF (página impresa xxiv). Las consignas reproducen el examen; los desarrollos intercalados son de elaboración docente.

## Ejercicio 1 {#ejercicio-1}

Convierta de grados a radianes.

(a) $300^\circ$  (b) $-18^\circ$

---

<script defer src="consulta-incisos.js"></script>

<section class="consulta-incisos consulta-trigonometria" data-consulta-incisos aria-labelledby="trig-1-titulo">
<h3 id="trig-1-titulo">Consultá una resolución</h3>

<details id="trig-1-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

$$300^\circ=\frac{5\pi}{3}\text{ rad}.$$

Como $180^\circ=\pi$ rad, multiplicamos por $\frac{\pi\text{ rad}}{180^\circ}$ y simplificamos la fracción.

<details>
<summary>Paso a paso</summary>

Una vuelta completa mide $360^\circ$ o $2\pi$ rad; por eso $180^\circ=\pi$ rad. Multiplicamos por una razón equivalente a $1$, elegida para cancelar los grados:

$$300^\circ\cdot \frac{\pi\text{ rad}}{180^\circ}=\frac{300\pi}{180}\text{ rad}.$$

Dividimos numerador y denominador por $60$: $\frac{300}{180}=\frac53$. Así obtenemos $\frac{5\pi}{3}$ rad.

</details>
</details>

<details id="trig-1-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

$$-18^\circ=-\frac{\pi}{10}\text{ rad}.$$

Multiplicamos por $\frac{\pi\text{ rad}}{180^\circ}$ y simplificamos. El signo negativo se conserva porque el factor de conversión es positivo.

<details>
<summary>Paso a paso</summary>

De $180^\circ=\pi$ rad obtenemos el factor $\frac{\pi\text{ rad}}{180^\circ}$, que equivale a $1$. Al multiplicar se cancelan los grados:

$$-18^\circ\cdot \frac{\pi\text{ rad}}{180^\circ}=-\frac{18\pi}{180}\text{ rad}.$$

Como $180=18\cdot10$, la fracción se simplifica a $-\frac{\pi}{10}$ rad. El signo indica que el ángulo se mide en el sentido negativo.

</details>
</details>
</section>

## Ejercicio 2 {#ejercicio-2}

Convierta de radianes a grados.

(a) $5\pi/6$  (b) $2$

---

<section class="consulta-incisos consulta-trigonometria" data-consulta-incisos aria-labelledby="trig-2-titulo">
<h3 id="trig-2-titulo">Consultá una resolución</h3>

<details id="trig-2-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

$$\frac{5\pi}{6}\text{ rad}=150^\circ.$$

Como $\pi$ rad equivalen a $180^\circ$, multiplicamos por $\frac{180^\circ}{\pi\text{ rad}}$ y simplificamos.

<details>
<summary>Paso a paso</summary>

Usamos $\pi$ rad $=180^\circ$ y elegimos el factor que cancela los radianes:

$$\frac{5\pi}{6}\text{ rad}\cdot \frac{180^\circ}{\pi\text{ rad}}=\frac{5\cdot180^\circ}{6}.$$

Al cancelar $\pi$ y calcular $180/6=30$, queda $5\cdot30^\circ=150^\circ$.

</details>
</details>

<details id="trig-2-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

$$2\text{ rad}=\left(\frac{360}{\pi}\right)^\circ.$$

El dato es $2$ rad, no $2\pi$ rad. Al multiplicar por $\frac{180^\circ}{\pi\text{ rad}}$ queda una respuesta exacta con $\pi$ en el denominador.

<details>
<summary>Paso a paso</summary>

Como $\pi$ rad $=180^\circ$, multiplicamos por una razón equivalente a $1$ y cancelamos los radianes:

$$2\text{ rad}\cdot \frac{180^\circ}{\pi\text{ rad}}=\left(\frac{2\cdot180}{\pi}\right)^\circ=\left(\frac{360}{\pi}\right)^\circ.$$

No se cancela $\pi$ porque no aparece en el dato $2$ rad. Como comprobación aproximada, $360/\pi\approx114{,}6$.

</details>
</details>
</section>

## Ejercicio 3 {#ejercicio-3}

Encuentre la longitud de un arco de círculo con radio de 12 cm si el arco subtiende un ángulo central de $30^\circ$.

---

<section class="consulta-incisos consulta-trigonometria" aria-labelledby="trig-3-titulo">
<h3 id="trig-3-titulo">Consultá una resolución</h3>

<details id="trig-3-resolucion">
<summary>Explicación breve</summary>

La longitud del arco es

$$s=r\theta=2\pi\text{ cm}.$$

Convertimos $30^\circ$ a $\frac{\pi}{6}$ rad y lo multiplicamos por el radio. En $s=r\theta$, el ángulo debe estar en radianes.

<details>
<summary>Paso a paso</summary>

Una vuelta completa tiene longitud $2\pi r$ y corresponde a $2\pi$ rad. Por proporcionalidad, un ángulo central de $\theta$ rad abarca la fracción $\frac{\theta}{2\pi}$ de la vuelta, de modo que $s=\frac{\theta}{2\pi}\cdot2\pi r=r\theta$.

Convertimos el ángulo antes de usar la fórmula:

$$30^\circ\cdot\frac{\pi\text{ rad}}{180^\circ}=\frac{30\pi}{180}\text{ rad}=\frac{\pi}{6}\text{ rad}.$$

Con $r=12$ cm, sustituimos y simplificamos $12/6=2$:

$$s=12\cdot\frac{\pi}{6}=2\pi\text{ cm}.$$

Como $30^\circ$ es un doceavo de vuelta, también obtenemos un doceavo de la circunferencia $24\pi$ cm.

</details>
</details>
</section>

## Ejercicio 4 {#ejercicio-4}

Encuentre los valores exactos.

(a) $\tan(\pi/3)$  (b) $\operatorname{sen}(7\pi/6)$  (c) $\sec(5\pi/3)$

---

<section class="consulta-incisos consulta-trigonometria" data-consulta-incisos aria-labelledby="trig-4-titulo">
<h3 id="trig-4-titulo">Consultá una resolución</h3>

<details id="trig-4-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

$$\tan\left(\frac{\pi}{3}\right)=\sqrt3.$$

El ángulo es $60^\circ$. En un triángulo notable, los catetos opuesto y adyacente están en razón $\sqrt3:1$.

<details>
<summary>Paso a paso</summary>

Como $\pi$ rad $=180^\circ$, tenemos $\frac{\pi}{3}=60^\circ$. Para obtener las razones exactas, partimos de un triángulo equilátero de lado $2$ y lo dividimos por una altura. Cada mitad es un triángulo rectángulo con hipotenusa $2$, cateto corto $1$ y cateto largo $\sqrt{2^2-1^2}=\sqrt3$, por Pitágoras.

Respecto de $60^\circ$, el cateto opuesto es el largo y el adyacente es el corto. Por definición,

$$\tan 60^\circ=\frac{\text{opuesto}}{\text{adyacente}}=\frac{\sqrt3}{1}=\sqrt3.$$

También $\cos(\pi/3)=\frac12\ne0$, así que el cociente $\tan\theta=\frac{\operatorname{sen}\theta}{\cos\theta}$ está definido.

</details>
</details>

<details id="trig-4-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

$$\operatorname{sen}\left(\frac{7\pi}{6}\right)=-\frac12.$$

El ángulo está en el tercer cuadrante: allí el seno es negativo. Su ángulo de referencia es $\frac{\pi}{6}$, cuyo seno es $\frac12$.

<details>
<summary>Paso a paso</summary>

$$\frac{7\pi}{6}=\pi+\frac{\pi}{6}.$$

Es decir, avanzamos $\frac{\pi}{6}$ después de $\pi$: el ángulo está en el tercer cuadrante. En la circunferencia unitaria, el seno es la coordenada vertical, negativa en ese cuadrante. El ángulo de referencia es $\frac{\pi}{6}$ y su seno es $\frac12$: en un triángulo $30^\circ\!-\!60^\circ\!-\!90^\circ$, el cateto opuesto a $30^\circ$ es la mitad de la hipotenusa. Por lo tanto,

$$\operatorname{sen}\left(\frac{7\pi}{6}\right)=-\operatorname{sen}\left(\frac{\pi}{6}\right)=-\frac12.$$

</details>
</details>

<details id="trig-4-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

$$\sec\left(\frac{5\pi}{3}\right)=2.$$

El ángulo está en el cuarto cuadrante, con referencia $\frac{\pi}{3}$ y coseno $\frac12$. Su recíproco, la secante, es $2$.

<details>
<summary>Paso a paso</summary>

$$\frac{5\pi}{3}=2\pi-\frac{\pi}{3},$$

por lo que el ángulo está en el cuarto cuadrante y su referencia es $\frac{\pi}{3}$. En la circunferencia unitaria el coseno es la coordenada horizontal, positiva allí. Por simetría respecto del eje horizontal,

$$\cos\left(\frac{5\pi}{3}\right)=\cos\left(\frac{\pi}{3}\right)=\frac12.$$

Este valor notable se obtiene con el cateto adyacente a $60^\circ$ y la hipotenusa en razón $1:2$. Como el coseno no es cero, podemos tomar su recíproco:

$$\sec\left(\frac{5\pi}{3}\right)=\frac{1}{1/2}=2.$$

</details>
</details>
</section>

## Ejercicio 5 {#ejercicio-5}

Exprese las longitudes $a$ y $b$ de la figura en términos de $\theta$.

![Figura para problema 5: triángulo rectángulo con hipotenusa 24, cateto opuesto a y cateto adyacente b respecto de theta.](trigonometria-assets/triangulo.svg)

---

<section class="consulta-incisos consulta-trigonometria" aria-labelledby="trig-5-titulo">
<h3 id="trig-5-titulo">Consultá una resolución</h3>

<details id="trig-5-resolucion">
<summary>Explicación breve</summary>

Respecto del ángulo $\theta$,

$$a=24\operatorname{sen}\theta,\qquad b=24\cos\theta.$$

El seno relaciona el cateto opuesto $a$ con la hipotenusa $24$; el coseno relaciona el adyacente $b$ con esa misma hipotenusa. Despejamos cada longitud.

<details>
<summary>Paso a paso</summary>

El cateto opuesto a $\theta$ mide $a$, el adyacente mide $b$ y la hipotenusa mide $24$. Por lo tanto:

$$\operatorname{sen}\theta=\frac{a}{24}\quad\Rightarrow\quad a=24\operatorname{sen}\theta,$$

$$\cos\theta=\frac{b}{24}\quad\Rightarrow\quad b=24\cos\theta.$$

En cada igualdad multiplicamos ambos miembros por $24$ para despejar el cateto. Como el triángulo rectángulo es no degenerado, $\theta$ es agudo: $0<\theta<\frac{\pi}{2}$. En ese intervalo seno y coseno son positivos, como corresponde a las longitudes $a,b>0$.

</details>
</details>
</section>

## Ejercicio 6 {#ejercicio-6}

Si $\operatorname{sen}x=\frac13$ y $\sec y=\frac54$, donde $x$ y $y$ están entre $0$ y $\pi/2$, evalúe $\operatorname{sen}(x+y)$.

---

<section class="consulta-incisos consulta-trigonometria" aria-labelledby="trig-6-titulo">
<h3 id="trig-6-titulo">Consultá una resolución</h3>

<details id="trig-6-resolucion">
<summary>Explicación breve</summary>

$$\operatorname{sen}(x+y)=\frac{4+6\sqrt2}{15}.$$

De la secante obtenemos $\cos y=\frac45$. La identidad pitagórica y el primer cuadrante dan $\operatorname{sen}y=\frac35$ y $\cos x=\frac{2\sqrt2}{3}$; luego aplicamos la fórmula de suma.

<details>
<summary>Paso a paso</summary>

La secante es el recíproco del coseno. Como $\sec y=\frac54$, se cumple $\frac1{\cos y}=\frac54$, de donde $\cos y=\frac45$.

Aplicamos $\operatorname{sen}^2y+\cos^2y=1$ y despejamos:

$$\operatorname{sen}^2y=1-\left(\frac45\right)^2=1-\frac{16}{25}=\frac9{25}.$$

Como $y$ está en el primer cuadrante, su seno es positivo, así que $\operatorname{sen}y=\frac35$, no $-\frac35$.

De igual manera, con $\operatorname{sen}x=\frac13$,

$$\cos^2x=1-\left(\frac13\right)^2=1-\frac19=\frac89.$$

El coseno también es positivo en el primer cuadrante. Entonces

$$\cos x=\sqrt{\frac89}=\frac{\sqrt8}{3}=\frac{2\sqrt2}{3}.$$

Ahora,

$$\operatorname{sen}(x+y)=\operatorname{sen}x\cos y+\cos x\operatorname{sen}y.$$

Sustituyendo:

$$\operatorname{sen}(x+y)=\frac13\cdot\frac45+\frac{2\sqrt2}{3}\cdot\frac35=\frac4{15}+\frac{6\sqrt2}{15}=\frac{4+6\sqrt2}{15}.$$

</details>
</details>
</section>

## Ejercicio 7 {#ejercicio-7}

Demuestre las identidades.

(a) $\tan\theta\operatorname{sen}\theta+\cos\theta=\sec\theta$

(b) $\dfrac{2\tan x}{1+\tan^2 x}=\operatorname{sen}2x$

---

<section class="consulta-incisos consulta-trigonometria" data-consulta-incisos aria-labelledby="trig-7-titulo">
<h3 id="trig-7-titulo">Consultá una resolución</h3>

<details id="trig-7-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

La identidad vale para todo $\theta$ con $\cos\theta\ne0$, pues allí están definidas $\tan\theta$ y $\sec\theta$. Al expresar la tangente como seno sobre coseno aparece $\operatorname{sen}^2\theta+\cos^2\theta=1$.

<details>
<summary>Paso a paso</summary>

Para $\cos\theta\ne0$,

$$\tan\theta\operatorname{sen}\theta+\cos\theta=\frac{\operatorname{sen}\theta}{\cos\theta}\operatorname{sen}\theta+\cos\theta=\frac{\operatorname{sen}^2\theta}{\cos\theta}+\cos\theta.$$

Como $\cos\theta\ne0$, podemos escribir $\cos\theta=\frac{\cos^2\theta}{\cos\theta}$ y sumar con denominador común. Luego usamos $\operatorname{sen}^2\theta+\cos^2\theta=1$ y la definición de secante:

$$=\frac{\operatorname{sen}^2\theta+\cos^2\theta}{\cos\theta}=\frac{1}{\cos\theta}=\sec\theta.$$

Restricción:

$$\cos\theta\ne0\quad\Longleftrightarrow\quad\theta\ne\frac{\pi}{2}+k\pi,\quad k\in\mathbb Z.$$

</details>
</details>

<details id="trig-7-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

La identidad vale para todo $x$ con $\cos x\ne0$, es decir,

$$x\ne\frac{\pi}{2}+k\pi,\quad k\in\mathbb Z.$$

Se usa $1+\tan^2x=\sec^2x$; al reemplazar tangente y secante por cocientes de seno y coseno queda la fórmula del seno del doble.

<details>
<summary>Paso a paso</summary>

Para $\cos x\ne0$, la tangente y la secante están definidas. Además, $1+\tan^2x=\sec^2x$ se obtiene dividiendo $\operatorname{sen}^2x+\cos^2x=1$ por $\cos^2x$. Así,

$$\frac{2\tan x}{1+\tan^2x}=\frac{2\tan x}{\sec^2x}.$$

El denominador es positivo, pues $1+\tan^2x\ge1$. Reemplazamos $\tan x=\frac{\operatorname{sen}x}{\cos x}$ y $\sec^2x=\frac1{\cos^2x}$; dividir por esta última fracción equivale a multiplicar por $\cos^2x$:

$$\frac{2\tan x}{\sec^2x}=2\cdot\frac{\operatorname{sen}x}{\cos x}\cdot\cos^2x=2\operatorname{sen}x\cos x=\operatorname{sen}2x.$$

En el último paso usamos la fórmula del seno del ángulo doble.

En los puntos donde $\tan x$ no está definida, la expresión izquierda tampoco lo está, aunque $\operatorname{sen}2x$ sí esté definida; por eso se excluyen del dominio de la identidad.

</details>
</details>
</section>

## Ejercicio 8 {#ejercicio-8}

Encuentre todos los valores de $x$ tales que $\operatorname{sen}2x=\operatorname{sen}x$ y $0\leq x\leq2\pi$.

---

<section class="consulta-incisos consulta-trigonometria" aria-labelledby="trig-8-titulo">
<h3 id="trig-8-titulo">Consultá una resolución</h3>

<details id="trig-8-resolucion">
<summary>Explicación breve</summary>

Las soluciones en el intervalo cerrado $0\le x\le2\pi$ son

$$x\in\left\{0,\frac{\pi}{3},\pi,\frac{5\pi}{3},2\pi\right\}.$$

La fórmula del ángulo doble permite factorizar en $\operatorname{sen}x(2\cos x-1)=0$. Resolvemos ambos factores sin dividir por $\operatorname{sen}x$, para no perder soluciones.

<details>
<summary>Paso a paso</summary>

Usando $\operatorname{sen}2x=2\operatorname{sen}x\cos x$:

$$\operatorname{sen}2x=\operatorname{sen}x$$

equivale a

$$2\operatorname{sen}x\cos x=\operatorname{sen}x,$$

es decir,

$$2\operatorname{sen}x\cos x-\operatorname{sen}x=0.$$

Factorizando:

$$\operatorname{sen}x(2\cos x-1)=0.$$

Un producto es cero si y solo si al menos uno de sus factores es cero. Entonces hay dos casos:

1. $\operatorname{sen}x=0$. En la circunferencia unitaria, la coordenada vertical es cero sobre el eje horizontal. En $0\le x\le2\pi$ esto ocurre en

   $$x=0,\ \pi,\ 2\pi.$$

2. $2\cos x-1=0$. Sumamos $1$ y dividimos por $2$: $\cos x=\frac12$. El ángulo de referencia es $\frac{\pi}{3}$; el coseno es positivo en los cuadrantes primero y cuarto. En el intervalo pedido, por eso,

   $$x=\frac{\pi}{3},\quad x=2\pi-\frac{\pi}{3}=\frac{5\pi}{3}.$$

Uniendo todas:

$$\boxed{x\in\left\{0,\frac{\pi}{3},\pi,\frac{5\pi}{3},2\pi\right\}}.$$

Se incluyen $0$ y $2\pi$ porque el intervalo es cerrado, aunque representen el mismo punto de la circunferencia. Las transformaciones fueron equivalencias y ambos factores se resolvieron dentro del intervalo, así que la lista contiene todas las soluciones. Dividir por $\operatorname{sen}x$ habría descartado las del primer caso.

</details>
</details>
</section>

## Ejercicio 9 {#ejercicio-9}

Trace la gráfica de la función $y=1+\operatorname{sen}2x$ sin usar calculadora.

---

<section class="consulta-incisos consulta-trigonometria" aria-labelledby="trig-9-titulo">
<h3 id="trig-9-titulo">Consultá una resolución</h3>

<details id="trig-9-resolucion">
<summary>Explicación breve</summary>

La función

$$y=1+\operatorname{sen}2x$$

es una onda senoidal con amplitud $1$, línea media $y=1$, recorrido $[0,2]$ y período

$$T=\frac{2\pi}{2}=\pi.$$

El factor $2$ en el argumento hace que el seno complete su ciclo en la mitad de longitud; el $+1$ desplaza la gráfica una unidad hacia arriba.

<details>
<summary>Paso a paso</summary>

1. Partimos de $y=\operatorname{sen}u$, que tiene amplitud $1$, recorrido $[-1,1]$ y período $2\pi$. Aquí $u=2x$: para que el argumento aumente $2\pi$, $x$ debe aumentar $\pi$. Por eso el período es $\pi$. El $+1$ traslada cada altura una unidad hacia arriba: la línea media pasa de $y=0$ a $y=1$ y el recorrido de $[-1,1]$ a $[0,2]$. La amplitud sigue siendo $1$.

   Basta dibujar un ciclo y repetirlo cada $\pi$.

2. Para un ciclo entre $0$ y $\pi$, dividimos el intervalo en cuatro partes de longitud $\frac{\pi}{4}$. Calculamos primero $2x$, después su seno y finalmente sumamos $1$. Por ejemplo, en $x=\frac{\pi}{4}$, $2x=\frac{\pi}{2}$ y $y=1+1=2$; en $x=\frac{3\pi}{4}$, $2x=\frac{3\pi}{2}$ y $y=1-1=0$:

   $$\begin{array}{c|ccccc}
   2x & 0 & \frac{\pi}{2} & \pi & \frac{3\pi}{2} & 2\pi\\ \hline
   \operatorname{sen}(2x) & 0 & 1 & 0 & -1 & 0
   \end{array}$$

   Los puntos exactos son:

   $$\begin{array}{c|ccccc}
   x & 0 & \frac{\pi}{4} & \frac{\pi}{2} & \frac{3\pi}{4} & \pi\\ \hline
   2x & 0 & \frac{\pi}{2} & \pi & \frac{3\pi}{2} & 2\pi\\ \hline
   y & 1 & 2 & 1 & 0 & 1
   \end{array}$$

3. En los ejes, marcar en $x$ los valores $0,\frac{\pi}{4},\frac{\pi}{2},\frac{3\pi}{4},\pi$ y en $y$ los valores $0,1,2$. Ubicar los puntos de la tabla y unirlos con una curva suave: sube hasta el máximo $2$, baja hasta el mínimo $0$ y vuelve a $1$.

4. Repetir el mismo patrón cada $\pi$ hacia ambos lados. Si $k\in\mathbb Z$ cuenta los ciclos, se obtienen:
   - máximos $y=2$ en $x=\frac{\pi}{4}+k\pi$;
   - mínimos $y=0$ en $x=\frac{3\pi}{4}+k\pi$;
   - cortes con la línea media $y=1$ en $x=\frac{k\pi}{2}$.

La gráfica toca el eje $x$ en los mínimos, pero no toma valores negativos.

![Gráfica de y igual a 1 más seno de 2x: amplitud 1, línea media 1 y período pi.](trigonometria-assets/grafica.svg)

</details>
</details>
</section>
