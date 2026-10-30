# Trigonometría de Stewart — ejercicios 1–9

---

## Ejercicio 1 — De grados a radianes

**Explicación breve**
Se multiplica por $\dfrac{\pi}{180}$ (porque $180^\circ=\pi$ rad). No hay restricciones: la conversión vale para todo ángulo, positivo o negativo.

(a) $300^\circ\cdot\dfrac{\pi}{180}=\dfrac{300\pi}{180}=\boxed{\dfrac{5\pi}{3}}$ rad

(b) $-18^\circ\cdot\dfrac{\pi}{180}=-\dfrac{18\pi}{180}=\boxed{-\dfrac{\pi}{10}}$ rad

**Paso a paso**
1. Factor de conversión grados→radianes: $\theta_{\text{rad}}=\theta_{\text{grados}}\cdot\dfrac{\pi}{180}$.
2. (a) $300\cdot\dfrac{\pi}{180}=\dfrac{300}{180}\pi=\dfrac{5}{3}\pi$ (simplificando numerador y denominador por 60).
3. (b) El signo se conserva: $-18\cdot\dfrac{\pi}{180}=-\dfrac{18}{180}\pi=-\dfrac{1}{10}\pi$ (simplificando por 18).

---

## Ejercicio 2 — De radianes a grados

**Explicación breve**
Se multiplica por $\dfrac{180}{\pi}$. Vale para todo número real (todo número real es medida de algún ángulo).

(a) $\dfrac{5\pi}{6}\cdot\dfrac{180}{\pi}=\dfrac{5\cdot180}{6}= \boxed{150^\circ}$

(b) $2\cdot\dfrac{180}{\pi}=\boxed{\dfrac{360}{\pi}}\approx 114{,}6^\circ$

**Paso a paso**
1. Factor de conversión radianes→grados: $\theta_{\text{grados}}=\theta_{\text{rad}}\cdot\dfrac{180}{\pi}$.
2. (a) El $\pi$ se simplifica: $\dfrac{5\cdot 180}{6}=5\cdot 30=150$.
3. (b) Aquí **no** hay $\pi$ que simplificar, así que el valor exacto es $\dfrac{360}{\pi}$ grados; el decimal ($\approx114{,}6^\circ$) es solo una aproximación. Notar que $2$ rad es un número real cualquiera, no un ángulo "notable".

---

## Ejercicio 3 — Longitud de arco

**Explicación breve**
La longitud de arco es $s=r\theta$ con $\theta$ **en radianes**. Con $r=12$ cm y $\theta=30^\circ=\dfrac{\pi}{6}$:

$$s=12\cdot\frac{\pi}{6}=\boxed{2\pi\ \text{cm}}\approx 6{,}28\ \text{cm}$$

**Paso a paso**
1. Condición de la fórmula: $s=r\theta$ exige $\theta$ medido en radianes y $r>0$. Si $\theta$ está en grados, primero hay que convertir.
2. $\theta=30^\circ=30\cdot\dfrac{\pi}{180}=\dfrac{\pi}{6}$ rad.
3. $s=12\cdot\dfrac{\pi}{6}=\dfrac{12\pi}{6}=2\pi$ cm.
4. (Verificación de orden de magnitud: el arco es $\frac{30}{360}=\frac1{12}$ de la circunferencia $2\pi r=24\pi$; $\frac{24\pi}{12}=2\pi$ ✓.)

---

## Ejercicio 4 — Valores exactos

**Explicación breve**
Se ubican los ángulos en el círculo unitario y se usan los valores de los ángulos notables ($\frac{\pi}{6},\frac{\pi}{3},\frac{\pi}{2}$) y el signo según el cuadrante. Todos los ángulos son reales; las funciones seno y coseno están definidas en todo $\mathbb{R}$, y $\sec$ está definida salvo donde $\cos=0$ (no ocurre aquí).

(a) $\tan\!\left(\dfrac{\pi}{3}\right)=\dfrac{\operatorname{sen}(\pi/3)}{\cos(\pi/3)}=\dfrac{\sqrt3/2}{1/2}=\boxed{\sqrt3}$

(b) $\operatorname{sen}\!\left(\dfrac{7\pi}{6}\right)=\operatorname{sen}\!\left(\pi+\frac{\pi}{6}\right)=-\operatorname{sen}\frac{\pi}{6}=\boxed{-\dfrac12}$

(c) $\sec\!\left(\dfrac{5\pi}{3}\right)=\dfrac{1}{\cos(5\pi/3)}=\dfrac{1}{1/2}=\boxed{2}$

**Paso a paso**
1. (a) $\frac{\pi}{3}=60^\circ$ está en el cuadrante I: $\operatorname{sen}\frac{\pi}{3}=\frac{\sqrt3}{2}$, $\cos\frac{\pi}{3}=\frac12$, ambos positivos. La tangente está definida porque $\cos\frac{\pi}{3}=\frac12\neq0$.
2. (b) $\frac{7\pi}{6}=\pi+\frac{\pi}{6}$ está en el cuadrante III, donde el seno es **negativo** y su valor de referencia es $\frac{\pi}{6}$: $\operatorname{sen}\frac{\pi}{6}=\frac12$. Entonces $\operatorname{sen}\frac{7\pi}{6}=-\frac12$.
3. (c) $\frac{5\pi}{3}=2\pi-\frac{\pi}{3}$ está en el cuadrante IV, donde el coseno es **positivo** y su valor de referencia es $\frac{\pi}{3}$: $\cos\frac{\pi}{3}=\frac12$. Entonces $\cos\frac{5\pi}{3}=\frac12$ y $\sec\frac{5\pi}{3}=\frac{1}{1/2}=2$. (La secante está bien definida porque $\cos\frac{5\pi}{3}\neq0$.)

---

## Ejercicio 5 — $a$ y $b$ en términos de $\theta$

**Explicación breve**
En el triángulo rectángulo, la hipotenusa mide $24$, $a$ es el cateto **opuesto** a $\theta$ y $b$ el **adyacente**. Por la definición de seno y coseno (rectángulo, ángulo agudo):

$$\boxed{a=24\,\operatorname{sen}\theta,\qquad b=24\,\cos\theta}$$

Válido para $0<\theta<\dfrac{\pi}{2}$ (el ángulo interno de un triángulo rectángulo es estrictamente agudo; si $\theta=0$ o $\theta=\frac{\pi}{2}$ el triángulo degenera).

**Paso a paso**
1. Definiciones en un triángulo rectángulo: $\operatorname{sen}\theta=\dfrac{\text{opuesto}}{\text{hipotenusa}}$ y $\cos\theta=\dfrac{\text{adyacente}}{\text{hipotenusa}}$.
2. Aplicando con hipotenusa $=24$: $\operatorname{sen}\theta=\dfrac{a}{24}\Rightarrow a=24\operatorname{sen}\theta$.
3. Del mismo modo: $\cos\theta=\dfrac{b}{24}\Rightarrow b=24\cos\theta$.
4. Consistencia: $a^2+b^2=24^2(\operatorname{sen}^2\theta+\cos^2\theta)=24^2=576$ ✓ (teorema de Pitágoras).

---

## Ejercicio 6 — $\operatorname{sen}(x+y)$ con $\operatorname{sen}x=\frac13$, $\sec y=\frac54$

**Explicación breve**
Como $x,y\in\left(0,\frac{\pi}{2}\right)$ (primer cuadrante), seno y coseno son **positivos**, y se toma la raíz positiva.

- $\cos x=\sqrt{1-\operatorname{sen}^2x}=\sqrt{1-\frac19}=\sqrt{\frac89}=\dfrac{2\sqrt2}{3}$
- $\sec y=\frac54\Rightarrow\cos y=\dfrac45$, y entonces $\operatorname{sen}y=\sqrt{1-\frac{16}{25}}=\dfrac35$

$$\operatorname{sen}(x+y)=\operatorname{sen}x\cos y+\cos x\operatorname{sen}y=\frac13\cdot\frac45+\frac{2\sqrt2}{3}\cdot\frac35=\frac{4+6\sqrt2}{15}$$

$$\boxed{\operatorname{sen}(x+y)=\dfrac{4+6\sqrt2}{15}\approx 0{,}83}$$

**Paso a paso**
1. **Identidad de la suma:** $\operatorname{sen}(x+y)=\operatorname{sen}x\cos y+\cos x\operatorname{sen}y$, válida para todo $x,y\in\mathbb{R}$.
2. **Signos:** la hipótesis $x,y\in(0,\pi/2)$ es esencial: garantiza $\cos x>0$ y $\operatorname{sen}y>0$, es decir, que corresponde tomar la raíz **positiva** en cada paso. Sin esa condición habría dos posibilidades.
3. De $\operatorname{sen}^2x+\cos^2x=1$: $\cos^2x=1-\frac19=\frac89$, $\cos x=\frac{2\sqrt2}{3}$ (positivo).
4. $\sec y=\frac{1}{\cos y}=\frac54$ está definida porque $y\neq\frac{\pi}{2}$; de ella $\cos y=\frac45$.
5. $\operatorname{sen}^2y=1-\frac{16}{25}=\frac9{25}$, $\operatorname{sen}y=\frac35$ (positivo).
6. Sustituyendo: $\frac13\cdot\frac45=\frac4{15}$ y $\frac{2\sqrt2}{3}\cdot\frac35=\frac{6\sqrt2}{15}$. Sumando: $\frac{4+6\sqrt2}{15}$.
7. (Control: $\frac{4+6\sqrt2}{15}\approx\frac{12{,}49}{15}\approx0{,}83$, que está en $[-1,1]$ ✓.)

---

## Ejercicio 7 — Identidades

### (a) $\tan\theta\operatorname{sen}\theta+\cos\theta=\sec\theta$

**Explicación breve**
Escribiendo $\tan\theta=\dfrac{\operatorname{sen}\theta}{\cos\theta}$ y sumando con denominador común, el numerador se reduce a $1$ por la identidad pitagórica:

$$\frac{\operatorname{sen}\theta}{\cos\theta}\operatorname{sen}\theta+\cos\theta=\frac{\operatorname{sen}^2\theta+\cos^2\theta}{\cos\theta}=\frac{1}{\cos\theta}=\sec\theta$$

**Dominio:** ambas partes están definidas exactamente cuando $\cos\theta\neq0$, es decir $\theta\neq\dfrac{\pi}{2}+k\pi$, $k\in\mathbb{Z}$. La identidad es válida en ese conjunto.

**Paso a paso**
1. Para poder escribir $\tan\theta=\frac{\operatorname{sen}\theta}{\cos\theta}$ hace falta $\cos\theta\neq0$: esa es la restricción que se arrastra en todo el desarrollo.
2. Luego $\tan\theta\operatorname{sen}\theta=\dfrac{\operatorname{sen}^2\theta}{\cos\theta}$.
3. Sumo con $\cos\theta$ poniendo denominador común $\cos\theta$: $\cos\theta=\dfrac{\cos^2\theta}{\cos\theta}$.
4. $\dfrac{\operatorname{sen}^2\theta+\cos^2\theta}{\cos\theta}=\dfrac{1}{\cos\theta}$, usando $\operatorname{sen}^2\theta+\cos^2\theta=1$ (válida para todo $\theta\in\mathbb{R}$).
5. $\dfrac{1}{\cos\theta}=\sec\theta$ por definición. $\blacksquare$

### (b) $\dfrac{2\tan x}{1+\tan^2 x}=\operatorname{sen}2x$

**Explicación breve**
Usando $1+\tan^2x=\sec^2x=\dfrac{1}{\cos^2x}$, la fracción se simplifica a $2\operatorname{sen}x\cos x$, que es $\operatorname{sen}2x$:

$$\frac{2\tan x}{1+\tan^2 x}=\frac{2\frac{\operatorname{sen}x}{\cos x}}{\frac{1}{\cos^2 x}}=2\frac{\operatorname{sen}x}{\cos x}\cos^2x=2\operatorname{sen}x\cos x=\operatorname{sen}2x$$

**Dominio:** requiere $\cos x\neq0$, es decir $x\neq\dfrac{\pi}{2}+k\pi$, $k\in\mathbb{Z}$ (allí $\tan x$ no existe y además $1+\tan^2x=0$ no podría dividirse). En ese conjunto la identidad es válida.

**Paso a paso**
1. Restricción: $\tan x=\frac{\operatorname{sen}x}{\cos x}$ existe solo si $\cos x\neq0$.
2. Identidad pitagórica para tangente: $1+\tan^2x=\sec^2x$, consecuencia de dividir $\operatorname{sen}^2x+\cos^2x=1$ por $\cos^2x\neq0$.
3. Como $\sec^2x=\frac{1}{\cos^2x}>0$ siempre que esté definida, el denominador nunca se anula: la división es legítima.
4. Entonces $\dfrac{2\tan x}{1+\tan^2x}=2\dfrac{\operatorname{sen}x}{\cos x}\cdot\cos^2x=2\operatorname{sen}x\cos x$.
5. Doble ángulo: $\operatorname{sen}2x=2\operatorname{sen}x\cos x$, válida para todo $x\in\mathbb{R}$. $\blacksquare$

---

## Ejercicio 8 — Resolver $\operatorname{sen}2x=\operatorname{sen}x$ en $0\leq x\leq 2\pi$

**Explicación breve**
Paso todo a un miembro y factorizo con la fórmula del doble ángulo:

$$2\operatorname{sen}x\cos x-\operatorname{sen}x=0\;\Longrightarrow\;\operatorname{sen}x\,(2\cos x-1)=0$$

Un producto es cero si un factor lo es:

- $\operatorname{sen}x=0\Rightarrow x=0,\ \pi,\ 2\pi$
- $2\cos x-1=0\Rightarrow\cos x=\frac12\Rightarrow x=\frac{\pi}{3},\ \frac{5\pi}{3}$

$$\boxed{x\in\left\{0,\ \frac{\pi}{3},\ \pi,\ \frac{5\pi}{3},\ 2\pi\right\}}\qquad(5\text{ valores})$$

**Paso a paso**
1. **Condición del intervalo:** el problema pide $x$ en el intervalo **cerrado** $[0,2\pi]$, así que $x=0$ y $x=2\pi$ **sí** son soluciones (en un intervalo abierto se descartarían).
2. $\operatorname{sen}2x=2\operatorname{sen}x\cos x$ (doble ángulo, válida para todo $x$).
3. $\operatorname{sen}2x=\operatorname{sen}x\iff 2\operatorname{sen}x\cos x=\operatorname{sen}x\iff 2\operatorname{sen}x\cos x-\operatorname{sen}x=0$.
4. **Factorización:** $\operatorname{sen}x\,(2\cos x-1)=0$. (Cuidado: no se puede "cancelar" $\operatorname{sen}x$ de ambos miembros, porque se perderían las soluciones con $\operatorname{sen}x=0$.)
5. Caso 1: $\operatorname{sen}x=0$. En $[0,2\pi]$ eso ocurre en $x=0,\pi,2\pi$.
6. Caso 2: $\cos x=\frac12$. El coseno vale $\frac12$ en los cuadrantes I y IV, con ángulo de referencia $\frac{\pi}{3}$: $x=\frac{\pi}{3}$ y $x=2\pi-\frac{\pi}{3}=\frac{5\pi}{3}$.
7. Ninguna solución queda fuera del intervalo, y las cinco son distintas entre sí. $\blacksquare$

---

## Ejercicio 9 — Gráfica de $y=1+\operatorname{sen}2x$ (sin calculadora)

**Explicación breve**
Es la curva seno con **período $\pi$**, **amplitud 1**, **desplazada 1 unidad hacia arriba**: oscila entre $y=0$ y $y=2$, con línea media $y=1$.

Puntos clave (un período completo $[0,\pi]$):

| $x$ | $0$ | $\frac{\pi}{8}$ | $\frac{\pi}{4}$ | $\frac{3\pi}{8}$ | $\frac{\pi}{2}$ | $\frac{5\pi}{8}$ | $\frac{3\pi}{4}$ | $\frac{7\pi}{8}$ | $\pi$ |
|---|---|---|---|---|---|---|---|---|---|
| $2x$ | $0$ | $\frac{\pi}{4}$ | $\frac{\pi}{2}$ | $\frac{3\pi}{4}$ | $\pi$ | $\frac{5\pi}{4}$ | $\frac{3\pi}{2}$ | $\frac{7\pi}{4}$ | $2\pi$ |
| $\operatorname{sen}2x$ | $0$ | $\frac{\sqrt2}{2}$ | $1$ | $\frac{\sqrt2}{2}$ | $0$ | $-\frac{\sqrt2}{2}$ | $-1$ | $-\frac{\sqrt2}{2}$ | $0$ |
| $y$ | $1$ | $\approx1{,}71$ | $2$ | $\approx1{,}71$ | $1$ | $\approx0{,}29$ | $0$ | $\approx0{,}29$ | $1$ |

- **Máximos** en $x=\frac{\pi}{4}+k\pi$, con $y=2$.
- **Mínimos** en $x=\frac{3\pi}{4}+k\pi$, con $y=0$ (la gráfica es tangente al eje $x$ en esos puntos).
- **Corta la línea media** $y=1$ en $x=\frac{k\pi}{2}$.
- Dominio y rango: $x\in\mathbb{R}$, $y\in[0,2]$.

**Cómo trazarla (paso a paso)**
1. **Ejes y escala:** dibuje el eje $x$ marcando múltiplos de $\frac{\pi}{8}$ (al menos de $-\pi$ a $2\pi$) y el eje $y$ de $0$ a $2$, con marcas en $0,1,2$. Trace con línea punteada la **línea media** $y=1$.
2. **Período:** el argumento es $2x$, así que el período es $\frac{2\pi}{2}=\pi$ — la onda completa se repite cada $\pi$, es decir, **dos veces más seguida** que $y=\operatorname{sen}x$.
3. **Amplitud y traslación vertical:** el coeficiente de $\operatorname{sen}$ es $1$ (amplitud 1) y el "$+1$" sube toda la curva una unidad: por eso en vez de oscilar entre $-1$ y $1$, oscila entre $0$ y $2$.
4. **Marque los cinco puntos característicos** de un período: $(0,1)$, $\left(\frac{\pi}{4},2\right)$, $\left(\frac{\pi}{2},1\right)$, $\left(\frac{3\pi}{4},0\right)$, $(\pi,1)$. Complete con los puntos intermedios de la tabla ($\frac{\pi}{8},\frac{3\pi}{8},\dots$) si quiere mayor precisión: valen $1\pm\frac{\sqrt2}{2}\approx1{,}71$ y $0{,}29$.
5. **Dibuje** una curva senoidal suave (sin quiebres ni picos angulares) que pase por esos puntos: crece desde $(0,1)$ hasta el máximo en $\frac{\pi}{4}$, baja cruzando $y=1$ en $\frac{\pi}{2}$, toca el eje $x$ en $\frac{3\pi}{4}$ (mínimo, tangente) y vuelve a $y=1$ en $x=\pi$.
6. **Repita** ese mismo trozo hacia la derecha e izquierda cada $\pi$ unidades ($x\in[\pi,2\pi]$, $x\in[-\pi,0]$, etc.), usando los máximos en $\frac{\pi}{4}+k\pi$ y mínimos en $\frac{3\pi}{4}+k\pi$.
7. **Comprobaciones rápidas:** la curva nunca baja de $y=0$ ni sube de $y=2$; es simétrica respecto de la línea media; y $y(0)=1$, $y\!\left(\frac{\pi}{4}\right)=2$, $y\!\left(\frac{3\pi}{4}\right)=0$ confirmarán que la escala es correcta.
