## Trabajo Práctico N.º 1 {#trabajo-practico}

Este capítulo publica el Trabajo Práctico N.º 1 de Mecánica de los Fluidos, la tercera prueba escrita del curso, que se suma por separado al capítulo de evaluaciones. El práctico propone dos ejercicios sobre los temas centrales de la hidrostática: una prensa hidráulica con el peso propio de los émbolos, la carrera y el tope; y el empuje sobre un pontón de chapa de acero que transporta materiales por una laguna.

Los enunciados son la transcripción literal del texto impreso de las dos hojas. Las resoluciones son elaboración docente y aparecen plegadas, para que puedas intentar cada ítem antes de abrirlas.

::: {.aviso}
**Cómo leer esta prueba.** Las resoluciones siguen las convenciones de todo el cuaderno: $g=9{,}80665\ \mathrm{m/s^2}$, densidades en kg/m³ y presiones manométricas salvo indicación. No son la corrección oficial del curso, sino una propuesta de respuesta completa. El práctico no reparte puntajes, así que el capítulo no los agrega.

**Qué no se publica.** No se incluyen las fotografías del original ni los datos personales que lleva impresos: nombre del alumno, letra manuscrita, marcas de corrección y calificación. Se transcribe solo el texto impreso.
:::

::: {.aviso}
**Aclaraciones sobre el texto impreso.** Tres marcas del original conviene tener presentes antes de resolver:

1. Entre los ítems D y E del ejercicio 1 quedó impreso un «2.» suelto, resto de una renumeración del listado. No es un ítem: la serie sigue con E y F.
2. El ítem F no formula una pregunta, sino que describe lo que ocurre cuando el émbolo 1 llega a su tope. La consigna real está en el párrafo siguiente, sin numerar, y es la que pide la presión hidrostática del aceite. Los dos se transcriben como están impresos.
3. El encabezado de la hoja no indica curso, a diferencia de los dos exámenes del capítulo de evaluaciones. El capítulo no lo completa por suposición.

:::

### Ejercicio 1 — Prensa hidráulica {#tp-1-prensa}

La hoja encabeza «Temas a desarrollar: Prensa hidráulica / Empuje» y abre la lista de ejercicios con una prensa de dos émbolos macizos de acero. El ejercicio pide el peso de cada émbolo, la presión transmitida, la fuerza y la carga útil, el recorrido y, con el émbolo 1 contra el tope, la presión hidrostática que aparece por la diferencia de nivel.

**Figuras del original.** La hoja dibuja la prensa de perfil: los dos cilindros unidos por el conducto del aceite, el émbolo 1 a la izquierda con la fuerza que baja, el émbolo 2 a la derecha, los diámetros, las longitudes y el tope que limita la carrera.

::: {.ejercicio #tp-1-ej-1}
**Ejercicio 1 — Prensa hidráulica de dos émbolos macizos** · [Capítulo 5](#cap-5) · [Capítulo 4](#cap-4)

**Enunciado original.**

Una prensa hidráulica está compuesta por dos émbolos cilíndricos macizos fabricados en acero y conectados mediante un fluido incompresible.

El émbolo 1 (de accionamiento) tiene un diámetro de 40 mm, una longitud de 100 mm y una carrera máxima de 150 mm, limitada por un tope físico. El émbolo 2 (de elevación) tiene un diámetro de 200 mm y una longitud de 120 mm. Ambos émbolos están construidos en acero cuya densidad es de 7850 kg/m³.

Sobre el émbolo 1, un operario aplica una fuerza vertical de 300 N para accionar la prensa. Determine:

**A)** Calcular el peso de cada émbolo.

**B)** Calcular la presión transmitida considerando la fuerza aplicada y el peso propio del émbolo 1.

**C)** Determinar la fuerza desarrollada por el émbolo 2.

**D)** Calcular la carga máxima útil que puede levantar la prensa, teniendo en cuenta el peso del propio émbolo 2.

**E)** Si el émbolo 1 posee una carrera máxima de 150 mm, determinar cuánto se elevará la carga ubicada sobre el émbolo 2.

**F)** Al llegar el émbolo 1 a su tope mecánico, éste descendió 150 mm mientras que el émbolo 2 ascendió la distancia calculada anteriormente.

Considerando que el fluido hidráulico tiene una densidad de 900 kg/m³, calcular la presión hidrostática asociada a la diferencia de nivel entre ambos émbolos.

![Prensa de perfil: émbolo 1 de 40 mm de diámetro y 100 mm de longitud, con carrera máxima de 150 mm limitada por un tope y una fuerza de 300 N hacia abajo; émbolo 2 de 200 mm de diámetro y 120 mm de longitud; aceite de 900 kg/m³ entre los dos. El émbolo 1 se dibuja también en su posición de tope, 150 mm más abajo.](graficos/tp-1-prensa.svg)
:::

::: {.resolucion}
**Datos y modelo.** Los dos émbolos son cilindros macizos de acero, así que cada uno pesa lo que pesa su volumen de acero. El fluido es incompresible y está encerrado entre los dos: la presión que se genera en la cara del émbolo 1 se transmite íntegra a la cara del émbolo 2 (principio de Pascal), y el volumen que baja uno es el que sube el otro.

$$D_1=40\ \mathrm{mm}=0{,}040\ \mathrm{m}\quad L_1=100\ \mathrm{mm}=0{,}100\ \mathrm{m}\quad s_1=150\ \mathrm{mm}=0{,}150\ \mathrm{m}$$

$$D_2=200\ \mathrm{mm}=0{,}200\ \mathrm{m}\quad L_2=120\ \mathrm{mm}=0{,}120\ \mathrm{m}$$

$$\rho_{acero}=7850\ \mathrm{kg/m^3}\quad \rho_{aceite}=900\ \mathrm{kg/m^3}\quad F_1=300\ \mathrm{N}$$

Las áreas de las caras:

$$A_1=\frac{\pi D_1^2}{4}=\frac{\pi(0{,}040)^2}{4}=1{,}2566\times 10^{-3}\ \mathrm{m^2}$$

$$A_2=\frac{\pi D_2^2}{4}=\frac{\pi(0{,}200)^2}{4}=3{,}1416\times 10^{-2}\ \mathrm{m^2}$$

La relación entre las dos áreas es la que multiplica la fuerza y divide el recorrido:

$$\frac{A_2}{A_1}=\left(\frac{D_2}{D_1}\right)^2=\left(\frac{200}{40}\right)^2=25.$$

**A) Peso de cada émbolo.** Con $V=A\,L$ para cada cilindro y $W=\rho_{acero}\,V\,g$:

$$V_1=1{,}2566\times 10^{-3}\times 0{,}100=1{,}2566\times 10^{-4}\ \mathrm{m^3}$$

$$W_1=7850\times 1{,}2566\times 10^{-4}\times 9{,}80665=9{,}67\ \mathrm{N}$$

$$V_2=3{,}1416\times 10^{-2}\times 0{,}120=3{,}7699\times 10^{-3}\ \mathrm{m^3}$$

$$W_2=7850\times 3{,}7699\times 10^{-3}\times 9{,}80665=290{,}2\ \mathrm{N}$$

El émbolo grande pesa treinta veces más que el chico, porque su volumen crece con el cuadrado del diámetro y con la longitud: $W_2/W_1=30{,}0$.

**B) Presión transmitida.** El fluido soporta la fuerza del operario **y** el peso del émbolo 1, repartidos sobre el área chica:

$$p=\frac{F_1+W_1}{A_1}=\frac{300+9{,}67}{1{,}2566\times 10^{-3}}=\frac{309{,}67}{1{,}2566\times 10^{-3}}=246\,430\ \mathrm{Pa}\approx 246{,}4\ \mathrm{kPa}.$$

Es una presión de trabajo de unos $2{,}5$ atmósferas por encima de la atmosférica.

**C) Fuerza desarrollada por el émbolo 2.** La misma presión actúa sobre un área 25 veces mayor:

$$F_2=p\,A_2=246\,430\times 3{,}1416\times 10^{-2}=7742\ \mathrm{N}\approx 7{,}74\ \mathrm{kN}.$$

O, sin pasar por la presión, $F_2=25\,(F_1+W_1)=25\times 309{,}67=7742\ \mathrm{N}$.

**D) Carga máxima útil.** El émbolo 2 tiene que levantar la carga **y** su propio peso, así que la carga útil es la fuerza desarrollada menos el peso del émbolo:

$$F_{util}=F_2-W_2=7742-290{,}2=7452\ \mathrm{N}\approx 7{,}45\ \mathrm{kN},$$

que equivalen a

$$m_{util}=\frac{7452}{9{,}80665}=760\ \mathrm{kg}.$$

Con $300\ \mathrm{N}$ de entrada la prensa levanta unos $760\ \mathrm{kg}$: la ganancia práctica es de $25$ en fuerza, apenas descontado el peso propio del émbolo grande. Descontar $W_2$ importa más que descontar $W_1$: los $290\ \mathrm{N}$ del émbolo 2 son el $3{,}7\ \mathrm{\%}$ de $F_2$, mientras que los $9{,}67\ \mathrm{N}$ del émbolo 1 son el $3{,}2\ \mathrm{\%}$ de la fuerza aplicada.

**E) Elevación del émbolo 2.** El aceite es incompresible: el volumen que deja libre el émbolo 1 es el que ocupa el émbolo 2.

$$A_1\,s_1=A_2\,s_2\quad\Rightarrow\quad s_2=s_1\,\frac{A_1}{A_2}=\frac{150\ \mathrm{mm}}{25}=6\ \mathrm{mm}.$$

La prensa multiplica la fuerza por 25 y divide el recorrido por 25: lo que se gana en fuerza se paga en camino. Con la carrera completa, la carga sube solo $6\ \mathrm{mm}$.

**F) Presión hidrostática por la diferencia de nivel.** Cuando el émbolo 1 baja $150\ \mathrm{mm}$, el émbolo 2 sube $6\ \mathrm{mm}$; las dos caras, que estaban al mismo nivel, quedan separadas por la suma de los dos movimientos:

$$\Delta h=150\ \mathrm{mm}+6\ \mathrm{mm}=156\ \mathrm{mm}=0{,}156\ \mathrm{m}.$$

En el aceite, esa diferencia de nivel es una diferencia de presión hidrostática:

$$\Delta p=\rho_{aceite}\,g\,\Delta h=900\times 9{,}80665\times 0{,}156=1376{,}8\ \mathrm{Pa}\approx 1{,}38\ \mathrm{kPa}.$$

Es pequeña comparada con los $246\ \mathrm{kPa}$ de trabajo, pero no es cero: la cara del émbolo 1 queda **más abajo** y soporta esa presión extra, que se suma a la que genera el operario. El tope mecánico no cambia el resultado, solo limita el descenso a $150\ \mathrm{mm}$.

**Qué enseña el ejercicio.** La prensa no crea energía: multiplica la fuerza por el cociente de las áreas y divide el recorrido por ese mismo cociente. El peso propio de los émbolos entra en el balance —los $290\ \mathrm{N}$ del émbolo mayor se restan de la carga útil— y la carrera, que parece un detalle de fabricación, reaparece al final como una diferencia de nivel que se traduce en presión hidrostática.
:::

### Ejercicio 2 — Empuje sobre un pontón {#tp-1-ponton}

El segundo tema del práctico: un pontón metálico hueco y cerrado flota en una laguna de agua dulce. El enunciado está en la primera hoja y sus veinte consignas, de la A a la T, en la segunda.

**Figuras del original.** La hoja trae una vista en perspectiva del pontón, con el aire adentro y la línea del agua, y dos secciones —transversal y longitudinal— que dan las dimensiones interiores y el espesor de la chapa.

::: {.ejercicio #tp-1-ej-2}
**Ejercicio 2 — Pontón de chapa de acero sobre una laguna** · [Capítulo 6](#cap-6) · [Capítulo 2](#cap-2)

**Enunciado original.**

Una empresa utiliza un pontón metálico (investigue qué es si lo desconoce) para transportar materiales de construcción a través de una laguna. El pontón tiene forma de prisma rectangular hueco y está construido con chapas de acero con un espesor de 5 mm. Su interior se encuentra lleno de aire y completamente cerrado para impedir el ingreso de agua.

Las dimensiones exteriores del pontón son:

- Largo: 4,00 m
- Ancho: 2,00 m
- Altura: 1,00 m

Y las características de los materiales involucrados son:

- Densidad del acero: 7850 kg/m³
- Densidad del aire: 1,2 kg/m³
- Densidad del agua dulce: 1000 kg/m³
- Densidad del agua de mar: 1025 kg/m³

Determine:

**A)** Determinar las dimensiones interiores del pontón.

**B)** Calcular el volumen exterior del pontón.

**C)** Calcular el volumen interior del pontón.

**D)** Determinar el volumen de acero utilizado para construir el pontón.

**E)** Calcular la masa del acero.

**F)** Calcular la masa del aire contenido en el interior.

**G)** Determinar la masa total del pontón considerando el acero y el aire interior.

**H)** Calcular el peso total del pontón.

**I)** Determinar el empuje que actúa sobre el pontón cuando flota en equilibrio.

**J)** Calcular el volumen de agua desplazado por el pontón en esa condición.

**K)** Determinar la altura del pontón que permanece sumergida cuando se encuentra vacío.

**L)** Calcular qué porcentaje de la altura total del pontón se encuentra sumergido.

**M)** Determinar el volumen máximo de agua que podría desplazar el pontón antes de que el borde superior alcance el nivel de la superficie del agua.

**N)** Calcular el empuje máximo que podría desarrollar el agua sobre el pontón en esa condición.

**O)** Determinar el peso máximo total que podría soportar el pontón sin hundirse.

**P)** Calcular la carga útil máxima que puede transportar.

**Q)** Expresar la carga útil máxima en kilogramos.

**R)** Durante una operación de transporte se cargan 3000 kg de arena sobre el pontón. Determinar:

- **a.** La masa total del sistema.
- **b.** El peso total del sistema.
- **c.** El empuje necesario para mantener el equilibrio.
- **d.** El volumen de agua desplazado.
- **e.** La nueva altura sumergida del pontón.

**S)** Calcular la distancia entre la superficie del agua y el borde superior del pontón luego de cargar los 3000 kg de arena.

**T)** Si el pontón se trasladara a una zona de agua de mar, determinar si se hundiría más o menos que en agua dulce y justificar la respuesta mediante el Principio de Arquímedes.

![Pontón de 4,00 m de largo, 2,00 m de ancho y 1,00 m de alto exterior, con chapa de acero de 5 mm y el interior lleno de aire, flotando parcialmente sumergido: la altura sumergida h va de la superficie del agua al fondo. La sección transversal muestra el interior de 1,99 m por 0,99 m.](graficos/tp-1-ponton.svg)
:::

::: {.resolucion}
**Datos y modelo.** El pontón es una caja de chapa: un prisma exterior de $4{,}00\times 2{,}00\times 1{,}00\ \mathrm{m}$ con paredes de $5\ \mathrm{mm}$ y un interior hueco lleno de aire. Todo lo que hace falta sale de tres ideas: el volumen del acero es el volumen exterior menos el interior, la masa es densidad por volumen, y en flotación el empuje iguala al peso (principio de Arquímedes).

$$L=4{,}00\ \mathrm{m}\quad a=2{,}00\ \mathrm{m}\quad H=1{,}00\ \mathrm{m}\quad e=5\ \mathrm{mm}=0{,}005\ \mathrm{m}$$

$$\rho_{acero}=7850\ \mathrm{kg/m^3}\quad \rho_{aire}=1{,}2\ \mathrm{kg/m^3}\quad \rho_{agua}=1000\ \mathrm{kg/m^3}\quad \rho_{mar}=1025\ \mathrm{kg/m^3}$$

**A) Dimensiones interiores.** El espesor se descuenta dos veces en cada dirección, porque la chapa está en las dos caras opuestas:

$$L_i=L-2e=4{,}00-0{,}010=3{,}99\ \mathrm{m}$$

$$a_i=a-2e=2{,}00-0{,}010=1{,}99\ \mathrm{m}$$

$$H_i=H-2e=1{,}00-0{,}010=0{,}99\ \mathrm{m}$$

**B) Volumen exterior.** Es el prisma de las dimensiones de afuera:

$$V_{ext}=L\,a\,H=4{,}00\times 2{,}00\times 1{,}00=8{,}000\ \mathrm{m^3}.$$

**C) Volumen interior.** El que ocupa el aire:

$$V_{int}=L_i\,a_i\,H_i=3{,}99\times 1{,}99\times 0{,}99=7{,}861\ \mathrm{m^3}.$$

**D) Volumen de acero.** La chapa es la cáscara, así que es la diferencia:

$$V_{acero}=V_{ext}-V_{int}=8{,}000-7{,}861=0{,}139\ \mathrm{m^3}.$$

**E) Masa del acero.**

$$m_{acero}=\rho_{acero}\,V_{acero}=7850\times 0{,}1393=1093{,}5\ \mathrm{kg}\approx 1{,}09\ \mathrm{t}.$$

**F) Masa del aire.** El aire pesa, aunque poco: en el volumen interior hay

$$m_{aire}=\rho_{aire}\,V_{int}=1{,}2\times 7{,}861=9{,}4\ \mathrm{kg}.$$

**G) Masa total.** Acero más aire:

$$m_{total}=m_{acero}+m_{aire}=1093{,}5+9{,}4=1102{,}9\ \mathrm{kg}.$$

**H) Peso total.**

$$W_{total}=m_{total}\,g=1102{,}9\times 9{,}80665=10\,816\ \mathrm{N}\approx 10{,}8\ \mathrm{kN}.$$

**I) Empuje en equilibrio.** Si flota sin aceleración, el empuje del agua iguala al peso:

$$E=W_{total}=10\,816\ \mathrm{N}.$$

**J) Volumen de agua desplazado.** Por Arquímedes, $E=\rho_{agua}\,g\,V_{despl}$:

$$V_{despl}=\frac{E}{\rho_{agua}\,g}=\frac{10\,816}{1000\times 9{,}80665}=1{,}103\ \mathrm{m^3}.$$

Como era de esperar, es el volumen de un agua cuya masa es la del pontón: $1102{,}9\ \mathrm{kg}$.

**K) Altura sumergida con el pontón vacío.** El volumen sumergido es el de una tajada de base $L\,a$:

$$h_{sum}=\frac{V_{despl}}{L\,a}=\frac{1{,}103}{4{,}00\times 2{,}00}=0{,}138\ \mathrm{m}\approx 138\ \mathrm{mm}.$$

**L) Porcentaje de la altura sumergido.**

$$\frac{h_{sum}}{H}=\frac{0{,}138}{1{,}00}=13{,}8\ \mathrm{\%}.$$

El pontón vacío flota muy alto, porque la chapa es delgada y la mayor parte de su volumen es aire: apenas una séptima parte del casco queda bajo el agua.

**M) Volumen máximo antes de que entre agua.** El borde superior toca la superficie justo cuando todo el volumen exterior está sumergido:

$$V_{max}=V_{ext}=8{,}000\ \mathrm{m^3}.$$

**N) Empuje máximo.** En esa condición el agua empuja con todo el volumen:

$$E_{max}=\rho_{agua}\,g\,V_{max}=1000\times 9{,}80665\times 8{,}000=78\,453\ \mathrm{N}\approx 78{,}45\ \mathrm{kN}.$$

**O) Peso máximo total sin hundirse.** Otra vez el equilibrio: $W_{max}=E_{max}=78\,453\ \mathrm{N}$, que son $8000\ \mathrm{kg}$.

**P) Carga útil máxima.** Lo que se puede apoyar encima es el peso máximo menos el peso del pontón:

$$W_{util}=E_{max}-W_{total}=78\,453-10\,816=67\,637\ \mathrm{N}\approx 67{,}64\ \mathrm{kN}.$$

**Q) Carga útil máxima en kilogramos.**

$$m_{util}=\frac{W_{util}}{g}=\frac{67\,637}{9{,}80665}=6897\ \mathrm{kg}\approx 6{,}90\ \mathrm{t}.$$

**R) Con 3000 kg de arena encima.** La arena es masa que se suma a la del pontón; el aire ya estaba contado.

- **a. Masa total del sistema.** $m=1102{,}9+3000=4102{,}9\ \mathrm{kg}$.
- **b. Peso total del sistema.** $W=4102{,}9\times 9{,}80665=40\,236\ \mathrm{N}\approx 40{,}24\ \mathrm{kN}$.
- **c. Empuje necesario.** Para flotar en equilibrio, $E=W=40\,236\ \mathrm{N}$.
- **d. Volumen de agua desplazado.** $V_{despl}=\dfrac{40\,236}{1000\times 9{,}80665}=4{,}103\ \mathrm{m^3}$.
- **e. Nueva altura sumergida.** $h_{sum}=\dfrac{4{,}103}{4{,}00\times 2{,}00}=0{,}513\ \mathrm{m}\approx 513\ \mathrm{mm}$.

La carga útil de $6897\ \mathrm{kg}$ deja lugar de sobra para los $3000\ \mathrm{kg}$ de arena: el pontón no solo no se hunde, sino que sigue flotando con más de la mitad del casco fuera del agua.

**S) Distancia al borde superior.** El francobordo es lo que queda entre la superficie del agua y el borde:

$$d=H-h_{sum}=1{,}000-0{,}513=0{,}487\ \mathrm{m}\approx 487\ \mathrm{mm}.$$

**T) En agua de mar.** El agua de mar es más densa ($1025$ contra $1000\ \mathrm{kg/m^3}$), así que para sostener el mismo peso hace falta menos volumen:

$$V_{mar}=\frac{m_{total}}{\rho_{mar}}=\frac{4102{,}9}{1025}=4{,}003\ \mathrm{m^3}$$

$$h_{mar}=\frac{4{,}003}{8{,}000}=0{,}500\ \mathrm{m},$$

es decir, unos $13\ \mathrm{mm}$ menos que en agua dulce: **el pontón se hundiría menos**, y el francobordo subiría de $0{,}487$ a $0{,}500\ \mathrm{m}$. El principio de Arquímedes lo explica: el empuje depende del peso del líquido desalojado, y el agua de mar pesa más por litro, así que se necesita desalojar menos volumen para igualar el peso del pontón. Un barco que baja de un río al mar sube, no baja.

**Síntesis de resultados.**

| Ítem | Resultado |
|---|---|
| A | $3{,}99\ \mathrm{m}\times 1{,}99\ \mathrm{m}\times 0{,}99\ \mathrm{m}$ |
| B | $8{,}000\ \mathrm{m^3}$ |
| C | $7{,}861\ \mathrm{m^3}$ |
| D | $0{,}139\ \mathrm{m^3}$ |
| E | $1093{,}5\ \mathrm{kg}$ |
| F | $9{,}4\ \mathrm{kg}$ |
| G | $1102{,}9\ \mathrm{kg}$ |
| H | $10{,}82\ \mathrm{kN}$ |
| I | $10{,}82\ \mathrm{kN}$ |
| J | $1{,}103\ \mathrm{m^3}$ |
| K | $0{,}138\ \mathrm{m}$ |
| L | $13{,}8\ \mathrm{\%}$ |
| M | $8{,}000\ \mathrm{m^3}$ |
| N | $78{,}45\ \mathrm{kN}$ |
| O | $78{,}45\ \mathrm{kN}$ |
| P | $67{,}64\ \mathrm{kN}$ |
| Q | $6897\ \mathrm{kg}$ |
| R | $4102{,}9\ \mathrm{kg}$; $40{,}24\ \mathrm{kN}$; $40{,}24\ \mathrm{kN}$; $4{,}103\ \mathrm{m^3}$; $0{,}513\ \mathrm{m}$ |
| S | $0{,}487\ \mathrm{m}$ |
| T | se hunde menos: $0{,}500\ \mathrm{m}$ frente a $0{,}513\ \mathrm{m}$ |

**Qué enseña el ejercicio.** Un cuerpo hueco y cerrado no flota por el material con que está hecho, sino por el volumen de agua que desaloja. El casco de acero pesa más de una tonelada y sin embargo flota, porque el aire de adentro le da un volumen enorme a cambio de casi nada de masa. La cuenta completa tiene tres pasos que se repiten en cualquier embarcación: cuánto pesa lo construido, cuánto volumen puede desplazar como máximo, y qué margen queda entre esos dos números. Los $3000\ \mathrm{kg}$ de arena son el margen en acción; el agua de mar es la misma cuenta con otra densidad.
:::
