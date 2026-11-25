/* ============================================
   SS BREWCART - A Premium Beer Store by Sumit Sinha
   main.js - Core interactions, INR Pricing, Modals & Cart
   ============================================ */

'use strict';

// ==========================================
// PRODUCT DATA (in Indian Rupees - INR ₹)
// ==========================================
const PRODUCTS = [
  {
    id: 1,
    name: 'Golden Brew',
    category: 'Lager',
    price: 299,
    description: 'A brilliantly clear golden lager with a crisp, refreshing finish. Brewed with the finest malt and aromatic hops for a perfectly balanced taste.',
    longDesc: 'Golden Brew is our flagship craft lager — crafted for those who appreciate clarity, smoothness, and elegance in every sip. Its radiant golden hue, lively effervescence, and clean bitterness make it the perfect companion for memorable evenings.',
    badge: 'Best Seller',
    emoji: '🍺',
    color: '#F4B52A',
    specs: ['ABV: 5.2%', 'IBU: 18', 'Volume: 500ml', 'Style: Crafted German Pilsner'],
    featured: true
  },
  {
    id: 2,
    name: 'Amber Classic',
    category: 'Ale',
    price: 349,
    description: 'Rich, malty amber ale with caramel undertones and a smooth, velvety mouthfeel. A timeless classic for discerning beer connoisseurs.',
    longDesc: 'Amber Classic draws inspiration from heritage craft ale traditions. Deep copper in color, it delivers a satisfying malt-forward flavor with notes of toasted caramel, toffee, and a gentle hop bite that lingers gracefully.',
    badge: 'Signature',
    emoji: '🥃',
    color: '#D4842A',
    specs: ['ABV: 4.8%', 'IBU: 24', 'Volume: 500ml', 'Style: Royal English Amber'],
    featured: true
  },
  {
    id: 3,
    name: 'Sunset Lager',
    category: 'Lager',
    price: 249,
    description: 'Light-bodied lager with a warm golden sunset hue. Easy-drinking with hints of citrus peel and a crisp, rejuvenating finish.',
    longDesc: 'Inspired by golden hour moments, Sunset Lager is light, aromatic, and effortlessly refreshing. Subtle citrus zest and a gentle malt profile make it a crowd favorite for relaxed sundowners and celebrations.',
    badge: 'New Arrival',
    emoji: '🌅',
    color: '#EFA34A',
    specs: ['ABV: 4.5%', 'IBU: 12', 'Volume: 500ml', 'Style: Crisp Summer Lager'],
    featured: false
  },
  {
    id: 4,
    name: 'Royal Malt',
    category: 'Stout',
    price: 499,
    description: 'A dark, full-bodied artisanal stout with roasted malt character. Notes of dark chocolate, roasted coffee beans, and a creamy finish.',
    longDesc: 'Royal Malt is the pinnacle of the SS BrewCart reserve. Roasted malts deliver deep dark chocolate complexity, complemented by aromatic roasted cocoa and an unmistakably rich, velvety texture.',
    badge: 'Premium Reserve',
    emoji: '👑',
    color: '#30251C',
    specs: ['ABV: 6.5%', 'IBU: 35', 'Volume: 500ml', 'Style: Imperial Craft Stout'],
    featured: true
  },
  {
    id: 5,
    name: 'Crystal Blonde',
    category: 'Blonde',
    price: 279,
    description: 'Effortlessly elegant blonde ale. Crystal clear with delicate floral hops, soft wheat notes, and a refreshing, light finish.',
    longDesc: 'Crystal Blonde embodies pure sophistication. Brewed with delicate wheat malts and handpicked floral hops, this blonde ale brings a gentle, sparkling taste that is wonderfully clean and invigorating.',
    badge: 'Gentle & Crisp',
    emoji: '✨',
    color: '#FACA5C',
    specs: ['ABV: 4.3%', 'IBU: 15', 'Volume: 500ml', 'Style: Belgian Style Blonde'],
    featured: false
  },
  {
    id: 6,
    name: 'Premium Hops',
    category: 'IPA',
    price: 399,
    description: 'Bold, aromatic India Pale Ale. Bursting with tropical hop character — citrus zest, pine, and mango — with a crisp, punchy finish.',
    longDesc: 'Premium Hops is an unapologetically bold IPA. Generously dry-hopped with exotic varieties, it delivers an aromatic explosion of juicy mango, pine resin, and citrus peel with a deeply satisfying hoppy finish.',
    badge: 'Connoisseur Pick',
    emoji: '🌿',
    color: '#7DAF3A',
    specs: ['ABV: 6.2%', 'IBU: 55', 'Volume: 500ml', 'Style: West Coast IPA'],
    featured: true
  }
];

// ==========================================
// CURRENCY FORMATTER (Indian Rupees INR - ₹)
// ==========================================
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

function formatPrice(amount) {
  return inrFormatter.format(amount);
}

// ==========================================
// STATE & LOCAL STORAGE
// ==========================================
let cart = JSON.parse(localStorage.getItem('ss-brewcart-cart') || '[]');
let activeFilter = 'All';

function saveCart() {
  localStorage.setItem('ss-brewcart-cart', JSON.stringify(cart));
}

// ==========================================
// ANIMATED NOTIFICATIONS
// ==========================================
function showToast(message, icon = '✨') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  });
}

// ==========================================
// LOADING SCREEN
// ==========================================
function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;
  setTimeout(() => {
    screen.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1600);
  document.body.style.overflow = 'hidden';
}

// ==========================================
// NAVBAR
// ==========================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link check
  const links = navbar.querySelectorAll('.nav-links a');
  const path = window.location.pathname;
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (path.endsWith(href) || (href === 'index.html' && (path.endsWith('/') || path.endsWith('index.html'))))) {
      link.classList.add('active');
    }
  });
}

// ==========================================
// SCROLL TO TOP
// ==========================================
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ==========================================
// CART DRAWER & INTERACTIONS
// ==========================================
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.querySelector('.cart-overlay');
  if (!drawer) return;
  drawer.classList.add('open');
  if (overlay) overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
  renderCartItems();
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.querySelector('.cart-overlay');
  if (!drawer) return;
  drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
  document.body.style.overflow = '';
}

function initCart() {
  updateCartDisplay();

  const cartBtns = document.querySelectorAll('.btn-cart');
  const overlay = document.querySelector('.cart-overlay');
  const closeBtn = document.querySelector('.cart-close');

  cartBtns.forEach(btn => btn.addEventListener('click', openCartDrawer));
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  if (overlay) overlay.addEventListener('click', closeCartDrawer);
}

function addToCart(productId, qty = 1, shouldOpenDrawer = true) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      category: product.category,
      qty
    });
  }
  saveCart();
  updateCartDisplay();

  // Show attractive notification
  showToast(`Added to Cart! ${product.name} (${formatPrice(product.price)})`, '🛍️');

  // Open drawer for smooth user feedback
  if (shouldOpenDrawer) {
    setTimeout(openCartDrawer, 250);
  }
}

function removeFromCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartDisplay();
  renderCartItems();
  if (product) {
    showToast(`Removed ${product.name} from Cart`, '🗑️');
  }
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  updateCartDisplay();
  renderCartItems();
}

function updateCartDisplay() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const badges = document.querySelectorAll('.cart-count');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('show', count > 0);
  });
}

function renderCartItems() {
  const container = document.querySelector('.cart-items');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty" style="text-align:center; padding:50px 20px;">
        <div style="width:90px; height:90px; margin:0 auto 16px; border-radius:50%; background:rgba(244,181,42,0.15); display:flex; align-items:center; justify-content:center; font-size:2.8rem;">
          🍺
        </div>
        <h4 style="font-family:'Playfair Display',serif; font-size:1.25rem; font-weight:700; color:#30251C; margin-bottom:8px;">Your Cart is Empty</h4>
        <p style="color:#9E8572; font-size:0.88rem; max-width:240px; margin:0 auto 20px; line-height:1.5;">Explore our premium collection and discover your signature brew.</p>
        <button onclick="closeCartDrawer(); window.location.href='collection.html'" class="btn-primary" style="padding:10px 24px; font-size:0.85rem;">
          Browse Collection
        </button>
      </div>
    `;
    updateCartTotals(0);
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)} each</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)" title="Decrease">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)" title="Increase">+</button>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item">✕</button>
        <div style="font-family:'Playfair Display',serif; font-weight:800; font-size:0.95rem; color:#30251C; margin-top:auto;">
          ${formatPrice(item.price * item.qty)}
        </div>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  updateCartTotals(total);
}

function updateCartTotals(subtotal) {
  const subtotalEl = document.querySelector('.cart-subtotal');
  const totalEl = document.querySelector('.cart-grand-total');
  const tax = Math.round(subtotal * 0.05); // 5% GST simulation
  const grandTotal = subtotal + tax;

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (totalEl) totalEl.textContent = formatPrice(grandTotal);
}

// Window globals for inline calls
window.updateCartQty = updateCartQty;
window.removeFromCart = removeFromCart;
window.addToCart = addToCart;
window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;
window.formatPrice = formatPrice;

// ==========================================
// PRODUCT MODAL
// ==========================================
function initProductModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;

  const overlay = modal.querySelector('.modal-overlay');
  const closeBtn = modal.querySelector('.modal-close');

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (overlay) overlay.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

window.openProductModal = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const modal = document.getElementById('product-modal');
  if (!modal) return;

  modal.querySelector('.modal-category').textContent = product.category;
  modal.querySelector('.modal-name').textContent = product.name;
  modal.querySelector('.modal-price').textContent = formatPrice(product.price);
  modal.querySelector('.modal-desc').textContent = product.longDesc || product.description;
  modal.querySelector('.modal-img').style.fontSize = '7.5rem';
  modal.querySelector('.modal-img').textContent = product.emoji;

  const specsEl = modal.querySelector('.modal-specs');
  if (specsEl) {
    specsEl.innerHTML = product.specs.map(s => `
      <div class="modal-spec">
        <span class="modal-spec-icon">✦</span>
        <span>${s}</span>
      </div>
    `).join('');
  }

  const addBtn = modal.querySelector('.btn-modal-cart');
  if (addBtn) {
    addBtn.onclick = () => {
      addToCart(product.id, 1, true);
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

// ==========================================
// LOGIN MODAL
// ==========================================
function initLoginModal() {
  const modal = document.getElementById('login-modal');
  if (!modal) return;

  const overlay = modal.querySelector('.modal-overlay');
  const closeBtn = modal.querySelector('.login-modal-close');
  const loginBtns = document.querySelectorAll('.btn-login, .mobile-nav .login-link');
  const form = modal.querySelector('.login-form');

  function open() { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { modal.classList.remove('open'); document.body.style.overflow = ''; }

  loginBtns.forEach(btn => btn.addEventListener('click', open));
  if (overlay) overlay.addEventListener('click', close);
  if (closeBtn) closeBtn.addEventListener('click', close);

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      showToast('Welcome to SS BrewCart! Demo sign-in successful.', '👋');
      close();
    });
  }
}

// ==========================================
// SEARCH & FILTERS
// ==========================================
function initSearch() {
  const searchInput = document.querySelector('.search-wrap input');
  if (!searchInput) return;

  searchInput.addEventListener('input', debounce(e => {
    const query = e.target.value.trim().toLowerCase();
    filterProducts(activeFilter, query);
  }, 250));
}

function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter || 'All';
      const query = document.querySelector('.search-wrap input')?.value.trim().toLowerCase() || '';
      filterProducts(activeFilter, query);
    });
  });
}

function filterProducts(filter, query = '') {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const cards = grid.querySelectorAll('.product-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const name = card.dataset.name?.toLowerCase() || '';
    const cat = card.dataset.category?.toLowerCase() || '';
    const matchFilter = filter === 'All' || cat === filter.toLowerCase();
    const matchQuery = !query || name.includes(query) || cat.includes(query);

    if (matchFilter && matchQuery) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const countEl = document.querySelector('.collection-count');
  if (countEl) countEl.textContent = `${visibleCount} beverage${visibleCount !== 1 ? 's' : ''} available`;
}

// ==========================================
// PRODUCT RENDERING (Cards)
// ==========================================
function renderProductGrid() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((p, i) => `
    <div class="product-card card-3d reveal stagger-item"
         data-id="${p.id}"
         data-price="${p.price}"
         data-name="${p.name.toLowerCase()}"
         data-category="${p.category.toLowerCase()}"
         style="transition-delay:${i * 0.08}s"
         onclick="openProductModal(${p.id})">
      ${p.badge ? `<span class="product-badge ${p.badge.includes('New') ? 'new' : ''}">${p.badge}</span>` : ''}
      <div class="product-img-wrap">
        ${createBottleArt(p)}
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.description}</div>
        <div class="product-footer">
          <div class="product-price">${formatPrice(p.price)}</div>
          <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${p.id}, 1, true);">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function createBottleArt(product) {
  const colors = {
    'Lager':  { body: '#F4B52A', cap: '#D99A14', label: '#FFF9ED', liquid: 'rgba(244,181,42,0.7)' },
    'Ale':    { body: '#D4842A', cap: '#A05010', label: '#FFF3D0', liquid: 'rgba(180,100,30,0.7)' },
    'Stout':  { body: '#30251C', cap: '#1A1208', label: '#3D2B1F', liquid: 'rgba(30,20,10,0.9)' },
    'Blonde': { body: '#FACA5C', cap: '#D99A14', label: '#FFF9ED', liquid: 'rgba(250,202,92,0.7)' },
    'IPA':    { body: '#7DAF3A', cap: '#4A7020', label: '#F0FFF0', liquid: 'rgba(100,160,50,0.6)' },
  };
  const c = colors[product.category] || colors['Lager'];
  return `
  <svg class="product-bottle-art" viewBox="0 0 120 220" width="120" height="220" style="overflow:visible">
    <defs>
      <linearGradient id="bg${product.id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${c.body}" stop-opacity="0.95"/>
        <stop offset="40%" stop-color="${c.body}" stop-opacity="1"/>
        <stop offset="100%" stop-color="${c.cap}" stop-opacity="0.85"/>
      </linearGradient>
      <linearGradient id="shine${product.id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="rgba(255,255,255,0.4)"/>
        <stop offset="40%" stop-color="rgba(255,255,255,0.1)"/>
        <stop offset="100%" stop-color="rgba(0,0,0,0.1)"/>
      </linearGradient>
      <linearGradient id="liq${product.id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${c.liquid}"/>
        <stop offset="100%" stop-color="${c.cap}" stop-opacity="0.8"/>
      </linearGradient>
      <filter id="shadow${product.id}">
        <feDropShadow dx="4" dy="8" stdDeviation="6" flood-color="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <!-- Cap -->
    <rect x="46" y="10" width="28" height="20" rx="4" fill="${c.cap}" filter="url(#shadow${product.id})"/>
    <rect x="43" y="26" width="34" height="8" rx="2" fill="${c.cap}"/>
    <!-- Neck -->
    <path d="M43 34 Q43 50 36 60 L36 80 L84 80 L84 60 Q77 50 77 34 Z" fill="url(#bg${product.id})" filter="url(#shadow${product.id})"/>
    <!-- Body -->
    <rect x="30" y="80" width="60" height="128" rx="10" fill="url(#bg${product.id})" filter="url(#shadow${product.id})"/>
    <!-- Liquid fill -->
    <rect x="32" y="100" width="56" height="96" rx="8" fill="url(#liq${product.id})" opacity="0.5"/>
    <!-- Label -->
    <rect x="34" y="110" width="52" height="70" rx="6" fill="${c.label}" opacity="0.95"/>
    <rect x="38" y="116" width="44" height="4" rx="2" fill="${c.cap}" opacity="0.6"/>
    <text x="60" y="132" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="7.5" font-weight="900" fill="#30251C" letter-spacing="0.5">SS BREWCART</text>
    <text x="60" y="152" text-anchor="middle" font-family="Georgia, serif" font-size="8.5" font-weight="700" fill="${c.cap}">${product.name.toUpperCase()}</text>
    <text x="60" y="165" text-anchor="middle" font-family="Arial" font-size="7" fill="${c.cap}" opacity="0.75">${product.category} · ₹${product.price}</text>
    <rect x="38" y="172" width="44" height="3" rx="1.5" fill="${c.cap}" opacity="0.5"/>
    <!-- Shine -->
    <path d="M36 60 Q36 50 40 40 L40 208 Q36 208 36 200 Z" fill="url(#shine${product.id})" rx="4"/>
    <!-- Highlights -->
    <circle cx="70" cy="135" r="3" fill="rgba(255,255,255,0.3)"/>
    <circle cx="75" cy="150" r="2" fill="rgba(255,255,255,0.25)"/>
  </svg>`;
}

window.createBottleArt = createBottleArt;

// ==========================================
// FEATURED CAROUSEL
// ==========================================
function renderFeaturedCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const featured = PRODUCTS.filter(p => p.featured);

  track.innerHTML = featured.map(p => `
    <div class="carousel-slide" onclick="openProductModal(${p.id})">
      <div class="carousel-img">${createBottleArt(p)}</div>
      <div class="carousel-info">
        <div class="carousel-category">${p.category}</div>
        <div class="carousel-name">${p.name}</div>
        <div class="carousel-desc">${p.description}</div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
          <div class="carousel-price">${formatPrice(p.price)}</div>
          <button class="btn-add-cart" style="padding:8px 16px; font-size:0.78rem;" onclick="event.stopPropagation(); addToCart(${p.id}, 1, true);">
            Add +
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  if (!track) return;

  let current = 0;
  const slides = track.querySelectorAll('.carousel-slide');

  function getSlidesPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, slides.length - getSlidesPerView());
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, getMaxIndex()));
    const firstSlide = slides[0];
    if (!firstSlide) return;
    const slideWidth = firstSlide.offsetWidth + 28;
    track.style.transform = `translateX(-${current * slideWidth}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  window.addEventListener('resize', () => goTo(0), { passive: true });
}

// ==========================================
// PARALLAX & BUBBLES
// ==========================================
function initParallax() {
  const blobs = document.querySelectorAll('.hero-blob');
  const heroRight = document.querySelector('.hero-right');

  window.addEventListener('mousemove', e => {
    const mx = (e.clientX / window.innerWidth - 0.5) * 2;
    const my = (e.clientY / window.innerHeight - 0.5) * 2;

    blobs.forEach((blob, i) => {
      const factor = (i + 1) * 8;
      blob.style.transform = `translate(${mx * factor}px, ${my * factor}px)`;
    });

    if (heroRight) {
      heroRight.style.transform = `translate(${mx * 5}px, ${my * 3}px)`;
    }
  }, { passive: true });
}

function createBubbles() {
  const stage = document.querySelector('.bottle-stage');
  if (!stage) return;

  const bubbleData = [
    { size: 12, x: 85, bottom: 30, dur: 4.5, del: 0, swayDur: 2.5 },
    { size: 8, x: 100, bottom: 50, dur: 5, del: 1.5, swayDur: 3 },
    { size: 16, x: 60, bottom: 20, dur: 6, del: 0.5, swayDur: 2 },
    { size: 6, x: 110, bottom: 70, dur: 4, del: 2, swayDur: 3.5 },
    { size: 10, x: 75, bottom: 10, dur: 5.5, del: 3, swayDur: 2.8 },
  ];

  bubbleData.forEach(b => {
    const bubble = document.createElement('div');
    bubble.className = 'animated-bubble';
    bubble.style.cssText = `
      width:${b.size}px; height:${b.size}px;
      left:${b.x}px; bottom:${b.bottom}px;
      animation-duration:${b.dur}s, ${b.swayDur}s;
      animation-delay:${b.del}s, ${b.del}s;
      background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(244,181,42,0.3));
      box-shadow: inset -1px -1px 3px rgba(0,0,0,0.1);
    `;
    stage.appendChild(bubble);
  });
}

// ==========================================
// COUNTERS
// ==========================================
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const duration = 1800;
  const start = performance.now();
  const suffix = el.dataset.suffix || '';
  const isDecimal = target !== Math.floor(target);

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = isDecimal ? current.toFixed(1) + suffix : Math.floor(current) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(update);
}

// ==========================================
// SCROLL REVEALS
// ==========================================
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'in-view');
        if (entry.target.classList.contains('diagram-card')) {
          entry.target.querySelectorAll('.arrow-line').forEach((line, i) => {
            line.style.animationDelay = `${i * 0.3}s`;
            line.style.animationPlayState = 'running';
          });
        }
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-wrap, .diagram-card').forEach(el => {
    observer.observe(el);
  });
}

function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ==========================================
// PRICE SLIDER (Collection Page)
// ==========================================
function initPriceSlider() {
  const slider = document.querySelector('.price-slider');
  const label = document.querySelector('.price-max-label');
  if (!slider || !label) return;

  slider.addEventListener('input', () => {
    const maxVal = parseFloat(slider.value);
    label.textContent = formatPrice(maxVal);
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.querySelectorAll('.product-card').forEach(card => {
      const price = parseFloat(card.dataset.price || 0);
      card.style.display = price <= maxVal ? '' : 'none';
    });
  });
}

// ==========================================
// NEWSLETTER
// ==========================================
function initNewsletter() {
  const form = document.querySelector('.nl-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input')?.value;
    if (!email) return;
    showToast(`Welcome to SS BrewCart family! You're subscribed with ${email}`, '📬');
    form.reset();
  });
}

// ==========================================
// THEME TOGGLE (Luxury Dark & Light Mode)
// ==========================================
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const toggleBtns = document.querySelectorAll('.btn-theme-toggle');
  toggleBtns.forEach(btn => {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Luxury Dark Mode');
  });
}

function initThemeToggle() {
  const savedTheme = localStorage.getItem('ss-brewcart-theme') || 'dark';
  applyTheme(savedTheme);

  const toggleBtns = document.querySelectorAll('.btn-theme-toggle');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('ss-brewcart-theme', nextTheme);
      showToast(nextTheme === 'dark' ? 'Luxury Dark Mode Activated 🌙' : 'Warm Cream Light Mode Activated ☀️', '🎨');
    });
  });
}

// Immediate theme execution to prevent flash
(function() {
  const current = localStorage.getItem('ss-brewcart-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', current);
})();

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initLoadingScreen();
  initNavbar();
  initScrollTop();
  initCart();
  initProductModal();
  initLoginModal();
  renderProductGrid();
  renderFeaturedCarousel();
  initCarousel();
  initFilters();
  initSearch();
  initScrollAnimations();
  initCounters();
  initParallax();
  createBubbles();
  initNewsletter();
  initPriceSlider();
});
