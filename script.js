// Toggle menu mobile
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.style.display === 'flex';
    menu.style.display = isOpen ? 'none' : 'flex';
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Ajuste inicial para mobile
  const setInitialMenu = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    menu.style.display = isMobile ? 'none' : 'flex';
    toggle.setAttribute('aria-expanded', 'false');
  };
  setInitialMenu();
  window.addEventListener('resize', setInitialMenu);
}

// Scroll suave para âncoras internas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Validação simples do formulário e feedback
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nome = data.get('nome');
    const email = data.get('email');
    const mensagem = data.get('mensagem');

    if (!nome || !email || !mensagem) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    alert('Mensagem enviada com sucesso!');
    form.reset();
  });
}
