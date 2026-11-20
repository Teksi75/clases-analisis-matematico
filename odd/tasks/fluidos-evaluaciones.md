# Evaluaciones de Mecánica de los Fluidos en el cuaderno

Incorporar tres pruebas de Mecánica de los Fluidos —dos exámenes y el trabajo práctico n.º 1— al cuaderno HTML sin conexión de `fluidos/`, transcribiendo el texto impreso y sumando resoluciones docentes. El material se publica como capítulo de evaluación, sin fotografías de los originales y sin datos personales.

## Specs

S1. Objetivo: «quiero incorporar nuevo material al proyecto, la idea es escanear las imágenes para extraer el contenido y agregarlo a la web como material pedagógico especialmente los dos exámenes el práctico tambien aporta mucho valor a la web actual».

S2. Alcance: las tres pruebas disponibles son «Mecánica de los Fluidos — Tema 1» (curso 5.º 1.ª), «Mecánica de los Fluidos — Trabajo Práctico N.º 1» (temas: prensa hidráulica y empuje) y «Mecánica de los Fluidos — Recuperación de Saberes Agosto» (curso 5.º 1.ª). Las tres se incorporan completas, con la salvedad de S6.

S3. Ubicación y forma: capítulo nuevo del cuaderno existente, generado con `python3 fluidos/generar.py`; mismas convenciones que los siete capítulos de teoría y el de ejercicios: `##` por capítulo, `###` por sección, bloques `::: {.ejercicio #id}` con resolución en `::: {.resolucion}` (se publica como `<details>`), MathML sin conexión, sin enlaces externos ni HTML crudo.

S4. Fidelidad y origen: el enunciado impreso se transcribe literal (incluidos sus errores de tipeo, señalados en una nota editorial del capítulo) y se identifica como enunciado original. Las resoluciones son elaboración docente y se marcan como tales.

S5. Privacidad: no se publican las fotografías ni el nombre del alumno, la letra manuscrita, las correcciones del docente ni las calificaciones. Se transcribe solo el texto impreso de la prueba. Se mantiene la afirmación del cuaderno de que no incluye fotografías ni datos personales.

S6. Límites de los datos: cuando la fotografía no alcanza para resolver un enunciado, se indica explícitamente y no se inventan consignas. En el Trabajo Práctico N.º 1 las consignas de los ítems 2 y siguientes no aparecen en la imagen disponible: se transcribe el enunciado y se señala el faltante.

S7. Verificación: `python3 fluidos/generar.py`, `python3 fluidos/generar.py --check`, `python3 -B -m unittest discover -s tests -p 'test_fluidos_*.py'` y `node fluidos/comprobar_navegador.mjs` en verde.

S8. Documentación: `fluidos/README.md`, el README raíz y la sección «Fuentes y alcance» de la plantilla mencionan el capítulo de evaluaciones y su procedencia.

S9. Esquemas: cada ejercicio que en el original tiene figura recibe su propio SVG en `fluidos/graficos/`, con la geometría, las alturas, los puntos y los datos necesarios para interpretar el problema aun sin leer la resolución. Se dibujan, no se copian de las fotografías; siguen la paleta y el formato de las figuras de `main`, y llevan `<title>` y `<desc>` con los datos.

## Tasks

| ID | Tarea | Specs | Ruta | Commit |
|---|---|---|---|---|
| T1 | Documento de tarea y espejo en Engram | S1 | inline | b300451 |
| T2 | Capítulo de evaluaciones: encabezado, nota de origen y Examen Tema 1 con resoluciones | S2-S6 | inline | b300451 |
| T3 | Trabajo Práctico N.º 1: prensa hidráulica resuelta y enunciado del pontón con su límite | S2, S4, S6 | inline | b300451 |
| T4 | Recuperación de Saberes: fluido múltiple, balsa y prensa con resoluciones | S2, S4-S6 | inline | b300451 |
| T5 | Regenerar el HTML y correr generador, pruebas y navegador | S7 | inline | b300451 |
| T6 | Actualizar READMEs y «Fuentes y alcance» | S8 | inline | 146b58c |
| T9 | Dibujar los cuatro esquemas de las pruebas como SVG y publicarlos en el capítulo | S4, S9 | delegado | 0d1b837 (Tema 1), 1fa1beb (Recuperación) |
| T10 | Enlazar el capítulo de evaluaciones desde el hero del cuaderno | S3 | sin definir | descartada por decisión humana: f707feb vive solo en feat/fluidos-eval-3-enlace, sin push |

## Log

L1. «quiero incorporar nuevo material al proyecto, la idea es escanear las imágenes para extraer el contenido y agregarlo a la web como material  pedagógico especialmente los dos exámenes el práctico tambien aporta mucho valor a la web actual.»

L2. Originales disponibles en `.orca/drops/1.jpeg`, `2.jpeg` y `3.jpeg` (carpeta ignorada por Git). Se rotaron y recortaron para leerlos; el análisis de las figuras fija los datos: Tema 1, aceite 0,55 m, agua 0,70 m, radio 1 m, aire a −4900 Pa; ejercicio 6, agua 2,5 m y aceite de 800 kg/m³; Recuperación, gas 80 cm, agua 35 cm, glicerina 18 cm y columna manométrica de 135 cm; balsa 2 × 1 × 0,5 m con 150 kg; prensas con los diámetros y carreras impresos.

L3. Nota editorial del capítulo: el Tema 1 imprime «contiene y aceite» (falta «agua») y la Recuperación no marca el punto A en la figura; ambos se resuelven con la lectura del esquema y se documentan en el propio capítulo.

L4. La etiqueta decorativa que el generador antepone a cada capítulo dice «NN / Apunte de teoría» para todos, incluido este. Se acepta en esta unidad para no tocar código compartido; queda como mejora cosmética posible.

L5. Entrega y verificación. `python3 fluidos/generar.py --check` en verde; `Ran 32 tests` (fluidos) y `Ran 106 tests` OK; `node fluidos/comprobar_navegador.mjs` con los tres PASS; revisión visual por recortes a 1280 px de todo el capítulo, sin fórmulas cortadas después de partir las cadenas largas en dos bloques. El capítulo aporta 552 líneas de Markdown y 12 ejercicios nuevos. Unidad de commit cerrada en dos commits sobre `docs/fluidos-continuidad-limpia`: contenido, plantilla y página regenerada en `b300451`; READMEs en `146b58c`. La rama entera supera las 400 líneas frente a `origin/main` por trabajo anterior a esta unidad: si se pide un PR, va partido en tramos (el capítulo de evaluaciones es un tramo completo y revisable por sí solo).

L6. Defecto reportado por el usuario: la página regenerada mostraba las figuras viejas de `diagramas/` en los siete capítulos de teoría. Causa: la rama había quedado 15 commits atrás de `origin/main`, donde la cadena de PR #44 a #49 reemplazó esos dibujos por `fluidos/graficos/*.svg` (entre ellos `presion-media.svg`), ajustó el texto de los capítulos 3 a 7, sumó reglas en `fluidos/fluidos.css`, nuevas pruebas y la etapa 3 del lector. Corrección: `git merge origin/main` sobre la rama (sin conflictos), regeneración del HTML y verificación. Estado posterior: `git rev-list --left-right --count HEAD...origin/main` en 0/0, `--check` verde, 44 pruebas de fluidos y 118 totales OK, tres PASS del navegador, la figura de presión media sale de `fluidos/graficos/presion-media.svg`, el capítulo de evaluaciones conserva sus 12 ejercicios y la oración de «Fuentes y alcance». Lección: regenerar el cuaderno en una rama vieja reescribe el HTML con las fuentes de esa rama; antes de publicar hay que sincronizar con `main`.

L7. Decisión del usuario: «prefiero publicar en main solo lo importante, dejando de lado cosas como la que comentas del commit 29c7b13. Que te parece si solo publicamos los exámenes y dejamos de lado el trabajo práctico ya que está incompleto (falta la segunda hoja)». Alcance ajustado: el capítulo publica solo el Examen del Tema 1 y la Recuperación de Saberes; el Trabajo Práctico n.º 1 se retira del capítulo hasta contar con la hoja faltante, y la introducción del capítulo, `fluidos/README.md` y el README raíz dejan de anunciarlo. Entrega: rama nueva `feat/fluidos-evaluaciones` creada desde `origin/main` con estos archivos, sin arrastrar el commit de documentos de trabajo `29e7b13`.

L8. Estrategia de entrega. La unidad viaja como un solo commit de 755 líneas sobre `main`: 431 son el Markdown del capítulo y 324 la página regenerada más los documentos. No se parte en dos porque el capítulo es un archivo nuevo con una introducción que nombra las dos pruebas: un estado intermedio con una sola prueba sería incoherente, y el HTML generado tendría que rehacerse dos veces. El tramo revisable es el archivo `fluidos/contenido/95-evaluaciones.md` completo; `fluidos/index.html` es derivado y se comprueba con `--check`. Rama de entrega: `feat/fluidos-evaluaciones`, creada desde `origin/main` para no arrastrar el commit de documentos de trabajo `29e7b13`. La segunda unidad son los cuatro SVG de S9 (138 líneas, commit aparte): el tramo revisable ahí es el dibujo, no el texto.

L9. Pedido del usuario: «Un detalle, faltan los esquemas y son impotantes para la interpretación de los problemas muestro como se ven en la imagenes originales [...] deberías generar estos esquemas e introducirlos». Se dibujan cuatro SVG en `fluidos/graficos/`: tanque cerrado del Tema 1 ejercicio 1, tanque abierto del ejercicio 6, recipiente con manómetro de la Recuperación ejercicio 1 y balsa de la Recuperación ejercicio 2. No se usan las fotografías: la geometría sale de las medidas leídas en las figuras.

L10. Reconciliación del tracker el 2026-11-20, inline y solo documentación. La tabla seguía mostrando T9 sin commit y no registraba la entrega real. Verificado: la unidad se publicó partida según L7, como PR #51 desde `feat/fluidos-eval-1-tema1` (commit `0d1b837`, MERGED 2026-11-16T14:41:14Z, examen del Tema 1 con sus esquemas) y PR #52 desde `feat/fluidos-eval-2-recuperacion` (commit `1fa1beb`, MERGED 2026-11-16T14:43:19Z, Recuperación con los suyos); ambos son ancestros de HEAD `66d750e`. Los cuatro SVG de S9 existen en `fluidos/graficos/` y el capítulo los referencia. Corregido: T9 cerrada con sus dos commits. Aclaración de evidencia: los commits `b300451` y `146b58c` de T1–T6 viven en `docs/fluidos-continuidad-limpia` y **no** están en `main`; lo publicado en `main` es la versión de los dos PR, así que no deben citarse como commit de entrega. Descartado por decisión humana: `f707feb` («render an exams link in the hero when the chapter exists», 18 líneas sumadas y 3 quitadas en cinco archivos, con una prueba de ambas ramas, en `feat/fluidos-eval-3-enlace`) **no** quedó pendiente de merge. El humano prefirió que el alumno llegue a los exámenes recorriendo el material, sin atajo en la portada; el push quedó bloqueado por el preflight del arnés, no por el código, y el commit vive solo en esa rama local. T10 queda registrada como descartada. Además, el PR #50, que juntaba todo el capítulo en un candidato de 918 líneas, se cerró sin fusionar por superar el presupuesto del revisor nativo: de ahí el reparto en #51 y #52.
