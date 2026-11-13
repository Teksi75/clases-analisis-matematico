# Fluidos reader stage3 — scientific reading

Separate reader deliverable authorized after the graphical publication94b690b; worktree`.worktrees/fluidos-lector-etapa3`, branch`feat/fluidos-lector-etapa3`.
Original stage3 requirements are quoted below from`odd/tasks/fluidos-lector-etapa1.md:792–854`; its stage1-only execution deferral is superseded by the current human instruction.

## Specs

1. **S1 — Current authorization:** «Integrar, verificar la web y seguir con etapa 3».
2. **S2 — Mathematics (verbatim):**

```text
## E1. Matemáticas

Analizar las expresiones MathML reales.

Mejorar la verbalización de:

- Fracciones.
- Radicales.
- Exponentes.
- Subíndices.
- Letras griegas.
- Unidades físicas.
- Notación científica.
- Relaciones matemáticas.

No leer código LaTeX literalmente.

No aplicar reemplazos indiscriminados que alteren la semántica.

### Verificación

Seleccionar al menos 12 expresiones reales del cuadernillo.

Para cada expresión, definir:

- Expresión original.
- Locución esperada.
- Locución obtenida.
- Resultado de prueba.

Una salida no vacía no constituye prueba suficiente de exactitud.
```

3. **S3 — Tables (verbatim):**

```text
## E2. Tablas

Modificar deliberadamente la política actual del extractor.

Leer tablas respetando:

- Encabezados.
- Filas y columnas.
- Relaciones entre celdas.
- Unidades.
- Expresiones matemáticas.

Verificar al menos dos tablas reales: una sencilla y otra compleja.

Definir locuciones esperadas y compararlas con las obtenidas.

Actualizar las pruebas del extractor para reflejar el nuevo contrato.

No concatenar indiscriminadamente celdas ni omitir su contenido educativo.
```

4. **S5 — Tables excluded (new human decision, supersedes S3):** «las tablas no deben ser contempladas por el lecto (no deben ser ledas)». Tables and their contents, including nested tables and MathML inside them, are not read. Publication to main is authorized once this holds.
5. **S4 — Diagrams (verbatim):**

```text
## E3. Diagramas

Utilizar únicamente descripciones accesibles existentes y significativas.

No inventar explicaciones de imágenes.


[254 more lines in file. Use offset=856 to continue.]
```

## Tasks

- T1 | S2 | done | route: parent inline verification, math corrections only on reproduced failures | 21 pre-existing real expressions plus5 real table-notation cases pass;12-case original/expected/obtained record in lectura/VERIFICACION-ETAPA3.md | commit: 1db32787c7f3cdf273ad28afa89ba509a65571aa.
- T2 | S4,S2,S5 | done | route: parent inline plus worker continuation after independent verification and the S5 reversal | Tables remain excluded again after the human decision; only existing meaningful alt descriptions are read once, and the mathematics improvements stay | commit: pending.
- T3 | S1–S4 | done | route: parent functional integration plus one independent verifier defect-finding pass | All reader/generator/Python checks green, UI in disposable copy; native assessment: medium,390 changed lines,reviewDue=false (not an approval receipt) | commit: 1db32787c7f3cdf273ad28afa89ba509a65571aa.
- T4 | S1–S5 | in_progress: S5 correction then authorized main publication | route: parent delivery under exact human authorization | PR49 must first stop reading tables, then merge to main with Pages verification; issue48 closure remains a separate decision | commit: pending.

## Log

- L1 — Current human instruction, verbatim selected label: «Integrar, verificar la web y seguir con etapa 3». The accompanying authorization bound only graphical PRs44–47 integration and conditional manual closure43; it does not authorize reader merge or deployment.
- L2 — Source requirement header, verbatim: «# E. Etapa 3 — Lectura científica avanzada». Its historical «No implementar durante esta ejecución.» applied to the earlier stage1 run, not this explicitly authorized stage3. Remaining source text: «Esta etapa mejorará el tratamiento de contenido matemático y científico e incorporará la lectura de tablas.»
- L3 — Graphical prerequisite complete:PRs44–47 merged into94b690b; Pages built that commit, nine public asset hashes/content types matched the verified bytes, issue43 manually closed as completed only afterward with labels preserved. Unrelated PR42/root design/photos remain outside this deliverable. Graphical tracking closure is ce97b46; copied forward only as administrative evidence, not mixed graphical-source changes.
- L4 — Read-only explorer mwf0mmn6-9-ig79 mapped the current APIs and tests without executing verification. E2/E3 share extractor omission/traversal/block creation/test surfaces and form one coupled unit; diagrams are small, so no parallel-writer trigger holds. E1 already specifies21 real utterances, not yet newly run. Real scientific notation in a conversion table is the concrete additional math case; no real radicals exist in the generated page, so synthetic root checks cannot be presented as real examples. Existing block records/context/DOM-path IDs feed navigation, highlighting and playback reconciliation and require preservation probes. Browser tests use real Chromium; simulated voice is not human-audio proof.
- L5 — Test-first evidence: extractor RED showed missing table blocks and image descriptions; math RED showed the four unit/scientific-notation defects inside real table notation. After the parent implementation both focused suites passed. A syntax-preserving readability fix was applied to `unitRow` without semantic change.
- L6 — Independent verifier mwf1p9mx-b-8dgo blocked the first candidate with three reproduced defects: unit-row grouping stripped from `5 / (N/m)`; dropped visible tfoot rows, concatenated block paragraphs inside cells and skipped nested tables; a visible figcaption before its image produced a duplicate. It also flagged present-tense exclusion claims in the historical audit.
- L7 — Corrections with regressions: unit rows speak inline only as a suffix of a spoken quantity while grouped operands keep their delimiters; footer rows are read after body rows; block children are separated; nested tables are read to a bounded depth of two; a matching visible caption is preferred over the alt block in either order, while hidden captions still allow the real alt descriptions. Historical audit wording was qualified.
- L8 — Final parent run on2026-11-13: math PASS (26 real cases; silent unless `VERIFICACION_ETAPA3=1`), extractor PASS (406 closed /520 open blocks), navigation13, follow17, engine24, UI5 PASS in a disposable /tmp copy (no screenshots written to the worktree), generator freshness PASS, Fluidos44 and full Python118 PASS, `git diff --check` clean. Physical audio, Android, paginated print and student comprehension remain untested; nested tables deeper than two levels and multilevel/merged headers are documented limitations.
- L9 — Exact human decision requested: «¿Autorizás crear en github.com/Teksi75/clases-analisis-matematico una issue nueva para la etapa 3 del lector —con status:approved y type:feature— y abrir un PR desde feat/fluidos-lector-etapa3 hacia main, sin fusionar ni desplegar?» Human selected: «1. Crear issue aprobada y PR de etapa 3, sin fusionar». Option consequence: create the issue with those labels and one PR, no merge or deployment. Issue #30 was checked and rejected as the linked issue because its approved scope explicitly requires excluding tables, the contract this stage deliberately replaces. No merge, Pages update, deployment or automatic closure is authorized.
- L10 — Published under the L9 authorization: issue48 (https://github.com/Teksi75/clases-analisis-matematico/issues/48) with status:approved and type:feature; PR49 (https://github.com/Teksi75/clases-analisis-matematico/pull/49) from feat/fluidos-lector-etapa3 to main with Refs #48 and exactly one type:feature label. Non-force push and remote readback confirmed head ba21baae7918c716af039d1a23299f33c6f37073, matching body, open and unmerged. Two earlier publication attempts were rejected by my own guards before any remote mutation (one assertion inverted, one placeholder including the hash); the issue had already been created once and was reused, never duplicated. Native assessment for the source unit was medium,390 lines,reviewDue=false, which is not an approval. Merge, deployment, Pages verification and issue closure remain unauthorized and undone.
- L11 — New human requirement, verbatim: «las tablas no deben ser contempladas por el lecto (no deben ser ledas) si esto es así puedes publicar en main producción». This supersedes stage3 E2: the previous candidate did read tables, so the stated condition did not hold and nothing was merged. S5 added. Table narration, footer/cell/nested-table helpers and their tests were removed; table text is excluded from blocks and from surrounding prose. Mathematics improvements and existing-`alt` diagram descriptions are preserved. The verification record now lists only body expressions the reader narrates and states explicitly that tables are excluded, while table-contained MathML remains narrator-only test coverage.
