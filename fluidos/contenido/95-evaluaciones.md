## Evaluaciones {#evaluaciones}

Este capítulo reúne dos pruebas de Mecánica de los Fluidos del curso: el examen del Tema 1 y la Recuperación de Saberes de agosto. Cada apartado trae el enunciado y, plegada, una resolución docente para que puedas intentar primero.

### Examen — Tema 1 {#eval-tema-1}

Prueba de Mecánica de los Fluidos, Tema 1, del curso 5.º 1.ª. Contiene seis ejercicios: un tanque cerrado con aire, aceite y agua; cuatro preguntas de teoría (paradoja hidrostática, densidad y peso específico, propiedades de la presión hidrostática, presión); y un tanque abierto con dos líquidos.

::: {.ejercicio #eval-tema-1-ej-1}
**Ejercicio 1 — Tanque cerrado con aire, aceite y agua** · [Capítulo 4](#cap-4)

El tanque cilíndrico de la imagen contiene agua y aceite (densidad relativa de 0,55), este se encuentra cerrado en su parte superior, allí hay aire con una presión de −4900 Pa. Determine:

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

¿Qué la paradoja de la hidrostática? Explique de forma completa fundamentando su respuesta. (10p)
:::

::: {.resolucion}
La llamada **paradoja hidrostática** es la aparente contradicción de que la fuerza que un líquido ejerce sobre el fondo de un recipiente no depende de la cantidad de líquido ni de la forma del recipiente, sino solo de la **profundidad** y del **área** del fondo.

Dos recipientes con la misma altura de líquido y el mismo fondo —uno ancho, uno angosto, uno cilíndrico, uno acampanado— reciben la misma fuerza sobre el fondo, aunque uno contenga diez veces más líquido que el otro. La clave es que la presión hidrostática solo depende de la profundidad, $p=\rho g h$, y la fuerza es esa presión por el área del fondo, $F=pA$.

**Por qué no es una paradoja.** El líquido no solo empuja hacia abajo: empuja perpendicular a **todas** las paredes. En un recipiente que se ensancha hacia arriba, las paredes inclinadas empujan el líquido hacia abajo y hacia adentro, y esa componente vertical se suma al peso: el fondo soporta más que el peso del líquido. En un recipiente que se angosta hacia arriba, las paredes reciben del líquido una fuerza hacia arriba, y el fondo soporta menos que el peso. El balance de fuerzas cierra siempre: peso del líquido, empuje de las paredes y reacción del fondo.

Pascal lo formuló como consecuencia del principio que lleva su nombre: la presión se transmite íntegra en todas las direcciones, así que la forma del recipiente no cambia la presión en un punto, solo la cantidad de superficie sobre la que actúa.
:::

::: {.ejercicio #eval-tema-1-ej-3}
**Ejercicio 3 — Densidad y peso específico** · [Capítulo 2](#cap-2)

¿Qué entendemos por densidad? Explique, de unidades de medida y expresión. Además responda, ¿cuál es la diferencia que presenta con el peso específico? (10p)
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

Mencione y explique detalladamente dos (2) propiedades de la presión hidrostática. (10p)
:::

::: {.resolucion}
La presión hidrostática tiene cuatro propiedades clásicas; alcanza con dos, y estas son las más usadas:

**1.ª) En un punto, la presión actúa con la misma intensidad en todas las direcciones.** La presión no es un vector: no tiene una dirección propia. Lo que tiene dirección es la fuerza que la presión ejerce sobre una superficie, y esa fuerza es siempre perpendicular a la superficie. Si en un mismo punto del líquido se colocan membranas orientadas de distinta manera, la presión medida es la misma. De ahí que la fórmula $p=\rho g h$ no incluya ninguna dirección: solo profundidad.

**2.ª) La presión en un punto depende solo de la profundidad y del líquido, no de la forma del recipiente ni de la cantidad de líquido.** Dos puntos a la misma altura dentro del mismo líquido en reposo tienen la misma presión, estén en un recipiente ancho o angosto, cerca o lejos de las paredes. Aumenta linealmente con la profundidad ($\Delta p=\rho g h$), es perpendicular a las paredes y, como consecuencia del principio de Pascal, se transmite íntegra a todos los puntos del fluido. Esta es la propiedad que sostiene la prensa hidráulica y los vasos comunicantes.

**Las otras dos propiedades**, por si hace falta una respuesta más larga: la presión hidrostática es **proporcional a la densidad** del líquido ($p=\rho g h$), y en un líquido en reposo la **superficie libre es horizontal** —si hubiera desnivel, la diferencia de presión generaría movimiento—. La superficie libre sigue siendo horizontal en recipientes inclinados o comunicados entre sí.
:::

::: {.ejercicio #eval-tema-1-ej-5}
**Ejercicio 5 — Presión** · [Capítulo 3](#cap-3)

¿Qué entendemos por presión? Explique detalladamente y grafique de ser necesario. (10p)
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

El tanque de la imagen, contiene agua y aceite en su interior el cual tiene una densidad de $0{,}8\ \mathrm{g/cm^3}$. Determine: altura h del aceite si la presión relativa del fondo del tanque es de 80000 Pa. (10p)

![Tanque prismático abierto: aceite de densidad 0,8 g/cm³ y altura desconocida h desde la superficie libre hasta el agua; debajo, agua de 2,5 m de espesor. La presión relativa en el fondo es 80 000 Pa.](graficos/eval-tema-1-tanque-abierto.svg)

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

### Recuperación de Saberes — agosto {#eval-recuperacion}

Instancia de recuperación de saberes de Mecánica de los Fluidos, curso 5.º 1.ª. Cuatro ejercicios que recorren el programa: un recipiente con fluidos múltiples conectado a un manómetro, una balsa hueca, una prensa hidráulica y una pregunta de teoría sobre la presión hidrostática.

::: {.ejercicio #eval-recuperacion-ej-1}
**Ejercicio 1 — Recipiente con fluidos múltiples y manómetro** · [Capítulo 4](#cap-4)

Un recipiente con fluidos múltiples está conectado a un tubo para medir la presión. Para la densidad relativa y las alturas dadas, determine la presión manométrica en A (el tubo contiene glicerina). Además determine la ρ en A.

**a)** La presión del gas contenido en el interior del tanque. (5p)

**b)** La variación de presión entre el punto 1 y el fondo del tanque. (5p)

**c)** Presión absoluta del fondo del tanque en mca. (5p)

**d)** Fuerza que actúa sobre el fondo del tanque considerando que el mismo tiene un radio de 50 cm. (5p)

**e)** ¿Qué establece el teorema fundamental de la hidrostática? Explique detalladamente. (10p)

![Recipiente de cuello angosto con símbolo de superficie libre: gas de 80 cm, agua de 35 cm y glicerina de densidad relativa 1,26 y espesor 18 cm. Punto 1 en la interfaz gas–agua, 2 en la interfaz agua–glicerina y 3 en el fondo. A se ubica en la conexión al nivel del fondo; la columna de glicerina del tubo abierto sube 135 cm sobre esa conexión.](graficos/eval-recuperacion-manometro.svg)

::: {.aviso}
**Lectura del esquema.** El enunciado no marca el punto $A$ en el dibujo. La resolución lo ubica en la **conexión del tubo con el recipiente**, al nivel del fondo, que es donde el manómetro lee la presión del recipiente. Adopta además que el gas está encerrado a presión y que el tubo está abierto en su extremo superior: con esas dos condiciones la columna de $135\ \mathrm{cm}$ es la que sostiene la presión del fondo. Si el cuello del recipiente estuviera abierto a la atmósfera, el gas estaría a presión atmosférica y el nivel del manómetro no podría quedar $135\ \mathrm{cm}$ más alto: son datos incompatibles con el dibujo, y conviene decirlo al resolver.

La segunda pregunta, «determine la ρ en A», admite dos lecturas: la densidad del fluido en $A$ —glicerina, $1260\ \mathrm{kg/m^3}$, dato del enunciado— o la presión en $A$, que es lo que pide la primera parte. Las dos quedan respondidas abajo.
:::
:::

::: {.resolucion}
**Datos.** $\rho_{glicerina}=1{,}26\times 1000=1260\ \mathrm{kg/m^3}$; $\rho_{agua}=1000\ \mathrm{kg/m^3}$; $h_{agua}=35\ \mathrm{cm}=0{,}35\ \mathrm{m}$; $h_{gl}=18\ \mathrm{cm}=0{,}18\ \mathrm{m}$; columna manométrica $H=135\ \mathrm{cm}=1{,}35\ \mathrm{m}$; radio del fondo $r=0{,}50\ \mathrm{m}$.

**Presión manométrica en A.** En $A$, al nivel de la conexión, la presión del recipiente es la que sostiene la columna de glicerina del tubo, que está abierta a la atmósfera:

$$p_A=\rho_{glicerina}\,g\,H=1260\times 9{,}80665\times 1{,}35=16\,681\ \mathrm{Pa}\approx 16{,}7\ \mathrm{kPa},$$

es decir unos $1{,}7\ \mathrm{mca}$.

En $A$ la densidad es la de la glicerina: $\rho=1260\ \mathrm{kg/m^3}$, el mismo dato del enunciado.

**a) Presión del gas.** El gas está arriba de todo: se llega a él subiendo desde el fondo, y al subir la presión **disminuye**. Primero se atraviesan los $18\ \mathrm{cm}$ de glicerina del recipiente y después los $35\ \mathrm{cm}$ de agua:

$$p_{gas}=p_A-\rho_{gl}\,g\,h_{gl}-\rho_{agua}\,g\,h_{agua}$$

$$p_{gas}=16\,681-1260\times 9{,}80665\times 0{,}18-1000\times 9{,}80665\times 0{,}35$$

$$p_{gas}=16\,681-2224-3432=11\,025\ \mathrm{Pa}\approx 11{,}0\ \mathrm{kPa}.$$

El gas está unos $11\ \mathrm{kPa}$ por encima de la atmósfera: el recipiente está presurizado.

**b) Variación de presión entre el punto 1 y el fondo.** El punto 1 está en la interfaz gas–agua, a $0{,}53\ \mathrm{m}$ del fondo ($0{,}35+0{,}18$). Entre el punto 1 y el fondo hay agua y glicerina:

$$\Delta p=p_{fondo}-p_1=\rho_{agua}\,g\,h_{agua}+\rho_{gl}\,g\,h_{gl}$$

$$\Delta p=3432+2224=5656\ \mathrm{Pa}\approx 5{,}66\ \mathrm{kPa}.$$

Los $11{,}025\ \mathrm{kPa}$ del gas más estos $5{,}656\ \mathrm{kPa}$ dan los $16{,}681\ \mathrm{kPa}$ del fondo: el mismo camino, recorrido al revés.

**c) Presión absoluta del fondo en mca.**

$$p_{fondo,abs}=p_A+p_{atm}=16\,681+101\,325=118\,006\ \mathrm{Pa}$$

$$h_{mca}=\frac{118\,006}{9806{,}65}=12{,}03\ \mathrm{mca}.$$

Son unos $1{,}7\ \mathrm{mca}$ más que la atmósfera, que sola equivale a $10{,}33\ \mathrm{mca}$.

**d) Fuerza sobre el fondo.** El fondo tiene $r=0{,}50\ \mathrm{m}$, así que $A=\pi r^2=\pi(0{,}50)^2=0{,}7854\ \mathrm{m^2}$:

$$F=p_A\,A=16\,681\times 0{,}7854=13\,101\ \mathrm{N}\approx 13{,}1\ \mathrm{kN}.$$

Se usa la presión **relativa** porque la atmósfera empuja el fondo desde afuera y esa parte se cancela: la carga neta que debe resistir la estructura es el exceso. Con la presión absoluta saldría $92{,}7\ \mathrm{kN}$, un valor que cuenta dos veces la atmósfera.

**e) Teorema fundamental de la hidrostática.** Establece que la diferencia de presión entre dos puntos de un fluido en reposo es igual al peso específico del fluido por la diferencia de nivel entre ellos:

$$p_2-p_1=\rho g (h_1-h_2)=\gamma\,\Delta h.$$

Dicho de otro modo: en un líquido en reposo la presión en un punto es la de la superficie libre más el peso de la columna de líquido que hay encima, $p=p_0+\rho g h$. De ahí salen las consecuencias que usa todo el cuaderno: la presión **solo depende de la profundidad** y no de la forma del recipiente ni de la cantidad de líquido; **aumenta linealmente** con la profundidad; **dos puntos a la misma altura** en el mismo líquido tienen la misma presión, lo que explica los vasos comunicantes; y la presión se transmite íntegra a todo el fluido, que es el principio de Pascal y la base de la prensa hidráulica. La igualdad de presiones entre dos puntos del mismo líquido es la que permite leer un manómetro como el de este ejercicio.
:::

::: {.ejercicio #eval-recuperacion-ej-2}
**Ejercicio 2 — Balsa hueca** · [Capítulo 6](#cap-6)

Una balsa hueca con un largo de 2 m, un ancho de 1 m y una altura de 0,5 m. Posee una masa de 150 kg y suele cargarse para trasladar materiales a través del agua. Determine:

**a)** La altura de la balsa que permanece sumergida cuando se encuentra vacía. (5p)

**b)** Cuando está cargada con un peso de 200 kg, determine la nueva altura sumergida. (5p)

**c)** Densidad promedio de la balsa vacía. (10p)

**d)** ¿Qué principio permite calcular todo lo anterior? Explique detalladamente. (10p)

**e)** ¿Qué es el equilibrio inestable? Qué sucede con un cuerpo cuando sufre este fenómeno. (10p)

![Balsa rectangular hueca flotando en agua, de 2 m de largo, 1 m de ancho y 0,5 m de alto. La altura sumergida h va desde la superficie del agua hasta el fondo. Masa vacía 150 kg; carga 200 kg.](graficos/eval-recuperacion-balsa.svg)
:::

::: {.resolucion}
**Datos.** Largo $L=2\ \mathrm{m}$; ancho $b=1\ \mathrm{m}$; altura $H=0{,}5\ \mathrm{m}$; masa vacía $m=150\ \mathrm{kg}$; carga $m_c=200\ \mathrm{kg}$; $\rho_{agua}=1000\ \mathrm{kg/m^3}$. La superficie de flotación es $A=L\,b=2\ \mathrm{m^2}$ y el volumen exterior es $V_{ext}=L\,b\,H=2\times 1\times 0{,}5=1{,}00\ \mathrm{m^3}$.

**a) Altura sumergida vacía.** Flotando en equilibrio, el empuje iguala al peso. El empuje es el peso del agua desalojada, $E=\rho_{agua}\,g\,V_{sum}$, y el peso es $W=m g$, así que

$$V_{sum}=\frac{m}{\rho_{agua}}=\frac{150}{1000}=0{,}150\ \mathrm{m^3}.$$

El volumen sumergido es el de un prisma de base $A$ y altura $h$, $V_{sum}=A\,h$, entonces

$$h=\frac{V_{sum}}{A}=\frac{0{,}150}{2}=0{,}075\ \mathrm{m}=7{,}5\ \mathrm{cm}.$$

La balsa vacía se hunde $7{,}5\ \mathrm{cm}$ de sus $50\ \mathrm{cm}$: flota con el $85\ \mathrm{\%}$ del casco fuera del agua.

**b) Altura sumergida cargada.** Con $200\ \mathrm{kg}$ encima, la masa total es

$$m_{total}=150+200=350\ \mathrm{kg}\quad\Rightarrow\quad V_{sum}=\frac{350}{1000}=0{,}350\ \mathrm{m^3}$$

y entonces

$$h=\frac{0{,}350}{2}=0{,}175\ \mathrm{m}=17{,}5\ \mathrm{cm}.$$

El calado crece $10\ \mathrm{cm}$ al agregar $200\ \mathrm{kg}$: cada centímetro de calado adicional soporta $20\ \mathrm{kg}$, porque $A\times 1\ \mathrm{cm}=2\ \mathrm{m^2}\times 0{,}01\ \mathrm{m}=0{,}02\ \mathrm{m^3}$, que son $20\ \mathrm{kg}$ de agua.

**c) Densidad promedio de la balsa vacía.** Se toma el volumen exterior completo, que incluye el aire de adentro:

$$\rho_{prom}=\frac{m}{V_{ext}}=\frac{150}{1{,}00}=150\ \mathrm{kg/m^3}.$$

Es $0{,}15$ veces la del agua, coherente con que se hunda el $15\ \mathrm{\%}$ de su altura. La densidad promedio es la que decide si un cuerpo flota, y el cociente $\rho_{cuerpo}/\rho_{agua}$ es directamente la fracción de volumen sumergida.

**d) Principio que explica todo lo anterior.** El **principio de Arquímedes**: todo cuerpo sumergido en un fluido recibe un empuje vertical hacia arriba igual al peso del fluido desalojado,

$$E=\rho_{fluido}\,g\,V_{sumergido}.$$

El empuje crece con el volumen sumergido: la balsa se hunde hasta que el empuje iguala su peso total y ahí se detiene. Por eso hay exactamente una altura de flotación para cada carga, y por eso un cuerpo más denso que el agua se hunde: no hay volumen sumergido que alcance a igualar su peso. La densidad del líquido también importa: la misma balsa cala menos en agua de mar ($1025\ \mathrm{kg/m^3}$) que en agua dulce.

**e) Equilibrio inestable.** Un cuerpo flotante está en **equilibrio estable** cuando, al inclinarlo un poco, el par de fuerzas lo devuelve a su posición; está en **equilibrio inestable** cuando el par lo aleja cada vez más hasta volcarlo. El criterio práctico compara dos puntos: el **centro de gravedad** $G$, donde se aplica el peso, y el **metacentro** $M$, por donde pasa la recta de acción del empuje cuando el cuerpo se inclina. Si $M$ queda por encima de $G$, el cuerpo se endereza; si queda por debajo, vuelca.

En un cuerpo que sufre este fenómeno una escora pequeña no se corrige: el peso y el empuje quedan desalineados de modo que el par sigue inclinándolo, y el cuerpo gira hasta encontrar otra posición de flotación, ahora estable. Un pontón con la carga alta y mal centrada es el caso típico: sube el centro de gravedad, baja el metacentro y el equilibrio se vuelve inestable.
:::

::: {.ejercicio #eval-recuperacion-ej-3}
**Ejercicio 3 — Prensa hidráulica de émbolos macizos** · [Capítulo 5](#cap-5)

Una prensa hidráulica está formada por dos émbolos cilíndricos macizos de acero. El émbolo 1 posee un diámetro de 20 mm y una altura de 60 mm con una carrera máxima de 100 mm. Mientras que el émbolo 2 un diámetro de 120 mm con una altura de 100 mm. Considerando que la densidad del acero es de 7850 kg/m³ y se aplica una fuerza en el émbolo 1 de 400 N. Determine la carga máxima que puede levantar la prensa. (20p)
:::

::: {.resolucion}
**Datos.** $D_1=20\ \mathrm{mm}=0{,}020\ \mathrm{m}$; $L_1=60\ \mathrm{mm}=0{,}060\ \mathrm{m}$; carrera $s_1=100\ \mathrm{mm}$; $D_2=120\ \mathrm{mm}=0{,}120\ \mathrm{m}$; $L_2=100\ \mathrm{mm}=0{,}100\ \mathrm{m}$; $\rho_{acero}=7850\ \mathrm{kg/m^3}$; $F_1=400\ \mathrm{N}$.

$$A_1=\frac{\pi(0{,}020)^2}{4}=3{,}1416\times 10^{-4}\ \mathrm{m^2}$$

$$A_2=\frac{\pi(0{,}120)^2}{4}=1{,}1310\times 10^{-2}\ \mathrm{m^2}$$

**Peso de cada émbolo.** Con $V=A\,L$:

$$V_1=3{,}1416\times 10^{-4}\times 0{,}060=1{,}8850\times 10^{-5}\ \mathrm{m^3}$$

$$W_1=7850\times 1{,}8850\times 10^{-5}\times 9{,}80665=1{,}45\ \mathrm{N}$$

$$V_2=1{,}1310\times 10^{-2}\times 0{,}100=1{,}1310\times 10^{-3}\ \mathrm{m^3}$$

$$W_2=7850\times 1{,}1310\times 10^{-3}\times 9{,}80665=87{,}1\ \mathrm{N}$$

**Presión transmitida.** La genera la fuerza aplicada más el peso del émbolo 1:

$$p=\frac{F_1+W_1}{A_1}$$

$$p=\frac{400+1{,}45}{3{,}1416\times 10^{-4}}=\frac{401{,}45}{3{,}1416\times 10^{-4}}=1\,277\,900\ \mathrm{Pa}\approx 1{,}28\ \mathrm{MPa}.$$

**Fuerza sobre el émbolo 2.** Se transmite la misma presión y el área es $36$ veces mayor, porque $(120/20)^2=36$:

$$F_2=p\,A_2=1\,277\,900\times 1{,}1310\times 10^{-2}=14\,452\ \mathrm{N}\approx 14{,}45\ \mathrm{kN}.$$

**Carga máxima.** Restando el peso del propio émbolo 2:

$$F_{util}=F_2-W_2=14\,452-87=14\,365\ \mathrm{N}\approx 14{,}4\ \mathrm{kN},$$

que son unos $1465\ \mathrm{kgf}$.

La prensa levanta unos **$14{,}4\ \mathrm{kN}$**, cerca de $1{,}5$ toneladas con una fuerza de $400\ \mathrm{N}$. El recorrido se reduce en el mismo factor: con la carrera de $100\ \mathrm{mm}$ del émbolo 1, el émbolo 2 sube $100/36=2{,}8\ \mathrm{mm}$. En esta prensa los pesos de los émbolos casi no cambian el resultado —juntos son menos del $0{,}1\ \mathrm{\%}$ de la fuerza transmitida—, pero el cálculo del ejercicio pide tenerlos en cuenta.
:::

::: {.ejercicio #eval-recuperacion-ej-4}
**Ejercicio 4 — Presión hidrostática y sus propiedades** · [Capítulo 4](#cap-4)

¿Qué es la presión hidrostática? Defina 2 características o propiedades de la misma. (10p)
:::

::: {.resolucion}
La **presión hidrostática** es la que ejerce un fluido en reposo en cada punto de su interior y sobre las superficies en contacto con él. Nace del peso del fluido: a profundidad $h$ bajo la superficie libre vale $p=\rho g h$ (relativa) o $p=p_0+\rho g h$ (absoluta). Se mide en pascal y, en la práctica, en $\mathrm{kPa}$, en $\mathrm{kgf/cm^2}$ o en metros de columna de agua.

Las dos propiedades que conviene escribir con más detalle:

**1.ª) En un punto actúa con la misma intensidad en todas las direcciones.** La presión no es un vector y no tiene dirección propia; lo que tiene dirección es la fuerza que ejerce sobre una superficie, y esa fuerza es siempre perpendicular a la superficie, sea el fondo o una pared inclinada. Por eso la fórmula $p=\rho g h$ no contiene ninguna dirección.

**2.ª) Depende solo de la profundidad y de la densidad del líquido.** En el mismo líquido en reposo, dos puntos a la misma altura tienen la misma presión, sin importar la forma del recipiente ni cuánto líquido haya a los costados. La presión crece linealmente con la profundidad y la superficie libre resulta horizontal porque, si no lo fuera, el desnivel generaría movimiento.

Dos consecuencias que se usan en los otros ejercicios: la presión se transmite íntegra a todo el fluido (principio de Pascal, base de la prensa hidráulica) y el metro de columna de agua resulta de esta misma fórmula: $1\ \mathrm{mca}=1000\times 9{,}80665\times 1=9806{,}65\ \mathrm{Pa}$.
:::
