const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => {
  const customDelay = el.dataset.delay ? `${el.dataset.delay}ms` : '0ms';
  el.style.setProperty('--delay', customDelay);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

const videoSection = document.querySelector('.video-section');
const playButton = document.querySelector('.video-play');
const videoModal = document.getElementById('videoModal');
const videoContainer = document.getElementById('videoContainer');
const closeVideoButtons = document.querySelectorAll('[data-close-video]');

function buildVideoMarkup(type, url) {
  if (!url) return '';
  if (type === 'youtube' || type === 'vimeo') {
    return `<iframe src="${url}" title="Embedded video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }
  if (type === 'mp4') {
    return `<video controls autoplay playsinline><source src="${url}" type="video/mp4" />Your browser does not support the video tag.</video>`;
  }
  return '';
}

function openVideoModal() {
  if (!videoSection || !videoModal || !videoContainer) return;
  const type = videoSection.dataset.videoType || 'youtube';
  const url = videoSection.dataset.videoUrl || '';
  videoContainer.innerHTML = buildVideoMarkup(type, url);
  videoModal.classList.add('is-open');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  if (!videoModal || !videoContainer) return;
  videoModal.classList.remove('is-open');
  videoModal.setAttribute('aria-hidden', 'true');
  videoContainer.innerHTML = '';
  document.body.style.overflow = '';
}

if (playButton) playButton.addEventListener('click', openVideoModal);
closeVideoButtons.forEach(button => button.addEventListener('click', closeVideoModal));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeVideoModal();
});

document.querySelectorAll('.carousel-arrow').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.animate(
      [{ transform: 'translateY(0)' }, { transform: 'translateY(-2px)' }, { transform: 'translateY(0)' }],
      { duration: 220, easing: 'ease-out' }
    );
  });
});

const newsletterForm = document.querySelector('.newsletter__form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = newsletterForm.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'SENT';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      newsletterForm.reset();
    }, 1800);
  });
}
