# Digitalización de apuntes de fluidos

Objetivo: transcripción verificable y revisión técnica de las fotografías. Rama: `hidroestatica`.
Entrega: `chain_strategy=feature-branch-chain` (elegida por el usuario); verificación: inspección visual y cálculos deterministas. Pronóstico: más de 400 líneas de documentación.

## Specs

- S1: «Localiza todas las imágenes.» «Registra nombre, dimensiones y hash SHA-256.» «No elimines ni modifiques ningún original.»
- S2: «Guardar todas las transformaciones en `imagenes/procesadas/`.» «Evitar filtros agresivos que puedan borrar trazos tenues, puntos decimales, exponentes o signos matemáticos.»
- S3: «Procesar cada imagen individualmente.» «No debes inventar textos, fórmulas, resultados ni ejercicios que no estén presentes en las imágenes.» «No corregir todavía los errores del estudiante.»
- S4: «Determinar el orden más probable»; «Si no existe evidencia suficiente para asegurar una secuencia, señalar la incertidumbre en lugar de inventar un orden.»
- S5: «Una vez finalizada la transcripción fiel, realizar una revisión independiente de Física.» «Para los errores numéricos, rehacer los cálculos utilizando Python o una herramienta de cálculo determinista.»
- S6: «Cuando sea posible, reconstruirlos como SVG o diagramas vectoriales.» «No introducir elementos ausentes del original sin identificarlos como añadidos explicativos.»
- S7: «Antes de finalizar, realizar una segunda inspección visual de cada fotografía comparándola con su transcripción.» «Ninguna página sin procesar.» «Ningún ejercicio omitido.»
- S8: «el material de las fotos es material descartable sirve solamente para producir el contenido del html, no se necesita fidelidad absoluta, lo que se necesita es consitencia pedagógica.» «hacer más revisiones o cuidar la privacidad es algo secundario en este caso.»
- S9: «primera revisón visual aprobada. ahora cerremos hilo haz commit PRs y push si es necesario para seguir en otro hilo hacia el resultado final: material ordenado con su parte teórica y sus ejercicios de aplicación (si los hay) en un formato html como hemos implementado el material de matemática.»

## Tasks

- [x] T1 — S1: Inventario y detección preliminar de duplicados; inline; 12 JPEG, SHA-256 sin duplicados exactos; recortes parciales entre grupos no descartados; commit `124738f`.
- [x] T2a — S2-S3: Transcripciones 01-04; workers y cotejo; commit `169732f`.
- [x] T2b — S2-S3: Transcripciones 05-08; workers y cotejo; commits `169732f`, `05da834`.
- [x] T2c — S2-S3: Transcripciones 09-12; workers y cotejo; commit `05da834`.
- [x] T3 — S4, S7: Segunda inspección de las 12 fotos, orden incierto y consolidado; exploradores e inline; commit `6ccd511`.
- [x] T4a — S5: Auditoría independiente y cálculos, Python código 0; verificador e inline; commit `abace13`.
- [x] T4b1 — S6: Diagramas 02, 05, 06 y 07; worker, renderizado y cotejo del padre; commit `82b1572`.
- [x] T4b2 — S6: Diagramas 08, 10, 11 y 12; worker, renderizado y cotejo del padre; commit `82b1572`.
- [x] T5 — S5-S7: Entregables corregidos y auditoría final; inline; commit `abace13`; cierre de seguimiento en el commit siguiente.
- [x] T6a — S8: Localizar datos personales en imágenes, textos, metadatos e historial; tres exploradores y revisión puntual; sin mutar originales.
- [x] T6b — S8: Preparar copia pública anonimizada en historial nuevo, sin modificar originales; inline; 12 PNG y derivados regenerados, controles propios sin errores; commit pendiente.
- [-] T6c — S8: Verificación independiente de las copias fotográficas retirada del cierre actual por cambio de prioridad; el segundo intento quedó UNVERIFIED, sin aprobación para publicar fotos.
- [-] T6d — S9: Publicar la cadena de copias fotográficas retirada del cierre actual por cambio de prioridad; no se publicó ninguna rama ni PR.

## Log

### L1 — Pedido original

las imagenes están en la carpeta [ruta local redactada]/ sigue las intruccionesdel siguiente prompt # Proyecto: Digitalización y reconstrucción de apuntes de Mecánica de los Fluidos

## Objetivo

Reconstruir fielmente un conjunto de aproximadamente 12 páginas manuscritas de Física correspondientes a la unidad **Mecánica de los Fluidos**, utilizando las fotografías almacenadas en el directorio `imagenes/originales/`.

El proyecto debe producir una transcripción completa, ordenada y verificable, además de una versión corregida y pedagógicamente organizada.

**Prioridad absoluta: fidelidad a los documentos originales.**

No debes inventar textos, fórmulas, resultados ni ejercicios que no estén presentes en las imágenes.

## Contexto conocido

Las fotografías corresponden a apuntes escolares sobre hidrostática.

Se han identificado los siguientes contenidos:

1. Cohesión y estados de la materia.
2. Densidad: masa por unidad de volumen.
3. Densidad relativa y densidad compuesta.
4. Peso específico.
5. Presión: definición, unidades y fuerza normal.
6. Presión hidrostática y sus propiedades.
7. Relación entre profundidad y presión hidrostática.
8. Paradoja hidrostática.
9. Teorema fundamental de la hidrostática.
10. Presión absoluta, relativa y atmosférica.
11. Unidades de presión: Pa, kgf/m², mmHg y mca.
12. Principio de Pascal y prensa hidráulica.
13. Principio de Arquímedes.
14. Empuje y peso aparente.
15. Flotación y cuerpos sumergidos.
16. Equilibrio estable, inestable e indiferente.

Los documentos incluyen ejercicios sobre tanques cilíndricos, recipientes cúbicos, esferas de cobre, líquidos superpuestos, prensas hidráulicas y un cubo de hielo flotando en agua.

Este índice es orientativo y NO debe utilizarse para completar automáticamente información que no pueda verificarse en las fotografías.

## Fase 1. Inventario

1. Localiza todas las imágenes.
2. Identifica su formato, resolución y orientación.
3. Registra nombre, dimensiones y hash SHA-256.
4. Detecta duplicados exactos mediante hash.
5. Detecta posibles duplicados visuales, incluso si las imágenes están rotadas o recortadas.
6. No elimines ni modifiques ningún original.
7. Crea `revision/inventario.md`.

## Fase 2. Preparación de las imágenes

Cuando sea necesario:

- Corregir rotación y perspectiva.
- Ajustar contraste y luminosidad.
- Reducir sombras.
- Recortar márgenes irrelevantes.
- Ampliar regiones difíciles de interpretar.

Guardar todas las transformaciones en `imagenes/procesadas/`.

Nunca sobrescribir los originales.

Evitar filtros agresivos que puedan borrar trazos tenues, puntos decimales, exponentes o signos matemáticos.

## Fase 3. Reconocimiento y transcripción

Usar preferentemente un modelo multimodal con capacidad de visión para interpretar la escritura manuscrita, las expresiones matemáticas y los diagramas.

Se pueden utilizar herramientas OCR auxiliares, pero sus resultados deben contrastarse con las imágenes.

Procesar cada imagen individualmente.

Para cada página:

1. Identificar fecha, título y subtítulos.
2. Transcribir el texto completo en su orden de lectura.
3. Reconstruir las ecuaciones en LaTeX.
4. Conservar los datos numéricos, símbolos y unidades originales.
5. Describir los diagramas y las referencias geométricas.
6. Mantener los ejercicios con sus enunciados, operaciones y resultados.
7. Registrar tachaduras que afecten al significado.
8. Identificar fragmentos ilegibles o ambiguos.
9. No corregir todavía los errores del estudiante.

Guardar cada transcripción como un archivo Markdown independiente.

Para fragmentos ambiguos, utilizar:

`[LECTURA INCIERTA: alternativa A / alternativa B]`

Para fragmentos que no puedan recuperarse:

`[ILEGIBLE]`

Registrar también el nombre de la imagen y la región aproximada correspondiente.

No completar una frase basándose únicamente en que parezca lógica desde el punto de vista de la Física.

## Fase 4. Ordenamiento

Las fotografías pueden estar desordenadas.

Determinar el orden más probable considerando:

- Fechas manuscritas.
- Numeración de actividades.
- Continuidad de los ejercicios.
- Desarrollo conceptual.
- Fórmulas que continúan en otra página.
- Correspondencia entre diagramas y texto.

Distinguir entre:

1. Orden cronológico probable de las clases.
2. Orden físico o documental de las páginas.
3. Orden pedagógico recomendado.

Si no existe evidencia suficiente para asegurar una secuencia, señalar la incertidumbre en lugar de inventar un orden.

Guardar el resultado en `revision/orden_paginas.md`, con una tabla que relacione los nombres originales con el orden propuesto.

## Fase 5. Validación técnica

Una vez finalizada la transcripción fiel, realizar una revisión independiente de Física.

Verificar:

- Definiciones conceptuales.
- Diferencia entre masa y peso.
- Densidad y peso específico.
- Coherencia dimensional.
- Conversión de unidades.
- Uso de kg, kgf, N y Pa.
- Cálculo de áreas y volúmenes.
- Presión hidrostática.
- Principio de Pascal.
- Principio de Arquímedes.
- Equilibrio de flotación.
- Resultados numéricos.

Clasificar cada problema como:

- Error de transcripción.
- Error conceptual del apunte.
- Error de cálculo.
- Error de unidades.
- Dato insuficiente.
- Interpretación ambigua.

Para los errores numéricos, rehacer los cálculos utilizando Python o una herramienta de cálculo determinista.

No modificar la transcripción original para corregir los errores.

Documentar cada corrección indicando la página, la expresión original, el problema encontrado y la solución justificada.

## Fase 6. Reconstrucción de diagramas

Analizar los esquemas originales.

Cuando sea posible, reconstruirlos como SVG o diagramas vectoriales.

Priorizar la fidelidad geométrica y conceptual.

Conservar:

- Posición relativa de los objetos.
- Niveles de líquidos.
- Profundidades.
- Sentidos de las fuerzas.
- Puntos identificados.
- Dimensiones y símbolos.

No introducir elementos ausentes del original sin identificarlos como añadidos explicativos.

## Fase 7. Entregables

Generar:

**A. `resultado/apuntes_originales.md`**

Transcripción fiel y completa de los apuntes, organizada según el orden documental reconstruido.

**B. `resultado/apuntes_corregidos.md`**

Versión técnicamente corregida, ordenada por temas y adecuada para estudiar.

**C. `resultado/ejercicios_resueltos.md`**

Recopilación de todos los ejercicios encontrados, con datos, fórmulas, procedimiento, resultados corregidos y unidades.

**D. `revision/errores_detectados.md`**

Auditoría de errores conceptuales, matemáticos y dimensionales.

**E. `revision/dudas_ocr.md`**

Fragmentos pendientes de verificación, indicando el archivo y la región correspondiente.

## Criterios de calidad

- Ninguna página sin procesar.
- Ningún ejercicio omitido.
- Toda fórmula debe estar asociada a su imagen de origen.
- Todas las incertidumbres deben declararse.
- Las correcciones deben permanecer separadas de la transcripción original.
- Los resultados matemáticos deben verificarse.
- Los originales deben permanecer intactos.

Antes de finalizar, realizar una segunda inspección visual de cada fotografía comparándola con su transcripción.

No declarar completada una página mientras existan fragmentos sin examinar.

## Forma de trabajo

Trabajar por fases.

Crear archivos intermedios persistentes para evitar perder información por límites de contexto.

Utilizar subagentes o tareas paralelas solamente si ayudan, por ejemplo para revisar de manera independiente una transcripción ya realizada.

Evitar ejecutar simultáneamente múltiples procesos que sobrescriban los mismos archivos.

Comenzar por el inventario de imágenes y la identificación de las páginas. Continuar con la transcripción individual y después con la ordenación y validación técnica.

No generar una versión resumida hasta haber completado la transcripción fiel.

### L2 — Ruta y evidencia

La transcripción se distribuye en tres unidades independientes de cuatro páginas, con archivos de salida separados. Los duplicados por recorte no se consideran descartados por el análisis automático; se cotejarán al revisar las imágenes individuales. No hay RED/GREEN aplicable a la transcripción documental: la prueba pertinente es la comparación visual con el original.

### L3 — Avance parcial

Los trabajadores entregaron `transcripciones/01.md`–`12.md`, con incertidumbres anotadas y autorrevisión visual informada. Comprobación estructural: los doce archivos existen y nombran la imagen que les corresponde en el inventario. `gentle_review assess` no pudo evaluar el riesgo nativo porque los archivos nuevos no estaban declarados; plan informado: autorrevisión del escritor, sin verificador adicional por ese criterio. La revisión independiente solicitada por el usuario es adicional.

### L4 — Cotejo y orden

Tres revisores independientes informaron haber examinado todas las zonas visibles de las doce fotografías; se conservaron las dudas y se aplicaron correcciones de fidelidad, no de Física. Evidencia y límites en `revision/cotejo_visual.md` y `revision/dudas_ocr.md`. `revision/orden_paginas.md` distingue orden cronológico, físico y pedagógico e identifica como provisional la secuencia empleada en `resultado/apuntes_originales.md`. No se descarta del todo un recorte parcial entre grupos. El trabajo de diagramas puede efectuarse en paralelo a la auditoría independiente de Física, sobre superficies separadas.

### L5 — Validación de Física y diagramas

Auditoría independiente completada con Python y código 0; incluyó las 12 transcripciones y fotos, resultados condicionados, unidades y conceptos. Los ocho SVG se validaron como XML, se renderizaron y el padre comparó los paneles con sus originales; las omisiones deliberadas por ilegibilidad se documentaron en `revision/diagramas.md`. `gentle_review assess` volvió a informar riesgo nativo no evaluable por archivos nuevos no declarados; su plan indica autorrevisión del escritor sin verificador adicional por riesgo.

### L6 — Entregables y decisión pendiente

Se crearon `resultado/apuntes_corregidos.md`, `resultado/ejercicios_resueltos.md`, `revision/errores_detectados.md` y `revision/calculos.py`; Python terminó con código 0. El control estructural confirmó 12 transcripciones, 8 SVG válidos, enlaces locales existentes, ecuaciones delimitadas y 12/12 copias originales idénticas por SHA-256. El orden físico sigue siendo provisional y no se descartan por completo recortes parciales entre grupos. El volumen de documentación supera la previsión de 400 líneas; el usuario eligió `chain_strategy=feature-branch-chain`. Se preparan unidades encadenables: inventario y originales; transcripciones 01–06; transcripciones 07–12 y orden; diagramas; versiones corregidas y cálculos. `resultado/apuntes_originales.md` es consolidación generada de las transcripciones, no 700 líneas adicionales de autoría. No se ha hecho push ni creado PR.

### L7 — Primera unidad y límites de evaluación

Límite de unidad 1: `8c3d443049cbe5e559805f26d7e87660e42897c8` → `124738fd7224c078c9678922d68dae232dab0791`: inventario, fotografías copiadas y plan; 310 líneas de texto más archivos binarios. El aviso del arnés calcula 2045 líneas acumuladas desde `origin/main`, incluyendo el commit preexistente `8c3d443`; no se atribuye ese trabajo previo a este encargo. Se mantiene la estrategia encadenada elegida; no se han creado PR ni ramas adicionales. La primera evaluación RDD informó `nativeRisk=unassessable` por archivos aún no declarados; tras agregar los archivos del proyecto al índice, la evaluación del mismo rango devolvió `passive`, `reviewDue=false`.

Límite de unidad 2: `124738fd7224c078c9678922d68dae232dab0791` → `169732f0c7e16afa8e231b018c11b741bce2f781`, transcripciones 01–06, 334 líneas; evaluación RDD `passive`, `reviewDue=false`.

Límite de unidad 3: `169732f0c7e16afa8e231b018c11b741bce2f781` → `05da834cd11df2462d4ecf541ca147918e6ebc83`, transcripciones 07–12, 347 líneas; evaluación RDD `passive`, `reviewDue=false`. La consolidación y sus evidencias son una unidad aparte, pues añadirlas a esta excedería las 400 líneas; el consolidado reproduce las transcripciones y es generado.

Límite de unidad 4: `05da834cd11df2462d4ecf541ca147918e6ebc83` → `6ccd511f0bbd7392e9f7e4109fb7ae5d7c3087e0`, cotejo, dudas, orden y consolidado; 859 líneas en Git, de ellas 745 de consolidado generado; evaluación RDD `passive`, `reviewDue=false`.

Límite de unidad 5: `6ccd511f0bbd7392e9f7e4109fb7ae5d7c3087e0` → `82b1572d780f44d796098357c4d3a527ec998b6f`, diagramas y sus cotejos; 211 líneas de SVG/documentación más binarios; evaluación RDD `medium`, `reviewDue=false`, revisión diferida al eventual slice de PR. La siguiente unidad es otro slice: no hay autorización para publicar ni abrir PR.

Límite de unidad 6: `82b1572d780f44d796098357c4d3a527ec998b6f` → `abace131c4487b41be4e782e4044100a332c9e28`, apuntes y ejercicios corregidos, auditoría y cálculo; 373 líneas; evaluación RDD `medium`, `reviewDue=false`, revisión diferida al eventual slice de PR. No se realizó revisión nativa porque el proveedor no la ofreció; no se afirma aprobación.

### L8 — Comprobación final

`python3 -B revision/calculos.py` terminó con código 0. La comprobación final observó 12 fuentes idénticas por SHA-256, las 12 transcripciones incluidas íntegras en el consolidado, 8 SVG válidos, enlaces locales existentes y delimitadores de ecuación equilibrados; cero problemas. Las dudas de lectura y el posible solapamiento parcial entre grupos siguen documentados y no se presentan como resueltos. Las inspecciones de las 12 fotos y la auditoría científica fueron independientes; los diagramas se cotejaron renderizados. En ese momento no se había hecho push ni se había abierto PR.

### L9 — Aprobación humana y próximo hilo

primera revisón visual aprobada. ahora cerremos hilo haz commit PRs y push si es necesario para seguir en otro hilo hacia el resultado final: material ordenado con su parte teórica y sus ejercicios de aplicación (si los hay) en un formato html como hemos implementado el material de matemática.

El usuario confirmó utilizar la sesión actual de GitHub CLI para consultar y publicar, si se cumplen los requisitos, en `Teksi75/clases-analisis-matematico`, sin incluir el commit heredado de eliminaciones y sin hacer merge. La versión HTML es objetivo del próximo hilo, no está implementada. La rama `hidroestatica` incluye como base el commit previo `8c3d443`, que elimina archivos de clases no relacionados; cualquier cadena para fluidos debe excluirlo sin modificarlo ni revertirlo.

### L10 — Decisión de privacidad

El usuario eligió «Preparar una copia anonimizada»: «Conservar los originales locales y preparar para publicación fotos y textos sin nombres ni rutas personales.» El destino confirmado es público. Las imágenes, transcripciones, vistas previas, metadatos y el historial publicado deben revisarse; un commit posterior que tape datos no sanea commits anteriores. La copia privada y sus originales permanecen intactos. No hay issues abiertos en el destino; antes de una PR hace falta un issue aprobado, cuya creación y etiqueta protegida requieren autorización específica.

### L11 — Preparación aislada

Tras consultar el destino autorizado, se verificó `main` como rama predeterminada y se actualizó a `46b2855bc0b981c9e3b38ce160db14f5b0acc8e5`. Se creó y registró el worktree local `odd/worktrees/fluidos-publicacion`, rama `docs/fluidos-anonimos`, desde ese commit, sin incluir `8c3d443` ni los commits con datos sin anonimizar. No se copiaron aún archivos al worktree. Una búsqueda preliminar identificó nombres en transcripciones y copias consolidadas, y una ruta personal en este documento privado y el inventario; las doce fotos originales carecen de etiquetas EXIF. No se ha hecho push ni se ha abierto PR.

### L12 — Identificación de regiones y método

Tres exploradores inspeccionaron las doce fotos y señalaron encabezados personales en 01, 03, 05 y 07, datos en hojas subyacentes y otras zonas de lectura incierta en los márgenes. Se hicieron ampliaciones privadas de 04, 06 y 09: en 09 se ven cálculos, mientras que los trazos inciertos de 04 y la tachadura de 06 deben ocultarse preventivamente. La copia pública se hará como PNG a partir de píxeles con rectángulos opacos y metadatos eliminados; se regenerarán las vistas derivadas, se eliminarán nombres y rutas de los textos y se conservará fuera del árbol público este documento privado. La historia pública partirá de `46b2855`, sin contener el historial privado. Los números y las áreas de redacción se verificarán independientemente antes de publicar.

### L13 — Copia pública preparada; revisión pendiente

El control inicial falló con código 1 porque las 12 copias públicas aún no existían (RED). Luego se prepararon 12 PNG con 16 máscaras de píxeles negros opacos, transcripciones y documentos con identificadores omitidos, inventario de las copias, ocho SVG, hoja de contacto y paneles regenerados desde los PNG públicos. El control propio pasó con cero errores: hashes de 12 originales intactos, máscaras totalmente negras, PNG sin EXIF ni metadatos, búsqueda textual de los identificadores conocidos, 12 transcripciones en el consolidado, enlaces y SVG, y coincidencia de cada panel con la copia pública. `python3 -B revision/calculos.py` pasó en la copia pública. El padre inspeccionó la hoja de contacto. El worktree público ocupa 35 MB y hay aproximadamente 30 GB libres en el disco y 3,9 GB en `/tmp`.

### L14 — Fallo de preparación del verificador y corrección local

El verificador independiente informó `UNVERIFIED`: inspeccionó visualmente las 12 fotos, comprobó que los commits privados no son ancestros y ejecutó los cálculos, pero su prueba independiente de privacidad por píxeles, metadatos, texto, SVG y hashes falló antes de ejecutar esos controles por `ModuleNotFoundError: No module named 'PIL'`; cero controles de ese probe se ejecutaron. También señaló trazos periféricos ambiguos en las copias 05, 07 y 08. El padre agregó una máscara opaca adicional a cada copia, regeneró los paneles y la hoja de contacto y actualizó sus hashes; control propio de las nuevas máscaras y metadatos OK. Se comprobó que Pillow funciona con HOME aislado al proporcionar explícitamente la ruta de paquetes ya instalados mediante PYTHONPATH. Esta preparación no constituye una segunda verificación; sus controles siguen sin prueba independiente y no se puede publicar hasta que exista. No hay subagentes activos ni de estado incierto.

El usuario revisó y aprobó el texto exacto propuesto para un issue público y autorizó crearlo con la etiqueta `status:approved` y enlazar las PR mediante `Refs` sin cierre automático. La búsqueda examinó cuatro issues existentes y no halló duplicados; el destino permite issues sin formulario. Falta autorización para el directorio temporal privado fuera del proyecto requerido por la herramienta de publicación. No se ha creado aún el issue, ni se ha hecho push, ni se ha abierto PR.

### L15 — Solicitud explícita de verificación

Después de confirmar que no hay hijos activos ni de estado incierto y comprobar que Pillow carga con HOME aislado usando PYTHONPATH explícito, el usuario eligió «Sí, verificar nuevamente»: un nuevo intento de verificación independiente acotado sobre las máscaras corregidas y los controles pendientes. Esto no borra la evidencia del fallo previo ni altera presupuestos nativos.

### L16 — Autorización para crear el issue

El usuario eligió «Sí, autorizar esa carpeta temporal»: crear y luego eliminar exclusivamente `/tmp/gentle-ai-issue-fluidos-01a1ca7f` con los archivos temporales para publicar y comprobar una sola vez el issue previamente aprobado. Esta autorización no habilita publicar archivos o ramas sin verificación de privacidad.

### L17 — Issue creado

Issue [#22](https://github.com/Teksi75/clases-analisis-matematico/issues/22) creado una sola vez y confirmado por lectura de retorno: título y cuerpo exactos, estado abierto y etiqueta `status:approved`. El directorio temporal autorizado se eliminó. Las PR deberán usar `Refs #22` para no cerrar el objetivo HTML futuro. Todavía no se hizo push ni se abrieron PR.

### L18 — Segundo verificador y límite de cierre

El nuevo intento humano-solicitado devolvió `UNVERIFIED`, no aprobación. Pasaron: inspección visual de las 12 fotos, cobertura opaca y comparación exacta de píxeles, metadatos PNG, hashes de originales y copias, integridad de transcripciones, enlaces, SVG, cálculos, derivados y ausencia de los commits privados de la ascendencia. La búsqueda independiente de identificadores en texto terminó con código 1 por coincidencias obtenidas con palabras amplias: no se demostró que fueran filtraciones, pero tampoco se resolvieron. Por eso no se ejecutaron la búsqueda exacta de identificadores en la historia accesible ni la comprobación final de inventario de binarios y del documento privado. La publicación y las PR quedan bloqueadas; no se vuelve a ejecutar el verificador ni se afirma aprobación. El candidato público está staged en `odd/worktrees/fluidos-publicacion`; la rama privada conserva los originales. El issue #22 permanece abierto y aprobado.

### L19 — Cambio de prioridad y cierre solicitado

establescamos prioridades, el material de las fotos es material descartable sirve solamente para producir el contenido del html, no se necesita fidelidad absoluta, lo que se necesita es consitencia pedagógica. por lo que hacer más revisiones o cuidar la privacidad es algo secundario en este caso. ceeramos hilo, dame el prompt para continuar en el nuevo hilo

El usuario prioriza producir material HTML pedagógicamente consistente en un hilo nuevo. Se detiene la preparación/publicación de fotografías: no se requieren más revisiones de esa copia para diseñar el material; esto no autoriza exponer fotografías privadas ni datos identificatorios. Los originales locales no se borran. En ese momento el issue #22 seguía abierto; no se hizo push ni se abrieron PR. El candidato staged y los recortes privados se conservan sin cambios.

### L20 — Cierre del issue documental

El usuario solicitó: «no quiero tener problemas futuros por no resolver este hilo (issue), puedes cerrar el tema dada la prioridad pedagógica no documental?» El issue público [#22](https://github.com/Teksi75/clases-analisis-matematico/issues/22) fue cerrado como `NOT_PLANNED` y se confirmó el estado por lectura posterior. La etiqueta `status:approved` permanece intacta. El HTML pedagógico aún no está implementado y se abordará por separado; el cierre del issue no significa que ya esté terminado.
