import { fetchTags } from '/scripts/aem.js';
import { createModal } from '/blocks/modal/modal.js';

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

export async function showTagger() {
    const div = document.createElement('div');
    div.append(buildTagger());
    const { showModal } = await createModal(div.childNodes);
    showModal();
}
