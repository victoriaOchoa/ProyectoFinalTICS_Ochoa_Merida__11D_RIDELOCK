/* =========================================================
   RIDELOCK — script.js
   Funcionalidades: menú móvil, scroll suave, animaciones al
   aparecer, video del circuito en pantalla completa y manejo de
   recursos pendientes.
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
     4. RECURSOS PENDIENTES (GitHub / Podcast / Documentos)
     -------------------------------------------------------
     Para activar un enlace cuando el recurso ya exista,
     simplemente reemplaza el valor correspondiente aquí
     abajo por la URL real. Mientras el valor sea null,
     el botón se mostrará deshabilitado como "Enlace pendiente".
  ----------------------------------------------------- */
  var RECURSOS = {
    // Repositorio: ProyectoFinalTICS_Ochoa_Merida__11D_RIDELOCK
    // Ejemplo: "https://github.com/TU-USUARIO/ProyectoFinalTICS_Ochoa_Merida__11D_RIDELOCK"
    github: null,
    // Enlace del video del podcast en YouTube.
    // Ejemplo: "https://www.youtube.com/watch?v=xxxxxxxxxxx"
    podcast: null
  };

  function configurarEnlacePendiente(id, url) {
    var link = document.getElementById(id);
    if (!link) return;

    if (url) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = link.dataset.readyLabel || 'Abrir enlace';
      link.classList.remove('is-pending');
      link.removeAttribute('data-pending');
      link.removeAttribute('aria-disabled');
    } else {
      link.href = '#';
      link.classList.add('is-pending');
      link.setAttribute('aria-disabled', 'true');
      link.addEventListener('click', function (e) {
        e.preventDefault();
      });
    }
  }

  configurarEnlacePendiente('githubLink', RECURSOS.github);
  configurarEnlacePendiente('podcastLink', RECURSOS.podcast);

  /* -----------------------------------------------------
     5. DOCUMENTOS — deshabilitar botones si el archivo
     todavía no existe (evita enlaces rotos a /recursos/...)
  ----------------------------------------------------- */
  document.querySelectorAll('.doc-link').forEach(function (link) {
    fetch(link.getAttribute('href'), { method: 'HEAD' })
      .then(function (res) {
        if (!res.ok) marcarComoPendiente(link);
      })
      .catch(function () {
        marcarComoPendiente(link);
      });
  });

  function marcarComoPendiente(link) {
    link.textContent = 'Disponible próximamente';
    link.classList.add('is-pending');
    link.setAttribute('aria-disabled', 'true');
    link.addEventListener('click', function (e) {
      e.preventDefault();
    });
  }

  /* -----------------------------------------------------
     6. NAVBAR — sombra ligera al hacer scroll (sutil)
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
