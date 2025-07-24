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
function checkOverlapDesktopOnly() {
  if (window.innerWidth <= 768) return; // tylko desktop

  const jesusImg = document.querySelector('.image-container img');
  const content = document.querySelector('.content');

  if (!jesusImg || !content) return;

  const imgRect = jesusImg.getBoundingClientRect();
  const contentRect = content.getBoundingClientRect();

  const horizontallyOverlapping =
    imgRect.right > contentRect.left &&
    imgRect.left < contentRect.right;

  const verticallyOverlapping =
    imgRect.bottom > contentRect.top &&
    imgRect.top < contentRect.bottom;

  const isOverlapping = horizontallyOverlapping && verticallyOverlapping;

  // Dodaj lub usuń klasę w zależności od kolizji
  jesusImg.classList.toggle('dimmed', isOverlapping);
}

// Uruchamiaj sprawdzanie:
window.addEventListener('scroll', checkOverlapDesktopOnly);
window.addEventListener('resize', checkOverlapDesktopOnly);
document.addEventListener('DOMContentLoaded', checkOverlapDesktopOnly);
