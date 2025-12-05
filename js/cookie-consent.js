document.addEventListener('DOMContentLoaded', function() {
    // Sprawdź czy użytkownik już wyraził zgodę
    const cookieConsent = getCookie('cookie_consent');
    
    if (!cookieConsent) {
        // Pokaż banner cookies
        showCookieBanner();
    } else {
        // Zastosuj zapisane preferencje
        applyCookiePreferences(JSON.parse(cookieConsent));
    }

    // Funkcja do wyświetlania banneru
    function showCookieBanner() {
        const bannerHTML = `
            <div id="cookie-banner" class="cookie-banner">
                <div class="cookie-banner-content">
                    <p>Ta strona używa plików cookies w celu poprawnego działania i analizy ruchu.</p>
                    <div class="cookie-buttons">
                        <button type="button" class="cookie-btn accept-all">Zaakceptuj wszystkie</button>
                        <button type="button" class="cookie-btn accept-essential">Tylko niezbędne</button>
                        <a href="polityka-cookies.html" class="cookie-link">Dowiedz się więcej</a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        
        // Dodaj style
        const styles = `
            .cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: #333;
                color: #fff;
                padding: 20px;
                z-index: 10000;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.3);
            }
            
            .cookie-banner-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 15px;
            }
            
            .cookie-banner p {
                margin: 0;
                flex: 1;
                min-width: 300px;
            }
            
            .cookie-buttons {
                display: flex;
                gap: 10px;
                align-items: center;
                flex-wrap: wrap;
            }
            
            .cookie-btn {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s;
            }
            
            .cookie-btn.accept-all {
                background: #555;
                color: #fff;
            }
            
            .cookie-btn.accept-all:hover {
                background: #666;
            }
            
            .cookie-btn.accept-essential {
                background: transparent;
                color: #ccc;
                border: 1px solid #555;
            }
            
            .cookie-btn.accept-essential:hover {
                background: rgba(255,255,255,0.05);
            }
            
            .cookie-link {
                color: #a0a0a0;
                text-decoration: underline;
            }
            
            @media (max-width: 768px) {
                .cookie-banner-content {
                    flex-direction: column;
                    text-align: center;
                }
                
                .cookie-banner p {
                    min-width: auto;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        // Event listeners dla przycisków
        document.querySelector('.cookie-btn.accept-all').addEventListener('click', function() {
            const preferences = {
                essential: true,
                analytics: true,
                marketing: false,
                timestamp: new Date().toISOString()
            };
            setCookie('cookie_consent', JSON.stringify(preferences), 365);
            hideBanner();
            applyCookiePreferences(preferences);
        });
        
        document.querySelector('.cookie-btn.accept-essential').addEventListener('click', function() {
            const preferences = {
                essential: true,
                analytics: false,
                marketing: false,
                timestamp: new Date().toISOString()
            };
            setCookie('cookie_consent', JSON.stringify(preferences), 365);
            hideBanner();
            applyCookiePreferences(preferences);
        });
    }
    
    // Ukryj banner
    function hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.transform = 'translateY(100%)';
            banner.style.opacity = '0';
            setTimeout(() => banner.remove(), 300);
        }
    }
    
    // Zastosuj preferencje cookies
    function applyCookiePreferences(preferences) {
        if (preferences.analytics) {
            // Włącz Google Analytics
            loadGoogleAnalytics();
        } else {
            // Wyłącz Google Analytics
            window['ga-disable-UA-XXXXXX-X'] = true;
        }
    }
    
    // Załaduj Google Analytics (jeśli potrzebujesz)
    function loadGoogleAnalytics() {
        // Tutaj wstaw kod Google Analytics
        // window.dataLayer = window.dataLayer || [];
        // function gtag(){dataLayer.push(arguments);}
        // gtag('js', new Date());
        // gtag('config', 'UA-XXXXXX-X');
    }
    
    // Helper functions dla cookies
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/;SameSite=Strict";
    }
    
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
        }
        return null;
    }
    
    // Publiczna funkcja do zarządzania cookies
    window.openCookiePreferences = function() {
        window.location.href = 'polityka-cookies.html#cookie-settings';
    };
});