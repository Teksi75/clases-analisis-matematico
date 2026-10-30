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

Se usa $180^\circ=\pi$ rad.

<details>
<summary>Paso a paso</summary>

$$300^\circ\cdot \frac{\pi}{180^\circ}=\frac{300\pi}{180}=\frac{5\pi}{3}.$$

</details>
</details>

<details id="trig-1-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

$$-18^\circ=-\frac{\pi}{10}\text{ rad}.$$

El signo negativo se conserva.

<details>
<summary>Paso a paso</summary>

$$-18^\circ\cdot \frac{\pi}{180^\circ}=-\frac{18\pi}{180}=-\frac{\pi}{10}.$$

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

Se multiplica por $\frac{180^\circ}{\pi}$.

<details>
<summary>Paso a paso</summary>

$$\frac{5\pi}{6}\cdot \frac{180^\circ}{\pi}=\frac{5\cdot 180^\circ}{6}=150^\circ.$$

</details>
</details>

<details id="trig-2-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

$$2\text{ rad}=\left(\frac{360}{\pi}\right)^\circ.$$

El dato es $2$ rad, no $2\pi$ rad.

<details>
<summary>Paso a paso</summary>

$$2\cdot \frac{180^\circ}{\pi}=\left(\frac{360}{\pi}\right)^\circ.$$

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

En la fórmula $s=r\theta$, el ángulo $\theta$ debe estar en radianes.

<details>
<summary>Paso a paso</summary>

Primero,

$$30^\circ=30\cdot\frac{\pi}{180}=\frac{\pi}{6}\text{ rad}.$$

Luego, con $r=12$ cm:

$$s=12\cdot\frac{\pi}{6}=2\pi\text{ cm}.$$

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

Es un valor exacto de ángulo notable.

<details>
<summary>Paso a paso</summary>

$\frac{\pi}{3}=60^\circ$. En el triángulo $30^\circ\!-\!60^\circ\!-\!90^\circ$,

$$\tan 60^\circ=\frac{\text{opuesto}}{\text{adyacente}}=\sqrt3.$$

Además, $\cos(\pi/3)=\frac12\ne0$, así que la tangente está definida.

</details>
</details>

<details id="trig-4-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

$$\operatorname{sen}\left(\frac{7\pi}{6}\right)=-\frac12.$$

El ángulo está en el tercer cuadrante y su ángulo de referencia es $\frac{\pi}{6}$.

<details>
<summary>Paso a paso</summary>

$$\frac{7\pi}{6}=\pi+\frac{\pi}{6}.$$

En el tercer cuadrante el seno es negativo, entonces

$$\operatorname{sen}\left(\frac{7\pi}{6}\right)=-\operatorname{sen}\left(\frac{\pi}{6}\right)=-\frac12.$$

</details>
</details>

<details id="trig-4-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

$$\sec\left(\frac{5\pi}{3}\right)=2.$$

Como $\sec=\frac1{\cos}$, se calcula el coseno.

<details>
<summary>Paso a paso</summary>

$$\frac{5\pi}{3}=2\pi-\frac{\pi}{3},$$

por lo que

$$\cos\left(\frac{5\pi}{3}\right)=\cos\left(\frac{\pi}{3}\right)=\frac12.$$

Entonces

$$\sec\left(\frac{5\pi}{3}\right)=\frac{1}{1/2}=2.$$

Está definida porque $\cos(5\pi/3)\ne0$.

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

Se usan las razones trigonométricas del triángulo rectángulo.

<details>
<summary>Paso a paso</summary>

El cateto opuesto a $\theta$ mide $a$, el adyacente mide $b$ y la hipotenusa mide $24$. Por lo tanto:

$$\operatorname{sen}\theta=\frac{a}{24}\quad\Rightarrow\quad a=24\operatorname{sen}\theta,$$

$$\cos\theta=\frac{b}{24}\quad\Rightarrow\quad b=24\cos\theta.$$

Como el triángulo es no degenerado, $0<\theta<\frac{\pi}{2}$, y entonces $a,b>0$.

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

Se calculan $\cos x$ y $\operatorname{sen}y$ usando que $x,y$ están en el primer cuadrante, y luego se aplica la fórmula de suma.

<details>
<summary>Paso a paso</summary>

Como

$$\sec y=\frac54,$$

entonces

$$\cos y=\frac45.$$

En el primer cuadrante el seno es positivo:

$$\operatorname{sen}y=\sqrt{1-\left(\frac45\right)^2}=\sqrt{\frac{9}{25}}=\frac35.$$

También,

$$\operatorname{sen}x=\frac13,$$

y en el primer cuadrante el coseno es positivo:

$$\cos x=\sqrt{1-\left(\frac13\right)^2}=\sqrt{\frac89}=\frac{2\sqrt2}{3}.$$

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

La identidad vale para todo $\theta$ con $\cos\theta\ne0$, pues allí están definidas $\tan\theta$ y $\sec\theta$.

<details>
<summary>Paso a paso</summary>

Para $\cos\theta\ne0$,

$$\tan\theta\operatorname{sen}\theta+\cos\theta=\frac{\operatorname{sen}\theta}{\cos\theta}\operatorname{sen}\theta+\cos\theta=\frac{\operatorname{sen}^2\theta}{\cos\theta}+\cos\theta.$$

Escribiendo $\cos\theta=\frac{\cos^2\theta}{\cos\theta}$:

$$=\frac{\operatorname{sen}^2\theta+\cos^2\theta}{\cos\theta}=\frac{1}{\cos\theta}=\sec\theta.$$

Restricción:

$$\cos\theta\ne0\quad\Longleftrightarrow\quad\theta\ne\frac{\pi}{2}+k\pi,\quad k\in\mathbb Z.$$

</details>
</details>

<details id="trig-7-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

La identidad vale para todo $x$ con $\cos x\ne0$, es decir,

$$x\ne\frac{\pi}{2}+k\pi,\quad k\in\mathbb Z.$$

Se usa $1+\tan^2x=\sec^2x$.

<details>
<summary>Paso a paso</summary>

Para $\cos x\ne0$,

$$\frac{2\tan x}{1+\tan^2x}=\frac{2\tan x}{\sec^2x}.$$

Como $\tan x=\frac{\operatorname{sen}x}{\cos x}$ y $\sec^2x=\frac1{\cos^2x}$,

$$\frac{2\tan x}{\sec^2x}=2\cdot\frac{\operatorname{sen}x}{\cos x}\cdot\cos^2x=2\operatorname{sen}x\cos x=\operatorname{sen}2x.$$

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

Se factoriza la ecuación sin dividir por $\operatorname{sen}x$.

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

Entonces hay dos casos:

1. $\operatorname{sen}x=0$. En $0\le x\le2\pi$:

   $$x=0,\ \pi,\ 2\pi.$$

2. $2\cos x-1=0$, o sea $\cos x=\frac12$. En $0\le x\le2\pi$:

   $$x=\frac{\pi}{3},\ \frac{5\pi}{3}.$$

Uniendo todas:

$$\boxed{x\in\left\{0,\frac{\pi}{3},\pi,\frac{5\pi}{3},2\pi\right\}}.$$

Se incluyen $0$ y $2\pi$ porque el intervalo es cerrado.

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

El $+1$ desplaza la gráfica una unidad hacia arriba.

<details>
<summary>Paso a paso</summary>

1. Como el período es $\pi$, basta dibujar un ciclo y repetirlo cada $\pi$.

2. Para un ciclo entre $0$ y $\pi$, se pueden usar estos puntos exactos:

   $$\begin{array}{c|ccccc}
   x & 0 & \frac{\pi}{4} & \frac{\pi}{2} & \frac{3\pi}{4} & \pi\\ \hline
   2x & 0 & \frac{\pi}{2} & \pi & \frac{3\pi}{2} & 2\pi\\ \hline
   y & 1 & 2 & 1 & 0 & 1
   \end{array}$$

3. En los ejes, marcar en $x$ los valores $0,\frac{\pi}{4},\frac{\pi}{2},\frac{3\pi}{4},\pi$ y en $y$ los valores $0,1,2$. Ubicar los puntos de la tabla y unirlos con una curva suave: sube hasta el máximo $2$, baja hasta el mínimo $0$ y vuelve a $1$.

4. Repetir el mismo patrón cada $\pi$. Así:
   - máximos $y=2$ en $x=\frac{\pi}{4}+k\pi$;
   - mínimos $y=0$ en $x=\frac{3\pi}{4}+k\pi$;
   - cortes con la línea media $y=1$ en $x=\frac{k\pi}{2}$.

La gráfica toca el eje $x$ en los mínimos, pero no toma valores negativos.

![Gráfica de y igual a 1 más seno de 2x: amplitud 1, línea media 1 y período pi.](trigonometria-assets/grafica.svg)

</details>
</details>
</section>
