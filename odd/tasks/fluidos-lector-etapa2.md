# Fluidos reader — stage 2 navigation and following
Implement stage 2 only on `feat/fluidos-lector-etapa2`, based on verified `origin/main` `190d43c803c34bae748a87f862ed3dd89e96a5df`; preserve unrelated work.
Delivery: local work-unit commits, `auto-chain` / `feature-branch-chain`; no publishing. Runners: Node, Chromium, Python, Pandoc.

## Specs

### S1 — Current authorization and opening priority

> sigamos con la etapa 2 del lector

Human decision on opening when a saved position differs from the visible section:

> Apartado visible — recomendado

The selected option was described as:

> Prepara el apartado que estás viendo; usa la posición guardada sólo como alternativa si no puede determinarlo.

Human delivery-shape decision:

> Cadena sobre rama de la funcionalidad — recomendado

This authorizes local implementation, not push, PR creation, merge, or deployment. The historical instruction not to implement stage 2 during stage 1 is superseded ONLY for stage 2 by the current request.

### S2 — Stage 2 scope (original section D)

> # D. Etapa 2 — Navegación y seguimiento
>
> Esta etapa agregará:
>
> - Inicio desde el apartado visible.
> - Selección directa del punto de lectura.
> - Navegación contextual mediante el índice lateral.
> - Lectura continua entre apartados y capítulos.
> - Resaltado del fragmento activo.
> - Desplazamiento automático.
> - Suspensión del seguimiento cuando el usuario haga scroll manual.
> - Control «Seguir lectura».
> - Progreso por capítulo.
> - Conservación segura de la posición.
> - Gestión de cambios en elementos `<details>`.

### S3 — Navigation policy

> Cuando el usuario haga clic voluntariamente en otro capítulo:
>
> - Si está reproduciendo, cambiar y continuar.
> - Si está pausado, cambiar y permanecer pausado.
> - Si está detenido, preparar el nuevo contexto sin reproducir.
>
> Los cambios de sección ocasionados exclusivamente por scroll no deben reiniciar la lectura.

### S4 — Accessible selection

> No agregar cientos de párrafos al orden de tabulación.
>
> Ofrecer una navegación accesible por encabezados y controles del reproductor, complementada por un mecanismo para seleccionar un punto de lectura.

### S5 — Following

> El seguimiento debe mantener visible el fragmento activo sin desplazar innecesariamente el documento.
>
> Si el usuario desplaza manualmente la página, continuar el audio y suspender el seguimiento hasta que solicite retomarlo.

### S6 — Disclosure changes and safe position

> Si cambia un elemento `<details>`, actualizar la secuencia afectada cuando sea necesario y conservar la posición si es segura.
>
> Si la posición deja de ser válida, regresar al encabezado más cercano en estado pausado.

### S7 — Chapter progress

> Mostrar progreso por capítulo, por ejemplo «Fragmento 12 de 45».
>
> No presentar ese progreso como tiempo real de audio.

### S8 — Preserved constraints

> 1. `fluidos/index.html` es generado mediante `fluidos/generar.py` a partir de `fluidos/plantilla.html`. No modificar el HTML generado como fuente primaria. Regenerarlo mediante el procedimiento oficial y ejecutar `python3 fluidos/generar.py --check`.
>
> 2. `teoria/lectura.js` es compartido con otras páginas. No modificarlo.
>
> 3. `lectura/extractor.js` excluye deliberadamente las tablas. Mantener esa política durante las etapas 1 y 2.
>
> 4. Existen pruebas en `tests/lector-ui.test.mjs`, `tests/lector-engine.test.mjs` y `tests/lector-extractor.test.mjs`. Conservar y adaptar las pruebas pertinentes. No borrarlas para conseguir resultados positivos.

> La lectura convencional tiene prioridad.
>
> El lector nunca se activa automáticamente.
>
> El reproductor no debe ocupar espacio cuando está cerrado.
>
> La interfaz debe ser compacta.
>
> Los controles deben estar disponibles durante la reproducción.
>
> El desarrollo debe facilitar la reutilización futura en otros cuadernillos.

> No alterar los contenidos de Física
>
> No reconstruir la web
>
> No modificar `teoria/lectura.js`
>
> No editar manualmente el HTML generado como fuente primaria
>
> No incorporar commits de otras ramas
>
> No eliminar pruebas para conseguir que pasen
>
> No cambiar todavía la lectura de tablas
>
> No introducir servicios pagos
>
> No añadir audio automático
>
> No mostrar el reproductor cuando no se solicita
>
> No dejar controles flotantes permanentes en la lectura convencional
>
> No crear modificaciones fuera del alcance
>
> No publicar sin autorización

Inherited stage-1 close-scroll decision remains binding: preserve the exact scroll position within the new valid range; only clamp when reserve removal makes the previous position exceed the new maximum; leave zero closed reserve. Original accepted evidence: `.worktrees/fluidos-lector-etapa1/odd/tasks/fluidos-lector-etapa1.md`, L8 and L9. Stage 3 scientific narration, table inclusion and new TTS services are not part of this feature.

## Tasks

- T1 | S2,S3,S6,S8 | done | route: gentle-ai-worker (runtime context backstop) | outcome: additive state-preserving engine navigation/queue reconciliation, 22/22 engine tests and parent repeat passed; independent feature checks remain T4 | commit: ad52236b0e259c91a2f21045a6a2aa90c9f53384
- T2 | S1,S2,S3,S4,S7,S8 | in_progress | route: gentle-ai-worker (runtime context backstop; depends on T1) | outcome: visible/direct/index selection and chapter progress with tests/docs | commit: pending
- T3 | S2,S5,S6,S8 | pending | route: gentle-ai-worker (runtime context backstop; depends on T2) | outcome: sensible following, manual suspension/resume and safe disclosure updates with tests/docs | commit: pending
- T4 | S1-S8 | pending | route: parent structural/functional spot-check plus independent gentle-ai-verify (Risk item 4) | outcome: isolated verification of all specs, official generation, preserved stage-1 behavior, visual checks, final evidence | commit: pending

## Log

### L1 — Original request

sigamos con la etapa 2 del lector

### L2 — Recovered intent and explicit choices

- Source: complete stage-1 task document read by configured explorer `mwdu9vjm-1-u6t4`; section D at lines 737–788 spot-checked by parent. Stage 1 is published and closed; no stage-2 code was present. Full stage-1 history remains in its original document rather than duplicating it.
- Opening question: «Al abrir «Escuchar», si hay una posición guardada pero estás viendo otro apartado, ¿qué debe tener prioridad? Abrir seguirá sin iniciar audio.» Answer: «Apartado visible — recomendado».
- Delivery question: «Para mantener revisable la etapa 2, cuyo cambio total superaría unas 400 líneas, ¿cómo organizamos las unidades locales para una futura entrega? No se hará push, PR ni merge ahora.» Answer: «Cadena sobre rama de la funcionalidad — recomendado».
- Forecast: approximately 600–900 authored changed lines across code/tests/docs, generated files excluded; engine, navigation, and following/disclosures are sequential work units near 400 diff lines each, not parallel writers on overlapping UI files. Actual counts and smallest cohesive overages will be reported rather than compressed.
- Large-task rationale: short current request relies on recovered historical stage requirements and explicit choices; requirements/verification must survive compaction, so the original request and diff alone are not a sufficient resumption record.
- Writer route: runtime signaled context backstop before implementation; each dependent bounded unit goes to one writer, not parallel overlapping writers. Parent maintains spec/mirror/todo/commits; workers do not commit or publish.

### L3 — Base and preparation evidence

- Background preflight job-1 exit 0: fetched origin/main `190d43c803c34bae748a87f862ed3dd89e96a5df`, which contains published stage 1; Node, Python, Pandoc and Chromium available; approximately 29 GB scratch capacity available. RDD on, global source; no mode changes.
- Parent corrected an ambiguous path-form diff query with an explicit ref comparison: stage-1 branch differs from main only in its post-delivery task audit, not functional code.
- New registered worktree `.worktrees/fluidos-lector-etapa2`, branch `feat/fluidos-lector-etapa2`, starts exactly at verified origin/main. Original dirty `feat/lector-educativo`, all other worktrees, and local divergent main remain untouched.
- Risk: item 4 (speech callbacks, cancellation, queue replacement, voluntary navigation and disclosure events must not race or replay stale audio). Independent verification will cover the completed feature before completion; native assessment/review follows the user-owned RDD switch and actual offered routes.
- Implementation defaults, not added product requirements: reuse engine token invalidation before cancellation; preserve default existing API behavior; safe disclosure reconciliation requires matching content identity as well as a stable location, with paused nearest-heading fallback when identity is lost. Select accessibly using existing reader controls, never paragraph-wide tab stops.

### Verification plan

- T1: `node --test tests/lector-engine.test.mjs`; one observed RED per new requested engine rule, then GREEN; regressions for the existing engine APIs touched.
- T2/T3: browser regression tests through the public UI with deterministic simulated speech, retaining stage-1 coverage; each requested rule receives an observed RED before the fix. Test click and keyboard index activation, all transport states, chapter boundaries, manual vs programmatic scrolling, exact chapter counts, safe/invalid details changes and late callbacks. Tests must assert state/audio/selection effects, not only labels.
- Parent/final verifier: `node --test tests/lector-engine.test.mjs`, `node tests/lector-ui.test.mjs`, any new stage-2 browser runner, `node tests/lector-extractor.test.mjs`, `node tests/lector-math.test.mjs`, `python3 -B -m unittest discover -s tests -p 'test_fluidos_*.py' -v`, official `python3 fluidos/generar.py` followed by `python3 fluidos/generar.py --check`, `node fluidos/comprobar_navegador.mjs`, `git diff --check`.
- Preserve Physics sources, generator/template/generated HTML, table exclusion, `lectura/math.js`, and `teoria/lectura.js` unless an actual in-scope integration need is proven; never modify generated HTML directly. No dependency/install/CI changes or external services.
- Independent verifier uses a selective isolated copy with known dependencies and scratch capacity, no ambient/full `.worktrees` copy; commands run with bounded timeouts, no unavailable-capability retries. Report audible/mobile-device testing limitations rather than claiming synthetic speech proves real voice output.

### L4 — T1 engine unit completed

- Worker `mwduh5j7-2-r9en` implemented only the three allowed engine/test/API-doc surfaces; 207 authored diff lines, commit `ad52236b0e259c91a2f21045a6a2aa90c9f53384`.
- RED: engine command exit 1, two new-rule failures and 18 passes before implementation. GREEN: 22/22 passed, exit 0. Parent repeated `node --test tests/lector-engine.test.mjs`, 22/22 exit 0, and `git diff --check`, exit 0. Exact output remains in worker/parent tool transcripts; no separate stdout/stderr labels were emitted by the worker runner.
- API: `reader.select(index)` preserves transport state; `reader.setBlocks(blocks, {index, chunkIndex: 0})` reconciles a safe queue; `{index: headingIndex, paused: true}` prepares paused fallback without speaking. Default `setBlocks(blocks)` stays idle. UI remains responsible for safe identity and nearest-heading choice. Existing finished replay semantics remain; UI must make a voluntary post-finish selection prepare the chosen location rather than replay from zero.
- First parallel native assessment invocation rejected without a usable serialized error (parent logger rendered Error as `{}`); fresh direct read-only ASSESS succeeded: native medium, agent escalation item4 high, reviewDue false / under_budget, writerSelfVerification and independentVerifier true. No INSPECT/START, consent, lineage or native review verdict. Independent checks for all completed engine/UI units remain the single T4 feature-verification run; no completion claim before that proof.
- Delivery slice 1: tracker `c6d6b1c` plus engine `ad52236` = 370 authored diff lines. Keep its boundary at `ad52236`; next navigation unit begins slice 2. No publishing authorized.

### L5 — T2 proof gap and bounded correction

- Worker `mwdundv5-3-7wdq` returned partial: navigation9/9 and engine22/22 pass, diff-check0; stage-1 UI runner was unrun because its four screenshot outputs were outside worker edit surfaces, not because the runner failed. No worker-local exhausted correction limit or unavailable verification capability was reported. No child remains active/uncertain (parent inspected settled task list before continuation).
- Parent ran the already-authorized UI command in its permitted project context: background job-2, `timeout 180s node tests/lector-ui.test.mjs`, exit0, all five groups including F1–F20/voices/keyboard/details/layout, completion/replay, missing APIs/storage, malformed storage and migration/speed ties. This repairs the missing output-surface prerequisite; no verifier has run or failed setup.
- Parent structural read confirmed the shared selection/render/persist path and index default-anchor behavior. Coverage still needs actual mouse activation, conventional focus, valid saved-vs-visible precedence and direct/progress/tab-order boundaries. Index initial RED failed on an unrelated focus assertion; it is NOT valid transport RED evidence. Existing finished/scroll cases are preservation, not RED. One bounded T2 correction adds the missing evidence and fixes only defects exposed by it; no new feature scope.
- Fresh native assessment: medium native / high agent item4, reviewDue false / under_budget, independent feature verification still required. New navigation test was explicitly staged as intended task content before assessment; nothing committed while T2 is partial.
