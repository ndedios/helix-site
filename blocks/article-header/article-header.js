import { getMetadata, fetchPlaceholders, fetchTags } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export function parseTime(time, placeholders) {
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
    return timeInHours + ` ${placeholders.hour}`;
  }
  return timeInMins + ` ${placeholders.min}`;
}

function buildArticleInfo(placeholders, tags) {
  let primarytopic = getMetadata('primarytopic');
  const articletime = getMetadata('articletime');

  primarytopic = tags[primarytopic] ? tags[primarytopic] : primarytopic;
  const articleInfoTime = document.createElement('div');
  articleInfoTime.classList.add('article-info-time');
  articleInfoTime.textContent = `${parseTime(articletime, placeholders)} ${placeholders.read}`;
  const articleInfoTimeIcon = document.createElement('span');
  articleInfoTimeIcon.classList.add('icon');
  articleInfoTimeIcon.classList.add('icon-list');
  articleInfoTime.prepend(articleInfoTimeIcon);

  const articleInfoPrimaryTopic = document.createElement('div');
  articleInfoPrimaryTopic.classList.add('article-info-primary-topic');
  articleInfoPrimaryTopic.textContent = primarytopic;


  const articleInfoBookmark = document.createElement('div');
  articleInfoBookmark.classList.add('article-info-bookmark');
  articleInfoBookmark.textContent = placeholders.save;
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

function buildArticleData(placeholders, tags) {
  let author = getMetadata('author');
  const authorurl = getMetadata('authorurl');
  const effectivedate = getMetadata('effectivedate');

  author = tags[author] ? tags[author] : author;

  const articleDataAuthorLink = document.createElement('a');
  articleDataAuthorLink.textContent = author;
  articleDataAuthorLink.setAttribute('href', authorurl);

  const articleDataAuthor = document.createElement('div');
  articleDataAuthor.classList.add('article-data-author');
  articleDataAuthor.textContent = `${placeholders.by} `;
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

function buildBase(block) {
  const picture = block.querySelector('picture');
  picture.closest('div').classList.add('background-image');
  const shadowWrapper = document.createElement('span');
  shadowWrapper.classList.add('shadow-wrapper');
  const shadow = document.createElement('span');
  shadow.classList.add('shadow');
  shadowWrapper.append(shadow);
  picture.closest('p').append(shadowWrapper);
}

/**
 * loads and decorates the article header
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  buildBase(block);
  const placeholders = await fetchPlaceholders();
  const tags = await fetchTags();
  const articleInfoWrapper = document.createElement('div');
  articleInfoWrapper.classList.add('default-content-wrapper');
  articleInfoWrapper.append(buildArticleInfo(placeholders, tags));
  articleInfoWrapper.append(block.querySelector('h1'));
  articleInfoWrapper.append(buildArticleData(placeholders, tags));
  block.append(articleInfoWrapper);
}