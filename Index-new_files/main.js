// Starting Point NL — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal, .route-card');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Contact form (client-side placeholder — see README for wiring a real backend)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      var name = form.querySelector('#name').value.trim();
      if (!status) return;
      status.textContent = 'Thanks' + (name ? ', ' + name.split(' ')[0] : '') + ' — this form isn\'t wired to an inbox yet. Please email info@startingpointnl.ca or call (709) 782-7172 in the meantime.';
      status.classList.add('show');
      form.reset();
    });
  }

  // Active nav link highlight
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
