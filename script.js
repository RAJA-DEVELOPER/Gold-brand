/* Luxury Preloader */
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


 /* Navbar Scroll Behaviour */
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

 /* Set Active Nav Link */
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

 // Dynamic Profile Nav & Mobile Menu
 const updateNavForAuth = () => {
 const loggedInEmail = localStorage.getItem('tanishq_loggedIn');
 const users = JSON.parse(localStorage.getItem('tanishq_users')) || [];
 const currentUser = users.find(u => u.email === loggedInEmail);
 
 const dropdown = document.getElementById('profileDropdown');
 const navMobile = document.getElementById('navMobile');
 
 if (currentUser) {
 // Desktop Dropdown
 if (dropdown) {
 dropdown.innerHTML = `
 <div style="padding: 12px 20px; border-bottom: 1px solid #eee; font-weight: 700; font-size: 0.8rem; color: var(--color-gold);">
 ${currentUser.fname} ${currentUser.lname}
 </div>
 <a href="dashboard.html">Dashboard</a>
 <a href="#" id="signOutBtn" style="color: #a00;">Sign Out</a>
 `;
 
 document.getElementById('signOutBtn')?.addEventListener('click', (e) => {
 e.preventDefault();
 localStorage.removeItem('tanishq_loggedIn');
 window.location.href = 'login.html';
 });
 }
 
 // Mobile Menu
 if (navMobile) {
 // Check if Dashboard link already exists
 if (!navMobile.querySelector('a[href="dashboard.html"]')) {
 const dashLink = document.createElement('a');
 dashLink.href = 'dashboard.html';
 dashLink.style.color = 'var(--color-gold)';
 dashLink.innerText = 'Dashboard';
 navMobile.appendChild(dashLink);
 }
 }
 } else {
 if (dropdown) {
 dropdown.innerHTML = `
 <a href="login.html">Log In</a>
 <a href="signup.html">Sign Up</a>
 `;
 }
 }
 };
 updateNavForAuth();

 /* Mobile Menu Toggle */
 const navToggle = document.getElementById('navToggle');
 const navMobile = document.getElementById('navMobile');
 const navClose = document.getElementById('navClose');

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

 // Handle Resize close menu if desktop
 window.addEventListener('resize', () => {
 if (window.innerWidth > 768) {
 navToggle?.classList.remove('open');
 navMobile?.classList.remove('open');
 document.body.style.overflow = '';
 }
 });

 /* Scroll To Top Button */
 const scrollTopBtn = document.getElementById('scrollTop');

 window.addEventListener('scroll', () => {
 if (scrollTopBtn) {
 scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
 }
 }, { passive: true });

 scrollTopBtn?.addEventListener('click', () => {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 });

 /* Intersection Observer Reveal Animations */
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


 /* Counter Animation */
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

 /* Newsletter Form */
 document.querySelectorAll('.footer-newsletter-form').forEach(form => {
 form.addEventListener('submit', e => {
 e.preventDefault();
 const input = form.querySelector('input');
 const btn = form.querySelector('button');
 if (!input?.value.trim()) return;

 btn.textContent = ' Subscribed';
 btn.style.background = '#2e7d32';
 btn.style.color = '#fff';
 input.value = '';
 input.placeholder = 'Thank you!';
 input.disabled = true;
 btn.disabled = true;
 });
 });

 /* Removed Mouse Parallax for Speed */

 /* Simple Toast Notification */
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
 setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(12px)'; }, 2000); // Accelerated hide
 };

 /* Lazy-load images */
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

 /* Removed Magnetic Effects for Speed */

 /* Video Modal Logic */
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

 /* Collection Filtering */
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


// Profile Dropdown Click Logic
document.addEventListener('DOMContentLoaded', () => {
  const profileBtn = document.getElementById('profileDropdownBtn');
  const dropdown = document.getElementById('profileDropdown');
  
  if(profileBtn && dropdown) {
    profileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle('active');
    });

    // Mobile Profile Support
    const mobileProfileBtn = document.querySelector('.nav-mobile-profile');
    if (mobileProfileBtn) {
      mobileProfileBtn.setAttribute('href', 'javascript:void(0)');
      mobileProfileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const navActions = document.querySelector('.nav-actions');
        if (window.innerWidth <= 768 && dropdown.parentElement !== navActions) {
          navActions.appendChild(dropdown);
        }
        dropdown.classList.toggle('active');
      });
    }

    document.addEventListener('click', (e) => {
      if(!e.target.closest('.nav-dropdown') && !e.target.closest('.nav-mobile-profile') && !e.target.closest('.dropdown-menu')) {
        dropdown.classList.remove('active');
      }
    });
  }
});
// Client-Side Authentication System
document.addEventListener('DOMContentLoaded', () => {
 const users = JSON.parse(localStorage.getItem('tanishq_users')) || [];
 const loggedInEmail = localStorage.getItem('tanishq_loggedIn');
 const currentUser = users.find(u => u.email === loggedInEmail);

 // Update Navbar based on login status
 const profileDropdown = document.getElementById('profileDropdown');
 if (profileDropdown) {
 if (currentUser) {
 profileDropdown.innerHTML = `
 <div style="padding: 12px 20px; border-bottom: 1px solid #eee; font-weight: bold; background: #fafafa; color: #333;">` + currentUser.fname + ` ` + currentUser.lname + `</div>
 <a href="dashboard.html">Dashboard</a>
 <a href="#" id="navSignOutBtn" style="color: #a00 !important;">Sign Out</a>
 `;
 document.getElementById('navSignOutBtn').addEventListener('click', (e) => {
 e.preventDefault();
 localStorage.removeItem('tanishq_loggedIn');
 window.location.href = 'login.html';
 });
 }
 }

 // Handle Signup Form
 const signupForm = document.getElementById('signupForm');
 if (signupForm) {
 signupForm.addEventListener('submit', (e) => {
 e.preventDefault();
 const fname = document.getElementById('fname').value;
 const lname = document.getElementById('lname').value;
 const email = document.getElementById('email').value;
 const password = document.getElementById('password').value;

 if (users.find(u => u.email === email)) {
 alert('An account with this email already exists. Please log in.');
 return;
 }

 users.push({
 fname, lname, email, password,
 status: 'Gold Member',
 orders: [],
 wishlist: [],
 rewardPoints: 500 // Welcome Bonus
 });
 localStorage.setItem('tanishq_users', JSON.stringify(users));
 localStorage.setItem('tanishq_loggedIn', email);
 window.location.href = 'index.html';
 });
 }

 // Handle Login Form
 const loginForm = document.getElementById('loginForm');
 if (loginForm) {
 loginForm.addEventListener('submit', (e) => {
 e.preventDefault();
 const email = document.getElementById('email').value;
 const password = document.getElementById('password').value;

 const user = users.find(u => u.email === email && u.password === password);
 if (user) {
 localStorage.setItem('tanishq_loggedIn', email);
 window.location.href = 'index.html';
 } else {
 alert('Invalid email or password. Please try again.');
 }
 });
 }

 // Password Visibility Toggle
 const togglePasswords = document.querySelectorAll('.toggle-password');
 togglePasswords.forEach(toggle => {
 toggle.addEventListener('click', function (e) {
 const targetId = this.getAttribute('data-target');
 const input = document.getElementById(targetId);
 if (input.type === 'password') {
 input.type = 'text';
 this.classList.remove('fa-eye');
 this.classList.add('fa-eye-slash');
 } else {
 input.type = 'password';
 this.classList.remove('fa-eye-slash');
 this.classList.add('fa-eye');
 }
 });
 });

 // Populate Dashboard
 const dashboardMain = document.getElementById('dashboardMain');
 if (dashboardMain) {
 if (!currentUser) {
 window.location.href = 'login.html';
 return;
 }

 document.getElementById('dashWelcome').innerText = 'Welcome Back, ' + currentUser.fname + '.';
 document.getElementById('dashProfileName').innerText = currentUser.fname + ' ' + currentUser.lname;
 document.getElementById('dashProfileAvatar').innerText = currentUser.fname.charAt(0).toUpperCase();
 
 // Update Stats
 document.getElementById('dashOrderCount').innerText = currentUser.orders.length;
 document.getElementById('dashRewardPoints').innerText = currentUser.rewardPoints || 0;

 // Render Orders
 const ordersTbody = document.getElementById('ordersTbody');
 const fullOrdersTbody = document.getElementById('fullOrdersTbody');
 if (currentUser.orders.length === 0) {
 if (ordersTbody) {
 ordersTbody.closest('table').classList.add('empty-state-table');
 ordersTbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: #888;"><div style="max-width: 300px; margin: 0 auto; line-height: 1.6;">Your dashboard is currently empty. Begin your collection today.</div></td></tr>';
 }
 if (fullOrdersTbody) {
 fullOrdersTbody.closest('table').classList.add('empty-state-table');
 fullOrdersTbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: #888;">No historical orders found.</td></tr>';
 }
 }

 // Render Wishlist
 const wishlistContainer = document.getElementById('wishlistContainer');
 if (currentUser.wishlist.length === 0 && wishlistContainer) {
 wishlistContainer.innerHTML = '<div style="grid-column: 1/-1; padding: 40px; text-align: center; color: #888; border: 1px dashed #ddd; width: 100%;">Your wishlist is empty. Explore our catalog to add masterpieces.</div>';
 }

 // Populate Settings
 if (document.getElementById('setFname')) document.getElementById('setFname').value = currentUser.fname;
 if (document.getElementById('setLname')) document.getElementById('setLname').value = currentUser.lname;
 if (document.getElementById('setEmail')) document.getElementById('setEmail').value = currentUser.email;

 // Bind signout on dashboard sidebar
 const dashSignOut = document.getElementById('dashSignOut');
 if (dashSignOut) {
 dashSignOut.addEventListener('click', (e) => {
 e.preventDefault();
 localStorage.removeItem('tanishq_loggedIn');
 window.location.href = 'login.html';
 });
 }
 }
});

// Dashboard View Switcher
window.switchView = function(viewId, element) {
 if (typeof window !== 'undefined' && window.event) {
 window.event.preventDefault();
 }
 
 // Hide all views
 const views = document.querySelectorAll('.dash-view');
 views.forEach(v => v.classList.remove('active'));
 
 // Remove active from links
 const links = document.querySelectorAll('.sidebar-menu a');
 links.forEach(l => l.classList.remove('active'));
 
 // Activate target
 const target = document.getElementById(viewId);
 if (target) target.classList.add('active');
 
 if (element) {
 element.classList.add('active');
 } else {
 // Fallback active state for external links (e.g. "View All Orders")
 const match = document.querySelector(".sidebar-menu a[onclick*='" + viewId + "']");
 if (match) match.classList.add('active');
 }
};

// Dashboard Functionality: Settings & Actions
document.addEventListener('DOMContentLoaded', () => {
 const users = JSON.parse(localStorage.getItem('tanishq_users')) || [];
 const loggedInEmail = localStorage.getItem('tanishq_loggedIn');
 const currentUser = users.find(u => u.email === loggedInEmail);

 // Handle Settings Form Save
 const settingsForm = document.getElementById('settingsForm');
 if (settingsForm && currentUser) {
 settingsForm.addEventListener('submit', (e) => {
 e.preventDefault();
 
 const newFname = document.getElementById('setFname').value;
 const newLname = document.getElementById('setLname').value;
 
 // Update Current User
 currentUser.fname = newFname;
 currentUser.lname = newLname;
 
 // Update in Array
 const userIndex = users.findIndex(u => u.email === currentUser.email);
 if (userIndex !== -1) {
 users[userIndex] = currentUser;
 localStorage.setItem('tanishq_users', JSON.stringify(users));
 }
 
 // Update UI Live
 document.getElementById('dashWelcome').innerText = 'Welcome Back, ' + currentUser.fname + '.';
 document.getElementById('dashProfileName').innerText = currentUser.fname + ' ' + currentUser.lname;
 document.getElementById('dashProfileAvatar').innerText = currentUser.fname.charAt(0).toUpperCase();
 
 const profileDropdown = document.getElementById('profileDropdown');
 if (profileDropdown) {
 const nameDiv = profileDropdown.querySelector('div');
 if (nameDiv) nameDiv.innerText = currentUser.fname + ' ' + currentUser.lname;
 }

 // Show Toast
 if(window.showToast) {
 window.showToast('Profile updated successfully!', 'success');
 } else {
 alert('Profile updated successfully!');
 }
 });
 }
});

// Dashboard Forms (Appointments & Bespoke)
document.addEventListener('DOMContentLoaded', () => {
 const apptForm = document.getElementById('appointmentForm');
 if (apptForm) {
 apptForm.addEventListener('submit', (e) => {
 e.preventDefault();
 apptForm.style.display = 'none';
 document.getElementById('apptSuccess').style.display = 'block';
 
 const apptCount = document.getElementById('dashApptCount');
 if(apptCount) apptCount.innerText = parseInt(apptCount.innerText) + 1;
 });
 }

 const bespokeForm = document.getElementById('bespokeForm');
 if (bespokeForm) {
 bespokeForm.addEventListener('submit', (e) => {
 e.preventDefault();
 bespokeForm.style.display = 'none';
 document.getElementById('bespokeSuccess').style.display = 'block';
 });
 }
});
