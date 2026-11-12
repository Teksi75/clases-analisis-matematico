# Lector educativo de voz

El lector recorre los bloques académicos visibles en orden y usa las voces españolas disponibles en el dispositivo. Elegí capítulo y bloque, y pulsá **Reproducir**; no comienza solo al cargar o recuperar la posición. Pausa, reanudación, navegación y selección de voz y velocidad están en el reproductor. Los cambios de voz y velocidad se aplican al próximo fragmento.

## Agregar a otra página

Incluí `lector.css` y un módulo de configuración local. Indicá como raíz un contenedor que ya exista y sus selectores de capítulos:

```js
import { mountReader } from '../lectura/ui.js';
import { mathRules } from './lectura-matematica.js';
const lector = mountReader({
  root: document.querySelector('main'),
  contentSelector: ':scope > article', chapterSelector: 'article',
  chapterHeadingSelector: 'h1, h2', sectionHeadingSelector: 'h3, h4, h5, h6',
  excludeSelector: '.no-leer', mathRules, storageKey: 'lector-mi-pagina',
});
// Al desmontar: lector.destroy();
```

`storageKey` debe ser diferente por página. Se guardan voz, velocidad y posición solo en `localStorage`, si está disponible; sin acceso el lector sigue funcionando. Abrir o cerrar una resolución actualiza el recorrido y detiene la reproducción; pulsá Reproducir para continuar. Los ID de bloques sobreviven a cambios de visibilidad, pero pueden cambiar al modificar la estructura HTML.

## Arquitectura y exclusiones

`engine.js` controla la síntesis y sus eventos; `extractor.js` recorre el DOM; `math.js` narra MathML; `ui.js` monta los controles; el módulo de página aporta selectores y reglas. El extractor omite tablas completas, navegación, controles y elementos ocultos. Sumá subárboles con `excludeSelector`; consultá [EXTRACCION.md](EXTRACCION.md) para todas las opciones. Las reglas matemáticas son propias de cada página y prevalecen sobre la conversión automática. [MATEMATICAS.md](MATEMATICAS.md) explica cómo agregarlas, modificarlas y eliminarlas sin duplicados.

## Límites y pruebas

La Web Speech API depende del navegador, las voces instaladas y los gestos del usuario. Puede limitar la reproducción en segundo plano o prolongada y no garantizar la pausa nativa. No hay reinicios automáticos; tras un error se puede reintentar. La síntesis es compartida por la página: cancelar o pausar puede afectar otras aplicaciones de voz de la misma página. No se ha probado audio real en Android. Véase [MOTOR.md](MOTOR.md).

Desde la raíz, con Node y Chromium instalados:

```sh
node tests/lector-ui.test.mjs
node --test tests/lector-engine.test.mjs
node tests/lector-math.test.mjs
node tests/lector-extractor.test.mjs
```

Las pruebas simulan la voz; no prueban audio real.
