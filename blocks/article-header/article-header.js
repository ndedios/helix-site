import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the article header
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const author = getMetadata('author');
  block.querySelector('picture').parentElement.classList.add('background-image');

  const articleInfo = document.createElement('div');
  articleInfo.classList.add('article-info');
  articleInfo.textContent = author;

  const articleInfoWrapper = document.createElement('div');
  articleInfoWrapper.classList.add('default-content-wrapper');
  articleInfoWrapper.append(articleInfo);
  block.append(articleInfoWrapper);
}