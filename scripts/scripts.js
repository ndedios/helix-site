import {
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  getMetadata,
} from './aem.js';

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

function buildDynamicAlertList(main) {
  const section = document.createElement('div');
  section.innerHTML = `<div><div class="component react dynamic-alert-list" data-is-edit="false" data-path="en"></div>`;
  main.prepend(section);
}

function buildArticleHeader(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('article-header', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildArticleHeader(main);
    buildDynamicAlertList(main);
    //buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

function cmeScripts() {
     window.authenticationOptions = window.authenticationOptions || {};

    /* auth config */
    authenticationOptions.loginProcessUrl = '\/content\/cmegroup\/en\/login\u002Dconfirmed.html';
    authenticationOptions.loginUrl = 'https:\/\/auth.cmegroup.com\/idp\/startSSO.ping?PartnerSpId=https%3A%2F%2Fwww.cmegroup.com\x26DoNotPerformAuth=NO';
    authenticationOptions.registerUrl = 'https:\/\/login.cmegroup.com\/sso\/register\/';
    authenticationOptions.logoutUrl = '\/libs\/cmegroup\/security\/logout';
    authenticationOptions.logoutProfileUrl = 'https:\/\/myprofile.cmegroup.com\/admin\/ssoflo';
    authenticationOptions.isMobileLogin = false;
    authenticationOptions.schemaForMobile = '';

    window.globalConfig = window.globalConfig || {};

    /* global config */
    globalConfig.authorMode = false;
    globalConfig.googleSearchUrl = '';
    globalConfig.popularSearchUrl = '';
    globalConfig.defaultProductTabLink = '';
    globalConfig.socialNetworks = 'facebook,reddit,twitter,linkedin,weibo';
    globalConfig.socialMessage = '';
    globalConfig.myWatchlistsUrl = '\/content\/cmegroup\/en\/watchlists.html';
    globalConfig.watchlistProductsUrl = '\/content\/cmegroup\/en\/watchlists\/details.html';
    globalConfig.currentLanguageFolder = 'en';
    globalConfig.subscriptionCenterUrl = '\/content\/cmegroup\/en\/subscription\u002Dcenter.html';
    globalConfig.newSubscriptionDays = '60' || '30';
    globalConfig.myProfileUrl = '\/content\/cmegroup\/en\/my\u002Dprofile.html';

    /* page config */
    globalConfig.isProtectedPage = false;
    globalConfig.lockModalText = 'Log in or create an account to access premium content on cmegroup.com.';
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }

  //loadHeader(doc.querySelector('header'));
  /* load gnav */
  const header = document.querySelector('header');
  const gnavPath = getMetadata('gnav') || `/gnav`;
  header.setAttribute('data-block-name', 'gnav');
  header.setAttribute('data-gnav-source', gnavPath);
  loadBlock(header);

  loadFooter(doc.querySelector('footer'));

  //import('./cme/jquery.1fc733054ddb2e2fcd4a0f763671047b.js');
  cmeScripts();
}

function cmeLazyScripts() {
  // OneTrust Cookies Consent Notice start for cmegroup.com
  import('https://cdn.cookielaw.org/consent/f42915b0-68e5-491a-a7f7-1db0d962ddff/OtAutoBlock.js');
  const script = document.createElement('script');
  script.src='https://cdn.cookielaw.org/scripttemplates/otSDKStub.js';
  script.dataset.domainScript = 'f42915b0-68e5-491a-a7f7-1db0d962ddff';
  document.body.append(script);
  window.OptanonWrapper = function() { };

  // OneTrust Cookies Consent Notice end for cmegroup.com
  import('//cdn.evgnet.com/beacon/cmegroup/cmegroup/scripts/evergage.min.js');

  // SEO Clarity
  import('https://js.clrt.ai/564.js');

  // Begin Marketing Cloud Einstein Tag 
  import('//514009935.collect.igodigital.com/collect.js');

  // Sharethis
  import('https://platform-api.sharethis.com/js/sharethis.js#property=644646a57ac381001a304496&product=sticky-share-buttons&source=platform');

  // Google Tag Manager
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.setAttributeNode(d.createAttribute('data-ot-ignore')); j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-PLCS');

  // Maze DMT-21017 
  (function (m, a, z, e) {
  var s, t;
  try

  {     t = m.sessionStorage.getItem('maze-us');   }
  catch (err) {}
  
    if (!t) {
      t = new Date().getTime();
      try
  
  {       m.sessionStorage.setItem('maze-us', t);     }
  catch (err) {}
    }
  
    s = a.createElement('script');
    s.src = z + '?t=' + t + '&apiKey=' + e;
    s.async = true;
    a.getElementsByTagName('head')[0].appendChild(s);
    m.mazeUniversalSnippetApiKey = e;
  })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '38dab2d6-19d2-4393-9831-871dcd99ab98');

  
  var ls = window.localStorage;
  var key = 'searches';
  var value = JSON.parse(ls.getItem(key));
  if (Object.keys(value || {}).indexOf('data') > -1) {
    ls.setItem(key, JSON.stringify(value.data))
  }
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        if (registration.active.scriptURL.indexOf('cmegroup.com/sw.js') > -1) {
          registration.unregister();
        }
      }
    });
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadCSS(`${window.hlx.codeBasePath}/styles/cme/common.b054aae7717e8a58250e23b6db7a09ba.css`);
  loadCSS(`${window.hlx.codeBasePath}/styles/cme/dependencies.56fb58fb2b6eb0314bab56a47d047112.css`);
  loadCSS(`${window.hlx.codeBasePath}/styles/cme/vendor.1c80d0c6d71eaea8333ba7ea1cd47f6c.css`);
  //loadCSS(`${window.hlx.codeBasePath}/styles/cme/custom-navbar.aa86bb85262829c3765a59a06eacaf0b.css`);
  //loadCSS(`${window.hlx.codeBasePath}/styles/cme/collapsible.3919d3ac8087bdea78845d866a8dbc45.css`);
  loadCSS(`${window.hlx.codeBasePath}/styles/cme/feedback-form.b7e4d41a66520ec5f7bab3a91ed5565e.css`);
  loadCSS(`${window.hlx.codeBasePath}/styles/cme/language-selector.c806a9a3563fd736819726caa33a4f7b.css`);
  loadCSS(`${window.hlx.codeBasePath}/styles/cme/dynamic-alert-list.faa5b20b3e608b66780a4e431b9b541f.css`);
  //loadCSS(`${window.hlx.codeBasePath}/styles/cme/article-header.e8b495ec5e75ceee30679246c3e7fecf.css`);
  //loadCSS(`${window.hlx.codeBasePath}/styles/cme/image.f349ab716c0ff2a3bd8550fe2f51b951.css`);
  //loadCSS(`${window.hlx.codeBasePath}/styles/cme/text.e7e8d925d82c0530d9b902c4c5d67dca.css`);
  loadFonts();

  //import('./cme/custom-navbar.870ed14da87b882b0c1f783292f3f12b.js');
  //import('./cme/content-toggle.785ccebfcf3031805ea88b853c6eb377.js');
  //import('./cme/collapsible.253c0ec6a3ac417570a8044eb4b0a38b.js');
  import('./cme/feedback-form.9d433f3d15a7e2d07ac4f09d1d6cafa8.js');
  import('./cme/language-selector.b2ced5c1f9ac40f8e7a1fefe30bde5a8.js');
  import('./cme/vendor.c50054cf072d88684ad63be26c943c16.js');
  import('./cme/common.52ce1b7dcd776b2ecc275fca40301c87.js');
  import('./cme/dynamic-alert-list.f6d92d1593c4b6af619c74760ffd28d7.js');
  //import('./cme/article-header.deb20f139b593f1b047d4d289ce4e08d.js');
  //import('./cme/image.53044f44c89fe2885739265f6f156483.js');
  //import('./cme/text.8288c3f4be088236de4d520e206a8353.js');
  //import('./cme/dependencies.e420e99671686097433a87b2a109856a.js');
  cmeLazyScripts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
