Evaluá de forma independiente y anónima las propuestas A y B, sin inferir identidades. Usá la consigna y la rúbrica comunes reproducidas abajo. No supongas que ninguna sea correcta: verificá matemática, condiciones y restricciones, y justificación. Evaluá claridad para quien termina el secundario, brevedad real de la explicación inicial y si existe para cada tarea un desarrollo separado que aporte claridad sin repetir. Podés rechazar ambas. Emití un dictamen para cada una de las 18 tareas: selección A, B, empate o rechazo de ambas; justificación breve; errores y correcciones obligatorias, incluida cualquier omisión o redundancia en el desarrollo. En las regiones verificá puntos, fronteras, sombreado y curva frente a interior. Identificá dónde cada respuesta necesita cambios antes de incorporarse y ofrecé una síntesis final. No modifiques las consignas. No tenés herramientas ni acceso a archivos: toda la información necesaria está abajo. Respondé directamente.

# Consigna común: Geometría analítica de Stewart, ejercicios 1–5

Prepará una respuesta completa para cada una de las 18 tareas indicadas, sin omitir ninguna: 1(a–d), 2, 3, 4(a–f) y 5(a–f). Conservá exactamente las consignas y tareas originales: no cambies datos, expresiones ni lo que se pide resolver.

El destinatario está terminando el secundario, no cursando una materia universitaria. Para cada tarea presentá, por separado:

- **Explicación breve:** realmente concisa, con el resultado y la idea necesaria para comprenderlo.
- **Paso a paso:** desarrollo opcional, claro y no redundante, que agregue claridad cuando se consulte.

Trabajá en los números reales. Indicá las condiciones y restricciones matemáticas pertinentes y justificá los pasos. Para las regiones, explicá cómo trazarlas: frontera incluida o excluida, puntos de referencia, lado sombreado cuando corresponda y distinción entre una curva y su interior. No inventes figuras dadas ni cambies una ecuación por una desigualdad.

Rúbrica común: corrección matemática y restricciones; claridad para el nivel secundario; justificación de los pasos; brevedad del primer nivel; aporte real del detalle sin redundancia. No es necesario escribir HTML.

Las consignas siguientes se reproducen de `evaluaciones/stewart/geometria.md`, sin sus desarrollos docentes ni respuestas. En ese archivo no hay figuras asociadas a las consignas; el ejercicio 5 pide trazarlas. Trabajá con las expresiones exactas, sin asumir información gráfica adicional.

## Ejercicio 1

Encuentre una ecuación para la recta que pasa por el punto $(2,-5)$ y

- **(a)** tiene pendiente $-3$
- (b) es paralela al eje $x$
- (c) es paralela al eje $y$
- (d) es paralela a la recta $2x-4y=3$

## Ejercicio 2

Encuentre una ecuación para el círculo que tiene centro en $(-1,4)$ y pasa por el punto $(3,-2)$.

## Ejercicio 3

Encuentre el centro y radio del círculo con ecuación $x^2+y^2-6x+10y+9=0$.

## Ejercicio 4

Sean $A(-7,4)$ y $B(5,-12)$ puntos en el plano.

- **(a)** Encuentre la pendiente de la recta que contiene $A$ y $B$.
- (b) Encuentre una ecuación de la recta que pasa por $A$ y $B$. ¿Cuáles son los puntos de intersección con los ejes?
- (c) Encuentre el punto medio del segmento $AB$.
- (d) Encuentre la longitud del segmento $AB$.
- (e) Encuentre una ecuación de la perpendicular que biseca a $AB$.
- (f) Encuentre una ecuación del círculo para el cual $AB$ es un diámetro.

## Ejercicio 5

Trace la región en el plano $xy$ definida por la ecuación o desigualdades.

- **(a)** $-1\leq y\leq 3$
- (b) $|x|<4$ y $|y|<2$
- (c) $y<1-\frac12x$
- (d) $y\geq x^2-1$
- (e) $x^2+y^2<4$
- (f) $9x^2+16y^2=144$

## Propuesta A

# Ejercicio 1

Recta que pasa por $P(2,-5)$.

---

## (a) Pendiente $-3$

**Explicación breve:** Uso la forma punto‑pendiente $y-y_1=m(x-x_1)$:
$$y+5=-3(x-2)\quad\Longrightarrow\quad \boxed{y=-3x+1}$$
Idea: una pendiente y un punto determinan una única recta; basta sustituir en la fórmula.

**Paso a paso:**
1. $y-(-5)=-3(x-2)$
2. $y+5=-3x+6$
3. $y=-3x+1$ (o en forma general: $3x+y-1=0$)

Comprobación: si $x=2$, $y=-6+1=-5$ ✓.

---

## (b) Paralela al eje $x$

**Explicación breve:** Las rectas paralelas al eje $x$ son horizontales, de la forma $y=k$. Como pasa por $(2,-5)$:
$$\boxed{y=-5}$$
Su pendiente es $0$; el valor de $x$ es libre (todo punto $(x,-5)$ cumple).

**Paso a paso:** Una recta paralela al eje $x$ conserva constante la ordenada. La ordenada del punto dado es $-5$, luego $y=-5$ para todo $x\in\mathbb{R}$.

---

## (c) Paralela al eje $y$

**Explicación breve:** Las rectas paralelas al eje $y$ son verticales, de la forma $x=k$; su pendiente no está definida (denominador nulo).
$$\boxed{x=2}$$

**Paso a paso:** Una recta vertical mantiene constante la abscisa. El punto $(2,-5)$ tiene abscisa $2$, luego $x=2$ para todo $y\in\mathbb{R}$. Nota: esta recta **no** puede escribirse como $y=mx+b$, porque $m$ no existe.

---

## (d) Paralela a $2x-4y=3$

**Explicación breve:** Despejo $y$: $4y=2x-3$, es decir $y=\tfrac12 x-\tfrac34$, de pendiente $m=\tfrac12$. Las rectas paralelas tienen igual pendiente:
$$y+5=\tfrac12(x-2)\quad\Longrightarrow\quad \boxed{y=\tfrac12 x-6}\qquad(\text{o } x-2y=12)$$

**Paso a paso:**
1. Pendiente de $2x-4y=3$: $m=\dfrac{2}{4}=\dfrac12$ (de $Ax+By+C=0$, $m=-A/B$).
2. Punto‑pendiente por $(2,-5)$: $y+5=\tfrac12(x-2)$.
3. $y=\tfrac12 x-1-5=\tfrac12 x-6$.

Comprobación: $x=2\Rightarrow y=1-6=-5$ ✓; y $x-2y=2+12=14\ne 12$… verifico: $y=\tfrac12x-6 \Rightarrow 2y=x-12 \Rightarrow x-2y=12$ ✓.

---

# Ejercicio 2

**Explicación breve:** El radio es la distancia centro–punto:
$$r^2=(3-(-1))^2+(-2-4)^2=16+36=52$$
Entonces:
$$\boxed{(x+1)^2+(y-4)^2=52}\qquad r=\sqrt{52}=2\sqrt{13}$$

**Paso a paso:**
1. Centro $C(-1,4)$, punto $P(3,-2)$.
2. $r=\sqrt{(3+1)^2+(-2-4)^2}=\sqrt{4^2+(-6)^2}=\sqrt{52}=2\sqrt{13}\approx 7{,}21$ (mayor que $0$, válido).
3. Ecuación estándar $(x-h)^2+(y-k)^2=r^2$ con $h=-1$, $k=4$.

Comprobación: $(3+1)^2+(-2-4)^2=16+36=52$ ✓.

---

# Ejercicio 3

**Explicación breve:** Completo cuadrados en $x$ e $y$:
$$x^2-6x=(x-3)^2-9,\qquad y^2+10y=(y+5)^2-25$$
Sustituyendo: $(x-3)^2+(y+5)^2-9-25+9=0$, es decir
$$\boxed{(x-3)^2+(y+5)^2=25}\quad\Rightarrow\quad \text{centro }(3,-5),\ \ r=5$$

**Paso a paso:**
1. Agrupo: $(x^2-6x)+(y^2+10y)=-9$.
2. Completo cuadrados sumando $(6/2)^2=9$ y $(10/2)^2=25$ a ambos miembros:
$$(x^2-6x+9)+(y^2+10y+25)=-9+9+25$$
3. $(x-3)^2+(y+5)^2=25$.
4. Comparo con $(x-h)^2+(y-k)^2=r^2$: $h=3$, $k=-5$, $r^2=25\Rightarrow r=5$ (positivo).

Como $r^2=25>0$, efectivamente es un círculo (si diera $0$ sería un punto; si $<0$, no representaría ningún punto real).

---

# Ejercicio 4

Datos: $A(-7,4)$, $B(5,-12)$.

---

## (a) Pendiente de la recta $AB$

**Explicación breve:**
$$m=\frac{y_B-y_A}{x_B-x_A}=\frac{-12-4}{5-(-7)}=\frac{-16}{12}=\boxed{-\frac43}$$
La recta no es vertical porque $x_A\neq x_B$ ($-7\neq5$), así que la pendiente existe.

**Paso a paso:** $m=\dfrac{-16}{12}$; simplifico dividiendo por $4$: $m=-\dfrac43\approx-1{,}33$. La recta es decreciente.

---

## (b) Ecuación de la recta $AB$ y sus intersecciones con los ejes

**Explicación breve:** Con $m=-\tfrac43$ y el punto $A(-7,4)$:
$$y-4=-\tfrac43(x+7)\ \Longrightarrow\ 3y-12=-4x-28\ \Longrightarrow\ \boxed{4x+3y+16=0}$$
Intersecciones: con el eje $x$ en $(-4,0)$; con el eje $y$ en $\left(0,-\tfrac{16}{3}\right)$.

**Paso a paso:**
1. Punto‑pendiente: $y-4=-\tfrac43(x+7)$.
2. Multiplico por $3$: $3y-12=-4x-28$, es decir $4x+3y+16=0$.
3. **Corte con el eje $x$** ($y=0$): $4x+16=0\Rightarrow x=-4$, punto $(-4,0)$.
4. **Corte con el eje $y$** ($x=0$): $3y+16=0\Rightarrow y=-\tfrac{16}{3}$, punto $\left(0,-\tfrac{16}{3}\right)$.

Comprobación: $B$: $4(5)+3(-12)+16=20-36+16=0$ ✓.

---

## (c) Punto medio de $AB$

**Explicación breve:**
$$M=\left(\frac{-7+5}{2},\ \frac{4+(-12)}{2}\right)=\left(\frac{-2}{2},\ \frac{-8}{2}\right)=\boxed{(-1,-4)}$$
Idea: se promedian las coordenadas de los extremos.

**Paso a paso:** Fórmula $M=\left(\dfrac{x_A+x_B}{2},\dfrac{y_A+y_B}{2}\right)$; sustituyendo se obtiene $(-1,-4)$.

---

## (d) Longitud de $AB$

**Explicación breve:**
$$|AB|=\sqrt{(5-(-7))^2+(-12-4)^2}=\sqrt{12^2+(-16)^2}=\sqrt{144+256}=\sqrt{400}=\boxed{20}$$
Es el teorema de Pitágoras aplicado al triángulo de catas $|\Delta x|=12$ y $|\Delta y|=16$.

**Paso a paso:**
1. $\Delta x=5+7=12$, $\Delta y=-12-4=-16$.
2. $|AB|=\sqrt{12^2+16^2}=\sqrt{144+256}=\sqrt{400}=20$ (raíz positiva).

---

## (e) Mediatriz de $AB$ (perpendicular que lo biseca)

**Explicación breve:** Pasa por el punto medio $M(-1,-4)$ y su pendiente es la opuesta recíproca de $m=-\tfrac43$, es decir $m_{\perp}=\tfrac34$:
$$y+4=\tfrac34(x+1)\ \Longrightarrow\ \boxed{3x-4y-13=0}$$
Importante: la perpendicular **y** la condición de pasar por el punto medio son las dos que definen a la mediatriz.

**Paso a paso:**
1. $m_{\perp}=-\dfrac{1}{m}=-\dfrac{1}{-4/3}=\dfrac34$ (existe porque $m\neq0$ y está definida porque $m$ es finito).
2. Punto‑pendiente por $M(-1,-4)$: $y+4=\tfrac34(x+1)$.
3. Multiplico por $4$: $4y+16=3x+3$, es decir $3x-4y-13=0$.

Comprobación en $M$: $3(-1)-4(-4)=-3+16=13$ ✓. Y $A$: $-21-16-13=-50\ne0$… verifico pendiente: $3x-4y=13\Rightarrow y=\tfrac34 x-\tfrac{13}{4}$, pendiente $\tfrac34$ ✓ y $3(-7)-4(4)=-21-16=-37\ne13$… recálculo: $3(-7)-4(4)-13=-21-16-13\neq0$. Reviso la aritmética de la ecuación: $4y+16=3x+3\Rightarrow 4y=3x-13\Rightarrow 3x-4y=13$. Para $A(-7,4)$ debe dar distancia simétrica, no $0$ (A no pertenece a la mediatriz); la comprobación correcta es que $A$ y $B$ quedan a igual distancia de la recta: $3(-7)-4(4)-13=-50$ y $3(5)-4(-12)-13=15+48-13=50$; valores opuestos ✓ (la mediatriz es el lugar geométrico de puntos equidistantes, y en efecto $A$ y $B$ están a distancias iguales y opuestas).

---

## (f) Círculo con $AB$ como diámetro

**Explicación breve:** Centro = punto medio $M(-1,-4)$; radio = semidiámetro $=\tfrac{|AB|}{2}=10$:
$$\boxed{(x+1)^2+(y+4)^2=100}\qquad\left(\text{o } x^2+y^2+2x+8y-83=0\right)$$
Idea (teorema de Tales): $AB$ es diámetro si y solo si el centro es el punto medio y el radio es la mitad de la longitud.

**Paso a paso:**
1. Centro $\left(\dfrac{-7+5}{2},\dfrac{4-12}{2}\right)=(-1,-4)$; $r=\dfrac{20}{2}=10>0$.
2. $(x+1)^2+(y+4)^2=10^2=100$.
3. Forma general: $x^2+2x+1+y^2+8y+16=100\Rightarrow x^2+y^2+2x+8y-83=0$.

Comprobación con $A$: $49+16-14+32-83=0$ ✓; con $B$: $25+144+10-96-83=0$ ✓.

---

# Ejercicio 5

Regiones en el plano $xy$. Recordatorio: si la desigualdad es estricta ($<$ o $>$), la frontera se **excluye** (línea punteada); si es $\leq$ o $\geq$, se **incluye** (línea llena). Para decidir el lado sombreado, se prueba un punto que no esté en la frontera (habitualmente el origen).

---

## (a) $-1\leq y\leq 3$

**Explicación breve:** Es la **franja horizontal** entre las rectas $y=-1$ y $y=3$, ambas **incluidas** (líneas llenas, por el $\leq$), y sin restricción sobre $x$: la región se extiende infinitamente a izquierda y derecha. Comprende, por ejemplo, $(0,0)$; no comprende $(0,5)$.

**Cómo trazarla:**
1. Dibujo $y=-1$ y $y=3$ como rectas horizontales **continuas**.
2. Sombreo la banda entre ambas (incluidos los bordes), en toda la extensión del plano en $x$.
3. Puntos de referencia: $(0,0)$ cumple ($-1\leq0\leq3$); $(2,3)$ cumple (borde superior); $(0,-1)$ cumple (borde inferior); $(0,4)$ y $(0,-2)$ no.

Diferencia curva/interior: aquí la frontera son dos rectas, y la región es el **área** entre ellas, no las rectas solas.

---

## (b) $|x|<4$ y $|y|<2$

**Explicación breve:** $|x|<4\iff -4<x<4$ y $|y|<2\iff -2<y<2$. La región es el **rectángulo abierto** con lados $x=\pm4$, $y=\pm2$: todos los puntos del interior, **sin** los bordes (punteados). Origen incluido; $(4,0)$ y $(0,2)$ excluidos.

**Cómo trazarla:**
1. Dibujo el rectángulo de vértices $(-4,-2)$, $(4,-2)$, $(4,2)$, $(-4,2)$ con los cuatro lados **punteados** (desigualdades estrictas).
2. Sombreo solo el interior.
3. Prueba: $(0,0)$ cumple ($0<4$ y $0<2$); $(4,1)$ no cumple ($|4|=4\not<4$).

Es la intersección de dos franjas verticales/horizontales; por eso el resultado es un rectángulo, no un disco.

---

## (c) $y<1-\dfrac12 x$

**Explicación breve:** Es el **semiplano por debajo** de la recta $y=1-\tfrac12 x$ (es decir $x+2y=2$), con la recta **excluida** (punteada, por el $<$). El origen cumple ($0<1$), así que se sombra el lado que contiene a $(0,0)$.

**Cómo trazarla:**
1. Recta frontera: cortes en $(2,0)$ y $(0,1)$; pendiente $-\tfrac12$. Dibujarla **punteada**.
2. Prueba con $(0,0)$: $0<1-0=1$ ✓ → sombrear el lado del origen (abajo‑izquierda de la recta).
3. Puntos: $(0,0)$ y $(0,-1)$ sí; $(0,2)$ no ($2\not<1$).

Ojo: la frontera es una **recta** (línea), no una región; solo ella se dibuja punteada y el semiplano entero se sombrea.

---

## (d) $y\geq x^2-1$

**Explicación breve:** Región **sobre la parábola** $y=x^2-1$, con la parábola **incluida** (línea llena, por el $\geq$). Vértice en $(0,-1)$; cortes con el eje $x$ en $(\pm1,0)$; abre hacia arriba. Sombra arriba/de adentro de la curva: $(0,0)$ cumple ($0\geq-1$).

**Cómo trazarla:**
1. Dibujo $y=x^2-1$ (parábola con vértice $(0,-1)$, simétrica respecto del eje $y$, pasando por $(\pm1,0)$ y $(\pm2,3)$) con trazo **continuo**.
2. Prueba con $(0,0)$: $0\geq-1$ ✓ → sombreo el lado donde está el origen, es decir la zona comprendida **dentro y encima** de la parábola.
3. Puntos: $(0,0)$, $(0,-1)$ (frontera) y $(3,10)$ sí; $(0,-2)$ no ($-2\not\geq-1$).

Distinción curva/interior: la curva $y=x^2-1$ es solo la parábola (una línea); la región pedida es la **zona** que queda sobre ella, con la curva como borde incluido. Como la parábola no encierra una zona acotada, el "interior" aquí es la zona cóncava hacia arriba, no un interior cerrado.

---

## (e) $x^2+y^2<4$

**Explicación breve:** Es el **disco abierto** de centro $(0,0)$ y radio $2$: todos los puntos del interior del círculo $x^2+y^2=4$, con la circunferencia **excluida** (punteada). El origen está incluido; $(2,0)$ no ($4\not<4$).

**Cómo trazarla:**
1. Dibujo la circunferencia $x^2+y^2=4$ (centro origen, cortes en $(\pm2,0)$ y $(0,\pm2)$) con trazo **punteado**.
2. Sombreo solo el interior.
3. Prueba: $(0,0)$: $0<4$ ✓; $(0,2)$: $4<4$ ✗ (por eso el borde no se incluye).

Distinción curva/interior: la **curva** es la circunferencia $x^2+y^2=4$ (solo el borde); el **interior** es $x^2+y^2<4$ (la superficie). Aquí se pide el interior sin el borde.

---

## (f) $9x^2+16y^2=144$

**Explicación breve:** Dividiendo por $144$:
$$\frac{x^2}{16}+\frac{y^2}{9}=1,\qquad\text{es decir}\qquad \frac{x^2}{4^2}+\frac{y^2}{3^2}=1$$
Es una **elipse** centrada en el origen, con semieje mayor $a=4$ sobre el eje $x$ y semieje menor $b=3$ sobre el eje $y$. Como es una **ecuación** (no una desigualdad), la región es **solo la curva**: borde elíptico sin sombrear nada.

**Cómo trazarla:**
1. Centro $(0,0)$; vértices $(\pm4,0)$, $(0,\pm3)$.
2. Dibujo la elipse que une esos cuatro puntos (más ancha que alta), con trazo **continuo**.
3. No hay sombreado: $9x^2+16y^2=144$ es igualdad, y solo sus soluciones forman la curva. (El interior sería $9x^2+16y^2<144$, que **no** es lo que se pide.)
4. Focos (dato adicional de la curva): $c^2=a^2-b^2=16-9=7$, $c=\sqrt7$, focos en $(\pm\sqrt7,0)$.

Comprobación: $(4,0)$: $9\cdot16=144$ ✓; $(0,3)$: $16\cdot9=144$ ✓.

## Propuesta B

Todas las coordenadas son reales. En las regiones, “frontera sólida” significa incluida y “frontera punteada” significa excluida.

# Ejercicio 1

**Consigna.** Encuentre una ecuación para la recta que pasa por el punto \((2,-5)\) y

- **(a)** tiene pendiente \(-3\)
- (b) es paralela al eje \(x\)
- (c) es paralela al eje \(y\)
- (d) es paralela a la recta \(2x-4y=3\)

## 1(a)

**Explicación breve.** La recta es  
\[
y=-3x+1
\]
o, equivalentemente, \(3x+y-1=0\). Se usa la forma punto-pendiente.

**Paso a paso.**

1. Forma punto-pendiente:
   \[
   y-(-5)=-3(x-2).
   \]
2. Operamos:
   \[
   y+5=-3x+6.
   \]
3. Despejamos:
   \[
   y=-3x+1.
   \]

## 1(b)

**Explicación breve.** La recta es horizontal y pasa por \(y=-5\):
\[
y=-5
\]
o \(y+5=0\).

**Paso a paso.**

1. Una recta paralela al eje \(x\) es horizontal, así que su pendiente es \(0\).
2. Todos sus puntos tienen la misma coordenada \(y\). Como pasa por \((2,-5)\), esa coordenada es \(-5\).
3. Por eso:
   \[
   y=-5.
   \]

## 1(c)

**Explicación breve.** La recta es vertical y pasa por \(x=2\):
\[
x=2.
\]

**Paso a paso.**

1. Una recta paralela al eje \(y\) es vertical.
2. En una recta vertical todos los puntos tienen la misma coordenada \(x\). Como pasa por \((2,-5)\), esa coordenada es \(2\).
3. Por eso:
   \[
   x=2.
   \]
4. Su pendiente no está definida; no se escribe como \(y=mx+b\).

## 1(d)

**Explicación breve.** La recta es  
\[
y=\frac12x-6
\]
o, equivalentemente, \(x-2y=12\). Es paralela porque tiene la misma pendiente que \(2x-4y=3\), que es \(\frac12\).

**Paso a paso.**

1. Despejamos \(y\) en la recta dada:
   \[
   2x-4y=3
   \]
   \[
   -4y=3-2x
   \]
   \[
   y=\frac12x-\frac34.
   \]
   Su pendiente es \(\frac12\).
2. Una recta paralela tiene la misma pendiente, \(\frac12\).
3. Usamos el punto \((2,-5)\):
   \[
   y-(-5)=\frac12(x-2).
   \]
4. Operamos:
   \[
   y+5=\frac12x-1,
   \]
   \[
   y=\frac12x-6.
   \]
5. También puede escribirse:
   \[
   x-2y=12.
   \]

---

# Ejercicio 2

**Consigna.** Encuentre una ecuación para el círculo que tiene centro en \((-1,4)\) y pasa por el punto \((3,-2)\).

**Explicación breve.** La ecuación es  
\[
(x+1)^2+(y-4)^2=52.
\]
El radio es la distancia entre el centro y el punto dado.

**Paso a paso.**

1. El centro es \((h,k)=(-1,4)\). La ecuación general es
   \[
   (x-h)^2+(y-k)^2=r^2.
   \]
2. Calculamos \(r^2\) con la distancia entre \((-1,4)\) y \((3,-2)\):
   \[
   r^2=(3-(-1))^2+(-2-4)^2
   \]
   \[
   r^2=4^2+(-6)^2=16+36=52.
   \]
3. Entonces \(r=\sqrt{52}=2\sqrt{13}\).
4. Reemplazamos:
   \[
   (x+1)^2+(y-4)^2=52.
   \]

---

# Ejercicio 3

**Consigna.** Encuentre el centro y radio del círculo con ecuación \(x^2+y^2-6x+10y+9=0\).

**Explicación breve.** El centro es \((3,-5)\) y el radio es \(5\). Se obtiene completando cuadrados.

**Paso a paso.**

1. Agrupamos:
   \[
   (x^2-6x)+(y^2+10y)=-9.
   \]
2. Completamos cuadrados:
   \[
   x^2-6x=(x-3)^2-9,
   \]
   \[
   y^2+10y=(y+5)^2-25.
   \]
3. Reemplazamos:
   \[
   (x-3)^2-9+(y+5)^2-25=-9.
   \]
4. Sumamos \(9+25\) en ambos miembros:
   \[
   (x-3)^2+(y+5)^2=25.
   \]
5. Por lo tanto:
   \[
   \text{centro}=(3,-5),\qquad \text{radio}=5.
   \]

---

# Ejercicio 4

**Consigna.** Sean \(A(-7,4)\) y \(B(5,-12)\) puntos en el plano.

- **(a)** Encuentre la pendiente de la recta que contiene \(A\) y \(B\).
- (b) Encuentre una ecuación de la recta que pasa por \(A\) y \(B\). ¿Cuáles son los puntos de intersección con los ejes?
- (c) Encuentre el punto medio del segmento \(AB\).
- (d) Encuentre la longitud del segmento \(AB\).
- (e) Encuentre una ecuación de la perpendicular que biseca a \(AB\).
- (f) Encuentre una ecuación del círculo para el cual \(AB\) es un diámetro.

## 4(a)

**Explicación breve.** La pendiente es  
\[
m=-\frac43.
\]

**Paso a paso.**

\[
m=\frac{-12-4}{5-(-7)}
=\frac{-16}{12}
=-\frac43.
\]

## 4(b)

**Explicación breve.** Una ecuación es  
\[
4x+3y+16=0,
\]
o equivalentemente \(y=-\frac43x-\frac{16}{3}\). Los cortes con los ejes son  
\[
(-4,0)\quad\text{y}\quad\left(0,-\frac{16}{3}\right).
\]

**Paso a paso.**

1. Usamos \(A(-7,4)\) y la pendiente \(-\frac43\):
   \[
   y-4=-\frac43(x+7).
   \]
2. Multiplicamos por \(3\):
   \[
   3y-12=-4x-28.
   \]
3. Pasamos todo a un miembro:
   \[
   4x+3y+16=0.
   \]
4. Intersección con el eje \(x\): hacemos \(y=0\):
   \[
   4x+16=0\Rightarrow x=-4.
   \]
   Punto: \((-4,0)\).
5. Intersección con el eje \(y\): hacemos \(x=0\):
   \[
   3y+16=0\Rightarrow y=-\frac{16}{3}.
   \]
   Punto: \(\left(0,-\frac{16}{3}\right)\).

## 4(c)

**Explicación breve.** El punto medio es  
\[
M=(-1,-4).
\]

**Paso a paso.**

\[
M=\left(\frac{-7+5}{2},\frac{4+(-12)}{2}\right)
=\left(\frac{-2}{2},\frac{-8}{2}\right)
=(-1,-4).
\]

## 4(d)

**Explicación breve.** La longitud es  
\[
AB=20.
\]

**Paso a paso.**

\[
AB=\sqrt{(5-(-7))^2+(-12-4)^2}
\]
\[
=\sqrt{12^2+(-16)^2}
=\sqrt{144+256}
=\sqrt{400}
=20.
\]

## 4(e)

**Explicación breve.** La perpendicular que biseca a \(AB\) es  
\[
3x-4y-13=0,
\]
o equivalentemente \(y=\frac34x-\frac{13}{4}\).

**Paso a paso.**

1. La pendiente de \(AB\) es \(-\frac43\). La pendiente perpendicular es el recíproco negativo:
   \[
   m_\perp=\frac34.
   \]
2. Debe pasar por el punto medio \(M=(-1,-4)\).
3. Usamos punto-pendiente:
   \[
   y+4=\frac34(x+1).
   \]
4. Multiplicamos por \(4\):
   \[
   4y+16=3x+3.
   \]
5. Reordenamos:
   \[
   3x-4y-13=0.
   \]

## 4(f)

**Explicación breve.** La ecuación es  
\[
(x+1)^2+(y+4)^2=100.
\]
El centro es el punto medio de \(AB\) y el radio es la mitad de \(AB\).

**Paso a paso.**

1. Centro del círculo: punto medio de \(AB\):
   \[
   M=(-1,-4).
   \]
2. Radio: la mitad de la longitud \(AB\):
   \[
   r=\frac{20}{2}=10.
   \]
3. Ecuación:
   \[
   (x+1)^2+(y+4)^2=10^2,
   \]
   es decir,
   \[
   (x+1)^2+(y+4)^2=100.
   \]

---

# Ejercicio 5

**Consigna.** Trace la región en el plano \(xy\) definida por la ecuación o desigualdades.

- **(a)** \(-1\leq y\leq 3\)
- (b) \(|x|<4\) y \(|y|<2\)
- (c) \(y<1-\frac12x\)
- (d) \(y\geq x^2-1\)
- (e) \(x^2+y^2<4\)
- (f) \(9x^2+16y^2=144\)

## 5(a)

**Explicación breve.** Es la franja horizontal entre \(y=-1\) y \(y=3\), con ambas rectas incluidas. No hay restricción sobre \(x\).

**Paso a paso.**

1. \(y\geq -1\) deja la parte que está por encima de \(y=-1\).
2. \(y\leq 3\) deja la parte que está por debajo de \(y=3\).
3. La intersección es la franja entre ambas rectas.
4. Como las desigualdades no son estrictas, las fronteras \(y=-1\) e \(y=3\) se dibujan sólidas y se incluyen.
5. Se sombrea entre las dos rectas; por ejemplo, \((0,0)\) pertenece a la región.

## 5(b)

**Explicación breve.** Es el interior del rectángulo abierto  
\[
-4<x<4,\qquad -2<y<2.
\]
La frontera no se incluye.

**Paso a paso.**

1. \(|x|<4\) equivale a \(-4<x<4\).
2. \(|y|<2\) equivale a \(-2<y<2\).
3. La palabra “y” indica intersección: deben cumplirse ambas condiciones.
4. Se marcan los vértices \((-4,-2)\), \((-4,2)\), \((4,-2)\) y \((4,2)\). Los lados se dibujan punteados porque las desigualdades son estrictas.
5. Se sombrea el interior del rectángulo. Por ejemplo, \((0,0)\) pertenece; \((4,0)\) no pertenece porque \(x=4\) no cumple \(|x|<4\).

## 5(c)

**Explicación breve.** Es el semiplano que está por debajo de la recta  
\[
y=1-\frac12x.
\]
La recta no se incluye.

**Paso a paso.**

1. La frontera es la recta \(y=1-\frac12x\). Pasa por \((0,1)\) y \((2,0)\).
2. Como la desigualdad es estricta, la recta se dibuja punteada.
3. Probamos el origen \((0,0)\):
   \[
   0<1-\frac12\cdot 0=1,
   \]
   que es verdadero.
4. Por eso se sombrea el lado que contiene al origen, es decir, el semiplano inferior.
5. La región es no acotada hacia abajo y la recta no forma parte de ella.

## 5(d)

**Explicación breve.** Es la región que está sobre la parábola  
\[
y=x^2-1
\]
y también incluye la parábola. La frontera se dibuja sólida.

**Paso a paso.**

1. La frontera es la parábola \(y=x^2-1\), con vértice \((0,-1)\).
2. Corta el eje \(x\) cuando \(x^2-1=0\), es decir, en \((-1,0)\) y \((1,0)\).
3. Como la desigualdad es \(y\geq x^2-1\), se incluye la parábola: se dibuja sólida.
4. Probamos \((0,0)\):
   \[
   0\geq 0^2-1=-1,
   \]
   que es verdadero.
5. Se sombrea el lado que contiene al origen, que es la zona por encima de la parábola. No es solo la curva: también es toda la región superior.

## 5(e)

**Explicación breve.** Es el interior de la circunferencia  
\[
x^2+y^2=4,
\]
de centro \((0,0)\) y radio \(2\). La circunferencia no se incluye.

**Paso a paso.**

1. La frontera es \(x^2+y^2=4\), una circunferencia centrada en el origen con radio \(2\).
2. Pasa por \((2,0)\), \((-2,0)\), \((0,2)\) y \((0,-2)\). Se dibuja punteada porque la desigualdad es estricta.
3. Probamos el centro \((0,0)\):
   \[
   0^2+0^2=0<4,
   \]
   que es verdadero.
4. Se sombrea todo el interior de la circunferencia.
5. Los puntos sobre la circunferencia no pertenecen a la región; es un disco abierto.

## 5(f)

**Explicación breve.** Es la elipse  
\[
\frac{x^2}{16}+\frac{y^2}{9}=1,
\]
centrada en \((0,0)\), con cortes en \((\pm4,0)\) y \((0,\pm3)\). Como es una igualdad, se traza solamente la curva: no se sombrea su interior.

**Paso a paso.**

1. Dividimos entre \(144\):
   \[
   \frac{9x^2}{144}+\frac{16y^2}{144}=1,
   \]
   \[
   \frac{x^2}{16}+\frac{y^2}{9}=1.
   \]
2. Esta es una elipse con centro \((0,0)\), semieje horizontal \(4\) y semieje vertical \(3\).
3. Marcamos los puntos \((\pm4,0)\) y \((0,\pm3)\).
4. Unimos esos puntos con una curva ovalada suave.
5. La ecuación no contiene una desigualdad, así que la solución es exactamente la elipse, no su interior. No se sombrea ninguna zona.
