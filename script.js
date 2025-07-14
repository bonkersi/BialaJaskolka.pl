// Obsługa scrollowania - dodanie klasy 'scrolled' dla małych ekranów
window.addEventListener('scroll', function() {
    if (window.innerWidth <= 768) {
        document.body.classList.toggle('scrolled', window.scrollY > 50);
    }
});
