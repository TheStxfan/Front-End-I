document.addEventListener('DOMContentLoaded', () => {
    // 🔹 Menu Mobile
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('#navOverlay');
    const body = document.querySelector('body');

    // Funzione per aprire/chiudere menu
    function toggleMenu() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        body.style.overflow = menuLinks.classList.contains('active') ? 'hidden' : 'auto';
    }

    // Apri/chiudi menu con hamburger
    menu.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Chiudi menu cliccando su overlay
    navOverlay.addEventListener('click', () => {
        toggleMenu();
    });

    // Chiudi menu cliccando su link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-active');
            menuLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    // Chiudi menu con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // 🔹 Sticky Header con blur - SISTEMATO
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Aggiunge/rimuove classe per effetto blur e ombra
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Scroll reveal animations
        reveal();
        
        lastScroll = currentScroll;
    });

    // 🔹 Reveal Animation
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => {
            let windowHeight = window.innerHeight;
            let elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add("active");
                
                // Anima le progress bar quando skills è visibile
                if (el.id === 'skills') {
                    setTimeout(animateProgressBars, 300);
                }
            }
        });
    }

    // 🔹 Animazione Progress Bar
    function animateProgressBars() {
        const bars = document.querySelectorAll('.fill');
        bars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width') || bar.style.width;
            bar.style.setProperty('--target-width', targetWidth);
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.classList.add('animated');
            }, 300);
        });
    }

    // 🔹 Smooth Scroll migliorato
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Chiudi menu mobile se aperto
                menu.classList.remove('is-active');
                menuLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    });

    // 🔹 Typing Effect per il titolo (solo desktop)
    function typeWriterEffect() {
        const heroTitle = document.querySelector('#hero h1');
        if (!heroTitle) return;
        
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        
        // Attiva solo su desktop e dopo un piccolo delay
        if (window.innerWidth > 768) {
            setTimeout(type, 500);
        } else {
            heroTitle.textContent = text;
        }
    }

    // 🔹 Theme Toggle - TEMA CHIARO MIGLIORATO
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            const icon = themeToggle.querySelector('i');
            if (body.classList.contains('light-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
                // Aggiorna meta tag per tema chiaro
                document.documentElement.style.setProperty('--primary', '#0077b6');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
                document.documentElement.style.setProperty('--primary', '#00e0ff');
            }
        });
        
        // Carica tema salvato
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
            document.documentElement.style.setProperty('--primary', '#0077b6');
        }
    }

    // 🔹 Intersection Observer per animazioni
    function initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // 🔹 Hover effect per card
    function initCardHover() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // 🔹 Inizializzazione
    function init() {
        typeWriterEffect();
        initIntersectionObserver();
        initCardHover();
        reveal(); // Attiva le animazioni iniziali
        
        // Applica classe scrolled se si parte scrollati
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        }
    }

    // Avvia tutto
    init();
    
    // 🔹 Reset animazioni al resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            reveal();
        }, 250);
    });
});

// 🔹 Preload delle font
if ('fonts' in document) {
    document.fonts.load('1rem "Inter"').then(() => {
        document.body.style.opacity = 1;
    });
}