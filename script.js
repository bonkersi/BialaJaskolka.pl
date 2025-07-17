document.addEventListener('DOMContentLoaded', function() {
    // Obsługa scrollowania
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768) {
            document.body.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Obsługa formularza kontaktowego
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Tutaj można dodać kod wysyłający formularz
            alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
            contactForm.reset();
        });
    }

    // Zarządzanie cookies
    function checkCookieConsent() {
        if (!localStorage.getItem('cookie_consent')) {
            // Można tutaj zablokować ładowanie skryptów śledzących
        }
    }
    checkCookieConsent();
});
