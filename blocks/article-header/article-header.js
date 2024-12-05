import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the article header
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const articleHeaderHtml = `
  <div class="component react article-header" data-header-type="standard-article" data-media-type="text-pdf" data-title="LATAM Economies: Soft Landings, Not Recessions" data-article-time="06:00" data-article-date="2024-11-14" data-article-banner-image="/content/dam/cmegroup/insights/images/2024/latam-economies-soft-landings-not-recessions-1440x500.jpg" data-article-label="CME Group Standard Article" data-ata-glance-items="[]" data-author-tags="[&#34;erik-norland&#34;]" data-aspect-ratio="16:9" data-path="/content/cmegroup/en/insights/economic-research/2024/latam-economies-soft-landings-not-recessions" data-featured-tag="Interest Rates" data-hide-right-rail="false">
  <div path="main-section">

  
  <div class="cmp cmp-text">
<div class="component react text">
  <div path="text">
    
      <p>In 2021 and 2022, four key Latin American central banks undertook one of the most dramatic policy tightenings seen anywhere in the world in recent years. Banco Central de Chile and Banco Central de Colombia each raised rates by 11.5%, while Banco Central do Brasil raised rates by 11.75%. Banco de México hiked rates by 7.5%, less than its peers but much more than the increases by the Federal Reserve (Fed), European Central Bank (ECB) or Bank of England (BoE) that would come later (Figure 1). What’s more is that the tightening cycle across LATAM came 12 months before central banks up north began tightening policy. Likewise, LATAM’s tightening cycle gave way to a substantial policy easing in 2023 that preceded rate cuts in the U.S. and Europe by roughly one year. </p>

    
  </div>
</div>

</div>

<div class="component title">
  <h4 id="figure-1-since-2020-latam-central-banks-have-been-the-leaders-on-the-way-up-and-on-the-way-down" class="title-text none  ">
    
      Figure 1: Since 2020, LATAM central banks have been the leaders on the way up and on the way down
      
    
  </h4>
</div>
<div class="component react image" data-is-edit="false" data-img-style="lightbox" data-img-border="false" data-img-src="content/dam/cmegroup/insights/images/2024/latam-economies-soft-landings-not-recessions-fig01.avif" data-img-alt="Figure 1: Since 2020, LATAM central banks have been the leaders on the way up and on the way down" data-img-decorative="false" data-default-img-width="940" data-default-img-height="600" data-img-zoom-icon="default" data-img-caption="Source: Bloomberg Professional (&lt;span style=&#34;color:#00E473&#34;>BZSTSETA&lt;/span>, &lt;span style=&#34;color:#112B4A&#34;>CHOVCHOV&lt;/span>, &lt;span style=&#34;color:#25A9E0&#34;>CORRRMIN&lt;/span>, &lt;span style=&#34;color:#006EB6&#34;>MXONBR&lt;/span>, FDTRMID)" data-image-margin="crmb-3" data-slider="false" data-path="/content/cmegroup/en/insights/economic-research/2024/latam-economies-soft-landings-not-recessions/jcr:content/article-header/main-section/image">
</div>

</div>
  <div path="right-rail">

  
  
  

</div>
  
</div>

  `;
  block.innerHTML = articleHeaderHtml;
}