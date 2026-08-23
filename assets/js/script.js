// Plynulé skrolovanie a zvýrazňovanie aktívneho odkazu
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-links a');

  // Aktivácia odkazu podľa pozície skrolovania
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Odoslanie rezervačného formulára
  const form = document.getElementById('appointmentForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Ďakujeme! Vaša žiadosť o rezerváciu bola úspešne odoslaná. Budeme vás kontaktovať pre potvrdenie termínu.');
    form.reset();
  });
});