# Auditoría del extractor y MathML de fluidos

**Estado: corregidas las 21 expresiones antes señaladas y 15 ocurrencias adicionales de unidades de columna y subíndices de mercurio; exactitud oral general pendiente.** El recorrido automático no encontró narraciones vacías ni operadores o elementos desconocidos entre las expresiones elegibles con todos los detalles abiertos. Esto no es una revisión humana completa ni garantiza que cada narración sea fiel; no se validaron humanamente los 470 MathML.

## Aclaración de etapa 3 — 2026-11-13

Las mediciones documentadas a continuación son históricas. Se revirtió la lectura de tablas: el extractor vuelve a excluirlas junto con su contenido y usa el `alt` existente y significativo de las imágenes. El oráculo comprueba la ausencia de texto originado en tablas en todos los bloques. Los pares matemáticos y los límites de la verificación se registran en [VERIFICACION-ETAPA3.md](../lectura/VERIFICACION-ETAPA3.md); las pruebas no demuestran exactitud oral universal.

## Reproducir

Ejecutar `node tests/lector-math.test.mjs` y `node tests/lector-extractor.test.mjs` con Chromium instalado. La segunda prueba imprime `AUDIT`: inventario, conteos heurísticos y pares TeX/narración representativos. Trabaja sobre `fluidos/index.html`, abre temporalmente todos los `details` en el DOM de prueba y restaura su estado. Una prueba independiente marca nodos de texto de párrafos y encabezados para verificar orden y unicidad; también marca texto originado en tablas para comprobar que no aparezca en ningún bloque, sin confundir números iguales fuera de ellas.

| Medición | Detalles originales | Todos abiertos |
| --- | ---: | ---: |
| Bloques extraídos | 308 | 409 |
| Nodos de texto de párrafos/encabezados comprobados | 632 | 818 |
| MathML elegible | 199 | 332 |

En la medición histórica la página completa contenía 470 MathML: 138 estaban dentro de tablas entonces excluidas y 332 eran elegibles al abrir todos los detalles. No se narraba ninguno de los 138 de tabla. En los 332 elegibles, la inspección automática contabilizó cero narraciones vacías y cero mensajes de operador o elemento desconocido. La prueba verifica también los ocho capítulos, recuadros visibles, IDs únicos y su estabilidad al alternar detalles.

## Inventario de presentación elegible

Etiquetas: `semantics` y `annotation` 332 cada una; `mi` 1393, `mn` 894, `mo` 616, `mrow` 490, `mspace` 332, `msub` 188, `msup` 123, `mfrac` 47, `msubsup` 2, `munderover` 2 y `mtext` 1. Operadores (`mo`): `=` 284, coma 196, `×` 46, `+` 19, paréntesis de apertura y cierre 16 cada uno, `−` 14, `≈` 6, `⟂` 4, `⇒` 3, corchetes de apertura y cierre 3 cada uno, `∑` 2, `>` 2, `<` y `∘` 1 cada uno. Las unidades se presentan frecuentemente como letras `mi[mathvariant=normal]` separadas: el listado y frecuencias exactos se imprimen en `upright` por la prueba; entre las combinaciones observadas están kg, kgf, m, m³, N, Pa, s² y °C. La prueba matemática cubre unidades compuestas y conversión de °C.

## Pares revisados y pendientes

Los ejemplos se pueden localizar por la anotación `application/x-tex` completa de la página; las reglas explícitas están en `fluidos/lectura-matematica.js`.

- `\rho=\frac{m}{V}\qquad [\rho]=\frac{\mathrm{kg}}{\mathrm{m^3}}.` usa la regla explícita: «La densidad es igual a la masa dividida por el volumen; la unidad de densidad es kilogramos por metro cúbico».
- La potencia agrupada `(1\ \mathrm{m})^3` dentro de `V=\frac{4}{3}\pi r^3=...` se emite «base 1 por metros, elevada a 3, fin de potencia». La suma con límites de `p=p_0+\sum_{i=1}^{n}\rho_i g h_i=...` se emite «sumatoria desde i igual a 1 hasta n». El inventario no encontró integrales elegibles en esta página; se prueba una integral sintética con límites en `tests/lector-math.test.mjs`.
- `\rho_r=\frac{\rho_{sustancia}}{\rho_{agua}}.` y `\Delta p` en el capítulo 5 tienen reglas exactas y acotadas a su capítulo. `F_\perp=pA` ahora pronuncia «perpendicular», sin asignar significado físico a otras variables.
- Las 19 expresiones señaladas por subíndices textuales y las dos con Δ están enumeradas **con anotación completa, capítulo y narración esperada** en el arreglo `corrected` de `tests/lector-math.test.mjs`. La prueba busca cada anotación en su capítulo y compara todas sus ocurrencias con ese texto; las 21 reglas están acotadas por capítulo en `fluidos/lectura-matematica.js`. Por ejemplo, `\rho_{agua}=1000\ \mathrm{kg/m^3}\quad\Longrightarrow\quad \gamma_{agua}=9806{,}65\ \mathrm{N/m^3}=1000\ \mathrm{kgf/m^3}.` ahora dice «rho subíndice agua igual a 1000 kilogramos por metro cúbico, implica gamma subíndice agua igual a 9806 coma 65 newtons por metro cúbico igual a 1000 kilogramos fuerza por metro cúbico»; `\Delta p=\rho_m g\,\Delta h.` dice «variación de p igual a rho subíndice m por g por variación de h».
- Tras estas reglas, los patrones de subíndices de tres o más letras separadas por «por» y de «delta mayúscula por» detectan cero expresiones elegibles. Estos patrones no demuestran que no haya otros errores: anteriormente confundían la letra inicial de «variación» con un factor; ahora exigen el cierre `fin de subíndice` para la primera búsqueda.
## Columnas de agua y mercurio: identidades verificadas

El inventario `columnUnits` incluye ahora también cualquier subíndice MathML `Hg`, no solo `h_{Hg}`: son **17 ocurrencias elegibles** con todos los detalles abiertos. Dos son las fórmulas `h_{agua}` de las 21 anteriores; las otras **15 ocurrencias, 13 pares capítulo/anotación**, fueron corregidas con reglas completas acotadas al capítulo. La tabla muestra la narración completa y la cantidad por par; las pruebas comprueban cada ocurrencia y que el inventario coincida con estas identidades y las dos anteriores.

| Capítulo | Anotación TeX completa | Cantidad | Narración |
| --- | --- | ---: | --- |
| 03 | `1\ \mathrm{mmHg}=133{,}322\ \mathrm{Pa}` | 1 | 1 milímetro de mercurio igual a 133 coma 322 pascales |
| 04 | `h_{Hg}=\frac{101\,325}{13\,600\times 9{,}80665}=0{,}7596\ \mathrm{m}\approx 760\ \mathrm{mmHg},` | 1 | h subíndice mercurio igual a fracción, numerador 101 325, denominador 13 600 por 9 coma 80665, fin de fracción igual a 0 coma 7596 metros aproximadamente igual a 760 milímetros de mercurio |
| 04 | `10{,}33\ \mathrm{mca}` | 1 | 10 coma 33 metros de columna de agua |
| 04 | `760\ \mathrm{mmHg}` | 2 | 760 milímetros de mercurio |
| 04 | `\frac{10\,330}{13\,600}=0{,}7596\ \mathrm{m}=759{,}6\ \mathrm{mm}\approx 760\ \mathrm{mmHg}.` | 1 | fracción, numerador 10 330, denominador 13 600, fin de fracción igual a 0 coma 7596 metros igual a 759 coma 6 milímetros aproximadamente igual a 760 milímetros de mercurio |
| 04 | `750\ \mathrm{mmHg}` | 1 | 750 milímetros de mercurio |
| 04 | `10\,330/1000=10{,}33\ \mathrm{mca}` | 1 | 10 330 dividido por 1000 igual a 10 coma 33 metros de columna de agua |
| 08 | `750\ \mathrm{mmHg}` | 2 | 750 milímetros de mercurio |
| 08 | `\rho_{Hg}=13\,600\ \mathrm{kg/m^3}` | 1 | rho subíndice mercurio igual a 13 600 kilogramos por metro cúbico |
| 08 | `h_{Hg}=\frac{101\,302{,}7}{13\,600\times 9{,}80665}=0{,}75956\ \mathrm{m}=759{,}56\ \mathrm{mmHg}.` | 1 | h subíndice mercurio igual a fracción, numerador 101 302 coma 7, denominador 13 600 por 9 coma 80665, fin de fracción igual a 0 coma 75956 metros igual a 759 coma 56 milímetros de mercurio |
| 08 | `759{,}56\ \mathrm{mmHg}` | 1 | 759 coma 56 milímetros de mercurio |
| 08 | `760\ \mathrm{mmHg}` | 1 | 760 milímetros de mercurio |
| 08 | `1\ \mathrm{atm}=101\,325\ \mathrm{Pa}=10\,332{,}3\ \mathrm{kgf/m^2}=10{,}33\ \mathrm{mca}=760\ \mathrm{mmHg}` | 1 | 1 atmósfera igual a 101 325 pascales igual a 10 332 coma 3 kilogramos fuerza por metro cuadrado igual a 10 coma 33 metros de columna de agua igual a 760 milímetros de mercurio |

Las reglas no atribuyen significados físicos globales a letras ambiguas. Los conteos por patrón no sustituyen una revisión integral de correspondencia fuente-a-voz; otras estructuras contextuales aún podrían requerir excepciones.
