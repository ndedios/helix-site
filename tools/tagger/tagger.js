import { fetchTags } from '/scripts/aem.js';

function buildTagger(tags) {
    const container = document.createElement('div');
    tags.forEach((tag) => {
        const divTag = document.createElement('div');
        divTag.textContent = tag.title;
        container.append(divTag);
    });
    return container;
}

async function showTagger() {
    const tags = await fetchTags();
    const main = document.querySelector('main');
    main.append(buildTagger(tags));
}

showTagger();
