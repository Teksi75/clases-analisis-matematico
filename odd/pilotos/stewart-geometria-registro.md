# Geometría analítica: registro de generación y límites

Trabajo T3 de S2: hay dos propuestas y un dictamen anónimo de un tercer modelo. La selección del juez es orientativa, no una aprobación pedagógica o matemática. La verificación matemática independiente, la revisión humana y la implementación siguen pendientes.

## Acceso e invocaciones

Las tres pruebas independientes `pi --no-session --no-tools --no-extensions --model <ID> -p 'Respond exactly READY and nothing else.'` respondieron `READY` y terminaron con exit 0 para:

- `opencode-go/deepseek-v4.1-flash`
- `opencode-go/mimo-v2.6-pro`
- `openai/gpt-6.1-sol`

El acceso breve no garantiza que una solicitud extensa termine. Se usó `pi` sin sesión, herramientas ni extensiones; cada propuesta recibió solo su propia entrada y los enunciados, no la propuesta contraria. Las entradas conservan la misma rúbrica, pero no son idénticas: la segunda añade la indicación explícita de no solicitar herramientas.

- DeepSeek: `stewart-geometria-entrada-inicial.md` → `stewart-geometria-propuesta-deepseek.md`, exit 0, stderr vacío (`stewart-geometria-deepseek-stderr.md`).
- MiMo, primer intento: misma entrada inicial → `stewart-geometria-propuesta-mimo.md`, exit 0 y stderr vacío (`stewart-geometria-mimo-stderr.md`), pero emitió texto de llamadas a herramientas en lugar de la propuesta. No se ejecutaron esas llamadas. Se conserva también en `stewart-geometria-mimo-intento-inicial.md`.
- MiMo, reintento: `stewart-geometria-entrada.md` → `stewart-geometria-propuesta-mimo-reintento.md`, exit 0, stderr vacío (`stewart-geometria-mimo-reintento-stderr.md`).
- Primer juez: `openai/gpt-6.1-sol` recibió `stewart-geometria-entrada-juez.md`, con A = MiMo del reintento y B = DeepSeek. La entrada no identifica modelos. La solicitud larga agotó 300 segundos; `stewart-geometria-dictamen.md` y `stewart-geometria-juez-stderr.md` quedaron vacíos. Ese primer intento no produjo dictamen; la prueba `READY` no demuestra que se haya completado.
- Por elección posterior del usuario se ejecutó **otro juez**, `opencode-go/glm-5.3`, con la misma entrada anónima. La prueba de acceso devolvió `READY` y exit 0. La evaluación terminó con exit 0 y produjo `stewart-geometria-dictamen-glm.md`; los dos archivos stderr nuevos están vacíos. El primer intento y las propuestas se preservaron sin modificaciones. No se simuló ningún dictamen.

## Comprobación preliminar y limitaciones

Las consignas se tomaron de `evaluaciones/stewart/geometria.md` y excluyen los desarrollos docentes. Ese archivo no incluye figuras en las consignas; el ejercicio 5 solicita construirlas. `evaluaciones/stewart/geometria-assets/respuestas-graficas.png` corresponde a respuestas, no es una figura de las consignas; no se suministró como si fuera parte del enunciado ni como solución anticipada.

Las dos respuestas incluyen las 18 tareas y dos niveles rotulados, aunque MiMo denomina «Cómo trazarla» al detalle del ejercicio 5. Esto verifica presencia, no suficiencia pedagógica ni corrección integral. Entre los defectos visibles, MiMo usa `2+12=14` para comprobar `x-2y` en `(2,-5)`, aunque corresponde `2-2(-5)=12`: la suma `2+12=14` es correcta, pero no corresponde a esa sustitución. La ecuación que propone sí es correcta; su 4(e) contiene un largo rodeo de autocorrección, y su atribución al teorema de Tales en 4(f) no es necesaria. DeepSeek presenta solo el resultado, sin explicar la idea en el primer nivel de 4(a), 4(c) y 4(d). Deben evaluarse ambas propuestas completas y verificar los cálculos antes de reutilizarlas.

La entrada del juez reproduce propuestas y rúbrica, sin identificadores de modelo; la atribución A/B se registra aquí, fuera de la entrada del juez. El juez alternativo emitió una selección para cada tarea; sus observaciones también deben verificarse antes de usarlas. No se implementó el examen ni se modificaron otros exámenes.

## Juez alternativo: procedencia y revisión

El usuario autorizó usar otro modelo tras el timeout. La prueba y la evaluación reales, en ese orden, fueron:

```sh
pi --no-session --no-tools --no-extensions --model opencode-go/glm-5.3 -p 'Respond exactly READY and nothing else.' > odd/pilotos/stewart-geometria-juez-alternativo-acceso.md 2> odd/pilotos/stewart-geometria-juez-alternativo-acceso-stderr.md
pi --no-session --no-tools --no-extensions --model opencode-go/glm-5.3 -p "$(< odd/pilotos/stewart-geometria-entrada-juez.md)" > odd/pilotos/stewart-geometria-dictamen-glm.md 2> odd/pilotos/stewart-geometria-juez-glm-stderr.md
```

Ambos comandos terminaron con exit 0; el primero guardó `READY`, ambos stderr quedaron vacíos y el segundo generó el dictamen. El contenido exacto del prompt largo es `stewart-geometria-entrada-juez.md`, SHA-256 `64bf269f22a53a4eeb442a168c2c1cbf7823f565866872ec4b5627227c8443d3`, igual antes y después. Las huellas de ambas propuestas y del dictamen vacío anterior tampoco cambiaron. La entrada contiene íntegras las dos propuestas y no contiene identificadores de modelos; esa comprobación no demuestra imposibilidad de inferir una identidad por estilo.

El dictamen presenta **18 selecciones individuales**: ocho B, dos A y ocho empates. Prefiere globalmente B, con correcciones, y señala el defecto de sustitución de A en 1(d), los titubeos de 4(e) y la atribución impropia de 4(f). La lectura de las 18 entradas confirma que cada una incluye justificación y observaciones, aunque algunas correcciones son recomendaciones generales. Revisión propia de puntos delicados:

- En 1(d), el juez llama «aritmética falsa» a la comprobación de A. La suma `2+12=14` es verdadera; el error está en aplicar `12` a `-2y` cuando el punto dado tiene `y=-5`. La corrección `2-2(-5)=12` dada por el juez es correcta.
- En 4(c) el juez propone quitar el desarrollo redundante de A. La guía exige un paso a paso separado para cada inciso: corresponde **reescribirlo** para que aporte claridad, no eliminarlo sin reemplazo. La misma precaución vale para sus otras sugerencias de eliminar repetición.
- En 3, el comentario sobre círculos degenerados es opcional y no hace falta para resolver este caso; no se debe engrosar el primer nivel solo por seguir esa recomendación.
- En 5(a–f), las fronteras, el sombreado y la elipse sin interior descritos por el juez concuerdan con las expresiones de la consigna. La selección pedagógica entre propuestas es una valoración, no prueba de calidad definitiva.

La revisión de estos puntos y la comprobación de presencia no sustituyen la verificación matemática integral independiente prevista en T4 ni la revisión pedagógica humana. La comprobación estructural del dictamen falló primero por una expresión regular que omitía el punto final en los rótulos; corregida la expresión, pasó con exit 0. El detalle y el comando corregido están en `stewart-geometria-revision-juez.md`.

## Comprobación estructural observada

El siguiente comando terminó con exit 0: cinco consignas idénticas, entradas que difieren solo en la instrucción de herramientas, 18 primeros niveles y 18 desarrollos por propuesta, propuestas completas en la entrada anónima y dictamen vacío. Cuenta rótulos, no prueba calidad ni corrección matemática.

```sh
python3 -B - <<'PY'
from pathlib import Path
import re
p = Path('odd/pilotos')
source = Path('evaluaciones/stewart/geometria.md').read_text()
initial = (p/'stewart-geometria-entrada-inicial.md').read_text()
retry = (p/'stewart-geometria-entrada.md').read_text()
judge = (p/'stewart-geometria-entrada-juez.md').read_text()
for n in range(1, 6):
    original = re.search(rf'## Ejercicio {n} [^\n]*\n\n(.*?)\n\n### Desarrollo docente', source, re.S).group(1)
    copied = re.search(rf'## Ejercicio {n}\n\n(.*?)(?=\n\n## Ejercicio |\Z)', initial, re.S).group(1).rstrip()
    assert original == copied, f'Enunciado {n} diferente'
print('Consignas: 5/5 idénticas')
extra = 'No tenés herramientas ni acceso a archivos: los enunciados completos están incluidos abajo. Respondé directamente, sin emitir llamadas a herramientas ni pedir archivos.\n\n'
assert retry.replace(extra, '', 1) == initial
print('Rúbrica y consignas: idénticas; reintento agrega solo instrucción sin herramientas')
assert not re.search(r'deepseek|mimo|openai|opencode|gpt-6', judge, re.I)
assert judge.count('## Propuesta A') == judge.count('## Propuesta B') == 1
for name, label in [('stewart-geometria-propuesta-mimo-reintento.md', 'A'), ('stewart-geometria-propuesta-deepseek.md', 'B')]:
    text = (p/name).read_text().rstrip()
    assert text in judge, f'Propuesta {label} incompleta en entrada del juez'
    briefs = len(re.findall(r'\*\*Explicación breve[.:]\*\*', text))
    details = len(re.findall(r'\*\*(?:Paso a paso|Cómo trazarla)[.:]\*\*', text))
    print(f'Propuesta {label}: {briefs} explicaciones breves; {details} desarrollos')
    assert briefs == details == 18
print('Entrada juez: ambas propuestas completas, sin identificadores de modelo')
print('Dictamen:', 'vacío' if not (p/'stewart-geometria-dictamen.md').read_text() else 'no vacío')
PY
```
