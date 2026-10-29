# Piloto de Álgebra: propuestas y evaluación

Ejercicio 1, incisos (a)–(f). Propuestas generadas independientemente; el juez recibió las respuestas sin nombres de modelo. La propuesta A era MiMo y la B DeepSeek. El dictamen no sustituye la verificación matemática ni la revisión docente.

## Propuesta A — opencode-go/mimo-v2.6-pro

```markdown
<details>
<summary><strong>(a)</strong> $(-3)^4$</summary>

**Breve:** $(-3)^4 = 81$. Concepto clave: los paréntesis hacen que la base sea $-3$ completa, y un exponente par siempre da resultado positivo.

<details>
<summary><strong>Paso a paso</strong></summary>

Por definición de potencia natural:

$$(-3)^4 = (-3)\cdot(-3)\cdot(-3)\cdot(-3)$$

Agrupando de a dos:

$$(-3)\cdot(-3) = 9 \qquad \text{luego} \qquad 9\cdot 9 = 81$$

Regla del signo: con exponente par la cantidad de factores negativos es par, así que el resultado es positivo.

**Ojo:** muchos escriben $(-3)^4 = -81$. El signo del resultado depende del exponente: par $\Rightarrow$ positivo.

</details>
</details>

<details>
<summary><strong>(b)</strong> $-3^4$</summary>

**Breve:** $-3^4 = -81$. Concepto clave: sin paréntesis, el exponente afecta solo al $3$; el signo menos queda afuera de la potencia.

<details>
<summary><strong>Paso a paso</strong></summary>

La notación $-3^4$ significa lo mismo que $-(3^4)$: primero se calcula la potencia y después se le antepone el signo menos.

$$3^4 = 3\cdot 3\cdot 3\cdot 3 = 81$$

Entonces:

$$-3^4 = -(81) = -81$$

**Error frecuente:** confundirlo con el inciso anterior. $-3^4 \neq (-3)^4$: acá la base es $3$, no $-3$. La diferencia entre ambos es el paréntesis.

</details>
</details>

<details>
<summary><strong>(c)</strong> $3^{-4}$</summary>

**Breve:** $3^{-4} = \dfrac{1}{81}$. Concepto clave: un exponente negativo no cambia el signo del resultado, indica el recíproco: $a^{-n} = \dfrac{1}{a^n}$.

<details>
<summary><strong>Paso a paso</strong></summary>

Aplicamos la regla de exponente negativo:

$$3^{-4} = \frac{1}{3^4}$$

Y calculamos el denominador:

$$3^4 = 3\cdot 3\cdot 3\cdot 3 = 81$$

Por lo tanto:

$$3^{-4} = \frac{1}{81}$$

**Error frecuente:** creer que el $-4$ deja el resultado negativo. El signo negativo está en el exponente, y lo único que hace es invertir la potencia.

</details>
</details>

<details>
<summary><strong>(d)</strong> $\dfrac{5^{23}}{5^{21}}$</summary>

**Breve:** $\dfrac{5^{23}}{5^{21}} = 5^2 = 25$. Concepto clave: al dividir potencias de igual base se restan los exponentes: $\dfrac{a^m}{a^n} = a^{m-n}$.

<details>
<summary><strong>Paso a paso</strong></summary>

Aplicamos la ley de cociente:

$$\frac{5^{23}}{5^{21}} = 5^{23-21} = 5^2$$

Y evaluamos:

$$5^2 = 5\cdot 5 = 25$$

También se puede ver sin fórmula: $5^{23} = 5^{21}\cdot 5^2$, así que al dividir por $5^{21}$ se cancela y queda solo $5^2$.

</details>
</details>

<details>
<summary><strong>(e)</strong> $\left(\dfrac{2}{3}\right)^{-2}$</summary>

**Breve:** $\left(\dfrac{2}{3}\right)^{-2} = \left(\dfrac{3}{2}\right)^2 = \dfrac{9}{4}$. Concepto clave: el exponente negativo invierte la fracción, y luego la potencia se aplica al numerador y al denominador.

<details>
<summary><strong>Paso a paso</strong></summary>

Primer paso: exponente negativo $\Rightarrow$ recíproco de la fracción:

$$\left(\frac{2}{3}\right)^{-2} = \left(\frac{3}{2}\right)^{2}$$

Segundo paso: la potencia de una fracción se aplica arriba y abajo:

$$\left(\frac{3}{2}\right)^{2} = \frac{3^2}{2^2} = \frac{9}{4}$$

**Error frecuente:** hacer $\dfrac{3^{-2}}{2^{-2}}$ y dejar mal ubicados los signos. Conviene invertir primero la fracción y después potenciar con exponente positivo.

</details>
</details>

<details>
<summary><strong>(f)</strong> $16^{-3/4}$</summary>

**Breve:** $16^{-3/4} = \dfrac{1}{8}$. Concepto clave: en un exponente fraccionario $\dfrac{p}{q}$, el denominador $q$ indica la raíz y el numerador $p$ la potencia; el signo negativo da el recíproco.

<details>
<summary><strong>Paso a paso</strong></summary>

Primero nos sacamos el exponente negativo de encima:

$$16^{-3/4} = \frac{1}{16^{3/4}}$$

Ahora el exponente $\dfrac{3}{4}$: el $4$ es la raíz y el $3$ la potencia. Conviene tomar la raíz primero:

$$16^{3/4} = \left(\sqrt[4]{16}\right)^3$$

Buscamos la cuarta raíz de $16$: como $2^4 = 16$, entonces $\sqrt[4]{16} = 2$.

$$\left(\sqrt[4]{16}\right)^3 = 2^3 = 8$$

Finalmente:

$$16^{-3/4} = \frac{1}{8}$$

</details>
</details>

```

## Propuesta B — opencode-go/deepseek-v4.1-flash

```markdown
<details>
<summary><strong>(a)</strong> $(-3)^4$ — <em>Breve</em></summary>

**Breve:** $81$. La base negativa está entre paréntesis y el exponente es par, así que el resultado es positivo.

<details>
<summary>Paso a paso</summary>

$(-3)^4=(-3)\cdot(-3)\cdot(-3)\cdot(-3)$.

Hay cuatro factores negativos. Al multiplicarlos de a pares: $(-3)\cdot(-3)=9$, y después $9\cdot9=81$.

</details>
</details>

<details>
<summary><strong>(b)</strong> $-3^4$ — <em>Breve</em></summary>

**Breve:** $-81$. El exponente afecta solo al $3$; el signo menos queda afuera y se aplica al final.

<details>
<summary>Paso a paso</summary>

Primero se calcula la potencia: $3^4=3\cdot3\cdot3\cdot3=81$.

Después se aplica el signo menos que está adelante: $-3^4=-(3^4)=-81$.

Ojo: $(-3)^4$ daría $81$; acá no hay paréntesis que metan al signo menos dentro de la potencia.

</details>
</details>

<details>
<summary><strong>(c)</strong> $3^{-4}$ — <em>Breve</em></summary>

**Breve:** $\frac{1}{81}$. Un exponente negativo invierte la potencia: $3^{-4}$ es $\frac{1}{3^4}$.

<details>
<summary>Paso a paso</summary>

$3^4=3\cdot3\cdot3\cdot3=81$.

Entonces $3^{-4}=\frac{1}{3^4}=\frac{1}{81}$.

El signo menos del exponente no vuelve negativo al resultado: solo invierte la potencia.

</details>
</details>

<details>
<summary><strong>(d)</strong> $\frac{5^{23}}{5^{21}}$ — <em>Breve</em></summary>

**Breve:** $25$. Al dividir potencias de la misma base, se restan los exponentes.

<details>
<summary>Paso a paso</summary>

$\frac{5^{23}}{5^{21}}=5^{23-21}=5^2$.

Y $5^2=5\cdot5=25$.

También se puede ver como cancelar $21$ factores de $5$: quedan $5\cdot5=25$.

</details>
</details>

<details>
<summary><strong>(e)</strong> $\left(\frac{2}{3}\right)^{-2}$ — <em>Breve</em></summary>

**Breve:** $\frac{9}{4}$. El exponente negativo da vuelta la fracción y después se eleva al cuadrado positivo.

<details>
<summary>Paso a paso</summary>

$\left(\frac{2}{3}\right)^{-2}=\left(\frac{3}{2}\right)^2$.

Después: $\left(\frac{3}{2}\right)^2=\frac{3^2}{2^2}=\frac{9}{4}$.

El menos del exponente no deja el resultado negativo: solo invierte la fracción.

</details>
</details>

<details>
<summary><strong>(f)</strong> $16^{-3/4}$ — <em>Breve</em></summary>

**Breve:** $\frac{1}{8}$. El exponente $-3/4$ combina raíz cuarta y cubo; el signo negativo invierte el resultado.

<details>
<summary>Paso a paso</summary>

$16^{-3/4}=\frac{1}{16^{3/4}}$.

Como $16=2^4$, entonces $16^{3/4}=(2^4)^{3/4}=2^{4\cdot\frac{3}{4}}=2^3=8$.

Por lo tanto, $16^{-3/4}=\frac{1}{8}$.

</details>
</details>

```

## Dictamen — openai/gpt-6.1-sol

**Los seis resultados son correctos en ambas propuestas**, pero hay diferencias en la precisión de las explicaciones. No hace falta agregar pasos por agregarlos: para este nivel, ambas suelen desarrollar lo suficiente.

### Evaluación por inciso

| Inciso | Elección | Justificación |
|---|---|---|
| **(a)** \((-3)^4=81\) | **B** | Explica correctamente la base negativa y la paridad, con pasos suficientes. A generaliza indebidamente: «un exponente par siempre da resultado positivo» falla para base cero. Además, «el signo del resultado depende del exponente» necesita limitarse a una base negativa y exponentes enteros. B evita esas imprecisiones. |
| **(b)** \(-3^4=-81\) | **Empate** | Ambas explican correctamente la prioridad de la potencia y distinguen \(-3^4\) de \((-3)^4\). Los pasos son suficientes; B es algo más breve, pero A no resulta excesiva. |
| **(c)** \(3^{-4}=\frac1{81}\) | **B** | Ambas explican bien el recíproco. B lo presenta directamente con la base concreta, sin perder claridad. A enuncia \(a^{-n}=1/a^n\) sin exigir \(a\ne0\): es una omisión relevante en una regla general, aunque no afecta este cálculo. |
| **(d)** \(\frac{5^{23}}{5^{21}}=25\) | **Empate** | Ambas justifican correctamente la resta de exponentes y ofrecen una interpretación por cancelación. Ninguna necesita más pasos. Las dos deben precisar que la regla general requiere base no nula. |
| **(e)** \((\frac23)^{-2}=\frac94\) | **B** | B es correcta, breve y suficiente. A agrega una advertencia confusa: presenta \(\frac{3^{-2}}{2^{-2}}\) como un error sin explicar que allí se **invirtió la fracción y además se conservó el exponente negativo**. Distribuir el exponente negativo sí es válido: \(\frac{2^{-2}}{3^{-2}}=\frac94\). |
| **(f)** \(16^{-3/4}=\frac18\) | **Empate** | A hace explícita la raíz cuarta; B aprovecha \(16=2^4\) y llega correctamente al resultado con menos texto. Ambos recorridos son claros y suficientes. La regla general de A sobre exponentes fraccionarios necesita condiciones de validez; el cálculo concreto de ambas es correcto. |

### Afirmaciones que requieren atención

- **A, (a):** reemplazar «un exponente par siempre da resultado positivo» por: **«Una base real no nula elevada a un exponente entero par da un resultado positivo»**. Para este ejercicio basta decir: «Como la base es negativa y el exponente es par, el resultado es positivo».
- **A, (c):** agregar **\(a\ne0\)** a la regla del exponente negativo. «No cambia el signo» es correcto al comparar una potencia real no nula con su recíproco; no debe entenderse como que toda potencia con exponente negativo es positiva.
- **A y B, (d):** agregar **«con base distinta de cero»** a la regla del cociente.
- **A, (e):** la advertencia no contiene una igualdad falsa, pero es pedagógicamente engañosa por no identificar la doble inversión. Conviene eliminarla o sustituirla por: **«Si invertís la fracción, también debés cambiar el exponente a positivo»**.
- **A, (f):** la explicación general no debe sugerir que la traducción entre exponentes racionales y raíces funciona sin restricciones para cualquier base real. Una formulación suficiente es: **«Para \(a>0\), \(p\) entero y \(q\) entero positivo, \(a^{p/q}=(\sqrt[q]{a})^p\)»**. No hace falta desarrollar los casos de bases negativas.

### Correcciones obligatorias antes de usar los ganadores

- **(a), B:** ninguna.
- **(b), A o B:** ninguna.
- **(c), B:** ninguna; las afirmaciones están contextualizadas en la base positiva \(3\).
- **(d), A o B:** explicitar **base no nula** en la regla general.
- **(e), B:** ninguna.
- **(f), B:** ninguna. **Si se usa A**, acotar su regla general a bases positivas, o explicar únicamente el caso concreto de \(16\).

**Balance:** B ofrece una mejor combinación global de brevedad y precisión. A no falla en los resultados, pero incorpora generalizaciones y una advertencia que requieren revisión.
