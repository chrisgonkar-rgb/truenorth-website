// TrueNorth Group — lightweight site behavior.
// No animation library required: smooth-scroll is native CSS,
// section reveals use IntersectionObserver, ~2kb total.

document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky nav background on scroll
  const nav = document.getElementById('siteNav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');

    // back-to-top visibility
    const toTop = document.getElementById('toTop');
    if (toTop) toTop.classList.toggle('is-visible', window.scrollY > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    nav.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav + set active link on click
  const sections = [...document.querySelectorAll('section[id]')];
  const links = [...document.querySelectorAll('.nav-links a')];

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      nav.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Active nav link highlighting on scroll
  const setActive = (id) => {
    links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`));
  };
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));

  // Scroll-reveal (respects prefers-reduced-motion via CSS var already)
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Back to top
  document.getElementById('toTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Contact form: client-side validation, then a real Netlify Forms
  // submission via fetch (so we can show a genuine success/error state
  // instead of a page reload, and never claim success unless it happened).
  const form = document.getElementById('contactForm');
  if (form) {
    const statusEl = document.getElementById('formStatus');

    function setFieldError(fieldEl, hasError) {
      const wrapper = fieldEl.closest('.field');
      if (wrapper) wrapper.classList.toggle('has-error', hasError);
    }

    function validate() {
      let ok = true;
      const name = form.querySelector('#c-name');
      const email = form.querySelector('#c-email');
      const message = form.querySelector('#c-message');
      const consent = form.querySelector('input[name="consent"]');

      const emailOk = email.value.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

      setFieldError(name, name.value.trim() === '');
      setFieldError(email, !emailOk);
      setFieldError(message, message.value.trim() === '');
      setFieldError(consent, !consent.checked);

      if (name.value.trim() === '' || !emailOk || message.value.trim() === '' || !consent.checked) ok = false;
      return ok;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      statusEl.className = 'field-status';
      statusEl.textContent = '';

      if (!validate()) {
        statusEl.className = 'field-status is-error';
        statusEl.textContent = 'Please fix the highlighted fields before sending.';
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      const body = new URLSearchParams(new FormData(form)).toString();

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
        .then((res) => {
          if (!res.ok) throw new Error('Submission failed');
          statusEl.className = 'field-status is-success';
          statusEl.textContent = "Message sent. We'll be in touch soon.";
          form.reset();
        })
        .catch(() => {
          statusEl.className = 'field-status is-error';
          statusEl.textContent = 'Something went wrong sending this — please try again, or email us directly.';
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send message';
        });
    });
  }
});
