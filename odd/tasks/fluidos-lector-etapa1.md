# Fluidos: lector opcional, etapa 1
Objetivo: implementar únicamente la etapa 1; rama `feat/fluidos-lector-etapa1`, base remota `35b9015149510950442db63f251a4379962a4a50`.
Entrega local sin publicación; estrategia `auto-chain`, `chain_strategy=feature-branch-chain` elegida explícitamente; pruebas Node/Chromium/Python/Pandoc.

## Specs

### S1

# A. Restricciones verificadas previamente

La evaluación anterior del repositorio identificó estas características. Confirmá su vigencia antes de realizar cambios.

1. `fluidos/index.html` es generado mediante `fluidos/generar.py` a partir de `fluidos/plantilla.html`. No modificar el HTML generado como fuente primaria. Regenerarlo mediante el procedimiento oficial y ejecutar `python3 fluidos/generar.py --check`.

2. `teoria/lectura.js` es compartido con otras páginas. No modificarlo.

3. `lectura/extractor.js` excluye deliberadamente las tablas. Mantener esa política durante las etapas 1 y 2.

4. Existen pruebas en `tests/lector-ui.test.mjs`, `tests/lector-engine.test.mjs` y `tests/lector-extractor.test.mjs`. Conservar y adaptar las pruebas pertinentes. No borrarlas para conseguir resultados positivos.

5. Existe una rama local `feat/lector-educativo` que, según el diagnóstico anterior, incluye unos 34 commits y modificaciones ajenas a Fluidos. No utilizarla como base.

6. Crear una nueva rama desde `main`, previa verificación del estado de Git y de cualquier cambio local. No sobrescribir ni descartar trabajo existente.

7. El repositorio requiere un issue aprobado y exactamente una etiqueta `type:*` por PR. Revisar la política real y verificar si el issue `#30` corresponde a esta tarea.

8. GitHub Pages publica desde `main`, según la evaluación previa. Confirmarlo y no desplegar automáticamente.

Si alguno de estos hechos ya no es correcto, utilizar el estado real del repositorio, explicar la diferencia y adaptar el plan sin comprometer trabajo existente.

---

### S2

## C1. Estado inicial

Al abrir o recargar la página:

- No mostrar el reproductor inferior.
- No reproducir audio.
- No reservar espacio para el reproductor.
- No activar resaltado de lectura.
- No activar desplazamiento automático.
- No alterar la presentación normal del documento.

Mostrar exclusivamente un botón discreto con icono de auriculares y el texto:

**Escuchar**

Integrarlo en el encabezado o en los controles existentes del cuadernillo.

No crear un botón flotante que se desplace permanentemente por la pantalla.

El alumno debe poder leer y utilizar todo el material sin activar jamás el lector.

## C2. Activación

Al pulsar «Escuchar»:

1. Mostrar el reproductor inferior compacto.
2. Preparar la posición de lectura.
3. Mantener el audio detenido.
4. Esperar que el alumno pulse Reproducir.

Abrir el reproductor no debe iniciar audio.

## C3. Diseño del reproductor

Crear una barra horizontal fija en la parte inferior.

Características:

- Altura orientativa en escritorio: 60–80 píxeles.
- Diseño responsive.
- Fondo oscuro compatible con el sitio.
- Controles de tamaño adecuado.
- Buen contraste.
- Espaciado compacto.
- Compatibilidad con dispositivos móviles.
- Respeto de `safe-area-inset-bottom`.

La barra debe permanecer disponible durante el desplazamiento por la página.

Cuando esté abierta, añadir el espacio inferior necesario para que no cubra el contenido.

Cuando esté cerrada, eliminar completamente ese espacio adicional.

### Distribución

**Izquierda**
- Título del apartado o capítulo.
- Estado de reproducción.

**Centro**
- Fragmento anterior.
- Reproducir/Pausar.
- Fragmento siguiente.

**Derecha**
- Velocidad.
- Configuración.
- Minimizar.
- Cerrar lector.

Los controles secundarios pueden agruparse cuando el ancho disponible sea reducido.

## C4. Estados de interfaz

Distinguir tres estados independientes del motor de voz:

- `closed`: lector desactivado.
- `open`: barra completa visible.
- `minimized`: reproductor reducido.

### Closed

- Sin audio.
- Sin barra.
- Sin resaltado.
- Sin seguimiento.
- Sin espacio reservado.
- Botón «Escuchar» disponible.

### Open

- Barra inferior completa.
- Controles operativos.
- Posibilidad de reproducir y pausar.

### Minimized

- Ocultar la barra completa.
- Mantener el estado de reproducción.
- Mostrar un control compacto que permita pausar y restaurar.
- No detener automáticamente el audio.

Minimizar y cerrar no son acciones equivalentes.

## C5. Cerrar el lector

Agregar un control accesible «Cerrar lector».

Al utilizarlo:

1. Cancelar cualquier reproducción activa.
2. Invalidar eventos pendientes.
3. Eliminar el resaltado del fragmento.
4. Desactivar el seguimiento automático.
5. Retirar todos los controles del reproductor.
6. Eliminar el espacio inferior reservado.
7. Conservar voz y velocidad guardadas.
8. Mantener la posición actual de scroll.
9. Volver al modo convencional de lectura.

No reabrir el lector automáticamente después de recargar la página.

## C6. Controles

Reemplazar los botones separados de Reproducir, Pausar y Reanudar por un único botón que cambie según el estado.

Mantener controles Anterior y Siguiente.

Mover Detener a las opciones secundarias.

Eliminar el selector visible de párrafo o bloque.

Eliminar selectores duplicados de capítulo cuando la navegación existente pueda cumplir esa función.

No destruir mecanismos internos necesarios para la navegación. Su reemplazo definitivo se realizará en la etapa 2.

Si la eliminación de un control afecta temporalmente a la accesibilidad, proporcionar un mecanismo alternativo equivalente.

#### Excepción de frontera aceptada para S2

Decisión humana: «Aceptar esa excepción de límite — recomendado». Alcance aceptado: sólo al cerrar desde una posición superior al nuevo máximo posible, ajustar el scroll a ese máximo; en cualquier otra posición conservar el scroll y no dejar espacio reservado al cerrar. No se exige una igualdad numérica imposible fuera del rango del documento.

### S3

## C7. Estados del motor

Inspeccionar primero la implementación existente.

Definir los estados observables:

- `idle`
- `playing`
- `paused`
- `stopped`
- `finished`
- `error`

No reemplazar innecesariamente el motor si puede adaptarse mediante un controlador ligero.

### Transiciones

| Estado actual | Acción | Resultado |
|---|---|---|
| idle | Reproducir | playing |
| playing | Pausar | paused |
| paused | Reanudar | playing |
| playing | Detener | stopped |
| paused | Detener | stopped |
| stopped | Reproducir | playing |
| finished | Reproducir | playing desde el inicio del contexto |
| playing | Fin natural | finished |
| playing | Error irrecuperable | error |

Evitar sesiones de audio simultáneas.

Protegerse frente a eventos atrasados de `SpeechSynthesisUtterance`.

No interpretar la cancelación como finalización natural.

Pausar no debe provocar avance al siguiente fragmento.

## C8. Voces

Mantener selección de voz dentro de Configuración.

Prioridad automática:

1. `es-AR`.
2. `es-419`.
3. Otras variantes latinoamericanas.
4. `es-ES`.
5. Otras voces en español.

Reconocer adecuadamente las etiquetas regionales y no suponer que todas tienen dos letras.

Permitir elegir manualmente cualquier voz en español disponible.

Gestionar el evento `voiceschanged`.

Guardar la selección cuando corresponda.

No incorporar servicios pagos ni APIs externas.

## C9. Velocidad

Ofrecer los valores:

- 0,8×
- 1×
- 1,2×
- 1,5×

Migrar los valores guardados anteriormente al preset más cercano.

En caso de empate, favorecer 1× cuando corresponda; de lo contrario, elegir el inferior.

Guardar la preferencia.

Evitar reinicios o duplicaciones innecesarias al cambiar la velocidad.

### S4

# B. Principios de diseño

1. La lectura convencional tiene prioridad.
2. El lector nunca se activa automáticamente.
3. El reproductor no debe ocupar espacio cuando está cerrado.
4. La interfaz debe ser compacta.
5. Los controles deben estar disponibles durante la reproducción.
6. La lógica de lectura existente debe preservarse durante la etapa 1.
7. Las nuevas funciones deben incorporarse progresivamente.
8. El desarrollo debe facilitar la reutilización futura en otros cuadernillos.

---

## C10. Preservación funcional

Durante la etapa 1:

- Mantener el extractor existente.
- Conservar la lectura matemática actual.
- Mantener la exclusión de tablas.
- Preservar la navegación existente.
- Mantener la estructura del documento.
- Preservar ejercicios y enlaces.
- No modificar `teoria/lectura.js`.
- Reutilizar la clase `lector-activo` cuando corresponda.

No introducir todavía nuevas reglas de interpretación matemática.

---

### S5

# F. Pruebas obligatorias de la etapa 1

Inspeccionar los comandos reales del repositorio.

Ejecutar las pruebas correspondientes a:

- Interfaz del lector.
- Motor TTS.
- Extractor.
- Generación del documento.

Adaptar los tests de interfaz para verificar:

1. La web inicia sin reproductor visible.
2. «Escuchar» abre la barra.
3. Abrir la barra no inicia audio.
4. Reproducir funciona correctamente.
5. Pausar y reanudar funcionan.
6. Anterior y Siguiente funcionan.
7. Minimizar conserva la reproducción.
8. El modo minimizado permite pausar.
9. Cerrar cancela la reproducción.
10. Cerrar elimina resaltados.
11. Cerrar no modifica el scroll.
12. Cerrar retira el espacio inferior.
13. Recargar no activa el lector.
14. Las preferencias de voz persisten.
15. Las preferencias de velocidad persisten.
16. No existe doble reproducción.
17. Los eventos antiguos no reactivan el lector.
18. La extracción actual permanece intacta.
19. La presentación móvil es funcional.
20. La navegación convencional permanece operativa.

No marcar como aprobada una prueba que no haya sido ejecutada.

Comprobar la generación mediante:

`python3 fluidos/generar.py --check`

Actualizar las pruebas de interfaz obsoletas sin eliminar la cobertura de capacidades conservadas.

---

#### Criterio F11 actualizado por decisión humana

Aplicar la excepción de frontera aceptada en S2: igualdad de scroll dentro del nuevo rango y ajuste exclusivamente al máximo si la posición previa lo supera; siempre cero reserva cerrada. Mantener evidencia del fallo original y probar ambos casos.

### S6

# G. Procedimiento de trabajo

### Paso 1 — Diagnóstico

Antes de editar:

1. Verificar rama y estado de Git.
2. Confirmar cambios locales.
3. Revisar el generador.
4. Identificar archivos fuente.
5. Revisar el lector actual.
6. Revisar pruebas.
7. Confirmar política de PR.
8. Verificar issue `#30`.
9. Identificar riesgos.

### Paso 2 — Preparación

Crear una rama nueva desde `main`.

No incorporar commits de `feat/lector-educativo`.

No sobrescribir trabajo existente.

### Paso 3 — Implementación

Realizar exclusivamente la etapa 1.

Mantener cambios acotados y revisables.

No modificar componentes compartidos.

### Paso 4 — Validación

Ejecutar pruebas.

Regenerar el HTML.

Verificar que los archivos generados estén sincronizados.

Inspeccionar el diff.

Comprobar visualmente el reproductor cuando las herramientas permitan utilizar un navegador.

### Paso 5 — Informe

Entregar:

1. Rama y commit base.
2. Diagnóstico.
3. Archivos modificados.
4. Funcionalidades implementadas.
5. Pruebas y resultados.
6. Matriz de criterios de aceptación y evidencia.
7. Limitaciones.
8. Trabajo pendiente.
9. Estado del issue y requisitos de PR.

No fusionar ni publicar automáticamente.

---

# H. Restricciones definitivas

- No alterar los contenidos de Física.
- No reconstruir la web.
- No modificar `teoria/lectura.js`.
- No editar manualmente el HTML generado como fuente primaria.
- No incorporar commits de otras ramas.
- No eliminar pruebas para conseguir que pasen.
- No cambiar todavía la lectura de tablas.
- No introducir servicios pagos.
- No añadir audio automático.
- No mostrar el reproductor cuando no se solicita.
- No dejar controles flotantes permanentes en la lectura convencional.
- No crear modificaciones fuera del alcance.
- No publicar sin autorización.

## Instrucción final

**Implementá únicamente la etapa 1: reproductor inferior compacto, activación opcional mediante «Escuchar», controles fiables, configuración de voces y velocidad, minimización y cierre completo.**

Comenzá por el diagnóstico del repositorio y verificá todas las restricciones identificadas anteriormente.

Realizá las modificaciones necesarias y ejecutá las pruebas.

Dejá los cambios preparados para revisión, sin fusionar ni publicar.

Al finalizar, presentá un informe técnico con evidencia verificable de los resultados.

## Tasks

- T1 | S1, S6 | Diagnóstico y aislamiento | ruta: parent + explorer (presupuesto de exploración superado) | done | base 35b9015149510950442db63f251a4379962a4a50; sin commit propio aún.
- T2 | S2-S5 | Implementación y pruebas de la etapa 1 | ruta: gentle-ai-worker (context backstop medido por runtime), ajuste acotado de pruebas/docs por parent | in_progress | excepción F11 aceptada; se agrega prueba explícita de frontera sin cambiar motor/UI; RED por regla incompleto queda documentado; sin commit.
- T3 | S1-S6 | Verificación independiente y revisión nativa si corresponde | ruta: gentle-ai-verify, Risk: item 4 (eventos asíncronos de síntesis y exclusión de sesiones simultáneas) | pending | verificación independiente ejecutada: TTS aprobado en simulación, F11 falla en límite absoluto; revisión nativa aún no iniciada.
- T4 | S5-S6 | Evidencia, matriz de aceptación y cierre local | ruta: parent | pending | informe y commits pendientes.

## Log

### L1 — Solicitud original (verbatim)

# Implementación del lector educativo de Mecánica de los fluidos
## Especificación consolidada para Gentle-shell (Pi)

### Objetivo

Rediseñar el lector de voz existente en:

https://teksi75.github.io/clases-analisis-matematico/fluidos/index.html

La web es principalmente un cuadernillo educativo para lectura y estudio. El lector de voz debe ser una **funcionalidad opcional**, activada expresamente por el alumno.

El resultado buscado es un reproductor compacto y accesible, ubicado en la parte inferior de la pantalla únicamente cuando se solicita.

La implementación se divide en tres etapas independientes. **En esta ejecución, realizar solamente la etapa 1.**

No reconstruir la página ni alterar los contenidos educativos.

---

# A. Restricciones verificadas previamente

La evaluación anterior del repositorio identificó estas características. Confirmá su vigencia antes de realizar cambios.

1. `fluidos/index.html` es generado mediante `fluidos/generar.py` a partir de `fluidos/plantilla.html`. No modificar el HTML generado como fuente primaria. Regenerarlo mediante el procedimiento oficial y ejecutar `python3 fluidos/generar.py --check`.

2. `teoria/lectura.js` es compartido con otras páginas. No modificarlo.

3. `lectura/extractor.js` excluye deliberadamente las tablas. Mantener esa política durante las etapas 1 y 2.

4. Existen pruebas en `tests/lector-ui.test.mjs`, `tests/lector-engine.test.mjs` y `tests/lector-extractor.test.mjs`. Conservar y adaptar las pruebas pertinentes. No borrarlas para conseguir resultados positivos.

5. Existe una rama local `feat/lector-educativo` que, según el diagnóstico anterior, incluye unos 34 commits y modificaciones ajenas a Fluidos. No utilizarla como base.

6. Crear una nueva rama desde `main`, previa verificación del estado de Git y de cualquier cambio local. No sobrescribir ni descartar trabajo existente.

7. El repositorio requiere un issue aprobado y exactamente una etiqueta `type:*` por PR. Revisar la política real y verificar si el issue `#30` corresponde a esta tarea.

8. GitHub Pages publica desde `main`, según la evaluación previa. Confirmarlo y no desplegar automáticamente.

Si alguno de estos hechos ya no es correcto, utilizar el estado real del repositorio, explicar la diferencia y adaptar el plan sin comprometer trabajo existente.

---

# B. Principios de diseño

1. La lectura convencional tiene prioridad.
2. El lector nunca se activa automáticamente.
3. El reproductor no debe ocupar espacio cuando está cerrado.
4. La interfaz debe ser compacta.
5. Los controles deben estar disponibles durante la reproducción.
6. La lógica de lectura existente debe preservarse durante la etapa 1.
7. Las nuevas funciones deben incorporarse progresivamente.
8. El desarrollo debe facilitar la reutilización futura en otros cuadernillos.

---

# C. Etapa 1 — Reproductor compacto y opcional

## C1. Estado inicial

Al abrir o recargar la página:

- No mostrar el reproductor inferior.
- No reproducir audio.
- No reservar espacio para el reproductor.
- No activar resaltado de lectura.
- No activar desplazamiento automático.
- No alterar la presentación normal del documento.

Mostrar exclusivamente un botón discreto con icono de auriculares y el texto:

**Escuchar**

Integrarlo en el encabezado o en los controles existentes del cuadernillo.

No crear un botón flotante que se desplace permanentemente por la pantalla.

El alumno debe poder leer y utilizar todo el material sin activar jamás el lector.

## C2. Activación

Al pulsar «Escuchar»:

1. Mostrar el reproductor inferior compacto.
2. Preparar la posición de lectura.
3. Mantener el audio detenido.
4. Esperar que el alumno pulse Reproducir.

Abrir el reproductor no debe iniciar audio.

## C3. Diseño del reproductor

Crear una barra horizontal fija en la parte inferior.

Características:

- Altura orientativa en escritorio: 60–80 píxeles.
- Diseño responsive.
- Fondo oscuro compatible con el sitio.
- Controles de tamaño adecuado.
- Buen contraste.
- Espaciado compacto.
- Compatibilidad con dispositivos móviles.
- Respeto de `safe-area-inset-bottom`.

La barra debe permanecer disponible durante el desplazamiento por la página.

Cuando esté abierta, añadir el espacio inferior necesario para que no cubra el contenido.

Cuando esté cerrada, eliminar completamente ese espacio adicional.

### Distribución

**Izquierda**
- Título del apartado o capítulo.
- Estado de reproducción.

**Centro**
- Fragmento anterior.
- Reproducir/Pausar.
- Fragmento siguiente.

**Derecha**
- Velocidad.
- Configuración.
- Minimizar.
- Cerrar lector.

Los controles secundarios pueden agruparse cuando el ancho disponible sea reducido.

## C4. Estados de interfaz

Distinguir tres estados independientes del motor de voz:

- `closed`: lector desactivado.
- `open`: barra completa visible.
- `minimized`: reproductor reducido.

### Closed

- Sin audio.
- Sin barra.
- Sin resaltado.
- Sin seguimiento.
- Sin espacio reservado.
- Botón «Escuchar» disponible.

### Open

- Barra inferior completa.
- Controles operativos.
- Posibilidad de reproducir y pausar.

### Minimized

- Ocultar la barra completa.
- Mantener el estado de reproducción.
- Mostrar un control compacto que permita pausar y restaurar.
- No detener automáticamente el audio.

Minimizar y cerrar no son acciones equivalentes.

## C5. Cerrar el lector

Agregar un control accesible «Cerrar lector».

Al utilizarlo:

1. Cancelar cualquier reproducción activa.
2. Invalidar eventos pendientes.
3. Eliminar el resaltado del fragmento.
4. Desactivar el seguimiento automático.
5. Retirar todos los controles del reproductor.
6. Eliminar el espacio inferior reservado.
7. Conservar voz y velocidad guardadas.
8. Mantener la posición actual de scroll.
9. Volver al modo convencional de lectura.

No reabrir el lector automáticamente después de recargar la página.

## C6. Controles

Reemplazar los botones separados de Reproducir, Pausar y Reanudar por un único botón que cambie según el estado.

Mantener controles Anterior y Siguiente.

Mover Detener a las opciones secundarias.

Eliminar el selector visible de párrafo o bloque.

Eliminar selectores duplicados de capítulo cuando la navegación existente pueda cumplir esa función.

No destruir mecanismos internos necesarios para la navegación. Su reemplazo definitivo se realizará en la etapa 2.

Si la eliminación de un control afecta temporalmente a la accesibilidad, proporcionar un mecanismo alternativo equivalente.

## C7. Estados del motor

Inspeccionar primero la implementación existente.

Definir los estados observables:

- `idle`
- `playing`
- `paused`
- `stopped`
- `finished`
- `error`

No reemplazar innecesariamente el motor si puede adaptarse mediante un controlador ligero.

### Transiciones

| Estado actual | Acción | Resultado |
|---|---|---|
| idle | Reproducir | playing |
| playing | Pausar | paused |
| paused | Reanudar | playing |
| playing | Detener | stopped |
| paused | Detener | stopped |
| stopped | Reproducir | playing |
| finished | Reproducir | playing desde el inicio del contexto |
| playing | Fin natural | finished |
| playing | Error irrecuperable | error |

Evitar sesiones de audio simultáneas.

Protegerse frente a eventos atrasados de `SpeechSynthesisUtterance`.

No interpretar la cancelación como finalización natural.

Pausar no debe provocar avance al siguiente fragmento.

## C8. Voces

Mantener selección de voz dentro de Configuración.

Prioridad automática:

1. `es-AR`.
2. `es-419`.
3. Otras variantes latinoamericanas.
4. `es-ES`.
5. Otras voces en español.

Reconocer adecuadamente las etiquetas regionales y no suponer que todas tienen dos letras.

Permitir elegir manualmente cualquier voz en español disponible.

Gestionar el evento `voiceschanged`.

Guardar la selección cuando corresponda.

No incorporar servicios pagos ni APIs externas.

## C9. Velocidad

Ofrecer los valores:

- 0,8×
- 1×
- 1,2×
- 1,5×

Migrar los valores guardados anteriormente al preset más cercano.

En caso de empate, favorecer 1× cuando corresponda; de lo contrario, elegir el inferior.

Guardar la preferencia.

Evitar reinicios o duplicaciones innecesarias al cambiar la velocidad.

## C10. Preservación funcional

Durante la etapa 1:

- Mantener el extractor existente.
- Conservar la lectura matemática actual.
- Mantener la exclusión de tablas.
- Preservar la navegación existente.
- Mantener la estructura del documento.
- Preservar ejercicios y enlaces.
- No modificar `teoria/lectura.js`.
- Reutilizar la clase `lector-activo` cuando corresponda.

No introducir todavía nuevas reglas de interpretación matemática.

---

# D. Etapa 2 — Navegación y seguimiento

**No implementar durante esta ejecución.**

Esta etapa agregará:

- Inicio desde el apartado visible.
- Selección directa del punto de lectura.
- Navegación contextual mediante el índice lateral.
- Lectura continua entre apartados y capítulos.
- Resaltado del fragmento activo.
- Desplazamiento automático.
- Suspensión del seguimiento cuando el usuario haga scroll manual.
- Control «Seguir lectura».
- Progreso por capítulo.
- Conservación segura de la posición.
- Gestión de cambios en elementos `<details>`.

### Política de navegación

Cuando el usuario haga clic voluntariamente en otro capítulo:

- Si está reproduciendo, cambiar y continuar.
- Si está pausado, cambiar y permanecer pausado.
- Si está detenido, preparar el nuevo contexto sin reproducir.

Los cambios de sección ocasionados exclusivamente por scroll no deben reiniciar la lectura.

### Accesibilidad

No agregar cientos de párrafos al orden de tabulación.

Ofrecer una navegación accesible por encabezados y controles del reproductor, complementada por un mecanismo para seleccionar un punto de lectura.

### Seguimiento automático

El seguimiento debe mantener visible el fragmento activo sin desplazar innecesariamente el documento.

Si el usuario desplaza manualmente la página, continuar el audio y suspender el seguimiento hasta que solicite retomarlo.

### Elementos desplegables

Si cambia un elemento `<details>`, actualizar la secuencia afectada cuando sea necesario y conservar la posición si es segura.

Si la posición deja de ser válida, regresar al encabezado más cercano en estado pausado.

### Progreso

Mostrar progreso por capítulo, por ejemplo «Fragmento 12 de 45».

No presentar ese progreso como tiempo real de audio.

---

# E. Etapa 3 — Lectura científica avanzada

**No implementar durante esta ejecución.**

Esta etapa mejorará el tratamiento de contenido matemático y científico e incorporará la lectura de tablas.

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

## E3. Diagramas

Utilizar únicamente descripciones accesibles existentes y significativas.

No inventar explicaciones de imágenes.

---

# F. Pruebas obligatorias de la etapa 1

Inspeccionar los comandos reales del repositorio.

Ejecutar las pruebas correspondientes a:

- Interfaz del lector.
- Motor TTS.
- Extractor.
- Generación del documento.

Adaptar los tests de interfaz para verificar:

1. La web inicia sin reproductor visible.
2. «Escuchar» abre la barra.
3. Abrir la barra no inicia audio.
4. Reproducir funciona correctamente.
5. Pausar y reanudar funcionan.
6. Anterior y Siguiente funcionan.
7. Minimizar conserva la reproducción.
8. El modo minimizado permite pausar.
9. Cerrar cancela la reproducción.
10. Cerrar elimina resaltados.
11. Cerrar no modifica el scroll.
12. Cerrar retira el espacio inferior.
13. Recargar no activa el lector.
14. Las preferencias de voz persisten.
15. Las preferencias de velocidad persisten.
16. No existe doble reproducción.
17. Los eventos antiguos no reactivan el lector.
18. La extracción actual permanece intacta.
19. La presentación móvil es funcional.
20. La navegación convencional permanece operativa.

No marcar como aprobada una prueba que no haya sido ejecutada.

Comprobar la generación mediante:

`python3 fluidos/generar.py --check`

Actualizar las pruebas de interfaz obsoletas sin eliminar la cobertura de capacidades conservadas.

---

# G. Procedimiento de trabajo

### Paso 1 — Diagnóstico

Antes de editar:

1. Verificar rama y estado de Git.
2. Confirmar cambios locales.
3. Revisar el generador.
4. Identificar archivos fuente.
5. Revisar el lector actual.
6. Revisar pruebas.
7. Confirmar política de PR.
8. Verificar issue `#30`.
9. Identificar riesgos.

### Paso 2 — Preparación

Crear una rama nueva desde `main`.

No incorporar commits de `feat/lector-educativo`.

No sobrescribir trabajo existente.

### Paso 3 — Implementación

Realizar exclusivamente la etapa 1.

Mantener cambios acotados y revisables.

No modificar componentes compartidos.

### Paso 4 — Validación

Ejecutar pruebas.

Regenerar el HTML.

Verificar que los archivos generados estén sincronizados.

Inspeccionar el diff.

Comprobar visualmente el reproductor cuando las herramientas permitan utilizar un navegador.

### Paso 5 — Informe

Entregar:

1. Rama y commit base.
2. Diagnóstico.
3. Archivos modificados.
4. Funcionalidades implementadas.
5. Pruebas y resultados.
6. Matriz de criterios de aceptación y evidencia.
7. Limitaciones.
8. Trabajo pendiente.
9. Estado del issue y requisitos de PR.

No fusionar ni publicar automáticamente.

---

# H. Restricciones definitivas

- No alterar los contenidos de Física.
- No reconstruir la web.
- No modificar `teoria/lectura.js`.
- No editar manualmente el HTML generado como fuente primaria.
- No incorporar commits de otras ramas.
- No eliminar pruebas para conseguir que pasen.
- No cambiar todavía la lectura de tablas.
- No introducir servicios pagos.
- No añadir audio automático.
- No mostrar el reproductor cuando no se solicita.
- No dejar controles flotantes permanentes en la lectura convencional.
- No crear modificaciones fuera del alcance.
- No publicar sin autorización.

## Instrucción final

**Implementá únicamente la etapa 1: reproductor inferior compacto, activación opcional mediante «Escuchar», controles fiables, configuración de voces y velocidad, minimización y cierre completo.**

Comenzá por el diagnóstico del repositorio y verificá todas las restricciones identificadas anteriormente.

Realizá las modificaciones necesarias y ejecutá las pruebas.

Dejá los cambios preparados para revisión, sin fusionar ni publicar.

Al finalizar, presentá un informe técnico con evidencia verificable de los resultados.

### L2 — Diagnóstico y plan, 2026-11-12

- El árbol original sigue en feat/lector-educativo, HEAD e7e162f2bc1490482553ffe556cbce22a88a9067, con cambios humanos en odd/tasks/apuntes-fluidos.md y archivos no seguidos. No se tocaron.
- main local 8c3d443049cbe5e559805f26d7e87660e42897c8 eliminó Fluidos. main remoto real es 35b9015149510950442db63f251a4379962a4a50, sí contiene fluidos/ y lectura/. Se actualizó origin/main mediante fetch; main local permanece intacto.
- Nueva rama y worktree registrados: .worktrees/fluidos-lector-etapa1 desde origin/main. Estado inicial limpio; archivos del lector y pruebas idénticos a los de la rama anterior, sin transplantar commits.
- feat/lector-educativo tiene 38 commits exclusivos respecto del main local, no los 34 del diagnóstico histórico.
- GitHub API confirma issue #30 OPEN con status:approved y type:feature. Su alcance original es la integración del lector; esta ejecución no hereda su autorización anterior de publicación.
- Pages publica main / mediante legacy. Ningún despliegue autorizado. Política formal de PR todavía en contraste con registros históricos.
- Fuentes: fluidos/plantilla.html + fluidos/contenido/*.md, generadas por fluidos/generar.py; integración fluidos/lector.js; UI y motor lectura/ui.js, lectura/engine.js, lectura/lector.css.
- Preservar byte a byte teoria/lectura.js, lectura/extractor.js, narrador MathML y contenido de Física. No implementar las etapas 2 y 3.
- Reutilizar SpeechReader, cancel/token y colas existentes; distinguir stopped/finished, proteger pausa y eventos atrasados. UI closed/open/minimized independiente del motor.
- Pruebas reales usan Node, Chromium por DevTools, Python y Pandoc. Audio simulado no prueba sonido real en dispositivos.
- Previsión aproximada: 900–1400 líneas de código/pruebas/documentación redactadas (generados excluidos), más citas de especificación. Una unidad coherente; se consultará la forma de revisión antes de crear commits si supera el presupuesto orientativo.
- Risk: item 4 (concurrencia de callbacks TTS). Verificación independiente requerida; RDD está on por configuración global. No confundir pruebas con revisión nativa.

### L3 — Política y ejecución delegada

- La búsqueda local no encontró CONTRIBUTING, plantillas PR ni .github/. Los registros odd/tasks/lector-educativo.md:382-384 documentan aprobación del issue #30 y una etiqueta type:feature para la entrega anterior, no una política general verificable. Se informará esa diferencia.
- T2 delegado a gentle-ai-worker, tarea mwdpfr8r-3-vfm1, en el worktree aislado. Superficies limitadas a UI/motor/estilos del lector, integración de Fluidos, pruebas pertinentes y documentación/evidencia visual de etapa 1. Extractor, matemáticas, contenido y teoria/lectura.js excluidos. Sin permiso de commits ni publicación para el worker.
- La copia completa de requisitos y el archivo fueron leídos antes del handoff. Worker debe observar RED antes de modificar comportamiento y ejecutar suites reales; no se da ninguna prueba por aprobada aún.

### L4 — Forma de revisión elegida

- Respuesta explícita mediante selector: «Cadena sobre una rama de funcionalidad — recomendada» (`feature-branch-chain`). Estrategia `auto-chain`; no concede permiso de publicación, PR ni merge.
- Límites tentativos: unidad motor/preferencias con sus pruebas, seguida de unidad interfaz compacta con sus pruebas, documentación y HTML generado si cambia. Se confirmarán con el diff real; ninguna división artificial para cumplir una cuenta.
- GitHub rulesets devolvió [] (exit 0). PR #31 ya está MERGED, base main, etiqueta única type:feature; confirma que origin/main incorpora el lector anterior. Una consulta auxiliar del árbol remoto falló por sintaxis jq (exit 1), sin modificar nada ni invalidar las comprobaciones locales de política.

### L5 — Resultado parcial del ejecutor y verificación

- Worker mwdpfr8r-3-vfm1 terminó partial; no hay hijos activos tras su resultado. Implementó UI y ajustes puntuales del motor. Fuente generada oficialmente sin diff. Contenido, plantilla, extractor, MathML y teoria/lectura.js sin cambios.
- Baseline: motor 15/15, UI tres grupos. RED real: motor exit 1 (es-419 y finished), UI exit 1 (barra inicial visible/Escuchar ausente); no hubo RED independiente por cada regla. No se inventará esa evidencia retroactivamente.
- GREEN declarado: generación y --check exit 0; Python Fluidos 32; motor 17; UI cinco grupos; extractor y MathML exit 0; diff --check exit 0. Falta comprobación directa del parent y verificación independiente.
- Dos fallas intermedias de scroll 1510 !== 1500 fueron corregidas interrumpiendo smooth scroll y midiendo en el mismo evento; prueba posterior pasó. El extremo absoluto no fue demostrado y sigue abierto, no aprobado.
- Capturas locales ignoradas: fluidos/verificacion-visual/lector-etapa1-{desktop,mobile,minimized,closed}.png. No son prueba de audio real.
- assess sobre diff, con escalado item 4, devuelve high y exige verificador independiente. El cálculo nativo no pudo evaluar archivos no seguidos sin declaración; no se infiere tier bajo ni aprobación. Se resolverá scope de revisión en inspect al preparar cada unidad.
- Preparación verificador confirmada: worktree 21 MB, 28 GB libres en disco y 3.6 GB libres en /tmp; Python 3.14.9, Node v26.13.0, Pandoc 3.11 y /usr/bin/chromium presentes. Payload selectivo, nunca copia recursiva de .worktrees/.git/.venv.

### L6 — Verificación independiente y decisión requerida

- Verificador mwdpwr0n-4-7s6f terminó blocked por F11, no por TTS. No queda hijo activo o incierto.
- En scratch aislado pasaron --check, Python 32, motor 17, UI cinco grupos, extractor 308/409 bloques, MathML, dos sondas independientes de eventos/cancelación/velocidad y diff --check, todos exit 0. Sin audio real verificado.
- F11 falló como contrato en el extremo absoluto: Chromium 1280×900, scrollY/máximo 42905→42844, padding 61→0 px y borde inferior del último artículo 353.984375→414.984375. Se reprodujo con barra completa, configuración y minimizado. Con cero reserva cerrada, el scroll fuera del nuevo rango no puede mantenerse sin cambiar geometría/contrato.
- Parent volvió a ejecutar motor 17/17 y generar.py --check exit 0; inspeccionó las cuatro capturas locales.
- Se solicita decisión humana: aceptar únicamente la limitación al nuevo máximo cuando no alcanza el rango del documento, o mantener F11 literal y dejar etapa parcial. No se aprobará silenciosamente ni se retendrá padding prohibido. No corresponde otra ronda completa de verificación.
- Scratch informado por verifier: /tmp/gpGhnBUy/gagE1bo6/tmp.pkjKhXX8KN (puede ser temporal; no se presupone retención). No hay commits, PR ni publicación.

### L7 — Decisión humana sobre F11

- Pregunta presentada: «¿Aceptás que, sólo al cerrar desde una posición superior al nuevo máximo posible, el navegador ajuste el scroll a ese máximo? En cualquier otra posición se conserva el scroll; cerrado no queda espacio reservado. Este ajuste de F11 quedaría documentado y probado, no presentado como igualdad exacta.»
- Respuesta: «Aceptar esa excepción de límite — recomendado» (`accept-scroll-clamp-at-new-maximum`).
- Se califican sólo S2 y F11 de S5 con esa excepción. No cambia ninguna otra exigencia ni autoriza etapas posteriores o publicación. Estado actual de motor/UI ya aplica esa conducta; se agregan pruebas de frontera y documentación, no una nueva implementación. No hay RED significativo nuevo para una especificación que acepta la conducta existente; no se fabrica evidencia retrospectiva.
- No hay hijos activos ni inciertos tras completarse writer y verifier. Siguiente acción: una corrección acotada de prueba/documentación y relectura/recheck dirigido del verificador, sin otra barrida general.
