/**
 * Igreja Reformada Comunidade da Cruz
 * Scripts de Interatividade e Funcionalidades
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Navigation Overlay Menu Toggle
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const navCloseBtn = document.getElementById('navCloseBtn');
  const navOverlay = document.getElementById('navOverlay');
  const navMenuLinks = document.querySelectorAll('.nav-menu-link');

  const openNav = () => {
    navOverlay.classList.add('open');
    navOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    navOverlay.classList.remove('open');
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openNav);
  if (navCloseBtn) navCloseBtn.addEventListener('click', closeNav);

  navMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  // Close nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOverlay.classList.contains('open')) {
      closeNav();
    }
  });

  // 3. Toast Notifications
  const toast = document.getElementById('toastNotification');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // 4. Clipboard Copy (PIX)
  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-clipboard') || '';
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Chave copiada: ${textToCopy}`);
          const originalText = btn.textContent;
          btn.textContent = 'Copiado!';
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        }).catch(() => {
          fallbackCopyText(textToCopy, btn);
        });
      } else {
        fallbackCopyText(textToCopy, btn);
      }
    });
  });

  function fallbackCopyText(text, btn) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Chave copiada: ${text}`);
      const originalText = btn.textContent;
      btn.textContent = 'Copiado!';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    } catch (err) {
      showToast('Não foi possível copiar automaticamente.');
    }
    document.body.removeChild(textArea);
  }

  // 5. Radio Pill Toggle for "Já é cristão evangélico?"
  const radioPills = document.querySelectorAll('.radio-pill-btn');
  radioPills.forEach(pill => {
    pill.addEventListener('click', () => {
      radioPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const radioInput = pill.querySelector('input[type="radio"]');
      if (radioInput) radioInput.checked = true;
    });
  });

  // 6. Visitor Form Submit to WhatsApp
  const visitorForm = document.getElementById('visitorForm');
  if (visitorForm) {
    visitorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('visitorName').value.trim();
      const phone = document.getElementById('visitorPhone').value.trim();
      const source = document.getElementById('visitorSource').value;
      const isChristian = document.querySelector('input[name="is_christian"]:checked')?.value || 'Sim';

      if (!name) {
        showToast('Por favor, informe seu nome.');
        document.getElementById('visitorName').focus();
        return;
      }

      if (!phone) {
        showToast('Por favor, informe seu telefone / WhatsApp.');
        document.getElementById('visitorPhone').focus();
        return;
      }

      // Format WhatsApp message
      const textMessage = `*Novo Cartão de Visitante — Comunidade da Cruz*\n\n` +
        `👤 *Nome:* ${name}\n` +
        `📱 *Telefone:* ${phone}\n` +
        `⛪ *Como conheceu:* ${source || 'Não especificado'}\n` +
        `✝️ *Já é cristão evangélico:* ${isChristian}\n\n` +
        `_Enviado pelo site oficial comunidadedacruz.org.br_`;

      const encodedText = encodeURIComponent(textMessage);
      const whatsappUrl = `https://wa.me/5582996298697?text=${encodedText}`;

      showToast('Redirecionando para o WhatsApp...');
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 600);
    });
  }

  // 7. Video Player Modal
  const videoBox = document.getElementById('videoBox');
  const videoModal = document.getElementById('videoModal');
  const videoModalClose = document.getElementById('videoModalClose');
  const videoModalBackdrop = document.getElementById('videoModalBackdrop');
  const videoIframe = document.getElementById('videoIframe');

  // Channel live or latest stream embed (or default church worship video)
  const defaultVideoEmbedUrl = 'https://www.youtube-nocookie.com/embed/videoseries?list=PLw-1e5x_b_V847b30m9U7u6sZ8s-z88Uq';

  const openVideoModal = () => {
    if (!videoModal) return;
    videoIframe.src = defaultVideoEmbedUrl;
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    if (!videoModal) return;
    videoIframe.src = '';
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (videoBox) videoBox.addEventListener('click', openVideoModal);
  if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
  if (videoModalBackdrop) videoModalBackdrop.addEventListener('click', closeVideoModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('open')) {
      closeVideoModal();
    }
  });

  // 8. Smooth link navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerHeight = header ? header.offsetHeight : 0;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
