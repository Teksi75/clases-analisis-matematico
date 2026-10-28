#!/usr/bin/env python3
"""Regenera la edición de lectura sin modificar los apuntes Markdown."""
import json
import re
import subprocess
from html import escape
from pathlib import Path
from string import Template

HERE = Path(__file__).resolve().parent
CHAPTERS = [("funciones", "01-funciones.md"), ("limites", "02-limites.md")]
LINKS = {filename: "#" + chapter for chapter, filename in CHAPTERS}
LINKS["README.md"] = "#lectura"


def pandoc(text, *options):
    return subprocess.run(["/usr/bin/pandoc", *options], input=text, text=True,
                          capture_output=True, check=True).stdout


def figure(name, title, description, bounds, curves, points, ticks, xlabel='x', ylabel='y', extra=''):
    """Sample explicit mathematical branches; never join across an excluded point."""
    xmin, xmax, ymin, ymax = bounds

    def position(x, y):
        return 52 + (x-xmin)*340/(xmax-xmin), 225 - (y-ymin)*175/(ymax-ymin)

    def line(x1, y1, x2, y2, cls='axis'):
        a, b = position(x1, y1), position(x2, y2)
        return f'<path class="{cls}" d="M{a[0]:.3f},{a[1]:.3f}L{b[0]:.3f},{b[1]:.3f}"/>'

    parts = [f'<figure class="study-figure" data-generated="figure"><svg class="study-plot" id="{name}" '
             f'viewBox="0 0 440 290" role="img" aria-labelledby="{name}-title {name}-desc" '
             f'data-domain="{xmin} {xmax} {ymin} {ymax}">',
             f'<title id="{name}-title">{escape(title)}</title><desc id="{name}-desc">{escape(description)}</desc>',
             line(xmin, 0, xmax, 0), line(0, ymin, 0, ymax),
             f'<text x="52" y="25">{escape(ylabel)}</text>',
             f'<text x="392" y="280" text-anchor="end">{escape(xlabel)}</text>']
    for xs, function in curves:
        samples = [(x, function(x)) for x in xs]
        d = ''.join(f'{"M" if i == 0 else "L"}{position(x,y)[0]:.3f},{position(x,y)[1]:.3f}' for i, (x,y) in enumerate(samples))
        data = ' '.join(f'{x:.8f},{y:.8f}' for x,y in samples)
        parts.append(f'<path class="curve" data-samples="{data}" d="{d}"/>')
    for axis, value in ticks:
        x, y = position(value, 0) if axis == 'x' else position(0, value)
        parts.append(f'<text x="{x-8 if axis == "y" else x:.3f}" y="{y+20 if axis == "x" else y+4:.3f}" text-anchor="{"end" if axis == "y" else "middle"}">{value}</text>')
    for x, y, kind, dx, dy in points:
        px, py = position(x, y)
        parts.append(f'<circle class="point {kind}" data-point="{x},{y}" cx="{px:.3f}" cy="{py:.3f}" r="5"/>'
                     f'<text x="{px+dx:.3f}" y="{py+dy:.3f}">({x},{y})</text>')
    parts.extend([extra, '</svg>', f'<figcaption>{escape(title)}. {escape(description)}</figcaption></figure>'])
    return ''.join(parts)


def study_figures():
    def values(a, b, n=80):
        return [a + (b-a)*i/n for i in range(n+1)]

    return {
        'funciones-una-tabla-para-construir-el-gráfico': figure(
            'parabola', 'EVA1 · Solo el vuelo físico',
            'Dominio [0,90] m. Raíces en el suelo; vértice máximo a 15 m. Concavidad hacia abajo.',
            (0, 90, 0, 18), [(values(0,90), lambda x: -(x-45)**2/135+15)],
            [(0,0,'filled',4,-10), (90,0,'filled',-53,-10), (45,15,'filled',8,-10)],
            [('x',45),('y',15)], 'distancia x (m)', 'altura h(x) (m)'),
        'limites-el-valor-puntual-es-otra-pregunta': figure(
            'limite-punto', 'Límite 5 ≠ valor puntual 9',
            'g(x)=2x+1 si x ≠ 2; g(2)=9. Ambos lados se acercan al hueco (2,5), no al punto definido.',
            (0,4,0,10), [(values(0,2), lambda x: 2*x+1), (values(2,4), lambda x: 2*x+1)],
            [(2,5,'open',9,20),(2,9,'filled',9,-10)], [('x',2),('y',5),('y',9)],
            extra='<text x="65" y="190">izquierda →</text><text x="270" y="70">← derecha</text>'),
        'limites-tres-maneras-de-fallar': ''.join([
            figure('hueco', '01 / Hueco · límite 4',
                   '(x²−4)/(x−2) coincide con x+2 salvo en x=2. Falta el punto (2,4).',
                   (0,4,0,7), [(values(0,2), lambda x:x+2),(values(2,4), lambda x:x+2)],
                   [(2,4,'open',10,-10)], [('x',2),('y',4)]),
            figure('salto', '02 / Salto · laterales distintos',
                   'TP2: x+2 a la izquierda de 1; x² a la derecha. Lateral izquierdo 3, derecho 1; f(1)=3.',
                   (0,2,0,5), [(values(0,.99999),lambda x:x+2), (values(1.00001,2),lambda x:x*x)],
                   [(1,3,'filled',9,-10),(1,1,'open',9,-10)], [('x',1),('y',1),('y',3)]),
            figure('asintota', '03 / Infinita · asíntota vertical',
                   '1/(x−1): por izquierda → −∞; por derecha → +∞. La recta discontinua x = 1 no pertenece al gráfico.',
                   (-1,3,-5,5), [(values(-1,.8),lambda x:1/(x-1)),(values(1.2,3),lambda x:1/(x-1))],
                   [], [('x',-1),('x',1),('x',3),('y',-5),('y',5)],
                   extra='<path class="asymptote" d="M222,50L222,225"/><text x="232" y="43">x = 1</text>')])}


def decorate(document, figures):
    """Attach additions to stable headings and semantic block shapes, leaving source intact."""
    blocks, result = document['blocks'], []
    idea_sections = {'funciones-qué-hace-que-una-relación-sea-una-función',
                     'limites-acercarse-no-es-llegar'}
    warning_sections = {'limites-no-es-una-respuesta'}
    section, first = '', False
    key_formulas = {'funciones-modelo-de-eva1-la-altura-de-una-pelota',
                    'limites-límites-laterales-y-lectura-gráfica'}
    highlighted = set()
    for block in blocks:
        if block['t'] == 'Header':
            section = block['c'][1][0]
            first = True
        note = None
        if block['t'] == 'Para':
            inlines = block['c']
            lead = inlines[0] if inlines else {}
            if first and section in idea_sections:
                note = ('idea', 'Idea clave')
            elif first and section in warning_sections:
                note = ('advertencia', 'Error frecuente')
            elif lead.get('t') == 'Strong':
                words = ' '.join(item.get('c','') for item in lead['c'] if item['t'] == 'Str')
                if words.startswith(('Ejemplo original', 'Desarrollo docente')):
                    note = ('ejemplo', 'Ejemplo resuelto')
            first = False
        if note:
            kind, label = note
            result.append({'t':'RawBlock', 'c':['html', f'<div class="reading-note {kind}"><span class="note-label" data-generated="label">{label}</span>']})
        display = (block['t'] == 'Para' and len(block['c']) == 1
                   and block['c'][0]['t'] == 'Math'
                   and block['c'][0]['c'][0]['t'] == 'DisplayMath')
        formula = display and section in key_formulas and section not in highlighted
        rule = (block['t'] == 'OrderedList'
                and section == 'limites-continuidad-que-el-valor-acompañe-la-aproximación')
        if formula or rule:
            kind = 'key-formula' if formula else 'key-rule'
            result.append({'t': 'RawBlock', 'c': ['html', f'<div class="{kind}">']})
            highlighted.add(section)
        result.append(block)
        if formula or rule:
            result.append({'t': 'RawBlock', 'c': ['html', '</div>']})
        if note:
            result.append({'t':'RawBlock','c':['html','</div>']})
        if block['t'] == 'Header' and section in figures:
            result.append({'t':'RawBlock','c':['html',figures[section]]})
    document['blocks'] = result


def render(filename, prefix):
    source = (HERE / filename).read_text(encoding="utf-8")
    if filename == "README.md":
        source = source.split("## Edición y mantenimiento")[0]
    document = json.loads(pandoc(source, "--from=markdown", "--to=json"))
    navigation = []

    def visit(node):
        if isinstance(node, list):
            for child in node:
                visit(child)
        elif isinstance(node, dict):
            kind, content = node.get("t"), node.get("c")
            if kind == "Header":
                level, attrs, title = content
                attrs[0] = prefix + "-" + attrs[0]
                if level == 2:
                    label = pandoc(json.dumps({**document, "blocks": [node]}),
                                   "--from=json", "--to=plain", "--wrap=none").strip()
                    navigation.append(f'<a href="#{escape(attrs[0])}">{escape(label)}</a>')
                content[0] = min(level + 1, 6)
            elif kind == "Link":
                target = content[2][0]
                if target in LINKS:
                    content[2][0] = LINKS[target]
                elif target.startswith("#"):
                    content[2][0] = "#" + prefix + "-" + target[1:]
            for child in node.values():
                visit(child)

    visit(document["blocks"])
    if filename != 'README.md':
        decorate(document, study_figures())
    html = pandoc(json.dumps(document), "--from=json", "--to=html5", "--mathml", "--wrap=none")
    html = re.sub(r"<table\b", '<div class="table-scroll" role="region" aria-label="Tabla de estudio" tabindex="0"><table', html)
    html = html.replace("</table>", "</table></div>")
    return html, "\n".join(navigation)


def main():
    chapters, navigation = [], []
    for number, (chapter, filename) in enumerate(CHAPTERS, 1):
        body, links = render(filename, chapter)
        title_id = re.search(r'<h2 id="([^"]+)"', body)[1]
        next_chapter = 'limites' if chapter == 'funciones' else 'funciones'
        next_label = 'Continuar con Límites →' if chapter == 'funciones' else '← Volver a Funciones'
        ending = (f'<nav class="chapter-ending" data-generated="navigation" aria-label="Al terminar {chapter}">'
                  f'<a href="#{chapter}-resumen-conceptual">Repasar las ideas clave</a>'
                  f'<a href="#{next_chapter}">{next_label}</a></nav>')
        related = ('<aside class="related-diagnostics" data-generated="navigation" aria-label="Para practicar">'
                   '<a href="../evaluaciones/stewart/index.html">Diagnósticos de Stewart →</a></aside>')
        chapters.append(f'<div class="chapter-label" aria-hidden="true">{number:02d} / Apunte de teoría</div>\n'
                        f'<article id="{chapter}" aria-labelledby="{escape(title_id)}">\n{related}{body}{ending}</article>')
        navigation.append(f'<details class="index-chapter" data-chapter="{chapter}"'
                          f'{" open" if number == 1 else ""}><summary>'
                          f'{number:02d} / {chapter.capitalize().replace("Limites", "Límites")}</summary>'
                          f'<a class="index-title" href="#{chapter}">Inicio del capítulo</a>\n{links}</details>')
    context, _ = render("README.md", "indice")
    template = Template((HERE / "plantilla.html").read_text(encoding="utf-8"))
    (HERE / "index.html").write_text(template.substitute(
        chapters="\n".join(chapters), navigation="\n".join(navigation), context=context), encoding="utf-8")


if __name__ == "__main__":
    main()
