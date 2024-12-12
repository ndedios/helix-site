import { fetchTags } from '/scripts/aem.js';

function copyTag(target) {
    var selectedTags = document.getElementById("selectedTags");
    selectedTags.value = target.dataset.tagId;
    selectedTags.select();
    selectedTags.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(selectedTags.value);
}

function buildTagger(tags) {
    const container = document.createElement('div');
    tags.forEach((tag) => {
        const button = document.createElement('button');
        button.textContent = tag.title;
        button.addEventListener('click', copyTag);
        button.dataset.tagId = tag.tag;
        container.append(button);
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
