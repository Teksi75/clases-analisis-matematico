#!/usr/bin/env python3
"""Generar el material de fluidos sin conexión con Pandoc."""
import argparse
from html import escape, unescape
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import sys
from string import Template
from urllib.parse import unquote, urlsplit

HERE = Path(__file__).resolve().parent


def solutions(html):
    # Track nested divs so a solution closes at its own matching tag.
    stack = []
    def replace(match):
        tag = match.group()
        if tag.startswith('</'):
            return '</details>' if stack.pop() else tag
        is_solution = bool(re.search(r'\bclass="[^"]*\bresolucion\b', tag))
        stack.append(is_solution)
        return ('<details' + tag[4:] + '<summary>Ver resolución</summary>') if is_solution else tag
    return re.sub(r'<div\b[^>]*>|</div>', replace, html)


def text(html):
    return escape(unescape(re.sub(r'<[^>]*>', '', html)))


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for key in ('href', 'src'):
            if key in attrs:
                self.links.append(attrs[key])


def validate(html):
    page = Links()
    page.feed(html)
    if len(page.ids) != len(set(page.ids)):
        raise ValueError('Identificadores duplicados en el documento')
    for link in page.links:
        parts = urlsplit(link)
        if parts.scheme or parts.netloc:
            raise ValueError(f'Enlace no local: {link}')
        if parts.path and not (HERE / unquote(parts.path)).exists():
            raise ValueError(f'Recurso local inexistente: {link}')
        if not parts.path and parts.fragment and unquote(parts.fragment) not in page.ids:
            raise ValueError(f'Ancla inexistente: {link}')


def build(source):
    files = sorted(source.glob('*.md'))
    if not files:
        raise ValueError(f'No hay archivos Markdown en {source}')
    markdown = '\n\n'.join(path.read_text(encoding='utf-8') for path in files)
    result = subprocess.run(['pandoc', '--from=markdown+tex_math_dollars-raw_html', '--to=html5',
                             '--mathml', '--wrap=none', '--fail-if-warnings'],
                            input=markdown, text=True, capture_output=True, check=True)
    html = solutions(result.stdout)
    html = re.sub(r'<table\b', '<div class="table-scroll" role="region" aria-label="Tabla de estudio" tabindex="0"><table', html)
    html = html.replace('</table>', '</table></div>')
    headings = list(re.finditer(r'<h2\b[^>]*\bid="([^"]+)"[^>]*>(.*?)</h2>', html, re.S))
    if not headings or html[:headings[0].start()].strip():
        raise ValueError('El contenido debe comenzar con un título de capítulo de nivel 2')
    articles, toc = [], []
    for index, heading in enumerate(headings):
        chapter = f'capitulo-{index + 1:02d}'
        anchor, title = heading.groups()
        end = headings[index + 1].start() if index + 1 < len(headings) else len(html)
        content = html[heading.start():end]
        sublinks = ''.join(f'<a href="#{ident}">{text(label)}</a>' for ident, label in
                           re.findall(r'<h3\b[^>]*\bid="([^"]+)"[^>]*>(.*?)</h3>', content, re.S))
        toc.append(f'<details class="index-chapter" data-chapter="{chapter}"'
                   f'{" open" if index == 0 else ""}><summary>{text(title)}</summary>'
                   f'<a class="index-title" href="#{anchor}">Inicio del capítulo</a>{sublinks}</details>')
        articles.append(f'<div class="chapter-label" aria-hidden="true">{index + 1:02d} / Apunte de teoría</div>'
                        f'<article id="{chapter}" aria-labelledby="{anchor}">{content}</article>')
    template = Template((HERE / 'plantilla.html').read_text(encoding='utf-8'))
    page = template.substitute(title='Mecánica de los fluidos', navigation='\n'.join(toc),
                               chapters='\n'.join(articles))
    validate(page)
    return page


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--contenido', type=Path, default=HERE / 'contenido', help='directorio de fuentes Markdown')
    parser.add_argument('--salida', type=Path, default=HERE / 'index.html', help='archivo HTML de salida')
    parser.add_argument('--check', action='store_true', help='comprobar que el HTML esté actualizado sin escribir')
    args = parser.parse_args()
    try:
        page = build(args.contenido)
        if args.check:
            if not args.salida.exists() or args.salida.read_text(encoding='utf-8') != page:
                raise ValueError(f'HTML desactualizado o inexistente: {args.salida}')
            print('HTML actualizado')
        else:
            args.salida.write_text(page, encoding='utf-8')
            print(f'HTML generado: {args.salida}')
    except (OSError, ValueError, subprocess.CalledProcessError) as error:
        print(f'Error: {getattr(error, "stderr", None) or error}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
