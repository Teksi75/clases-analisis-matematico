// Mejora progresiva: sin JavaScript quedan los detalles nativos cerrados.
for (const panel of document.querySelectorAll('[data-consulta-incisos]')) {
  const choices = [...panel.querySelectorAll(':scope > details[data-inciso]')];
  const selector = document.createElement('div');
  selector.className = 'consulta-selector';
  selector.setAttribute('role', 'group');
  selector.setAttribute('aria-label', 'Elegí un inciso');
  const prompt = document.createElement('p');
  prompt.className = 'consulta-prompt';
  prompt.textContent = 'Elegí un inciso para consultar su resolución.';

  const buttons = choices.map(choice => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = choice.dataset.inciso;
    button.setAttribute('aria-label', `Inciso ${choice.dataset.inciso}`);
    button.setAttribute('aria-controls', choice.id);
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      choices.forEach((item, index) => {
        const selected = item === choice;
        item.querySelector('details').open = false;
        item.open = selected;
        item.hidden = !selected;
        buttons[index].setAttribute('aria-pressed', String(selected));
      });
      prompt.hidden = true;
    });
    selector.append(button);
    choice.hidden = true;
    return button;
  });
  choices[0].before(selector, prompt);
  panel.classList.add('consulta-mejorada');
}
