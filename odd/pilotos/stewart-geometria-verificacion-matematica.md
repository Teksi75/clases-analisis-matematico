# Geometría analítica: verificación matemática independiente

## Fuente y alcance

Se cotejaron los datos de las consignas con la página física 24 (xxii) de `material/pdf/JAMES_STEWART_Sexta_edicion_Sexta_edicio.pdf`, mediante `pdftotext -f 24 -l 24 -layout ... -` (exit 0). La extracción presenta caracteres defectuosos para varios signos. Según L8 de `odd/tasks/geometria-stewart.md`, el agente padre inspeccionó visualmente la página física 24: confirmó las cinco consignas, signos y datos, y que las seis descripciones de regiones coinciden con la clave gráfica. Esta atribución no implica que quien escribió estos cálculos haya inspeccionado la página. Los cálculos siguientes se hicieron desde los datos de `evaluaciones/stewart/geometria.md`, sin tomar el dictamen del modelo como prueba. No constituyen revisión docente.

## Cálculos de las 18 tareas

- **1(a):** $y+5=-3(x-2)$, luego $y=-3x+1$; con $x=2$ da $-5$.
- **1(b):** una horizontal conserva la ordenada: $y=-5$.
- **1(c):** una vertical conserva la abscisa: $x=2$; su pendiente no está definida.
- **1(d):** $2x-4y=3$ equivale a $y=\frac12x-\frac34$. Con la misma pendiente por $(2,-5)$, $y+5=\frac12(x-2)$, es decir $y=\frac12x-6$ o $x-2y=12$. Comprobación: $2-2(-5)=12$.
- **2:** $r^2=(3+1)^2+(-2-4)^2=16+36=52$, por lo que $(x+1)^2+(y-4)^2=52$ y $r=2\sqrt{13}$.
- **3:** $x^2-6x+y^2+10y=-9$; completando cuadrados, $(x-3)^2+(y+5)^2=-9+9+25=25$. Centro $(3,-5)$, radio $5$.
- **4(a):** $\Delta x=5-(-7)=12$, $\Delta y=-12-4=-16$, luego $m=-16/12=-4/3$.
- **4(b):** $y-4=-\frac43(x+7)$ da $4x+3y+16=0$. Si $y=0$, $x=-4$; si $x=0$, $y=-16/3$. Verificación en $B$: $20-36+16=0$.
- **4(c):** $M=((-7+5)/2,(4-12)/2)=(-1,-4)$.
- **4(d):** $|AB|=\sqrt{12^2+(-16)^2}=\sqrt{400}=20$.
- **4(e):** la pendiente perpendicular es $3/4$ y debe pasar por $M$. Así $y+4=\frac34(x+1)$, equivalente a $3x-4y-13=0$; en $M$ la expresión vale $-3+16-13=0$.
- **4(f):** centro $M=(-1,-4)$ y radio $20/2=10$ dan $(x+1)^2+(y+4)^2=100$. Ambos extremos cumplen: $(-6)^2+8^2=6^2+(-8)^2=100$.
- **5(a):** $-1\le y\le3$ describe una franja sin límite horizontal; las rectas $y=-1$ y $y=3$ están incluidas. $(0,0)$ pertenece y $(0,4)$ no.
- **5(b):** $|x|<4$ y $|y|<2$ equivalen a $-4<x<4$, $-2<y<2$: interior rectangular sin lados ni vértices. $(0,0)$ pertenece; $(4,0)$ y $(4,2)$ no.
- **5(c):** la frontera $y=1-\frac12x$ pasa por $(0,1)$ y $(2,0)$, y no pertenece por la desigualdad estricta. $(0,0)$ cumple $0<1$: sombrear su lado, por debajo de la recta.
- **5(d):** la frontera $y=x^2-1$ tiene vértice $(0,-1)$ y cortes $(\pm1,0)$. Se incluye la parábola y la región por encima; $(0,0)$ pertenece y $(0,-2)$ no.
- **5(e):** $x^2+y^2<4=2^2$ significa distancia al origen menor que $2$: interior del círculo de radio $2$, sin circunferencia. $(0,0)$ pertenece, $(2,0)$ no.
- **5(f):** dividir por $144$ da $x^2/16+y^2/9=1$: elipse de semiejes $4$ y $3$, con cortes $(\pm4,0)$ y $(0,\pm3)$. La igualdad describe solo la curva, no el interior; el origen no satisface la ecuación.

## Correcciones detectadas en las propuestas

La comprobación de MiMo en 1(d) sustituye incorrectamente $-2(-5)$ por $12$ antes de sumar; el valor correcto es $10$. En 4(e) corresponde sustituir su texto de autocorrección por una verificación limpia. En 4(f), la atribución al teorema de Tales no es necesaria: el centro es el punto medio del diámetro por definición. En 5(b) los vértices son referencias excluidas; en 5(c) conviene identificar el lado que contiene al origen; en 5(f) no se sombrea el interior. Las breves de DeepSeek para 4(a)–(e) necesitan incluir la idea además del resultado. Las resoluciones integradas aplican estas correcciones, mantienen la explicación detallada y conservan los resultados verificados arriba.
