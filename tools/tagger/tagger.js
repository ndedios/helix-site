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
    const resp = await fetch(`/tags.json`);
    const json = await resp.json();
    const main = document.querySelector('main');
    main.append(buildTagger(json.data));
}

showTagger();
