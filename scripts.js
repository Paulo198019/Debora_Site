
(function () {
  function trackWhatsAppClicks() {
    var links = document.querySelectorAll('a[href*="wa.me/"], a[href*="api.whatsapp.com/"]');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        if (typeof gtag === 'function') {
          gtag('event', 'conversion', { 'send_to': 'AW-17797944136/_IJJCNf          gtag('event', 'conversion', { 'send_to': 'AW-17797944136/_IJJCNfyi9AbEMim3KZC' });
        }
      });
    });
  }
  document.addEventListener('DOMContentLoaded', trackWhatsAppClicks);
