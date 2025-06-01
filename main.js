// main.js
// Cookie consent logic
function loadAnalytics() {
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-H59TGC7RZH';
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-H59TGC7RZH');
}
function showCookieBanner() {
  document.getElementById('cookieBanner').style.display = 'block';
}
function hideCookieBanner() {
  document.getElementById('cookieBanner').style.display = 'none';
}
(function() {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function() {
    var consent = localStorage.getItem('cookieConsent');
    if(consent === 'accepted') {
      loadAnalytics();
    } else if(consent === 'declined') {
      // nie ładuj Analytics
    } else {
      showCookieBanner();
    }
    document.getElementById('cookieAccept').onclick = function() {
      localStorage.setItem('cookieConsent', 'accepted');
      hideCookieBanner();
      loadAnalytics();
    };
    document.getElementById('cookieDecline').onclick = function() {
      localStorage.setItem('cookieConsent', 'declined');
      hideCookieBanner();
    };
  });
})();
// Animacje fade-in sekcji
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.section, .projects .project-card').forEach(el => observer.observe(el));
// Sticky navbar
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.navbar');
  if(window.scrollY > 30) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
// Scroll to top button
const scrollBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', function() {
  if(window.scrollY > 200) scrollBtn.style.display = 'block';
  else scrollBtn.style.display = 'none';
});
if(scrollBtn) {
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
// Modal kontaktowy
const modal = document.getElementById('contactModal');
const openBtn = document.getElementById('openContactModal');
const closeBtn = document.getElementById('closeModal');
if(openBtn && modal && closeBtn) {
  openBtn.addEventListener('click', () => { modal.style.display = 'flex'; });
  closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });
}
// Modal kontaktowy: zamykanie ESC
window.addEventListener('keydown', function(e) {
  if(e.key === 'Escape') {
    const modal = document.getElementById('contactModal');
    if(modal && modal.style.display !== 'none') modal.style.display = 'none';
  }
});
// Walidacja formularza kontaktowego po stronie JS
const contactForm = document.getElementById('contactForm');
if(contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let valid = true;
    let errorMsg = '';
    if(!name.value.trim()) { valid = false; errorMsg += 'Podaj imię.\n'; }
    if(!email.value.match(/^\S+@\S+\.\S+$/)) { valid = false; errorMsg += 'Podaj poprawny e-mail.\n'; }
    if(!message.value.trim()) { valid = false; errorMsg += 'Wpisz wiadomość.\n'; }
    // Sprawdzenie reCAPTCHA
    if(typeof grecaptcha !== 'undefined' && grecaptcha.getResponse().length === 0) {
      valid = false; errorMsg += 'Potwierdź, że nie jesteś robotem (reCAPTCHA).\n';
    }
    if(!valid) {
      alert(errorMsg);
      e.preventDefault();
    }
  });
}
