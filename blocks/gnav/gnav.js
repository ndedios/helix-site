import {
  loadScript,
} from '../../scripts/aem.js';
import { createTag } from '../block-helpers.js';

const BRAND_IMG = '<img loading="lazy" alt="Adobe" src="/blocks/gnav/adobe-logo.svg">';
const SEARCH_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false">
<path d="M14 2A8 8 0 0 0 7.4 14.5L2.4 19.4a1.5 1.5 0 0 0 2.1 2.1L9.5 16.6A8 8 0 1 0 14 2Zm0 14.1A6.1 6.1 0 1 1 20.1 10 6.1 6.1 0 0 1 14 16.1Z"></path>
</svg>`;
const IS_OPEN = 'is-Open';

class Gnav {
  constructor(body, el) {
    this.el = el;
    this.body = body;
    this.env = {};
    this.desktop = window.matchMedia('(min-width: 1200px)');
  }

  init = () => {
    this.state = {};
    this.curtain = createTag('div', { class: 'gnav-curtain' });
    const nav = createTag('nav', { class: 'gnav' });

    const mobileToggle = this.decorateToggle(nav);
    nav.append(mobileToggle);

    const brand = this.decorateBrand();
    if (brand) {
      nav.append(brand);
    }

    const mainNav = this.decorateMainNav();
    if (mainNav) {
      nav.append(mainNav);
    }

    const search = this.decorateSearch();
    if (search) {
      nav.append(search);
    }

    const profile = this.decorateProfile();
    if (profile) {
      nav.append(profile);
    }

    const logo = this.decorateLogo();
    if (logo) {
      nav.append(logo);
    }

    //makeLinksRelative(nav);

    const wrapper = createTag('div', { class: 'gnav-wrapper' }, nav);
    this.el.append(this.curtain, wrapper);
  }

  decorateToggle = (nav) => {
    const toggle = createTag('button', { class: 'gnav-toggle', 'aria-label': 'Navigation menu', 'aria-expanded': false });
    const onMediaChange = (e) => {
      if (e.matches) {
        nav.classList.remove(IS_OPEN);
        this.curtain.classList.remove(IS_OPEN);
      }
    };
    toggle.addEventListener('click', async () => {
      if (nav.classList.contains(IS_OPEN)) {
        nav.classList.remove(IS_OPEN);
        this.curtain.classList.remove(IS_OPEN);
        this.desktop.removeEventListener('change', onMediaChange);
      } else {
        nav.classList.add(IS_OPEN);
        this.desktop.addEventListener('change', onMediaChange);
        this.curtain.classList.add(IS_OPEN);
        this.loadSearch();
      }
    });
    return toggle;
  }

  decorateBrand = () => {
    const brandBlock = this.body.querySelector('[class^="gnav-brand"]');
    if (!brandBlock) return null;
    const brand = brandBlock.querySelector('a');

    const { className } = brandBlock;
    const classNameClipped = className.slice(0, -1);
    const classNames = classNameClipped.split('--');
    brand.className = classNames.join(' ');
    if (brand.classList.contains('with-logo')) {
      brand.insertAdjacentHTML('afterbegin', BRAND_IMG);
    }
    return brand;
  }

  decorateLogo = () => {
    const logo = this.body.querySelector('.adobe-logo a');
    if (!logo) return null;
    logo.classList.add('gnav-logo');
    logo.setAttribute('aria-label', logo.textContent);
    logo.textContent = '';
    logo.insertAdjacentHTML('afterbegin', BRAND_IMG);
    return logo;
  }

  decorateMainNav = () => {
    const mainNav = createTag('div', { class: 'gnav-mainnav' });
    const primaryLinks = this.body.querySelectorAll('.primary h2 > a');
    if (primaryLinks.length > 0) {
      this.buildMainNav(mainNav, primaryLinks, 'primary');
    }
    const navItem = createTag('div', { class: 'gnav-navitem' });
    navItem.classList.add('divider');
    navItem.textContent = '|';
    mainNav.appendChild(navItem);
    const secondaryLinks = this.body.querySelectorAll('.secondary h2 > a');
    if (secondaryLinks.length > 0) {
      this.buildMainNav(mainNav, secondaryLinks, 'secondary');
    }
    return mainNav;
  }

  buildMainNav = (mainNav, navLinks, menuType) => {
    navLinks.forEach((navLink, idx) => {
      const navItem = createTag('div', { class: 'gnav-navitem' });
      const menu = navLink.closest('div');
      menu.querySelector('h2').remove();
      navItem.appendChild(navLink);
      navItem.classList.add(menuType);
      if (navLink.href.match('#subscribe')) {
        navLink.classList.add('newsletter-modal-cta');
        navLink.href = '/';

        navLink.addEventListener('click', (e) => {
          e.preventDefault();
          const $modal = document.querySelector('.newsletter-modal-container');

          if ($modal) {
            $modal.classList.add('active');
            document.body.classList.add('newsletter-no-scroll');
          }
        });
      }

      if (menu.childElementCount > 0) {
        const id = `navmenu-${idx}`;
        menu.id = id;
        navItem.classList.add('has-Menu');
        navLink.setAttribute('role', 'button');
        navLink.setAttribute('aria-expanded', false);
        navLink.setAttribute('aria-controls', id);

        const decoratedMenu = this.decorateMenu(navItem, navLink, menu);
        navItem.appendChild(decoratedMenu);
      }
      mainNav.appendChild(navItem);
    });
  }

  decorateMenu = (navItem, navLink, menu) => {
    menu.className = 'gnav-navitem-menu';
    const childCount = 3;//menu.querySelectorAll('li').length;
    if (childCount === 1) {
      menu.classList.add('small-Variant');
    } else if (childCount === 2) {
      menu.classList.add('medium-Variant');
    } else if (childCount >= 3) {
      menu.classList.add('large-Variant');
      const container = createTag('div', { class: 'gnav-menu-container' });
      container.append(...Array.from(menu.children));
      menu.append(container);
    }
    navLink.addEventListener('focus', () => {
      window.addEventListener('keydown', this.toggleOnSpace);
    });
    navLink.addEventListener('blur', () => {
      window.removeEventListener('keydown', this.toggleOnSpace);
    });
    navLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleMenu(navItem);
    });
    return menu;
  }

  decorateSearch = () => {
    const searchBlock = this.body.querySelector('.search');
    if (searchBlock) {
      const label = searchBlock.querySelector('p').textContent;
      const advancedLink = searchBlock.querySelector('a');
      const searchEl = createTag('div', { class: 'gnav-search' });
      const searchBar = this.decorateSearchBar(label, advancedLink);
      const searchButton = createTag(
        'button',
        {
          class: 'gnav-search-button',
          'aria-label': label,
          'aria-expanded': false,
          'aria-controls': 'gnav-search-bar',
        },
        SEARCH_ICON,
      );
      searchButton.addEventListener('click', () => {
        this.loadSearch(searchEl);
        this.toggleMenu(searchEl);
      });
      searchEl.append(searchButton, searchBar);
      return searchEl;
    }
    return null;
  }

  decorateSearchBar = (label, advancedLink) => {
    const searchBar = createTag('aside', { id: 'gnav-search-bar', class: 'gnav-search-bar' });
    const searchField = createTag('div', { class: 'gnav-search-field' }, SEARCH_ICON);
    const searchInput = createTag('input', { class: 'gnav-search-input', placeholder: label });
    const searchResults = createTag('div', { class: 'gnav-search-results' });

    searchInput.addEventListener('input', (e) => {
      this.onSearchInput(e.target.value, searchResults, advancedLink);
    });

    searchField.append(searchInput, advancedLink);
    searchBar.append(searchField, searchResults);
    return searchBar;
  }

  loadSearch = async () => {
    if (this.onSearchInput) return;
    const gnavSearch = await import('./gnav-search.js');
    this.onSearchInput = gnavSearch.default;
  }

  decorateProfile = () => {
    const blockEl = this.body.querySelector('.profile');
    if (!blockEl) return null;
    const profileEl = createTag('div', { class: 'gnav-profile' });

    /*window.adobeid = {
      client_id: 'theblog-helix',
      scope: 'AdobeID,openid,gnav',
      locale: 'en',
      autoValidateToken: true,
      environment: this.env.ims,
      useLocalStorage: false,
      onReady: () => { this.imsReady(blockEl, profileEl); },
    };
    loadScript('https://auth.services.adobe.com/imslib/imslib.min.js');
    */
    this.imsReady(blockEl, profileEl);

    return profileEl;
  }

  imsReady = async (blockEl, profileEl) => {
    const response = await fetch(`/services/login/validate.json`);
    response.json().then((data) => {
      if (data.isLoggedIn) {
        const profile = import('./gnav-profile.js');
        profile.default(blockEl, profileEl, this.toggleMenu, ioResp);
      } else {
        this.decorateSignIn(blockEl, profileEl);
      }
    });
  }

  decorateSignIn = (blockEl, profileEl) => {
    const signIn = blockEl.querySelector('a');
    signIn.classList.add('gnav-signin');
    profileEl.append(signIn);
    profileEl.addEventListener('click', (e) => {
      e.preventDefault();
      //window.adobeIMS.signIn();
    });
  }

  /**
   * Toggles menus when clicked directly
   * @param {HTMLElement} el the element to check
   */
  toggleMenu = (el) => {
    const isSearch = el.classList.contains('gnav-search');
    const sameMenu = el === this.state.openMenu;
    if (this.state.openMenu) {
      this.closeMenu();
    }
    if (!sameMenu) {
      this.openMenu(el, isSearch);
    }
  }

  closeMenu = () => {
    this.state.openMenu.classList.remove(IS_OPEN);
    document.removeEventListener('click', this.closeOnDocClick);
    window.removeEventListener('keydown', this.closeOnEscape);
    const menuToggle = this.state.openMenu.querySelector('[aria-expanded]');
    menuToggle.setAttribute('aria-expanded', false);
    this.curtain.classList.remove(IS_OPEN);
    this.state.openMenu = null;
  }

  openMenu = (el, isSearch) => {
    el.classList.add(IS_OPEN);

    const menuToggle = el.querySelector('[aria-expanded]');
    menuToggle.setAttribute('aria-expanded', true);

    document.addEventListener('click', this.closeOnDocClick);
    window.addEventListener('keydown', this.closeOnEscape);
    if (!isSearch) {
      const desktop = window.matchMedia('(min-width: 1200px)');
      if (desktop.matches) {
        document.addEventListener('scroll', this.closeOnScroll, { passive: true });
      }
    } else {
      this.curtain.classList.add(IS_OPEN);
      el.querySelector('.gnav-search-input').focus();
    }
    this.state.openMenu = el;
  }

  toggleOnSpace = (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      const parentEl = e.target.closest('.has-Menu');
      this.toggleMenu(parentEl);
    }
  }

  closeOnScroll = () => {
    let scrolled;
    if (!scrolled) {
      if (this.state.openMenu) {
        this.toggleMenu(this.state.openMenu);
      }
      scrolled = true;
      document.removeEventListener('scroll', this.closeOnScroll);
    }
  }

  closeOnDocClick = (e) => {
    const closest = e.target.closest(`.${IS_OPEN}`);
    const isCurtain = e.target === this.curtain;
    if ((this.state.openMenu && !closest) || isCurtain) {
      this.toggleMenu(this.state.openMenu);
    }
  }

  closeOnEscape = (e) => {
    if (e.code === 'Escape') {
      this.toggleMenu(this.state.openMenu);
    }
  }
}

async function fetchGnav(url) {
  const resp = await fetch(`${url}.plain.html`);
  const html = await resp.text();
  return html;
}

export default async function init(blockEl) {
  const url = blockEl.getAttribute('data-gnav-source') || '/nav';
  if (url) {
    const html = await fetchGnav(url);
    if (html) {
      try {
        const parser = new DOMParser();
        const gnavDoc = parser.parseFromString(html, 'text/html');
        const gnav = new Gnav(gnavDoc.body, blockEl);
        gnav.init();
      } catch {
        console.log('Could not create global navigation.');
      }
    }
  }
}
