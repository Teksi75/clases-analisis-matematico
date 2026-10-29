# Verificación independiente del dictamen de Álgebra 2–10

El verificador independiente `gentle-ai-verify` contrastó `stewart-algebra-2-10-dictamen.md` y ambas propuestas con las consignas originales y su resolución previa. Concluyó que las correcciones matemáticas examinadas son fiables; no detectó otro error algebraico material omitido por el juez. La implementación y su revisión siguen pendientes.

## Correcciones contrastadas

- **2(c):** $x/(9y^7)$, con $x>0$, $y>0$; $x^{3/2}$ admite cero por sí solo, pero el denominador $x^2$ lo excluye. La base elevada a $-2$ es positiva en el dominio original.
- **5(a–d):** se conservan respectivamente $x\ne-1,2$; $x\ne-3,3,-\tfrac12$; $x\ne\pm2$; y $x,y\ne0$, $x\ne y$. Una cancelación no recupera valores excluidos.
- **6(b):** $h\ge-4$, $h\ne0$; el conjugado es positivo. La fórmula simplificada admite $h=0$, pero la expresión original no.
- **8(e):** las cuatro raíces son $-\sqrt2,-1,1,\sqrt2$. En la sustitución $t=x^2\ge0$, ambos valores $t=1,2$ son admisibles.
- **9(a–e):** $[-4,3)$, $(-2,4)$, $(-2,0)\cup(1,\infty)$, $(1,7)$ y $(-1,4]$; en (e) se excluye $x=-1$ del dominio.
- **10(b):** la igualdad es verdadera donde ambos lados están definidos, $a,b\ge0$. El par $(-1,-1)$ no es un contraejemplo real: el miembro derecho está indefinido.
- **10(e):** el dominio común y el contraejemplo del juez son correctos; la igualdad nunca se cumple en ese dominio, pues exigiría $x^2-xy+y^2=0$, posible solo para $(0,0)$, excluido.
- **10(f):** verdadera para $x\ne0$, $a\ne b$. El miembro derecho por sí solo no depende de $x$, pero la igualdad original conserva $x\ne0$.

Las restantes correcciones matemáticas para 2(a–b), 3, 4, 6(a), 7, 8(a–d,f–g) y 10(a,c,d) coinciden con la resolución independiente previa.

## Condiciones para integrar

1. Preservar las tres erratas ya identificadas en la clave original: 5(c), 8(c) y 8(e), aun cuando el juez no las mencione.
2. En 10(d), precisar que $1/C$ no es 1 **en general**; sí lo es para $C=1$.
3. El comentario del juez de que las propuestas no necesitaban desplegables no modifica el requisito de la interfaz final: el paso a paso debe ser opcional y comenzar cerrado.

El verificador informó lectura de las propuestas y del dictamen y contraste con la fuente. Una sonda Python independiente pasó ejemplos racionales, extremos de 9 y comprobaciones numéricas de las raíces de 8(e); las muestras finitas no prueban exhaustividad. No modificó archivos ni verificó la independencia efectiva de las llamadas o el comportamiento de la interfaz.
