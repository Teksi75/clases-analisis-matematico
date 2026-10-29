# Verificación matemática independiente: Álgebra 2–10

Informe del verificador independiente `gentle-ai-verify`, sin acceso a las propuestas ni al dictamen. Todas las variables son reales; donde no se indica otra restricción, el dominio es todo el espacio real correspondiente. La verificación del contenido integrado y de las correcciones del juez permanece pendiente.

## Resultados y dominios

- **2(a)** $6\sqrt2$; **(b)** $48a^5b^7$; **(c)** $\dfrac{x}{9y^7}$, con $x>0$, $y>0$ en la expresión original.
- **3(a)** $11x-2$; **(b)** $4x^2+7x-15$; **(c)** $a-b$, con $a,b\ge0$; **(d)** $4x^2+12x+9$; **(e)** $x^3+6x^2+12x+8$.
- **4(a)** $(2x-5)(2x+5)$; **(b)** $(2x-3)(x+4)$; **(c)** $(x-3)(x-2)(x+2)$; **(d)** $x(x+3)(x^2-3x+9)$, cuyo último factor no tiene raíces reales; **(e)** $3x^{-1/2}(x-1)(x-2)$, con $x>0$; **(f)** $xy(x-2)(x+2)$.
- **5(a)** $\dfrac{x+2}{x-2}$, con $x\ne-1,2$; **(b)** $\dfrac{x-1}{x-3}$, con $x\ne-3,3,-\frac12$; **(c)** $\dfrac{3x-2}{x^2-4}$, con $x\ne-2,2$; **(d)** $-(x+y)$, con $x\ne0$, $y\ne0$, $x\ne y$. Las restricciones son las de las expresiones originales.
- **6(a)** $5\sqrt2+2\sqrt{10}$; **(b)** $\dfrac1{\sqrt{4+h}+2}$, con $h\ge-4$, $h\ne0$. La forma simplificada admite $h=0$, pero la original no.
- **7(a)** $(x+\frac12)^2+\frac34$; **(b)** $2(x-3)^2-7$.
- **8(a)** $x=6$; **(b)** $x=1$, dominio original $x\ne0,-1$; **(c)** $x=-1,2$; **(d)** $x=-1\pm\dfrac{\sqrt2}{2}$; **(e)** $x\in\{-\sqrt2,-1,1,\sqrt2\}$; **(f)** $x=\frac23,\frac{22}3$; **(g)** $x=\frac{12}5$, dominio original $x<4$.
- **9(a)** $[-4,3)$; **(b)** $(-2,4)$; **(c)** $(-2,0)\cup(1,\infty)$; **(d)** $(1,7)$; **(e)** $(-1,4]$, dominio original $x\ne-1$.
- **10(a)** Falsa en general: falta $2pq$; se cumple exactamente cuando $pq=0$. **(b)** Verdadera donde ambos lados están definidos: $a,b\ge0$; el lado izquierdo también existe cuando ambos son negativos, pero el derecho no. **(c)** Falsa en general; se cumple exactamente si $ab=0$ y $a+b\ge0$. **(d)** Falsa en general; requiere $C\ne0$ y se cumple exactamente si $C=1$. **(e)** Falsa, con $x\ne0$, $y\ne0$, $x\ne y$; nunca se cumple en ese dominio porque exigiría $x^2-xy+y^2=0$, que solo ocurre en $(0,0)$. **(f)** Verdadera para $x\ne0$ y $a\ne b$.

## Erratas y método

- **5(c):** para $x=0$ la consigna vale $1/2$, mientras la clave da $-1/2$.
- **8(c):** las raíces impresas $-3,4$ no anulan el polinomio; las correctas son $-1,2$.
- **8(e):** $\pm1\pm\sqrt2$ expresa sumas y diferencias, no la enumeración $\pm1,\pm\sqrt2$.

El agente informó derivación algebraica y análisis de dominios y signos, junto con una sonda Python sobre los 40 incisos usando fracciones exactas en grillas finitas y comprobaciones numéricas de radicales. El primer intento de la sonda falló en 2(c) por una división flotante accidental; el intento corregido con fracciones exactas pasó. Las grillas y aproximaciones no prueban por sí solas identidades ni exhaustividad. SymPy no estaba disponible y no se instaló. El agente informó que la fuente coincidía con la base `8bb0439` y que no modificó archivos.
