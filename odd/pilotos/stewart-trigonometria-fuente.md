# Cotejo de la fuente: Trigonometría de Stewart

- Fuente: `material/pdf/JAMES_STEWART_Sexta_edicion_Sexta_edicio.pdf`, página física 26, identificada visualmente como página impresa xxiv y «Examen de diagnóstico: Trigonometría».
- Se visualizó la página original mediante `pdftoppm` a 140 ppp y se cotejaron sus nueve consignas y la figura con `evaluaciones/stewart/trigonometria.md` y `trigonometria-assets/triangulo.svg`. La representación temporal se escribió únicamente en esta ruta permitida y se reemplazó por este registro; no se guardó una imagen derivada.
- Las nueve consignas de la fuente editable coinciden en datos, operaciones, signos, intervalos y pedidos con la página visualizada; no se encontró discrepancia en los enunciados. La figura original muestra el triángulo rectángulo con $b$ en la base, $a$ en el lado vertical derecho, hipotenusa $24$, ángulo recto abajo a la derecha y $\theta$ abajo a la izquierda. La figura local y su descripción en la entrada conservan esas relaciones.
- `pdftotext -layout` produce errores de extracción de símbolos: por ejemplo, representa $\pi$ como `p`, $\theta$ como `u`, el signo menos de 1(b) como un carácter de control y varios signos de igualdad, suma y desigualdad con caracteres ajenos. La comparación se resolvió por inspección visual del original, no copiando esos símbolos extraídos.
- La entrada común contiene solo enunciados y descripción de la figura, no desarrollos ni respuestas. Las consignas y la figura se separaron de la clave impresa en la misma página; no se incorporó esa clave al prompt.

Este cotejo prepara S1 y la entrada común necesaria para S3; no constituye propuestas, juicio ni verificación matemática de soluciones.
