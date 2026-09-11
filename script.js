/* =========================================================
   RIDELOCK — script.js
   Funcionalidades: menú móvil, scroll suave, animaciones al
   aparecer y video del circuito en pantalla completa.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------
     1. MENÚ MÓVIL (hamburguesa)
  ----------------------------------------------------- */
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    // Cerrar el menú al seleccionar un enlace (en móvil)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navLinks.classList.contains('is-open')) {
          navLinks.classList.remove('is-open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Abrir menú');
        }
      });
    });
  }

  /* -----------------------------------------------------
     2. ANIMACIÓN AL APARECER (scroll reveal)
  ----------------------------------------------------- */
  var revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealItems.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    // Fallback: si no hay soporte, mostrar todo directamente
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  /* -----------------------------------------------------
     3. VIDEO DEL CIRCUITO — pantalla completa y manejo
     de recurso pendiente si el archivo aún no existe.
  ----------------------------------------------------- */
  var circuitVideo = document.getElementById('circuitVideo');
  var openCircuitBtn = document.getElementById('openCircuitBtn');
  var evidencePlaceholder = document.getElementById('evidencePlaceholder');

  if (circuitVideo) {
    circuitVideo.addEventListener('error', function () {
      circuitVideo.style.display = 'none';
      if (openCircuitBtn) openCircuitBtn.style.display = 'none';
      if (evidencePlaceholder) evidencePlaceholder.style.display = 'flex';
    });
  }

  if (openCircuitBtn && circuitVideo) {
    openCircuitBtn.addEventListener('click', function () {
      if (circuitVideo.requestFullscreen) {
        circuitVideo.requestFullscreen();
      } else if (circuitVideo.webkitRequestFullscreen) {
        circuitVideo.webkitRequestFullscreen();
      } else {
        circuitVideo.play();
      }
    });
  }

  /* -----------------------------------------------------
     4. NAVBAR — sombra ligera al hacer scroll (sutil)
  ----------------------------------------------------- */
  var navbar = document.getElementById('navbar');
  var lastScrollState = false;

  function actualizarNavbar() {
    var scrolled = window.scrollY > 12;
    if (scrolled !== lastScrollState) {
      navbar.style.boxShadow = scrolled ? '0 12px 24px -20px rgba(0,0,0,0.6)' : 'none';
      lastScrollState = scrolled;
    }
  }

  if (navbar) {
    window.addEventListener('scroll', actualizarNavbar, { passive: true });
    actualizarNavbar();
  }

});
