## Evaluaciones {#evaluaciones}

Este capítulo abre con el examen del Tema 1 de Mecánica de los Fluidos. Los enunciados son la transcripción literal del texto impreso de cada prueba; las resoluciones son elaboración docente y aparecen plegadas para que puedas intentar primero.

::: {.aviso}
**Cómo leer las pruebas.** Cada apartado empieza con el **enunciado original**, transcripto tal como está impreso, incluidos los puntajes y los errores de tipeo. Las **resoluciones** no están en el original: siguen las convenciones de todo el cuaderno ($g=9{,}80665\ \mathrm{m/s^2}$, presiones manométricas salvo indicación) y son una propuesta de respuesta completa, no la corrección oficial del docente.

**Qué no se publica.** No se incluyen las fotografías de las pruebas ni los datos personales que aparecen en ellas: nombre del alumno, letra manuscrita, marcas de corrección y calificaciones. El cuaderno conserva así su alcance: material de estudio, sin fotografías ni datos personales.
:::

::: {.aviso}
**Aclaración sobre el texto impreso.** Un detalle del original conviene tener presente antes de resolver:

1. En el examen del Tema 1, el enunciado imprime «contiene y aceite»: falta la palabra «agua». El esquema de la figura muestra las tres capas —aire, aceite y agua— y la resolución sigue esa lectura.

:::

### Examen — Tema 1 {#eval-tema-1}

Prueba de Mecánica de los Fluidos, Tema 1, del curso 5.º 1.ª. Contiene seis ejercicios: un tanque cerrado con aire, aceite y agua; cuatro preguntas de teoría (paradoja hidrostática, densidad y peso específico, propiedades de la presión hidrostática, presión); y un tanque abierto con dos líquidos.

**Figuras del original.** Los esquemas distinguen el tanque cerrado del primero y el tanque abierto del sexto ejercicio.

::: {.ejercicio #eval-tema-1-ej-1}
**Ejercicio 1 — Tanque cerrado con aire, aceite y agua** · [Capítulo 4](#cap-4)

**Enunciado original.**

El tanque cilíndrico de la imagen contiene y aceite (densidad relativa de 0,55), este se encuentra cerrado en su parte superior, allí hay aire con una presión de −4900 Pa. Determine:

**a)** La presión relativa en los puntos marcados en el gráfico. (10p)

**b)** La variación de presión entre los puntos 1-2 y 2-3. (10p)

**c)** Determine la presión absoluta del punto 1 en mca. (5p)

**d)** ¿Qué significa que la presión relativa del aire sea de −4900 Pa? (5p)

**e)** Peso contenido de aceite y del agua si el radio del tanque es de 1 metro. (10p)

**f)** Fuerza que actúa sobre el fondo del tanque (considerando presión relativa) y grafique cómo actúa sobre el mismo. (10p)

![Tanque cilíndrico cerrado, de radio 1 m: aire a −4900 Pa de presión relativa, aceite de densidad relativa 0,55 y espesor 0,55 m, y agua de espesor 0,70 m. Punto 1 en la interfaz aire–aceite, 2 en la interfaz aceite–agua y 3 en el fondo que recibe la fuerza.](graficos/eval-tema-1-tanque-cerrado.svg)
:::

::: {.resolucion}
**Datos y modelo.** El tanque es cilíndrico, de radio $R=1\ \mathrm{m}$, y está cerrado: el aire de arriba tiene una presión relativa $p_{aire}=-4900\ \mathrm{Pa}$ que se transmite a toda la superficie libre del aceite. La densidad relativa del aceite es $0{,}55$, así que

$$\rho_{aceite}=0{,}55\times 1000=550\ \mathrm{kg/m^3}.$$

Las alturas son $h_{aceite}=0{,}55\ \mathrm{m}$ y $h_{agua}=0{,}70\ \mathrm{m}$. La presión hidrostática se calcula sumando escalones, $\Delta p=\rho g h$, desde la superficie hacia abajo, porque dentro de un mismo líquido en reposo la presión depende solo de la profundidad.

**a) Presiones relativas en los tres puntos.**

El punto 1 está en la interfaz aire–aceite: como el aire pesa muy poco, todos sus puntos están a la misma presión, la de la superficie del aceite.

$$p_1=p_{aire}=-4900\ \mathrm{Pa}$$

Desde el punto 1 hasta el punto 2 se atraviesan $0{,}55\ \mathrm{m}$ de aceite:

$$p_2=p_1+\rho_{aceite}\,g\,h_{aceite}$$

con $\rho_{aceite}\,g\,h_{aceite}=550\times 9{,}80665\times 0{,}55=2966{,}5\ \mathrm{Pa}$, entonces

$$p_2=-4900+2966{,}5=-1933{,}5\ \mathrm{Pa}$$

Desde el punto 2 hasta el fondo, $0{,}70\ \mathrm{m}$ de agua:

$$p_3=p_2+\rho_{agua}\,g\,h_{agua}$$

con $\rho_{agua}\,g\,h_{agua}=1000\times 9{,}80665\times 0{,}70=6864{,}7\ \mathrm{Pa}$, entonces

$$p_3=-1933{,}5+6864{,}7=4931{,}2\ \mathrm{Pa}$$

| Punto | Situación | Presión relativa |
|---|---|---|
| 1 | interfaz aire–aceite | $-4900\ \mathrm{Pa}$ |
| 2 | interfaz aceite–agua | $-1933{,}5\ \mathrm{Pa}$ |
| 3 | fondo del tanque | $4931{,}2\ \mathrm{Pa}$ |

**b) Variación de presión entre puntos.**

$$\Delta p_{1\to 2}=p_2-p_1=2966{,}5\ \mathrm{Pa}\approx 2{,}97\ \mathrm{kPa}$$

$$\Delta p_{2\to 3}=p_3-p_2=6864{,}7\ \mathrm{Pa}\approx 6{,}86\ \mathrm{kPa}$$

En los dos tramos la presión **aumenta** al bajar, porque se agrega el peso de la columna de líquido. El segundo salto es mayor aunque el aceite es más liviano que el agua: el tramo de agua es más profundo y su densidad también es más grande.

**c) Presión absoluta del punto 1 en mca.**

La presión absoluta suma la atmosférica a la relativa. Con $p_{atm}=101\,325\ \mathrm{Pa}$:

$$p_{1,abs}=p_1+p_{atm}=-4900+101\,325=96\,425\ \mathrm{Pa}$$

El metro de columna de agua es la presión que ejerce $1\ \mathrm{m}$ de agua: $1\ \mathrm{mca}=\rho_{agua}g\times 1\ \mathrm{m}=9806{,}65\ \mathrm{Pa}$. Entonces

$$h=\frac{p_{1,abs}}{\rho_{agua}g}=\frac{96\,425}{9806{,}65}=9{,}83\ \mathrm{mca}.$$

El punto 1 está a una presión absoluta equivalente a la de $9{,}83\ \mathrm{m}$ de agua: menos de los $10{,}33\ \mathrm{mca}$ que corresponden a la atmósfera, porque adentro del tanque hay una depresión.

**d) Qué significa una presión relativa negativa.**

Significa que el aire del tanque está **por debajo** de la presión atmosférica: $4900\ \mathrm{Pa}$ menos, es decir unos $0{,}50\ \mathrm{mca}$ de depresión. No es una presión absoluta negativa —eso no existe—: es una comparación con la atmósfera. La presión absoluta del aire es $96\,425\ \mathrm{Pa}$, todavía positiva. En la práctica ese estado se consigue extrayendo aire del tanque; es la misma situación de un envase al vacío parcial.

**e) Peso del contenido.**

El volumen de cada capa es el de un cilindro, $V=\pi R^2 h$, y su peso es $W=\rho V g$.

Aceite:

$$V=\pi (1\ \mathrm{m})^2\times 0{,}55\ \mathrm{m}=1{,}7279\ \mathrm{m^3}$$

$$W_{aceite}=\rho V g=550\times 1{,}7279\times 9{,}80665=9319{,}7\ \mathrm{N}\approx 9{,}32\ \mathrm{kN}$$

Son $950{,}3\ \mathrm{kg}$ de aceite.

Agua:

$$V=\pi (1\ \mathrm{m})^2\times 0{,}70\ \mathrm{m}=2{,}1991\ \mathrm{m^3}$$

$$W_{agua}=\rho V g=1000\times 2{,}1991\times 9{,}80665=21\,565{,}4\ \mathrm{N}\approx 21{,}57\ \mathrm{kN}$$

Son $2199\ \mathrm{kg}$ de agua.

El contenido pesa en total $30{,}9\ \mathrm{kN}$; el agua aporta el 70 % del peso con solo $0{,}15\ \mathrm{m}$ más de altura, porque es casi el doble de densa que el aceite.

**f) Fuerza sobre el fondo.**

La presión en el fondo es la del punto 3 y actúa sobre toda la superficie, de área $A=\pi R^2=\pi (1\ \mathrm{m})^2=3{,}1416\ \mathrm{m^2}$:

$$F=p_3\,A=4931{,}2\times 3{,}1416=15\,492\ \mathrm{N}\approx 15{,}5\ \mathrm{kN}$$

La fuerza es perpendicular al fondo y apunta **hacia abajo**: el líquido empuja el fondo del tanque. Se calcula con la presión relativa porque la atmósfera también empuja el fondo desde afuera y se cancela.

**Comprobación.** La fuerza sobre el fondo ($15{,}5\ \mathrm{kN}$) es menor que el peso del contenido ($30{,}9\ \mathrm{kN}$). No hay contradicción: el tanque está cerrado y el aire de arriba está deprimido, así que tira hacia arriba del líquido; la diferencia la sostienen las paredes y la tapa.
:::

::: {.ejercicio #eval-tema-1-ej-2}
**Ejercicio 2 — La paradoja de la hidrostática** · [Capítulo 4](#cap-4)

**Enunciado original.** ¿Qué la paradoja de la hidrostática? Explique de forma completa fundamentando su respuesta. (10p)
:::

::: {.resolucion}
La llamada **paradoja hidrostática** es la aparente contradicción de que la fuerza que un líquido ejerce sobre el fondo de un recipiente no depende de la cantidad de líquido ni de la forma del recipiente, sino solo de la **profundidad** y del **área** del fondo.

Dos recipientes con la misma altura de líquido y el mismo fondo —uno ancho, uno angosto, uno cilíndrico, uno acampanado— reciben la misma fuerza sobre el fondo, aunque uno contenga diez veces más líquido que el otro. La clave es que la presión hidrostática solo depende de la profundidad, $p=\rho g h$, y la fuerza es esa presión por el área del fondo, $F=pA$.

**Por qué no es una paradoja.** El líquido no solo empuja hacia abajo: empuja perpendicular a **todas** las paredes. En un recipiente que se ensancha hacia arriba, las paredes inclinadas empujan el líquido hacia abajo y hacia adentro, y esa componente vertical se suma al peso: el fondo soporta más que el peso del líquido. En un recipiente que se angosta hacia arriba, las paredes reciben del líquido una fuerza hacia arriba, y el fondo soporta menos que el peso. El balance de fuerzas cierra siempre: peso del líquido, empuje de las paredes y reacción del fondo.

Pascal lo formuló como consecuencia del principio que lleva su nombre: la presión se transmite íntegra en todas las direcciones, así que la forma del recipiente no cambia la presión en un punto, solo la cantidad de superficie sobre la que actúa.
:::

::: {.ejercicio #eval-tema-1-ej-3}
**Ejercicio 3 — Densidad y peso específico** · [Capítulo 2](#cap-2)

**Enunciado original.** ¿Qué entendemos por densidad? Explique, de unidades de medida y expresión. Además responda, ¿cuál es la diferencia que presenta con el peso específico? (10p)
:::

::: {.resolucion}
La **densidad** (o densidad absoluta, o masa específica) es la masa de sustancia contenida en la unidad de volumen:

$$\rho=\frac{m}{V}.$$

En el Sistema Internacional se mide en $\mathrm{kg/m^3}$; también se usa $\mathrm{g/cm^3}$, con $1\ \mathrm{g/cm^3}=1000\ \mathrm{kg/m^3}$, y para los líquidos se suele dar la **densidad relativa** $\delta=\rho/\rho_{agua}$, que es un número sin unidades: el agua vale $1$ y el aceite del examen del Tema 1 vale $0{,}55$.

El **peso específico** es el peso por unidad de volumen:

$$\gamma=\frac{W}{V}=\frac{m g}{V}=\rho g.$$

Se mide en $\mathrm{N/m^3}$ (o $\mathrm{kgf/m^3}$ fuera del SI). La diferencia es la misma que hay entre masa y peso: la densidad es una propiedad del material y no cambia con el lugar; el peso específico incluye a $g$, así que cambia si cambia la gravedad. Por eso en la Luna la densidad de un líquido es la misma, pero su peso específico es seis veces menor.

Un ejemplo numérico con el aceite del ejercicio anterior: $\rho=550\ \mathrm{kg/m^3}$ y $\gamma=550\times 9{,}80665=5394\ \mathrm{N/m^3}$, que también se puede leer como $550\ \mathrm{kgf/m^3}$.
:::

::: {.ejercicio #eval-tema-1-ej-4}
**Ejercicio 4 — Propiedades de la presión hidrostática** · [Capítulo 4](#cap-4)

**Enunciado original.** Mencione y explique detalladamente dos (2) propiedades de la presión hidrostática. (10p)
:::

::: {.resolucion}
La presión hidrostática tiene cuatro propiedades clásicas; alcanza con dos, y estas son las más usadas:

**1.ª) En un punto, la presión actúa con la misma intensidad en todas las direcciones.** La presión no es un vector: no tiene una dirección propia. Lo que tiene dirección es la fuerza que la presión ejerce sobre una superficie, y esa fuerza es siempre perpendicular a la superficie. Si en un mismo punto del líquido se colocan membranas orientadas de distinta manera, la presión medida es la misma. De ahí que la fórmula $p=\rho g h$ no incluya ninguna dirección: solo profundidad.

**2.ª) La presión en un punto depende solo de la profundidad y del líquido, no de la forma del recipiente ni de la cantidad de líquido.** Dos puntos a la misma altura dentro del mismo líquido en reposo tienen la misma presión, estén en un recipiente ancho o angosto, cerca o lejos de las paredes. Aumenta linealmente con la profundidad ($\Delta p=\rho g h$), es perpendicular a las paredes y, como consecuencia del principio de Pascal, se transmite íntegra a todos los puntos del fluido. Esta es la propiedad que sostiene la prensa hidráulica y los vasos comunicantes.

**Las otras dos propiedades**, por si hace falta una respuesta más larga: la presión hidrostática es **proporcional a la densidad** del líquido ($p=\rho g h$), y en un líquido en reposo la **superficie libre es horizontal** —si hubiera desnivel, la diferencia de presión generaría movimiento—. La superficie libre sigue siendo horizontal en recipientes inclinados o comunicados entre sí.
:::

::: {.ejercicio #eval-tema-1-ej-5}
**Ejercicio 5 — Presión** · [Capítulo 3](#cap-3)

**Enunciado original.** ¿Qué entendemos por presión? Explique detalladamente y grafique de ser necesario. (10p)
:::

::: {.resolucion}
La **presión** es la fuerza que actúa perpendicularmente sobre cada unidad de área de una superficie:

$$p=\frac{F}{A}.$$

Su unidad en el SI es el **pascal**: $1\ \mathrm{Pa}=1\ \mathrm{N/m^2}$, una unidad muy chica (la atmósfera equivale a $101\,325\ \mathrm{Pa}$). Se usan también el $\mathrm{kPa}$ y, en la práctica, el bar ($1\ \mathrm{bar}=100\,000\ \mathrm{Pa}$), el $\mathrm{kgf/cm^2}$ ($1\ \mathrm{kgf/cm^2}=98\,066{,}5\ \mathrm{Pa}$) y el metro de columna de agua ($1\ \mathrm{mca}=9806{,}65\ \mathrm{Pa}$).

**Gráfico.** Se dibuja una superficie de área $A$ y una fuerza $F$ perpendicular a ella; la presión es el cociente. Si la fuerza no es perpendicular, solo cuenta su componente normal: una fuerza que «resbala» sobre la superficie no genera presión.

**Qué agrega la palabra «presión» en un fluido.** En los sólidos una fuerza se aplica en un punto; en un fluido el peso se reparte sobre toda la superficie y aparece una presión en cada punto. Por eso la misma fuerza produce presiones muy distintas según el área: una fuerza de $300\ \mathrm{N}$ sobre un émbolo de $40\ \mathrm{mm}$ de diámetro genera más de $200\ \mathrm{kPa}$, porque el área es de apenas $0{,}00126\ \mathrm{m^2}$.

**Presión atmosférica, relativa y absoluta.** La presión atmosférica es la que ejerce el aire sobre todo lo que está sumergido en él; al nivel del mar vale $101\,325\ \mathrm{Pa}$. La **presión absoluta** se mide desde el vacío y la **relativa** (o manométrica) desde la atmósfera: $p_{abs}=p_{rel}+p_{atm}$. Los instrumentos comunes —manómetros— leen la relativa, y por eso puede ser negativa, como el aire del tanque del ejercicio 1.
:::

::: {.ejercicio #eval-tema-1-ej-6}
**Ejercicio 6 — Tanque abierto con aceite y agua** · [Capítulo 4](#cap-4)

**Enunciado original.** El tanque de la imagen, contiene agua y aceite en su interior el cual tiene una densidad de $0{,}8\ \mathrm{g/cm^3}$. Determine: altura h del aceite si la presión relativa del fondo del tanque es de 80000 Pa. (10p)

![Tanque prismático abierto: aceite de densidad 0,8 g/cm³ y altura desconocida h desde la superficie libre hasta el agua; debajo, agua de 2,5 m de espesor. La presión relativa en el fondo es 80 000 Pa.](graficos/eval-tema-1-tanque-abierto.svg)

**Figura del original.** El esquema destaca la superficie libre y la altura incógnita del aceite.
:::

::: {.resolucion}
**Datos.** $\rho_{aceite}=0{,}8\ \mathrm{g/cm^3}=800\ \mathrm{kg/m^3}$; $\rho_{agua}=1000\ \mathrm{kg/m^3}$; $h_{agua}=2{,}5\ \mathrm{m}$; $p_{fondo}=80\,000\ \mathrm{Pa}$ relativa. El tanque está abierto, así que sobre el aceite la presión relativa es cero.

**Planteo.** La presión en el fondo es la suma de los dos escalones de líquido:

$$p_{fondo}=\rho_{aceite}\,g\,h+\rho_{agua}\,g\,h_{agua}.$$

**Despeje.**

$$80\,000=800\times 9{,}80665\times h+1000\times 9{,}80665\times 2{,}5$$

$$80\,000=7845{,}32\,h+24\,516{,}6$$

$$h=\frac{80\,000-24\,516{,}6}{7845{,}32}=\frac{55\,483{,}4}{7845{,}32}=7{,}07\ \mathrm{m}$$

La altura del aceite es $h\approx 7{,}07\ \mathrm{m}$: la capa de aceite es casi tres veces más alta que la de agua. Alcanza para el fondo porque el aceite es más liviano, pero no mucho: aporta $55{,}5\ \mathrm{kPa}$ de los $80\ \mathrm{kPa}$ con $7\ \mathrm{m}$, mientras que el agua aporta $24{,}5\ \mathrm{kPa}$ con solo $2{,}5\ \mathrm{m}$.

**Comprobación.** $800\times 9{,}80665\times 7{,}0722=55\,483\ \mathrm{Pa}$ y $1000\times 9{,}80665\times 2{,}5=24\,517\ \mathrm{Pa}$; la suma da $80\,000\ \mathrm{Pa}$. El esquema del original está dibujado a escala: la capa de aceite se ve claramente más alta que la de agua.
:::
