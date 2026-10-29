# Clases de Análisis Matemático

Base de conocimiento y planificación inicial para preparar clases a partir de material de Matemática de 5.º año y un libro de consulta de cálculo. Los originales se conservan sin modificaciones y cada tema remite a su fuente.

**Prioridad actual:** Matemática y Análisis Matemático. Las clases de computación están suspendidas por el momento; su material se conserva.

## Por dónde empezar

1. Abrir el [cuaderno de teoría en HTML: Funciones / Límites](teoria/index.html), con ambos apuntes completos, fórmulas e índice navegable sin conexión. Se conservan la [guía y fuentes editables](teoria/README.md): [funciones](teoria/01-funciones.md) y [límites, asíntotas y continuidad](teoria/02-limites.md), con conceptos desarrollados, ejemplos y autocontrol. Consultar el [índice de conocimiento](conocimiento/README.md) para ubicar temas y ejercicios.
2. Recorrer la [secuencia de clases propuesta](planificacion/secuencia.md).
3. Abrir los [diagnósticos en HTML](evaluaciones/diagnosticos/index.html) para leerlos e imprimirlos en el navegador. Las [fuentes editables en Markdown](evaluaciones/diagnosticos/README.md) se conservan. Las pruebas son exclusivamente de Matemática y permiten ajustar el punto de partida.
4. Usar la [primera clase: funciones y modelos](clases/analisis/clase-01.md) según los resultados del diagnóstico.

Como material de consulta adicional, los [exámenes de diagnóstico de Stewart en HTML](evaluaciones/stewart/index.html) reúnen álgebra, geometría analítica, funciones y trigonometría, con desarrollos y respuestas. También está disponible el [extracto original en PDF](material/pdf/stewart-examenes-diagnostico.pdf). Son las páginas 22 a 26 del [libro completo](material/pdf/JAMES_STEWART_Sexta_edicion_Sexta_edicio.pdf); en el libro están numeradas xx a xxiv.

La [resolución pedagógica de EVA1](evaluaciones/eva1.html) desarrolla los incisos a–d paso a paso, con fórmulas, tablas y gráfica disponibles sin conexión.

## Estructura

| Carpeta o archivo | Contenido |
|---|---|
| [material/pdf/](material/pdf/) | PDF originales importados y extracto de los exámenes de diagnóstico de Stewart. |
| [material/catalogo.json](material/catalogo.json) | Inventario, páginas, rutas y huellas SHA-256. |
| [material/texto/](material/texto/) | Texto extraído por página; EVA2 tiene una transcripción manual separada. |
| [material/vistas/](material/vistas/) | Imágenes de las dos páginas de EVA2 para cotejar el manuscrito. |
| [teoria/](teoria/README.md) | Apuntes desarrollados de funciones y límites para estudiantes de secundario; elaboración docente con fuentes identificadas. |
| [conocimiento/](conocimiento/) | Fichas temáticas, prerrequisitos, alertas y referencias. |
| [planificacion/](planificacion/) | Secuencia ajustable y plantilla para nuevas clases. |
| [evaluaciones/diagnosticos/](evaluaciones/diagnosticos/) | Cuatro pruebas matemáticas por tema y guía docente separada; sin computación ni electrónica. |
| [clases/analisis/](clases/analisis/) | Clases de Análisis Matemático. |
| `clases/*.html` | Clases preexistentes de Programación; se preservan sin cambios. |

## Alcance de esta base

Es una base documental local en Markdown: se puede leer, buscar y ampliar sin instalar una aplicación ni un servicio. No incluye base vectorial, plataforma de alumnos ni un solucionario completo. El material elaborado está en español, siguiendo la convención de las clases existentes y de las fuentes.

La secuencia es una propuesta, no un calendario cerrado. La duración, cantidad definitiva de encuentros y conocimientos previos del grupo se ajustan antes de desarrollar el curso completo. El nivel de referencia sale de los PDF; no se presupone que el grupo ya domina esos contenidos.

## Consultar y mantener

Abrir este archivo con un visor Markdown y seguir los enlaces relativos. Para buscar en los textos desde la raíz del proyecto:

```bash
grep -Rni 'continuidad' conocimiento material/texto
```

Para volver a extraer un PDF con Poppler instalado:

```bash
pdftotext -layout 'material/pdf/TP2 LIMITES.pdf' 'material/texto/TP2 LIMITES.txt'
```

**La extracción no reemplaza al PDF:** puede alterar fracciones, exponentes, funciones por tramos y orden de columnas; los gráficos no se recuperan como texto. En particular, el [texto extraído de los diagnósticos de Stewart](material/texto/stewart-examenes-diagnostico.txt) contiene símbolos matemáticos incorrectos y sirve solo para búsquedas aproximadas: consultá el PDF para leer o utilizar los ejercicios y las respuestas. EVA2 no tiene capa de texto, por lo que su `.txt` está vacío de contenido útil. Consultar su [transcripción revisada](material/texto/eva2-transcripcion.md) y el original. TP2 produce una advertencia de ligadura al extraer: conservarla como limitación conocida, no como contenido matemático.

Al incorporar material, conservar el original, registrar su huella y páginas en el catálogo y enlazarlo desde las fichas y la planificación. No atribuir a los PDF ejercicios nuevos: identificarlos como elaboración docente.
