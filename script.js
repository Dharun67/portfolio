const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('mainNav');

const setActiveLink = () => {
  let current = '';

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

window.addEventListener('scroll', () => {
  setActiveLink();
  navbar.style.boxShadow = window.scrollY > 20 ? '0 16px 40px rgba(0, 0, 0, 0.3)' : 'none';
});

setActiveLink();

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('show')) {
      document.querySelector('.navbar-toggler').click();
    }
  });
});

const counters = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = Number(counter.dataset.count || 0);
    const suffix = counter.textContent.includes('+') ? '+' : '';
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));

    const tick = () => {
      current += step;
      if (current >= target) {
        counter.textContent = `${target}${suffix}`;
        return;
      }
      counter.textContent = `${current}${suffix}`;
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    countObserver.unobserve(counter);
  });
}, { threshold: 0.55 });

counters.forEach((counter) => countObserver.observe(counter));
