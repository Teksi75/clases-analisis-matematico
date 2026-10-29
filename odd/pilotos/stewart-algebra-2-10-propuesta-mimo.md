# Álgebra de Stewart — Ejercicios 2 a 10

Trabajo en los reales. En cada inciso indico **resultado**, la **idea** y, aparte, el **paso a paso** opcional. Siempre conservo el dominio de la expresión original.

---

## Ejercicio 2 — Simplificar (sin exponentes negativos)

### (a) $\sqrt{200}-\sqrt{32}$
**Resultado:** $6\sqrt2$
**Idea:** Saco los cuadrados perfectos de cada raíz y resto radicales semejantes: $10\sqrt2-4\sqrt2$.

**Pasos:** $\sqrt{200}=\sqrt{100\cdot2}=10\sqrt2$; $\sqrt{32}=\sqrt{16\cdot2}=4\sqrt2$; $10\sqrt2-4\sqrt2=6\sqrt2$.

### (b) $(3a^3b^3)(4ab^2)^2$
**Resultado:** $48a^5b^7$
**Idea:** Primero elevo el segundo factor al cuadrado (coeficiente y exponentes), después multiplico sumando exponentes.

**Pasos:** $(4ab^2)^2=16a^2b^4$; luego $3\cdot16=48$, $a^3\cdot a^2=a^5$, $b^3\cdot b^4=b^7$.
**Dominio:** cualquier $a,b$ reales (solo hay exponentes naturales).

### (c) $\left(\dfrac{3x^{3/2}y^3}{x^2y^{-1/2}}\right)^{-2}$
**Resultado:** $\dfrac{x}{9y^7}$
**Dominio:** $x>0$ e $y>0$ (por $x^{3/2}$, $y^{-1/2}$ y la división). Ese dominio se conserva en el resultado.

**Idea:** Simplifico adentro con leyes de exponentes y recién ahí aplico el exponente $-2$, que invierte la fracción.

**Pasos:**
1. Adentro: $3x^{3/2-2}y^{3-(-1/2)}=3x^{-1/2}y^{7/2}$.
2. Aplico $-2$: $3^{-2}x^{(-1/2)(-2)}y^{(7/2)(-2)}=\dfrac19\,x\,y^{-7}=\dfrac{x}{9y^7}$.

---

## Ejercicio 3 — Expandir y simplificar

### (a) $3(x+6)+4(2x-5)$
**Resultado:** $11x-2$ · **Idea:** distribuyo y agrupo términos semejantes: $3x+18+8x-20$.

### (b) $(x+3)(4x-5)$
**Resultado:** $4x^2+7x-15$ · **Idea:** propiedad distributiva (FOIL): $4x^2-5x+12x-15$.

### (c) $(\sqrt a+\sqrt b)(\sqrt a-\sqrt b)$
**Resultado:** $a-b$ · **Dominio:** $a\ge0$, $b\ge0$ (las raíces cuadradas deben existir).
**Idea:** es una *suma por diferencia*: $(\sqrt a)^2-(\sqrt b)^2=a-b$. El resultado $a-b$ existe siempre, pero la igualdad solo vale donde la expresión original está definida.

### (d) $(2x+3)^2$
**Resultado:** $4x^2+12x+9$ · **Idea:** no es $4x^2+9$: el cuadrado de una suma tiene tres términos ($a^2+2ab+b^2$).

### (e) $(x+2)^3$
**Resultado:** $x^3+6x^2+12x+8$
**Idea:** binomio al cubo, $a^3+3a^2b+3ab^2+b^3$.
**Pasos:** $(x+2)^3=(x+2)(x^2+4x+4)=x^3+4x^2+4x+2x^2+8x+8$.

---

## Ejercicio 4 — Factorizar

### (a) $4x^2-25$
**Resultado:** $(2x-5)(2x+5)$ · **Idea:** diferencia de cuadrados, $(2x)^2-5^2$.

### (b) $2x^2+5x-12$
**Resultado:** $(2x-3)(x+4)$ · **Idea:** trinomio con coeficiente principal; busco dos números que multiplicados den $2\cdot(-12)=-24$ y sumen $5$: son $8$ y $-3$.
**Pasos:** $2x^2+8x-3x-12=2x(x+4)-3(x+4)$.

### (c) $x^3-3x^2-4x+12$
**Resultado:** $(x-3)(x-2)(x+2)$
**Idea:** factorizo por agrupamiento y luego una diferencia de cuadrados.
**Pasos:** $x^2(x-3)-4(x-3)=(x-3)(x^2-4)=(x-3)(x-2)(x+2)$.

### (d) $x^4+27x$
**Resultado:** $x(x+3)(x^2-3x+9)$
**Idea:** saco factor común $x$ y uso suma de cubos, $x^3+27=(x+3)(x^2-3x+9)$. La cuadrática no se factoriza más en los reales ($\Delta=-27<0$).

### (e) $3x^{3/2}-9x^{1/2}+6x^{-1/2}$
**Resultado:** $\dfrac{3(x-1)(x-2)}{\sqrt x}$
**Dominio:** $x>0$ (por $x^{-1/2}$); se conserva.
**Idea:** el factor común es el exponente más chico: $3x^{-1/2}$.
**Pasos:** $3x^{-1/2}(x^2-3x+2)=3x^{-1/2}(x-1)(x-2)$, y $x^{-1/2}=1/\sqrt x$.

### (f) $x^3y-4xy$
**Resultado:** $xy(x-2)(x+2)$ · **Idea:** factor común $xy$ y después diferencia de cuadrados: $xy(x^2-4)$.

---

## Ejercicio 5 — Simplificar expresiones racionales

> Regla: al simplificar **no** se pueden "borrar" valores que hacen nulo el denominador original. Las restricciones del dominio original se conservan.

### (a) $\dfrac{x^2+3x+2}{x^2-x-2}$
**Resultado:** $\dfrac{x+2}{x-2}$, con $x\neq-1$ y $x\neq2$
**Idea:** factorizo numerador y denominador y cancelo $(x+1)$, que no puede ser $0$.
**Pasos:** $\dfrac{(x+1)(x+2)}{(x-2)(x+1)}$.

### (b) $\dfrac{2x^2-x-1}{x^2-9}\cdot\dfrac{x+3}{2x+1}$
**Resultado:** $\dfrac{x-1}{x-3}$, con $x\neq3$, $x\neq-3$, $x\neq-\dfrac12$
**Idea:** factorizo todo antes de cancelar: $2x^2-x-1=(2x+1)(x-1)$ y $x^2-9=(x-3)(x+3)$.
**Pasos:** $\dfrac{(2x+1)(x-1)}{(x-3)(x+3)}\cdot\dfrac{x+3}{2x+1}=\dfrac{x-1}{x-3}$.

### (c) $\dfrac{x^2}{x^2-4}-\dfrac{x-1}{x+2}$
**Resultado:** $\dfrac{3x-2}{x^2-4}=\dfrac{3x-2}{(x-2)(x+2)}$, con $x\neq\pm2$
**Idea:** común denominador $(x-2)(x+2)$ y resto los numeradores.
**Pasos:** $\dfrac{x^2}{(x-2)(x+2)}-\dfrac{(x-1)(x-2)}{(x-2)(x+2)}=\dfrac{x^2-(x^2-3x+2)}{(x-2)(x+2)}=\dfrac{3x-2}{(x-2)(x+2)}$.

### (d) $\dfrac{\frac yx-\frac xy}{\frac1y-\frac1x}$
**Resultado:** $-(x+y)$, con $x\neq0$, $y\neq0$ y $x\neq y$
**Idea:** simplifico numerador y denominador por separado poniendo denominador común $xy$ (que es distinto de cero por las restricciones).
**Pasos:**
- Numerador: $\dfrac{y^2-x^2}{xy}=\dfrac{(y-x)(y+x)}{xy}$.
- Denominador: $\dfrac{x-y}{xy}$.
- Cociente: $\dfrac{(y-x)(y+x)}{xy}\cdot\dfrac{xy}{x-y}=\dfrac{-(x-y)(x+y)}{x-y}=-(x+y)$.

---

## Ejercicio 6 — Racionalizar y simplificar

### (a) $\dfrac{\sqrt{10}}{\sqrt5-2}$
**Resultado:** $\sqrt{10}\,(\sqrt5+2)=5\sqrt2+2\sqrt{10}$
**Idea:** multiplico por el conjugado del denominador; el denominador pasa a ser $(\sqrt5)^2-2^2=1$.
**Pasos:** $\dfrac{\sqrt{10}(\sqrt5+2)}{(\sqrt5-2)(\sqrt5+2)}=\dfrac{\sqrt{10}(\sqrt5+2)}{5-4}=\sqrt{50}+2\sqrt{10}=5\sqrt2+2\sqrt{10}$.
**Dominio:** el denominador original $\sqrt5-2\neq0$ (es $\approx0{,}236$), así que todo está bien definido.

### (b) $\dfrac{\sqrt{4+h}-2}{h}$
**Resultado:** $\dfrac{1}{\sqrt{4+h}+2}$
**Dominio:** $h\ge-4$ y $h\neq0$ (y esa restricción se conserva; recién en $h=0$ el resultado valdría $\frac14$, pero no corresponde al original).
**Idea:** conjugado del numerador: al multiplicar, el $h$ del numerador cancela el $h$ del denominador.
**Pasos:** $\dfrac{(\sqrt{4+h}-2)(\sqrt{4+h}+2)}{h(\sqrt{4+h}+2)}=\dfrac{(4+h)-4}{h(\sqrt{4+h}+2)}=\dfrac{h}{h(\sqrt{4+h}+2)}=\dfrac{1}{\sqrt{4+h}+2}$.

---

## Ejercicio 7 — Completar el cuadrado

### (a) $x^2+x+1$
**Resultado:** $\left(x+\dfrac12\right)^2+\dfrac34$
**Idea:** sumo y resto el cuadrado de la mitad del coeficiente de $x$: $(\frac12)^2=\frac14$.
**Pasos:** $x^2+x+\frac14+1-\frac14=\left(x+\frac12\right)^2+\frac34$.

### (b) $2x^2-12x+11$
**Resultado:** $2(x-3)^2-7$
**Idea:** primero saco el factor $2$ para que el coeficiente principal sea $1$, y ahí completo el cuadrado.
**Pasos:** $2(x^2-6x)+11=2(x^2-6x+9-9)+11=2(x-3)^2-18+11=2(x-3)^2-7$.

---

## Ejercicio 8 — Resolver ecuaciones (solo soluciones reales)

### (a) $x+5=14-\frac12x$
**Resultado:** $x=6$ · **Idea:** paso todo a un miembro: $\frac32x=9$.
**Comprobación:** $6+5=11$ y $14-3=11$. ✔

### (b) $\dfrac{2x}{x+1}=\dfrac{2x-1}{x}$
**Resultado:** $x=1$ · **Dominio:** $x\neq0$ y $x\neq-1$.
**Idea:** producto cruzado (válido porque ambos denominadores son distintos de cero).
**Pasos:** $2x^2=(2x-1)(x+1)=2x^2+x-1$ $\Rightarrow$ $0=x-1$ $\Rightarrow$ $x=1$.
**Comprobación:** $\frac{2}{2}=1$ y $\frac{1}{1}=1$; además $1$ pertenece al dominio. ✔

### (c) $x^2-x-2=0$
**Resultado:** $x=2$ y $x=-1$ · **Idea:** $(x-2)(x+1)=0$.

### (d) $2x^2+4x+1=0$
**Resultado:** $x=\dfrac{-2\pm\sqrt2}{2}$ (es decir $-1\pm\frac{\sqrt2}{2}$; $\approx-0{,}29$ y $-1{,}71$)
**Idea:** no factoriza con enteros, uso la fórmula cuadrática.
**Pasos:** $x=\dfrac{-4\pm\sqrt{16-8}}{4}=\dfrac{-4\pm2\sqrt2}{4}=\dfrac{-2\pm\sqrt2}{2}$.

### (e) $x^4-3x^2+2=0$
**Resultado:** $x=\pm1$ y $x=\pm\sqrt2$
**Idea:** es una cuadrática "disfrazada" en $u=x^2$: $u^2-3u+2=(u-1)(u-2)=0$, entonces $x^2=1$ o $x^2=2$.

### (f) $3|x-4|=10$
**Resultado:** $x=\dfrac{22}{3}$ y $x=\dfrac23$
**Idea:** $|x-4|=\frac{10}{3}$ significa $x-4=\pm\frac{10}{3}$.
**Comprobación:** $|\frac{22}{3}-4|=\frac{10}{3}$ y $|\frac23-4|=\frac{10}{3}$. ✔

### (g) $2x(4-x)^{-1/2}-3\sqrt{4-x}=0$
**Resultado:** $x=\dfrac{12}{5}=2{,}4$
**Dominio:** $4-x>0$, es decir $x<4$ (la potencia $-1/2$ exige que la base sea positiva).
**Idea:** escribo como $\dfrac{2x}{\sqrt{4-x}}=3\sqrt{4-x}$ y multiplico por $\sqrt{4-x}$, que es **positivo** en el dominio (por eso no se pierden ni se inventan soluciones).
**Pasos:** $2x=3(4-x)\Rightarrow 2x=12-3x\Rightarrow 5x=12\Rightarrow x=\frac{12}{5}$.
**Comprobación:** $\frac{2(12/5)}{\sqrt{8/5}}=\frac{6\sqrt{10}}{5}$ y $3\sqrt{8/5}=\frac{6\sqrt{10}}{5}$. ✔ Cumple $x<4$.

---

## Ejercicio 9 — Desigualdades (notación de intervalo)

### (a) $-4<5-3x\leq17$
**Resultado:** $[-4,\,3)$
**Pasos:** resto 5: $-9<-3x\leq12$. Divido por $-3$ (¡invierto las desigualdades!): $3>x\geq-4$, es decir $-4\leq x<3$.
El $-4$ va con corchete (está incluido por el "$\geq$") y el $3$ con paréntesis.

### (b) $x^2<2x+8$
**Resultado:** $(-2,\,4)$
**Pasos:** $x^2-2x-8<0\Rightarrow(x-4)(x+2)<0$. Un producto es negativo cuando los factores tienen signos distintos: $-2<x<4$.

### (c) $x(x-1)(x+2)>0$
**Resultado:** $(-2,\,0)\cup(1,\,\infty)$
**Idea:** el producto cambia de signo solo en los ceros $-2$, $0$ y $1$; pruebo un valor en cada intervalo.
**Tabla de signos:** $x<-2$: $-$ · $-2<x<0$: $+$ · $0<x<1$: $-$ · $x>1$: $+$.
Como la desigualdad es estricta ($>0$), no incluyo ningún extremo.

### (d) $|x-4|<3$
**Resultado:** $(1,\,7)$
**Pasos:** $-3<x-4<3$, sumo 4: $1<x<7$.

### (e) $\dfrac{2x-3}{x+1}\leq1$
**Resultado:** $(-1,\,4]$
**Dominio:** $x\neq-1$.
**Pasos:** $\dfrac{2x-3}{x+1}-1\leq0\Rightarrow\dfrac{2x-3-(x+1)}{x+1}\leq0\Rightarrow\dfrac{x-4}{x+1}\leq0$.
Signos: $x<-1$: $+$ · $-1<x<4$: $-$ · $x>4$: $+$. El $x=4$ **sí** se incluye (numerador $=0$ y la desigualdad es "$\leq$"); el $x=-1$ **no** (hace nulo el denominador).

---

## Ejercicio 10 — Verdadero o falso

### (a) $(p+q)^2=p^2+q^2$ — **FALSO**
Falta el término del medio: $(p+q)^2=p^2+2pq+q^2$. Contraejemplo: $p=q=1$ da $4\neq2$. Es cierto solo cuando $pq=0$.

### (b) $\sqrt{ab}=\sqrt a\sqrt b$ — **FALSO en general**
Ambos lados están definidos solo si $a\ge0$ y $b\ge0$ (derecha) y $ab\ge0$ (izquierda). Sobre esa región común ($a,b\ge0$) la igualdad **es** verdadera; pero si $a=b=-1$, la izquierda vale $\sqrt1=1$ y la derecha no existe en los reales. Entonces, como identidad sobre los reales, es falsa.

### (c) $\sqrt{a^2+b^2}=a+b$ — **FALSO**
La raíz cuadrada da siempre un número $\geq0$, y no es aditiva. Contraejemplo: $a=3$, $b=4$: $\sqrt{25}=5$ pero $3+4=7$.
(Sería cierto solo si $ab=0$ y $a+b\ge0$.)

### (d) $\dfrac{1+TC}{C}=1+T$ — **FALSO** (para $C\neq0$)
Al dividir: $\dfrac{1+TC}{C}=\dfrac1C+T$, y $\frac1C$ no es $1$. Contraejemplo: $C=2$, $T=1$: izquierda $\frac32$, derecha $2$. Solo valdría si $C=1$.

### (e) $\dfrac1{x-y}=\dfrac1x-\dfrac1y$ — **FALSO** (para $x\neq0$, $y\neq0$, $x\neq y$)
En realidad $\dfrac1x-\dfrac1y=\dfrac{y-x}{xy}=-\dfrac{x-y}{xy}$, que no es $\frac1{x-y}$. Contraejemplo: $x=2$, $y=1$: izquierda $1$, derecha $-\frac12$.

### (f) $\dfrac{1/x}{a/x-b/x}=\dfrac1{a-b}$ — **VERDADERO**
Con restricciones $x\neq0$ y $a\neq b$ (para que el denominador no sea nulo).
**Pasos:** el denominador es $\dfrac{a-b}{x}$, así que $\dfrac{1/x}{(a-b)/x}=\dfrac1x\cdot\dfrac{x}{a-b}=\dfrac1{a-b}$. Los $x$ cancelan, y por eso no queda ninguna restricción en el resultado salvo $x\neq0$ y $a\neq b$.

---

## Resumen de dominios y restricciones

| Expresión | Restricción |
|---|---|
| 2(c) | $x>0$, $y>0$ |
| 3(c) | $a\ge0$, $b\ge0$ |
| 4(e) | $x>0$ |
| 5(a) | $x\neq-1$, $x\neq2$ |
| 5(b) | $x\neq\pm3$, $x\neq-\frac12$ |
| 5(c) | $x\neq\pm2$ |
| 5(d) | $x\neq0$, $y\neq0$, $x\neq y$ |
| 6(b) | $h\ge-4$, $h\neq0$ |
| 8(b) | $x\neq0$, $x\neq-1$ |
| 8(g) | $x<4$ |
| 9(e) | $x\neq-1$ |
| 10(d) | $C\neq0$ |
| 10(e) | $x\neq0$, $y\neq0$, $x\neq y$ |
| 10(f) | $x\neq0$, $a\neq b$ |

Si querés, te lo guardo como archivo Markdown o LaTeX en el proyecto (por ejemplo `algebra-stewart/ejercicios-2-10.md`), o preparo una versión imprimible con menos detalle para repaso rápido.
