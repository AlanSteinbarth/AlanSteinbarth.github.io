// VictoryMind.ai - Apple MacBook Pro Style JavaScript
// Advanced scroll animations, parallax effects, and interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== APPLE-STYLE SUBTLE PARALLAX ==========
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5; // Very subtle - Apple style
        const heroVideo = document.querySelector('.hero-bg');
        const heroContent = document.querySelector('.hero-content');
        
        if (heroVideo && scrolled < window.innerHeight) {
            // Background video moves slower (creates depth)
            heroVideo.style.transform = `translate(-50%, -50%) translateY(${rate}px)`;
        }
        
        if (heroContent && scrolled < window.innerHeight) {
            // Content moves at normal speed with slight offset
            const contentRate = scrolled * -0.1;
            heroContent.style.transform = `translateY(${contentRate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Apple-style smooth parallax with performance optimization
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // ========== APPLE-STYLE SCROLL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Sequential animation for children
                const children = entry.target.querySelectorAll('.fade-in');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Initialize scroll animations for all fade-in elements
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .service-card, .process-step, .project-card, .about-container');
        
        animatedElements.forEach((element, index) => {
            // Add initial animation classes
            element.style.opacity = '0';
            element.style.transform = 'translateY(40px)';
            
            observer.observe(element);
        });

        // Special handling for hero elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelectorAll('.hero-cta .btn');
        
        // Hero entrance animation
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }
        }, 300);
        
        setTimeout(() => {
            if (heroSubtitle) {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }
        }, 600);
        
        heroButtons.forEach((btn, index) => {
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 900 + (index * 150));
        });
    }

    // ========== PARALLAX EFFECTS - Apple Style ==========
    function initParallaxEffects() {
        const heroVideo = document.querySelector('.hero-bg');
        const sections = document.querySelectorAll('.section');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Hero video parallax
            if (heroVideo && scrolled < window.innerHeight) {
                heroVideo.style.transform = `translate(-50%, -50%) translateY(${rate}px)`;
            }
            
            // Section elements parallax
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const speed = 0.1;
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = -(rect.top * speed);
                    section.style.transform = `translateY(${yPos}px)`;
                }
            });
        });
    }

    // ========== NAVIGATION EFFECTS - Apple Style ==========
    function initNavigationEffects() {
        const nav = document.querySelector('.nav');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Navigation background opacity based on scroll
            const opacity = Math.min(scrollTop / 100, 1);
            nav.style.background = `rgba(29, 29, 31, ${0.72 + (opacity * 0.28)})`;
            
            // Hide/show navigation on scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========== BUTTON INTERACTIONS - Apple Style ==========
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Ripple effect on click
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            // Magnetic effect on hover
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-1px)`;
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // ========== CARD HOVER EFFECTS - Apple Style ==========
    function initCardEffects() {
        const cards = document.querySelectorAll('.service-card, .project-card, .process-step');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // ========== MODAL SYSTEM - Apple Style ==========
    function initModalSystem() {
        // Service modals
        window.openServiceModal = function(service) {
            const modal = document.getElementById('serviceModal');
            const content = document.getElementById('modalContent');
            
            const serviceContent = {
                'ai-development': {
                    title: 'Rozwój AI',
                    content: `
                        <h3>Zaawansowane systemy sztucznej inteligencji</h3>
                        <p>Projektujemy i wdrażamy kompleksowe rozwiązania AI dostosowane do specyfiki Twojej branży:</p>
                        <ul>
                            <li>Systemy rekomendacyjne</li>
                            <li>Przetwarzanie języka naturalnego (NLP)</li>
                            <li>Rozpoznawanie obrazów i dźwięku</li>
                            <li>Predykcyjne modele biznesowe</li>
                            <li>Chatboty i asystenci wirtualni</li>
                        </ul>
                        <p><strong>Technologie:</strong> TensorFlow, PyTorch, OpenAI, Hugging Face</p>
                    `
                },
                'machine-learning': {
                    title: 'Machine Learning',
                    content: `
                        <h3>Inteligentne modele uczenia maszynowego</h3>
                        <p>Budujemy modele ML, które uczą się z Twoich danych:</p>
                        <ul>
                            <li>Analiza predykcyjna i prognostyczna</li>
                            <li>Klasyfikacja i segmentacja danych</li>
                            <li>Optymalizacja procesów biznesowych</li>
                            <li>Wykrywanie anomalii i fraudu</li>
                            <li>Personalizacja doświadczeń użytkownika</li>
                        </ul>
                        <p><strong>Technologie:</strong> Scikit-learn, XGBoost, Random Forest, Neural Networks</p>
                    `
                },
                'automation': {
                    title: 'Automatyzacja',
                    content: `
                        <h3>Inteligentna automatyzacja procesów</h3>
                        <p>Automatyzujemy powtarzalne zadania i optymalizujemy przepływy pracy:</p>
                        <ul>
                            <li>RPA (Robotic Process Automation)</li>
                            <li>Automatyzacja przepływów dokumentów</li>
                            <li>Inteligentne systemy zarządzania</li>
                            <li>Automatyczne raportowanie</li>
                            <li>Integracja systemów IT</li>
                        </ul>
                        <p><strong>Technologie:</strong> Python, UiPath, Power Automate, API Integration</p>
                    `
                }
            };
            
            if (serviceContent[service]) {
                content.innerHTML = serviceContent[service].content;
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        };
        
        window.closeServiceModal = function() {
            const modal = document.getElementById('serviceModal');
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        };
        
        // Success modal
        window.closeSuccessModal = function() {
            const modal = document.getElementById('successModal');
            modal.classList.add('hidden');
        };
        
        // Close modals on background click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // ========== NATIVE SHARE API ==========
    window.shareNative = function() {
        if (navigator.share) {
            navigator.share({
                title: 'VictoryMind.ai - Sztuczna Inteligencja dla Biznesu',
                text: 'Sprawdź nowoczesne rozwiązania AI dla Twojego biznesu',
                url: window.location.href
            });
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link skopiowany do schowka!');
        }
    };

    // ========== FORM ENHANCEMENTS ==========
    function initFormEnhancements() {
        const form = document.querySelector('.contact-form');
        const inputs = document.querySelectorAll('.form-input, .form-textarea');
        
        // Floating label effect
        inputs.forEach(input => {
            const label = input.previousElementSibling;
            
            input.addEventListener('focus', () => {
                label.style.transform = 'translateY(-20px) scale(0.8)';
                label.style.color = 'var(--color-accent-blue)';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.transform = '';
                    label.style.color = '';
                }
            });
        });
        
        // Form submission success detection
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('sent') === '1') {
            document.getElementById('successModal').classList.remove('hidden');
        }
    }

    // ========== SMOOTH PERFORMANCE ==========
    function optimizePerformance() {
        // Throttle scroll events
        let ticking = false;
        
        function updateOnScroll() {
            // This will run at most once per frame
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        });
        
        // Lazy load images
        const images = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ========== APPLE-STYLE INTERACTIVE TABS ==========
    function initShowcaseTabs() {
        const tabs = document.querySelectorAll('.showcase-tab');
        const content = document.querySelector('.showcase-content');
        
        // Detect language
        const isEnglish = document.documentElement.lang === 'en';
        
        const tabContent = isEnglish ? {
            automation: {
                title: 'Business process automation',
                description: 'Our AI solutions automate routine tasks, allowing your team to focus on strategic decisions. Intelligent algorithms learn from data and adapt processes in real-time.',
                features: [
                    'Automatic document processing',
                    'Intelligent workflows',
                    'Predictive resource planning'
                ]
            },
            analytics: {
                title: 'Advanced data analytics',
                description: 'We transform raw data into actionable insights. Our analytics tools use machine learning to discover hidden patterns and predict business trends.',
                features: [
                    'Predictive modeling',
                    'Real-time analytics',
                    'Interactive dashboards'
                ]
            },
            'ai-models': {
                title: 'Dedicated artificial intelligence models',
                description: 'We create and deploy personalized AI models tailored to your business specifics. From NLP to computer vision - we build solutions that really work.',
                features: [
                    'Custom AI models',
                    'Model fine-tuning',
                    'Enterprise deployment'
                ]
            }
        } : {
            automation: {
                title: 'Automatyzacja procesów biznesowych',
                description: 'Nasze rozwiązania AI automatyzują rutynowe zadania, pozwalając zespołowi skupić się na strategicznych decyzjach. Inteligentne algorytmy uczą się z danych i dostosowują procesy w czasie rzeczywistym.',
                features: [
                    'Automatyczne przetwarzanie dokumentów',
                    'Inteligentne workflow',
                    'Predykcyjne planowanie zasobów'
                ]
            },
            analytics: {
                title: 'Zaawansowana analityka danych',
                description: 'Przekształcamy surowe dane w actionable insights. Nasze narzędzia analityczne wykorzystują machine learning do odkrywania ukrytych wzorców i przewidywania trendów biznesowych.',
                features: [
                    'Predykcyjne modelowanie',
                    'Real-time analytics',
                    'Interaktywne dashboardy'
                ]
            },
            'ai-models': {
                title: 'Dedykowane modele sztucznej inteligencji',
                description: 'Tworzymy i wdrażamy spersonalizowane modele AI dopasowane do specyfiki Twojego biznesu. Od NLP po computer vision - budujemy rozwiązania które rzeczywiście działają.',
                features: [
                    'Custom AI models',
                    'Model fine-tuning',
                    'Enterprise deployment'
                ]
            }
        };
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active to clicked tab
                tab.classList.add('active');
                
                // Get tab data
                const tabKey = tab.dataset.tab;
                const data = tabContent[tabKey];
                
                // Update content with smooth transition
                if (content && data) {
                    content.style.opacity = '0.5';
                    content.setAttribute('data-active', tabKey);
                    
                    setTimeout(() => {
                        const title = content.querySelector('.showcase-title');
                        const description = content.querySelector('.showcase-description');
                        const featureList = content.querySelector('.feature-list');
                        
                        if (title) title.textContent = data.title;
                        if (description) description.textContent = data.description;
                        
                        if (featureList) {
                            featureList.innerHTML = data.features
                                .map(feature => `<li>${feature}</li>`)
                                .join('');
                        }
                        
                        content.style.opacity = '1';
                    }, 200);
                }
            });
        });
    }

    // ========== ENHANCED STAT ANIMATIONS ==========
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalText = element.textContent;
                    
                    // Extract number and suffix
                    const match = finalText.match(/^(\d+(?:\.\d+)?)(.*)/);
                    if (match) {
                        const finalNumber = parseFloat(match[1]);
                        const suffix = match[2];
                        
                        // Animate from 0 to final number
                        let currentNumber = 0;
                        const increment = finalNumber / 60; // 1 second at 60fps
                        
                        const animate = () => {
                            currentNumber += increment;
                            if (currentNumber >= finalNumber) {
                                element.textContent = finalText;
                                return;
                            }
                            
                            element.textContent = Math.floor(currentNumber) + suffix;
                            requestAnimationFrame(animate);
                        };
                        
                        animate();
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }

    // ========== INITIALIZE ALL EFFECTS ==========
    initScrollAnimations();
    initParallaxEffects();
    initNavigationEffects();
    initButtonEffects();
    initCardEffects();
    initModalSystem();
    initFormEnhancements();
    initShowcaseTabs();
    animateStats();
    optimizePerformance();
    
    console.log('🍎 Apple-style effects initialized!');
});

// ========== CSS INJECTION FOR EFFECTS ==========
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .hero-title,
    .hero-subtitle,
    .hero-cta .btn {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .service-card,
    .project-card,
    .process-step {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(styleSheet);
