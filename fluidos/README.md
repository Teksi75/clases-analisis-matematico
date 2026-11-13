# Mecánica de los fluidos

Recurso de teoría y ejercicios para estudiar sin conexión. Se basa en `resultado/apuntes_corregidos.md`, `resultado/ejercicios_resueltos.md` y `revision/errores_detectados.md`. Se excluyen intencionalmente fotografías y datos personales. Los esquemas incluyen SVG reconstruidos de `diagramas/` y derivados didácticos en `fluidos/graficos/`, referenciados por ruta relativa: el material no contiene imágenes fotográficas.

## Procedencia de los gráficos didácticos

`graficos/presion-media.svg` es un derivado didáctico del esquema reconstruido `diagramas/02.svg`, que se conserva sin cambios. Sustituye la línea oblicua y el arco ambiguos por una vista lateral de una superficie de área A y una fuerza normal que apunta hacia ella. La profundidad no se representa; el área A corresponde a toda la superficie de contacto, no a la longitud dibujada. La flecha representa la fuerza normal total usada en la presión media, no una distribución puntual; la componente tangencial y el esfuerzo de corte se explican en el texto, sin representarlos como presión. No incorpora medidas numéricas del manuscrito.

## Lector de voz

Pulsá **🎧 Escuchar** en los controles de lectura y después **Reproducir**. Al abrir, se prepara el apartado visible o, si no se puede identificar, la posición guardada. Usá Anterior y Siguiente para recorrer fragmentos; en Configuración podés elegir capítulo, encabezado o punto de lectura, además de voz o detener. Activar un enlace del índice selecciona su destino: la lectura continúa si estaba reproduciendo y conserva la pausa o detención en otro caso. El scroll manual no interrumpe el audio y suspende el desplazamiento automático hasta pulsar **Seguir lectura**. «Fragmento … de …» indica el progreso por capítulo, no el tiempo de audio. La velocidad ofrece 0,8×, 1×, 1,2× y 1,5×. Minimizar conserva la reproducción y Cerrar lector la cancela. El lector no se abre ni reproduce al recargar; voz, velocidad y posición se guardan localmente cuando es posible. Al cambiar una resolución se conserva la posición cuando es segura; si desaparece el contenido activo, se prepara en pausa el encabezado legible más cercano. Si no se puede conservar la emisión, no se conoce el instante exacto dentro del fragmento actual. La disponibilidad de voces y la pausa dependen del navegador y dispositivo. La arquitectura, configuración, reglas matemáticas y pruebas están en [lectura/README.md](../lectura/README.md).

## Regenerar y comprobar

Desde la raíz del repositorio, con Pandoc 3.11, Python 3, Node 26 y `/usr/bin/chromium`:

```sh
python3 fluidos/generar.py
python3 fluidos/generar.py --check
python3 -B -m unittest discover -s tests -p 'test_fluidos_*.py' -v
node fluidos/comprobar_navegador.mjs
```

`tests/test_fluidos_html.py` comprueba la estructura generada (MathML, anclas, enlaces locales, impresión). `tests/test_fluidos_calculos.py` recalcula cada resultado publicado con las fórmulas del capítulo y verifica que el valor aparezca en el HTML; sus cifras coinciden con `revision/calculos.py`, la fuente de cálculo auditada del material original.

El navegador guarda capturas en `fluidos/verificacion-visual/<id>/`. `--check` compara el HTML completo sin modificarlo. Para probar fuentes alternativas sin tocar las definitivas, usar `--contenido DIRECTORIO` y, opcionalmente, `--salida ARCHIVO`; las rutas de recursos del contenido siguen relativas a `fluidos/`.

## Contrato del contenido

Los archivos `contenido/*.md` se procesan en orden de nombre. Cada `##` inicia un capítulo; `###` inicia una sección. No escribir títulos `#`: el título del documento está en la plantilla. Se conservan los identificadores explícitos de Pandoc, por ejemplo `### Título {#slug}` y `::: {.ejercicio #ejercicio-05}`. Los bloques `.aviso`, `.definicion`, `.ejercicio` y `.resolucion` usan divs cercados; la resolución se transforma en un `<details>` nativo. Cada ejercicio debe tener identificador.

Se admiten matemáticas `$...$` y `$$...$$` (MathML), figuras implícitas `![Descripción](graficos/presion-media.svg)`, tablas de barras, listas y enlaces locales. Las rutas son relativas a `fluidos/`, no al Markdown. No usar HTML crudo, scripts, fuentes externas ni URL remotas; todos los recursos locales deben existir.
