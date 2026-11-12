# Lector opcional: etapa 1

El cuaderno se abre sin reproductor ni voz. En los controles de lectura, pulsá **🎧 Escuchar** y luego **Reproducir**. Anterior y Siguiente recorren fragmentos; Configuración permite elegir capítulo y voz o detener. La velocidad cambia desde la barra. Minimizar conserva la lectura y ofrece Pausar y Restaurar; Cerrar lector cancela la voz y vuelve a Escuchar. Al recargar el lector permanece cerrado.

## Implementación y límites

- La presentación cerrada, abierta o minimizada es independiente del estado del motor. Se reutilizan extracción, narración matemática, segmentación, cola y cancelación con invalidación previa. El espacio inferior corresponde a la altura medida del control visible, incluida el área segura.
- La voz y la velocidad se guardan localmente cuando es posible. Los valores antiguos se aproximan a 0,8, 1, 1,2 o 1,5; los empates favorecen 1 y, si no participa, el menor. Los cambios se aplican al siguiente fragmento. El selector de capítulo se conserva en Configuración como alternativa accesible; Anterior y Siguiente recorren todos los bloques.
- Las tablas siguen excluidas. Abrir o cerrar una resolución detiene y reconstruye el recorrido. La selección de voz admite voces tardías y conserva una elección manual.
- El motor simulado no demuestra audio audible ni el comportamiento de todas las implementaciones nativas. La síntesis del navegador puede ser compartida con otras aplicaciones de voz de la página. No se probó audio real en Android.
- Contrato F11 ajustado por decisión explícita del responsable: el cierre conserva el scroll si sigue dentro del nuevo rango. Si la posición supera el nuevo máximo al retirar la reserva, se acepta únicamente el ajuste a ese máximo; siempre queda cero espacio del lector. La verificación independiente midió 42905→42844 con reserva 61→0 px en Chromium 1280×900: también cambió la posición visual del contenido, por lo que no se afirma igualdad numérica ni visual en ese extremo. La prueba de frontera cubre barra, configuración y minimizado.
- Las etapas 2 y 3 quedan expresamente diferidas; no se incorporaron reglas nuevas de seguimiento, navegación ni matemáticas.

## Evidencia de aceptación

La prueba `tests/lector-ui.test.mjs` usa Chromium con síntesis simulada. Los rótulos entre comillas son las aserciones de la prueba; las capturas son evidencia visual, no prueba de audio.

| F | Criterio | Evidencia ejecutada |
|---|---|---|
| 1 | Inicio cerrado | `F1: Escuchar disponible`, `F1: cerrado inicialmente`, `F1: sin espacio` |
| 2 | Abrir barra | `F2: barra abierta` |
| 3 | Abrir en silencio | `F3: abrir no reproduce`, `F3: abrir no resalta` |
| 4 | Reproducir | `F4: reproducción por teclado` |
| 5 | Pausar y reanudar | `F5: pausa`, `onend nativo en pausa no avanza`, `F5: reanudar después del onend` |
| 6 | Anterior y siguiente | `F6: siguiente`, `F6: anterior` |
| 7 | Minimizar continúa | `F7: minimizado`, `F7: continúa` |
| 8 | Pausar minimizado | `F8: pausa minimizada` |
| 9 | Cerrar cancela | `F9: cancelación` |
| 10 | Cerrar limpia resaltado | `F10: sin resaltado` |
| 11 | Scroll conservado dentro del rango; excepción aceptada al nuevo máximo | `F11: scroll intacto`, `cierre con configuración cerca del final`, `F11: extremo absoluto`, `F11: sólo ajuste al nuevo máximo` y `F11: reducción sólo por reserva`, en barra, configuración y minimizado |
| 12 | Cerrar quita espacio | `F12: sin barra`, `F12: sin espacio` |
| 13 | Recarga cerrada | `F13: recarga cerrada` y silencio |
| 14 | Persistencia de voz | `F14: voz persistente tardía` |
| 15 | Persistencia de velocidad | `F15: velocidad persistente`, `migración` y desempate |
| 16 | Sin doble reproducción | `F16: nunca hay dos emisiones activas` (simulación) |
| 17 | Eventos antiguos ignorados | `F17: eventos obsoletos`, `F17: cierre invalida eventos` |
| 18 | Extracción preservada | `F18: reproducción usa la extracción existente`, suite `lector-extractor.test.mjs` sin cambios |
| 19 | Móvil funcional | `F19: sin desborde`, `F19: controles` en 320, 375 y 1280 px; capturas |
| 20 | Navegación convencional | `F20: navegación convencional`, control de tamaño de texto y resoluciones |

Las capturas inspeccionadas están en `verificacion-visual/lector-etapa1-{desktop,mobile,minimized,closed}.png`. El directorio está ignorado por Git, por lo que las capturas no aparecen en `git status` y su inclusión en una entrega requiere una decisión explícita del coordinador. La barra móvil ocupa varias filas; los controles observados no desbordan y sus blancos miden al menos 24 px.

## Comandos y resultados observados

Ejecutados desde la raíz (salida 0 salvo indicación contraria):

```sh
python3 fluidos/generar.py                                  # HTML generado
python3 fluidos/generar.py --check                          # HTML actualizado
python3 -B -m unittest discover -s tests -p 'test_fluidos_*.py' -v  # 32 pruebas OK
node --test tests/lector-engine.test.mjs                    # 17 aprobadas
node tests/lector-ui.test.mjs                              # 5 grupos PASS
node tests/lector-extractor.test.mjs                       # PASS; 308/409 bloques
node tests/lector-math.test.mjs                            # PASS MathML
git diff --check                                           # sin errores
```

Antes de implementar: el motor pasó 15/15 y la interfaz pasó sus tres grupos originales. RED: `node --test tests/lector-engine.test.mjs` salió 1 con dos fallas esperadas (prioridad `es-419` y `idle` en vez de `finished`); `node tests/lector-ui.test.mjs` salió 1 porque Escuchar no existía (antes también se observó la barra inicial visible: 796 px). Durante la corrección, la prueba de scroll salió 1 dos veces con `1510 !== 1500`: se canceló el desplazamiento suave al cerrar y se corrigió la medición para tomar ambos valores en el mismo evento, evitando comparar cuadros de animación distintos. El grupo luego pasó. No se capturó RED separado por cada regla: es una limitación del registro test-first, no evidencia que pueda reconstruirse retroactivamente. Estas pruebas no sustituyen la verificación independiente del riesgo de eventos TTS asíncronos.

La verificación independiente ejecutó las seis suites requeridas en una copia selectiva temporal y dos sondas de síntesis simulada: todos los comandos salieron 0. Las sondas cubrieron cancelación sincrónica, eventos antiguos tras siguiente/detener/cerrar/reabrir, pausa, finalización, voces y cambios de velocidad sin reinicio. Detectó F11 incumplido en el extremo absoluto bajo el contrato original; el responsable aceptó expresamente la excepción descrita arriba. Se agregó después la prueba de frontera: la suite UI pasó sus cinco grupos con salida 0. El recheck independiente dirigido también pasó los seis casos (dentro del rango y al máximo, en barra/configuración/minimizado), salida 0 y stderr vacío; conservó 42824 dentro del rango y ajustó 42905→42844 al máximo. La primera ejecución de esa sonda salió 1 porque seguía una animación de desplazamiento; con `prefers-reduced-motion: reduce` y medición asentada pasó. Se conserva ese fallo de temporización como evidencia, no como defecto de producto ni prueba aprobada. No se repitió una barrida independiente general ni se afirma audio real.

La única página que monta este lector es Fluidos; no corresponde una comparación diferencial de otro consumidor. La regeneración oficial no produjo cambios en el HTML. La rama es `feat/fluidos-lector-etapa1` y la base es `35b9015149510950442db63f251a4379962a4a50`. La política de revisión es responsabilidad del coordinador: se informó que el issue #30 está abierto y aprobado, Pages apunta a `main /`, no se encontró política formal local, la API de rulesets devolvió `[]` y el PR #31 ya está fusionado con `type:feature`. No se publicó ni se creó PR.
