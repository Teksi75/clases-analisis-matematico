# Reusable educational speech reader
Objective: Faithful DOM-order educational speech and verifiable Spanish MathML narration; branch `feat/lector-educativo` from `hidroestatica` at `a29580f`.
Delivery: feature-branch-chain (human selected); push/PR/deployment requested and GitHub CLI session authorized; no merge or repository/URL rename authorized. Tests: Node built-ins + installed Chromium, Python unittest and generator checks.

## Specs
S1. "No incorporar servicios pagos ni infraestructura innecesaria." "No utilizar APIs externas de síntesis de voz." "No introducir dependencias pesadas." "Mantener compatibilidad con GitHub Pages." "No alterar el contenido académico." "No modificar innecesariamente el diseño existente." "La solución debe ser modular y reutilizable en otras páginas del repositorio."
S2. "Utilizar la Web Speech API (`speechSynthesis` y `SpeechSynthesisUtterance`)." "El motor de lectura debe controlar qué texto se envía al sintetizador, sin depender del modo lectura del navegador."
S3. "1. Español argentino (`es-AR`)." "2. Español latinoamericano (`es-MX`, `es-UY` u otra variante disponible)." "3. Español general (`es-ES`)." "4. Otra voz en español disponible." "Nunca seleccionar automáticamente una voz de otro idioma para leer contenido en español." "Utilizar `speechSynthesis.getVoices()` y escuchar el evento `voiceschanged`." "Permitir seleccionar manualmente la voz entre las disponibles." "Mostrar claramente cuando no exista una voz argentina." "Agregar control de velocidad entre 0,75× y 1,5×." Current accepted deferral: "dime si hay un selector de español, si es así dejamos pendiente el cambio por defecto a es-419."
S4. "El lector debe recorrer el contenido académico respetando estrictamente el orden del DOM." "Debe leer:" "Títulos de capítulos." "Subtítulos." "Todos los párrafos." "Definiciones." "Ampliaciones." "Advertencias." "Listas y enumeraciones." "Consignas de ejercicios." "Explicaciones y conclusiones." "Debe omitir:" "Menús y navegación." "Botones y controles." "Elementos decorativos." "Tablas completas." "Elementos ocultos." "Contenido duplicado."
S5. "Los recuadros `.ampliacion`, `.definicion`, `.aviso` y `.ejercicio` deben incluirse siempre que su contenido esté visible." "Los elementos `<details>` cerrados no deben abrirse automáticamente. Incluir sus contenidos cuando estén abiertos y permitir actualizar el recorrido si cambia su estado." "Evitar tanto la omisión como la duplicación de párrafos al procesar elementos anidados." "No utilizar exclusivamente `innerText` de contenedores grandes ni depender de los algoritmos de extracción del navegador."
S6. "Implementar un módulo de conversión a lenguaje matemático oral en español." "«La densidad es igual a la masa dividida por el volumen»." "«La presión es igual a la densidad por la aceleración de la gravedad por la profundidad»." "«La fuerza es igual a la presión multiplicada por el área»." "Reconocer fracciones, potencias, subíndices, raíces, igualdades, desigualdades y operaciones básicas." "Reconocer letras griegas." "Pronunciar correctamente las unidades físicas." "No inventar significados físicos cuando una variable resulte ambigua." "Mantener una correspondencia verificable entre la expresión original y la narración." "Priorizar la exactitud matemática sobre la naturalidad cuando exista un conflicto."
S7. "Controles necesarios:" "Reproducir." "Pausar." "Reanudar." "Detener." "Párrafo anterior." "Párrafo siguiente." "Seleccionar voz." "Modificar velocidad." "Iniciar lectura desde el comienzo de un capítulo." "También debe permitir iniciar la lectura desde el párrafo seleccionado por el usuario, mediante un control contextual o mecanismo simple y accesible." "Resaltar el párrafo activo." "Desplazar suavemente la pantalla cuando corresponda." "Evitar desplazamientos innecesarios." "Mostrar el capítulo o sección que se está leyendo." "Permitir seguir consultando el documento." "El resaltado no debe modificar permanentemente el HTML académico." "Los controles deben funcionar mediante teclado y en pantallas táctiles."
S8. "Dividir el contenido en unidades de lectura razonables." "Evitar enviar capítulos completos como una única cadena al sintetizador." "Gestionar los eventos de finalización y error para mantener la secuencia." "No introducir reinicios periódicos arbitrarios que puedan duplicar o cortar palabras." "Si una limitación del navegador no puede resolverse completamente, documentarla."
S9. "Separar claramente:" "A. Motor de lectura" "B. Extractor de contenido" "C. Adaptador matemático" "D. Interfaz" "E. Configuración específica de página" "Evitar incorporar toda la implementación dentro de `fluidos/index.html` o del archivo `teoria/lectura.js`." "No desarrollar un framework general ni añadir abstracciones innecesarias."
S10. "Guardar localmente, mediante `localStorage`, cuando esté disponible:" "Voz preferida." "Velocidad." "Último capítulo." "Último bloque de lectura." "No recopilar datos personales." "La posición de lectura debe poder recuperarse después de recargar la página, pero la reproducción no debe iniciarse automáticamente."
S11. "Utilizar pruebas automatizadas para extracción, orden y conversión matemática." "No afirmar que la reproducción funciona correctamente en Android sin haber realizado una prueba real en ese entorno." All ten validation criteria in L1 apply.
S12. "Crear documentación breve que explique:" "Arquitectura del lector." "Cómo agregarlo a otra página." "Cómo excluir elementos." "Cómo proporcionar pronunciaciones matemáticas personalizadas." "Limitaciones conocidas de la Web Speech API." "Cómo ejecutar las pruebas."
S13. "Asociar una expresión MathML con su transcripción oral." "Permitir identificar expresiones mediante un ID estable o una regla específica." "Mantener las pronunciaciones personalizadas separadas del motor general." "Dar prioridad a estas definiciones sobre la conversión automática." "Permitir incorporar nuevas correcciones sin modificar el código principal del lector." "Evitar que una misma expresión tenga distintas pronunciaciones por duplicación accidental." "Documentar cómo agregar, modificar y eliminar estas excepciones." "La arquitectura debe permitir que cada página tenga sus propias reglas matemáticas, mientras comparte el mismo motor de conversión." "Incluir pruebas para verificar que las pronunciaciones personalizadas prevalezcan sobre las automáticas."

S14. "haz push PR y despligue pero antes dime qué falta para su implementación funcional" "Autorizo a usar a sesión de GitHub CLI, pero creo que deberíamos renombrar la dirección (no se trata de análisis matemático para despues)"

## Tasks
T1 | S1-S3,S6,S8-S9,S13 | parallel workers: independent MathML adapter and speech engine, each with tests; 100+ lines each, disjoint surfaces | done | engine 761ad7c + 1bf1d8c, GREEN15/15 + independent S3 recheck2/2; math f240a4d GREEN with scoped-rule regression proof.
T2 | S1,S4-S6,S9,S11,S13 | worker (context backstop): extractor, complete content/math audit and DOM regression tests | done | extractor GREEN and authorized class corrected: 13 exact chapter-scoped rules cover 15 pending occurrences; inventory 17 includes 2 previously fixed; all required checks GREEN; parent job-4 exit0; extractor/audit commit2cd5868, math rules f240a4d.
T3 | S1-S5,S7-S10,S12-S13 | worker (context backstop): accessible UI, page configuration, generated integration and reuse documentation | done | continuation GREEN: 3/3 UI scenarios, engine 15/15, math/extractor, generator, Python 32/32 and syntax; baseline-only 195px overflow isolated; speed slider touch target fixed; UI work-unit320717f; independent T4 pending.
T4 | S1-S13 | parent seam checks + independent verifier for speech event concurrency (Risk item 4); native assessment/review only on offered route | done | code/probe evidence320717f + helper correction4ac0337; parent full suite GREEN, independent functional verification + blocker-only recheck GREEN; native engine/UI reviews approved and acknowledgement burned; final record in this documentation commit. Android audio and actual200%browser zoom unverified.

T5 | S14 | parent: authenticated target/base/policy checks, scope-preserving branch push and linked PR creation | in_progress | clean branch pushed7d3c4e8; human explicitly authorized new approved reader issue and nonclosing Refs linkage, now creating/verifying it before PR.
T6 | S14 | parent: deploy through observed Pages route after explicitly authorized integration, then target URL checks | pending | explicit main-merge/Pages authorization received, conditional on required checks. PR first; then merge and observe Pages build, with independent public delivery verification (Risk item5).

## Log
L1. Original request (verbatim):

# Implementar lector de voz educativo reutilizable

## 1. Contexto del proyecto

Repositorio: `Teksi75/clases-analisis-matematico`

Página objetivo:
`https://teksi75.github.io/clases-analisis-matematico/fluidos/index.html`

Archivos relevantes:
- `fluidos/index.html`
- `teoria/lectura.js`

El sitio está publicado en GitHub Pages.

La página contiene material de Mecánica de los Fluidos, con capítulos teóricos, párrafos, definiciones, ampliaciones, advertencias, ejercicios, tablas y aproximadamente 470 expresiones MathML.

Actualmente, la función de lectura del navegador omite partes importantes del contenido.

Quiero implementar un lector integrado en la propia página, independiente de los algoritmos de extracción del modo lectura del navegador.

**Restricciones importantes:**
- La página será utilizada por solamente dos alumnos.
- No incorporar servicios pagos ni infraestructura innecesaria.
- No utilizar APIs externas de síntesis de voz.
- No introducir dependencias pesadas.
- Mantener compatibilidad con GitHub Pages.
- No alterar el contenido académico.
- No modificar innecesariamente el diseño existente.
- La solución debe ser modular y reutilizable en otras páginas del repositorio.

## 2. Tecnología

Utilizar la Web Speech API (`speechSynthesis` y `SpeechSynthesisUtterance`).

El motor de lectura debe controlar qué texto se envía al sintetizador, sin depender del modo lectura del navegador.

Tener presente que las voces disponibles y algunas funciones de reproducción dependen del sistema operativo y del navegador.

No asumir que todos los dispositivos tienen voces argentinas instaladas.

## 3. Selección de voz

Prioridad de selección:

1. Español argentino (`es-AR`).
2. Español latinoamericano (`es-MX`, `es-UY` u otra variante disponible).
3. Español general (`es-ES`).
4. Otra voz en español disponible.

Nunca seleccionar automáticamente una voz de otro idioma para leer contenido en español.

Utilizar `speechSynthesis.getVoices()` y escuchar el evento `voiceschanged`.

Permitir seleccionar manualmente la voz entre las disponibles.

Mostrar claramente cuando no exista una voz argentina.

Agregar control de velocidad entre 0,75× y 1,5×.

## 4. Selección del contenido

El lector debe recorrer el contenido académico respetando estrictamente el orden del DOM.

Debe leer:

- Títulos de capítulos.
- Subtítulos.
- Todos los párrafos.
- Definiciones.
- Ampliaciones.
- Advertencias.
- Listas y enumeraciones.
- Consignas de ejercicios.
- Explicaciones y conclusiones.

Debe omitir:

- Menús y navegación.
- Botones y controles.
- Elementos decorativos.
- Tablas completas.
- Elementos ocultos.
- Contenido duplicado.

Los recuadros `.ampliacion`, `.definicion`, `.aviso` y `.ejercicio` deben incluirse siempre que su contenido esté visible.

Los elementos `<details>` cerrados no deben abrirse automáticamente. Incluir sus contenidos cuando estén abiertos y permitir actualizar el recorrido si cambia su estado.

Evitar tanto la omisión como la duplicación de párrafos al procesar elementos anidados.

No utilizar exclusivamente `innerText` de contenedores grandes ni depender de los algoritmos de extracción del navegador.

## 5. Lectura de expresiones matemáticas

Este apartado es especialmente importante.

La página utiliza MathML. Implementar un módulo de conversión a lenguaje matemático oral en español.

Ejemplos:

`ρ = m / V`

Debe leerse:

«La densidad es igual a la masa dividida por el volumen».

`P = ρgh`

Debe leerse:

«La presión es igual a la densidad por la aceleración de la gravedad por la profundidad».

`F = P · A`

Debe leerse:

«La fuerza es igual a la presión multiplicada por el área».

**Requisitos:**

- Reconocer fracciones, potencias, subíndices, raíces, igualdades, desigualdades y operaciones básicas.
- Reconocer letras griegas.
- Pronunciar correctamente las unidades físicas.
- Evitar leer expresiones matemáticas como secuencias incomprensibles de símbolos.
- Utilizar el MathML existente y sus anotaciones cuando resulte útil.
- Crear un mecanismo de transcripción oral explícita para las expresiones que requieran interpretación contextual.
- No inventar significados físicos cuando una variable resulte ambigua.
- Mantener una correspondencia verificable entre la expresión original y la narración.

Priorizar la exactitud matemática sobre la naturalidad cuando exista un conflicto.

El módulo matemático debe ser reutilizable.

## 6. Interfaz del reproductor

Incorporar un reproductor discreto que se integre al diseño actual.

Controles necesarios:

- Reproducir.
- Pausar.
- Reanudar.
- Detener.
- Párrafo anterior.
- Párrafo siguiente.
- Seleccionar voz.
- Modificar velocidad.
- Iniciar lectura desde el comienzo de un capítulo.

También debe permitir iniciar la lectura desde el párrafo seleccionado por el usuario, mediante un control contextual o mecanismo simple y accesible.

Durante la reproducción:

- Resaltar el párrafo activo.
- Desplazar suavemente la pantalla cuando corresponda.
- Evitar desplazamientos innecesarios.
- Mostrar el capítulo o sección que se está leyendo.
- Permitir seguir consultando el documento.

El resaltado no debe modificar permanentemente el HTML académico.

Los controles deben funcionar mediante teclado y en pantallas táctiles.

## 7. Compatibilidad y estabilidad

Prestar especial atención a Chrome en Android y a navegadores de escritorio.

Considerar:

- La necesidad de iniciar la síntesis mediante una interacción del usuario.
- El comportamiento de `speechSynthesis.pause()`, `resume()` y `cancel()`.
- La disponibilidad tardía de voces.
- Los errores de síntesis.
- Las restricciones al reproducir en segundo plano.
- Los posibles bloqueos en lecturas prolongadas.
- La reanudación entre fragmentos.

Dividir el contenido en unidades de lectura razonables.

Evitar enviar capítulos completos como una única cadena al sintetizador.

Gestionar los eventos de finalización y error para mantener la secuencia.

No introducir reinicios periódicos arbitrarios que puedan duplicar o cortar palabras.

Si una limitación del navegador no puede resolverse completamente, documentarla.

## 8. Arquitectura reutilizable

Separar claramente:

**A. Motor de lectura**

Responsable de la cola de lectura, síntesis de voz, estado y controles.

**B. Extractor de contenido**

Responsable de identificar y ordenar los bloques que deben leerse.

**C. Adaptador matemático**

Responsable de transformar MathML y otras expresiones en lenguaje oral.

**D. Interfaz**

Responsable de mostrar los controles y actualizar su estado.

**E. Configuración específica de página**

Responsable de definir los selectores, exclusiones y reglas particulares de Mecánica de los Fluidos.

Evitar incorporar toda la implementación dentro de `fluidos/index.html` o del archivo `teoria/lectura.js`.

Proponer una estructura de archivos sencilla que permita reutilizar los módulos en futuras páginas.

La integración con una nueva página debería requerir principalmente definir su contenedor de contenido, sus exclusiones y sus reglas matemáticas específicas.

No desarrollar un framework general ni añadir abstracciones innecesarias.

## 9. Persistencia

Guardar localmente, mediante `localStorage`, cuando esté disponible:

- Voz preferida.
- Velocidad.
- Último capítulo.
- Último bloque de lectura.

No recopilar datos personales.

No utilizar cuentas, autenticación ni servicios externos.

La posición de lectura debe poder recuperarse después de recargar la página, pero la reproducción no debe iniciarse automáticamente.

## 10. Validación

Realizar una auditoría del contenido y construir pruebas que verifiquen:

1. Que todos los párrafos visibles se incluyan en la secuencia.
2. Que las tablas estén excluidas.
3. Que las definiciones y ampliaciones se incluyan.
4. Que no existan duplicaciones.
5. Que el orden de lectura coincida con el orden del documento.
6. Que las fórmulas principales tengan una narración comprensible y correcta.
7. Que la navegación por capítulos funcione.
8. Que la pausa y la reanudación mantengan el estado.
9. Que la ausencia de voces argentinas no impida elegir otra voz española.
10. Que la página continúe funcionando si la API de voz no está disponible.

Utilizar pruebas automatizadas para extracción, orden y conversión matemática.

No afirmar que la reproducción funciona correctamente en Android sin haber realizado una prueba real en ese entorno.

## 11. Documentación

Crear documentación breve que explique:

- Arquitectura del lector.
- Cómo agregarlo a otra página.
- Cómo excluir elementos.
- Cómo proporcionar pronunciaciones matemáticas personalizadas.
- Limitaciones conocidas de la Web Speech API.
- Cómo ejecutar las pruebas.

## 12. Criterios de aceptación

La implementación estará lista cuando:

- El lector funcione integrado en la página de Mecánica de los Fluidos.
- El contenido académico visible se recorra sin omisiones ni duplicaciones detectables por las pruebas.
- Las tablas no sean narradas.
- Las fórmulas relevantes tengan pronunciaciones matemáticamente correctas.
- Se pueda controlar la reproducción por párrafos y capítulos.
- Exista selección de voces españolas disponibles.
- El diseño original permanezca intacto.
- La solución sea reutilizable mediante configuración en otras páginas.

## 13. Metodología de trabajo

1. Inspeccionar el repositorio y su organización.
2. Auditar la estructura de la página.
3. Diseñar una solución mínima y modular.
4. Implementar el motor y el extractor.
5. Incorporar la narración matemática.
6. Integrar la interfaz.
7. Ejecutar pruebas y corregir problemas.
8. Documentar las decisiones.
9. Informar archivos modificados y limitaciones pendientes.

Trabajar sobre el repositorio actual y respetar sus convenciones.

No crear una aplicación nueva ni reestructurar el proyecto completo.

**Prioridad principal: fidelidad y continuidad de la lectura educativa, por encima de características visuales o funciones adicionales.** ### Sistema de pronunciaciones matemáticas personalizadas

Implementar un mecanismo de excepciones que permita definir manualmente cómo debe pronunciarse una expresión matemática determinada.

Requisitos:

- Asociar una expresión MathML con su transcripción oral.
- Permitir identificar expresiones mediante un ID estable o una regla específica.
- Mantener las pronunciaciones personalizadas separadas del motor general.
- Dar prioridad a estas definiciones sobre la conversión automática.
- Permitir incorporar nuevas correcciones sin modificar el código principal del lector.
- Evitar que una misma expresión tenga distintas pronunciaciones por duplicación accidental.
- Documentar cómo agregar, modificar y eliminar estas excepciones.

La arquitectura debe permitir que cada página tenga sus propias reglas matemáticas, mientras comparte el mismo motor de conversión.

Incluir pruebas para verificar que las pronunciaciones personalizadas prevalezcan sobre las automáticas.

L2. Human delivery selection: "Cadena sobre rama de funcionalidad (recomendado)". No publishing authorized.
L3. Read-only exploration: generated HTML uses fluidos/generar.py + plantilla.html; existing teoria/lectura.js serves three pages and remains unchanged. Main academic scope: main > article; #lectura is sources/coverage, not academic chapter content. Closed details stay closed; tables and duplicated aria-hidden captions excluded. Explicit contextual math rules are scoped by expression/section, never a global physical dictionary for ambiguous variables. Installed Node v26.13.0, Chromium and Pandoc; 29 GB free. Existing human edits preserved. Native RDD mode on (global).
L4. Contracts planned: ES modules under lectura/; math.js exports createMathNarrator(rules) and narrateMath(math,rules), returning text with inspectable source/match metadata where useful; engine.js exports SpeechReader consuming ordered blocks {id,text,element,chapterId,chapterTitle,sectionTitle}, event-driven onChange snapshots, injected speech API for deterministic tests. No other modules until these contracts are finalized. Parallel writers own disjoint math/engine surfaces.
L5. Baseline checks before reader integration: `python3 fluidos/generar.py --check && python3 -B -m unittest discover -s tests -p 'test_fluidos_*.py' -v` exited 0; 32 tests passed. Worker tasks mwdgeilv-2-pioz (math) and mwdgein3-3-dclh (engine) launched on disjoint surfaces; continuation is receipt-driven, no polling.
L6. Engine worker completed: 13 tests; parent reproduced and corrected a documented URI-selection discrepancy test-first (RED exit 1 with 13 pass / 1 fail; GREEN exit 0 with 14 pass). `node --check lectura/engine.js` exit 0. Work-unit commit 761ad7c4400690d18e607fff516f72efe0b46ca0, 578 authored lines; cohesive engine+tests+contract, advisory 400-line target exceeded without cosmetic splitting. Slice 1 = this commit only, base a29580fc8dddf6df7dec574d340e906825f8ff91 (do not include earlier hidroestatica history in reader review). Risk: item 4 (asynchronous cancellation and stale callbacks). Independent engine verifier mwdgmby6-4-ezw0 running. Native ASSESS with concurrency escalation: independentVerifier true; native unassessable due undeclared ambient untracked files. INSPECT with untrackedScope exclude returned ready; no lineage started, no review of human edits authorized. Reassess committed engine range after verifier; RDD must not include unrelated worktree edits.
L7. Independent verifier found S3 late Argentina auto-priority defect (14 existing tests pass; independent probes 4 pass / 1 fail). Parent reproduced RED exit 1, separated explicit preferredVoice from automatic choice, then GREEN 15/15 + syntax exit 0. Correction commit 1bf1d8c2d284c6a3a66629616d3aedbeda5751cf; slice 1 now engine + correction, 601 authored lines; other slices remain separate. Bounded blocker-only recheck mwdgq7ez-5-76fy running. Math worker completed 433 lines with GREEN browser tests, 470 actual MathML expressions inventoried, Pandoc closing-delimiter scripts handled. Parent math spot check job-2 running. Rule schema {tex,speech,scope?} or {id,speech,scope?}; createMathNarrator returns element=>string. T2 can now consume stable math/helper interfaces; engine review excludes uncommitted math/extractor work.
L8. Parent math spot check job-2 exited 0 (Chromium MathML/custom rules/conflicts and JS syntax). Bounded engine recheck mwdgq7ez-5-76fy resolved original S3 blocker: 2 independent probes + 15 engine tests + syntax all exit 0, no autoplay, manual choice preserved. Native START preflight: first rejected retained-selection target mismatch without mutation; corrected through target-scoped INSPECT input {baseRef,committedOnly} + untrackedScope exclude. Subsequent host consent path preflight reported untracked inventory changed while T2 worker creates files; mutation_outcome not_started, no authority created. Do not replay START automatically; wait for T2 to stabilize inventory, then fresh targeted INSPECT and only its offered START. No review of unrelated human changes, no maintenance/recovery/reset authorized.
L9. T2 worker returned partial, not declared exhausted: extractor and structural audit GREEN, but 19 eligible expressions with textual subscripts and 2 delta expressions have incorrect automatic narration. Original-state 308 blocks/632 oracle text nodes/199 MathML; all details open 409/818/332; 138 table-only MathML excluded, 470 total. One automatic in-scope correction batch will address every listed S6 blocker test-first; no budget reset. Native engine review now bound to review-b8f4520e3e81af1e (base a29580f, candidate 1bf1d8c, frozen 3 engine files, 597 logical lines, 200 logical correction budget). Group capture rejected wrapper shape before mutation; use fresh STATUS exact binding strings, not outer wrappers. No candidate bytes given to reviewers outside native freeze.
L10. Engine native review completed: 3 reviewer runs, approved with informational advisories only, no correction route. Bound STATUS offered acknowledgement; gentle_review acknowledge-approved returned native-approved-acknowledgement-completed, authority burned, consumed revision sha256:672955fb0be60bdc4ccfc88625895d1ccf879d1576331db6d9253f65ea38c784. Do not query this burned lineage again or treat approval as publishing permission. Slice-1 boundary now 1bf1d8c; future committed units assessed against their preceding boundary, never accumulated hidroestatica history.
L11. The one T2 correction batch returned partial: all 21 previously flagged annotations have exact chapter-scoped rules and expected-speech tests; new audit identifies 14 incorrect mca/mmHg/h_{Hg} occurrences. Node math/extractor, extractor syntax and generator checks pass but DO NOT prove full S6 correctness. Targeted suspicion counts for old 21 are zero; new columnUnits audit lists unresolved 14. Earlier enumeration run exited 1 after probes on Chromium profile cleanup ENOTEMPTY; later required extractor run passed. No extra automatic correction or verifier is permitted for new findings in this cycle. All 7 child tasks confirmed completed; no active or uncertain child. T2 blocked for a human-controlled new request. T3 has NOT started: no player UI, page loader, persistence or template integration exists; academic HTML and shared teoria/lectura.js unchanged. T4 integration tests pending; no Android real audio tested. User's original objective is not complete and nothing was pushed or deployed.
L12. Proposed explicit bounded continuation (not authorized yet): one implementation writer corrects only the 14 documented column-unit/mercury-subscript occurrences in existing math/rule/test/audit surfaces, test-first, one correction per failing check and a second only if that same check still fails. Required checks: node tests/lector-math.test.mjs; node tests/lector-extractor.test.mjs; node --check lectura/extractor.js; python3 fluidos/generar.py --check. Stop again on unresolved new blockers, preserving prior attempts/budgets and burned native engine authority. If resolved, resume already-authorized original T3 UI/configuration/persistence/docs and T4 seam checks; no new scope, publication or native maintenance authority.
L13. User explicit authorization (verbatim): "si autorizo nueva tanda acotada". Interpreted against L12 and the immediately preceding proposal: one new bounded implementation writer for the 14 mca/mmHg/Hg occurrences, tests first, one correction per failing check and second only if that same check persists. On success resume original T3/T4; on new unresolved blocker stop again. Before launch, all seven prior children confirmed completed, tool/dependency/scratch prerequisites present (Node, Chromium, Pandoc, 29 GB free); git branch and human edits unchanged. Local/memory copies reconciled (only Engram trailing-newline trimming differs). Prior engine lineage remains burned and must not be queried.
L14. Authorized worker mwdi1l4q-8-icat returned partial without modifying files or writing RED tests. Existing four required commands all exited 0; not proof that the pending 14 were corrected. It found an additional Hg-subscript expression outside the old columnUnits inventory: fluidos/index.html:963, chapter capitulo-08, `\rho_{Hg}=13\,600\ \mathrm{kg/m^3}`. No correction budget was consumed. Parent reproduced via createMathNarrator(mathRules) on real page DOM in Chromium (job-3 exit 0, one exact match): "rho subíndice H por g, fin de subíndice igual a 13 600 por grupo kilogramos dividido por metros elevados a 3, fin de potencia, fin de grupo". The H-by-g multiplication is incorrect for the mercury label. This is confirmed source-to-narration output, not a real speech/audio test. All eight child tasks confirmed completed before probe; probe also completed. No automatic new writer/implementation is permitted after this bounded stop. Academic content and existing human edits unchanged; UI still not implemented.
L15. Proposed next human decision (not authorized): extend the SAME UNUSED bounded batch from the incomplete list of 14 to the root class of eligible `mca`, `mmHg` and `Hg` subscript expressions in this page (currently 15 known occurrences including rho_Hg). One implementation writer, original per-check correction limits preserved, test-first and four required checks plus changed-JS syntax; retain exact source-to-speech regression tests and do not claim full human verification of all expressions. This scope-by-class prevents another missed Hg occurrence from being treated as unrelated product scope. Resume original T3/T4 on successful completion; stop for blockers outside this root class. No native authority reset or publishing permission.
L16. Human scope extension (verbatim): "si autorizo apliación". Accepted the immediately preceding proposal/L15: one implementer corrects the whole eligible mca/mmHg/Hg-subscript root class in the page, currently 15 known occurrences, with the SAME UNUSED per-check correction budget and required checks. More instances of that same root class are now in scope, not a reason for another scope stop. No new product requirements, unrelated mathematical fixes, authority resets or publishing permission. All eight child tasks confirmed completed and prerequisites rechecked before continuation; canonical file and Engram mirror agree.
L17. Authorized class batch mwdiejb7-9-j37k completed. RED asserted wrong mmHg narration; GREEN math/extractor/generator/syntax checks. 13 exact full TeX rules, scoped by chapter, correct 15 pending occurrences; inventory covers all 17 of this class including 2 h_agua formulas already fixed. Independent expected source-to-speech pairs and multiplicities pinned in math tests; rho_Hg included. No further concrete blocker found; generic converter/API unchanged and no post-GREEN corrections needed. Do not confuse documented lack of complete human review of 470 expressions with a new blocker. Parent four-command spot check job-4 running; resume original T3 now. S6 known defects resolved within observed audit, not an assertion that every formula was human-verified.
L18. UI worker mwdin85j-a-ta49 returned partial and explicitly exhausted its UI-test correction limit. Implemented reusable mountReader({root,storageKey,mathRules,...extractOptions}) => {destroy()}, scoped CSS, page configuration/loader, persistence, controls, highlight and details refresh, documentation, public-interface Chromium tests and beforeNavigate CDP helper support. Template and generated HTML diff adds exactly 2 lines each (CSS and module); academic content unchanged. Engine 15/15, math, extractor, generator, Python 32/32 and JS syntax passed. Latest UI run FAILED AssertionError `overflow 195`; 390 and 1280 widths were reached/passed earlier in that same test, then 195 failed; 640 and subsequent fallback/malformed-storage blocks were not reached in latest run. An earlier UI GREEN does not override current RED. 195px was a proxy for 200% zoom, not real browser zoom evidence; assertion checks documentElement.scrollWidth for entire pre-existing page, not just reader. No proof yet whether overflow is candidate-caused or baseline; do not assume either, weaken valid requirements or alter unrelated design. Parent structural readback only, no post-limit rerun/fix/new verifier. All ten child tasks confirmed completed; no active/uncertain child. Risk: item 4 (UI callbacks and disclosure-driven queue replacement); independent UI verification still pending, prior burned engine review must not be reopened.
L19. Proposed new explicit bounded continuation (NOT authorized): one implementation writer diagnoses responsive overflow against existing page behavior and corrects only proven reader-caused layout/check defects within lectura/lector.css, lectura/ui.js, tests/lector-ui.test.mjs and minimal helper if necessary. Preserve design/academic content; do not treat 195 CSS px as proof of actual 200% zoom. Keep 390px mobile and desktop functional checks, use meaningful 200% reflow/real zoom evidence where capability permits and report genuine unavailable evidence without inventing it. One correction batch, second fix only if SAME check persists, no new sweep; run UI plus full reader suite, generator, 32 Python tests and changed-JS syntax. On GREEN resume required original T4 independent concurrency/seam verification and offered native assessment/review; no publishing. Stop again on exhausted or genuinely unavailable required proof. Prior attempts/budgets and engine review outcome remain unchanged.
L20. Human authorization (verbatim): "si autorizo continuación de pruebas". Accepts immediately preceding L19 proposal: one bounded implementer isolates baseline vs reader/check defects, corrects within agreed UI/test surfaces, repeats suite; on GREEN continue original independent integration verification. This is a new authorized continuation, not erasure/reset of the exhausted earlier UI cycle, not permission to alter academic content/design globally or weaken applicable checks. All ten prior child tasks confirmed completed; local/memory reconciled, tools and 29 GB scratch capacity checked; RDD still on. Engine consumed authority remains untouched.
L21. Bounded UI continuation mwdje18x-b-bc9d completed. Reproduced old overflow195; bounded candidate-vs-unmounted comparison found both width195/client180/scroll214, proving overflow predates reader; matched at390/1280/640 too. Removed unsupported195 whole-document zoom proxy, retained meaningful390 mobile/1280 desktop/640 desktop reflow bounds and all10 controls. New RED exposed speed slider height16px; scoped CSS minimum-height2.75rem fixed it. Latest whole-file UI GREEN3/3 scenarios (interaction/layout/persistence, no API+blocked storage, malformed storage), engine15/15, math/extractor, generator, Python32/32 and syntax all passed. No claim of actual200% browser zoom or Android audio. Parent structural UI readback complete, no new edit. T3 complete with writer proof; final T4 independent proof still pending.
L22. Reader work-unit slice plan after engine-reviewed boundary1bf1d8c: slice2 MathML+page rules+math tests+browser helper+math docs (624 additions; cohesive proof spans generic math and contextual exceptions, advisory400 exceeded without cosmetic split); slice3 extractor+oracle+audit+docs (298 additions); slice4 UI/configuration/template/generated integration+UI tests+reuse docs (~344 authored additions, generated HTML2). Current native review remains additional outside view, independent verifier still mandatory for named item4. Do not include earlier hidroestatica history or unrelated human edits. No publishing authorized.
L23. Work-unit commits recorded: f240a4d79993d20bf327921cec294c35f406c99c (MathML624 additions; native assess fallback medium/unassessable due ambient untracked declaration, plan self-verification stands/no independent verifier); 2cd5868ebf0b6efb356514af3d169eb5906bb6ab (extractor/audit298 additions, same medium fallback plan); 320717f88799511b0916be513a8ad9eb6db7c0b3 (UI344 additions including generated2, own high-risk unit). UI ASSESS over base2cd5868 with escalation item4 returned high and independentVerifier true; native risk unassessable due unrelated untracked inventory, not a functional failure. No human edits staged; only task document remains reader-untracked. Next: one independent full-feature verifier on isolated minimal archive of320717f and parent full-suite seam check. Only after proof passes, inspect/start additional native UI review using base2cd5868 and untrackedScope exclude; no burned engine lineage reuse. Previous medium units have no reviewDue from assessment; do not create per-checkbox rituals.
L24. Parent seam job-5 exited1 after engine15/15, math, extractor and ALL3 UI scenarios passed; failure was post-probe profile cleanup ENOTEMPTY (`.../lector-chromium-TpBAbt/Default`). Subsequent generator/Python/diff checks were not run because of &&; do not mark whole command GREEN. Incident diagnosed separately: helper killed root browser, awaited its exit, then rm without contention allowance; Chromium children can finish profile writes afterwards. No matching profile process remained at diagnosis. Narrow helper-only change adds fs.rm maxRetries3/retryDelay100 (at most bounded cleanup contention, persistent errors still fail), no product/academic changes or speech retries. Parent seam rerun job-6 started within authorized recoverable tooling correction; independent verifier mwdjnk6q-c-bcyc notified, retains original isolated product candidate320717f and exact outputs, no setup retry or relaunch. Await real GREEN before committing helper fix; no native UI authority has been started.
L25. Parent seam job-6 exited0 after the helper cleanup correction: engine15/15, MathML, extraction308/409 blocks, all3 UI scenarios, generator freshness, Python32/32, helper syntax and diff checks passed. Earlier job-5 exit1 preserved, not overwritten; this is recovered test teardown failure after probes, not a preparation failure or unavailable verifier. Helper correction is verified within one parent tooling fix. Independent integration verifier remains pending; T4 must not be checked off. No new UI authority yet; next UI native candidate may include this tiny test-helper correction in the same slice while product UI bytes remain identical to verified320717f.
L26. Helper fix committed4ac0337fb2528759d9c6f3d2e2c85fa194593b74 (3 additions/1 deletion), assessment medium fallback/no verifier required for helper alone. Independent full-feature verifier returned all S1-S13 met within stated audit, no product blocker; isolated required suite all exit0, engine15/15/Python32/UI3. Independent concurrency fixture initially failed due its own reset-on-reload bug then corrected; all4 disclosure transitions/probes passed assertions, but extended probe exited1 on SAME old helper ENOTEMPTY race. Original archive320717f predates verified parent helper fix4ac0337; thus do not claim final independent GREEN yet. One blocker-only recheck on helper4ac0337 will run the same bounded probe without a new sweep. All children completed before recheck; no product changes or budget reset. Native UI inspect ready for slice2cd5868..4ac0337, authority not started; wait for recheck. Probe fixtures/logs remain child-owned scratch; no parent external-file copying or optional test artifacts.
L27. Limited independent recheck mwdjtrah-d-2yri RESOLVED original helper blocker on4ac0337: same extended concurrency probe exit0 including cleanup (1 PASS line), UI3 scenarios exit0, helper syntax exit0, all stderr empty. No new cases/full-suite rerun or repository edits. Structural readback confirms rm awaited with no catch, so persistent failure still rejects; no synthetic persistent error was induced. Prior fixture/cleanup failures preserved. All required functional and independent proof now complete within audit scope; actualAndroid audio/actual200%browser zoom remain documented unverified limitations. Proceed native UI outside review only; T4 awaits its exact outcome/acknowledgement, then final continuity commit.
L28. Native UI review review-fa35e337be50e84e froze slice2cd5868..4ac0337 (9 files,348 logical changed lines,174 logical correction budget). Three lenses resilience/readability/reliability completed approved with informational nonblocking findings only; no correction route, no automatic advisory fixes. Bound STATUS offered exact acknowledgement; acknowledge-approved returned native-approved-acknowledgement-completed, authority burned, consumed revision sha256:a7827a486cbbeb2d9ad82ae0fa1fc4f2044ef0d56918f826a692496f076072d3. Never query this burned lineage again. This receipt is not delivery authorization. Prior engine review remains separately burned. T4 can now close after all functional + independent proof and review observed.
L29. Final outcome: integrated modular educational reader with Spanish voices/0.75–1.5 rate, DOM-order blocks, closed-details policy, scoped MathML exceptions, accessible controls/chapter and paragraph selection, transient highlighting/offscreen-only scroll, persistence without autoplay and graceful missing API/storage behavior. Coverage308 blocks/199 math initially;409 blocks/332 math with all disclosures open,138 table-only excluded from470 total; all eligible paragraphs/headings checked once and in order. Core engine15 tests, UI3 scenarios, math/extractor browser tests, independent concurrency probes, generator freshness and32 existing Python tests passed. Historical RED/failed cleanup/invalid195proxy and bounded stops retained above; none remains an open failed required check. Limits: no realAndroid audio, no actual200%browser zoom proof; not human verification of all470 formulas, platform voice/pause/background behavior varies. No academic source/shared teoria/lectura.js changes, no dependencies/services added, human edits preserved. No pending feature tasks, no push/PR/merge/deploy authorized or performed. Next human-owned step: inspect local feature branch, optionally try actual-device audio and decide publication. Risk: item4 (asynchronous UI/queue interactions), independently verified within tested scenarios.
L30. Publication request (verbatim): "haz push PR y despligue pero antes dime qué falta para su implementación funcional"
L31. Latest disposition/authorization (verbatim): "dime si hay un selector de español, si es así dejamos pendiente el cambio por defecto a es-419. Autorizo a usar a sesión de GitHub CLI, pero creo que deberíamos renombrar la dirección (no se trata de análisis matemático para despues)"
L32. Confirmed manual Spanish voice selector in lectura/ui.js:18,69-72,116-118; available voice name/lang displayed, setVoice by URI, local preference saved if storage works, applied next fragment. es-419 appears/selects if installed. Public ordering probe previously exit1 is a real unresolved priority limitation, now explicitly accepted/deferred by human because manual selection exists; no source fix, no claim of corrected automatic priority. Retain Argentine-first behavior, do not force unavailable es-419 or select a foreign language. Name/URL rename interpreted as future work; no replacement name or rename performed.
L33. Authenticated GitHub metadata succeeded: exact target Teksi75/clases-analisis-matematico, default main, admin/maintain/push permissions available. Pages legacy source main:/, HTTPS https://teksi75.github.io/clases-analisis-matematico/, last build59e7b610d4ccdad88d145d4cc93c6d7017aff0d1 built, error null. Public read-only explorer observed remote main59e7b61, no hidroestatica/feat/lector-educativo branches, no open PR, labels type:feature/status:approved available; no reader issue found in inspected page. Do not reuse unrelated#16. No remote writes yet; verify fresh main comparison and issue search, then resolve missing approval/merge decisions. Previous audio/zoom limitations remain recorded, not additional artificial acceptance gates.
L34. Fresh authenticated fetch/search: main59e7b610d4ccdad88d145d4cc93c6d7017aff0d1, merge-base46b2855bc0b981c9e3b38ce160db14f5b0acc8e5, divergence2main-only/34feature-only commits. Parent-vs-main61files are outside fluidos (gitignore,README,clases,evaluaciones,imagenes,odd,resultado,revision,transcripciones); fluidos/index.html,plantilla.html,generar.py,README.md have ZERO differences. Thus a clean publication branch from fresh main can transplant only7 reader commits761ad7c..dde20fb, plus this continuity record, without unrelated changes. Planned linked worktree .worktrees/lector-pages and branch feat/lector-educativo-pages; original branch/human work preserved. Reader search returned#25 (different approved feature, not reader), so do not reuse it. A new reader issue and protected status:approved label require explicit human authorization; existing type:feature is available. Pages requires main integration and merge has not been authorized.

L35. Preparation observed: initial git diff --cached --check failed exit2 for a final blank line in this tracking document; removed surplus EOF newline, same check then exit0. Created/registered .worktrees/lector-pages at fresh origin/main59e7b61; replayed only reader units761ad7c,1bf1d8c,f240a4d,2cd5868,320717f,4ac0337,dde20fb and continuity b666b0a. New tip7d3c4e87462daaeb509b54ec8f15402491be67ca. All lectura/fluidos/tests bytes and tracking document at that tip were identical to original branchb666b0a; whitelist and diff check GREEN,21paths2243additions. No unrelated academic/images/class changes copied. Authorized push job9 exited0, created remote feat/lector-educativo-pages at this tip with no force. No issue/PR creation/label/merge/deploy/rename yet. Parent now asks exact permission for a new reader issue with status:approved and nonclosing Refs linkage, and separately whether main merge/Pages deployment may proceed after required checks. No active child or uncertain background job remains. Root original branch and human edits preserved; clean publication worktree retained.

L36. Explicit human selections: "Crear issue y aplicar status:approved" (create reader issue, protected exact label, nonclosing Refs linkage); "Autorizar merge y despliegue" (reader-only PR into main after required checks, current name/URL). Additional private temporary directory scope was explicitly granted for issue body/readback and cleanup; not standing outside-project permission. Authenticated GraphQL confirmed exact repository/url, hasIssuesEnabled true, isBlankIssuesEnabled true, viewerPermission ADMIN. No matching repository template found; structured blank issue is explicitly allowed. New issue creation is underway with privacy-scanned body and one create/readback transaction; no future renaming or es-419 priority correction authorized.

L37. Issue creation job11 confirmed https://github.com/Teksi75/clases-analisis-matematico/issues/30 with status:approved and type:feature. Exact title/body readback matched after CRLF/final-newline normalization; privacy scan passed and owner-only body/readback temporary files/directory removed. Nonclosing Refs#30 authorized; issue remains open. Next prepare reader PR from feat/lector-educativo-pages to main with exactly type:feature, check configured requirements without admin bypass, and merge only its matching head. Remaining source is unchanged; no actual-device audio claim or future rename/es-419 fix.
