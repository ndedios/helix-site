import { getMetadata, fetchAuthors } from '../../scripts/aem.js';

function buildAutorBio(authors){
  const author = getMetadata('author');
  if (!author) return;
  const authorBio = authors[author];
  if (!authorBio) return;
  const container = document.createElement('div');
  container.classList.add('author-info');
  const image = document.createElement('img');
  image.classList.add('author-image');
  image.src = authorBio.image;
  container.append(image);
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