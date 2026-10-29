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

Consignas y respuestas del examen A de James Stewart, sexta edición, páginas impresas xx–xxi (páginas físicas 22–23 del PDF local). Los desarrollos son **elaboración docente**, no forman parte de la clave del libro. Intentá cada ejercicio antes de leer su desarrollo; al final está la [clave original](#respuestas-del-libro), con las erratas identificadas.

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

Como $200=100\cdot2$ y $32=16\cdot2$, las raíces son $10\sqrt2$ y $4\sqrt2$. Al restarlas queda $6\sqrt2$.

</details>
</details>

<details id="consulta-ej2-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Resultado:** $48a^5b^7$. Elevamos el segundo factor y multiplicamos las potencias de igual base.

<details>
<summary>Paso a paso</summary>

$(4ab^2)^2=16a^2b^4$. Luego $3\cdot16=48$, $a^3a^2=a^5$ y $b^3b^4=b^7$.

</details>
</details>

<details id="consulta-ej2-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

**Resultado:** $\dfrac{x}{9y^7}$, con $x>0$ e $y>0$. Simplificamos las potencias y después aplicamos el exponente negativo.

<details>
<summary>Paso a paso</summary>

La raíz en $x^{3/2}$ permite $x\geq0$, pero el denominador $x^2$ excluye $x=0$. Además, $y^{-1/2}=1/\sqrt y$ exige $y>0$. Con estas condiciones la base elevada a $-2$ es positiva.

Dentro del paréntesis queda $3x^{-1/2}y^{7/2}$. Al elevar cada factor a $-2$, obtenemos $3^{-2}x^1y^{-7}=\dfrac{x}{9y^7}$. La fórmula final aislada admite otros valores, pero la expresión original no.

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

$3(x+6)=3x+18$ y $4(2x-5)=8x-20$. Entonces $(3x+8x)+(18-20)=11x-2$.

</details>
</details>

<details id="consulta-ej3-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Resultado:** $4x^2+7x-15$. Multiplicamos cada término del primer paréntesis por cada término del segundo.

<details>
<summary>Paso a paso</summary>

La distributiva da $4x^2-5x+12x-15$. Los términos con $x$ suman $7x$.

</details>
</details>

<details id="consulta-ej3-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

**Resultado:** $a-b$, para $a\geq0$ y $b\geq0$. Es una suma por una diferencia.

<details>
<summary>Paso a paso</summary>

Usamos $(u+v)(u-v)=u^2-v^2$, con $u=\sqrt a$ y $v=\sqrt b$. Así obtenemos $(\sqrt a)^2-(\sqrt b)^2=a-b$. Aunque $a-b$ existe para todos los reales, la expresión original exige que existan ambas raíces.

</details>
</details>

<details id="consulta-ej3-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

**Resultado:** $4x^2+12x+9$. El cuadrado de una suma también tiene un término del medio.

<details>
<summary>Paso a paso</summary>

En $(u+v)^2=u^2+2uv+v^2$, tomamos $u=2x$ y $v=3$. Los tres términos son $4x^2$, $2(2x)(3)=12x$ y $9$.

</details>
</details>

<details id="consulta-ej3-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

**Resultado:** $x^3+6x^2+12x+8$. Multiplicamos el cuadrado de la suma por otro factor $(x+2)$.

<details>
<summary>Paso a paso</summary>

Primero $(x+2)^2=x^2+4x+4$. Al multiplicar por $(x+2)$ queda $x^3+4x^2+4x+2x^2+8x+8$; agrupamos los términos semejantes.

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

Escribimos $4x^2=(2x)^2$ y $25=5^2$. Luego usamos $u^2-v^2=(u-v)(u+v)$ con $u=2x$ y $v=5$.

</details>
</details>

<details id="consulta-ej4-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Resultado:** $(2x-3)(x+4)$. Separamos el término central y factorizamos por grupos.

<details>
<summary>Paso a paso</summary>

Buscamos dos números que sumen $5$ y cuyo producto sea $2\cdot(-12)=-24$: son $8$ y $-3$. Así, $2x^2+8x-3x-12=2x(x+4)-3(x+4)=(2x-3)(x+4)$.

</details>
</details>

<details id="consulta-ej4-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

**Resultado:** $(x-3)(x-2)(x+2)$. Agrupamos y después usamos diferencia de cuadrados.

<details>
<summary>Paso a paso</summary>

Los dos grupos tienen el factor $(x-3)$: $x^2(x-3)-4(x-3)=(x-3)(x^2-4)$. Como $x^2-4=(x-2)(x+2)$, obtenemos la factorización completa.

</details>
</details>

<details id="consulta-ej4-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

**Resultado:** $x(x+3)(x^2-3x+9)$. Sacamos factor común y factorizamos una suma de cubos.

<details>
<summary>Paso a paso</summary>

$x^4+27x=x(x^3+3^3)$. Usamos $u^3+v^3=(u+v)(u^2-uv+v^2)$. El último factor no tiene raíces reales, pues su discriminante es $(-3)^2-4(1)(9)=-27$.

</details>
</details>

<details id="consulta-ej4-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

**Resultado:** $\dfrac{3(x-1)(x-2)}{\sqrt x}$, con $x>0$. Extraemos la menor potencia de $x$ como factor común.

<details>
<summary>Paso a paso</summary>

La potencia $x^{-1/2}=1/\sqrt x$ exige $x>0$. Al extraer $3x^{-1/2}$ queda $3x^{-1/2}(x^2-3x+2)$. El trinomio es $(x-1)(x-2)$; reemplazamos $x^{-1/2}$ por $1/\sqrt x$.

</details>
</details>

<details id="consulta-ej4-f" data-inciso="f">
<summary><strong>(f)</strong> Explicación breve</summary>

**Resultado:** $xy(x-2)(x+2)$. Extraemos el factor común y usamos diferencia de cuadrados.

<details>
<summary>Paso a paso</summary>

$x^3y-4xy=xy(x^2-4)$ y $x^2-4=(x-2)(x+2)$. No dividimos por $x$ ni por $y$, así que también se permiten valores nulos.

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

El denominador original es $(x+1)(x-2)$ y debe ser distinto de cero. Entonces $\dfrac{(x+1)(x+2)}{(x+1)(x-2)}=\dfrac{x+2}{x-2}$: se cancela $x+1$ porque $x\ne-1$. Esa exclusión sigue vigente aunque no aparezca en la fórmula final.

</details>
</details>

<details id="consulta-ej5-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Resultado:** $\dfrac{x-1}{x-3}$, con $x\ne-3,3,-\frac12$. Factorizamos y cancelamos conservando las restricciones originales.

<details>
<summary>Paso a paso</summary>

Los denominadores $(x-3)(x+3)$ y $2x+1$ dan las tres exclusiones. Factorizando y cancelando los factores que no son cero: $\dfrac{(2x+1)(x-1)}{(x-3)(x+3)}\cdot\dfrac{x+3}{2x+1}=\dfrac{x-1}{x-3}$.

</details>
</details>

<details id="consulta-ej5-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

**Resultado:** $\dfrac{3x-2}{x^2-4}$, con $x\ne-2,2$. Usamos un denominador común; la clave impresa tiene una errata señalada al final.

<details>
<summary>Paso a paso</summary>

Como $x^2-4=(x-2)(x+2)$, ambos valores $2$ y $-2$ están excluidos. El numerador común es $x^2-(x-1)(x-2)=x^2-(x^2-3x+2)=3x-2$.

</details>
</details>

<details id="consulta-ej5-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

**Resultado:** $-(x+y)$, con $x\ne0$, $y\ne0$ y $x\ne y$. Simplificamos las fracciones internas antes de dividir.

<details>
<summary>Paso a paso</summary>

Con denominador común $xy$, el numerador es $(y^2-x^2)/(xy)$ y el denominador es $(x-y)/(xy)$. Este último no puede ser cero, por eso $x\ne y$.

Al dividir queda $\dfrac{(y-x)(y+x)}{x-y}=-(x+y)$, porque $y-x=-(x-y)$. Las tres restricciones originales se conservan.

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

El denominador original no es cero porque $\sqrt5\ne2$. Al multiplicar arriba y abajo por $\sqrt5+2$, el denominador queda $5-4=1$. El numerador es $\sqrt{50}+2\sqrt{10}=5\sqrt2+2\sqrt{10}$.

</details>
</details>

<details id="consulta-ej6-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Resultado:** $\dfrac1{\sqrt{4+h}+2}$, con $h\geq-4$ y $h\ne0$. Usamos el conjugado del numerador.

<details>
<summary>Paso a paso</summary>

La raíz exige $h\geq-4$ y el denominador original excluye $h=0$. El conjugado $\sqrt{4+h}+2$ es positivo en ese dominio. Por tanto,

$\dfrac{(\sqrt{4+h}-2)(\sqrt{4+h}+2)}{h(\sqrt{4+h}+2)}=\dfrac{h}{h(\sqrt{4+h}+2)}=\dfrac1{\sqrt{4+h}+2}$.

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

La mitad de $1$ es $\frac12$ y su cuadrado es $\frac14$. Sumamos y restamos esa cantidad: $x^2+x+\frac14+1-\frac14=(x+\frac12)^2+\frac34$.

</details>
</details>

<details id="consulta-ej7-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Resultado:** $2(x-3)^2-7$. Sacamos el factor $2$ y completamos el cuadrado dentro del paréntesis.

<details>
<summary>Paso a paso</summary>

La mitad de $-6$ es $-3$, cuyo cuadrado es $9$. Entonces $2(x^2-6x+9-9)+11=2(x-3)^2-18+11=2(x-3)^2-7$.

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

Como $x(x+1)\ne0$, podemos multiplicar ambos lados por ese producto: $2x^2=(2x-1)(x+1)=2x^2+x-1$. Al restar $2x^2$ queda $x=1$, que cumple las restricciones.

</details>
</details>

<details id="consulta-ej8-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

**Soluciones:** $x=-1, 2$. Factorizamos y usamos que un producto es cero si alguno de sus factores es cero.

<details>
<summary>Paso a paso</summary>

$x^2-x-2=(x-2)(x+1)$. Por lo tanto $x-2=0$ o $x+1=0$. La clave impresa da otras raíces; la errata está señalada al final.

</details>
</details>

<details id="consulta-ej8-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

**Soluciones:** $x=-1\pm\dfrac{\sqrt2}{2}$. Aplicamos la fórmula cuadrática.

<details>
<summary>Paso a paso</summary>

Con coeficientes $a=2$, $b=4$ y $c=1$, el discriminante es $4^2-4(2)(1)=8>0$. Entonces $x=\dfrac{-4\pm\sqrt8}{4}=-1\pm\dfrac{\sqrt2}{2}$.

</details>
</details>

<details id="consulta-ej8-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

**Soluciones:** $x=\pm1,\pm\sqrt2$. Tratamos la ecuación como una cuadrática en $x^2$.

<details>
<summary>Paso a paso</summary>

Sea $t=x^2\geq0$. Entonces $t^2-3t+2=(t-1)(t-2)=0$, de modo que $t=1$ o $t=2$; ambos valores son admisibles. Resolver $x^2=1$ y $x^2=2$ da los cuatro valores indicados. La notación impresa en la clave tiene una errata señalada al final.

</details>
</details>

<details id="consulta-ej8-f" data-inciso="f">
<summary><strong>(f)</strong> Explicación breve</summary>

**Soluciones:** $x=\frac23,\frac{22}3$. Consideramos los dos signos posibles de la expresión dentro del valor absoluto.

<details>
<summary>Paso a paso</summary>

Al dividir por $3$, queda $|x-4|=\frac{10}3$. Entonces $x-4=\frac{10}3$ da $x=\frac{22}3$, y $x-4=-\frac{10}3$ da $x=\frac23$.

</details>
</details>

<details id="consulta-ej8-g" data-inciso="g">
<summary><strong>(g)</strong> Explicación breve</summary>

**Solución:** $x=\dfrac{12}5$. En el dominio $x<4$, multiplicamos por la raíz positiva para eliminar el denominador.

<details>
<summary>Paso a paso</summary>

La potencia negativa es $1/\sqrt{4-x}$, que exige $4-x>0$. Multiplicar por $\sqrt{4-x}>0$ es reversible y da $2x-3(4-x)=0$. Así $5x=12$ y $x=\frac{12}5$, que cumple $x<4$.

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

Restamos $5$: $-9<-3x\leq12$. Al dividir por $-3$, queda $3>x\geq-4$. Se incluye $-4$ y se excluye $3$.

</details>
</details>

<details id="consulta-ej9-b" data-inciso="b">
<summary><strong>(b)</strong> Explicación breve</summary>

**Solución:** $(-2,4)$. El producto factorizado es negativo entre sus raíces.

<details>
<summary>Paso a paso</summary>

Pasamos todo al mismo lado: $x^2-2x-8=(x-4)(x+2)<0$. Entre $-2$ y $4$ los factores tienen signos distintos; fuera de ese intervalo tienen el mismo signo. Los extremos no se incluyen porque la desigualdad es estricta.

</details>
</details>

<details id="consulta-ej9-c" data-inciso="c">
<summary><strong>(c)</strong> Explicación breve</summary>

**Solución:** $(-2,0)\cup(1,\infty)$. Los ceros dividen la recta en intervalos donde estudiamos el signo del producto.

<details>
<summary>Paso a paso</summary>

Los ceros son $-2$, $0$ y $1$. De izquierda a derecha, los signos del producto en los cuatro intervalos son $-$, $+$, $-$ y $+$. Elegimos los intervalos positivos y excluimos los ceros porque se pide $>0$.

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

$\dfrac{2x-3}{x+1}-1=\dfrac{x-4}{x+1}$. En los intervalos separados por $-1$ y $4$, los signos son $+$, $-$ y $+$, respectivamente. Se excluye $-1$ porque anula el denominador; se incluye $4$ porque anula el numerador y se permite la igualdad.

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

$(p+q)^2=p^2+2pq+q^2$. Por ejemplo, con $p=q=1$ los lados valen $4$ y $2$. La igualdad se cumple solo cuando $pq=0$.

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

Ambos lados existen para cualquier par real. Si $a=b=1$, el izquierdo vale $\sqrt2$ y el derecho $2$; son distintos.

</details>
</details>

<details id="consulta-ej10-d" data-inciso="d">
<summary><strong>(d)</strong> Explicación breve</summary>

**Falsa en general:** para $C\ne0$, dividir cada término da $1/C+T$, no necesariamente $1+T$.

<details>
<summary>Paso a paso</summary>

El denominador del lado izquierdo exige $C\ne0$. Allí $\dfrac{1+TC}{C}=\dfrac1C+T$. Por ejemplo, con $C=2$ y $T=0$, los lados son $\frac12$ y $1$. La igualdad sí se cumple cuando $C=1$.

</details>
</details>

<details id="consulta-ej10-e" data-inciso="e">
<summary><strong>(e)</strong> Explicación breve</summary>

**Falsa:** en el dominio común $x\ne0$, $y\ne0$ y $x\ne y$, restar las fracciones no da el recíproco de la diferencia.

<details>
<summary>Paso a paso</summary>

El lado izquierdo exige $x\ne y$; el derecho exige $x,y\ne0$. Al restar, $\dfrac1x-\dfrac1y=\dfrac{y-x}{xy}$. Con $x=2$ e $y=1$, valores permitidos, el lado izquierdo vale $1$ y el derecho $-\frac12$.

</details>
</details>

<details id="consulta-ej10-f" data-inciso="f">
<summary><strong>(f)</strong> Explicación breve</summary>

**Verdadera** para $x\ne0$ y $a\ne b$: el denominador izquierdo se reduce a $(a-b)/x$.

<details>
<summary>Paso a paso</summary>

En ese dominio, $a/x-b/x=(a-b)/x$ no es cero. Entonces $\dfrac{1/x}{(a-b)/x}=\dfrac1x\cdot\dfrac{x}{a-b}=\dfrac1{a-b}$. El lado derecho aislado admite $x=0$, pero la expresión original no; conservamos esa restricción.

</details>
</details>
</section>

## Respuestas del libro

Esta sección reproduce la clave impresa, incluso sus respuestas inconsistentes con las consignas. Las explicaciones y la identificación de erratas son de elaboración docente.

### Respuestas 1

**(a)** $81$\
**(b)** $-81$\
**(c)** $\frac1{81}$\
**(d)** $25$\
**(e)** $\frac94$\
**(f)** $\frac18$

### Respuestas 2

**(a)** $6\sqrt2$\
**(b)** $48a^5b^7$\
**(c)** $\dfrac{x}{9y^7}$

### Respuestas 3

**(a)** $11x-2$\
**(b)** $4x^2+7x-15$\
**(c)** $a-b$\
**(d)** $4x^2+12x+9$\
**(e)** $x^3+6x^2+12x+8$

### Respuestas 4

**(a)** $(2x-5)(2x+5)$\
**(b)** $(2x-3)(x+4)$\
**(c)** $(x-3)(x-2)(x+2)$\
**(d)** $x(x+3)(x^2-3x+9)$\
**(e)** $3x^{-1/2}(x-1)(x-2)$\
**(f)** $xy(x-2)(x+2)$

### Respuestas 5

**(a)** $\dfrac{x+2}{x-2}$\
**(b)** $\dfrac{x-1}{x-3}$\
**(c)** $\dfrac1{x-2}$\
**(d)** $-(x+y)$

**Errata de la clave, 5(c):** la respuesta impresa anterior no coincide con la consigna impresa; el desarrollo obtiene $\dfrac{3x-2}{x^2-4}$. Por ejemplo, para $x=0$, la consigna vale $1/2$, mientras que la clave da $-1/2$.

### Respuestas 6

**(a)** $5\sqrt2+2\sqrt{10}$\
**(b)** $\dfrac1{\sqrt{4+h}+2}$

### Respuestas 7

**(a)** $(x+\frac12)^2+\frac34$\
**(b)** $2(x-3)^2-7$

### Respuestas 8

**(a)** $6$\
**(b)** $1$\
**(c)** $-3, 4$\
**(d)** $-1\pm\frac12\sqrt2$\
**(e)** $\pm1\pm\sqrt2$\
**(f)** $\frac23,\frac{22}3$\
**(g)** $\frac{12}5$

**Errata de la clave, 8(c):** el libro imprime $-3, 4$, pero la ecuación de la consigna tiene soluciones $-1, 2$; ninguna de las dos cifras impresas anula ese polinomio.

**Errata de notación de la clave, 8(e):** el libro imprime $\pm1\pm\sqrt2$, sin coma entre ambos términos. Esa escritura indica sumas y restas, no las cuatro raíces $\pm1,\pm\sqrt2$ que se obtienen al resolver la ecuación. Una coma separaría los dos pares de soluciones.

### Respuestas 9

**(a)** $[-4,3)$\
**(b)** $(-2,4)$\
**(c)** $(-2,0)\cup(1,\infty)$\
**(d)** $(1,7)$\
**(e)** $(-1,4]$

### Respuestas 10

**(a)** Falsa\
**(b)** Verdadera\
**(c)** Falsa\
**(d)** Falsa\
**(e)** Falsa\
**(f)** Verdadera
