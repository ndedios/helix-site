import { getMetadata, fetchAuthors } from '../../scripts/aem.js';

function buildTagList(authors){
  const author = getMetadata('author');
  if (!author) return;
  const authorBio = authors[author];
  if (!authorBio) return;
  const container = document.createElement('div');
  return container;
}

/**
 * loads and decorates the tag cloud
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const authors = await fetchAuthors();
  block.append(buildAutorBio(authors));
}