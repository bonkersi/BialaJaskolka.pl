// Obsługa menu hamburger
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Blokada scrollowania gdy menu jest otwarte
        if (navList.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Zamknięcie menu po kliknięciu w link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Obsługa scrollowania - dodanie klasy 'scrolled' dla małych ekranów
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768) {
            document.body.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
});
