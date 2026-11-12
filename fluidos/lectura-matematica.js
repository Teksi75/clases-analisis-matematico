// Las interpretaciones dependen del contexto de este cuaderno, no de letras sueltas.
// Las claves son anotaciones TeX completas de fluidos/index.html.
export const mathRules = [
  { tex: String.raw`\rho=m/V`, speech: 'La densidad es igual a la masa dividida por el volumen' },
  { tex: String.raw`p=\rho g h`, speech: 'La presión es igual a la densidad por la aceleración de la gravedad por la profundidad' },
  { tex: 'F=pA', speech: 'La fuerza es igual a la presión multiplicada por el área' },
  // Variantes de los tres ejemplos de introducción; no sustituyen letras aisladas.
  { tex: String.raw`\rho=\frac{m}{V}`, speech: 'La densidad es igual a la masa dividida por el volumen' },
  { tex: String.raw`P=\rho gh`, speech: 'La presión es igual a la densidad por la aceleración de la gravedad por la profundidad' },
  { tex: String.raw`F=P\cdot A`, speech: 'La fuerza es igual a la presión multiplicada por el área' },
  {
    tex: String.raw`\rho=\frac{m}{V}\qquad [\rho]=\frac{\mathrm{kg}}{\mathrm{m^3}}.`,
    speech: 'La densidad es igual a la masa dividida por el volumen; la unidad de densidad es kilogramos por metro cúbico',
  },
  {
    tex: String.raw`p_{man}=\rho g h.`,
    speech: 'La presión manométrica es igual a la densidad por la aceleración de la gravedad por la profundidad',
  },
  { tex: 'W=mg', speech: 'El peso es igual a la masa por la aceleración de la gravedad' },
  {
    tex: String.raw`\rho_r=\frac{\rho_{sustancia}}{\rho_{agua}}.`, scope: '#capitulo-02',
    speech: 'rho subíndice r igual a rho subíndice sustancia dividido por rho subíndice agua',
  },
  { tex: String.raw`\Delta p`, scope: '#capitulo-05', speech: 'Variación de presión' },
  // Columnas y mercurio: interpretaciones justificadas por el contexto de cada capítulo.
  { scope: '#capitulo-03', tex: String.raw`1\ \mathrm{mmHg}=133{,}322\ \mathrm{Pa}`, speech: '1 milímetro de mercurio igual a 133 coma 322 pascales' },
  {
    scope: '#capitulo-04', tex: String.raw`h_{Hg}=\frac{101\,325}{13\,600\times 9{,}80665}=0{,}7596\ \mathrm{m}\approx 760\ \mathrm{mmHg},`,
    speech: 'h subíndice mercurio igual a fracción, numerador 101 325, denominador 13 600 por 9 coma 80665, fin de fracción igual a 0 coma 7596 metros aproximadamente igual a 760 milímetros de mercurio',
  },
  { scope: '#capitulo-04', tex: String.raw`10{,}33\ \mathrm{mca}`, speech: '10 coma 33 metros de columna de agua' },
  { scope: '#capitulo-04', tex: String.raw`760\ \mathrm{mmHg}`, speech: '760 milímetros de mercurio' },
  {
    scope: '#capitulo-04', tex: String.raw`\frac{10\,330}{13\,600}=0{,}7596\ \mathrm{m}=759{,}6\ \mathrm{mm}\approx 760\ \mathrm{mmHg}.`,
    speech: 'fracción, numerador 10 330, denominador 13 600, fin de fracción igual a 0 coma 7596 metros igual a 759 coma 6 milímetros aproximadamente igual a 760 milímetros de mercurio',
  },
  { scope: '#capitulo-04', tex: String.raw`750\ \mathrm{mmHg}`, speech: '750 milímetros de mercurio' },
  { scope: '#capitulo-04', tex: String.raw`10\,330/1000=10{,}33\ \mathrm{mca}`, speech: '10 330 dividido por 1000 igual a 10 coma 33 metros de columna de agua' },
  { scope: '#capitulo-08', tex: String.raw`750\ \mathrm{mmHg}`, speech: '750 milímetros de mercurio' },
  { scope: '#capitulo-08', tex: String.raw`\rho_{Hg}=13\,600\ \mathrm{kg/m^3}`, speech: 'rho subíndice mercurio igual a 13 600 kilogramos por metro cúbico' },
  {
    scope: '#capitulo-08', tex: String.raw`h_{Hg}=\frac{101\,302{,}7}{13\,600\times 9{,}80665}=0{,}75956\ \mathrm{m}=759{,}56\ \mathrm{mmHg}.`,
    speech: 'h subíndice mercurio igual a fracción, numerador 101 302 coma 7, denominador 13 600 por 9 coma 80665, fin de fracción igual a 0 coma 75956 metros igual a 759 coma 56 milímetros de mercurio',
  },
  { scope: '#capitulo-08', tex: String.raw`759{,}56\ \mathrm{mmHg}`, speech: '759 coma 56 milímetros de mercurio' },
  { scope: '#capitulo-08', tex: String.raw`760\ \mathrm{mmHg}`, speech: '760 milímetros de mercurio' },
  {
    scope: '#capitulo-08', tex: String.raw`1\ \mathrm{atm}=101\,325\ \mathrm{Pa}=10\,332{,}3\ \mathrm{kgf/m^2}=10{,}33\ \mathrm{mca}=760\ \mathrm{mmHg}`,
    speech: '1 atmósfera igual a 101 325 pascales igual a 10 332 coma 3 kilogramos fuerza por metro cuadrado igual a 10 coma 33 metros de columna de agua igual a 760 milímetros de mercurio',
  },
  // Expresiones completas: los subíndices son rótulos de esta página, no productos.
  {
    scope: '#capitulo-02', tex: String.raw`\rho_{agua}=1000\ \mathrm{kg/m^3}\quad\Longrightarrow\quad \gamma_{agua}=9806{,}65\ \mathrm{N/m^3}=1000\ \mathrm{kgf/m^3}.`,
    speech: 'rho subíndice agua igual a 1000 kilogramos por metro cúbico, implica gamma subíndice agua igual a 9806 coma 65 newtons por metro cúbico igual a 1000 kilogramos fuerza por metro cúbico',
  },
  {
    scope: '#capitulo-02', tex: String.raw`\rho_{media}=\frac{m_1+m_2}{V_1+V_2}=\frac{\rho_1V_1+\rho_2V_2}{V_1+V_2}.`,
    speech: 'rho subíndice media igual a fracción, numerador m subíndice 1 más m subíndice 2, denominador V subíndice 1 más V subíndice 2, fin de fracción igual a fracción, numerador rho subíndice 1 por V subíndice 1 más rho subíndice 2 por V subíndice 2, denominador V subíndice 1 más V subíndice 2, fin de fracción',
  },
  {
    scope: '#capitulo-02', tex: String.raw`\rho=\frac{m}{V}\qquad \gamma=\rho g\qquad \rho_r=\frac{\rho}{\rho_{agua}}`,
    speech: 'rho igual a fracción, numerador m, denominador V, fin de fracción; gamma igual a rho por g; rho subíndice r igual a fracción, numerador rho, denominador rho subíndice agua, fin de fracción',
  },
  { scope: '#capitulo-04', tex: String.raw`p_{abs}=p_{man}+p_{atm}.`, speech: 'p subíndice abs igual a p subíndice man más p subíndice atm' },
  { scope: '#capitulo-04', tex: String.raw`p_{atm}=101\,325\ \mathrm{Pa}`, speech: 'p subíndice atm igual a 101 325 pascales' },
  {
    scope: '#capitulo-04', tex: String.raw`h_{agua}=\frac{101\,325}{1000\times 9{,}80665}=10{,}33\ \mathrm{mca}.`,
    speech: 'h subíndice agua igual a fracción, numerador 101 325, denominador 1000 por 9 coma 80665, fin de fracción igual a 10 coma 33 metros de columna de agua',
  },
  { scope: '#capitulo-04', tex: String.raw`\Delta p=\rho_m g\,\Delta h.`, speech: 'variación de p igual a rho subíndice m por g por variación de h' },
  { scope: '#capitulo-05', tex: String.raw`\rho g\,\Delta h`, speech: 'rho por g por variación de h' },
  {
    scope: '#capitulo-06', tex: String.raw`E=\rho_{f}\,g\,V_{desplazado}=\gamma_{f}\,V_{desplazado}.`,
    speech: 'E igual a rho subíndice f por g por V subíndice desplazado igual a gamma subíndice f por V subíndice desplazado',
  },
  {
    scope: '#capitulo-06', tex: String.raw`\rho_{f}\,g\,V_{sumergido}=\rho_{c}\,g\,V_{total}\qquad\Longrightarrow\qquad\frac{V_{sumergido}}{V_{total}}=\frac{\rho_{c}}{\rho_{f}}.`,
    speech: 'rho subíndice f por g por V subíndice sumergido igual a rho subíndice c por g por V subíndice total; implica fracción, numerador V subíndice sumergido, denominador V subíndice total, fin de fracción igual a fracción, numerador rho subíndice c, denominador rho subíndice f, fin de fracción',
  },
  { scope: '#capitulo-08', tex: String.raw`\rho_{aceite}=800\ \mathrm{kg/m^3}`, speech: 'rho subíndice aceite igual a 800 kilogramos por metro cúbico' },
  { scope: '#capitulo-08', tex: String.raw`\rho_{agua}=1000\ \mathrm{kg/m^3}`, speech: 'rho subíndice agua igual a 1000 kilogramos por metro cúbico' },
  {
    scope: '#capitulo-08', tex: String.raw`V=\pi r^2h=\pi(1)^2(4)=12{,}566371\ \mathrm{m^3}\qquad V_{cada\ uno}=6{,}283185\ \mathrm{m^3}.`,
    speech: 'V igual a pi por r al cuadrado por h igual a pi por 1 al cuadrado por 4 igual a 12 coma 566371 metros cúbicos; V subíndice cada uno igual a 6 coma 283185 metros cúbicos',
  },
  {
    scope: '#capitulo-08', tex: String.raw`\rho_{media}=\frac{800+1000}{2}=900\ \mathrm{kg/m^3}.`,
    speech: 'rho subíndice media igual a fracción, numerador 800 más 1000, denominador 2, fin de fracción igual a 900 kilogramos por metro cúbico',
  },
  {
    scope: '#capitulo-08', tex: String.raw`h_{agua}=\frac{101\,302{,}7}{1000\times 9{,}80665}=10{,}33\ \mathrm{mca}.`,
    speech: 'h subíndice agua igual a fracción, numerador 101 302 coma 7, denominador 1000 por 9 coma 80665, fin de fracción igual a 10 coma 33 metros de columna de agua',
  },
  {
    scope: '#capitulo-08', tex: String.raw`p_{interfaz}=800\times 1=800\ \mathrm{kgf/m^2}=7\,845{,}32\ \mathrm{Pa}.`,
    speech: 'p subíndice interfaz igual a 800 por 1 igual a 800 kilogramos fuerza por metro cuadrado igual a 7 845 coma 32 pascales',
  },
  {
    scope: '#capitulo-08', tex: String.raw`p_{fondo}=800\times 1+1000\times 1=1\,800\ \mathrm{kgf/m^2}=17\,651{,}97\ \mathrm{Pa}.`,
    speech: 'p subíndice fondo igual a 800 por 1 más 1000 por 1 igual a 1 800 kilogramos fuerza por metro cuadrado igual a 17 651 coma 97 pascales',
  },
  { scope: '#capitulo-08', tex: String.raw`\rho_{hielo}=917\ \mathrm{kg/m^3}`, speech: 'rho subíndice hielo igual a 917 kilogramos por metro cúbico' },
  {
    scope: '#capitulo-08', tex: String.raw`h_s=h\frac{\rho_{hielo}}{\rho_{agua}}=0{,}1\times\frac{917}{1000}=0{,}0917\ \mathrm{m},`,
    speech: 'h subíndice s igual a h por fracción, numerador rho subíndice hielo, denominador rho subíndice agua, fin de fracción igual a 0 coma 1 por fracción, numerador 917, denominador 1000, fin de fracción igual a 0 coma 0917 metros',
  },
  {
    scope: '#capitulo-08', tex: String.raw`h_{emergida}=0{,}1-0{,}0917=0{,}0083\ \mathrm{m}.`,
    speech: 'h subíndice emergida igual a 0 coma 1 menos 0 coma 0917 igual a 0 coma 0083 metros',
  },
  {
    scope: '#capitulo-08', tex: String.raw`E=\rho_{hielo}V g=917\times(0{,}1)^3\times 9{,}80665=8{,}9927\ \mathrm{N}.`,
    speech: 'E igual a rho subíndice hielo por V por g igual a 917 por 0 coma 1 al cubo por 9 coma 80665 igual a 8 coma 9927 newtons',
  },
];
