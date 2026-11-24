# Método: radar de referencias

Banco de patrones visuales para adaptar a los trabajos de Pablo, con piloto en
`clases-computacion`. No es una lista de links lindos: es material destilado.

## Por qué existe

Una lista de bookmarks se pudre y no enseña nada. Lo que se reutiliza es el
**recurso** —la decisión concreta que hace funcionar un sitio— no la cáscara.
Cada ficha captura el recurso y su costo para poder adaptarlo sin copiar.

## Rúbrica: 6 ejes, 0 a 3

| Eje | Qué se pregunta |
| --- | --- |
| **J** Jerarquía | ¿Se entiende qué importa en 5 segundos? ¿Hay un foco único? |
| **T** Tipografía | ¿Escala, ritmo y contraste de pesos sostienen la lectura? |
| **C** Color y contraste | ¿Funciona en gris? ¿Aguanta AA sin el color como muleta? |
| **A** Aire / densidad | ¿La densidad es deliberada o es acumulación? |
| **M** Movimiento | ¿El motion comunica estado/ritmo, o decora? |
| **F** Afinidad al contenido | ¿Sirve para material de clases de computación? |

Puntajes orientativos, no una medida objetiva de belleza: 0 indica que el eje
perjudica el uso; 1, limitaciones importantes; 2, adecuado; 3, especialmente
logrado. `Sin evaluar` significa que falta evidencia. La ausencia deliberada de
movimiento puede obtener una puntuación alta si favorece la experiencia.

Solo se calcula un **total sobre 18** cuando se hayan evaluado los seis ejes;
se conserva cualquier referencia útil aunque su puntaje sea bajo o incompleto.
La adecuación a una clase concreta depende de su contenido y sus estudiantes.

Antes de considerar una referencia para implementación, se recomienda comprobar:

1. **Vista en gris:** observar si la jerarquía sigue siendo distinguible.
2. **Primera impresión en 5 segundos:** pedir a una persona que diga qué es y
   qué puede hacer. Una impresión propia no sustituye esa prueba.
3. **Contraste, teclado y movimiento reducido:** comprobarlos en la adaptación;
   no dar por cumplida la accesibilidad por una captura o una descripción.

Registrar cada prueba realizada, su alcance y resultado; si no se hizo, indicarlo.

## Formatos de ficha

Cada referencia del banco ocupa un bloque con estos campos:

- `URL`
- `Familia` — agrupación por problema, no por estética
- `Qué resuelve` — el problema concreto de contenido
- `Recurso` — la decisión que lo hace funcionar
- `Costo` — qué se pierde / qué exige
- `Puntaje` — J/T/C/A/M/F y total
- `Adaptable a` — dónde y cómo se usaría en un trabajo real
- `Evidencia` — fuente y alcance: sitio observado, descripción de terceros o
  captura; indicar las verificaciones que faltan.
- `Preferencia` — opinión y comentarios de Pablo, sin inferirlos por anticipado.

## Familias

1. **Editorial de lectura larga** — teoría, apuntes, material de lectura.
2. **Curso / plataforma educativa** — estructura de contenido y navegación.
3. **Experimental tipográfico** — audacia controlada, para portadas y heros.
4. **Datos y archivo** — tablas, índices, mapas de conocimiento.
5. **Documentación técnica** — apuntes de código, referencia consultable.

## Fuentes que se consultan

| Fuente potencial | Qué podría aportar | Ruido orientativo |
| --- | --- | --- |
| hoverstat.es | Descripción textual del recurso de cada sitio, fechada | Bajo |
| brutalist-garden | Archivo de sitios crudos/utilitarios, alto volumen | Medio |
| details.so | Filtros por categoría sobre sitios en producción | Bajo |
| godly.design | Motion e interacción (video) | Bajo |
| awwwards / vasari.design | Ambición de marca, créditos completos | Alto (premios) |
| siteinspire / land-book | Volumen editorial y comercial | Medio |
| devdojo / inspiration | Patrón técnico descrito en texto | Bajo |

Se priorizan sitios reales y casos de estudio; las plantillas se identifican
como tales y no se presentan como ejemplos de uso en producción.

## Protocolo de sesión

1. Brief subjetivo: qué es, para quién, y 3 adjetivos deseados.
2. Tanda de referencias con ficha y puntaje (8 a 12 por tanda).
3. Pablo elige 3 y descarta el resto. **El motivo del descarte se anota**: es
   la señal que corrige la búsqueda siguiente.
4. Destilación del patrón elegido a tokens y reglas concretas.
5. Recién ahí, artboards en `design/<slug>/` según la skill `gentle-design`.
6. Handoff a implementación real en el stack del proyecto.

## Estado

- Filtro activo: **audaz / experimental**.
- Piloto: `clases-computacion` (material didáctico HTML, lectura larga).
- Siguiente paso: completar el banco hasta 30-40 fichas y elegir la primera
  tanda de 3 para destilar.
