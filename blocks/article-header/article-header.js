import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the article header
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const author = getMetadata('author');
  const primarytopic = getMetadata('primarytopic');
  block.querySelector('picture').closest('div').classList.add('background-image');
  const heading = block.querySelector('h1');

  const articleInfo = document.createElement('div');
  articleInfo.classList.add('article-info');
  articleInfo.textContent = primarytopic;

  const articleData = document.createElement('div');
  articleData.classList.add('article-data');
  articleData.textContent = author;

  const articleInfoWrapper = document.createElement('div');
  articleInfoWrapper.classList.add('default-content-wrapper');
  articleInfoWrapper.append(articleInfo);
  articleInfoWrapper.append(heading);
  articleInfoWrapper.append(articleData);
  block.append(articleInfoWrapper);
}