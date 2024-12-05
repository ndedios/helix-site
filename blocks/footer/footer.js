import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  /*const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);*/

  const footerHtml = `
  <div class="content-reference">


  
    
    
    
  
  
  
  
    
    
    

    
    

    



<div class="xf-content-height">
    




    
    
    
  
  <div data-component-id="95f23c09" class="component section footer-style    " style="background-color: rgba(0,0,0,0);" aria-label="Section" data-path-id="95f23c09">
    
    <div class="container   ">

  
  

<div class="row  justify-content-start ">
  <div class="col-md">

  
  <div class="component react collapsible" data-is-edit="false" data-title="company" data-collapse-at="small" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/company/about-us.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;About Us&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/company/corporate-citizenship/esg.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;ESG&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/media-room.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Media Room&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/careers.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Careers&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;http://investor.cmegroup.com/&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Investor Relations&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/tools-information/contacts-list.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Contact Us&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>
<div class="col-md">

  
  <div class="component react collapsible" data-is-edit="false" data-title="international" data-collapse-at="small" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/company/history/global-offices.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Global Offices&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/international&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Partner Exchanges&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/international/latin-america.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Latin America&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/international/emea.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Europe, Middle East &amp; Africa&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/international/asia-pacific.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Asia-Pacific&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>
<div class="col-md">

  
  <div class="component react collapsible" data-is-edit="false" data-title="MARKET REGULATION" data-collapse-at="small" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/market-regulation.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Overview&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-regulation/rulebook.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Rulebooks&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/rulebook/rulebook-harmonization.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Regulatory Guidance&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-regulation/rule-filings.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Rule Filings&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/market-regulation/outreach.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;Regulatory Outreach&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>
<div class="col-md">

  
  <div class="component react collapsible" data-is-edit="false" data-title="OUR EXCHANGES " data-collapse-at="small" data-list-style="default-list" data-links="[{&#34;linkUrl&#34;:&#34;/company/cme.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;CME&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/company/cbot.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;CBOT&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/company/nymex.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;NYMEX&#34;,&#34;code&#34;:null},{&#34;linkUrl&#34;:&#34;/company/comex.html&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:false,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;COMEX&#34;,&#34;code&#34;:null}]">
</div>

  




    


  

</div>

</div>


<div class="row  justify-content-start ">
  <div class="col-sm">

  
  
<div class="component social-icons">
  <ul class="social-icons-list">
    <li class="social-icons-item">
      <a class="social-link" href="https://www.youtube.com/user/cmegroup" target="_blank" rel="noopener">
        <img class="social-icon" src="/images/common/icons/youtube.svg" alt="YouTube" width="40" height="40" loading="lazy"/>
      </a>
    </li>
  
    <li class="social-icons-item">
      <a class="social-link" href="http://twitter.com/CMEGroup" target="_blank" rel="noopener">
        <img class="social-icon" src="/images/common/icons/twitter.svg" alt="Twitter" width="40" height="40" loading="lazy"/>
      </a>
    </li>
  
    <li class="social-icons-item">
      <a class="social-link" href="http://www.facebook.com/CMEGroup" target="_blank" rel="noopener">
        <img class="social-icon" src="/images/common/icons/facebook.svg" alt="Facebook" width="40" height="40" loading="lazy"/>
      </a>
    </li>
  
    <li class="social-icons-item">
      <a class="social-link" href="http://www.linkedin.com/company/cme-group" target="_blank" rel="noopener">
        <img class="social-icon" src="/images/common/icons/linkedin.svg" alt="LinkedIn" width="40" height="40" loading="lazy"/>
      </a>
    </li>
  
    <li class="social-icons-item">
      <a class="social-link" href="http://instagram.com/cmegroup" target="_blank" rel="noopener">
        <img class="social-icon" src="/images/common/icons/instagram.svg" alt="Instagram" width="40" height="40" loading="lazy"/>
      </a>
    </li>
  
    <li class="social-icons-item">
      <a class="social-link" href="http://www.cmegroup.com/rss/" target="_blank" rel="noopener">
        <img class="social-icon" src="/images/common/icons/rss.svg" alt="Rss" width="40" height="40" loading="lazy"/>
      </a>
    </li>
  </ul>
</div>

  

</div>
<div class="col-sm-2">

  
  <div class="component react language-selector" data-is-edit="false" data-links="[{&#34;linkUrl&#34;:&#34;/&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:null,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;en&#34;,&#34;label&#34;:&#34;English&#34;},{&#34;linkUrl&#34;:&#34;/cn-s/&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:null,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;zh_cn&#34;,&#34;label&#34;:&#34;中文(简体)&#34;},{&#34;linkUrl&#34;:&#34;/cn-t/&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:null,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;zh_hk&#34;,&#34;label&#34;:&#34;中文(繁體)&#34;},{&#34;linkUrl&#34;:&#34;/ko/&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:null,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;ko&#34;,&#34;label&#34;:&#34;한국어&#34;},{&#34;linkUrl&#34;:&#34;/ja/&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:null,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;ja&#34;,&#34;label&#34;:&#34;日本語&#34;},{&#34;linkUrl&#34;:&#34;/pt/&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:null,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;pt&#34;,&#34;label&#34;:&#34;Português&#34;},{&#34;linkUrl&#34;:&#34;/es/&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:null,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;es&#34;,&#34;label&#34;:&#34;Español&#34;},{&#34;linkUrl&#34;:&#34;/de/&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:null,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;de&#34;,&#34;label&#34;:&#34;Deutsch&#34;},{&#34;linkUrl&#34;:&#34;/it/&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:null,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;it&#34;,&#34;label&#34;:&#34;Italiano&#34;},{&#34;linkUrl&#34;:&#34;/fr/&#34;,&#34;linkTarget&#34;:null,&#34;linkDownload&#34;:null,&#34;linkNoFollow&#34;:null,&#34;text&#34;:&#34;fr&#34;,&#34;label&#34;:&#34;Français&#34;}]" data-current-language="en">
</div>






    


  

</div>

</div>

    


  

</div>
  </div>



    
    
    
  
  <div data-component-id="f781d3a5" class="component section disclaimer-style reverse    " style="background-color: #3A464F;" aria-label="Section" data-path-id="f781d3a5">
    
    <div class="container   ">

  
  <div class="component react feedback-form"></div>



<div class="row  no-gutters justify-content-start ">
  <div class="col-md-9; padding-y:40px">

  
  <div class="cmp cmp-text">
<div class="component react text">
  <div path="text">
    
      <p id="disclaimerText">CME Group is the world’s leading derivatives marketplace. The company is comprised of four Designated Contract Markets (DCMs). <br />
Further information on each exchange's rules and product listings can be found by clicking on the links to <a href="/company/cme.html">CME</a>, <a href="/company/cbot.html">CBOT</a>, <a href="/company/nymex.html">NYMEX</a> and <a href="/company/comex.html">COMEX</a>.</p>

    
  </div>
</div>

    


  



</div>

  

</div>

</div>


<div class="row  justify-content-start crmb-4 ">
  <div class="col-md-3">

  
  <div class="cmp cmp-text">
<div class="component react text">
  <div path="text">
    
      <p>© 2024 CME Group Inc. All rights reserved.</p>

    
  </div>
</div>

    


  



</div>

  

</div>
<div class="col-md-9">

  
  <div class="cmp cmp-text">
<div class="component react text">
  <div path="text">
    
      <p><a href="/disclaimer.html">Disclaimer</a>  |  <a href="/privacy-policy.html">Privacy Notice</a>  |  <a href="/cookie-policy.html">Cookie Notice</a>  |  <a href="/files/terms-of-use.pdf">Terms of Use</a>  |  <a href="/trading/market-data-explanation-disclaimer.html">Data Terms of Use</a>  |  <a href="/investor-relations/files/statement-on-modern-slavery.pdf">Modern Slavery Act Transparency Statement</a>  |  <a title="Report a Security Concern" href="/report-a-security-concern.html">Report a Security Concern</a></p>

    
  </div>
</div>

    


  



</div>

  

</div>

</div>

  

</div>
  </div>




</div>

  


  

</div>
  `;
  block.innerHTML = footerHtml;
}
