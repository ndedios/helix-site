import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  /*const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);*/

  // decorate nav DOM
  block.textContent = '';
  /*const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);*/

  const navHtml = `<div class="component react custom-navbar extract-clientlibs" data-is-edit="false" data-logo-url="/" data-logo-alt="CME Group" data-items="[{&#34;path&#34;:&#34;par_1555445523288&#34;,&#34;fullPath&#34;:null,&#34;title&#34;:&#34;Markets&#34;,&#34;type&#34;:&#34;primary&#34;,&#34;uniqueId&#34;:&#34;1555445523288&#34;},{&#34;path&#34;:&#34;par_1555445524535&#34;,&#34;fullPath&#34;:null,&#34;title&#34;:&#34;Data&#34;,&#34;type&#34;:&#34;primary&#34;,&#34;uniqueId&#34;:&#34;1555445524535&#34;},{&#34;path&#34;:&#34;par_1555445523905&#34;,&#34;fullPath&#34;:null,&#34;title&#34;:&#34;Services&#34;,&#34;type&#34;:&#34;primary&#34;,&#34;uniqueId&#34;:&#34;1555445523905&#34;},{&#34;path&#34;:&#34;par_1633641796381&#34;,&#34;fullPath&#34;:null,&#34;title&#34;:&#34;Insights&#34;,&#34;type&#34;:&#34;secondary&#34;,&#34;uniqueId&#34;:&#34;1633641796381&#34;},{&#34;path&#34;:&#34;par_1633641797949&#34;,&#34;fullPath&#34;:null,&#34;title&#34;:&#34;Education&#34;,&#34;type&#34;:&#34;secondary&#34;,&#34;uniqueId&#34;:&#34;1633641797949&#34;}]" data-items-login="[{&#34;linkUrl&#34;:&#34;/my-profile.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;title&#34;:&#34;My Profile&#34;},{&#34;linkUrl&#34;:&#34;/my-profile.html#tab=alerts&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;title&#34;:&#34;Alerts&#34;},{&#34;linkUrl&#34;:&#34;/my-profile.html#tab=emailPreferences&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;title&#34;:&#34;Email Preferences&#34;},{&#34;linkUrl&#34;:&#34;/my-profile.html#tab=bookmarks&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;title&#34;:&#34;Bookmarks&#34;}]" data-items-login-content="[{&#34;linkUrl&#34;:&#34;/subscription-center.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;title&#34;:&#34;Subscription Center&#34;},{&#34;linkUrl&#34;:&#34;/watchlists.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;title&#34;:&#34;Watchlists&#34;}]" data-items-login-cme="[{&#34;linkUrl&#34;:&#34;https://login.cmegroup.com/&#34;,&#34;linkTarget&#34;:&#34;_blank&#34;,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;title&#34;:&#34;CME Customer Center&#34;},{&#34;linkUrl&#34;:&#34;https://cmedirect.cmegroup.com&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;title&#34;:&#34;CME Direct&#34;}]" data-items-login-out-content="[{&#34;linkUrl&#34;:&#34;/watchlists.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;title&#34;:&#34;Watchlists&#34;},{&#34;linkUrl&#34;:&#34;https://login.cmegroup.com/&#34;,&#34;linkTarget&#34;:&#34;_blank&#34;,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;title&#34;:&#34;CME Customer Center&#34;},{&#34;linkUrl&#34;:&#34;https://cmedirect.cmegroup.com&#34;,&#34;linkTarget&#34;:&#34;_blank&#34;,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;title&#34;:&#34;CME Direct&#34;},{&#34;linkUrl&#34;:&#34;/subscription-center.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;title&#34;:&#34;Subscription Center&#34;}]" data-items-login-out-cme="[]" data-search-url="/search.html">
  <div path="par_1555445523288">

  
  

<div class="row  no-gutters justify-content-start ">
  <div class="col-md-7 pb-5">

  
  
<div class="component title">
  <h5 id="markets-home" class="title-text none">
    <a class="chevron-right" href="/markets.html">
      Markets Home
      <i class="icon"></i>
    </a>
  </h5>
</div>


<div class="row  justify-content-start ">
  <div class="col-md-4 pr-md-3">

  
  <div class="component react collapsible" data-is-edit="false" data-title="Featured products" data-collapse-at="medium" data-list-style="product-list" data-links="[{&#34;linkUrl&#34;:&#34;/markets/agriculture/grains/corn.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Corn&#34;,&#34;code&#34;:&#34;ZC&#34;},{&#34;linkUrl&#34;:&#34;/markets/agriculture/oilseeds/soybean.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Soybean&#34;,&#34;code&#34;:&#34;ZS&#34;},{&#34;linkUrl&#34;:&#34;/markets/energy/crude-oil/light-sweet-crude.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;WTI Crude Oil&#34;,&#34;code&#34;:&#34;CL&#34;},{&#34;linkUrl&#34;:&#34;/markets/energy/natural-gas/natural-gas.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Henry Hub Natural Gas&#34;,&#34;code&#34;:&#34;NG&#34;},{&#34;linkUrl&#34;:&#34;/markets/equities/sp/e-mini-sandp500.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;E-mini S&amp;P 500&#34;,&#34;code&#34;:&#34;ES&#34;},{&#34;linkUrl&#34;:&#34;/markets/equities/nasdaq/e-mini-nasdaq-100.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;E-mini NASDAQ 100&#34;,&#34;code&#34;:&#34;NQ&#34;},{&#34;linkUrl&#34;:&#34;/markets/fx/g10/euro-fx.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Euro FX&#34;,&#34;code&#34;:&#34;6E&#34;},{&#34;linkUrl&#34;:&#34;/markets/interest-rates/us-treasury/10-year-us-treasury-note.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;10-Year T-Note&#34;,&#34;code&#34;:&#34;ZN&#34;},{&#34;linkUrl&#34;:&#34;/markets/interest-rates/stirs/three-month-sofr.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;SOFR&#34;,&#34;code&#34;:&#34;SR3&#34;},{&#34;linkUrl&#34;:&#34;/markets/metals/precious/gold.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Gold&#34;,&#34;code&#34;:&#34;GC&#34;},{&#34;linkUrl&#34;:&#34;/markets/metals/base/copper.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Copper&#34;,&#34;code&#34;:&#34;HG&#34;},{&#34;linkUrl&#34;:&#34;/markets/products.html#sortAsc&amp;sortField&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;All Products&#34;,&#34;code&#34;:null}]">
</div>




    


  

</div>
<div class="col-md-4 pr-md-3">

  
  <div class="component react collapsible" data-is-edit="false" data-title="Browse By" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/markets/agriculture.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Agriculture&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/markets/cryptocurrencies.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Cryptocurrencies&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/markets/energy.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Energy&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/markets/equities.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Equity Index&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/markets/fx.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;FX&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/markets/interest-rates.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Interest Rates&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/markets/metals.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Metals&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/markets/options.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Options&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/trading/market-tech-and-data-services/brokertec.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Cash Treasuries &amp; Repo&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/trading/market-tech-and-data-services/ebs.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;FX Spot&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/markets/cleared-swaps.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Cleared Swaps&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;#&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;____&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/markets/esg.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Sustainable Solutions&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/markets/microsuite.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Micro Suite&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/markets/commodities.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Commodities&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>
<div class="col-md-4 pr-md-3">

  
  <div class="component react collapsible" data-is-edit="false" data-title="Reference" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/company/clearing-fees.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Fees&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/tools-information/find-a-broker.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Find a Broker&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/tools-information/holiday-calendar.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Holiday Calendar&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/trading-hours.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Trading Hours&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/company/membership.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Membership&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/tools-information&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Tools &amp; Resources&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-regulation/rulebook.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Rulebooks&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-regulation/rule-filings.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Rule Filings&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/tools-information/advisorySearch.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Notices&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/rulebook/rulebook-harmonization.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Regulatory Guidance&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-regulation/position-limits.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Position Limits&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/tools-information/advisorySearch.html#cat=advisorynotices:Advisory+Notices/Market+Regulation+Advisories&amp;pageNumber=1&amp;subcat=advisorynotices:Advisory+Notices/Market+Regulation+Advisories/RegistrarsOffice&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Registrar&#39;s Advisories&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>

</div>

  

</div>
<div class="col-md-5 p-0">

  
  

<div class="row  no-gutters justify-content-start ">
  <div class="col-md-6 p-0">

  
  
  <div class="component content-toggle react" data-path="/content/experience-fragments/cmegroup/fragments/navbar/en-header/jcr:content/root/custom_navbar_copy/par_1555445523288/colctrlcomp_445771877/par_1/colctrlcomp/par_0/content_toggle_copy">
    
    
    
    
  </div>
  







    


  <div class="component content-toggle react" data-path="/content/experience-fragments/cmegroup/fragments/navbar/en-header/jcr:content/root/custom_navbar_copy/par_1555445523288/colctrlcomp_445771877/par_1/colctrlcomp/par_0/content_toggle_copy_">
    
    
    
    
  </div>
  


  




    


  

</div>
<div class="col-md-6 p-0">

  
  
  <div class="component content-toggle react" data-path="/content/experience-fragments/cmegroup/fragments/navbar/en-header/jcr:content/root/custom_navbar_copy/par_1555445523288/colctrlcomp_445771877/par_1/colctrlcomp/par_1/content_toggle">
    
    
    
    
  </div>
  


  




    


  

</div>

</div>

  <div class="component content-toggle react" data-path="/content/experience-fragments/cmegroup/fragments/navbar/en-header/jcr:content/root/custom_navbar_copy/par_1555445523288/colctrlcomp_445771877/par_1/content_toggle">
    
    
    
    
  </div>
  


  




    


  

</div>

</div>

  

</div>
<div path="par_1555445524535">

  
  

<div class="row  no-gutters justify-content-start ">
  <div class="col-md-7">

  
  
<div class="component title">
  <h5 id="market-data-home" class="title-text none">
    <a class="chevron-right" href="/market-data.html">
      Market Data Home
      <i class="icon"></i>
    </a>
  </h5>
</div>


<div class="row  justify-content-start crmb-1 ">
  <div class="col-md-4">

  
  <div class="component react collapsible" data-is-edit="false" data-title="Browse" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/market-data/browse-data.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Browse Data Products&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/daily-bulletin.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Daily Bulletin&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/clearing/operations-and-deliveries/accepted-trade-types/block-data.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Block Trades&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/browse-data/delayed-quotes.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Delayed Quotes&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/real-time-market-data.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Real-time Data&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/clearing/operations-and-deliveries/registrar-reports.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Registrar Reports&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/volume-open-interest/exchange-volume&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Volume &amp; Open Interest&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/settlements.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Settlements&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/e-quotes.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;E-quotes&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>
<div class="col-md-4">

  
  <div class="component react collapsible" data-is-edit="false" data-title="License" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/market-data/license-data.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;License Data&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/browse-data/derived-data.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Derived Data&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/historical-and-real-time-data-distribution.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Distribution as a Service&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/about-market-data-licensing-policies.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Policy Education Center&#34;,&#34;code&#34;:null}]">
</div>

  




    

<div class="component react collapsible" data-is-edit="false" data-title="Connect" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/market-data/connect-data.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Connect to Data&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/licensed-distributors.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Licensed Distributors&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/cloud-mdp.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Google Cloud Platform&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/distributor/market-data-platform.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Market Data Platform&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/market-data-api.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Market Data APIs&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/datamine.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Datamine&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>
<div class="col-md-4">

  
  <div class="component react collapsible" data-is-edit="false" data-title="Benchmarks" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/market-data/cme-group-benchmark-administration.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Benchmark Administration&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/cme-group-benchmark-administration/term-sofr.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Term SOFR&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/cme-group-benchmark-administration/cme-group-volatility-indexes.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;CME Group Volatility Index (CVOL)&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/cme-group-benchmark-administration/repofunds-rates.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;RepoFunds Rates&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-data/cme-group-benchmark-administration/petroleum-index.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Petroleum Index&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/markets/cryptocurrencies/cme-cf-cryptocurrency-benchmarks.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Cryptocurrencies&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>

</div>

  

</div>
<div class="col-md-5 p-0">

  
  

<div class="row  no-gutters justify-content-start ">
  <div class="col-md-6 p-0">

  
  

<div class="promo component rte-global-styles minHeight nav   h-100 primary dark  no-cta-text" aria-label="Promo">
  <a class="promo-link" href="/market-data/real-time-market-data.html">
    <div class="promo-body ">
      
      <div class="promo-title"><p>Real-time market data</p>
</div>
      <div class="promo-nav-arrow">
        <div class="arrow_box left" style="background-color: rgba(0,0,0,0);">
          <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
        </div>
      </div>
      <div class="promo-subtitle">Stream live futures and options market data directly from CME Group.</div>
    </div>
    <div class="promo-foot inside-arrow at-bottom fixed-height no-cta-text">
      <div class="arrow_box left" style="background-color: rgba(0,0,0,0);">
        <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
      </div>
      
    </div>
  </a>
</div>

  

</div>
<div class="col-md-6 p-0">

  
  

<div class="promo component rte-global-styles minHeight nav    h-100 custom  no-cta-text" style="background-color: #085EA5;" aria-label="Promo">
  <a class="promo-link" href="/market-data/connect-data/cme-group-market-data-on-google-analytics-hub.html">
    <div class="promo-body ">
      
      <div class="promo-title"><p>Market Data on Google Analytics Hub</p>
</div>
      <div class="promo-nav-arrow">
        <div class="arrow_box left" style="background-color: rgba(0,0,0,0);">
          <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
        </div>
      </div>
      <div class="promo-subtitle">Discover a cost-efficient way to access, query, and share CME Group market data.</div>
    </div>
    <div class="promo-foot inside-arrow at-bottom fixed-height no-cta-text">
      <div class="arrow_box left" style="background-color: rgba(0,0,0,0);">
        <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
      </div>
      
    </div>
  </a>
</div>

  

</div>

</div>


<div class="row  no-gutters justify-content-start ">
  <div class="col p-0 ">

  
  

<div class="promo component rte-global-styles minHeight nav None  h-100 custom  no-cta-text" style="background-color: #0F5095; background-image: url(&#39;/content/dam/cmegroup/images/common/promos/datamine-630x310.jpg&#39;); background-repeat: repeat; background-position: left top; background-size: cover;" aria-label="Promo">
  <a class="promo-link" href="/datamine.html">
    <div class="promo-body ">
      
      <div class="promo-title"><p><span class="emphasized">CME DATAMINE:</span></p>
<p>THE SOURCE FOR HISTORICAL DATA</p>
</div>
      <div class="promo-nav-arrow">
        <div class="arrow_box left" style="background-color: rgba(0,0,0,0);">
          <span class="arrow icon-arrow-right-thin" style="color: #E3E935;"></span>
        </div>
      </div>
      <div class="promo-subtitle">Explore historical market data straight from the source to help refine your trading strategies.</div>
    </div>
    <div class="promo-foot inside-arrow at-bottom fixed-height no-cta-text">
      <div class="arrow_box left" style="background-color: rgba(0,0,0,0);">
        <span class="arrow icon-arrow-right-thin" style="color: #E3E935;"></span>
      </div>
      
    </div>
  </a>
</div>

  

</div>

</div>

  

</div>

</div>

  

</div>
<div path="par_1555445523905">

  
  

<div class="row  no-gutters justify-content-start None ">
  <div class="col-md-8 pb-5">

  
  
<div class="component title">
  <h5 id="services-home" class="title-text  ml-0 None">
    <a class="chevron-right" href="/solutions.html">
      Services Home
      <i class="icon"></i>
    </a>
  </h5>
</div>


<div class="row  justify-content-start None ">
  <div class="col-md-6">

  
  <div class="component react collapsible" data-is-edit="false" data-title="Clearing" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/solutions/clearing.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Clearing Home&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/solutions/clearing/financial-and-collateral-management.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Financial and Collateral Management&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/solutions/clearing/financial-and-regulatory-surveillance.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Financial and Regulatory Surveilance&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/solutions/clearing/operations-and-deliveries.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Clearing Operations &amp; Deliveries&#34;,&#34;code&#34;:null}]">
</div>

  




    

<div class="component react collapsible" data-is-edit="false" data-title="Managing Risk" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/solutions/risk-management.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Risk Management Home&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/solutions/risk-management/performance-bonds-margins.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Performance Bonds/Margins&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/solutions/risk-management/margin-services/product-margins.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Product Margins&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/solutions/risk-management/margin-services.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Margin Services&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/solutions/risk-management/financial-safeguards.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Financial Safeguards&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>
<div class="col-md-6">

  
  <div class="component react collapsible" data-is-edit="false" data-title="Technology Services" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/solutions/market-tech-and-data-services.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Technology Home&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/trading/straight-through-processing&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Straight Through Processing (STP)&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/trading/colocation/co-location-services.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Co-Location Services&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/trading/global-repository-services.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:&#34;nofollow&#34;,&#34;text&#34;:&#34;Global Repository Services&#34;,&#34;code&#34;:null}]">
</div>

  




    

<div class="component react collapsible" data-is-edit="false" data-title="Applications" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/globex.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;CME Globex&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/solutions/market-access/cme-direct.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;CME Direct&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/clearport.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;CME ClearPort&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/trading/elysian-systems.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Elysian&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>

</div>

  

</div>
<div class="col-md-4 p-0">

  
  

<div class="row  no-gutters justify-content-start ">
  <div class="col p-0 ">

  
  

<div class="promo component rte-global-styles minHeight nav None  h-100 custom  no-cta-text" style="background-color: #0F5095;" aria-label="Promo">
  <a class="promo-link" href="/notices.html#filters=all-8">
    <div class="promo-body ">
      
      <div class="promo-title"><p>Clearing Advisories</p>
</div>
      <div class="promo-nav-arrow">
        <div class="arrow_box left" style="background-color: ;">
          <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
        </div>
      </div>
      <div class="promo-subtitle">Access and filter an archive of recent and historical notices for every aspect of trading at CME Group, including Clearing advisories.</div>
    </div>
    <div class="promo-foot inside-arrow at-bottom fixed-height no-cta-text">
      <div class="arrow_box left" style="background-color: ;">
        <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
      </div>
      
    </div>
  </a>
</div>

  

</div>

</div>


<div class="row  no-gutters justify-content-start ">
  <div class="col p-0 ">

  
  

<div class="promo component rte-global-styles minHeight nav None  h-100 custom  no-cta-text" style="background-color: #164285;" aria-label="Promo">
  <a class="promo-link" href="/education/navigating-uncleared-margin-rules.html">
    <div class="promo-body ">
      
      <div class="promo-title"><p>Uncleared margin rules</p>
</div>
      <div class="promo-nav-arrow">
        <div class="arrow_box left" style="background-color: rgba(0,0,0,0);">
          <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
        </div>
      </div>
      <div class="promo-subtitle">Explore our suite of capital-efficient solutions to URM challenges designed to help minimize your initial margin requirements.</div>
    </div>
    <div class="promo-foot inside-arrow at-bottom fixed-height no-cta-text">
      <div class="arrow_box left" style="background-color: rgba(0,0,0,0);">
        <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
      </div>
      
    </div>
  </a>
</div>

  

</div>

</div>

  

</div>

</div>

  

</div>
<div path="par_1633641796381">

  
  

<div class="row  justify-content-start ">
  <div class="col-md-8">

  
  
<div class="component title">
  <h5 id="insights-home" class="title-text none">
    <a class="chevron-right" href="/insights.html">
      Insights Home
      <i class="icon"></i>
    </a>
  </h5>
</div>


<div class="row  justify-content-start ">
  <div class="col-md-4">

  
  <div class="component react collapsible" data-is-edit="false" data-title="IN THIS SECTION" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/insights/economic-research.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Economic Research&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/insights/product-analysis-and-commentary.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Product Analysis&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/videos.html#filters=market-commentary&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Market Commentary&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>
<div class="col-md-4">

  
  <div class="component react collapsible" data-is-edit="false" data-title="TOPICS" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/education/browse-all.html#pageNum=1&amp;filters=Articles_Reports,Trade-Wars&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Trade Wars&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/education/browse-all.html#pageNum=1&amp;filters=Articles_Reports,ESG&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;ESG&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/education/browse-all.html#pageNum=1&amp;filters=Bitcoin,Cryptocurrency,Articles_Reports&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Cryptocurrencies&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>
<div class="col-md-4">

  
  <div class="component react collapsible" data-is-edit="false" data-title="FEATURED" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/newsletters/excell-with-options-report-from-rich-excell.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Excell with Options&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/education/events/economic-releases-calendar.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Economic Release Calendar&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>

</div>

  

</div>
<div class="col-md-4 p-0">

  
  

<div class="promo component rte-global-styles minHeight nav    custom  no-cta-text" style="background-color: #e3e935;" aria-label="Promo">
  <a class="promo-link" href="https://www.cmegroup.com/subscription-center.html">
    <div class="promo-body ">
      
      <div class="promo-title"><p><span style="color: black;">Subscribe to Research</span></p>
</div>
      <div class="promo-nav-arrow">
        <div class="arrow_box left" style="background-color: ;">
          <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
        </div>
      </div>
      <div class="promo-subtitle"><p style="color: black;"><span>Get our latest economic research delivered to your email inbox.</span></p></div>
    </div>
    <div class="promo-foot inside-arrow at-bottom fixed-height no-cta-text">
      <div class="arrow_box left" style="background-color: ;">
        <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
      </div>
      
    </div>
  </a>
</div>


<div class="promo component rte-global-styles minHeight nav None   custom  no-cta-text" style=" background-image: url(&#39;/content/dam/cmegroup/images/common/news/the-worlds-most-valuable-exchange-brand-940x600.jpg&#39;); background-repeat: repeat; background-position: center bottom; background-size: cover;" aria-label="Promo">
  <a class="promo-link" href="/investor-relations/files/cme-group-named-worlds-most-valuable-exchange.pdf">
    <div class="promo-body ">
      
      <div class="promo-title"><p>The world's most valuable exchange brand</p>
</div>
      <div class="promo-nav-arrow">
        <div class="arrow_box left" style="background-color: ;">
          <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
        </div>
      </div>
      <div class="promo-subtitle">Learn more about <i>Brand Finance</i> naming CME Group the most valuable exchange brand for the 11th year in a row.</div>
    </div>
    <div class="promo-foot inside-arrow at-bottom fixed-height no-cta-text">
      <div class="arrow_box left" style="background-color: ;">
        <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
      </div>
      
    </div>
  </a>
</div>


  

</div>

</div>

  

</div>
<div path="par_1633641797949">

  
  

<div class="row  no-gutters justify-content-start ">
  <div class="col-md-8">

  
  
<div class="component title">
  <h5 id="education-home" class="title-text none">
    <a class="chevron-right" href="/education.html">
      Education Home
      <i class="icon"></i>
    </a>
  </h5>
</div>


<div class="row  justify-content-start ">
  <div class="col-md-5">

  
  <div class="component react collapsible" data-is-edit="false" data-title="Learn" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/education/courses.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Courses &amp; Lessons&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/education/events.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Events &amp; Webinars&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/education/academic-resources.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Academic Resources&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/videos.html#filters=Traders-Edge&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Trader&#39;s Edge&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/education/alternative-investment-resource-center.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Alternative Investment Resource Center&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;https://www.futuresfundamentals.org/&#34;,&#34;linkTarget&#34;:&#34;_blank&#34;,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Futures Fundamentals&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/education/browse-all.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Browse All Education&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>
<div class="col-md-3">

  
  <div class="component react collapsible" data-is-edit="false" data-title="Practice" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/trading_tools/simulator&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Trading Simulator&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/education/practice.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Analytic &amp; Trading Tools&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/education/trading-challenge.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Trading Challenge&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>
<div class="col-md-4">

  
  <div class="component react collapsible" data-is-edit="false" data-title="Follow the Markets" data-collapse-at="medium" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/education/economic-research-reports.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Economic Research&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/education/follow-the-markets.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Commentary &amp; Analysis&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/price-action-alerts.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Price Action Alerts&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/videos.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Video Archive&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/podcasts.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Podcasts&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>

</div>

  

</div>
<div class="col-md-4 p-0">

  
  

<div class="row  no-gutters justify-content-start ">
  <div class="col p-0 ">

  
  

<div class="promo component rte-global-styles minHeight nav None   custom  no-cta-text" style="background-color: #0F5095; background-image: url(&#39;/content/dam/cmegroup/education/images/2024/q4/trade-against-a-pro-tc-edu-topnav-promo-940x600.png&#39;); background-repeat: repeat; background-position: center bottom; background-size: cover;" aria-label="Promo">
  <a class="promo-link" href="https://www.cmegroup.com/futures_challenge/challenges/1158/landing">
    <div class="promo-body ">
      
      <div class="promo-title"><p>Trade Against a Pro Challenge</p>
</div>
      <div class="promo-nav-arrow">
        <div class="arrow_box left" style="background-color: rgba(0,0,0,0);">
          <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
        </div>
      </div>
      <div class="promo-subtitle">Get to know our range of futures contracts and practice trading in a risk-free, simulated environment.<br />December 8-13</div>
    </div>
    <div class="promo-foot inside-arrow at-bottom fixed-height no-cta-text">
      <div class="arrow_box left" style="background-color: rgba(0,0,0,0);">
        <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
      </div>
      
    </div>
  </a>
</div>

  

</div>

</div>


<div class="row  no-gutters justify-content-start ">
  <div class="col p-0 ">

  
  

<div class="promo component rte-global-styles minHeight nav None  h-100 custom  no-cta-text" style="background-color: #006EB6;" aria-label="Promo">
  <a class="promo-link" href="https://www.cmegroup.com/trading/why-futures.html">
    <div class="promo-body ">
      
      <div class="promo-title"><p>New to futures?</p>
</div>
      <div class="promo-nav-arrow">
        <div class="arrow_box left" style="background-color: rgba(0,0,0,0);">
          <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
        </div>
      </div>
      <div class="promo-subtitle">Learn why traders use futures, how to trade futures and what steps you should take to get started.</div>
    </div>
    <div class="promo-foot inside-arrow at-bottom fixed-height no-cta-text">
      <div class="arrow_box left" style="background-color: rgba(0,0,0,0);">
        <span class="arrow icon-arrow-right-thin" style="color: #3CC8FF;"></span>
      </div>
      
    </div>
  </a>
</div>

  

</div>

</div>

  

</div>

</div>

  

</div>

</div>`;
block.innerHTML = navHtml;
}
