# Narración de MathML

`lectura/math.js` convierte la presentación MathML en español sin servicios ni dependencias. La página entrega sus excepciones por separado, por ejemplo `fluidos/lectura-matematica.js`.

```js
import { createMathNarrator, narrateMath } from '../lectura/math.js';
import { mathRules } from './lectura-matematica.js';
const narrar = createMathNarrator(mathRules); // reutilizar para muchos elementos
const texto = narrar(elementoMath);
const otro = narrateMath(elementoMath, mathRules);
```

## Agregar o cambiar una excepción

Cada regla tiene `speech` y exactamente una clave: `tex` (contenido completo de la anotación `application/x-tex`, normalizado solo por espacios) o `id` (el ID del elemento `math`). `scope` es opcional: un selector CSS que debe coincidir con el elemento o alguno de sus antepasados. Las letras aisladas no reciben significados físicos globales.

```js
{ tex: String.raw`\rho=m/V`, speech: 'La densidad es igual a la masa dividida por el volumen' }
{ id: 'mi-formula', scope: '#mi-capitulo', speech: 'Transcripción de toda la fórmula' }
```

Copiá el TeX completo de la anotación o usá un ID estable; comprobá que el contexto justifique la interpretación y que la transcripción incluya toda la expresión. Editá o quitá la entrada para modificar o eliminar una excepción. No cambies el convertidor compartido para una corrección de página.

Las reglas duplicadas (misma clave y ámbito) producen error al crear el narrador. Si varias reglas aplican a un elemento y dicen cosas distintas, se informa un conflicto; si dicen lo mismo, se usa ese texto una sola vez. Las reglas prevalecen sobre la conversión automática. La anotación identifica la expresión: no se lee junto con su presentación.

## Límites y comprobación

La conversión marca los límites de fracciones, exponentes, subíndices y raíces para preservar la agrupación. Los límites de una integral o sumatoria en `msubsup` se leen como límites, no como exponentes. Usa `mathvariant="normal"` y nombres conocidos para unidades; otros símbolos se leen literalmente, sin atribuirles significado físico. Los operadores y elementos desconocidos se mencionan explícitamente y requieren revisión humana: la transcripción automática no demuestra por sí sola que una fórmula nueva sea inequívoca. En particular, algunos MathML generados pueden usar estructuras de presentación visual que necesiten una excepción contextual. La página de fluidos corrige con reglas exactas los subíndices textuales, diferencias con Δ y unidades de columna y subíndices de mercurio inventariados; la conversión automática no puede inferir ese contexto. Consultá [la auditoría](../fluidos/AUDITORIA-LECTOR.md) para las identidades cubiertas y los límites de la revisión.

Ejecutá `node tests/lector-math.test.mjs` con Node y Chromium instalados en `/usr/bin/chromium`. La prueba usa el DOM real del navegador y la página generada, sin capturas ni dependencias npm.
