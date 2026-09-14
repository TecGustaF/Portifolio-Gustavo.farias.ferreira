const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a')];

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-30% 0px -62% 0px' });
sections.forEach(section => sectionObserver.observe(section));

const progressBar = document.querySelector('.scroll-progress span');
const updateProgress = () => {
  const height = document.documentElement.scrollHeight - innerHeight;
  const progress = height > 0 ? (scrollY / height) * 100 : 0;
  progressBar.style.width = `${progress}%`;
};
addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const dialog = document.querySelector('.image-dialog');
const dialogImage = dialog.querySelector('img');
document.querySelectorAll('.image-open').forEach(button => {
  button.addEventListener('click', () => {
    dialogImage.src = button.dataset.image;
    dialogImage.alt = button.dataset.alt || '';
    dialog.showModal();
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
