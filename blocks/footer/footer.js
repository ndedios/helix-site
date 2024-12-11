import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';


function buildLanugageSelector(footer) {
  const container = document.createElement('div');
  container.classList.add('filter');

  const button = document.createElement('a');
  button.classList.add('filter-button');
  button.id = `filter-button`;
  button.setAttribute('aria-haspopup', true);
  button.setAttribute('aria-expanded', false);
  button.setAttribute('role', 'button');
  button.textContent = 'English';
  button.addEventListener('click', toggleMenu);

  const dropdown = document.createElement('div');
  dropdown.classList.add('filter-dropdown');
  dropdown.setAttribute('aria-labelledby', `filter-button`);
  dropdown.setAttribute('role', 'menu');

  const languages = footer.querySelector('.footer-links ul');
  languages.parentElement.append(button);
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  buildLanugageSelector(footer);

  block.append(footer);
}
