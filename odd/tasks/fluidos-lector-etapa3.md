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

4. **S4 — Diagrams (verbatim):**

```text
## E3. Diagramas

Utilizar únicamente descripciones accesibles existentes y significativas.

No inventar explicaciones de imágenes.


[254 more lines in file. Use offset=856 to continue.]
```

## Tasks

- T1 | S2 | in_progress | route: parent inline verification; math correction only on a reproduced failure | Run real MathML cases and record original/expected/obtained/verdict for at least12, including newly eligible table notation; distinguish real cases from synthetic roots | commit: pending.
- T2 | S3–S4,S2 | pending | route: parent inline, one coupled extractor unit; no independent heavy writer units | Observe table/image RED through the public extractor, implement structured tables and existing meaningful descriptions, update contract docs, preserve prior text/context/visibility/order/identity behavior | commit: pending.
- T3 | S1–S4 | pending | route: parent functional integration; risk-gated independent verifier only if a named high-risk item actually applies | Run focused and existing reader/browser/generator checks, inspect the final diff for shared-contract regressions, normalize work-unit review candidates and obey native assess | commit: pending.
- T4 | S1–S4 | pending | route: parent delivery | Prepare a separately reviewable reader delivery using an approved in-scope issue; obtain exact new issue/approval authority if none exists; no reader merge/deployment is currently authorized | commit: pending.

## Log

- L1 — Current human instruction, verbatim selected label: «Integrar, verificar la web y seguir con etapa 3». The accompanying authorization bound only graphical PRs44–47 integration and conditional manual closure43; it does not authorize reader merge or deployment.
- L2 — Source requirement header, verbatim: «# E. Etapa 3 — Lectura científica avanzada». Its historical «No implementar durante esta ejecución.» applied to the earlier stage1 run, not this explicitly authorized stage3. Remaining source text: «Esta etapa mejorará el tratamiento de contenido matemático y científico e incorporará la lectura de tablas.»
- L3 — Graphical prerequisite complete:PRs44–47 merged into94b690b; Pages built that commit, nine public asset hashes/content types matched the verified bytes, issue43 manually closed as completed only afterward with labels preserved. Unrelated PR42/root design/photos remain outside this deliverable. Graphical tracking closure is ce97b46; copied forward only as administrative evidence, not mixed graphical-source changes.
- L4 — Read-only explorer mwf0mmn6-9-ig79 mapped the current APIs and tests without executing verification. E2/E3 share extractor omission/traversal/block creation/test surfaces and form one coupled unit; diagrams are small, so no parallel-writer trigger holds. E1 already specifies21 real utterances, not yet newly run. Real scientific notation in a conversion table is the concrete additional math case; no real radicals exist in the generated page, so synthetic root checks cannot be presented as real examples. Existing block records/context/DOM-path IDs feed navigation, highlighting and playback reconciliation and require preservation probes. Browser tests use real Chromium; simulated voice is not human-audio proof.
