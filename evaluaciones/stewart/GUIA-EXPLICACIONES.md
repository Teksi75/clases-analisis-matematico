# Extender las explicaciones de Stewart

El piloto está aprobado y cerrado como patrón de interacción; solo el ejercicio 1 de Álgebra está implementado. Esta guía sirve para extenderlo al resto de Álgebra y, después, a Geometría analítica, Funciones y Trigonometría. Ninguna de esas adaptaciones está hecha todavía. Ver [el piloto y su mantenimiento](README.md#piloto-de-explicaciones-aprobado-y-cerrado) y [la evidencia de propuestas y dictamen](../../odd/pilotos/stewart-algebra-ejercicio-1.md).

## Experiencia aprobada

- Escribí para quien termina la secundaria, no para un curso universitario. Presentá primero una idea breve y clara; explicitá las condiciones matemáticas necesarias. Reservá el paso a paso para quien lo solicite.
- Conservá todas las consignas originales de un ejercicio agrupadas antes de su panel, sin respuestas visibles ni el rótulo «Desarrollo docente». No adelantes resultados en las etiquetas.
- Un panel por ejercicio: al cargar, ningún inciso está seleccionado. Los botones con letras muestran solo la explicación breve elegida. El detalle empieza cerrado y se cierra de nuevo al cambiar de selección.
- Mantené espacio generoso entre «Consultá una resolución» y los botones, y entre los propios botones, como en el diseño aprobado. Los controles deben poder usarse con teclado.
- Sin JavaScript, conservá el respaldo actual: cada explicación breve es un `details` nativo inicialmente cerrado, con su paso a paso anidado también cerrado. No dependas de servicios externos.

## Preparar contenido

1. En cada ejecución comprobá el acceso efectivo a los modelos propuestos; aparecer en un catálogo no garantiza disponibilidad. Registrá qué modelos respondieron.
2. Pedí propuestas independientes a distintos agentes y, si es posible, modelos diferentes, con las mismas consignas y rúbrica pedagógica. No compartas propuestas entre ellos.
3. Entregá las propuestas anonimizadas a un juez pedagógico de otro modelo, con la misma rúbrica; registrá su dictamen y correcciones. Si no está disponible, registrá la limitación en lugar de simular una evaluación independiente.
4. Verificá las matemáticas por separado y realizá revisión humana pedagógica antes de publicar. La selección del juez no hace automáticamente correcto todo el contenido; corregí y adaptá lo necesario.
5. Archivá entradas, modelos disponibles, propuestas, dictamen, verificaciones y decisiones. El [registro del ejercicio 1](../../odd/pilotos/stewart-algebra-ejercicio-1.md) es un ejemplo, no una garantía para futuras ejecuciones.

La rúbrica común evalúa corrección matemática y restricciones, claridad para el nivel secundario, justificación de los pasos, brevedad del primer nivel y aporte real del detalle sin redundancia. El juez puede rechazar ambas propuestas; revisá de nuevo cualquier versión integrada o corregida antes de incorporarla.

## Contrato del componente actual

Editá el Markdown fuente y usá el renderizado existente de `generar.py`, no el HTML generado. Después de las consignas agrupadas, seguí la estructura de `algebra.md`. Este fragmento ilustra un inciso; agregá un `details` hermano por cada letra:

```html
<script defer src="consulta-incisos.js"></script>

<section class="consulta-incisos" data-consulta-incisos aria-labelledby="consulta-ej2-titulo">
<h3 id="consulta-ej2-titulo">Consultá una resolución</h3>

<details id="consulta-ej2-a" data-inciso="a">
<summary><strong>(a)</strong> Explicación breve</summary>

Texto breve con resultado y razonamiento.

<details>
<summary>Paso a paso</summary>

Desarrollo detallado.

</details>
</details>
</section>
```

- Incluí el script local diferido **una sola vez por página**, no una vez por panel. Detecta todas las secciones con `data-consulta-incisos` y genera los botones; no los escribas a mano.
- Cada panel necesita un encabezado con ID único en toda la página y `aria-labelledby` que lo referencie. Cada `details` exterior necesita su propio ID globalmente único: el script lo usa para `aria-controls`. Si asignás un ID a la sección, también debe ser único; no reutilices los IDs del ejemplo entre ejercicios.
- Los `details[data-inciso]` son hijos directos de la sección, en el orden de las consignas; `data-inciso` contiene la letra del botón. Cada uno lleva `summary`, explicación breve y un `details` anidado para el paso a paso, sin `open` ni `hidden` iniciales. Aunque el paso a paso sea opcional para el estudiante, el script actual espera ese `details` en cada inciso.
- El script oculta las opciones hasta seleccionar una, actualiza `aria-pressed` y cierra el detalle al seleccionar. Con JavaScript desactivado quedan los dos niveles nativos. Conservá líneas en blanco alrededor del contenido Markdown dentro de las etiquetas, como en `algebra.md`.
- Reutilizá los estilos acotados a `.consulta-incisos` de `stewart.css` y los recursos locales para funcionar sin conexión. Mantené la clave original separada al final y señalá las erratas sin modificar ni ocultar la fuente.

## Color por examen

La interacción y el verde azulado de Álgebra están aprobados y aplicados en el piloto. Los demás pares son **referencias para una adaptación futura**, no estilos ya aplicados ni verificados:

| Examen | Color de acento | Contorno | Estado |
| --- | --- | --- | --- |
| Álgebra | verde azulado `#85c9c0` | `#618b85` | Aplicado al ejercicio 1 |
| Geometría analítica | azul `#90bdf2` | `#5c80a9` | Referencia futura |
| Funciones | violeta `#c3a7ec` | `#8c73ad` | Referencia futura |
| Trigonometría | ámbar `#e4bd79` | `#a18455` | Referencia futura |

Al adaptar cada examen, verificá contraste, foco y legibilidad en pantalla e impresión. El color es una identificación suplementaria, nunca la única: conservá nombres, letras y estados accesibles.

## Verificar cada extensión

Extendé `tests/test_stewart_piloto.py` y las pruebas del examen correspondiente para consignas, orden, controles cerrados, resultados y clave/erratas separadas. Extendé `tests/check_stewart_piloto.mjs` para cada ejercicio y área incorporados: estado inicial, selección única, reinicio del detalle, mouse y teclado, y respaldo sin JavaScript en escritorio y móvil. Extendé `evaluaciones/stewart/check-browser.mjs` cuando corresponda para navegación, presentación e impresión de las áreas adaptadas; revisá también la matemática y las capturas. Las pruebas actuales no demuestran esas futuras extensiones.

Desde la raíz, con Python 3, Pandoc 3.11 y las dependencias de navegador indicadas en el [README](README.md#mantenimiento):

```sh
python3 -B evaluaciones/stewart/generar.py
python3 -B evaluaciones/stewart/generar.py --check
python3 -B -m unittest discover -s tests -p 'test_stewart*.py' -v
node tests/check_stewart_piloto.mjs
node evaluaciones/stewart/check-browser.mjs
```

El primer comando regenera HTML; `--check` solo compara. Los comandos de navegador crean capturas en `verificacion-visual/`; consultá los requisitos y efectos en el README antes de ejecutarlos.
