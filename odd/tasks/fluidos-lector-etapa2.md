# Fluidos reader — stage 2 navigation and following
Stage 2 is complete and independently verified on `feat/fluidos-lector-etapa2`, based on `origin/main` `190d43c803c34bae748a87f862ed3dd89e96a5df`; unrelated work preserved.
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

### S9 — Explicit bounded continuation

> Autorizo continuación acotada como propones

This accepts the exact bounded proposal in L8 and the preceding user-facing reply: one worker, one implementation correction batch for chapter DOM identity/fallback and missing manual-scroll proof; if checks pass, one independent whole-feature verification. No additional correction cycle if proof still fails or a new blocker appears. This is a separate human-authorized continuation, not a reset of previous failed attempts, native authority, or unrelated limits. No publication.

## Tasks

- T1 | S2,S3,S6,S8 | done | route: gentle-ai-worker (runtime context backstop) | outcome: additive state-preserving engine navigation/queue reconciliation, 22/22 engine tests and parent repeat passed; independent feature checks remain T4 | commit: ad52236b0e259c91a2f21045a6a2aa90c9f53384
- T2 | S1,S2,S3,S4,S7,S8 | done | route: gentle-ai-worker (runtime context backstop; depends on T1) | outcome: navigation13/13, engine22/22 and UI5 groups passed, navigation repeated by parent | commit: 0b6bcee5939c3b82e4fd85ef5581085111b91768
- T3 | S2,S5,S6,S8,S9 | done | route: one gentle-ai-worker plus parent read-only baseline proof (human-authorized bounded continuation) | outcome: chapter identity RED/GREEN, follow17/17, navigation13/13, engine24/24, UI5 groups, parent manual baseline RED1/current GREEN0; independent verification remains T4 | commit: 345ecc052bceb95a5981e7aab5e2029513ad1e4b
- T4 | S1-S9 | done | route: parent spot-check plus one isolated gentle-ai-verify (Risk item 4), S9 | outcome: independent PASS for every spec/all commands/visual/source preservation; parent engine24/24 and protected-source comparison passed | commit: feat/fluidos-lector-etapa2-cierre (local immutable-at-close boundary; verified source 345ecc052bceb95a5981e7aab5e2029513ad1e4b)

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

### L6 — T2 proof completed and unit committed

- Bounded proof correction `mwduz9yl-4-maq3` completed without implementation edits: navigation13/13, engine22/22, all five stage-1 UI groups, diff-check0. Added valid pre-mount saved-position precedence, actual mouse events in all three transport states, conventional anchor/focus comparison, count boundaries and tab-order checks.
- Corrected scratch-baseline RED against pre-T2 `ad52236`: six index probes failed for the intended selection remaining in chapter1 rather than Densidad, exit1, empty stderr. Earlier scratch had five intended failures and one setup failure; corrected baseline replaces that incomplete evidence, not its history. Correction first ran10/13 due mouse setup/layout issues, then13/13 after setup repair. Finished/scroll tests remain preservation only.
- Parent background job-3 repeated navigation13/13 and diff-check0, exit0. T2 alone:220 authored changed lines across six code/test/doc files; commit including task evidence is `0b6bcee5939c3b82e4fd85ef5581085111b91768`,239 diff lines.
- Final precommit native assessment: medium native / high agent item4,239 lines, reviewDue false / under_budget; no native review transaction. Independent T4 verification remains required.
- Delivery boundaries are explicit, not one605-line review candidate: slice1=`190d43c..ad52236` (tracker+engine,370 lines), slice2=`ad52236..0b6bcee` (navigation+evidence,239 lines); slice3 begins at `0b6bcee` for following/disclosures. Cumulative hook warning605 lines is NOT permission for an accumulated-branch review or publication.

### L7 — T3 incomplete reconciliation and one bounded correction

- Worker `mwdv6ye6-5-n1hj` returned partial, not exhausted: focused follow6/6, navigation13/13, engine22/22, UI5 groups and diff-check0, but unrelated details changes that alter the queue still cancel/restart an unchanged playing utterance. T3 remains in_progress and T4 unrun. Worker initial RED5 failures/1pass included a smooth-scroll setup failure rather than valid manual-suspension RED; first GREEN5/6 had incorrect nearest-heading expectation, then6/6 after expectation repair. These limitations remain part of the evidence.
- Parent confirmed every child settled before continuation. Native ASSESS medium / agent item4 high, reviewDue false / under_budget, independent feature verification remains required. New follow test staged as intended content; no T3 commit yet.
- One bounded T3 correction must reproduce the unnecessary-restart defect through public behavior, preserve unchanged active audio across safe queue reconciliation, and fill only the missing requested scroll/disclosure cases. Minimal engine/test support may be added because the current engine replacement always cancels; this is necessary in-scope implementation, not a new product requirement. Existing default APIs and cancellation invariants must stay intact.
- Missing proofs to cover proportionately: manual input without audio/selection change, forms/programmatic scrolling not mistaken for manual scrolling, active-fragment visibility around fixed controls, safe queue changes in playing/paused/stopped, reused IDs not trusted, paused nearest-heading fallback and empty/no-heading safety. No unavailable verifier or exhausted correction limit has been reported. Test/setup corrections are preserved, not relabeled as RED.

### L8 — Bounded stop after T3 correction remains partial

- Correction `mwdvemva-6-vhv8` fixed the named unnecessary-restart defect: `reconcileBlocks(blocks,index)` validates an unchanged live context and updates the future queue without canceling/replacing its utterance. Worker reported313 authored lines excluding parent tracking edits. T3 code is NOT committed; HEAD remains T2 `0b6bcee5939c3b82e4fd85ef5581085111b91768`. The new follow test has both staged and unstaged task edits; preserve both.
- RED: restart defect follow6passes/3failures; engine22passes/1failure for absent API; smooth interruption y78→1875 after manual input. Expanded RED also had two fixture failures (chunk before re-extraction; supposedly heading-free fixture still had a heading), not behavioral evidence. First post-fix follow14/15 sampled an unsettled compositor frame; two-frame measurement then passed15/15. Final worker checks: follow15/15, navigation13/13, engine23/23, UI5 groups, diff-check0. Combined output stream limitation remains. These are real successes, not proof that all S# are complete.
- Remaining NEW identity gap: active context compares element/text/chapter ID/titles but not the chapter DOM element itself; moving the same active element into a replacement chapter reusing identifiers may be accepted as safe. No automatic second correction for a new finding after the bounded correction. Manual suspension baseline RED is still missing; wheel/touch/keys/scrollbar-edge tests use synthetic DOM events, not trusted native touch/scrollbar proof. Nearest-heading behavior under chapter replacement is not fully proven.
- All children freshly confirmed settled. Final read-only native ASSESS:332 lines including tracking, native medium / agent item4 high, reviewDue false / under_budget, independentVerifier true. No START, lineage, formal review verdict or authority burn. No tests or independent verification were launched after identifying this bounded-stop condition.
- T3 and T4 now await the HUMAN decision, not automatic retries. Proposed new separate bounded continuation: executor one gentle-ai-worker; scope only chapter-DOM identity/fallback and missing manual-scroll/baseline browser proof within the existing T3 engine/UI/test/doc surfaces; maximum one implementation correction batch; run follow/navigation/UI/engine/diff checks, then one isolated gentle-ai-verify for S1–S8 and official generation/Python/extractor/math/browser/visual preservation. If proof still fails or a new blocker appears, stop without another correction cycle. No publication. Human may instead leave the partial state preserved and stop.

### L9 — Human-authorized bounded continuation

Autorizo continuación acotada como propones

- Human accepted the proposed separate bounded continuation. Parent freshly confirmed all six children settled, no active or uncertain task; HEAD and staged/unstaged partial edits exactly match L8. Memory1368 and repository document reconciled in full before updates; tools and ~29GB scratch capacity remain available.
- Executor: one gentle-ai-worker, one batch limited to chapter-DOM identity/nearest-heading fallback and missing manual-scroll/baseline proof. Run follow/navigation/UI/engine/diff checks. Only if successful, launch one independent isolated gentle-ai-verify for the whole S1–S9 feature and official generation/Python/extractor/math/browser/visual preservation. Any remaining failure/new blocker stops this continuation; no second implementation batch or post-verifier correction. Preserve all prior failed/setup attempts and T1/T2 commits. No publishing.

### L10 — T3 proof completed without another implementation batch

- S9 worker `mwdvs7ii-7-uv53` used the ONE authorized batch to add chapter-element identity in UI/engine and paused nearest-heading fallback. Reproduced RED: follow16/17 and engine23/24 failed for replacement chapter accepted as playing/safe. Final commands: follow17/17, navigation13/13, engine24/24, UI5groups, diff-check0. Trusted CDP wheel/PageUp assertions passed with unchanged audio/cancel/selection/progress/highlight and explicit resume. Physical touch/scrollbar/audio limitations remain, not claimed proven.
- Worker returned partial solely because its write-surface guard prevented a temporary baseline copy; no baseline test had run or failed, no unavailable browser/verifier capability. Parent resolved that preparation constraint using a read-only, in-memory localhost server of exact `git show 0b6bcee:<path>` assets, not a repository copy or any change to implementation/tests. Same missing-rule probe runs through the existing Chromium helper. This is completion of already-authorized proof, not another source correction or a bypass of a denied file write.
- Parent background job-4 exit0 preserved separate stdout/stderr and child exits. Baseline RED exit1 for the exact assertion «manual suspension must prevent automatic follow on next fragment»: trusted wheel moved y342→0, audio stayed playing, natural next fragment wrongly scrolled to849. Candidate GREEN exit0: wheel415→0, next fragment kept y0 and follow-resume available; audio1→2 naturally, cancellations5→5, correct active fragment. No repository copies written, no new source artifacts; eleven baseline HTML/CSS/JS assets read on demand. Earlier invalid smooth-animation RED remains invalid; this new valid proof supersedes only the missing evidence, not the history.
- Parent read back the complete engine/UI diff and diff-check0. T3 code/tests/docs committed `345ecc052bceb95a5981e7aab5e2029513ad1e4b`:354 additions+23 deletions=377 authored lines (worker estimate378 corrected by Git). Task evidence is deliberately separate, not mixed into the cohesive source unit.
- Slice3 is exactly `0b6bcee..345ecc0`,377lines. Native committed-range ASSESS on that boundary: native medium / agent item4 high, reviewDue false / under_budget, independentVerifier true. No INSPECT/START/consent/lineage/formal review verdict. Cumulative hook972lines is not one candidate: slice1=370,slice2=239,slice3=377; preserve focused boundaries.
- T4 now consumes the ONE independent whole-feature verification allowed by S9; prepare selective payload/dependencies/capacity before isolated setup. Any failed required check or new blocker stops without another source correction batch. No publishing authorized.

### L11 — Independent verification PASS and local closure

- ONE independent verifier `mwdw3mc6-8-n5vp` returned PASS for every S1–S9, with no behavioral blocker, skipped or pending required check. No correction after its verdict. Physical touch/scrollbar hardware and audible voice were not tested; stubbed speech proves browser logic, not device audio. No native review approval is claimed.
- Setup preflight succeeded before probes: selective committed snapshot345ecc0,644KiB, fluidos/lectura/required teoria assets/eight SVGs/named tests, no .git/.worktrees/ambient dependencies. Node26.13.1, Python3.14.9, Pandoc3.11, Chromium157.0.8103.38; scratch3.4GiB free/993384 inodes. HOME/TMPDIR/NODE_COMPILE_CACHE isolated and NO_UPDATE_NOTIFIER=1. No setup failure or unavailable capability.
- Exact isolated required checks, all exit0 with requested30s/180s bounds: `node --test tests/lector-engine.test.mjs`24/24; `node tests/lector-navigation.test.mjs`13/13; `node tests/lector-follow.test.mjs`17/17; `node tests/lector-ui.test.mjs`five groups/F1–F20; `node tests/lector-extractor.test.mjs`; `node tests/lector-math.test.mjs`; `python3 -B -m unittest discover -s tests -p 'test_fluidos_*.py' -v`32/32; `python3 fluidos/generar.py`; `python3 fluidos/generar.py --check`(HTML actualizado); `node fluidos/comprobar_navegador.mjs`(1280,390,no-JS). Source `git diff --check`0. Runner logs combined stdout/stderr; parent baseline job-4 separately captured both streams.
- Regeneration HTML SHA256 before=after=`37ff01736aad8e7f25259376d9aaf699ea656ca2f6c888b2a305de88385a3c03`. Protected base/candidate blobs for generator/template/generated HTML/extractor/math/teoria script match; Physics content/diagram tree diff empty. Source manifest unchanged after isolated tests; only pre-existing task-document edit remained.
- Independent extra public-interface trusted-wheel probe exit0: manual y0 stayed0 through natural onend; submissions1→2/cancellations3→3; explicit resume moved to4743 without new speech. Verifier did not repeat excluded baseline history probe. Visually inspected closed/desktop/mobile/minimized screenshots and settings at320/375/1280, geometry checks passed. Narrow-screen settings temporarily cover substantial reading area, but close normally and preserve transport controls; no blocker. Screenshots/logs are temporary isolated artifacts, not shipped assets.
- Parent final spot-check: engine24/24 exit0, diff-check0, explicit protected-source base→HEAD comparison empty, only task document modified. No source correction or extra verifier. Independent suggested extra durable probe was NOT added: current regressions already cover the rule and S9 allowed no new correction cycle.
- Slice4 is documentation-only closure after345ecc0, pinned locally at `feat/fluidos-lector-etapa2-cierre`; slice1=tracker+engine370lines, slice2=navigation239, slice3=following377. Native source-slice assessments all medium/under_budget with reviewDuefalse; concurrency item4 required and received independent verification. RDD unchanged; no INSPECT/START/consent/lineage/formal review verdict or authority burn. No push/PR/merge/deploy authorized or performed.
- Final result: all four tasks done; no failed/skipped/pending required check remains. Earlier RED/setup/partial failures remain logged, not erased. Local implementation ready for human review; publication requires a separate decision. Stage3 math/table redesign remains out of scope.
