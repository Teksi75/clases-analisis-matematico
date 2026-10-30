---
title: "Examen de diagnóstico: Álgebra"
lang: es
header-includes: |
  <style>
  body { max-width: 76ch; margin: 0 auto; padding: 1.5rem; }
  h1 { font-size: clamp(2.6rem, 8vw, 5rem); }
  h2 { margin-top: 4rem; }
  h3 { margin-top: 2rem; }
  </style>
---

Consignas del examen A de James Stewart, sexta edición, páginas impresas xx–xxi (páginas físicas 22–23 del PDF local). Los desarrollos son **elaboración docente**. Intentá cada ejercicio antes de leer su desarrollo.

## Ejercicio 1

Sin usar calculadora, evalúe cada una de estas expresiones.

**(a)** $\left(-3\right)^4$\
**(b)** $-3^4$\
**(c)** $3^{-4}$\
**(d)** $\dfrac{5^{23}}{5^{21}}$\
**(e)** $\left(\dfrac{2}{3}\right)^{-2}$\
**(f)** $16^{-3/4}$

<span id="desarrollo-docente"></span>

---

<script defer src="consulta-incisos.js"></script>

<section class="consulta-incisos" data-consulta-incisos aria-labelledby="consulta-titulo">
<h3 id="consulta-titulo">Consultá una resolución</h3>

<details id="consulta-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

**Resultado:** $81$. La base negativa está entre paréntesis y el exponente es par, así que el resultado es positivo.

<details>
<summary>Paso a paso</summary>

$\left(-3\right)^4=(-3)\cdot(-3)\cdot(-3)\cdot(-3)$.

Hay cuatro factores negativos. Al multiplicarlos de a pares, $(-3)\cdot(-3)=9$; después, $9\cdot9=81$.

</details>
</details>

<details id="consulta-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Resultado:** $-81$. El exponente afecta solo al $3$; el signo menos queda afuera y se aplica al final.

<details>
<summary>Paso a paso</summary>

Primero calculamos la potencia: $3^4=3\cdot3\cdot3\cdot3=81$.

Después aplicamos el signo menos: $-3^4=-(3^4)=-81$. A diferencia de (a), aquí el signo no está dentro de la base.

</details>
</details>

<details id="consulta-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

**Resultado:** $\frac{1}{81}$. En este caso el exponente negativo indica el recíproco: $3^{-4}=\frac{1}{3^4}$.

<details>
<summary>Paso a paso</summary>

Calculamos $3^4=3\cdot3\cdot3\cdot3=81$.

Entonces $3^{-4}=\frac{1}{3^4}=\frac{1}{81}$. El signo menos del exponente no vuelve negativo este resultado.

</details>
</details>

<details id="consulta-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

**Resultado:** $25$. Al dividir potencias de la misma base distinta de cero, restamos los exponentes.

<details>
<summary>Paso a paso</summary>

Para $a\ne0$ y exponentes enteros, $\frac{a^m}{a^n}=a^{m-n}$. Aquí la base es $5$, que no es cero:

$\frac{5^{23}}{5^{21}}=5^{23-21}=5^2=5\cdot5=25$.

También podemos cancelar $21$ factores de $5$: quedan dos factores, $5\cdot5$.

</details>
</details>

<details id="consulta-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

**Resultado:** $\frac{9}{4}$. El exponente negativo indica invertir esta fracción y después elevarla al cuadrado.

<details>
<summary>Paso a paso</summary>

Invertimos la fracción y cambiamos el exponente a positivo: $\left(\frac{2}{3}\right)^{-2}=\left(\frac{3}{2}\right)^2$.

Luego $\left(\frac{3}{2}\right)^2=\frac{3^2}{2^2}=\frac{9}{4}$.

</details>
</details>

<details id="consulta-f" data-inciso="f">
<summary><strong>(f)</strong> Explicación breve</summary>

**Resultado:** $\frac{1}{8}$. En este caso el exponente combina raíz cuarta y cubo; el signo negativo indica el recíproco.

<details>
<summary>Paso a paso</summary>

$16^{-3/4}=\frac{1}{16^{3/4}}$.

Como $\sqrt[4]{16}=2$, entonces $16^{3/4}=\left(\sqrt[4]{16}\right)^3=2^3=8$.

Por lo tanto, $16^{-3/4}=\frac{1}{8}$.

</details>
</details>
</section>

## Ejercicio 2

Simplifique estas expresiones. Escriba su respuesta sin exponentes negativos.

**(a)** $\sqrt{200}-\sqrt{32}$\
**(b)** $(3a^3b^3)(4ab^2)^2$\
**(c)** $\left(\dfrac{3x^{3/2}y^3}{x^2y^{-1/2}}\right)^{-2}$

<span id="desarrollo-docente-1"></span>

---

<section class="consulta-incisos" data-consulta-incisos aria-labelledby="consulta-ej2-titulo">
<h3 id="consulta-ej2-titulo">Consultá una resolución</h3>

<details id="consulta-ej2-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

**Resultado:** $6\sqrt2$. Extraemos cuadrados perfectos y restamos radicales semejantes.

<details>
<summary>Paso a paso</summary>

Buscamos cuadrados perfectos dentro de cada radicando: $200=100\cdot2$ y $32=16\cdot2$. Como los factores son no negativos, podemos separar las raíces:

$\sqrt{200}=\sqrt{100}\sqrt2=10\sqrt2$ y $\sqrt{32}=\sqrt{16}\sqrt2=4\sqrt2$.

Ambos términos tienen el mismo radical, por lo que restamos sus coeficientes: $10\sqrt2-4\sqrt2=(10-4)\sqrt2=6\sqrt2$.

</details>
</details>

<details id="consulta-ej2-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Resultado:** $48a^5b^7$. Elevamos el segundo factor y multiplicamos las potencias de igual base.

<details>
<summary>Paso a paso</summary>

Elevamos cada factor del segundo paréntesis: $(4ab^2)^2=4^2a^2(b^2)^2=16a^2b^4$.

Ahora multiplicamos por el primer factor y agrupamos las bases iguales:

$(3a^3b^3)(16a^2b^4)=(3\cdot16)(a^3a^2)(b^3b^4)=48a^{3+2}b^{3+4}=48a^5b^7$.

</details>
</details>

<details id="consulta-ej2-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

**Resultado:** $\dfrac{x}{9y^7}$, con $x>0$ e $y>0$. Simplificamos las potencias y después aplicamos el exponente negativo.

<details>
<summary>Paso a paso</summary>

La raíz en $x^{3/2}$ permite $x\geq0$, pero el denominador $x^2$ excluye $x=0$. Además, $y^{-1/2}=1/\sqrt y$ exige $y>0$. Con estas condiciones la base elevada a $-2$ es positiva.

Al dividir potencias de igual base restamos los exponentes. En particular, $3/2-2=-1/2$ y $3-(-1/2)=7/2$:

$\dfrac{3x^{3/2}y^3}{x^2y^{-1/2}}=3x^{-1/2}y^{7/2}$.

Ahora aplicamos la potencia $-2$ a cada factor y multiplicamos los exponentes:

$(3x^{-1/2}y^{7/2})^{-2}=3^{-2}x^{(-1/2)(-2)}y^{(7/2)(-2)}=3^{-2}xy^{-7}=\dfrac{x}{9y^7}$.

La fórmula final aislada admite otros valores, pero la expresión original no; conservamos $x>0$ e $y>0$.

</details>
</details>
</section>

## Ejercicio 3

Expanda y simplifique.

**(a)** $3(x+6)+4(2x-5)$\
**(b)** $(x+3)(4x-5)$\
**(c)** $(\sqrt a+\sqrt b)(\sqrt a-\sqrt b)$\
**(d)** $(2x+3)^2$\
**(e)** $(x+2)^3$

<span id="desarrollo-docente-2"></span>

---

<section class="consulta-incisos" data-consulta-incisos aria-labelledby="consulta-ej3-titulo">
<h3 id="consulta-ej3-titulo">Consultá una resolución</h3>

<details id="consulta-ej3-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

**Resultado:** $11x-2$. Distribuimos y reunimos términos semejantes.

<details>
<summary>Paso a paso</summary>

Distribuimos cada número entre los términos de su paréntesis: $3(x+6)=3x+18$ y $4(2x-5)=8x-20$.

Después reunimos los términos con $x$ y los números: $3x+18+8x-20=(3x+8x)+(18-20)=11x-2$.

</details>
</details>

<details id="consulta-ej3-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Resultado:** $4x^2+7x-15$. Multiplicamos cada término del primer paréntesis por cada término del segundo.

<details>
<summary>Paso a paso</summary>

Multiplicamos $x$ por ambos términos del segundo paréntesis y hacemos lo mismo con $3$:

$(x+3)(4x-5)=x(4x-5)+3(4x-5)=4x^2-5x+12x-15$.

Como $-5x+12x=7x$, el resultado es $4x^2+7x-15$.

</details>
</details>

<details id="consulta-ej3-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

**Resultado:** $a-b$, para $a\geq0$ y $b\geq0$. Es una suma por una diferencia.

<details>
<summary>Paso a paso</summary>

En los reales, ambas raíces existen si $a\geq0$ y $b\geq0$. Distribuimos:

$(\sqrt a+\sqrt b)(\sqrt a-\sqrt b)=(\sqrt a)^2-\sqrt a\sqrt b+\sqrt b\sqrt a-(\sqrt b)^2$.

Los términos cruzados son opuestos y se cancelan. Como $(\sqrt a)^2=a$ y $(\sqrt b)^2=b$, queda $a-b$. Aunque este resultado existe para todos los reales, mantenemos las condiciones de la expresión original.

</details>
</details>

<details id="consulta-ej3-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

**Resultado:** $4x^2+12x+9$. El cuadrado de una suma también tiene un término del medio.

<details>
<summary>Paso a paso</summary>

El exponente $2$ indica dos factores iguales: $(2x+3)^2=(2x+3)(2x+3)$.

Distribuimos: $(2x)(2x)+(2x)3+3(2x)+3\cdot3=4x^2+6x+6x+9$.

Sumamos los términos semejantes y obtenemos $4x^2+12x+9$. Los dos productos cruzados explican el término del medio.

</details>
</details>

<details id="consulta-ej3-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

**Resultado:** $x^3+6x^2+12x+8$. Multiplicamos el cuadrado de la suma por otro factor $(x+2)$.

<details>
<summary>Paso a paso</summary>

Escribimos el cubo como tres factores. Primero multiplicamos dos:

$(x+2)^2=(x+2)(x+2)=x^2+2x+2x+4=x^2+4x+4$.

Distribuimos el tercer factor:

$(x^2+4x+4)(x+2)=x^3+4x^2+4x+2x^2+8x+8$.

Sumamos $4x^2+2x^2=6x^2$ y $4x+8x=12x$. Queda $x^3+6x^2+12x+8$.

</details>
</details>
</section>

## Ejercicio 4

Factorice estas expresiones.

**(a)** $4x^2-25$\
**(b)** $2x^2+5x-12$\
**(c)** $x^3-3x^2-4x+12$\
**(d)** $x^4+27x$\
**(e)** $3x^{3/2}-9x^{1/2}+6x^{-1/2}$\
**(f)** $x^3y-4xy$

<span id="desarrollo-docente-3"></span>

---

<section class="consulta-incisos" data-consulta-incisos aria-labelledby="consulta-ej4-titulo">
<h3 id="consulta-ej4-titulo">Consultá una resolución</h3>

<details id="consulta-ej4-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

**Resultado:** $(2x-5)(2x+5)$. Aplicamos la diferencia de cuadrados.

<details>
<summary>Paso a paso</summary>

Escribimos $4x^2=(2x)^2$ y $25=5^2$. La identidad $u^2-v^2=(u-v)(u+v)$ se obtiene porque los productos cruzados se cancelan.

Con $u=2x$ y $v=5$, resulta $4x^2-25=(2x)^2-5^2=(2x-5)(2x+5)$.

</details>
</details>

<details id="consulta-ej4-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Resultado:** $(2x-3)(x+4)$. Separamos el término central y factorizamos por grupos.

<details>
<summary>Paso a paso</summary>

Buscamos dos números que sumen $5$ y cuyo producto sea $2\cdot(-12)=-24$: son $8$ y $-3$. Reemplazamos $5x$ por $8x-3x$:

$2x^2+5x-12=2x^2+8x-3x-12$.

Sacamos factor común en cada grupo y luego el paréntesis común:

$2x(x+4)-3(x+4)=(2x-3)(x+4)$.

</details>
</details>

<details id="consulta-ej4-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

**Resultado:** $(x-3)(x-2)(x+2)$. Agrupamos y después usamos diferencia de cuadrados.

<details>
<summary>Paso a paso</summary>

Agrupamos los dos primeros términos y los dos últimos. Extraemos $x^2$ del primer grupo y $-4$ del segundo:

$x^3-3x^2-4x+12=x^2(x-3)-4(x-3)=(x-3)(x^2-4)$.

El segundo factor es una diferencia de cuadrados: $x^2-4=(x-2)(x+2)$. Por eso la factorización es $(x-3)(x-2)(x+2)$.

</details>
</details>

<details id="consulta-ej4-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

**Resultado:** $x(x+3)(x^2-3x+9)$. Sacamos factor común y factorizamos una suma de cubos.

<details>
<summary>Paso a paso</summary>

Ambos términos contienen $x$, así que $x^4+27x=x(x^3+27)=x(x^3+3^3)$.

Usamos la suma de cubos $u^3+v^3=(u+v)(u^2-uv+v^2)$ con $u=x$ y $v=3$:

$x(x^3+3^3)=x(x+3)(x^2-3x+9)$.

El último factor no tiene raíces reales, pues su discriminante es $(-3)^2-4(1)(9)=-27<0$; por eso no se descompone en factores lineales reales.

</details>
</details>

<details id="consulta-ej4-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

**Resultado:** $\dfrac{3(x-1)(x-2)}{\sqrt x}$, con $x>0$. Extraemos la menor potencia de $x$ como factor común.

<details>
<summary>Paso a paso</summary>

La potencia $x^{-1/2}=1/\sqrt x$ exige $x>0$: la raíz debe existir y el denominador no puede anularse.

Extraemos $3x^{-1/2}$. Al dividir cada término por ese factor restamos exponentes: $3/2-(-1/2)=2$, $1/2-(-1/2)=1$ y $-1/2-(-1/2)=0$. Así obtenemos

$3x^{-1/2}(x^2-3x+2)$.

Como $-1-2=-3$ y $(-1)(-2)=2$, el trinomio es $(x-1)(x-2)$. Reemplazamos $x^{-1/2}$ por $1/\sqrt x$ y queda $\dfrac{3(x-1)(x-2)}{\sqrt x}$, siempre con $x>0$.

</details>
</details>

<details id="consulta-ej4-f" data-inciso="f">
<summary><strong>(f)</strong> Explicación breve</summary>

**Resultado:** $xy(x-2)(x+2)$. Extraemos el factor común y usamos diferencia de cuadrados.

<details>
<summary>Paso a paso</summary>

Los dos términos contienen $xy$: $x^3y-4xy=xy(x^2-4)$. El paréntesis es una diferencia de cuadrados, $x^2-2^2=(x-2)(x+2)$.

Por lo tanto, $x^3y-4xy=xy(x-2)(x+2)$. No dividimos por $x$ ni por $y$, así que también se permiten valores nulos.

</details>
</details>
</section>

## Ejercicio 5

Simplifique la expresión racional.

**(a)** $\dfrac{x^2+3x+2}{x^2-x-2}$\
**(b)** $\dfrac{2x^2-x-1}{x^2-9}\cdot\dfrac{x+3}{2x+1}$\
**(c)** $\dfrac{x^2}{x^2-4}-\dfrac{x-1}{x+2}$\
**(d)** $\dfrac{\frac yx-\frac xy}{\frac1y-\frac1x}$

<span id="desarrollo-docente-4"></span>

---

<section class="consulta-incisos" data-consulta-incisos aria-labelledby="consulta-ej5-titulo">
<h3 id="consulta-ej5-titulo">Consultá una resolución</h3>

<details id="consulta-ej5-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

**Resultado:** $\dfrac{x+2}{x-2}$, con $x\ne-1,2$. Factorizamos y cancelamos el factor común sin recuperar valores excluidos.

<details>
<summary>Paso a paso</summary>

Factorizamos el numerador: $x^2+3x+2=(x+1)(x+2)$, pues $1+2=3$ y $1\cdot2=2$. El denominador es $x^2-x-2=(x+1)(x-2)$.

El denominador original debe ser distinto de cero, así que $x\ne-1$ y $x\ne2$. En ese dominio podemos dividir numerador y denominador por el factor no nulo $x+1$:

$\dfrac{(x+1)(x+2)}{(x+1)(x-2)}=\dfrac{x+2}{x-2}$.

La exclusión $x\ne-1$ sigue vigente aunque no aparezca en la fórmula final.

</details>
</details>

<details id="consulta-ej5-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Resultado:** $\dfrac{x-1}{x-3}$, con $x\ne-3,3,-\frac12$. Factorizamos y cancelamos conservando las restricciones originales.

<details>
<summary>Paso a paso</summary>

Los denominadores originales no pueden anularse. Como $x^2-9=(x-3)(x+3)$ y $2x+1=0$ cuando $x=-\frac12$, exigimos $x\ne3,-3,-\frac12$.

Factorizamos también $2x^2-x-1=2x^2-2x+x-1=2x(x-1)+(x-1)=(2x+1)(x-1)$. Entonces

$\dfrac{(2x+1)(x-1)}{(x-3)(x+3)}\cdot\dfrac{x+3}{2x+1}=\dfrac{(2x+1)(x-1)(x+3)}{(x-3)(x+3)(2x+1)}=\dfrac{x-1}{x-3}$.

Los factores cancelados son distintos de cero por las restricciones, que se mantienen en la respuesta.

</details>
</details>

<details id="consulta-ej5-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

**Resultado:** $\dfrac{3x-2}{x^2-4}$, con $x\ne-2,2$. Usamos un denominador común.

<details>
<summary>Paso a paso</summary>

Como $x^2-4=(x-2)(x+2)$, los denominadores originales excluyen $x=2$ y $x=-2$. Para obtener denominador común multiplicamos la segunda fracción por $(x-2)/(x-2)$, que vale $1$ en ese dominio:

$\dfrac{x^2}{(x-2)(x+2)}-\dfrac{(x-1)(x-2)}{(x+2)(x-2)}=\dfrac{x^2-(x-1)(x-2)}{x^2-4}$.

Distribuimos el signo menos: $x^2-(x^2-3x+2)=x^2-x^2+3x-2=3x-2$. El resultado es $\dfrac{3x-2}{x^2-4}$ con ambas exclusiones.

</details>
</details>

<details id="consulta-ej5-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

**Resultado:** $-(x+y)$, con $x\ne0$, $y\ne0$ y $x\ne y$. Simplificamos las fracciones internas antes de dividir.

<details>
<summary>Paso a paso</summary>

Las fracciones internas exigen $x\ne0$ e $y\ne0$. Con denominador común $xy$ obtenemos

$\dfrac yx-\dfrac xy=\dfrac{y^2-x^2}{xy}$ y $\dfrac1y-\dfrac1x=\dfrac{x-y}{xy}$.

El denominador de la fracción completa tampoco puede ser cero; como $xy\ne0$, esto exige $x\ne y$. Dividimos multiplicando por el recíproco y factorizamos la diferencia de cuadrados:

$\dfrac{(y^2-x^2)/(xy)}{(x-y)/(xy)}=\dfrac{y^2-x^2}{xy}\cdot\dfrac{xy}{x-y}=\dfrac{(y-x)(y+x)}{x-y}=-(x+y)$.

En el último paso usamos $y-x=-(x-y)$ y cancelamos el factor no nulo $x-y$. Las tres restricciones originales se conservan.

</details>
</details>
</section>

## Ejercicio 6

Racionalice la expresión y simplifique.

**(a)** $\dfrac{\sqrt{10}}{\sqrt5-2}$\
**(b)** $\dfrac{\sqrt{4+h}-2}{h}$

<span id="desarrollo-docente-5"></span>

---

<section class="consulta-incisos" data-consulta-incisos aria-labelledby="consulta-ej6-titulo">
<h3 id="consulta-ej6-titulo">Consultá una resolución</h3>

<details id="consulta-ej6-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

**Resultado:** $5\sqrt2+2\sqrt{10}$. Multiplicamos por el conjugado del denominador.

<details>
<summary>Paso a paso</summary>

El denominador original no es cero porque $\sqrt5\ne2$; además $\sqrt5+2>0$. Multiplicamos numerador y denominador por el conjugado, sin cambiar el valor:

$\dfrac{\sqrt{10}}{\sqrt5-2}\cdot\dfrac{\sqrt5+2}{\sqrt5+2}=\dfrac{\sqrt{50}+2\sqrt{10}}{(\sqrt5)^2-2^2}$.

El denominador es $5-4=1$ y $\sqrt{50}=\sqrt{25\cdot2}=5\sqrt2$. Por lo tanto queda $5\sqrt2+2\sqrt{10}$.

</details>
</details>

<details id="consulta-ej6-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Resultado:** $\dfrac1{\sqrt{4+h}+2}$, con $h\geq-4$ y $h\ne0$. Usamos el conjugado del numerador.

<details>
<summary>Paso a paso</summary>

La raíz exige $4+h\geq0$, es decir $h\geq-4$, y el denominador original excluye $h=0$. El conjugado $\sqrt{4+h}+2$ es positivo en ese dominio, de modo que podemos multiplicar por su cociente consigo mismo:

$\dfrac{\sqrt{4+h}-2}{h}\cdot\dfrac{\sqrt{4+h}+2}{\sqrt{4+h}+2}=\dfrac{(4+h)-4}{h(\sqrt{4+h}+2)}=\dfrac{h}{h(\sqrt{4+h}+2)}$.

Como $h\ne0$, cancelamos ese factor y queda $\dfrac1{\sqrt{4+h}+2}$.

La fórmula final existe en $h=0$, pero la original no; mantenemos la exclusión.

</details>
</details>
</section>

## Ejercicio 7

Complete el cuadrado de lo siguiente.

**(a)** $x^2+x+1$\
**(b)** $2x^2-12x+11$

<span id="desarrollo-docente-6"></span>

---

<section class="consulta-incisos" data-consulta-incisos aria-labelledby="consulta-ej7-titulo">
<h3 id="consulta-ej7-titulo">Consultá una resolución</h3>

<details id="consulta-ej7-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

**Resultado:** $(x+\frac12)^2+\frac34$. Completamos el cuadrado usando la mitad del coeficiente de $x$.

<details>
<summary>Paso a paso</summary>

Para formar $(x+k)^2=x^2+2kx+k^2$, necesitamos $2k=1$: entonces $k=\frac12$ y $k^2=\frac14$.

Sumamos y restamos $\frac14$ para no modificar la expresión:

$x^2+x+1=(x^2+x+\frac14)+1-\frac14=(x+\frac12)^2+\frac34$.

</details>
</details>

<details id="consulta-ej7-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Resultado:** $2(x-3)^2-7$. Sacamos el factor $2$ y completamos el cuadrado dentro del paréntesis.

<details>
<summary>Paso a paso</summary>

Sacamos $2$ de los dos términos con $x$: $2x^2-12x+11=2(x^2-6x)+11$.

La mitad de $-6$ es $-3$, cuyo cuadrado es $9$. Sumamos y restamos $9$ dentro del paréntesis:

$2(x^2-6x+9-9)+11=2((x-3)^2-9)+11=2(x-3)^2-18+11=2(x-3)^2-7$.

El $-9$ también se multiplica por $2$; así compensamos el término que agregamos.

</details>
</details>
</section>

## Ejercicio 8

Resuelva la ecuación. (Encuentre sólo las soluciones reales.)

**(a)** $x+5=14-\frac12x$\
**(b)** $\dfrac{2x}{x+1}=\dfrac{2x-1}{x}$\
**(c)** $x^2-x-2=0$\
**(d)** $2x^2+4x+1=0$\
**(e)** $x^4-3x^2+2=0$\
**(f)** $3|x-4|=10$\
**(g)** $2x(4-x)^{-1/2}-3\sqrt{4-x}=0$

<span id="desarrollo-docente-7"></span>

---

<section class="consulta-incisos" data-consulta-incisos aria-labelledby="consulta-ej8-titulo">
<h3 id="consulta-ej8-titulo">Consultá una resolución</h3>

<details id="consulta-ej8-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

**Solución:** $x=6$. Reunimos las incógnitas de un lado y las constantes del otro.

<details>
<summary>Paso a paso</summary>

Multiplicamos por $2$: $2x+10=28-x$. Sumamos $x$ y restamos $10$: $3x=18$, de donde $x=6$. En la ecuación inicial ambos lados valen $11$.

</details>
</details>

<details id="consulta-ej8-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Solución:** $x=1$. Con $x\ne0,-1$, multiplicamos por los denominadores.

<details>
<summary>Paso a paso</summary>

Los denominadores exigen $x\ne-1$ y $x\ne0$. Como $x(x+1)\ne0$, multiplicar ambos lados por ese producto es reversible:

$\dfrac{2x}{x+1}x(x+1)=\dfrac{2x-1}{x}x(x+1)$, de donde $2x^2=(2x-1)(x+1)=2x^2+x-1$.

Al restar $2x^2$ queda $0=x-1$, luego $x=1$. Es admisible y, al sustituirlo, ambos lados de la ecuación original valen $1$.

</details>
</details>

<details id="consulta-ej8-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

**Soluciones:** $x=-1, 2$. Factorizamos y usamos que un producto es cero si alguno de sus factores es cero.

<details>
<summary>Paso a paso</summary>

Los números $-2$ y $1$ suman $-1$ y su producto es $-2$, por lo que $x^2-x-2=(x-2)(x+1)$.

Un producto es cero exactamente cuando al menos uno de sus factores es cero. Entonces $x-2=0$ o $x+1=0$, es decir $x=2$ o $x=-1$. Ambas soluciones son reales.

</details>
</details>

<details id="consulta-ej8-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

**Soluciones:** $x=-1\pm\dfrac{\sqrt2}{2}$. Aplicamos la fórmula cuadrática.

<details>
<summary>Paso a paso</summary>

Para $ax^2+bx+c=0$, con $a\ne0$, usamos $x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}$. Aquí $a=2$, $b=4$ y $c=1$.

El discriminante es $4^2-4(2)(1)=16-8=8>0$, así que hay dos soluciones reales. Sustituimos y simplificamos $\sqrt8=2\sqrt2$:

$x=\dfrac{-4\pm\sqrt8}{2(2)}=\dfrac{-4\pm2\sqrt2}{4}=-1\pm\dfrac{\sqrt2}{2}$.

</details>
</details>

<details id="consulta-ej8-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

**Soluciones:** $x=\pm1,\pm\sqrt2$. Tratamos la ecuación como una cuadrática en $x^2$.

<details>
<summary>Paso a paso</summary>

Sea $t=x^2\geq0$. Entonces $x^4=(x^2)^2=t^2$ y la ecuación se convierte en

$t^2-3t+2=(t-1)(t-2)=0$.

Por el producto nulo, $t=1$ o $t=2$; ambos son no negativos y pueden ser cuadrados reales. Volvemos a $x$: si $x^2=1$, entonces $x=\pm1$; si $x^2=2$, entonces $x=\pm\sqrt2$. Los cuatro valores satisfacen la ecuación original porque sus cuadrados son $1$ o $2$.

</details>
</details>

<details id="consulta-ej8-f" data-inciso="f">
<summary><strong>(f)</strong> Explicación breve</summary>

**Soluciones:** $x=\frac23,\frac{22}3$. Consideramos los dos signos posibles de la expresión dentro del valor absoluto.

<details>
<summary>Paso a paso</summary>

Dividimos ambos lados por $3$: $|x-4|=\frac{10}3$. Un número tiene ese valor absoluto si es $\frac{10}3$ o su opuesto.

Si $x-4=\frac{10}3$, sumamos $4=\frac{12}3$ y obtenemos $x=\frac{22}3$. Si $x-4=-\frac{10}3$, obtenemos $x=\frac{12}3-\frac{10}3=\frac23$. En ambos casos la distancia de $x$ a $4$ es $\frac{10}3$, por lo que satisfacen la ecuación.

</details>
</details>

<details id="consulta-ej8-g" data-inciso="g">
<summary><strong>(g)</strong> Explicación breve</summary>

**Solución:** $x=\dfrac{12}5$. En el dominio $x<4$, multiplicamos por la raíz positiva para eliminar el denominador.

<details>
<summary>Paso a paso</summary>

La potencia negativa es $(4-x)^{-1/2}=1/\sqrt{4-x}$. La raíz debe existir y no puede ser cero en el denominador, así que $4-x>0$, o sea $x<4$.

En ese dominio multiplicar por $\sqrt{4-x}>0$ es reversible:

$\dfrac{2x}{\sqrt{4-x}}-3\sqrt{4-x}=0\quad\Longrightarrow\quad 2x-3(4-x)=0$.

Distribuimos y resolvemos: $2x-12+3x=0$, luego $5x=12$ y $x=\frac{12}5$. Como $\frac{12}5<4$, pertenece al dominio y, por la reversibilidad de los pasos, satisface la ecuación original.

</details>
</details>
</section>

## Ejercicio 9

Resuelva estas desigualdades, use notación de intervalo.

**(a)** $-4<5-3x\leq17$\
**(b)** $x^2<2x+8$\
**(c)** $x(x-1)(x+2)>0$\
**(d)** $|x-4|<3$\
**(e)** $\dfrac{2x-3}{x+1}\leq1$

<span id="desarrollo-docente-8"></span>

---

<section class="consulta-incisos" data-consulta-incisos aria-labelledby="consulta-ej9-titulo">
<h3 id="consulta-ej9-titulo">Consultá una resolución</h3>

<details id="consulta-ej9-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

**Solución:** $[-4,3)$. Al dividir por un número negativo se invierten las desigualdades.

<details>
<summary>Paso a paso</summary>

Restamos $5$ en los tres miembros: $-9<-3x\leq12$.

Al dividir los tres miembros por $-3$, invertimos ambos signos: $3>x\geq-4$, o bien $-4\leq x<3$. Se incluye $-4$ por la igualdad y se excluye $3$ por la desigualdad estricta. En intervalos es $[-4,3)$.

</details>
</details>

<details id="consulta-ej9-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Solución:** $(-2,4)$. El producto factorizado es negativo entre sus raíces.

<details>
<summary>Paso a paso</summary>

Restamos $2x+8$ a ambos lados y factorizamos: $x^2-2x-8=(x-4)(x+2)<0$. Los ceros $-2$ y $4$ separan la recta.

Si $x<-2$, ambos factores son negativos y el producto es positivo. Si $-2<x<4$, $x+2$ es positivo y $x-4$ negativo, así que el producto es negativo. Si $x>4$, ambos son positivos.

Solo sirve el intervalo $(-2,4)$. Los extremos no se incluyen porque allí el producto es cero y la desigualdad es estricta.

</details>
</details>

<details id="consulta-ej9-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

**Solución:** $(-2,0)\cup(1,\infty)$. Los ceros dividen la recta en intervalos donde estudiamos el signo del producto.

<details>
<summary>Paso a paso</summary>

Los ceros de los factores son $-2$, $0$ y $1$. En cada intervalo los factores mantienen su signo. En el orden $x$, $x-1$, $x+2$:

- Si $x<-2$, los signos son $(-,-,-)$ y el producto es negativo.
- Si $-2<x<0$, son $(-,-,+)$ y el producto es positivo.
- Si $0<x<1$, son $(+,-,+)$ y el producto es negativo.
- Si $x>1$, son $(+,+,+)$ y el producto es positivo.

Elegimos los intervalos positivos: $(-2,0)\cup(1,\infty)$. Excluimos los ceros porque se pide $>0$.

</details>
</details>

<details id="consulta-ej9-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

**Solución:** $(1,7)$. Un valor absoluto menor que $3$ equivale a una desigualdad doble.

<details>
<summary>Paso a paso</summary>

$|x-4|<3$ equivale a $-3<x-4<3$. Sumando $4$ en los tres miembros obtenemos $1<x<7$; ninguno de los extremos se incluye.

</details>
</details>

<details id="consulta-ej9-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

**Solución:** $(-1,4]$, con $x\ne-1$. Restamos $1$ y estudiamos los signos del cociente.

<details>
<summary>Paso a paso</summary>

El denominador original exige $x\ne-1$. Restamos $1$ a ambos lados y usamos denominador común:

$\dfrac{2x-3}{x+1}-1=\dfrac{2x-3-(x+1)}{x+1}=\dfrac{x-4}{x+1}\leq0$.

Los puntos $-1$ y $4$ separan los signos. Si $x<-1$, numerador y denominador son negativos, y el cociente es positivo. Si $-1<x<4$, el numerador es negativo y el denominador positivo, así que el cociente es negativo. Si $x>4$, ambos son positivos.

Se excluye $-1$ porque anula el denominador; se incluye $4$ porque anula el numerador y se permite la igualdad. La solución es $(-1,4]$.

</details>
</details>
</section>

## Ejercicio 10

Exprese si cada una de estas ecuaciones es verdadera o falsa.

**(a)** $(p+q)^2=p^2+q^2$\
**(b)** $\sqrt{ab}=\sqrt a\sqrt b$\
**(c)** $\sqrt{a^2+b^2}=a+b$\
**(d)** $\dfrac{1+TC}{C}=1+T$\
**(e)** $\dfrac1{x-y}=\dfrac1x-\dfrac1y$\
**(f)** $\dfrac{1/x}{a/x-b/x}=\dfrac1{a-b}$

<span id="desarrollo-docente-9"></span>

---

<section class="consulta-incisos" data-consulta-incisos aria-labelledby="consulta-ej10-titulo">
<h3 id="consulta-ej10-titulo">Consultá una resolución</h3>

<details id="consulta-ej10-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

**Falsa en general:** al desarrollar el cuadrado aparece un término adicional, $2pq$.

<details>
<summary>Paso a paso</summary>

Al multiplicar cada término por cada uno, $(p+q)^2=(p+q)(p+q)=p^2+pq+qp+q^2=p^2+2pq+q^2$.

Por ejemplo, con $p=q=1$ el lado izquierdo vale $(1+1)^2=4$ y el derecho $1^2+1^2=2$. No son iguales, así que la afirmación es falsa en general. Comparando ambas expresiones, sí se cumple exactamente cuando $2pq=0$, es decir cuando $p=0$ o $q=0$.

</details>
</details>

<details id="consulta-ej10-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Verdadera donde ambos lados están definidos:** $a\geq0$ y $b\geq0$. El producto de las raíces es la raíz no negativa del producto.

<details>
<summary>Paso a paso</summary>

El lado derecho requiere $a,b\geq0$; el izquierdo solo requiere $ab\geq0$. En el dominio común, $\sqrt a\sqrt b$ es no negativo y su cuadrado es $ab$, así que es $\sqrt{ab}$. Por ejemplo, con $a=b=-1$ el lado izquierdo existe, pero el derecho no está definido en los reales: no es un contraejemplo en el dominio común.

</details>
</details>

<details id="consulta-ej10-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

**Falsa en general:** la raíz de la suma de cuadrados no coincide siempre con la suma de los números.

<details>
<summary>Paso a paso</summary>

Ambos lados existen para cualquier par real, porque $a^2+b^2\geq0$. Basta un contraejemplo para descartar que la igualdad sea siempre cierta: si $a=b=1$, el izquierdo vale $\sqrt{1^2+1^2}=\sqrt2$ y el derecho $1+1=2$. Son distintos, pues sus cuadrados son $2$ y $4$.

</details>
</details>

<details id="consulta-ej10-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

**Falsa en general:** para $C\ne0$, dividir cada término da $1/C+T$, no necesariamente $1+T$.

<details>
<summary>Paso a paso</summary>

El denominador del lado izquierdo exige $C\ne0$. En ese dominio dividimos cada sumando por $C$:

$\dfrac{1+TC}{C}=\dfrac1C+\dfrac{TC}{C}=\dfrac1C+T$.

Por ejemplo, con $C=2$ y $T=0$, los lados son $\frac12$ y $1$: la igualdad es falsa en general. Para que se cumpla debe ser $1/C=1$, lo que equivale a $C=1$.

</details>
</details>

<details id="consulta-ej10-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

**Falsa:** en el dominio común $x\ne0$, $y\ne0$ y $x\ne y$, restar las fracciones no da el recíproco de la diferencia.

<details>
<summary>Paso a paso</summary>

El lado izquierdo exige $x\ne y$; el derecho exige $x\ne0$ e $y\ne0$. En el dominio común, usamos el denominador $xy$:

$\dfrac1x-\dfrac1y=\dfrac{y}{xy}-\dfrac{x}{xy}=\dfrac{y-x}{xy}$.

Esto no da en general $1/(x-y)$. Por ejemplo, con $x=2$ e $y=1$, valores permitidos, el lado izquierdo vale $1/(2-1)=1$ y el derecho $1/2-1=-1/2$. La igualdad no es una identidad.

</details>
</details>

<details id="consulta-ej10-f" data-inciso="f">
<summary><strong>(f)</strong> Explicación breve</summary>

**Verdadera** para $x\ne0$ y $a\ne b$: el denominador izquierdo se reduce a $(a-b)/x$.

<details>
<summary>Paso a paso</summary>

Las fracciones del lado izquierdo exigen $x\ne0$. Además, su denominador completo debe ser distinto de cero: $a/x-b/x=(a-b)/x\ne0$, lo que exige $a\ne b$.

En ese dominio dividimos por la fracción multiplicando por su recíproco:

$\dfrac{1/x}{a/x-b/x}=\dfrac{1/x}{(a-b)/x}=\dfrac1x\cdot\dfrac{x}{a-b}=\dfrac1{a-b}$.

El lado derecho aislado admite $x=0$, pero la expresión original no; conservamos esa restricción.

</details>
</details>
</section>
