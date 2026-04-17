/**
 * ML Brindes — main.js
 * Vanilla JS: preloader, menu mobile, animações de scroll
 * Sem dependências externas — substitui jQuery + Webflow (2.3MB)
 */

(function () {
  'use strict';

  /* ——— Preloader ——— */
  function initPreloader() {
    var preloader = document.querySelector('.preloader');
    if (!preloader) return;

    function hidePreloader() {
      preloader.classList.add('hidden');
      setTimeout(function () {
        preloader.style.display = 'none';
      }, 600);
    }

    if (document.readyState === 'complete') {
      hidePreloader();
    } else {
      window.addEventListener('load', hidePreloader);
      // Fallback — máximo 3 segundos
      setTimeout(hidePreloader, 3000);
    }
  }

  /* ——— Menu mobile ——— */
  function initMobileMenu() {
    var btn  = document.querySelector('.menu-button');
    var menu = document.querySelector('.nav-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Fechar ao clicar num link
    menu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    // Fechar ao clicar fora
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ——— Animações de scroll (IntersectionObserver) ——— */
  function initScrollAnimations() {
    var elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      elements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback para browsers sem suporte
      elements.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  /* ——— Init ——— */
  document.addEventListener('DOMContentLoaded', function () {
    initPreloader();
    initMobileMenu();
    initScrollAnimations();
  });

})();
