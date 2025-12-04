/**
 * Biała Jaskółka - Main JavaScript
 * @version 2.0.0
 * @description Zoptymalizowany i zabezpieczony JavaScript dla strony
 */

(function() {
    'use strict';

    // ===== DOM Ready =====
    document.addEventListener('DOMContentLoaded', function() {
        console.log('%c🕊️ Biała Jaskółka - Strona załadowana', 'color: #4CAF50; font-weight: bold;');
        
        initMobileMenu();
        initContactForm();
        initCookieConsent();
        initImageLoading();
        initAccessibility();
        initPerformanceMonitoring();
        optimizeMobileBackground();
    });

    // ===== Mobile Menu =====
    function initMobileMenu() {
        const header = document.querySelector('header');
        if (!header) return;

        function updateHeaderPosition() {
            if (window.innerWidth <= 768) {
                header.style.position = 'fixed';
                header.style.top = '0';
                header.style.width = '100%';
                document.body.style.paddingTop = '70px';
            } else {
                header.style.position = 'sticky';
                header.style.width = 'auto';
                document.body.style.paddingTop = '0';
            }
        }

        // Initial call
        updateHeaderPosition();
        
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateHeaderPosition, 250);
        });

        // Touch event for mobile menu
        if ('ontouchstart' in window) {
            const navItems = document.querySelectorAll('.nav-list li a');
            navItems.forEach(item => {
                item.addEventListener('touchstart', function(e) {
                    this.classList.add('touch-active');
                }, { passive: true });
                
                item.addEventListener('touchend', function() {
                    setTimeout(() => {
                        this.classList.remove('touch-active');
                    }, 150);
                }, { passive: true });
            });
        }
    }

    // ===== Contact Form =====
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        // Form validation
        const validateEmail = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const message = formData.get('message') || '';
            
            // Validation
            if (!name.trim()) {
                showNotification('Proszę podać imię i nazwisko', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Proszę podać prawidłowy adres email', 'error');
                return;
            }
            
            if (!message.trim()) {
                showNotification('Proszę wpisać wiadomość', 'error');
                return;
            }
            
            // Sanitize inputs (basic)
            const sanitizedData = {
                name: sanitizeInput(name),
                email: sanitizeInput(email),
                message: sanitizeInput(message),
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                referrer: document.referrer
            };
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Wysyłanie...';
            
            setTimeout(() => {
                showNotification('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Send data to analytics (privacy-friendly)
                logFormSubmission(sanitizedData);
            }, 1500);
        });
    }

    // ===== Cookie Consent =====
    function initCookieConsent() {
        if (!window.cookieconsent) return;
        
        const cookieBanner = document.querySelector('.cc-window');
        if (cookieBanner) {
            // Improve accessibility
            cookieBanner.setAttribute('role', 'alert');
            cookieBanner.setAttribute('aria-live', 'polite');
        }
        
        window.cookieconsent.initialise({
            palette: {
                popup: { 
                    background: "#1a1a1a",
                    text: "#fff",
                    border: "1px solid #333"
                },
                button: { 
                    background: "#4CAF50",
                    text: "#fff"
                }
            },
            theme: "classic",
            position: "bottom",
            static: true,
            content: {
                message: "Ta strona używa plików cookies w celu poprawnego działania i analizy ruchu.",
                dismiss: "Rozumiem",
                link: "Dowiedz się więcej",
                href: "polityka-cookies.html",
                target: "_self"
            },
            law: {
                regionalLaw: false,
            },
            location: true,
            onStatusChange: function(status) {
                console.log('Cookie status changed:', status);
            },
            onInitialise: function(status) {
                console.log('Cookie consent initialized:', status);
            }
        });
    }

    // ===== Image Loading Optimization =====
    function initImageLoading() {
        const images = document.querySelectorAll('img[data-src], img[src*=".jpg"], img[src*=".png"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            delete img.dataset.src;
                        }
                        
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    delete img.dataset.src;
                }
            });
        }

        // Add loading="lazy" to images if not already present
        images.forEach(img => {
            if (!img.loading) {
                img.loading = 'lazy';
            }
        });
    }

    // ===== Accessibility Features =====
    function initAccessibility() {
        // Skip link focus
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('user-is-tabbing');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('user-is-tabbing');
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without scrolling
                    history.pushState(null, null, href);
                }
            });
        });

        // Add ARIA labels where missing
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach((link, index) => {
            if (!link.getAttribute('aria-label')) {
                const text = link.textContent.trim();
                link.setAttribute('aria-label', `Przejdź do ${text}`);
            }
        });
    }

    // ===== Performance Monitoring =====
    function initPerformanceMonitoring() {
        // Log Core Web Vitals
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = window.performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        const loadTime = perfData.loadEventEnd - perfData.fetchStart;
                        const domReadyTime = perfData.domContentLoadedEventEnd - perfData.fetchStart;
                        
                        console.log(`📊 Performance Metrics:
                            Load Time: ${loadTime.toFixed(2)}ms
                            DOM Ready: ${domReadyTime.toFixed(2)}ms
                            Page Size: ${(performance.getEntriesByType('resource')
                                .reduce((acc, r) => acc + r.transferSize, 0) / 1024).toFixed(2)}KB`);
                    }
                }, 0);
            });
        }

        // Monitor for errors
        window.addEventListener('error', function(e) {
            console.error('Page error:', e.error);
            // You could send this to your error tracking service
        }, true);

        // Monitor offline/online status
        window.addEventListener('offline', () => {
            showNotification('Jesteś offline. Niektóre funkcje mogą być niedostępne.', 'warning');
        });

        window.addEventListener('online', () => {
            showNotification('Połączenie zostało przywrócone.', 'success');
        });
    }

    // ===== Mobile Background Optimization =====
    function optimizeMobileBackground() {
        if (window.innerWidth <= 768) {
            const imageContainer = document.querySelector('.image-container');
            const content = document.querySelector('.content');
            
            if (imageContainer && content) {
                // Adjust opacity based on scroll
                let lastScrollTop = 0;
                
                window.addEventListener('scroll', () => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    // Only update on significant scroll differences
                    if (Math.abs(scrollTop - lastScrollTop) > 10) {
                        const opacity = Math.max(0.5, 0.7 - (scrollTop * 0.0005));
                        imageContainer.style.opacity = opacity;
                        
                        // Adjust content background opacity
                        const contentOpacity = Math.min(0.85, 0.75 + (scrollTop * 0.0003));
                        content.style.backgroundColor = `rgba(0, 0, 0, ${contentOpacity})`;
                        
                        lastScrollTop = scrollTop;
                    }
                }, { passive: true });
                
                // Initial adjustment
                imageContainer.style.willChange = 'opacity';
                imageContainer.style.transition = 'opacity 0.3s ease';
            }
        }
    }

    // ===== Utility Functions =====
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML.replace(/[<>]/g, '');
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'assertive');
        
        notification.innerHTML = `
            <span class="notification-text">${message}</span>
            <button class="notification-close" aria-label="Zamknij powiadomienie">×</button>
        `;
        
        document.body.appendChild(notification);
        
        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    color: white;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    max-width: 400px;
                    animation: slideIn 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                .notification-success { background: #4CAF50; }
                .notification-error { background: #f44336; }
                .notification-warning { background: #ff9800; }
                .notification-info { background: #2196F3; }
                .notification-close {
                    background: transparent;
                    border: none;
                    color: inherit;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0;
                    margin-left: auto;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    function logFormSubmission(data) {
        // Privacy-friendly analytics - only log what's necessary
        const analyticsData = {
            event: 'form_submission',
            timestamp: data.timestamp,
            form_type: 'contact',
            fields_filled: Object.keys(data).filter(k => k !== 'message').length
        };
        
        console.log('📝 Form submission logged:', analyticsData);
    }

    // ===== Service Worker Registration (Progressive Web App) =====
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful');
            }).catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
        });
    }

    // ===== Export for debugging =====
    window.BialaJaskolka = {
        version: '2.0.0',
        initMobileMenu,
        initContactForm,
        initCookieConsent,
        showNotification
    };
})();