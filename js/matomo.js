/* ============================================================
   anthill.hk — Matomo Analytics
   Site ID: 4
   ============================================================
   To change site ID, edit MATOMO_SITE_ID below.
   ============================================================ */

(function () {
  'use strict';

  window._paq = window._paq || [];

  window._paq.push(['setDocumentTitle', document.domain + '/' + document.title]);
  window._paq.push(['setCookieDomain', '*.anthill.hk']);
  window._paq.push(['setDomains', ['*.anthill.hk', '*.www.anthill.hk']]);
  window._paq.push(['enableCrossDomainLinking']);
  window._paq.push(['trackPageView']);
  window._paq.push(['enableLinkTracking']);

  var u = 'https://matomo.matumi.anthill.hk/';
  window._paq.push(['setTrackerUrl', u + 'matomo.php']);
  window._paq.push(['setSiteId', '4']);

  var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
  g.async = true;
  g.src = u + 'matomo.js';
  s.parentNode.insertBefore(g, s);
})();
