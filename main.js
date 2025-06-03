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
        const serviceModal = document.getElementById('serviceModal');
        if(modal && modal.style.display !== 'none') modal.style.display = 'none';
        if(serviceModal && serviceModal.style.display !== 'none') {
          serviceModal.style.display = 'none';
          document.body.style.overflow = '';
        }
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
      // Sprawdzenie czy formularz został wysłany
      const urlParams = new URLSearchParams(window.location.search);
      if(urlParams.get('sent') === '1') {
        alert('Dziękujemy za wiadomość! Odpowiemy w ciągu 24h.');
        // Usunięcie parametru z URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      
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
        
        // Sprawdzenie reCAPTCHA nie jest potrzebne - usunięte
        
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
        content: `
          <h4>🤖 Jak AI może zautomatyzować Twój biznes?</h4>
          
          <p><strong>Automatyzujemy powtarzalne procesy biznesowe</strong>, integrujemy systemy i eliminujemy ręczne zadania, które pochłaniają czas Twojego zespołu.</p>
          
          <h5>💼 Przykłady zastosowań:</h5>
          <ul>
            <li><strong>Automatyczne raportowanie</strong> - generowanie raportów sprzedażowych, finansowych, KPI</li>
            <li><strong>Przetwarzanie dokumentów</strong> - rozpoznawanie tekstu (OCR), kategoryzacja, archiwizacja</li>
            <li><strong>Integracje systemów</strong> - łączenie CRM, ERP, e-commerce, księgowości</li>
            <li><strong>Obsługa zamówień</strong> - automatyczne przetwarzanie, weryfikacja, wysyłka</li>
            <li><strong>Monitoring i alerty</strong> - śledzenie KPI, powiadomienia o anomaliach</li>
            <li><strong>Workflow bez udziału człowieka</strong> - kompletne procesy biznesowe on autopilot</li>
          </ul>
          
          <h5>📈 Korzyści:</h5>
          <p>• Oszczędność 40-80% czasu na rutynowych zadaniach<br>
          • Eliminacja błędów ludzkich<br>
          • 24/7 działanie bez przerw<br>
          • Zwiększenie produktywności zespołu<br>
          • Redukcja kosztów operacyjnych</p>
        `
      },
      data: {
        title: 'Analiza Danych',
        content: `
          <h4>📊 Przekształć dane w przewagę konkurencyjną</h4>
          
          <p><strong>Wydobywamy wartość z Twoich danych</strong> - od surowych informacji do strategicznych insights, które napędzają wzrost biznesu.</p>
          
          <h5>🔍 Co oferujemy:</h5>
          <ul>
            <li><strong>Analizy predykcyjne</strong> - przewidywanie trendów, zachowań klientów, popytu</li>
            <li><strong>Interaktywne dashboardy</strong> - wizualizacje w czasie rzeczywistym</li>
            <li><strong>Raporty BI</strong> - kompleksowe analizy biznesowe i KPI</li>
            <li><strong>Segmentacja klientów</strong> - identyfikacja grup docelowych i personalizacja</li>
            <li><strong>Wykrywanie anomalii</strong> - automatyczne wykrywanie problemów i szans</li>
            <li><strong>Optymalizacja procesów</strong> - analiza efektywności i rekomendacje</li>
          </ul>
          
          <h5>🎯 Przykłady zastosowań:</h5>
          <p>• <strong>E-commerce:</strong> analiza sprzedaży, rekomendacje produktów, prognozowanie zapasów<br>
          • <strong>Marketing:</strong> ROI kampanii, segmentacja, personalizacja komunikacji<br>
          • <strong>Finanse:</strong> analiza ryzyka, wykrywanie fraudów, prognozy budżetowe<br>
          • <strong>HR:</strong> analiza retencji, rekrutacja, ocena wydajności</p>
          
          <h5>💡 Efekty:</h5>
          <p>• Podejmowanie decyzji w oparciu o dane, nie intuicję<br>
          • Wzrost przychodów przez lepsze zrozumienie klientów<br>
          • Redukcja kosztów przez optymalizację procesów<br>
          • Przewaga konkurencyjna przez predykcyjność</p>
        `
      },
      solutions: {
        title: 'Dedykowane Rozwiązania',
        content: `
          <h4>🚀 Aplikacje AI szyte na miarę Twojego biznesu</h4>
          
          <p><strong>Tworzymy unikalne rozwiązania AI</strong> dopasowane do specyfiki Twojej branży i potrzeb biznesowych.</p>
          
          <h5>🛠️ Nasze specjalizacje:</h5>
          <ul>
            <li><strong>Chatboty i asystenci AI</strong> - obsługa klienta 24/7, sprzedaż, wsparcie techniczne</li>
            <li><strong>Systemy rekomendacyjne</strong> - personalizacja produktów, treści, usług</li>
            <li><strong>Rozpoznawanie obrazów</strong> - kontrola jakości, analiza zdjęć, OCR</li>
            <li><strong>Przetwarzanie języka (NLP)</strong> - analiza sentymentu, podsumowania, tłumaczenia</li>
            <li><strong>Automatyzacja obsługi klienta</strong> - klasyfikacja zgłoszeń, routing, odpowiedzi</li>
            <li><strong>Platformy predykcyjne</strong> - prognozy sprzedaży, popytu, trendów rynkowych</li>
          </ul>
          
          <h5>🏢 Przykłady branżowe:</h5>
          <p>• <strong>Retail:</strong> asystent zakupowy AI, analiza zachowań w sklepie<br>
          • <strong>Finanse:</strong> scoring kredytowy, robo-advisor, analiza ryzyka<br>
          • <strong>Medycyna:</strong> analiza obrazów medycznych, asystent diagnostyczny<br>
          • <strong>Edukacja:</strong> spersonalizowane ścieżki nauki, asystent nauczyciela<br>
          • <strong>Produkcja:</strong> predykcyjne utrzymanie ruchu, kontrola jakości AI</p>
          
          <h5>✨ Proces współpracy:</h5>
          <p>1. <strong>Analiza potrzeb</strong> - bezpłatna konsultacja i audit<br>
          2. <strong>Proof of Concept</strong> - prototyp rozwiązania<br>
          3. <strong>Rozwój MVP</strong> - minimalna wersja do testów<br>
          4. <strong>Wdrożenie</strong> - integracja z istniejącymi systemami<br>
          5. <strong>Wsparcie</strong> - konserwacja i rozwój rozwiązania</p>
        `
      }
    };

    // English service details for EN version
    const serviceDetailsEn = {
      automation: {
        title: 'Process Automation',
        content: `
          <h4>🤖 How AI can automate your business?</h4>
          
          <p><strong>We automate repetitive business processes</strong>, integrate systems and eliminate manual tasks that consume your team's time.</p>
          
          <h5>💼 Use cases:</h5>
          <ul>
            <li><strong>Automated reporting</strong> - generating sales, financial, KPI reports</li>
            <li><strong>Document processing</strong> - text recognition (OCR), categorization, archiving</li>
            <li><strong>System integrations</strong> - connecting CRM, ERP, e-commerce, accounting</li>
            <li><strong>Order processing</strong> - automatic processing, verification, shipping</li>
            <li><strong>Monitoring and alerts</strong> - tracking KPIs, anomaly notifications</li>
            <li><strong>Human-free workflow</strong> - complete business processes on autopilot</li>
          </ul>
          
          <h5>📈 Benefits:</h5>
          <p>• Save 40-80% time on routine tasks<br>
          • Eliminate human errors<br>
          • 24/7 operation without breaks<br>
          • Increase team productivity<br>
          • Reduce operational costs</p>
        `
      },
      data: {
        title: 'Data Analysis',
        content: `
          <h4>📊 Transform data into competitive advantage</h4>
          
          <p><strong>We extract value from your data</strong> - from raw information to strategic insights that drive business growth.</p>
          
          <h5>🔍 What we offer:</h5>
          <ul>
            <li><strong>Predictive analytics</strong> - forecasting trends, customer behavior, demand</li>
            <li><strong>Interactive dashboards</strong> - real-time visualizations</li>
            <li><strong>BI reports</strong> - comprehensive business analysis and KPIs</li>
            <li><strong>Customer segmentation</strong> - identifying target groups and personalization</li>
            <li><strong>Anomaly detection</strong> - automatic problem and opportunity detection</li>
            <li><strong>Process optimization</strong> - efficiency analysis and recommendations</li>
          </ul>
          
          <h5>🎯 Industry examples:</h5>
          <p>• <strong>E-commerce:</strong> sales analysis, product recommendations, inventory forecasting<br>
          • <strong>Marketing:</strong> campaign ROI, segmentation, communication personalization<br>
          • <strong>Finance:</strong> risk analysis, fraud detection, budget forecasts<br>
          • <strong>HR:</strong> retention analysis, recruitment, performance evaluation</p>
          
          <h5>💡 Results:</h5>
          <p>• Data-driven decision making, not intuition<br>
          • Revenue growth through better customer understanding<br>
          • Cost reduction through process optimization<br>
          • Competitive advantage through predictiveness</p>
        `
      },
      solutions: {
        title: 'Custom Solutions',
        content: `
          <h4>🚀 AI applications tailored to your business</h4>
          
          <p><strong>We create unique AI solutions</strong> adapted to your industry specifics and business needs.</p>
          
          <h5>🛠️ Our specializations:</h5>
          <ul>
            <li><strong>Chatbots and AI assistants</strong> - 24/7 customer service, sales, technical support</li>
            <li><strong>Recommendation systems</strong> - personalization of products, content, services</li>
            <li><strong>Image recognition</strong> - quality control, photo analysis, OCR</li>
            <li><strong>Natural language processing (NLP)</strong> - sentiment analysis, summaries, translations</li>
            <li><strong>Customer service automation</strong> - ticket classification, routing, responses</li>
            <li><strong>Predictive platforms</strong> - sales forecasts, demand, market trends</li>
          </ul>
          
          <h5>🏢 Industry examples:</h5>
          <p>• <strong>Retail:</strong> AI shopping assistant, in-store behavior analysis<br>
          • <strong>Finance:</strong> credit scoring, robo-advisor, risk analysis<br>
          • <strong>Healthcare:</strong> medical image analysis, diagnostic assistant<br>
          • <strong>Education:</strong> personalized learning paths, teacher assistant<br>
          • <strong>Manufacturing:</strong> predictive maintenance, AI quality control</p>
          
          <h5>✨ Collaboration process:</h5>
          <p>1. <strong>Needs analysis</strong> - free consultation and audit<br>
          2. <strong>Proof of Concept</strong> - solution prototype<br>
          3. <strong>MVP development</strong> - minimum version for testing<br>
          4. <strong>Implementation</strong> - integration with existing systems<br>
          5. <strong>Support</strong> - maintenance and solution development</p>
        `
      }
    };

    // Delegacja eventów na przyciski usług
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
      servicesGrid.addEventListener('click', function(e) {
        const btn = e.target.closest('.service-more-btn');
        if (btn && btn.dataset.service) {
          // Detect language from page
          const isEnglish = document.documentElement.lang === 'en';
          const details = isEnglish ? serviceDetailsEn : serviceDetails;
          
          if (details[btn.dataset.service]) {
            serviceModalContent.innerHTML = `<h2 style='margin-top:0;color:#2c3e50;font-size:1.3rem;text-align:center;'>${details[btn.dataset.service].title}</h2>${details[btn.dataset.service].content}`;
            serviceModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
          }
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
