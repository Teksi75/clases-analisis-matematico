# Exámenes de diagnóstico de Stewart

Abrí el [índice HTML](index.html) para elegir un examen. Desde el [cuaderno de Funciones y Límites](../../teoria/index.html#funciones) se puede entrar a Stewart por la cabecera o el índice de lectura; cada examen ofrece la ruta de regreso al índice y a los apuntes. Las consignas provienen del libro y los desarrollos son docentes. La clave original y las erratas se conservan como referencia de mantenimiento, sin enlace desde las páginas de los exámenes. Esta referencia está en el repositorio público: no es privada. Las imágenes originales también se conservan y son accesibles por URL directa. Son distintos de los [diagnósticos del proyecto](../diagnosticos/index.html).

## Piloto de explicaciones aprobado y cerrado

El examen de **Álgebra está completo**: el panel de consulta y su color están aplicados a los diez ejercicios (46 incisos). Quedan pendientes detalles de navegabilidad, entre ellos botones de regreso al menú principal al finalizar el examen. Geometría analítica también está adaptada: cinco ejercicios y 18 tareas, con acento azul. Funciones y Trigonometría todavía no están adaptadas. La clave original del libro y las erratas se conservan como referencia de mantenimiento, sin enlace desde las páginas de los exámenes. Consultá la [guía para extender el patrón](GUIA-EXPLICACIONES.md): incluye el contrato del componente, el proceso de contenido y los colores de referencia para los exámenes restantes.

Las consignas de cada ejercicio aparecen juntas, antes del panel **Consultá una resolución**. En Geometría, los ejercicios 2 y 3 no tienen incisos: su explicación y su paso a paso se abren mediante controles nativos anidados, sin inventar letras. Con JavaScript, elegí un inciso para ver solo su explicación breve; el paso a paso empieza cerrado y vuelve a cerrarse al elegir otro inciso. Al cargar no hay ningún inciso seleccionado ni respuesta visible. Los botones funcionan también con teclado. Sin JavaScript se conservan los controles nativos `details`/`summary`, inicialmente cerrados, cada uno con su paso a paso anidado.

Para extender el sistema, mantené las respuestas ocultas hasta que se soliciten y no pongas resultados en las etiquetas de los controles. Escribí para estudiantes que terminan la secundaria: primero una idea corta, y más detalle solo a pedido. Las condiciones de las reglas matemáticas deben quedar explícitas cuando corresponda.

El piloto del ejercicio 1 se elaboró con propuestas independientes de MiMo y DeepSeek, evaluadas sin identificar los modelos por un juez pedagógico de otro modelo. Se eligió DeepSeek como base y se incorporaron las correcciones del dictamen, incluida la base no nula en la regla del cociente. Las propuestas y el dictamen están en [la evidencia del piloto](../../odd/pilotos/stewart-algebra-ejercicio-1.md).

Para los ejercicios 2–10 se repitió el proceso con los mismos modelos y se sumó una verificación matemática independiente del dictamen. Se partió de MiMo, se aplicaron las correcciones del juez y se conservaron los dominios de cada expresión original. La selección de un modelo no reemplaza la verificación matemática y docente antes de publicar o extender el sistema. Las propuestas, el dictamen y las dos verificaciones están en [la evidencia de Álgebra 2–10](../../odd/pilotos/stewart-algebra-2-10-entrada.md), [el dictamen](../../odd/pilotos/stewart-algebra-2-10-dictamen.md) y [las verificaciones](../../odd/pilotos/stewart-algebra-2-10-verificacion-dictamen.md).

## Mantenimiento

Los archivos Markdown son la fuente editable. Con Python 3 y Pandoc 3.11 instalados, desde la raíz del proyecto:

```sh
python3 -B evaluaciones/stewart/generar.py
python3 -B evaluaciones/stewart/generar.py --check
python3 -B -m unittest discover -s tests -p 'test_stewart*.py' -v
node tests/check_stewart_piloto.mjs
node evaluaciones/stewart/check-browser.mjs
```

`node tests/check_stewart_piloto.mjs` recorre los diez paneles de Álgebra y las 18 tareas de Geometría en 1280 y 390 píxeles, con mouse y teclado, y también con JavaScript desactivado. Crea capturas en una carpeta temporal del sistema. La comprobación general de navegador incluye además la impresión inicial y con una respuesta seleccionada por ejercicio.

El generador combina los fragmentos de Pandoc con `plantilla.html`, la hoja del modelo de teoría y `stewart.css`: masthead, portada e índice de lectura funcionan también sin JavaScript ni servicios externos. El contenido matemático usa MathML nativo. La plantilla y la hoja local son la fuente de la presentación; no edites directamente los HTML generados. Los motivos decorativos de portada se editan en `motivos/*.svg` y el generador los incorpora dentro del HTML: factorización en Álgebra, circunferencia con radio en Geometría analítica, correspondencia entre entradas y salidas en Funciones y circunferencia unitaria en Trigonometría. El índice conserva su motivo general. Comparten la estética del cuaderno, no una ilustración idéntica; no reemplazan las figuras de los ejercicios. Para trigonometría usa `markdown-fancy_lists` para conservar los incisos literales. `--check` compara sin escribir. La comprobación de navegador requiere Node.js con WebSocket, Chromium en `/usr/bin/chromium` y `pdftoppm` en `/usr/bin/pdftoppm`; comprueba el recorrido desde `#funciones` en escritorio y celular y la impresión; guarda capturas y PDF en una carpeta temporal del sistema, sin sobrescribir capturas anteriores; usa un perfil temporal de Chromium fuera del proyecto. Conservá las carpetas de imágenes junto a los exámenes: en particular, `funciones-assets/pagina-025.png` es utilizada por imágenes SVG recortadas. Después de editar una fórmula o una gráfica, comparala con el PDF original y revisá pantalla móvil e impresión.
