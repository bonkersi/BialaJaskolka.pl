document.addEventListener('DOMContentLoaded', function() {
    // Inicjalizacja menu mobilnego
    function initMobileMenu() {
        const header = document.querySelector('header');
        if (window.innerWidth <= 768) {
            header.style.position = 'fixed';
            header.style.top = '0';
        } else {
            header.style.position = 'sticky';
        }
    }

    // Obsługa formularza kontaktowego
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
            contactForm.reset();
        });
    }

    // Inicjalizacja przy ładowaniu i zmianie rozmiaru
    initMobileMenu();
    window.addEventListener('resize', initMobileMenu);
});
