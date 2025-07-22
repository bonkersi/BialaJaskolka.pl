document.addEventListener('DOMContentLoaded', function() {
    // Stałe menu na mobile
    const header = document.querySelector('header');
    
    function updateHeader() {
        if (window.innerWidth <= 768) {
            header.style.position = 'fixed';
            header.style.top = '0';
        } else {
            header.style.position = 'sticky';
        }
    }
    
    // Inicjalizacja i nasłuchiwanie zmian rozmiaru
    updateHeader();
    window.addEventListener('resize', updateHeader);

    // Obsługa formularza kontaktowego
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
            contactForm.reset();
        });
    }
});
