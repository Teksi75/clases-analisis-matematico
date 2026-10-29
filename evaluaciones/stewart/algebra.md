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

### Desarrollo docente

**(a)** $\left(-3\right)^4$

<details>
<summary><strong>(a)</strong> Explicación breve</summary>

**Resultado:** $81$. La base negativa está entre paréntesis y el exponente es par, así que el resultado es positivo.

<details>
<summary>Paso a paso</summary>

$\left(-3\right)^4=(-3)\cdot(-3)\cdot(-3)\cdot(-3)$.

Hay cuatro factores negativos. Al multiplicarlos de a pares, $(-3)\cdot(-3)=9$; después, $9\cdot9=81$.

</details>
</details>

**(b)** $-3^4$

<details>
<summary><strong>(b)</strong> Explicación breve</summary>

**Resultado:** $-81$. El exponente afecta solo al $3$; el signo menos queda afuera y se aplica al final.

<details>
<summary>Paso a paso</summary>

Primero calculamos la potencia: $3^4=3\cdot3\cdot3\cdot3=81$.

Después aplicamos el signo menos: $-3^4=-(3^4)=-81$. A diferencia de (a), aquí el signo no está dentro de la base.

</details>
</details>

**(c)** $3^{-4}$

<details>
<summary><strong>(c)</strong> Explicación breve</summary>

**Resultado:** $\frac{1}{81}$. En este caso el exponente negativo indica el recíproco: $3^{-4}=\frac{1}{3^4}$.

<details>
<summary>Paso a paso</summary>

Calculamos $3^4=3\cdot3\cdot3\cdot3=81$.

Entonces $3^{-4}=\frac{1}{3^4}=\frac{1}{81}$. El signo menos del exponente no vuelve negativo este resultado.

</details>
</details>

**(d)** $\dfrac{5^{23}}{5^{21}}$

<details>
<summary><strong>(d)</strong> Explicación breve</summary>

**Resultado:** $25$. Al dividir potencias de la misma base distinta de cero, restamos los exponentes.

<details>
<summary>Paso a paso</summary>

Para $a\ne0$ y exponentes enteros, $\frac{a^m}{a^n}=a^{m-n}$. Aquí la base es $5$, que no es cero:

$\frac{5^{23}}{5^{21}}=5^{23-21}=5^2=5\cdot5=25$.

También podemos cancelar $21$ factores de $5$: quedan dos factores, $5\cdot5$.

</details>
</details>

**(e)** $\left(\dfrac{2}{3}\right)^{-2}$

<details>
<summary><strong>(e)</strong> Explicación breve</summary>

**Resultado:** $\frac{9}{4}$. El exponente negativo indica invertir esta fracción y después elevarla al cuadrado.

<details>
<summary>Paso a paso</summary>

Invertimos la fracción y cambiamos el exponente a positivo: $\left(\frac{2}{3}\right)^{-2}=\left(\frac{3}{2}\right)^2$.

Luego $\left(\frac{3}{2}\right)^2=\frac{3^2}{2^2}=\frac{9}{4}$.

</details>
</details>

**(f)** $16^{-3/4}$

<details>
<summary><strong>(f)</strong> Explicación breve</summary>

**Resultado:** $\frac{1}{8}$. En este caso el exponente combina raíz cuarta y cubo; el signo negativo indica el recíproco.

<details>
<summary>Paso a paso</summary>

$16^{-3/4}=\frac{1}{16^{3/4}}$.

Como $\sqrt[4]{16}=2$, entonces $16^{3/4}=\left(\sqrt[4]{16}\right)^3=2^3=8$.

Por lo tanto, $16^{-3/4}=\frac{1}{8}$.

</details>
</details>

## Ejercicio 2

Simplifique estas expresiones. Escriba su respuesta sin exponentes negativos.

**(a)** $\sqrt{200}-\sqrt{32}$\
**(b)** $(3a^3b^3)(4ab^2)^2$\
**(c)** $\left(\dfrac{3x^{3/2}y^3}{x^2y^{-1/2}}\right)^{-2}$

### Desarrollo docente

**(a)** Extraemos cuadrados perfectos: $\sqrt{200}-\sqrt{32}=10\sqrt2-4\sqrt2=6\sqrt2$.

**(b)** Primero $(4ab^2)^2=16a^2b^4$; al multiplicar queda $48a^5b^7$.

**(c)** Dentro del paréntesis, restamos exponentes: $3x^{-1/2}y^{7/2}$. Al elevar a $-2$ obtenemos $3^{-2}x^1y^{-7}=\dfrac{x}{9y^7}$. En los reales, la expresión original requiere $x>0$ e $y>0$.

## Ejercicio 3

Expanda y simplifique.

**(a)** $3(x+6)+4(2x-5)$\
**(b)** $(x+3)(4x-5)$\
**(c)** $(\sqrt a+\sqrt b)(\sqrt a-\sqrt b)$\
**(d)** $(2x+3)^2$\
**(e)** $(x+2)^3$

### Desarrollo docente

**(a)** Distribuimos y agrupamos: $3x+18+8x-20=11x-2$.

**(b)** Multiplicamos cada término: $4x^2-5x+12x-15=4x^2+7x-15$.

**(c)** Es una diferencia de cuadrados: $(\sqrt a)^2-(\sqrt b)^2=a-b$, para $a,b\geq0$.

**(d)** Usamos $(u+v)^2=u^2+2uv+v^2$: $4x^2+12x+9$.

**(e)** Multiplicamos $(x^2+4x+4)(x+2)$ y reunimos términos: $x^3+6x^2+12x+8$.

## Ejercicio 4

Factorice estas expresiones.

**(a)** $4x^2-25$\
**(b)** $2x^2+5x-12$\
**(c)** $x^3-3x^2-4x+12$\
**(d)** $x^4+27x$\
**(e)** $3x^{3/2}-9x^{1/2}+6x^{-1/2}$\
**(f)** $x^3y-4xy$

### Desarrollo docente

**(a)** Diferencia de cuadrados: $(2x)^2-5^2=(2x-5)(2x+5)$.

**(b)** Separamos el término central: $2x^2+8x-3x-12=2x(x+4)-3(x+4)=(2x-3)(x+4)$.

**(c)** Agrupamos: $x^2(x-3)-4(x-3)=(x-3)(x^2-4)=(x-3)(x-2)(x+2)$.

**(d)** Sacamos $x$ y factorizamos la suma de cubos: $x(x^3+3^3)=x(x+3)(x^2-3x+9)$.

**(e)** Sacamos $3x^{-1/2}$: $3x^{-1/2}(x^2-3x+2)=3x^{-1/2}(x-1)(x-2)$, con $x>0$.

**(f)** Sacamos $xy$ y aplicamos diferencia de cuadrados: $xy(x^2-4)=xy(x-2)(x+2)$.

## Ejercicio 5

Simplifique la expresión racional.

**(a)** $\dfrac{x^2+3x+2}{x^2-x-2}$\
**(b)** $\dfrac{2x^2-x-1}{x^2-9}\cdot\dfrac{x+3}{2x+1}$\
**(c)** $\dfrac{x^2}{x^2-4}-\dfrac{x-1}{x+2}$\
**(d)** $\dfrac{\frac yx-\frac xy}{\frac1y-\frac1x}$

### Desarrollo docente

**(a)** Factorizamos y cancelamos el factor común: $\dfrac{(x+1)(x+2)}{(x+1)(x-2)}=\dfrac{x+2}{x-2}$. La expresión inicial exige $x\ne-1,2$.

**(b)** Factorizamos: $\dfrac{(2x+1)(x-1)}{(x-3)(x+3)}\cdot\dfrac{x+3}{2x+1}=\dfrac{x-1}{x-3}$. Se mantienen las restricciones originales $x\ne-3,3,-1/2$.

**(c)** Usamos denominador común $(x-2)(x+2)$: $\dfrac{x^2-(x-1)(x-2)}{x^2-4}=\dfrac{3x-2}{x^2-4}$, con $x\ne-2,2$. La clave impresa da otra expresión: ver la errata señalada abajo.

**(d)** Multiplicamos numerador y denominador por $xy$: $\dfrac{y^2-x^2}{x-y}=\dfrac{(y-x)(y+x)}{x-y}=-(x+y)$. La expresión original requiere $x\ne0$, $y\ne0$ y $x\ne y$.

## Ejercicio 6

Racionalice la expresión y simplifique.

**(a)** $\dfrac{\sqrt{10}}{\sqrt5-2}$\
**(b)** $\dfrac{\sqrt{4+h}-2}{h}$

### Desarrollo docente

**(a)** Multiplicamos por el conjugado: $\dfrac{\sqrt{10}(\sqrt5+2)}{5-4}=\sqrt{50}+2\sqrt{10}=5\sqrt2+2\sqrt{10}$.

**(b)** Multiplicamos por $\sqrt{4+h}+2$: $\dfrac{(4+h)-4}{h(\sqrt{4+h}+2)}=\dfrac1{\sqrt{4+h}+2}$. La igualdad vale donde estaba definida la expresión inicial: $h\geq-4$ y $h\ne0$.

## Ejercicio 7

Complete el cuadrado de lo siguiente.

**(a)** $x^2+x+1$\
**(b)** $2x^2-12x+11$

### Desarrollo docente

**(a)** Sumamos y restamos el cuadrado de la mitad de 1: $x^2+x+\frac14+\frac34=(x+\frac12)^2+\frac34$.

**(b)** Sacamos 2 de los dos primeros términos y completamos: $2(x^2-6x+9)-18+11=2(x-3)^2-7$.

## Ejercicio 8

Resuelva la ecuación. (Encuentre sólo las soluciones reales.)

**(a)** $x+5=14-\frac12x$\
**(b)** $\dfrac{2x}{x+1}=\dfrac{2x-1}{x}$\
**(c)** $x^2-x-2=0$\
**(d)** $2x^2+4x+1=0$\
**(e)** $x^4-3x^2+2=0$\
**(f)** $3|x-4|=10$\
**(g)** $2x(4-x)^{-1/2}-3\sqrt{4-x}=0$

### Desarrollo docente

**(a)** Sumamos $\frac12x$ y restamos 5: $\frac32x=9$, por lo que $x=6$.

**(b)** Con $x\ne0,-1$, multiplicamos por $x(x+1)$: $2x^2=(2x-1)(x+1)=2x^2+x-1$. Así $x=1$, que es admisible.

**(c)** Factorizamos $(x-2)(x+1)=0$: las soluciones son $x=-1, 2$. La clave impresa contiene una errata, identificada al final.

**(d)** Dividimos por 2 y completamos el cuadrado: $(x+1)^2=\frac12$. Por tanto $x=-1\pm\frac{\sqrt2}{2}$.

**(e)** Con $u=x^2$, resolvemos $(u-1)(u-2)=0$. Entonces $x^2=1$ o $x^2=2$, y $x=\pm1,\pm\sqrt2$.

**(f)** Dividimos por 3: $|x-4|=10/3$. Los dos casos $x-4=\pm10/3$ dan $x=2/3$ y $x=22/3$.

**(g)** La potencia negativa exige $x<4$. Multiplicamos por $\sqrt{4-x}>0$: $2x-3(4-x)=0$, luego $5x=12$ y $x=12/5$. Este valor cumple $x<4$.

## Ejercicio 9

Resuelva estas desigualdades, use notación de intervalo.

**(a)** $-4<5-3x\leq17$\
**(b)** $x^2<2x+8$\
**(c)** $x(x-1)(x+2)>0$\
**(d)** $|x-4|<3$\
**(e)** $\dfrac{2x-3}{x+1}\leq1$

### Desarrollo docente

**(a)** Restamos 5: $-9<-3x\leq12$. Al dividir por $-3$ invertimos los signos: $3>x\geq-4$. Solución: $[-4,3)$.

**(b)** Pasamos todo a un lado y factorizamos: $(x-4)(x+2)<0$. El producto es negativo entre las raíces: $(-2,4)$.

**(c)** Los ceros $-2,0,1$ dividen la recta. El producto es positivo en $(-2,0)$ y $(1,\infty)$; como la desigualdad es estricta, se excluyen los ceros. Resultado: $(-2,0)\cup(1,\infty)$.

**(d)** $|x-4|<3$ equivale a $-3<x-4<3$. Sumamos 4 y obtenemos $(1,7)$.

**(e)** Con $x\ne-1$, restamos 1: $\dfrac{x-4}{x+1}\leq0$. El cociente es negativo entre $-1$ y 4; se excluye el denominador nulo y se incluye el cero del numerador: $(-1,4]$.

## Ejercicio 10

Exprese si cada una de estas ecuaciones es verdadera o falsa.

**(a)** $(p+q)^2=p^2+q^2$\
**(b)** $\sqrt{ab}=\sqrt a\sqrt b$\
**(c)** $\sqrt{a^2+b^2}=a+b$\
**(d)** $\dfrac{1+TC}{C}=1+T$\
**(e)** $\dfrac1{x-y}=\dfrac1x-\dfrac1y$\
**(f)** $\dfrac{1/x}{a/x-b/x}=\dfrac1{a-b}$

### Desarrollo docente

**(a)** Falsa: al desarrollar aparece $2pq$. Por ejemplo, $p=q=1$ da $4\ne2$.

**(b)** Verdadera para $a,b\geq0$: el producto de las raíces no negativas es la raíz no negativa de $ab$. En reales, la igualdad se considera donde ambos lados están definidos.

**(c)** Falsa: con $a=b=1$, el lado izquierdo es $\sqrt2$ y el derecho es 2.

**(d)** Falsa: para $C\ne0$, el lado izquierdo es $1/C+T$, no $1+T$ en general; por ejemplo, $C=2$, $T=0$.

**(e)** Falsa: con $x=2$, $y=1$, el lado izquierdo es 1 y el derecho $-1/2$.

**(f)** Verdadera donde está definida: para $x\ne0$ y $a\ne b$, el denominador izquierdo es $(a-b)/x$; por eso $(1/x)/((a-b)/x)=1/(a-b)$.

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
