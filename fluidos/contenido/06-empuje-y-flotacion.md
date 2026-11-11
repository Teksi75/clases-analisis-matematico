## 6. Empuje, peso aparente y flotación {#cap-6}

Un cuerpo sumergido parece pesar menos que fuera del líquido. La causa no es una pérdida de masa, sino una fuerza hacia arriba que ejerce el fluido: el **empuje**. Este capítulo explica de dónde viene, cuánto vale y cómo decide si un cuerpo flota.

### El origen del empuje {#cap-6-origen}

::: {.ampliacion}
Los apuntes enuncian el empuje, no su causa. La presión hidrostática aumenta con la profundidad: sobre un cuerpo sumergido, la cara inferior está más profunda que la superior, así que la presión sobre ella es mayor y el resultado de todas las fuerzas es una fuerza neta vertical **hacia arriba**. En un cuerpo sumergido y simétrico las fuerzas laterales se cancelan por pares y solo sobrevive la diferencia vertical.
:::

### Principio de Arquímedes {#cap-6-arquimedes}

> Todo cuerpo sumergido en un fluido experimenta un empuje hacia arriba igual al peso del fluido desalojado.

Para un fluido homogéneo:

$$E=\rho_{f}\,g\,V_{desplazado}=\gamma_{f}\,V_{desplazado}.$$

El volumen desplazado es el volumen de la parte del cuerpo que está dentro del fluido, no el volumen total del cuerpo. La línea de acción del empuje pasa por el **centro de empuje**, que es el centro de gravedad del fluido desplazado.

::: {.aviso}
**Dos confusiones habituales con el empuje.**
- El empuje **no depende del material del cuerpo**, solo del fluido y del volumen desplazado. Dos esferas del mismo tamaño, una de telgopor y una de plomo, sumergidas en agua reciben el mismo empuje; lo que cambia es su peso.
- El empuje es una **fuerza**, se mide en newton (o en kgf). Escribir $E=0{,}917\ \mathrm{kg}$ mezcla masa con fuerza: lo correcto es $E=0{,}917\ \mathrm{kgf}=8{,}99\ \mathrm{N}$.
:::

### Peso aparente {#cap-6-peso-aparente}

::: {.ampliacion}
El **peso aparente** figuraba en el temario del curso, pero la transcripción no lo desarrolla. Es lo que «parece pesar» un cuerpo sumergido que se sostiene con una fuerza vertical hacia arriba:

$$W_{ap}=W-E.$$

Es la lectura de una balanza o de un dinamómetro. Si $E>W$, el cuerpo asciende: la diferencia $E-W$ es la fuerza neta hacia arriba y el peso aparente resulta negativo, lo que indica que flota en lugar de hundirse.
:::

### Condiciones de flotación {#cap-6-flotacion}

Para un cuerpo que flota libremente, las únicas fuerzas verticales son el peso y el empuje, y el equilibrio exige

$$E=W.$$

Reemplazando cada uno:

$$\rho_{f}\,g\,V_{sumergido}=\rho_{c}\,g\,V_{total}\qquad\Longrightarrow\qquad\frac{V_{sumergido}}{V_{total}}=\frac{\rho_{c}}{\rho_{f}}.$$

De esa relación salen los tres casos posibles, con $\rho_c$ la densidad **media** del cuerpo (contando huecos y cavidades):

| Comparación | Comportamiento | Comentario |
|---|---|---|
| $\rho_c<\rho_f$ | Flota parcialmente | La fracción sumergida es $\rho_c/\rho_f$ |
| $\rho_c=\rho_f$ | Equilibrio neutro sumergido | Permanece donde se lo deje |
| $\rho_c>\rho_f$ | Se hunde | El empuje no alcanza a sostenerlo |

![Cubo de hielo flotando: la fracción sumergida depende del cociente de densidades.](../diagramas/10.svg)

Para el hielo en agua, $\rho_c/\rho_f=917/1000=0{,}917$: el 91,7 % del volumen queda bajo la superficie. Por eso solo se ve una pequeña parte del hielo flotante.

::: {.aviso}
**Flotar no es «pesar menos».** La masa del cuerpo no cambia al sumergirlo. Lo que cambia es la fuerza neta, porque el empuje compensa parte del peso. Y en un líquido distinto, la misma masa flota de otra manera: el cociente de densidades es distinto.
:::

### Tres cuerpos, tres resultados {#cap-6-tres-casos}

![Tres cuerpos sumergidos: uno flota, uno queda en equilibrio neutro y uno se hunde.](../diagramas/12.svg)

Los tres cuerpos de la figura se diferencian en su densidad media: el de menor densidad flota, el de densidad igual a la del líquido queda en equilibrio neutro y el de mayor densidad se hunde.

### Para practicar {#cap-6-practicar}

- [Ejercicio 14](#ejercicio-14): cubo de hielo flotante, fracción sumergida y empuje.
- [Ejercicio 15](#ejercicio-15): esfera de cobre en agua salada, peso, empuje y peso aparente.
- [Ejercicio 16](#ejercicio-16): cubo de igual densidad que el agua, equilibrio neutro.

El [ejercicio 17](#ejercicio-17) del capítulo siguiente usa estos resultados para analizar la estabilidad.
