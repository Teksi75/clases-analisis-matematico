# Lector educativo de voz

El lector recorre los bloques académicos visibles en orden y usa las voces españolas disponibles en el dispositivo. Pulsá **🎧 Escuchar** y luego **Reproducir**: no empieza automáticamente. Al abrir, prepara el apartado visible; si no puede identificarlo, usa la posición guardada. Usá Anterior y Siguiente para recorrer fragmentos. En Configuración podés elegir capítulo, encabezado o punto de lectura, elegir voz y detener. El índice lateral también selecciona el destino mientras el lector está abierto: si reproduce, continúa allí; si está pausado o detenido, conserva ese estado. Al desplazarte manualmente, el audio continúa y se suspende el desplazamiento automático; pulsá **Seguir lectura** para retomarlo. El contador «Fragmento … de …» corresponde al capítulo, no a una duración. El selector de velocidad ofrece 0,8×, 1×, 1,2× y 1,5×; los cambios de voz y velocidad se aplican al próximo fragmento. Minimizar conserva la reproducción; Cerrar lector la cancela y devuelve el foco a Escuchar.

## Agregar a otra página

Incluí `lector.css` y un módulo de configuración local. Indicá como raíz un contenedor que ya exista y sus selectores de capítulos:

```js
import { mountReader } from '../lectura/ui.js';
import { mathRules } from './lectura-matematica.js';
const lector = mountReader({
  root: document.querySelector('main'),
  contentSelector: ':scope > article', chapterSelector: 'article',
  chapterHeadingSelector: 'h1, h2', sectionHeadingSelector: 'h3, h4, h5, h6',
  excludeSelector: '.no-leer', indexSelector: '.indice a[href^="#"]',
  mathRules, storageKey: 'lector-mi-pagina',
});
// Al desmontar: lector.destroy();
```

`indexSelector` es opcional y señala los enlaces del índice que seleccionan un destino sin impedir la navegación normal. `storageKey` debe ser diferente por página. Se guardan voz, velocidad y posición solo en `localStorage`, si está disponible; sin acceso el lector sigue funcionando. Abrir o cerrar una resolución actualiza el recorrido y conserva la posición y el transporte si el contenido sigue siendo identificable. Si desaparece, se prepara el encabezado legible más cercano en pausa. Si no se puede conservar la emisión y es necesario sustituirla, no se conoce el instante exacto dentro del fragmento de voz. Los ID de bloques sobreviven a cambios de visibilidad, pero pueden cambiar al modificar la estructura HTML.

## Navegación desde el motor

Para integrar `SpeechReader` con controles propios:

```js
reader.select(index); // Selecciona un bloque existente, desde su primer fragmento.
reader.setBlocks(blocks, { index, chunkIndex: 0 }); // Sustituye la secuencia en una posición segura.
reader.setBlocks(blocks, { index: headingIndex, paused: true }); // Alternativa segura sin reproducir.
reader.reconcileBlocks(blocks, index); // Conserva la emisión si la identidad y el contenido coinciden.
```

`reconcileBlocks` valida que el elemento, texto y contexto de capítulo y sección coincidan con el bloque del motor; si se aporta `chapterElement`, también exige la misma identidad del elemento de capítulo. Rechaza cambios sin efectos. Conserva el fragmento y la emisión actual, y actualiza la cola futura. El integrador debe comprobar además que la identidad no sea ambigua. `select` conserva el estado de transporte: si estaba reproduciendo continúa en el nuevo bloque; si estaba pausado o detenido no inicia audio. También conserva los estados `idle`, `finished` y `error`. La sustitución con posición conserva el estado del mismo modo; `paused: true` fuerza una pausa, incluso durante la reproducción. `chunkIndex` es opcional y vale cero por defecto. El integrador debe comprobar que la identidad del contenido sigue siendo segura antes de conservar una posición; ante una posición inválida, debe elegir el encabezado adecuado y usar la alternativa pausada. Ambas operaciones devuelven `false` sin cambios ni cancelación si la posición es inválida, y `true` si se acepta; índices y fragmentos deben ser enteros dentro de sus respectivos rangos (un bloque sin texto admite el fragmento cero). No se acepta una secuencia vacía con posición explícita. La llamada existente `setBlocks(blocks)` sigue reemplazando la secuencia desde el principio en estado `idle` y admite una secuencia vacía.

## Arquitectura y exclusiones

`engine.js` controla la síntesis y sus eventos; `extractor.js` recorre el DOM; `math.js` narra MathML; `ui.js` monta los controles; el módulo de página aporta selectores y reglas. El extractor excluye deliberadamente las tablas y todo su contenido; usa los textos alternativos existentes y significativos de las imágenes para los diagramas, sin inventar descripciones. Omite navegación, controles y elementos ocultos. Sumá subárboles con `excludeSelector`; consultá [EXTRACCION.md](EXTRACCION.md) para todas las opciones. Las reglas matemáticas son propias de cada página y prevalecen sobre la conversión automática. [MATEMATICAS.md](MATEMATICAS.md) explica cómo agregarlas, modificarlas y eliminarlas sin duplicados.

## Límites y pruebas

La Web Speech API depende del navegador, las voces instaladas y los gestos del usuario. Puede limitar la reproducción en segundo plano o prolongada y no garantizar la pausa nativa. No hay reinicios automáticos; tras un error se puede reintentar. La síntesis es compartida por la página: cancelar o pausar puede afectar otras aplicaciones de voz de la misma página. No se ha probado audio real en Android. Véase [MOTOR.md](MOTOR.md).

Desde la raíz, con Node y Chromium instalados:

```sh
node tests/lector-follow.test.mjs
node tests/lector-navigation.test.mjs
node tests/lector-ui.test.mjs
node --test tests/lector-engine.test.mjs
node tests/lector-math.test.mjs
node tests/lector-extractor.test.mjs
```

Las pruebas simulan la voz; no prueban audio real.
