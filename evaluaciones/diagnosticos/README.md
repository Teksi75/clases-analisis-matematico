# Pruebas diagnósticas de Matemática por tema

Cuatro pruebas independientes para identificar conocimientos y dificultades antes de preparar las clases. Se limitan a los temas de los PDF importados: no incluyen Programación, computación ni electrónica. Las consignas son adaptaciones docentes con referencias explícitas, no evaluaciones oficiales del material original.

## Versión HTML

Abrí [index.html](index.html) en el navegador: incluye navegación por tema, tipografía ampliada, tablas adaptables y estilos de impresión A4. Funciona sin internet ni servidor. Las respuestas permanecen en una página docente separada; no están ocultas dentro de las pruebas.

Para imprimir o guardar una prueba como PDF, abrí su página y usá **Imprimir** en el navegador. Elegí la hoja del estudiante, no la guía docente. Las pruebas no son formularios: las respuestas se escriben en papel o en una hoja aparte.

Los Markdown siguen siendo las fuentes editables. El HTML conserva el contenido: no agrega una escala de ponderación distinta a la guía existente. La propuesta de ponderación conversada todavía no se incorporó como criterio aprobado.

## Hojas para estudiantes

| Prueba | Contenidos | Tiempo orientativo |
|---|---|---|
| [1 · Funciones](01-funciones.md) | Variables, evaluación, raíces, vértice, gráfica y dominio contextual. | 25–35 min |
| [2 · Límites y continuidad](02-limites-continuidad.md) | Laterales, factorización, continuidad, huecos y asíntotas. | 30–40 min |
| [3 · Derivadas](03-derivadas.md) | Polinomios, producto, cociente, trigonometría, composición y signo. | 30–40 min |
| [4 · Integrales](04-integrales.md) | Primitivas, comprobación, factores internos e integral definida como área. | 30–40 min |

Cada hoja contiene cinco ejercicios y es autosuficiente: no hace falta entregar los PDF para resolverla. Los tiempos son sugerencias de aplicación, no requisitos del curso. Podés imprimir cada hoja por separado desde tu visor Markdown; las respuestas están únicamente en la [guía docente](guia-docente.md).

## Cómo aplicarlas

1. Administrar cada prueba antes de abordar su bloque, no las cuatro seguidas como un examen único. Si se necesita un panorama inicial de todo el curso, repartirlas entre encuentros y registrar qué temas aún no fueron enseñados.
2. Explicar que no se busca aprobar o desaprobar. Pedir procedimientos y permitir la respuesta «No lo vi» para no confundir ausencia de enseñanza con dificultad.
3. En el primer intento, no dar pistas ni tablas de fórmulas; en Funciones se permite calculadora para aproximaciones. Si luego se brinda ayuda, anotar cuál fue y separar esa evidencia del intento autónomo.
4. Registrar por ejercicio interpretación, procedimiento y justificación. Usar la guía para decidir qué recuperar, sin reducir el diagnóstico a una nota total.

## Límites del instrumento

Es una selección breve, no una evaluación exhaustiva de cada variante del práctico. No incluye técnicas nuevas como integración por partes o sustitución general, ecuaciones diferenciales, programación ni física de circuitos. EVA2 no se usa como consigna porque su situación de descarga pertenece a un contexto informático. En Integrales se recupera una función de TP4 como objeto puramente matemático, sin ese contexto.

La secuencia general del proyecto está en [planificacion/secuencia.md](../../planificacion/secuencia.md). Estos diagnósticos no modifican ni eliminan otros materiales del repositorio; las clases de Programación quedan fuera de este trabajo.

## Regenerar el HTML

Solo para editar el material: se requieren Python 3 y Pandoc, ya disponibles en el entorno donde se generó esta versión. Para leer o imprimir los HTML no se necesita ninguna de estas herramientas. Después de modificar un Markdown, ejecutá desde la raíz del proyecto:

```bash
python3 - <<'PY'
from pathlib import Path
import re
import subprocess

folder = Path('evaluaciones/diagnosticos')
sources = sorted(folder.glob('*.md'))
names = {p.name: ('index.html' if p.name == 'README.md' else p.stem + '.html')
         for p in sources}
for source in sources:
    title = source.read_text().splitlines()[0].removeprefix('# ')
    result = subprocess.run(
        ['pandoc', str(source), '--from=markdown', '--to=html5', '--standalone',
         '--template=' + str(folder / 'plantilla.html'),
         '--metadata', 'pagetitle=' + title,
         '--metadata', 'markdownsource=' + source.name, '--wrap=none'],
        check=True, text=True, capture_output=True)
    html = re.sub(r'href="([^"#]+\.md)"',
                  lambda m: 'href="' + names.get(m[1], m[1]) + '"', result.stdout)
    (folder / names[source.name]).write_text(html)
print('HTML actualizado: ' + str(len(sources)) + ' páginas.')
PY
```

La plantilla es `plantilla.html` y los estilos son `diagnosticos.css`. No editar solamente los HTML generados: esos cambios se perderían al regenerar. Los enlaces al material fuera de esta colección conservan su formato original, por ejemplo los PDF y la planificación Markdown.
