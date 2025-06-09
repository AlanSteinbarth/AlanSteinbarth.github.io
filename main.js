// VictoryMind.ai - Apple MacBook Pro Style Animations
// EFEKT #1: Scroll-triggered Animations

document.addEventListener('DOMContentLoaded', function() {
    // ========== SCROLL-TRIGGERED ANIMATIONS ==========
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    function initScrollAnimations() {
        // Hero elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelectorAll('.hero-cta .btn');
        
        if (heroTitle) {
            heroTitle.classList.add('animate-fade-up');
            observer.observe(heroTitle);
        }
        
        if (heroSubtitle) {
            heroSubtitle.classList.add('animate-fade-up', 'animate-delay-200');
            observer.observe(heroSubtitle);
        }
        
        heroButtons.forEach((btn, index) => {
            btn.classList.add('animate-fade-up', `animate-delay-${400 + (index * 100)}`);
            observer.observe(btn);
        });

        // Service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.classList.add('animate-slide-up', `animate-delay-${index * 150}`);
            observer.observe(card);
        });

        // About section
        const aboutElements = document.querySelectorAll('.about-content > *');
        aboutElements.forEach((element, index) => {
            element.classList.add('animate-fade-up', `animate-delay-${index * 100}`);
            observer.observe(element);
        });

        // Contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.classList.add('animate-slide-up');
            observer.observe(contactForm);
        }

        // Section headings
        const sectionHeadings = document.querySelectorAll('h2, .section-title');
        sectionHeadings.forEach(heading => {
            heading.classList.add('animate-fade-up');
            observer.observe(heading);
        });
    }

    // Initialize scroll animations
    initScrollAnimations();

    // ========== EFEKT #2: SCROLL PROGRESS INDICATOR ==========
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.transform = `scaleX(${scrolled / 100})`;
        });
    }

    // ========== EFEKT #3: TEXT REVEAL ANIMATIONS ==========
    function initTextReveal() {
        const textElements = document.querySelectorAll('.hero-title, .section-title');
        
        textElements.forEach(element => {
            const text = element.textContent;
            const words = text.split(' ');
            element.innerHTML = '';
            
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.className = 'word';
                span.style.setProperty('--delay', `${index * 0.1}s`);
                span.textContent = word + ' ';
                element.appendChild(span);
            });
            
            element.classList.add('text-reveal');
            observer.observe(element);
        });
    }

    // ========== EFEKT #4: MAGNETIC HOVER EFFECTS ==========
    function initMagneticHover() {
        const magneticElements = document.querySelectorAll('.btn, .service-card, .project-card');
        
        magneticElements.forEach(element => {
            element.classList.add('magnetic');
            
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // ========== EFEKT #5: PARALLAX HERO EFFECT ==========
    function initParallaxHero() {
        const heroVideo = document.querySelector('.hero-bg');
        const heroContent = document.querySelector('.hero-content');
        
        if (heroVideo && heroContent) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxVideo = scrolled * 0.5;
                const parallaxContent = scrolled * 0.3;
                
                heroVideo.style.transform = `translateY(${parallaxVideo}px)`;
                heroContent.style.transform = `translateY(${parallaxContent}px)`;
            });
        }
    }

    // ========== EFEKT #6: INTERACTIVE 3D CARDS ==========
    function initInteractiveCards() {
        const cards = document.querySelectorAll('.service-card, .project-card, .blog-card');
        
        cards.forEach(card => {
            card.classList.add('interactive-card');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.setProperty('--rotate-x', `${rotateX}deg`);
                card.style.setProperty('--rotate-y', `${rotateY}deg`);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--rotate-x', '0deg');
                card.style.setProperty('--rotate-y', '0deg');
            });
        });
    }

    // ========== EFEKT #7: GLASSMORPHISM ENHANCEMENT ==========
    function initGlassmorphism() {
        const glassElements = document.querySelectorAll('.nav, .service-card, .contact-form');
        
        glassElements.forEach(element => {
            element.classList.add('glass-effect');
            
            // Dynamic glass intensity based on scroll
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const intensity = Math.min(scrolled / 500, 1);
                element.style.setProperty('--glass-opacity', intensity);
            });
        });
    }

    // ========== EFEKT #8: MICRO-INTERACTIONS ==========
    function initMicroInteractions() {
        // Button micro-interactions
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.classList.add('btn-shimmer');
            
            button.addEventListener('click', (e) => {
                button.classList.add('micro-bounce');
                setTimeout(() => {
                    button.classList.remove('micro-bounce');
                }, 600);
                
                // Ripple effect
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Form field micro-interactions
        const formFields = document.querySelectorAll('.form-control');
        formFields.forEach(field => {
            field.addEventListener('focus', () => {
                field.parentElement.classList.add('micro-pulse');
            });
            
            field.addEventListener('blur', () => {
                field.parentElement.classList.remove('micro-pulse');
            });
        });
    }

    // ========== EFEKT #9: ADVANCED CURSOR EFFECTS ==========
    function initCursorEffects() {
        // Custom cursor
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        document.body.appendChild(cursorFollower);
        
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Smooth follower animation
        function animateFollower() {
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;
            
            followerX += dx * 0.1;
            followerY += dy * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        animateFollower();
        
        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-hover');
            });
        });
    }

    // ========== EFEKT #10: SMOOTH SCROLL ENHANCEMENT ==========
    function initSmoothScroll() {
        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ========== EFEKT #11: LOADING ANIMATIONS ==========
    function initLoadingAnimations() {
        // Page load sequence
        const loadSequence = [
            { elements: '.nav', delay: 0 },
            { elements: '.hero-title', delay: 200 },
            { elements: '.hero-subtitle', delay: 400 },
            { elements: '.hero-cta', delay: 600 }
        ];
        
        loadSequence.forEach(({ elements, delay }) => {
            setTimeout(() => {
                const els = document.querySelectorAll(elements);
                els.forEach(el => {
                    el.classList.add('animate-fade-up', 'visible');
                });
            }, delay);
        });
    }

    // ========== INITIALIZE ALL EFFECTS ==========
    initScrollProgress();
    initTextReveal();
    initMagneticHover();
    initParallaxHero();
    initInteractiveCards();
    initGlassmorphism();
    initMicroInteractions();
    initCursorEffects();
    initSmoothScroll();
    initLoadingAnimations();

    // ========== RESPONSIVE OPTIMIZATIONS ==========
    function initResponsiveOptimizations() {
        // Disable expensive animations on mobile
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-optimized');
        }
        
        // Performance monitoring
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                console.log('VictoryMind.ai: All Apple MacBook Pro effects loaded successfully! 🚀');
            });
        }
    }
    
    initResponsiveOptimizations();
});