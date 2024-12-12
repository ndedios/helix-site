import { fetchTags } from '/scripts/aem.js';

async function buildTagger() {
    const tags = await fetchTags();
    const container = document.createElement('div');
    tags.forEach((tag) => {
        const divTag = document.createElement('div');
        divTag.textContent = tag.title;
        container.append(divTag);
    });
    return container;
}

async function showTagger() {
    const main = document.querySelector('main');
    main.append(buildTagger());
}

showTagger();
