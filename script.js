/* ── Luxury Preloader ──────────────────────────────────── */
(function() {
  const preloader = document.createElement('div');
  preloader.id = 'lux-preloader';
  preloader.innerHTML = `
    <div class="loader-logo">Tanishq</div>
    <div class="loader-bar"></div>
  `;
  document.documentElement.appendChild(preloader);

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      document.body.classList.add('loaded');
    }, 400); // Faster load transition
  });
})();

document.addEventListener('DOMContentLoaded', () => {


  /* ── Navbar Scroll Behaviour ──────────────────────────── */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  const handleNavScroll = () => {
    const current = window.scrollY;
    if (current > 60) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    lastScroll = current;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load

  /* ── Set Active Nav Link ──────────────────────────────── */
  const setActiveLink = () => {
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
      const href = link.getAttribute('href');
      // Remove active class first
      link.classList.remove('active');
      
      if (href === currentPage || (currentPage === 'index.html' && href === '/')) {
        link.classList.add('active');
      }
    });
  };
  setActiveLink();

  /* ── Mobile Menu Toggle ───────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  const navClose  = document.getElementById('navClose');

  navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('open');
    navMobile?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Dedicated close button inside the menu
  navClose?.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    navMobile?.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Close mobile menu on link click
  navMobile?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle?.classList.remove('open');
      navMobile?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Handle Resize — close menu if desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navToggle?.classList.remove('open');
      navMobile?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ── Scroll To Top Button ─────────────────────────────── */
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }
  }, { passive: true });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Intersection Observer — Reveal Animations ────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (!entry.target.classList.contains('repeat-reveal')) {
            revealObserver.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }


  /* ── Counter Animation ────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => countObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  /* ── Newsletter Form ──────────────────────────────────── */
  document.querySelectorAll('.footer-newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn   = form.querySelector('button');
      if (!input?.value.trim()) return;

      btn.textContent = '✓ Subscribed';
      btn.style.background = '#2e7d32';
      btn.style.color = '#fff';
      input.value = '';
      input.placeholder = 'Thank you!';
      input.disabled = true;
      btn.disabled = true;
    });
  });

  /* ── Removed Mouse Parallax for Speed ───────────────────── */

  /* ── Simple Toast Notification ────────────────────────── */
  window.showToast = function(message, type = 'success') {
    let toast = document.getElementById('lux-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'lux-toast';
      toast.style.cssText = `
        position:fixed; bottom:90px; right:32px; z-index:9999;
        background:${type === 'success' ? '#1a1a1a' : '#7f1d1d'};
        color:#F4E4BC; padding:14px 24px; border-radius:8px;
        font-family:'Poppins',sans-serif; font-size:0.88rem;
        border-left:3px solid ${type === 'success' ? '#D4AF37' : '#ef4444'};
        box-shadow:0 8px 32px rgba(0,0,0,0.35);
        opacity:0; transform:translateY(12px);
        transition:all 0.35s cubic-bezier(0.4,0,0.2,1);
        pointer-events:none;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0)'; }, 10);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(12px)'; }, 3200);
  };

  /* ── Lazy-load images ─────────────────────────────────── */
  document.querySelectorAll('img[data-src]').forEach(img => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.disconnect();
        }
      });
    });
    observer.observe(img);
  });

  /* ── Removed Magnetic Effects for Speed ────────────────── */

  /* ── Video Modal Logic ───────────────────────────────── */
  window.openVideoModal = function(videoUrl) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('brandVideo');
    const iframe = document.getElementById('brandIframe');
    
    if (!modal) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') || videoUrl.includes('youtube-nocookie.com')) {
      if (video) video.style.display = 'none';
      if (iframe) {
        let finalUrl = videoUrl;
        
        // Convert watch links to embed links if necessary
        if (finalUrl.includes('watch?v=')) {
          finalUrl = finalUrl.replace('watch?v=', 'embed/');
        } else if (finalUrl.includes('youtu.be/')) {
          finalUrl = finalUrl.replace('youtu.be/', 'youtube.com/embed/');
        }

        // Add autoplay and remove related videos
        const separator = finalUrl.includes('?') ? '&' : '?';
        iframe.src = `${finalUrl}${separator}autoplay=1&rel=0&showinfo=0`;
        iframe.style.display = 'block';
      }
    } else {

      if (iframe) {
        iframe.style.display = 'none';
        iframe.src = '';
      }
      if (video) {
        video.src = videoUrl;
        video.style.display = 'block';
        video.play();
      }
    }
  };


  window.closeVideoModal = function() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('brandVideo');
    const iframe = document.getElementById('brandIframe');
    
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      
      if (video) {
        video.pause();
        video.src = '';
      }
      if (iframe) {
        iframe.src = '';
      }
    }
  };

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeVideoModal();
  });

  // Close modal on click outside content
  document.getElementById('videoModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'videoModal') window.closeVideoModal();
  });

  /* ── Collection Filtering ──────────────────────────────── */
  const catFilters = document.querySelectorAll('.cat-filter');
  const matFilters = document.querySelectorAll('.mat-filter');
  const priceRange = document.getElementById('priceRange');
  const priceLabel = document.getElementById('priceLabel');
  const clearBtn = document.getElementById('clearFiltersBtn');
  const productCards = document.querySelectorAll('.product-card');

  function filterProducts() {
    if (!productCards.length) return;

    const selectedCats = Array.from(catFilters).filter(cb => cb.checked).map(cb => cb.value);
    const selectedMats = Array.from(matFilters).filter(cb => cb.checked).map(cb => cb.value);
    const maxPrice = parseInt(priceRange ? priceRange.value : 100000);

    if (priceLabel) priceLabel.textContent = `$${maxPrice.toLocaleString()}`;

    productCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      const cardMat = card.getAttribute('data-material');
      const cardPrice = parseInt(card.getAttribute('data-price') || 0);

      const matchCat = selectedCats.length === 0 || selectedCats.includes(cardCat);
      const matchMat = selectedMats.length === 0 || selectedMats.includes(cardMat);
      const matchPrice = cardPrice <= maxPrice;

      if (matchCat && matchMat && matchPrice) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 50);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  }

  if (catFilters.length > 0 || matFilters.length > 0) {
    catFilters.forEach(cb => cb.addEventListener('change', filterProducts));
    matFilters.forEach(cb => cb.addEventListener('change', filterProducts));
    priceRange?.addEventListener('input', filterProducts);

    clearBtn?.addEventListener('click', () => {
      catFilters.forEach(cb => cb.checked = true);
      matFilters.forEach(cb => cb.checked = false);
      if (priceRange) priceRange.value = 100000;
      filterProducts();
    });

    filterProducts();
  }

});


