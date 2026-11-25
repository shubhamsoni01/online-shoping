/* ============================================
   SS BREWCART - A Premium Beer Store by Sumit Sinha
   cart.js - Cart & Order Simulation in Indian Rupees (₹)
   ============================================ */

'use strict';

function simulateCheckout() {
  const cart = JSON.parse(localStorage.getItem('ss-brewcart-cart') || '[]');
  if (!cart.length) {
    if (typeof showToast === 'function') showToast('Your cart is empty! Add some craft brews first.', '🛒');
    return;
  }
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(total * 0.05);
  const grandTotal = total + tax;
  const orderNum = 'SS-BC' + Math.floor(100000 + Math.random() * 900000);

  const formattedTotal = typeof formatPrice === 'function' 
    ? formatPrice(grandTotal) 
    : `₹${grandTotal.toLocaleString('en-IN')}`;

  // Show order confirmation overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:9999;
    background:rgba(255,249,237,0.98); backdrop-filter:blur(24px);
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    gap:20px; padding:32px; text-align:center;
    animation: fadeIn 0.4s ease;
  `;
  overlay.innerHTML = `
    <div style="width:90px; height:90px; border-radius:50%; background:linear-gradient(135deg, #F4B52A, #EFA34A); display:flex; align-items:center; justify-content:center; font-size:3rem; box-shadow:0 12px 30px rgba(244,181,42,0.4);">
      🎉
    </div>
    <div style="font-size:0.78rem; font-weight:800; letter-spacing:0.2em; text-transform:uppercase; color:#D99A14;">
      SS BREWCART · ORDER SIMULATION
    </div>
    <div style="font-family:'Playfair Display',serif; font-size:2.2rem; font-weight:900; color:#30251C; letter-spacing:-0.02em; line-height:1.2;">
      Order Confirmed!
    </div>
    <div style="color:#5C4033; font-size:1.05rem; max-width:440px; line-height:1.7;">
      Thank you for exploring <strong>SS BrewCart</strong>.<br>
      Demo Order ID: <strong style="color:#D99A14; font-family:monospace; font-size:1.1rem;">#${orderNum}</strong><br>
      Total Amount: <strong style="color:#30251C; font-size:1.25rem;">${formattedTotal}</strong>
    </div>
    <div style="background:#FFF2D6; border:1px solid rgba(244,181,42,0.4); border-radius:12px; padding:12px 20px; font-size:0.82rem; color:#855800; max-width:420px; line-height:1.5;">
      ⚠️ <strong>Educational Prototype Only</strong>: This is a frontend demonstration for <em>SS BrewCart by Sumit Sinha</em>. No real alcoholic beverages are sold, and no real monetary payment has occurred.
    </div>
    <button onclick="this.parentElement.remove(); localStorage.removeItem('ss-brewcart-cart'); if(window.closeCartDrawer) window.closeCartDrawer(); location.reload();"
      style="margin-top:12px; padding:16px 44px; background:#F4B52A; color:#fff; border-radius:999px;
             font-weight:700; font-size:1rem; cursor:pointer; border:none; box-shadow:0 8px 24px rgba(244,181,42,0.45); transition:all 0.3s ease;"
      onmouseover="this.style.background='#D99A14'; this.style.transform='translateY(-2px)'"
      onmouseout="this.style.background='#F4B52A'; this.style.transform='translateY(0)'">
      Continue Exploring SS BrewCart →
    </button>
  `;
  document.body.appendChild(overlay);
}

window.simulateCheckout = simulateCheckout;
