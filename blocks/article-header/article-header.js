import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export function parseTime(time) {
  if (!time) {
    return '';
  }
  const parts = time.split(':');
  if (parts.length !== 2) {
    return '';
  }
  const timeInMins =
    parseInt(parts[1], 10) > 30
      ? parseInt(parts[0], 10) + 1
      : parseInt(parts[0], 10);
  let hours = 0;
  let mins = 0;

  if (timeInMins > 60) {
    hours = Math.floor(timeInMins / 60);
    mins = timeInMins % 60;
    const timeInHours = mins > 30 ? hours + 1 : hours;
    return timeInHours + ' hour';
  }
  return timeInMins + ' min';
}

function buildArticleInfo() {
  const primarytopic = getMetadata('primarytopic');
  const articletime = getMetadata('articletime');

  const articleInfoTime = document.createElement('div');
  articleInfoTime.classList.add('article-info-time');
  articleInfoTime.textContent = `${parseTime(articletime)} read`;
  const articleInfoTimeIcon = document.createElement('span');
  articleInfoTimeIcon.classList.add('icon');
  articleInfoTimeIcon.classList.add('icon-list');
  articleInfoTime.prepend(articleInfoTimeIcon);

  const articleInfoPrimaryTopic = document.createElement('div');
  articleInfoPrimaryTopic.classList.add('article-info-primary-topic');
  articleInfoPrimaryTopic.textContent = primarytopic;


  const articleInfoBookmark = document.createElement('div');
  articleInfoBookmark.classList.add('article-info-bookmark');
  articleInfoBookmark.textContent = 'Save';
  const articleInfoBookmarkIcon = document.createElement('span');
  articleInfoBookmarkIcon.classList.add('icon');
  articleInfoBookmarkIcon.classList.add('icon-bookmark-outlined');
  articleInfoBookmark.prepend(articleInfoBookmarkIcon);

  const articleInfo = document.createElement('div');
  articleInfo.classList.add('article-info');
  articleInfo.append(articleInfoTime);
  articleInfo.append(articleInfoPrimaryTopic);
  articleInfo.append(articleInfoBookmark);

  return articleInfo;
}

function buildArticleData() {
  const author = getMetadata('author');
  const authorurl = getMetadata('authorurl');
  const effectivedate = getMetadata('effectivedate');

  const articleDataAuthorLink = document.createElement('a');
  articleDataAuthorLink.textContent = author;
  articleDataAuthorLink.setAttribute('href', authorurl);

  const articleDataAuthor = document.createElement('div');
  articleDataAuthor.classList.add('article-data-author');
  articleDataAuthor.textContent = 'By ';
  articleDataAuthor.append(articleDataAuthorLink);

  const articleDataDate = document.createElement('div');
  articleDataDate.classList.add('article-data-date');
  articleDataDate.textContent = new Date(effectivedate).toLocaleDateString();

  const articleData = document.createElement('div');
  articleData.classList.add('article-data');
  articleData.append(articleDataAuthor);
  articleData.append(articleDataDate);

  return articleData;
}

/**
 * loads and decorates the article header
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  block.querySelector('picture').closest('div').classList.add('background-image');
  const heading = block.querySelector('h1');

  const articleInfoWrapper = document.createElement('div');
  articleInfoWrapper.classList.add('default-content-wrapper');
  articleInfoWrapper.append(buildArticleInfo());
  articleInfoWrapper.append(heading);
  articleInfoWrapper.append(buildArticleData());
  block.append(articleInfoWrapper);
}