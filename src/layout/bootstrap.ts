import '../styles/index.css';
import { renderHeader } from './header';
import { renderFooter } from './footer';
import type { PageId } from '../content/site';
import { $ } from '../utils/dom';

/**
 * Общий запуск для каждой страницы: шапка и подвал.
 * В HTML страницы должны быть <header id="site-header"> и <footer id="site-footer">.
 */
export function bootstrap(page: PageId): void {
  renderHeader($('#site-header'), page);
  renderFooter($('#site-footer'));
}
