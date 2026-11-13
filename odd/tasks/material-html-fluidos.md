# Material HTML de Mecánica de los Fluidos

Recurso educativo en HTML sobre mecánica de los fluidos, construido a partir de los apuntes corregidos y los ejercicios ya auditados, reorganizado para estudio autónomo y con las convenciones del material de matemática. Sin fotografías ni datos personales.

## Specs

S1. Objetivo y alcance: «Quiero crear material educativo de Mecánica de los Fluidos en HTML dentro de este proyecto.»

S2. Forma: «Debe seguir el estilo y la forma de uso del material de matemática ya implementado en el repositorio.» Base verificada: `teoria/index.html` con `teoria/teoria.css` y `teoria/lectura.js` (fuentes del sistema, MathML nativo con anotación TeX, índice pegajoso en `<details>`, sin recursos remotos, lectura funcional sin JS, estilos de impresión); `evaluaciones/tp2.html` reutiliza esa hoja y ese script y suma suplemento propio.

S3. Propósito: «Preparar un recurso ordenado y fácil de estudiar, con teoría clara y ejercicios de aplicación cuando los haya.»

S4. Revisión previa obligatoria: «Antes de implementar, revisá cómo están construidos los materiales existentes, especialmente teoria/index.html y evaluaciones/tp2.html, y seguí sus convenciones visuales, de navegación y de uso sin conexión cuando correspondan.»

S5. Prioridades, en este orden:
1. «Exactitud física y consistencia pedagógica.»
2. «Explicaciones progresivas y comprensibles para estudiantes.»
3. «Relación clara entre cada concepto y sus ejercicios de aplicación.»
4. «Fórmulas, unidades y cálculos correctos.»
5. «Un formato HTML cómodo de leer en el navegador.»

S6. Libertad de reorganización: «Las fotografías y sus transcripciones son material auxiliar descartable: no busco fidelidad literal ni más rondas de revisión de las fotos. Podés reorganizar y corregir las explicaciones para mejorar el aprendizaje.»

S7. Datos faltantes: «Si algún dato de un ejercicio no alcanza para resolverlo, indicalo o explicá las hipótesis utilizadas.»

S8. Entrega y comprobación: «Implementá el material y comprobá su funcionamiento visual y los cálculos pertinentes. No publiques las fotografías ni datos personales.»

S9. Alcance separado del issue cerrado: «Fe de errata El issue #22 fue cerrado; el material HTML se trabajará por separado».

S10. Límite de alcance: «El contenido se debe atener a lo que está en las imágenes de origen». El cuaderno no incorpora temas, fórmulas, unidades, instrumentos ni ejercicios que no provengan de las transcripciones. La libertad de S6 alcanza a la organización y la redacción, no a ampliar el temario: si un desarrollo no está en el apunte, no entra.

## Tasks

- T1 — Teoría en siete capítulos progresivos, con definiciones, unidades, fórmulas y criterios de uso. Specs: S1, S3, S5, S6. Ruta: inline (parent). Commit: `b79aee0`.
- T2 — Ejercicios por capítulo, con datos, hipótesis explícitas y resolución plegable; condicionales marcados y fragmentos irresolubles listados. Specs: S3, S5, S7. Ruta: inline (parent). Commit: `b79aee0`.
- T3 — Pipeline de generación con las convenciones de `teoria/` y `tp2` (generador, plantilla, suplemento CSS, README, comprobador de navegador). Specs: S2, S4. Ruta: worker (gentle-ai-worker). Commit: `b79aee0`.
- T4 — Pruebas estructurales del HTML generado (MathML, anclas, enlaces locales, impresión, frescura del artefacto). Specs: S2, S4, S8. Ruta: worker (gentle-ai-worker). Commit: `b79aee0`.
- T5 — Verificación reproducible de los cálculos publicados y cotejo con `revision/calculos.py`. Specs: S5, S7, S8. Ruta: inline (parent). Commit: `cf6e647`.
- T6 — Comprobación visual en navegador (1280 y 390 px), corrección de defectos hallados y verificación independiente. Specs: S5, S8. Ruta: inline (parent) + `gentle-ai-verify`. Commits: `77274c3`, `b8475dd`.
- T7 — Enlaces desde `README.md`, metadatos de los SVG sin rutas de fotos y capturas fuera de Git. Specs: S8, S9. Ruta: inline (parent). Commits: `7156f18`, `b8475dd`.
- T8 — Auditar el material publicado contra las transcripciones y marcar todo lo que exceda el alcance. Specs: S10, S6. Ruta: explorer (auditoría) + inline (ajuste). Commits: `061e5e5` (local), PR #26.

## Log

L1. Pedido del usuario, verbatim:

> Quiero crear material educativo de Mecánica de los Fluidos en HTML dentro de este proyecto.
>
>    Objetivo:
>    Preparar un recurso ordenado y fácil de estudiar, con teoría clara y ejercicios de aplicación cuando los haya.
>  Debe seguir el estilo y la forma de uso del material de matemática ya implementado en el repositorio.
>
>    Punto de partida:
>    - resultado/apuntes_corregidos.md
>    - resultado/ejercicios_resueltos.md
>    - revision/errores_detectados.md
>    - transcripciones/, si necesitás consultar algún detalle de los apuntes
>
>    Antes de implementar, revisá cómo están construidos los materiales existentes, especialmente teoria/index.html y evaluaciones/tp2.html, y seguí sus convenciones visuales, de navegación y de uso sin conexión cuando correspondan.
>
>    Prioridades:
>    1. Exactitud física y consistencia pedagógica.
>    2. Explicaciones progresivas y comprensibles para estudiantes.
>    3. Relación clara entre cada concepto y sus ejercicios de aplicación.
>    4. Fórmulas, unidades y cálculos correctos.
>    5. Un formato HTML cómodo de leer en el navegador.
>
>    Las fotografías y sus transcripciones son material auxiliar descartable: no busco fidelidad literal ni más rondas de revisión de las fotos. Podés reorganizar y corregir las explicaciones para mejorar el aprendizaje. Si algún dato de un ejercicio no alcanza para resolverlo, indicalo o explicá las hipótesis utilizadas.
>
>    Implementá el material y comprobá su funcionamiento visual y los cálculos pertinentes. No publiques las fotografías ni datos personales. Fe de errata El issue #22 fue cerrado; el material HTML se trabajará por separado

L2. Reconocimiento read-only: `teoria/index.html` y `evaluaciones/tp2.html` comparten `teoria/teoria.css` y `teoria/lectura.js`; `tp2` se genera con `pandoc` mediante `evaluaciones/generar_tp2.py` y se comprueba con `evaluaciones/comprobar_tp2.mjs` (Chromium local). Toolchain presente: pandoc 3.11, node 26.13, python 3.14, Chromium del sistema y Playwright chromium-1228. Rama actual `hidroestatica`.

L3. Material fuente disponible y auditado: `resultado/apuntes_corregidos.md` (7 núcleos), `resultado/ejercicios_resueltos.md` (15 desarrollos), `revision/errores_detectados.md` (28 observaciones), `diagramas/*.svg` (8 esquemas reconstruidos). Privacidad: `imagenes/originales/`, fotos procesadas y recortes privados quedan fuera del material publicado; este documento no los enlaza.

L4. Decisión de arquitectura: material nuevo en `fluidos/` con markdown editable + generador + plantilla, reutilizando `teoria/teoria.css` y `teoria/lectura.js` como hace `tp2`, y suplemento `fluidos/fluidos.css`. Los esquemas se referencian desde `../diagramas/`; no se duplican ni se publican fotografías.

L5. Contenido redactado en `fluidos/contenido/`: siete capítulos (estados y cohesión; densidad y peso específico; presión; presión hidrostática; Pascal y prensa; empuje y flotación; estabilidad) más `90-ejercicios.md`. Total: 17 ejercicios, cada uno con capítulo de origen, datos, consigna, resolución plegable y, cuando el apunte no alcanza, hipótesis explícita. Los ejercicios conservan las lecturas alternativas del manuscrito (2600/2800 kg en la prensa; 2000/3000 kgf/m³ en la tercera capa) y una sección final lista los fragmentos irresolubles en lugar de inventar datos. Se añadió un formulario y una tabla de respuestas.
L6. Pipeline: `fluidos/generar.py` (Pandoc → MathML, un artículo por `##`, índice `<details>` construido desde los ids generados, `.resolucion` a `<details>` nativo, validación de recursos locales, `--check`), `fluidos/plantilla.html`, `fluidos/fluidos.css` y `fluidos/README.md`; `fluidos/comprobar_navegador.mjs` y `tests/test_fluidos_html.py` como capa de comprobación. Reutiliza `teoria/teoria.css` y `teoria/lectura.js` con rutas relativas, igual que `evaluaciones/tp2.html`. Ajustes del padre tras ver el render: columnas de tabla según contenido, resolución adherida a su ejercicio, lámina clara para los SVG (trazos azul marino ilegibles sobre fondo oscuro) y corrección de los glifos faltantes U+20D7 en `diagramas/11.svg` y `diagramas/12.svg`.

L7 — Verificación y correcciones. El verificador independiente encontró seis defectos reales que las pruebas propias no cubrían: (a) la afirmación de que invertir dos capas de igual espesor cambia la presión en el fondo, que es falsa porque solo se suma $\gamma_1h_1+\gamma_2h_2$; (b) el ejercicio 12 pedía «la altura que sube» y calculaba el desnivel, que no es lo mismo sin las áreas de cada rama; (c) la nota del ejercicio 9 decía que interpretar 700 y 1000 como densidades cambia el resultado, cuando ambos caminos coinciden si se usan de forma coherente; (d) la regla práctica del capítulo 7 atribuía a los cuerpos sumergidos una mejora por ensanchar la base, que no interviene en ese criterio; (e) el pie de `11.svg` enumeraba los casos en un orden distinto al del dibujo; (f) la figura `12.svg` no dibuja los tres cuerpos con el mismo volumen, como afirmaba el texto. Además, las figuras quedaban ilegibles a 390 px y los SVG publicados conservaban rutas y nombres de fotografías en sus metadatos. Se corrigieron los seis textos, las figuras se desplazan en horizontal por debajo de 700 px, los metadatos nombran la reconstrucción y no la foto, y se agregó `tests/test_fluidos_figuras.py` para que ninguna figura publicada vuelva a exponer material fotográfico. Las pruebas pasaron de 24 a 27.

L8 — Unidades y límites de entrega. Estrategia de entrega: cadena de ramas (`feature-branch-chain`), sin push ni PR por decisión pendiente del usuario. Unidades locales sobre `hidroestatica`: `b79aee0` cuaderno y pipeline; `cf6e647` verificación de cálculos; `6abb592` glifos de los SVG; `7156f18` enlace desde el índice; `5ea53e8` correcciones de redacción; `77274c3` figuras en pantallas angostas; `b8475dd` metadatos y prueba de figuras. La unidad inicial supera las 400 líneas por el contenido didáctico (≈1000 líneas de Markdown) y el HTML generado (1274 líneas), que no se revisa a mano. La rama hereda el commit previo `8c3d443`, ajeno a esta tarea: no debe incluirse en una PR sin decisión humana. Los recortes privados no rastreados y el documento `apuntes-fluidos.md` modificado quedaron intactos y fuera de los commits.

L9 — Segunda corrección de estabilidad. La primera corrección de la regla práctica introdujo un error nuevo: atribuía a «bajar el centro de gravedad» un aumento de $BM$, cuando $BM=I/V$ solo depende de la geometría de flotación. Lo que baja es $BG$. La regla ahora separa los dos caminos —ensanchar la base sube $BM$; bajar $G$ reduce $BG$— y `tests/test_fluidos_calculos.py` fija esa distinción. Total: 28 pruebas.

L10 — Publicación. El usuario decidió publicar solo el cuaderno, sus esquemas y las pruebas, con merge a `main` y Pages, y autorizó crear el issue de respaldo. Se creó el issue [#23](https://github.com/Teksi75/clases-analisis-matematico/issues/23) con `status:approved` y `type:feature`; la rama pública `docs/cuaderno-fluidos-html` partió de `origin/main` (`46b2855`), no de `hidroestatica`, para no arrastrar el commit ajeno `8c3d443` ni material fotográfico. El pie de `fluidos/index.html` dejó de enlazar `resultado/` y `revision/`: esos documentos no se publican, y el generador valida que todo enlace local exista. PR [#24](https://github.com/Teksi75/clases-analisis-matematico/pull/24) con una etiqueta `type:feature`, squash a `main` en `44c98f9`. Pages sirve el cuaderno en https://teksi75.github.io/clases-analisis-matematico/fluidos/index.html con el mismo SHA-256 que el archivo local verificado (`4be52cb2…`); CSS, lectura.js y los ocho SVG responden 200. La rama privada `hidroestatica` no se pusheó y conserva las fotos, las transcripciones y los documentos de trabajo.

L11 — Límite de alcance del contenido. El usuario corrigió la propuesta de próximos pasos: «sobre los próximos pasos... El contenido se debe atener a lo que está en las imágenes de origen». Queda sin efecto la idea de ampliar a hidrodinámica, viscosidad o Bernoulli: el cuaderno se limita a lo que las transcripciones sostienen. La libertad pedagógica de S6 sigue vigente para ordenar, ejemplificar y corregir, no para agregar temario. Se abre T8 para auditar lo ya publicado contra las imágenes y decidir, con el humano, qué se retira o se marca como extensión.

L12 — Marcado en lugar de recorte. La auditoría contra las imágenes clasificó el material en presente, reformulación y extensión, y encontró seis grupos ajenos al apunte: metacentro y altura metacéntrica con todo el ejercicio 17 b, trabajo y energía en la prensa con el ejemplo de 10 cm, barómetro y manómetro en U, unidades que el apunte no usa (`bar`, `kgf/cm²`, `atm`, `133,322 Pa/mmHg`), propiedades añadidas en el capítulo 1 y consignas docentes en los ejercicios 1 y 17. El usuario decidió: «No quites pero dejalo marcado como material adicional opcional». Se implementó un bloque `ampliacion` con borde punteado y rótulo «Ampliación · no está en el apunte», más una nota de apertura que explica que son opcionales. La regla de estabilidad de un cuerpo totalmente sumergido quedó fuera de los recuadros porque sí es temario del apunte. Nuevas pruebas en `tests/test_fluidos_alcance.py`: 32 en total, 106 en la suite completa. Publicado por PR [#26](https://github.com/Teksi75/clases-analisis-matematico/pull/26) con el issue [#25](https://github.com/Teksi75/clases-analisis-matematico/issues/25) aprobado.

L13 — Excepción de alcance y cierre. El usuario decidió no marcar la sección «Presión no es fuerza» del capítulo 3 (clavo y raquetas), aunque la auditoría la clasificó como ajena al apunte: «haremos una exepción con la sección "Presión es fuerza" dejala como está. y cerramos hilo y rama si es necesario». Queda como excepción deliberada y el hilo de esquemas no debe "corregirla": si se retoma el tema, se consulta antes. Con esto cierra la unidad de publicación: el cuaderno está en `main` y en Pages, las ramas de trabajo están mergeadas y eliminadas, y la rama privada `hidroestatica` se conserva local sin pushear porque guarda fotografías, transcripciones y documentos de trabajo.

L14 — Cola de mejoras en issues. El usuario pidió no ejecutar las mejoras ahora, sino dejarlas como issues para tomarlas de a una o dos sin arriesgar el sitio publicado: «crea los issues para agregar lo que pide el prompt así puedo retomarlos de a uno o dos sin que corra peligro el resto de la web». Se creó la etiqueta `mejoras` y tres issues con `status:approved` y `type:feature`: [#27](https://github.com/Teksi75/clases-analisis-matematico/issues/27) primera tanda de esquemas, [#28](https://github.com/Teksi75/clases-analisis-matematico/issues/28) ampliaciones colapsables y fuera de la impresión, [#29](https://github.com/Teksi75/clases-analisis-matematico/issues/29) segunda tanda de esquemas. El hilo nuevo se abre con «Atendamos los issues de mejoras». En #28 queda registrada la ambigüedad de «bloquear la posibilidad de impresión»: se interpretó como excluir las ampliaciones de la impresión, manteniendo imprimible el apunte, y el issue pide corregir el alcance si la intención era deshabilitar toda impresión. `main` ya contiene todo lo publicado (`59e7b61`) y no hay cambios pendientes que pushear; la rama `hidroestatica` sigue siendo privada y no publicable.
