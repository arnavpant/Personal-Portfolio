document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const target = card.getAttribute('data-target');
        window.location.href = target;
      });
    });
  });
  