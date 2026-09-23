// Plynulé skrolovanie a zvýrazňovanie aktívneho odkazu
// document.addEventListener('DOMContentLoaded', () => {
//   const links = document.querySelectorAll('.nav-links a');

  // Aktivácia odkazu podľa pozície skrolovania
//   window.addEventListener('scroll', () => {
//     let current = '';
//     const sections = document.querySelectorAll('section');

//     sections.forEach(section => {
//       const sectionTop = section.offsetTop;
//       const sectionHeight = section.clientHeight;
//       if (pageYOffset >= (sectionTop - 150)) {
//         current = section.getAttribute('id');
//       }
//     });

//     links.forEach(link => {
//       link.classList.remove('active');
//       if (link.getAttribute('href') === `#${current}`) {
//         link.classList.add('active');
//       }
//     });
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-links a');

  // 1. Prepínanie otvorenia a zatvorenia mobilného menu
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Zatvorenie menu po kliknutí na akýkoľvek odkaz v menu
    links.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Aktivácia odkazu v menu podľa pozície skrolovania
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= (sectionTop - 150)) {
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
});