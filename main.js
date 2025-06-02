// main.js - Zmodernizowany dla nowego designu

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

// Initialize when DOM is ready
(function() {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  
  ready(function() {
    // Cookie consent
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
    
    // Fade-in animations for sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.15 });
    
    document.querySelectorAll('.section, .service-card, .project-card').forEach(el => {
      observer.observe(el);
    });
    
    // Scroll to top button
    const scrollBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', function() {
      if(window.scrollY > 300) {
        scrollBtn.style.display = 'block';
      } else {
        scrollBtn.style.display = 'none';
      }
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
      openBtn.addEventListener('click', () => { 
        modal.style.display = 'flex'; 
      });
      
      closeBtn.addEventListener('click', () => { 
        modal.style.display = 'none'; 
      });
      
      window.addEventListener('click', (e) => { 
        if(e.target === modal) modal.style.display = 'none'; 
      });
    }
    
    // Modal kontaktowy: zamykanie ESC
    window.addEventListener('keydown', function(e) {
      if(e.key === 'Escape') {
        const modal = document.getElementById('contactModal');
        if(modal && modal.style.display !== 'none') modal.style.display = 'none';
      }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Walidacja formularza kontaktowego
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
      contactForm.addEventListener('submit', function(e) {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let valid = true;
        let errorMsg = '';
        
        if(!name.value.trim()) { 
          valid = false; 
          errorMsg += 'Podaj imię i nazwisko.\n'; 
        }
        
        if(!email.value.match(/^\S+@\S+\.\S+$/)) { 
          valid = false; 
          errorMsg += 'Podaj poprawny e-mail.\n'; 
        }
        
        if(!message.value.trim()) { 
          valid = false; 
          errorMsg += 'Opisz swój projekt.\n'; 
        }
        
        // Sprawdzenie reCAPTCHA
        if(typeof grecaptcha !== 'undefined' && grecaptcha.getResponse().length === 0) {
          valid = false; 
          errorMsg += 'Potwierdź, że nie jesteś robotem (reCAPTCHA).\n';
        }
        
        if(!valid) {
          alert(errorMsg);
          e.preventDefault();
        }
      });
    }
    
    // Obsługa modali usług (Dowiedz się więcej) – delegacja eventów zgodna z CSP
    const serviceModal = document.getElementById('serviceModal');
    const serviceModalContent = document.getElementById('serviceModalContent');
    const closeServiceModalBtn = document.getElementById('closeServiceModal');

    const serviceDetails = {
      automation: {
        title: 'Automatyzacja Procesów',
        content: `<p>Automatyzujemy powtarzalne procesy biznesowe, integrujemy systemy i eliminujemy ręczne zadania. Przykłady: automatyczne raportowanie, obsługa dokumentów, integracje API, workflow bez udziału człowieka.</p>`
      },
      data: {
        title: 'Analiza Danych',
        content: `<p>Wydobywamy wartość z Twoich danych: analizy predykcyjne, wizualizacje, dashboardy, raporty BI, segmentacja klientów, wykrywanie anomalii, wsparcie decyzji zarządczych.</p>`
      },
      solutions: {
        title: 'Dedykowane Rozwiązania',
        content: `<p>Tworzymy aplikacje AI szyte na miarę: chatboty, systemy rekomendacyjne, rozpoznawanie obrazów, NLP, automatyzacja obsługi klienta, personalizacja usług.</p>`
      }
    };

    // Delegacja eventów na przyciski usług
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
      servicesGrid.addEventListener('click', function(e) {
        const btn = e.target.closest('.service-more-btn');
        if (btn && btn.dataset.service && serviceDetails[btn.dataset.service]) {
          serviceModalContent.innerHTML = `<h2 style='margin-top:0;color:#2c3e50;font-size:1.3rem;text-align:center;'>${serviceDetails[btn.dataset.service].title}</h2>${serviceDetails[btn.dataset.service].content}`;
          serviceModal.style.display = 'block';
          document.body.style.overflow = 'hidden';
        }
      });
    }
    if (closeServiceModalBtn && serviceModal) {
      closeServiceModalBtn.onclick = function() {
        serviceModal.style.display = 'none';
        document.body.style.overflow = '';
      };
      window.addEventListener('click', function(event) {
        if (event.target === serviceModal) {
          serviceModal.style.display = 'none';
          document.body.style.overflow = '';
        }
      });
    }
    
  });
})();
