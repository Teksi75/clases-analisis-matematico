# Verificación textual de etapa 3

Se compararon expresiones reales de `fluidos/index.html` en Chromium. Las primeras nueve salidas provienen de `VERIFICACION_ETAPA3=1 node tests/lector-math.test.mjs`; las tres últimas provienen de `columnUnits` en la salida `AUDIT` de `node tests/lector-extractor.test.mjs`, con expectativas verificadas por la prueba matemática. Todas están fuera de tablas y son elegibles para lectura cuando su contenido está visible, con las resoluciones abiertas cuando corresponde. La anotación identifica el MathML original; no se lee como LaTeX. «Pasa» significa igualdad textual, no comprensión garantizada.

| Capítulo | Expresión original (anotación) | Locución esperada | Locución obtenida | Resultado |
| --- | --- | --- | --- | --- |
| 02 | `\rho_{agua}=1000\ \mathrm{kg/m^3}\quad\Longrightarrow\quad \gamma_{agua}=9806{,}65\ \mathrm{N/m^3}=1000\ \mathrm{kgf/m^3}.` | rho subíndice agua igual a 1000 kilogramos por metro cúbico, implica gamma subíndice agua igual a 9806 coma 65 newtons por metro cúbico igual a 1000 kilogramos fuerza por metro cúbico | rho subíndice agua igual a 1000 kilogramos por metro cúbico, implica gamma subíndice agua igual a 9806 coma 65 newtons por metro cúbico igual a 1000 kilogramos fuerza por metro cúbico | Pasa |
| 02 | `\rho_{media}=\frac{m_1+m_2}{V_1+V_2}=\frac{\rho_1V_1+\rho_2V_2}{V_1+V_2}.` | rho subíndice media igual a fracción, numerador m subíndice 1 más m subíndice 2, denominador V subíndice 1 más V subíndice 2, fin de fracción igual a fracción, numerador rho subíndice 1 por V subíndice 1 más rho subíndice 2 por V subíndice 2, denominador V subíndice 1 más V subíndice 2, fin de fracción | rho subíndice media igual a fracción, numerador m subíndice 1 más m subíndice 2, denominador V subíndice 1 más V subíndice 2, fin de fracción igual a fracción, numerador rho subíndice 1 por V subíndice 1 más rho subíndice 2 por V subíndice 2, denominador V subíndice 1 más V subíndice 2, fin de fracción | Pasa |
| 02 | `\rho=\frac{m}{V}\qquad \gamma=\rho g\qquad \rho_r=\frac{\rho}{\rho_{agua}}` | rho igual a fracción, numerador m, denominador V, fin de fracción; gamma igual a rho por g; rho subíndice r igual a fracción, numerador rho, denominador rho subíndice agua, fin de fracción | rho igual a fracción, numerador m, denominador V, fin de fracción; gamma igual a rho por g; rho subíndice r igual a fracción, numerador rho, denominador rho subíndice agua, fin de fracción | Pasa |
| 04 | `p_{abs}=p_{man}+p_{atm}.` | p subíndice abs igual a p subíndice man más p subíndice atm | p subíndice abs igual a p subíndice man más p subíndice atm | Pasa |
| 04 | `p_{atm}=101\,325\ \mathrm{Pa}` | p subíndice atm igual a 101 325 pascales | p subíndice atm igual a 101 325 pascales | Pasa |
| 04 | `h_{agua}=\frac{101\,325}{1000\times 9{,}80665}=10{,}33\ \mathrm{mca}.` | h subíndice agua igual a fracción, numerador 101 325, denominador 1000 por 9 coma 80665, fin de fracción igual a 10 coma 33 metros de columna de agua | h subíndice agua igual a fracción, numerador 101 325, denominador 1000 por 9 coma 80665, fin de fracción igual a 10 coma 33 metros de columna de agua | Pasa |
| 04 | `\Delta p=\rho_m g\,\Delta h.` | variación de p igual a rho subíndice m por g por variación de h | variación de p igual a rho subíndice m por g por variación de h | Pasa |
| 05 | `\rho g\,\Delta h` | rho por g por variación de h | rho por g por variación de h | Pasa |
| 06 | `E=\rho_{f}\,g\,V_{desplazado}=\gamma_{f}\,V_{desplazado}.` | E igual a rho subíndice f por g por V subíndice desplazado igual a gamma subíndice f por V subíndice desplazado | E igual a rho subíndice f por g por V subíndice desplazado igual a gamma subíndice f por V subíndice desplazado | Pasa |
| 03 | `1\ \mathrm{mmHg}=133{,}322\ \mathrm{Pa}` | 1 milímetro de mercurio igual a 133 coma 322 pascales | 1 milímetro de mercurio igual a 133 coma 322 pascales | Pasa |
| 04 | `10{,}33\ \mathrm{mca}` | 10 coma 33 metros de columna de agua | 10 coma 33 metros de columna de agua | Pasa |
| 04 | `760\ \mathrm{mmHg}` | 760 milímetros de mercurio | 760 milímetros de mercurio | Pasa |

Las raíces se prueban con MathML sintético en la prueba matemática; no se presentan como ejemplos reales del cuadernillo.

## Tablas reales

Las tablas de estados de la materia y de conversiones del capítulo 08 están excluidas de la lectura; por tanto no se verifican para narración. Las fórmulas contenidas en tablas se conservan en la prueba matemática solo como cobertura del narrador aislado, no como contenido pronunciado por el lector. La prueba del extractor verifica que ningún texto originado en tablas aparezca en los bloques, con resoluciones abiertas y cerradas.

Estas comparaciones son textuales: no se probaron audio físico, Android ni comprensión universal por estudiantes. Tampoco prueban la exactitud de todas las expresiones o estructuras futuras.
