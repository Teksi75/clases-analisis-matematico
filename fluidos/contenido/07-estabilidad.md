## 7. Estabilidad de cuerpos sumergidos y flotantes {#cap-7}

Un cuerpo puede estar en equilibrio y, aun así, volcar al menor empujón. La hidrostática permite decidir si un equilibrio es **estable**, **inestable** o **indiferente** analizando dónde están dos puntos: el centro de gravedad del cuerpo y el centro de empuje.

### Los dos centros {#cap-7-centros}

- **Centro de gravedad ($G$):** el punto donde puede considerarse aplicado el peso del cuerpo.
- **Centro de empuje ($B$, o centro de carena):** el centro de gravedad del **fluido desplazado**, es decir, el punto donde puede considerarse aplicado el empuje.

Cuando el cuerpo está derecho y en equilibrio, $G$ y $B$ están sobre la misma vertical. Al inclinarlo un poco, la situación cambia y aparece un par de fuerzas: el peso hacia abajo en $G$ y el empuje hacia arriba en $B$. Según el sentido de ese par, el cuerpo vuelve a su posición o se aleja de ella.

### Cuerpo totalmente sumergido {#cap-7-sumergido}

Si el cuerpo está completamente sumergido, al inclinarlo el volumen desplazado no cambia y $B$ queda fijo respecto del cuerpo. El criterio depende solo de la posición relativa de los dos centros:

| Posición | Equilibrio | Qué pasa al inclinarlo |
|---|---|---|
| $G$ por **debajo** de $B$ | Estable | Aparece un par que lo devuelve a la vertical |
| $G$ **coincide** con $B$ | Indiferente | No aparece par restaurador ni desestabilizador |
| $G$ por **encima** de $B$ | Inestable | Aparece un par que aumenta la inclinación |

![Cuerpos totalmente sumergidos e inclinados: estable con G debajo de B, inestable con G encima de B e indiferente si coinciden. El peso actúa en G y el empuje en B.](graficos/estabilidad-sumergido.svg)

La figura supone $E=W$ para aislar la estabilidad de orientación: el cuerpo no tiene fuerza vertical neta. El criterio de orientación, por sí solo, no garantiza el equilibrio frente a una traslación vertical.

Este criterio explica por qué se lastra el fondo de un flotador o de un sumergible: bajar $G$ convierte un equilibrio inestable en estable sin cambiar el empuje.

::: {.aviso}
**No confundas los centros.** Una formulación habitual del apunte dice que el centro de gravedad debe estar «por debajo del fluido». Lo que se compara es el centro de gravedad del **cuerpo** con el **centro de empuje**, no con la superficie del líquido ni con el fondo. Un cuerpo puede tener $G$ bajo y, aun así, ser inestable si $B$ está todavía más bajo.
:::

### Cuerpos que flotan parcialmente {#cap-7-flotantes}

::: {.ampliacion}
Los apuntes no tratan la estabilidad de cuerpos que flotan parcialmente. En ellos, al inclinar el cuerpo cambia la forma del volumen sumergido y, con ella, la posición de $B$: el criterio de los dos centros ya no alcanza. Se usa el **metacentro ($M$)**.

- Si el cuerpo gira un ángulo pequeño, la nueva línea de acción del empuje corta al eje de simetría en $M$.
- El equilibrio es **estable** si $M$ está por encima de $G$.
- La distancia $GM$ se llama **altura metacéntrica**: cuanto mayor es, más difícil es volcar el cuerpo.

En cuerpos con simetría vertical,

$$GM=BM-BG,\qquad BM=\frac{I}{V},$$

donde $I$ es el momento de inercia del área de la **superficie de flotación** respecto del eje de giro y $V$ es el volumen sumergido. Una base ancha (gran $I$) estabiliza; un centro de gravedad alto (gran $BG$) desestabiliza.
:::

::: {.definicion}
**Regla para un cuerpo totalmente sumergido**
1. Compará la altura de $G$ con la de $B$: por debajo, equilibrio estable; coincidentes, indiferente; por encima, inestable.
2. Bajar el centro de gravedad mejora la estabilidad. Ensanchar la base **no** cambia este criterio: solo cuentan las posiciones de $G$ y $B$.
:::

### Para practicar {#cap-7-practicar}

- [Ejercicio 17](#ejercicio-17): clasificación de tres cuerpos sumergidos y un caso numérico de caja flotante.

Los capítulos anteriores aportan lo necesario: densidades en el [capítulo 2](#cap-2), flotación en el [capítulo 6](#cap-6).
