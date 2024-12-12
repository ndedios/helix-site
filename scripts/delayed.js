// add delayed functionality here

async function loadTagger() {
    const { showTagger } = await import(`${window.hlx.codeBasePath}/tools/tagger/tagger.js`);
    showTagger();
}

function delayed() {
    if (window.hlx && window.hlx.sidekick) {
        window.hlx.sidekick.addEventListener('custom:tagger', loadTagger);
    }    
}
  
delayed();