# Verificación textual de etapa 3

El 13 de noviembre de 2026 se compararon expresiones reales de `fluidos/index.html` en Chromium, mediante `VERIFICACION_ETAPA3=1 node tests/lector-math.test.mjs`. La anotación identifica el MathML original; no se lee como LaTeX. La columna obtenida reproduce la salida `VERIFICACION_ETAPA3` de esa ejecución; sin esa variable la prueba no imprime el informe. Las expectativas están fijadas independientemente en la prueba; «Pasa» significa igualdad textual, no comprensión garantizada.

| Capítulo | Expresión original (anotación) | Locución esperada | Locución obtenida | Resultado |
| --- | --- | --- | --- | --- |
| 02 | `\rho_{agua}=1000\ \mathrm{kg/m^3}\quad\Longrightarrow\quad \gamma_{agua}=9806{,}65\ \mathrm{N/m^3}=1000\ \mathrm{kgf/m^3}.` | rho subíndice agua igual a 1000 kilogramos por metro cúbico, implica gamma subíndice agua igual a 9806 coma 65 newtons por metro cúbico igual a 1000 kilogramos fuerza por metro cúbico | rho subíndice agua igual a 1000 kilogramos por metro cúbico, implica gamma subíndice agua igual a 9806 coma 65 newtons por metro cúbico igual a 1000 kilogramos fuerza por metro cúbico | Pasa |
| 02 | `\rho_{media}=\frac{m_1+m_2}{V_1+V_2}=\frac{\rho_1V_1+\rho_2V_2}{V_1+V_2}.` | rho subíndice media igual a fracción, numerador m subíndice 1 más m subíndice 2, denominador V subíndice 1 más V subíndice 2, fin de fracción igual a fracción, numerador rho subíndice 1 por V subíndice 1 más rho subíndice 2 por V subíndice 2, denominador V subíndice 1 más V subíndice 2, fin de fracción | rho subíndice media igual a fracción, numerador m subíndice 1 más m subíndice 2, denominador V subíndice 1 más V subíndice 2, fin de fracción igual a fracción, numerador rho subíndice 1 por V subíndice 1 más rho subíndice 2 por V subíndice 2, denominador V subíndice 1 más V subíndice 2, fin de fracción | Pasa |
| 02 | `\rho=\frac{m}{V}\qquad \gamma=\rho g\qquad \rho_r=\frac{\rho}{\rho_{agua}}` | rho igual a fracción, numerador m, denominador V, fin de fracción; gamma igual a rho por g; rho subíndice r igual a fracción, numerador rho, denominador rho subíndice agua, fin de fracción | rho igual a fracción, numerador m, denominador V, fin de fracción; gamma igual a rho por g; rho subíndice r igual a fracción, numerador rho, denominador rho subíndice agua, fin de fracción | Pasa |
| 04 | `p_{abs}=p_{man}+p_{atm}.` | p subíndice abs igual a p subíndice man más p subíndice atm | p subíndice abs igual a p subíndice man más p subíndice atm | Pasa |
| 04 | `p_{atm}=101\,325\ \mathrm{Pa}` | p subíndice atm igual a 101 325 pascales | p subíndice atm igual a 101 325 pascales | Pasa |
| 04 | `h_{agua}=\frac{101\,325}{1000\times 9{,}80665}=10{,}33\ \mathrm{mca}.` | h subíndice agua igual a fracción, numerador 101 325, denominador 1000 por 9 coma 80665, fin de fracción igual a 10 coma 33 metros de columna de agua | h subíndice agua igual a fracción, numerador 101 325, denominador 1000 por 9 coma 80665, fin de fracción igual a 10 coma 33 metros de columna de agua | Pasa |
| 04 | `\Delta p=\rho_m g\,\Delta h.` | variación de p igual a rho subíndice m por g por variación de h | variación de p igual a rho subíndice m por g por variación de h | Pasa |
| 08, tabla de conversiones | `760\times 10^{-6}` | 760 por base 10, elevada a menos 6, fin de potencia | 760 por base 10, elevada a menos 6, fin de potencia | Pasa |
| 08, tabla de conversiones | `7{,}6\times 10^{-4}\ \mathrm{m^3}` | 7 coma 6 por base 10, elevada a menos 4, fin de potencia metros elevados a 3, fin de potencia | 7 coma 6 por base 10, elevada a menos 4, fin de potencia metros elevados a 3, fin de potencia | Pasa |
| 08, tabla de conversiones | `7\,453{,}05\ \mathrm{N/m^3}` | 7 453 coma 05 newtons dividido por metros elevados a 3, fin de potencia | 7 453 coma 05 newtons dividido por metros elevados a 3, fin de potencia | Pasa |
| 08, tabla de conversiones | `5\,400\,000\ \mathrm{L/h}` | 5 400 000 litros dividido por horas | 5 400 000 litros dividido por horas | Pasa |
| 08, tabla de conversiones | `0{,}1778\ \mathrm{m}` | 0 coma 1778 metros | 0 coma 1778 metros | Pasa |

Las raíces se prueban con MathML sintético en la prueba matemática; no se presentan como ejemplos reales del cuadernillo.

## Tablas reales

`node tests/lector-extractor.test.mjs` compara literalmente las introducciones y todas las filas siguientes con sus expectativas. Salidas obtenidas en Chromium:

**Estados de la materia, tabla sencilla:**

- Tabla de estudio. Encabezados: Estado; Cohesión frente a la agitación térmica; Forma; Volumen. Filas: 3.
- Fila 1 de 3. Estado: Sólido; Cohesión frente a la agitación térmica: Predomina la cohesión; Forma: Propia; Volumen: Propio.
- Fila 2 de 3. Estado: Líquido; Cohesión frente a la agitación térmica: Cohesión y agitación están balanceadas; Forma: Adopta la del recipiente; Volumen: Propio.
- Fila 3 de 3. Estado: Gas; Cohesión frente a la agitación térmica: Predomina la agitación térmica; Forma: Adopta la del recipiente; Volumen: Adopta el del recipiente.

**Conversiones, capítulo 08, tabla compleja** (con la resolución abierta):

- Tabla de estudio. Encabezados: Apartado; Cálculo; Resultado. Filas: 6.
- Fila 1 de 6. Apartado: a); Cálculo: 760 por 9 coma 80665; Resultado: 7 453 coma 05 newtons dividido por metros elevados a 3, fin de potencia.
- Fila 2 de 6. Apartado: b); Cálculo: 10 por 9 coma 80665; Resultado: 98 coma 07 newtons dividido por metros elevados a 3, fin de potencia.
- Fila 3 de 6. Apartado: c); Cálculo: 250 por 1000 por 9 coma 80665; Resultado: 2 451 662 coma 5 newtons.
- Fila 4 de 6. Apartado: d); Cálculo: 1 coma 5 por 1000 por 3600; Resultado: 5 400 000 litros dividido por horas.
- Fila 5 de 6. Apartado: e); Cálculo: 760 por base 10, elevada a menos 6, fin de potencia; Resultado: 7 coma 6 por base 10, elevada a menos 4, fin de potencia metros elevados a 3, fin de potencia.
- Fila 6 de 6. Apartado: f); Cálculo: 7 por 0 coma 0254; Resultado: 0 coma 1778 metros.

Estas comparaciones son textuales: no se probaron audio físico, Android ni comprensión universal por estudiantes. Tampoco prueban la exactitud de todas las expresiones o estructuras futuras.
