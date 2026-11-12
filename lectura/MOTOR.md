# Motor de lectura

`engine.js` administra una cola de bloques y la Web Speech API. No extrae contenido, no modifica el DOM y no guarda preferencias: esas tareas corresponden al extractor y a la interfaz. No utiliza servicios externos ni dependencias.

## Integración mínima

```js
import { SpeechReader } from './engine.js';

const reader = new SpeechReader({ onChange: renderizarEstado });
reader.setBlocks([{ id: 'p1', text: 'Texto para leer.', element: parrafo,
  chapterId: 'c1', chapterTitle: 'Capítulo', sectionTitle: 'Sección' }]);
// Llamar desde un clic o pulsación de teclado, no al cargar la página.
reader.play(0);
```

El constructor acepta `{ synthesis, Utterance, onChange }`; por defecto usa `globalThis.speechSynthesis` y `globalThis.SpeechSynthesisUtterance`. La inyección permite probarlo sin navegador. `onChange(snapshot)` recibe actualizaciones después de los cambios, incluso `voiceschanged`; consultar `reader.snapshot` para obtener el estado inicial. La devolución no es asíncrona.

## Contrato para la interfaz

| Operación | Resultado |
| --- | --- |
| `setBlocks(blocks)` | Cancela la cola, sustituye los bloques y queda inactivo en el índice 0, o -1 si está vacía. Los objetos del bloque conservan sus referencias. |
| `play(index?)` | Desde el índice indicado comienza en su primer fragmento; sin índice reanuda una pausa, reintenta un error o comienza desde la posición actual. Un índice inválido no hace nada. Si ya reproduce y no recibe índice, no reinicia. |
| `pause()` / `resume()` | Pausa/reanuda el fragmento activo. Si terminó mientras estaba pausado, espera a reanudar para enviar el siguiente. `resume()` también permite reintentar el fragmento que falló. |
| `stop()` | Cancela y queda inactivo en el bloque actual, volviendo a su primer fragmento. |
| `previous()` / `next()` | Cambia al bloque contiguo, limitado a los extremos. Mantiene reproducción o pausa; desde inactivo/error selecciona sin empezar. |
| `setVoice(voice)` | Acepta únicamente una voz española disponible, por objeto o `voiceURI`; devuelve `true` si se acepta y `false` si se rechaza. |
| `setRate(rate)` | Acepta un número finito entre 0,75 y 1,5 inclusive; devuelve `true` o `false`. |
| `destroy()` | Cancela, retira el listener de voces y desactiva el motor; llamarlo al desmontar la interfaz. |

Voz y velocidad nuevas se aplican al **siguiente** fragmento, sin reiniciar el actual. Los bloques se dividen en fragmentos de hasta 200 unidades UTF-16, preferentemente en espacios, sin perder caracteres ni dividir pares sustitutos. No hay reinicios periódicos. Al llegar al final, el estado es `idle` y el bloque actual queda seleccionado; `play()` vuelve a comenzar ese bloque. La interfaz puede usar `play(0)` para comenzar toda la selección.

### Snapshot

| Campo | Significado |
| --- | --- |
| `state` | `idle`, `playing`, `paused` o `error`. |
| `index` / `block` | Índice del bloque seleccionado y objeto original, o `-1` / `null` si no hay bloques. |
| `chunkIndex` / `chunkCount` | Índice desde cero y cantidad de fragmentos del bloque. Si termina un fragmento durante una pausa, `chunkIndex` apunta al próximo, incluso si éste pertenece al bloque siguiente; la transición se completa al reanudar. |
| `voices` / `voice` | Copia de la lista española ordenada / voz seleccionada o `null`. |
| `hasArgentineVoice` | Permite advertir claramente cuando no hay voz argentina. |
| `rate` / `error` / `supported` | Velocidad elegida, mensaje visible o `null`, disponibilidad básica de síntesis y constructor. |

`spanishVoices(voices)` filtra y ordena voces españolas: Argentina, Latinoamérica, España y otras. El orden entre voces de la misma prioridad se conserva. Si llegan nuevas voces, la selección automática vuelve a aplicar la prioridad; una selección manual se conserva mientras esa voz esté disponible. `segmentText(text)` expone la misma segmentación que usa el motor. Ningún cambio de voces inicia reproducción automáticamente; si no hay voz española, el motor muestra un error y nunca solicita una voz implícita extranjera. Se vuelve a comprobar la disponibilidad antes de cada fragmento.

## Errores y límites

Un error de síntesis, incluso un `speak()` que lanza una excepción, detiene la secuencia y deja el mensaje en `snapshot.error`. Tras corregir la causa, el usuario puede pulsar reanudar/reproducir para reintentar el fragmento; no hay reintentos automáticos. Si falta la API, los controles son seguros y reproducir informa el error. Los navegadores pueden requerir un gesto del usuario, limitar el uso en segundo plano o bloquear lecturas prolongadas. La pausa y reanudación nativas dependen de la plataforma: el motor no puede garantizar la pausa si el navegador la ignora. No se ha verificado reproducción real en Android.

Los tokens del motor descartan eventos tardíos de fragmentos cancelados o reemplazados. `speechSynthesis` es compartido por la página: `cancel`, `pause` y `resume` también pueden afectar síntesis iniciada por otros componentes. Evitar múltiples lectores simultáneos.

## Prueba

```sh
node --test tests/lector-engine.test.mjs
node --check lectura/engine.js
```

Las pruebas usan síntesis simulada; no sustituyen una prueba de audio real ni prueban la interfaz o la extracción de contenido.
