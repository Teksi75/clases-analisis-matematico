# Completar Álgebra de Stewart
Rama: `odd/algebra-stewart-completo`, base `8bb043939e87213a04daddc98a838deebcb36076`; entrega: ask-on-risk; previsión: más de 400 líneas fuente.
Pruebas: generación Stewart, unittest, Chromium con y sin JavaScript, pantalla e impresión; vista local para revisión humana.

## Specs

- S1: “Actualizá main y creá una nueva rama de trabajo desde allí. No continúes sobre la rama del piloto.”
- S2: “Completar todos los incisos de los ejercicios 2–10 de Álgebra. El ejercicio 1 es la referencia aprobada: preservalo y no rediseñes la interfaz. Todavía no adaptes Geometría analítica, Funciones ni Trigonometría.”
- S3: “El destinatario está terminando el secundario, no cursando una materia universitaria. Cada inciso necesita una explicación breve, realmente concisa, y un paso a paso opcional que agregue claridad sin redundancia.”
- S4: “Comprobá primero el acceso efectivo a los modelos. En el piloto funcionaron: - opencode-go/deepseek-v4.1-flash - opencode-go/mimo-v2.6-pro - openai/gpt-6.1-sol”; “Generá propuestas independientes con los dos primeros y hacelas evaluar anónimamente por el tercero. Verificá por separado la matemática, los dominios, las restricciones y las correcciones del juez. Conservá las propuestas y el dictamen como evidencia. Si algún modelo no está disponible, informalo; no simules la comparación.”
- S5: “Consignas de cada ejercicio agrupadas arriba.”; “Debajo, un panel «Consultá una resolución», con botones por inciso.”; “Ninguna respuesta visible ni inciso seleccionado al cargar.”; “Seleccionar un inciso muestra solo su explicación breve.”; “El paso a paso comienza cerrado y se reinicia al cambiar de inciso.”; “Mantener el respaldo con desplegables nativos sin JavaScript.”; “Conservar el espaciado y el verde azulado de Álgebra.”; “No mostrar el rótulo «Desarrollo docente».”; “Preservar consignas, figuras, clave original y erratas identificadas.”
- S6: “Editá el Markdown fuente y regenerá el HTML con el generador existente. Reutilizá el componente, con IDs únicos e independencia entre los paneles de los distintos ejercicios. Cargá el script una sola vez por página.”
- S7: “Extendé las pruebas para los nuevos ejercicios y verificá escritorio, celular, teclado, funcionamiento con y sin JavaScript, MathML e impresión.”
- S8: “Organizá el trabajo en unidades revisables con documentación y commits locales. No borres ni incluyas archivos ajenos no rastreados.”
- S9: “Al terminar, dejá una vista local funcionando y dame el enlace para revisar todo Álgebra antes de publicarlo. No hagas push, PR, merge ni despliegue sin mi autorización.”

## Tasks

- T1 [S1,S4,S8] done — Comprobar modelos y preparar rama; ruta: inline; commit: no aplica.
- T2 [S2,S3,S4] done — Generar propuestas independientes, dictamen anónimo y evidencia; ruta: modelos y juez, preparación delegated por context backstop; commit: pendiente.
- T3 [S2,S3,S4,S5,S6] done — Verificar matemática y adaptar explicaciones y paneles; ruta: delegated por context backstop; commit: pendiente.
- T4 [S2,S5,S6,S7] done — Extender pruebas y verificar accesibilidad, renderizado e impresión; ruta: delegated por context backstop; commit: pendiente.
- T5 [S7,S8,S9] in_progress — Documentar, revisar, confirmar unidades y habilitar vista local; ruta: inline; commit: pendiente.

## Log

- L1: “Quiero completar el examen de diagnóstico de Álgebra de Stewart aplicando el sistema pedagógico y visual
 aprobado.

   Punto de partida:
   - Repositorio: Teksi75/clases-analisis-matematico.
   - El piloto ya está integrado en main mediante la PR #1.
   - Commit de integración: 8bb0439.
   - GitHub Pages ya publica esa versión.
   - Actualizá main y creá una nueva rama de trabajo desde allí. No continúes sobre la rama del piloto.

   Antes de modificar archivos, leé:
   1. evaluaciones/stewart/GUIA-EXPLICACIONES.md
   2. evaluaciones/stewart/README.md
   3. odd/tasks/piloto-explicaciones-stewart.md
   4. odd/pilotos/stewart-algebra-ejercicio-1.md

   Alcance:
   Completar todos los incisos de los ejercicios 2–10 de Álgebra. El ejercicio 1 es la referencia aprobada:
 preservalo y no rediseñes la interfaz. Todavía no adaptes Geometría analítica, Funciones ni Trigonometría.

   Contenido pedagógico:
   El destinatario está terminando el secundario, no cursando una materia universitaria. Cada inciso
 necesita una explicación breve, realmente concisa, y un paso a paso opcional que agregue claridad sin
 redundancia.

   Comprobá primero el acceso efectivo a los modelos. En el piloto funcionaron:
   - opencode-go/deepseek-v4.1-flash
   - opencode-go/mimo-v2.6-pro
   - openai/gpt-6.1-sol

   Generá propuestas independientes con los dos primeros y hacelas evaluar anónimamente por el tercero.
 Verificá por separado la matemática, los dominios, las restricciones y las correcciones del juez. Conservá
 las propuestas y el dictamen como evidencia. Si algún modelo no está disponible, informalo; no simules la
 comparación.

   Interfaz aprobada:
   - Consignas de cada ejercicio agrupadas arriba.
   - Debajo, un panel «Consultá una resolución», con botones por inciso.
   - Ninguna respuesta visible ni inciso seleccionado al cargar.
   - Seleccionar un inciso muestra solo su explicación breve.
   - El paso a paso comienza cerrado y se reinicia al cambiar de inciso.
   - Mantener el respaldo con desplegables nativos sin JavaScript.
   - Conservar el espaciado y el verde azulado de Álgebra.
   - No mostrar el rótulo «Desarrollo docente».
   - Preservar consignas, figuras, clave original y erratas identificadas.

   Implementación y verificación:
   Editá el Markdown fuente y regenerá el HTML con el generador existente. Reutilizá el componente, con IDs
 únicos e independencia entre los paneles de los distintos ejercicios. Cargá el script una sola vez por
 página.

   Extendé las pruebas para los nuevos ejercicios y verificá escritorio, celular, teclado, funcionamiento
 con y sin JavaScript, MathML e impresión.

   Organizá el trabajo en unidades revisables con documentación y commits locales. No borres ni incluyas
 archivos ajenos no rastreados.

   Al terminar, dejá una vista local funcionando y dame el enlace para revisar todo Álgebra antes de
 publicarlo. No hagas push, PR, merge ni despliegue sin mi autorización.”
- L2: Los cuatro documentos solicitados se leyeron antes de crear esta ficha. `git fetch origin main` confirmó `8bb043939e87213a04daddc98a838deebcb36076`; se creó la rama indicada. Archivos no rastreados preexistentes permanecen fuera del alcance. Pandoc 3.11, Node, Chromium y pdftoppm disponibles.
- L3: Pruebas reales `pi --no-session --no-tools --no-extensions ... --model <modelo> -p 'Respond exactly READY and nothing else.'`: `opencode-go/deepseek-v4.1-flash`, `opencode-go/mimo-v2.6-pro` y `openai/gpt-6.1-sol` devolvieron `READY` y exit 0, en pruebas independientes.
- L4: Comprobación inicial de la base: `generar.py --check` correcto y 30 pruebas Stewart existentes correctas. El agente `mvtp870a-1-2fm8` preparó `odd/pilotos/stewart-algebra-2-10-entrada.md`; lectura del padre y comparación independiente de los nueve enunciados contra la fuente correctas. La evaluación nativa posterior a la delegación falló y no produjo plan; no se inventa una valoración.
- L5: Propuestas independientes DeepSeek (`job-6`) y MiMo (`job-7`) en ejecución, con idéntica entrada sin soluciones. Dictamen pendiente.
- L6: El verificador independiente `mvtp9y4z-2-rt7p`, sin acceso a propuestas, resolvió los 40 incisos y examinó restricciones y erratas. Informe guardado en `odd/pilotos/stewart-algebra-2-10-verificacion-matematica.md`; señaló un primer intento numérico fallido por división flotante y una segunda sonda corregida exitosa, que no sustituye prueba algebraica. Verificación de la integración y del dictamen pendiente.
- L7: MiMo terminó con exit 0; respuesta de 254 líneas guardada en `odd/pilotos/stewart-algebra-2-10-propuesta-mimo.md`, stderr vacío. Se observaron incisos como 3(a)–(d) sin paso a paso separado, una carencia a evaluar y corregir si se usa.
- L8: DeepSeek terminó con exit 0; respuesta de 455 líneas guardada en `odd/pilotos/stewart-algebra-2-10-propuesta-deepseek.md`, stderr vacío. No separa sistemáticamente la explicación breve del paso a paso. Se comprobó que las propuestas no nombran modelos; el juez recibió la rúbrica y propuestas anónimas en `odd/pilotos/stewart-algebra-2-10-entrada-juez.md` (A: MiMo; B: DeepSeek), sin nombres ni rutas de modelo.
- L9: Dictamen `openai/gpt-6.1-sol` terminó con exit 0, guardado en `odd/pilotos/stewart-algebra-2-10-dictamen.md`; stderr vacío. Prefiere globalmente A como base, B en 8(a), 8(d), 8(e) y 10(b), exige corregir 10(b) de A, dominios y separación de niveles, y no aprueba ninguna propuesta completa.
- L10: Verificación independiente `mvtpoq5f-3-u66q` contrastó propuestas y correcciones del juez; informe `odd/pilotos/stewart-algebra-2-10-verificacion-dictamen.md`. Confirmó los dominios y errores señalados; recordó preservar tres erratas, precisar 10(d) y mantener el paso a paso cerrado pese a la observación del juez sobre las propuestas.
- L11: `mvtpri0s-4-ydvn` agregó pruebas públicas en `tests/test_stewart_piloto.py`. RED observado por el padre: `python3 -B tests/test_stewart_piloto.py` terminó con exit 1, 9 tests y 19 fallas esperadas por ausencia de los nueve paneles; no se modificó la implementación. La evaluación nativa posterior al escritor devolvió `nativeRisk: unassessable` por archivos no rastreados y plan sin verificador adicional; no es una aprobación de revisión.
- L12: `mvtpu37j-5-nx9o` adaptó los 40 incisos en Markdown; el padre regeneró HTML. GREEN observado: `generar.py`, `generar.py --check`, pruebas focalizadas, suite Stewart (35 tests) y `git diff --check` terminaron con exit 0 (`job-9`). Una nueva evaluación nativa no pudo evaluar archivos no rastreados y no indicó verificador adicional. Está en curso una revisión matemática y pedagógica independiente de lo integrado (`mvtpx8b7-6-d23y`); navegador e impresión siguen pendientes.
- L13: “Revisión T3 matemática/pedagógica: no encontré bloqueantes en los 40 incisos; 8(b) cadena de igualdad y 8(e) t²−3t+2=...=0 están bajo la hipótesis de resolver las ecuaciones, no son identidades universales. Comparación automatizada confirma ejercicio 1, consignas 2–10, clave y tres erratas idénticos a 8bb0439; 40 pasos cerrados, IDs únicos y script único. No inspeccioné HTML ni verifiqué comportamiento dinámico.” Revisión adicional `mvtpx8b7-6-d23y` aún pendiente; si aporta hallazgos se reabrirá T3.
- L14: `mvtpzdbk-7-qb1o` prepara la extensión de pruebas dinámicas para los diez paneles; quedan pendientes las ejecuciones de navegador e impresión.
- L15: Revisión independiente adicional `mvtpx8b7-6-d23y` no encontró bloqueantes matemáticos ni pedagógicos en los 40 incisos; confirmó en fuente consignas, ejercicio 1, clave y erratas sin cambios y control de dominios. No inspeccionó HTML ni navegador. Propuso una prueba textual de dominios en Markdown: se evaluará su adaptación a la interfaz HTML pública, ya que la verificación debe cubrir el resultado visible, no solo la fuente.
- L16: `mvtpzdbk-7-qb1o` amplió los scripts de navegador e impresión; `job-10` verifica interacciones de 46 incisos en dos tamaños y modos con/sin JavaScript. `job-11` pasó con exit 0: navegación, pantalla e impresión generales y MathML sin fallas; PDFs inicial y con selecciones producidos en `evaluaciones/stewart/verificacion-visual/navegacion-di96KN`. `mvtq24t9-8-brrw` prepara una prueba de restricciones sobre el HTML público. Evaluación nativa posterior al escritor: `unassessable` por no rastreados, sin verificador adicional en el plan.
- L17: `job-12` rasterizó las diez páginas de cada PDF; el padre inspeccionó las hojas de contacto de ambos estados y una captura móvil. No se observa recorte evidente, aunque algunos paneles se dividen entre páginas; no se modificó la presentación aprobada. Las imágenes están en la carpeta visual nueva, ajena al commit.
- L18: `job-10` falló primero por un defecto del propio script de prueba: `snapshot()` esperaba `requestAnimationFrame` y con la ejecución de scripts desactivada esa promesa nunca se resuelve (`Tiempo máximo agotado`, exit 13). La parte con JavaScript ya había pasado en ambas anchuras. Se reemplazó la espera por lecturas de layout sincrónicas y se amplió el límite a 300 s: `job-13` pasó con exit 0 en las cuatro combinaciones, 10 paneles y 46 incisos. No fue un defecto del sitio.
- L19: La prueba de dominios sobre HTML público se agregó con `mvtq24t9-8-brrw`; el padre la ejecutó junto con la suite. Verificación final observada: `python3 -B tests/test_stewart_piloto.py` 10 tests OK; `generar.py --check` HTML comprobados; `python3 -B -m unittest discover -s tests -p 'test_stewart*.py'` 36 tests OK; `git diff --check` correcto; `node evaluaciones/stewart/check-browser.mjs` 0 fallas con MathML correcto en 1265/375 px e impresión; `node tests/check_stewart_piloto.mjs` correcto en 1280/390 px con y sin JavaScript. El usuario informó un problema con OpenAI y cambió el modelo de la sesión a `deepseek-v4.1-flash`; el dictamen con `openai/gpt-6.1-sol` ya estaba terminado y conservado, por lo que no se repitió ni se simuló nada.
