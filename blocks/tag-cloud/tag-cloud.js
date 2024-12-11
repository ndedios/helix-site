import { getMetadata, fetchPlaceholders, fetchTags } from '../../scripts/aem.js';

function buildTagList(placeholders, tags){
  const taglist = getMetadata('article:tag');
  if (!taglist) return;
  const container = document.createElement('div');
  taglist.split(',').forEach((tag) => {
    const tagName = tags[tag.trim()] ? tags[tag.trim()] : tag.trim();
    const button = document.createElement('button');
    button.classList.add('btn-tag-filter');
    button.textContent = tagName;
    container.append(button);
  });
  return container;
}

/**
 * loads and decorates the tag cloud
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const placeholders = await fetchPlaceholders();
  const tags = await fetchTags();
  block.append(buildTagList(placeholders, tags));
}