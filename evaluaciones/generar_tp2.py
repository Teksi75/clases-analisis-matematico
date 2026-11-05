#!/usr/bin/env python3
"""Generate the TP2 reading edition from tp2.md, using the theory design system.

Run from the repository root: python3 evaluaciones/generar_tp2.py
Requires Pandoc; reading the result needs neither Python nor a network connection.
Graph assets are lossless slices of the PDF's 2694x728 embedded image:
red x=0:1015, green x=1015:1705, blue x=1705:2694; all keep y=0:728.
"""
import argparse
from html import escape
from pathlib import Path
import re
import struct
import subprocess
from string import Template

HERE = Path(__file__).resolve().parent


def main():
    argparse.ArgumentParser(description=__doc__).parse_args()
    rendered = subprocess.run(
        ['/usr/bin/pandoc', str(HERE / 'tp2.md'), '--from=markdown+tex_math_dollars',
         '--to=html5', '--mathml', '--wrap=none', '--fail-if-warnings'],
        check=True, capture_output=True, text=True).stdout
    rendered = re.sub(r'<h1\b.*?</h1>\s*', '', rendered, count=1, flags=re.S)
    for div_id, table_id in [('tabla-roja', 'datos-roja'), ('tabla-verde', 'datos-verde'),
                             ('tabla-azul', 'datos-azul'), ('tabla-items-roja', 'items-roja'),
                             ('tabla-items-verde', 'items-verde'),
                             ('tabla-items-azul', 'items-azul')]:
        rendered = re.sub(f'(<div id="{div_id}">\\s*<table)\\b',
                          rf'\1 id="{table_id}"', rendered)
    rendered = re.sub(r'<table\b', '<div class="table-scroll" role="region" '
                      'aria-label="Datos de la resolución" tabindex="0"><table', rendered)
    rendered = rendered.replace('</table>', '</table></div>')
    rendered = rendered.replace('<figure>', '<figure class="study-figure">')

    def image_size(match):
        path = HERE / match[1]
        width, height = struct.unpack('>II', path.read_bytes()[16:24])
        return f'<img src="{match[1]}" width="{width}" height="{height}" loading="lazy"'

    rendered = re.sub(r'<img src="([^"]+)"', image_size, rendered)
    headings = list(re.finditer(r'<h2 id="([^"]+)">(.*?)</h2>', rendered))
    articles, navigation = [], []
    for index, heading in enumerate(headings):
        anchor, title = heading.groups()
        end = headings[index + 1].start() if index + 1 < len(headings) else len(rendered)
        content = rendered[heading.start():end]
        content = content.replace(f'<h2 id="{anchor}">', f'<h2 id="{anchor}-titulo">', 1)
        label = escape(re.sub('<[^>]+>', '', title))
        sublinks = ''.join(f'<a href="#{identifier}">{escape(re.sub("<[^>]+>", "", text))}</a>'
                           for identifier, text in re.findall(r'<h3 id="([^"]+)">(.*?)</h3>', content))
        navigation.append(
            f'<details class="index-chapter" data-chapter="{anchor}"'
            f'{" open" if index == 0 else ""}><summary>{label}</summary>'
            f'<a class="index-title" href="#{anchor}">Inicio de la sección</a>{sublinks}</details>')
        articles.append(f'<div class="chapter-label">TP2 / {index + 1:02d}</div>'
                        f'<article id="{anchor}" aria-labelledby="{anchor}-titulo">{content}</article>')
    intro = rendered[:headings[0].start()]
    template = Template((HERE / 'tp2-plantilla.html').read_text())
    (HERE / 'tp2.html').write_text(template.substitute(
        introduction=intro, navigation='\n'.join(navigation), chapters='\n'.join(articles)))
    print('Generated evaluaciones/tp2.html from evaluaciones/tp2.md')


if __name__ == '__main__':
    main()
