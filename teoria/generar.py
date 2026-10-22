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
    html = pandoc(json.dumps(document), "--from=json", "--to=html5", "--mathml", "--wrap=none")
    html = re.sub(r"<table\b", '<div class="table-scroll" role="region" aria-label="Tabla de estudio" tabindex="0"><table', html)
    html = html.replace("</table>", "</table></div>")
    return html, "\n".join(navigation)


def main():
    chapters, navigation = [], []
    for number, (chapter, filename) in enumerate(CHAPTERS, 1):
        body, links = render(filename, chapter)
        title_id = re.search(r'<h2 id="([^"]+)"', body)[1]
        chapters.append(f'<div class="chapter-label" aria-hidden="true">{number:02d} / Apunte de teoría</div>\n'
                        f'<article id="{chapter}" aria-labelledby="{escape(title_id)}">\n{body}</article>')
        navigation.append(f'<div class="index-chapter"><a class="index-title" href="#{chapter}">'
                          f'{number:02d} / {chapter.capitalize().replace("Limites", "Límites")}</a>\n{links}</div>')
    context, _ = render("README.md", "indice")
    template = Template((HERE / "plantilla.html").read_text(encoding="utf-8"))
    (HERE / "index.html").write_text(template.substitute(
        chapters="\n".join(chapters), navigation="\n".join(navigation), context=context), encoding="utf-8")


if __name__ == "__main__":
    main()
