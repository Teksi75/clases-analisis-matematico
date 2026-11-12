import { mountReader } from '../lectura/ui.js';
import { mathRules } from './lectura-matematica.js';

mountReader({
  root: document.querySelector('main#contenido'),
  contentSelector: ':scope > article',
  chapterSelector: 'article',
  chapterHeadingSelector: 'h1, h2',
  sectionHeadingSelector: 'h3, h4, h5, h6',
  excludeSelector: '.chapter-label',
  indexSelector: '.contents a[href^="#"]',
  mathRules,
  storageKey: 'lector-fluidos',
});
