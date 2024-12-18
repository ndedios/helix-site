/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const HEADERS = {
  level1: 'Level 1',
  level2: 'Level 2',
  level3: 'Level 3',
  hidden: 'Hidden',
  link: 'Link',
  type: 'Type',
  excludeFromMetadata: 'ExcludeFromMetadata',
};

const NO_INTERLINKS = 'no-interlinks';

const CATEGORIES = 'categories';
const PRODUCTS = 'products';
const INDUSTRIES = 'industries';
const INTERNALS = 'internals';

/**
 * Filters a string to become a filename of a url
  * @param {*} name The name of the target page
 * @returns {string} The filter
 */
function filter(name) {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/\s/gm, '-') // replace whitespace with -
    .replace(/&amp;/gm, '') // remove encoded ampersands
    .replace(/&/gm, '') // remove unencoded ampersands
    .replace(/\./gm, '') // remove dots
    .replace(/--+/g, '-'); // remove multiple dashes
}

/**
 * Returns the taxonomy object
 * @param {string} lang Language of the taxonomy
 * @param {*} url URL to use to load the taxonomy
 * @returns {object} The taxonomy object
 */
export default async (lang, url) => {
  const root = `/${lang}`;
  const escapeTopic = (topic) => {
    if (!topic) return null;
    return topic.replace(/\n/gm, ' ').trim();
  };

  const isProduct = (cat) => cat && cat.toLowerCase() === PRODUCTS;

  const target = url || `/tags.json`;

  return fetch(target)
    .then((response) => response.json())
    .then((json) => {
      const data = {
        topics: {},
        products: {},
        categories: {},
        topicChildren: {},
        productChildren: {},
      };

      if (json && json.data && json.data.length > 0) {
        const H = HEADERS;
        let level1; let
          level2;
        json.data.forEach((row) => {
          const { tag, title } = row;
          let link = row[H.link] !== '' ? row[H.link] : null;
          if (link) {
            const u = new URL(link);
            const current = new URL(window.location.href);
            link = `${current.origin}${u.pathname}`;
          } else {
            link = `${root}/${filter(tag)}`;
          }

          const item = {
            tag,
            title,
            link,
            category,
            hidden: row[H.hidden] ? row[H.hidden].trim() !== '' : false,
            skipMeta: row[H.excludeFromMetadata] ? row[H.excludeFromMetadata].trim() !== '' : false,
          };

          if (!isProduct(category)) {
            data.topics[name] = item;
          } else {
            data.products[name] = item;
          }

          if (!data.categories[item.category]) {
            data.categories[item.category] = [];
          }

          if (data.categories[item.category].indexOf(name) === -1) {
            data.categories[item.category].push(item.name);
          }

          const children = isProduct(category) ? data.productChildren : data.topicChildren;
          if (level3) {
            if (!children[level2]) {
              children[level2] = [];
            }
            if (children[level2].indexOf(level3) === -1) {
              children[level2].push(level3);
            }
          }

          if (level2) {
            if (!children[level1]) {
              children[level1] = [];
            }
            if (children[level1].indexOf(level2) === -1) {
              children[level1].push(level2);
            }
          }
        });
      }

      const findItem = (topic, cat) => {
        let t;
        if (!cat) {
          t = data.products[topic];
          if (!isProduct(cat) && !t) {
            t = data.topics[topic];
          }
        } else if (isProduct(cat)) {
          t = data.products[topic];
        } else {
          t = data.topics[topic];
        }
        return t;
      };

      return {
        CATEGORIES,
        INDUSTRIES,
        INTERNALS,
        PRODUCTS,
        NO_INTERLINKS,

        lookup(topic) {
          // might be a product (product would have priori)
          let t = this.get(topic, PRODUCTS);
          if (!t) {
            // might be a product without the leading Adobe
            t = this.get(topic.replace('Adobe ', ''), PRODUCTS);
            if (!t) {
              t = this.get(topic);
            }
          }
          return t;
        },

        get(topic, cat) {
          // take first one of the list
          const t = findItem(topic, cat);
          if (t) {
            return {
              name: t.name,
              link: this.getLink(t.name, cat),
              isUFT: this.isUFT(t.name, cat),
              skipMeta: this.skipMeta(t.name, cat),

              level: t.level,
              parents: this.getParents(t.name, cat),
              children: this.getChildren(t.name, cat),

              category: this.getCategoryTitle(t.category),
            };
          }
          return null;
        },

        isUFT(topic, cat) {
          const t = findItem(topic, cat);
          return t && !t.hidden;
        },

        skipMeta(topic, cat) {
          const t = findItem(topic, cat);
          return t && t.skipMeta;
        },

        getLink(topic, cat) {
          const t = findItem(topic, cat);
          const link = t?.link?.replace('.html', '');
          return link;
        },

        getParents(topics, cat) {
          const list = typeof topics === 'string' ? [topics] : topics;
          const parents = [];
          list.forEach((topic) => {
            const t = findItem(topic, cat);
            if (t) {
              if (t.level3) {
                if (parents.indexOf(t.level2) === -1) parents.push(t.level2);
                if (parents.indexOf(t.level1) === -1) parents.push(t.level1);
              } else if (t.level2 && parents.indexOf(t.level1) === -1) {
                parents.push(t.level1);
              }
            }
          });
          return parents;
        },

        getChildren(topic, cat) {
          const children = isProduct(cat) ? data.productChildren : data.topicChildren;
          return children[topic] || [];
        },

        getCategory(cat) {
          return data.categories[cat.toLowerCase()] || [];
        },

        getCategoryTitle(cat) {
          return cat.charAt(0).toUpperCase() + cat.substring(1);
        },
      };
    });
};
