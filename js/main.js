document.addEventListener('DOMContentLoaded', function() {
    // Inicjalizacja mobile menu
    function initMobileMenu() {
        const header = document.querySelector('header');
        if (window.innerWidth <= 768) {
            header.style.position = 'fixed';
            header.style.top = '0';
        } else {
            header.style.position = 'sticky';
        }
    }

    // Smooth scroll dla anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') !== '#') {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - headerHeight - 20,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Aktualny rok w footerze
    const yearElements = document.querySelectorAll('[data-current-year]');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // Skip link dla dostępności
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only';
    skipLink.textContent = 'Przejdź do treści';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Focus na skip link po kliknięciu
    skipLink.addEventListener('click', function() {
        setTimeout(() => {
            const mainContent = document.querySelector('#main-content');
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
            }
        }, 100);
    });

    // Lazy loading dla obrazów
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Current page highlight
    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-list a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    // Inicjalizacja przy ładowaniu
    initMobileMenu();
    initLazyLoading();
    highlightCurrentPage();

    // Inicjalizacja przy zmianie rozmiaru
    window.addEventListener('resize', function() {
        initMobileMenu();
    });

    // Error handling
    window.addEventListener('error', function(e) {
        console.error('Błąd na stronie:', e.message);
    });

    // Offline detection
    window.addEventListener('offline', function() {
        console.log('Jesteś offline');
    });

    window.addEventListener('online', function() {
        console.log('Jesteś online');
    });
});