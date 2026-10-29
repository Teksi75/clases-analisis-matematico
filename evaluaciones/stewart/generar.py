#!/usr/bin/env python3
"""Regenera los exámenes locales con Pandoc y MathML nativo."""
import argparse
import difflib
from html import escape
from pathlib import Path
import re
from string import Template
import subprocess
import sys

HERE = Path(__file__).resolve().parent
PAGES = ('index', 'algebra', 'geometria', 'funciones', 'trigonometria')
INFO = {
    'index': ('Exámenes de diagnóstico de Stewart', 'Exámenes', 'Stewart', 'A — D'),
    'algebra': ('Examen de diagnóstico: Álgebra', 'Diagnóstico A', 'Álgebra', 'A'),
    'geometria': ('Examen de diagnóstico B: Geometría analítica', 'Diagnóstico B', 'Geometría', 'B'),
    'funciones': ('Examen de diagnóstico C: Funciones', 'Diagnóstico C', 'Funciones', 'C'),
    'trigonometria': ('Examen de diagnóstico D: Trigonometría', 'Diagnóstico D', 'Trigonometría', 'D'),
}


def render(name):
    args = ['pandoc', name + '.md', '--to=html5', '--mathml']
    if name == 'trigonometria':
        # Mantener los incisos literales (a), (b), no convertirlos en listas.
        args.append('--from=markdown-fancy_lists')
    body = subprocess.run(args, cwd=HERE, check=True, capture_output=True, text=True).stdout
    # Evitar landmarks main anidados sin cambiar el contenido del examen C.
    if name == 'funciones':
        body = body.replace('<main style=', '<div style=', 1).replace('</main>', '</div>', 1)
    title, first, second, edition = INFO[name]
    if name == 'index':
        navigation = '\n'.join(f'<a href="{page}.html">{escape(INFO[page][0])}</a>' for page in PAGES[1:])
        shortcut = ''
    else:
        # Índice a partir de los encabezados publicados, sin alterar su contenido.
        headings = re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', body, re.S)
        navigation = '\n'.join(f'<a href="#{identifier}">{label}</a>' for identifier, label in headings)
        shortcut = ('<a href="#respuestas-del-libro">Respuestas del libro</a>'
                    if any(identifier == 'respuestas-del-libro' for identifier, _ in headings) else '')
    template = Template((HERE / 'plantilla.html').read_text(encoding='utf-8'))
    return template.substitute(title=escape(title), hero_first=escape(first),
                               hero_second=escape(second), edition=escape(edition),
                               shortcut=shortcut, navigation=navigation, body=body,
                               disclosure='' if name == 'index' else ' open',
                               breadcrumb=('<span aria-current="page">Diagnósticos de Stewart</span>' if name == 'index'
                                           else '<a href="index.html">Diagnósticos de Stewart</a> <span aria-hidden="true">/</span> '
                                           + '<span aria-current="page">' + escape(title) + '</span>'),
                               motif=(HERE / 'motivos' / (name + '.svg')).read_text(encoding='utf-8'))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='comprobar sin modificar archivos')
    args = parser.parse_args()
    different = []
    for name in PAGES:
        page = HERE / (name + '.html')
        content = render(name)
        if args.check:
            previous = page.read_text(encoding='utf-8') if page.is_file() else ''
            if previous != content:
                different.append(page.name)
                print(''.join(difflib.unified_diff(previous.splitlines(keepends=True),
                                                   content.splitlines(keepends=True),
                                                   fromfile=page.name, tofile='generado')), file=sys.stderr)
        else:
            page.write_text(content, encoding='utf-8')
    if different:
        print('Desactualizados: ' + ', '.join(different), file=sys.stderr)
        return 1
    print('HTML comprobados' if args.check else 'HTML regenerados')
    return 0


if __name__ == '__main__':
    sys.exit(main())
