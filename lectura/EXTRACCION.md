# Extracción de bloques de lectura

`extractBlocks(root, options)` recorre el DOM sin modificarlo y devuelve, en orden, registros `{ id, text, element, chapterId, chapterTitle, sectionTitle }`. Usá el contenedor de contenido, no toda la página:

```js
import { extractBlocks } from '../lectura/extractor.js';
import { createMathNarrator } from '../lectura/math.js';
import { mathRules } from './lectura-matematica.js';

const bloques = extractBlocks(document.querySelector('main#contenido'), {
  narrateMath: createMathNarrator(mathRules),
});
```

Por defecto procesa `:scope > article`, trata cada `article` como capítulo, `h1, h2` como título del capítulo y `h3, h4, h5, h6` como sección. `narrateMath` por defecto usa el convertidor genérico; inyectá el narrador de la página para aplicar sus reglas. Véase [MATEMATICAS.md](MATEMATICAS.md).

| Opción | Uso |
| --- | --- |
| `contentSelector` | Selector relativo a `root` para los contenidos; `null` procesa `root` mismo. |
| `excludeSelector` | Selector adicional para descartar subárboles. |
| `chapterSelector` | Selector de los elementos que inician capítulo; su `id` es el identificador del capítulo. |
| `chapterHeadingSelector` | Selector de títulos de capítulo. |
| `sectionHeadingSelector` | Selector de títulos de sección. |
| `narrateMath` | Función que recibe un elemento MathML y devuelve texto. |

Se excluyen tablas completas, navegación, controles, medios decorativos y contenido oculto, incluso por antepasados. Se incluye `summary` de un `details` cerrado, pero no su cuerpo. Tras abrir o cerrar uno, llamá otra vez al extractor; no altera su estado. Los ID de bloques se basan en la ruta de nodos, no en el ordinal visible: cambiar únicamente la visibilidad no desplaza los ID posteriores. Cambiar la estructura del DOM sí puede cambiarlos. El módulo también exporta `isVisible(element, stop?)`, que comprueba visibilidad y disclosures hasta el antepasado opcional `stop` inclusive; no aplica exclusiones por tipo o selector.

La extracción no elimina párrafos repetidos por igualdad de texto: pueden ser contenido legítimo. El elemento asociado a cada bloque es el contenedor del fragmento y permite resaltarlo sin alterar el contenido académico permanentemente. Las listas ordenadas incluyen su número visible estructural (`start`, `value` y `reversed`).

Ejecutá `node tests/lector-extractor.test.mjs` y `node tests/lector-math.test.mjs` con Node y Chromium instalado en `/usr/bin/chromium`.
