# Diagnósticos · Documentación docente y mantenimiento

Este documento no se publica como página para el alumno. La entrada estudiantil es [index.html](index.html), generada desde [index.md](index.md). Se prepara para el contexto de **ETec · 5.º año · Matemática**, a partir de sus materiales, sin presentarse como una evaluación oficial de la institución.

## Material para cada destinatario

| Destinatario | Documento | Uso |
|---|---|---|
| Estudiante | [Inicio y pruebas](index.html) | Indicaciones para resolver, actividades y autoevaluación. Sin instrucciones de mantenimiento ni enlaces al solucionario. |
| Docente | [Guía docente](guia-docente.html) | Respuestas, evidencias y decisiones de enseñanza. Acceso directo separado de la navegación del alumno. |
| Edición | Los Markdown, `plantilla.html` y `diagnosticos.css` | Fuentes para actualizar las páginas. No editar solamente el HTML generado. |

Las páginas funcionan sin internet ni servidor y se pueden imprimir en A4. No son formularios ni guardan datos del alumno: se responde en papel o en una hoja aparte. Nombre, fecha e instancia permiten comparar el diagnóstico inicial con la revisión posterior. La identidad ETec y el año figuran también en la impresión.

La separación de páginas organiza los destinatarios, **no es una protección de acceso**. Al entregar archivos, compartir solo el índice, las cuatro pruebas y sus estilos; conservar la guía docente aparte. Los enlaces a fuentes originales requieren mantener las rutas de `material/pdf/` si también se distribuyen esos PDF.

## Cómo aplicar las pruebas

1. Administrar cada prueba antes de abordar su bloque; no las cuatro seguidas como un examen único. Registrar los contenidos que aún no fueron enseñados.
2. Pedir procedimientos y permitir la respuesta «No lo vi» para no confundir ausencia de enseñanza con dificultad.
3. En el primer intento, no dar pistas ni tablas de fórmulas; en Funciones se permite calculadora para aproximaciones. Si después se brinda ayuda, anotarla por separado.
4. Usar la [guía docente](guia-docente.md) para registrar interpretación, procedimiento y justificación, sin reducir el diagnóstico a un total.
5. Para una revisión posterior, seleccionar actividades equivalentes y registrar la nueva fecha. No interpretar la repetición memorizada de una respuesta como evidencia suficiente de aprendizaje.

Los tiempos de las hojas son orientativos. La ponderación conversada todavía es una propuesta, no una escala aprobada incorporada a estas páginas.

## Alcance

Las consignas se limitan a Matemática de los PDF: funciones, límites/continuidad, derivadas e integrales. No se incluyen Programación ni aplicaciones informáticas o electrónicas. En I5 se conserva la función de TP4 sin el contexto de red. Las fuentes y las adaptaciones se detallan en la guía. La [planificación general](../../planificacion/secuencia.md) se conserva sin cambios.

## Notación matemática

Las fórmulas se escriben en LaTeX en los Markdown: `$...$` dentro de una oración y `$$...$$` en un bloque destacado. No usar comillas de código para fórmulas. Por ejemplo:

```tex
$\displaystyle \lim\limits_{x\to 2}\frac{x^2-4}{x-2}$
$f'(x)$
$\int_0^3 r(x)\,\mathrm{d}x$
```

Pandoc las convierte en **MathML nativo**, con fracciones verticales, límites y extremos de integración. En fórmulas dentro de una oración, escribí `\lim\limits_{...}` para que la aproximación se lea debajo del operador; dentro de `$$...$$`, `\lim_{...}` ya se muestra así. El HTML no carga scripts, fuentes web ni servicios externos: funciona sin conexión y conserva la notación al imprimir. Para leerlo se necesita un navegador actualizado con soporte MathML; se verifica en Chromium. No se verificó en navegadores antiguos ni con lectores de pantalla.

La anotación LaTeX queda incluida en cada fórmula generada para conservar su expresión de origen. Se usa `\operatorname{sen}` para mantener la notación del material en español. Revisar los signos, las condiciones laterales, los dominios y los extremos después de editar; cambiar la presentación no debe cambiar el problema.

## Regenerar el HTML

Para editar se requieren Python 3 y Pandoc (generación verificada con 3.11); para leer o imprimir las páginas no se necesita ninguna de estas herramientas. Desde la raíz del proyecto:

```bash
python3 - <<'PY'
from pathlib import Path
import re
import subprocess

folder = Path('evaluaciones/diagnosticos')
source_names = ['index.md', '01-funciones.md', '02-limites-continuidad.md',
                '03-derivadas.md', '04-integrales.md', 'guia-docente.md']
names = {name: Path(name).with_suffix('.html').name for name in source_names}
for name in source_names:
    source = folder / name
    title = source.read_text().splitlines()[0].removeprefix('# ')
    metadata = ['--metadata', 'teacher=true'] if name == 'guia-docente.md' else []
    result = subprocess.run(
        ['pandoc', str(source), '--from=markdown+tex_math_dollars', '--to=html5',
         '--math-method=mathml', '--fail-if-warnings', '--standalone',
         '--template=' + str(folder / 'plantilla.html'),
         '--metadata', 'pagetitle=' + title, '--wrap=none', *metadata],
        check=True, text=True, capture_output=True)
    html = re.sub(r'href="([^"#]+\.md)"',
                  lambda m: 'href="' + names.get(m[1], m[1]) + '"', result.stdout)
    (folder / names[name]).write_text(html)
print('HTML actualizado: ' + str(len(source_names)) + ' páginas.')
PY
```

La lista explícita de fuentes evita publicar este README u otros documentos internos como páginas del alumno. El contenido institucional está en la plantilla; las consignas y referencias, en cada Markdown.

## Comprobar la publicación

```bash
python3 -B -m unittest discover -s tests -p 'test_*.py'
```

Las comprobaciones leen los HTML publicados: separación de destinatarios, identidad ETec/5.º año, datos de cada instancia, permanencia de los ejercicios, enlaces y notación MathML. También comprueban fracciones, límites laterales, derivadas y extremos de integración, sin depender de servicios externos. La generación falla ante advertencias para no publicar fórmulas que no se pudieron interpretar. Antes de distribuir una edición, revisar también la vista de pantalla y la impresión en el navegador.
