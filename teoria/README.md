# Teoría para estudiar funciones y límites

Estos dos apuntes desarrollan las ideas necesarias para empezar a trabajar con EVA1 y TP2 en el secundario. Leé primero los conceptos y ejemplos; después usá las preguntas de autocontrol y, al final, compará con las respuestas breves. No son una evaluación nueva ni un solucionario completo.

**Lectura recomendada:** abrí [Funciones / Límites en HTML](index.html) en el navegador. Reúne ambos apuntes completos, con índice navegable y fórmulas legibles sin conexión. Conservá `index.html`, `teoria.css` y el archivo opcional `lectura.js` en la misma carpeta; los PDF enlazados siguen en `../material/pdf/`.

## Recorrido de lectura

| Apunte | Qué vas a aprender | Fuente local para practicar |
|---|---|---|
| [1. Funciones: relacionar, representar e interpretar](01-funciones.md) | Variables, representaciones, dominio e imagen, raíces, comportamiento y parábolas. | [EVA1, p. 1, a–d](../material/pdf/eva1.pdf) |
| [2. Límites: acercarse, comparar y decidir continuidad](02-limites.md) | Aproximación, laterales, factorización, asíntotas y continuidad. | [TP2, pp. 1–3](../material/pdf/TP2%20LIMITES.pdf) |

No hace falta conocer derivadas para este recorrido. Si cuesta sustituir o resolver ecuaciones, retomá la primera sección del apunte de funciones. Para leer los gráficos de TP2, abrí el PDF: el texto extraído no conserva la información visual.

## Cómo reconocer las fuentes

Los apuntes son **elaboración docente propia para este repositorio**. Cada ejemplo trabajado a partir de un PDF local indica página y ejercicio; los otros ejemplos se identifican como originales. Las explicaciones y tablas no se presentan como soluciones oficiales de los autores de los PDF.

Como referencias complementarias de nivel y enfoque se consultaron las descripciones de dos recursos oficiales:

- [Matemática para la Educación Secundaria Técnica. Ciclo Básico — Educ.ar](https://www.educ.ar/recursos/151034/matematica-para-la-educacion-secundaria-tecnica-ciclo-basico): colección que incluye funciones cuadráticas, raíces, funciones elementales y modelización, y recomienda recursos de INET.
- [Límite de funciones — Educ.ar / INET](https://www.educ.ar/recursos/152410): recurso para 4.º año del Segundo Ciclo de Escuela Secundaria Técnica, con enfoque intuitivo y menos formal. Se consultó solo su descripción, no el documento descargable.

Se localizó el [sitio oficial de ETec Mendoza](https://etec.um.edu.ar/), pero en la búsqueda realizada no se encontró un programa público de estos temas. **No se atribuyen estos apuntes ni los PDF locales a ETec Mendoza, ni se afirma alineación curricular oficial con esa institución.** La coincidencia de nombres con otras escuelas no acredita una relación institucional.

## Para continuar

Las [fichas de conocimiento](../conocimiento/README.md) ofrecen una vista de preparación docente; estos apuntes ofrecen la explicación para estudiantes. La [clase inicial](../clases/analisis/clase-01.md) propone trabajar el modelo de EVA1. Volver al [inicio del repositorio](../README.md).

## Edición y mantenimiento

Las fuentes editables siguen siendo [01-funciones.md](01-funciones.md) y [02-limites.md](02-limites.md). Después de modificarlas, regenerá la edición desde la raíz del repositorio:

```bash
python3 teoria/generar.py
```

Requiere Python 3 y Pandoc en `/usr/bin/pandoc`; no instala dependencias. El generador usa `teoria/plantilla.html` y `teoria/teoria.css`, convierte las fórmulas a MathML nativo con anotaciones TeX y prefija los identificadores de cada capítulo. También incluye esta guía hasta la sección de mantenimiento. La lectura no necesita JavaScript, fuentes remotas ni servicios externos. `lectura.js` adapta el índice al ancho de pantalla, marca el tema actual y ofrece A− / A+; no guarda datos ni mueve el foco. Los controles ajustan texto, tablas y fórmulas del apunte entre 90% y 120%, en pasos de 10%, sin cambiar la portada ni el índice. Al recargar se vuelve al 100%; sin JavaScript se conserva la tipografía predeterminada y los controles no aparecen. En celular, los accesos a Funciones y Límites preceden al índice plegable nativo; en escritorio, el índice queda visible incluso sin JavaScript. Las referencias web son enlaces de consulta, no recursos necesarios para leer.

El índice agrupa las secciones en capítulos desplegables nativos. Funciones empieza abierto; al cambiar de capítulo durante la lectura, se abre el correspondiente. Dentro de un mismo capítulo se respeta la apertura o cierre manual; pueden quedar ambos abiertos. La navegación no desplaza el documento ni roba el foco por su cuenta.

El generador destaca solo la primera fórmula de presentación del modelo EVA1, la equivalencia de límites laterales y la lista de tres condiciones de continuidad, mediante bloques semánticos e identificadores estables. Los párrafos originales debajo de las fórmulas siguen explicándolas. Al terminar cada capítulo se agregan enlaces al resumen y al otro apunte; no se anticipan temas sin contenido. Para mantener estas mejoras, revisá esos identificadores al renombrar secciones y regenerá el HTML.

Las etiquetas «Idea clave», «Ejemplo resuelto» y «Error frecuente» se agregan a bloques seleccionados por estructura o identificador estable, sin alterar el texto fuente. Las cinco gráficas SVG incluyen descripción, escalas y puntos de los ejemplos: vuelo de EVA1, límite frente a valor puntual, hueco, salto de TP2 y asíntota vertical. El generador muestrea cada rama por separado y las incorpora como complemento, no como reemplazo de la teoría.

Comprobaciones desde la raíz (sin instalar paquetes):

```bash
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tests -p 'test_theory*.py'
/usr/bin/node teoria/comprobar_navegador.mjs
```

La segunda requiere `/usr/bin/chromium`, usa un perfil temporal desechable y verifica escritorio, móvil, lectura sin JS y estilos de impresión. Escribe las cuatro capturas `reading-preview-desktop.png`, `reading-preview-controls.png`, `reading-preview-formula.png` y `reading-preview-ending.png`; no comprueba una impresión física. Las pruebas comparan el texto completo, las tablas y las anotaciones TeX con Pandoc sobre los Markdown originales; excluyen únicamente figuras, etiquetas y navegación de cierre explícitamente generadas. Los bloques originales destacados siguen comparándose completos.

Para imprimir, usá la opción del navegador: se aplica fondo blanco, texto negro y se ocultan la navegación y los controles de lectura; se restaura el tamaño de impresión predeterminado. Las respuestas permanecen visibles en su posición original.
