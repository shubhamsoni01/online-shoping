/* ============================================
   SS BREWCART - A Premium Beer Store by Sumit Sinha
   diagrams.js - SVG Flow Diagrams & Admin Data in INR (₹)
   ============================================ */

'use strict';

// ==========================================
// DIAGRAM 1: Navigation Flow
// ==========================================
function renderNavFlowDiagram() {
  const container = document.getElementById('diagram-nav-flow');
  if (!container) return;

  const nodes = [
    { icon: '🏠', label: 'Home',       color: '#F4B52A' },
    { icon: '🍺', label: 'Collection', color: '#EFA34A' },
    { icon: '🔍', label: 'Product Details', color: '#D4842A' },
    { icon: '🛒', label: 'Demo Cart',  color: '#30251C' },
    { icon: '📋', label: 'Order Sim',  color: '#5C4033' },
    { icon: '✅', label: 'Confirmation', color: '#3DAD6E' },
  ];

  container.innerHTML = `
    <svg viewBox="0 0 720 100" width="100%" style="overflow:visible; min-height:100px">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#F4B52A"/>
        </marker>
        <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#F4B52A"/>
          <stop offset="100%" stop-color="#3DAD6E"/>
        </linearGradient>
      </defs>
      ${nodes.map((n, i) => {
        const x = 50 + i * 120;
        const hasArrow = i < nodes.length - 1;
        return `
          <g class="flow-node-svg" style="cursor:pointer">
            <circle cx="${x}" cy="45" r="28" fill="${n.color}" opacity="0.12" stroke="${n.color}" stroke-width="1.5"/>
            <circle cx="${x}" cy="45" r="22" fill="${n.color}" opacity="0.95"/>
            <text x="${x}" y="50" text-anchor="middle" font-size="14">${n.icon}</text>
            <text x="${x}" y="88" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" fill="#30251C">${n.label}</text>
            ${hasArrow ? `
            <line x1="${x+26}" y1="45" x2="${x+94}" y2="45"
              stroke="url(#flowGrad)" stroke-width="2" stroke-dasharray="6 3" marker-end="url(#arrowhead)"
              class="flow-animated-line" opacity="0.8"/>
            ` : ''}
          </g>
        `;
      }).join('')}
    </svg>
  `;
}

// ==========================================
// DIAGRAM 2: Shopping Experience Flow
// ==========================================
function renderShoppingFlow() {
  const container = document.getElementById('diagram-shopping-flow');
  if (!container) return;

  const steps = [
    { icon: '👀', label: 'Browse Products', sub: 'Explore SS Brews', color: '#F4B52A' },
    { icon: '🔍', label: 'Select Product',  sub: 'Details & ABV',    color: '#EFA34A' },
    { icon: '🛒', label: 'Add to Cart',     sub: 'Instant Drawer',   color: '#D4842A' },
    { icon: '📋', label: 'Review Cart',     sub: 'Qty & ₹ Subtotal', color: '#30251C' },
    { icon: '✨', label: 'Demo Confirm',    sub: 'Simulated Order',  color: '#3DAD6E' },
  ];

  container.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:0; overflow-x:auto; padding:8px 0;">
      ${steps.map((s, i) => `
        <div style="display:flex; align-items:center; gap:0;">
          <div style="text-align:center; padding:0 10px;">
            <div style="
              width:60px; height:60px; border-radius:50%;
              background:${s.color}22; border:2px solid ${s.color}66;
              display:flex; align-items:center; justify-content:center;
              font-size:1.5rem; margin:0 auto 10px;
              transition:transform 0.3s ease;
              cursor:default;
            " onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
              ${s.icon}
            </div>
            <div style="font-weight:700; font-size:0.82rem; color:#30251C; margin-bottom:3px;">${s.label}</div>
            <div style="font-size:0.72rem; color:#9E8572; white-space:nowrap;">${s.sub}</div>
          </div>
          ${i < steps.length - 1 ? `
          <svg width="36" height="20" style="flex-shrink:0; margin-top:-18px;">
            <defs>
              <marker id="sah${i}" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
                <polygon points="0 0, 6 2.5, 0 5" fill="#F4B52A"/>
              </marker>
            </defs>
            <line x1="2" y1="10" x2="30" y2="10" stroke="#F4B52A" stroke-width="2" stroke-dasharray="4 2" marker-end="url(#sah${i})"
              class="flow-animated-line"/>
          </svg>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

// ==========================================
// DIAGRAM 3: Admin Management Flow
// ==========================================
function renderAdminFlow() {
  const container = document.getElementById('diagram-admin-flow');
  if (!container) return;

  const nodes = [
    { icon: '⚙️', label: 'Admin Dashboard',   color: '#30251C', x: 350, y: 40 },
    { icon: '📦', label: 'Product Catalog',   color: '#F4B52A', x: 150, y: 160 },
    { icon: '📊', label: 'Inventory (₹ INR)', color: '#EFA34A', x: 350, y: 160 },
    { icon: '📋', label: 'Order Records',     color: '#D4842A', x: 550, y: 160 },
    { icon: '💰', label: 'Transactions (₹)',  color: '#3DAD6E', x: 350, y: 280 },
  ];

  const connections = [
    { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 },
    { from: 1, to: 4 }, { from: 2, to: 4 }, { from: 3, to: 4 },
  ];

  container.innerHTML = `
    <svg viewBox="0 0 700 340" width="100%" style="overflow:visible">
      <defs>
        <marker id="adArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#F4B52A" opacity="0.85"/>
        </marker>
      </defs>
      ${connections.map((c, i) => {
        const from = nodes[c.from];
        const to = nodes[c.to];
        return `
          <line x1="${from.x}" y1="${from.y + 32}" x2="${to.x}" y2="${to.y - 32}"
            stroke="#F4B52A" stroke-width="1.6" stroke-dasharray="6 3" opacity="0.6"
            marker-end="url(#adArrow)" class="flow-animated-line"
            style="animation-delay:${i * 0.2}s"/>
        `;
      }).join('')}
      ${nodes.map(n => `
        <g>
          <circle cx="${n.x}" cy="${n.y}" r="34" fill="${n.color}" opacity="0.1" stroke="${n.color}" stroke-width="1.5" stroke-dasharray="4 2"/>
          <circle cx="${n.x}" cy="${n.y}" r="26" fill="${n.color}" opacity="0.95"/>
          <text x="${n.x}" y="${n.y + 5}" text-anchor="middle" font-size="14">${n.icon}</text>
          <text x="${n.x}" y="${n.y + 52}" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#30251C">${n.label}</text>
        </g>
      `).join('')}
    </svg>
  `;
}

// ==========================================
// HOW IT WORKS PROCESS DIAGRAM
// ==========================================
function renderProcessDiagram() {
  const container = document.getElementById('process-diagram');
  if (!container) return;

  const steps = [
    { num: 1, icon: '🔍', title: 'Discover',   desc: 'Explore the curated SS BrewCart collection curated by Sumit Sinha.' },
    { num: 2, icon: '🍺', title: 'Select Brew',desc: 'Check taste notes, ABV strength, and authentic craft profiles in ₹.' },
    { num: 3, icon: '🛒', title: 'Instant Cart', desc: 'Add beverages with 1-click and adjust quantities in the live drawer.' },
    { num: 4, icon: '🎉', title: 'Demo Checkout', desc: 'Simulate instant confirmation with Indian Rupee totals and GST.' },
  ];

  container.innerHTML = `
    <div class="process-steps stagger-wrap">
      ${steps.map(s => `
        <div class="process-step stagger-item">
          <div class="process-num">
            ${s.num}
            <div class="process-step-icon">${s.icon}</div>
          </div>
          <div class="process-step-title">${s.title}</div>
          <div class="process-step-desc">${s.desc}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// ==========================================
// ADMIN CHARTS & TABLES (INR ₹)
// ==========================================
function renderAdminCharts() {
  renderSalesBarChart();
  renderCategoryDonut();
  renderMiniSparklines();
}

function renderSalesBarChart() {
  const el = document.getElementById('admin-chart-sales');
  if (!el) return;

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const values = [48, 62, 54, 85, 96, 78, 110, 89, 95, 125, 115, 142]; // in thousands of INR
  const max = Math.max(...values);

  el.innerHTML = `
    <div style="display:flex; align-items:flex-end; gap:8px; height:160px; padding:16px 0 0;">
      ${values.map((v, i) => `
        <div style="display:flex; flex-direction:column; align-items:center; flex:1; gap:6px;">
          <div style="
            width:100%; height:${(v/max)*120}px;
            background:linear-gradient(to top, #F4B52A, #EFA34A);
            border-radius:6px 6px 0 0;
            transition:height 0.6s ease ${i*0.04}s;
            position:relative;
            cursor:pointer;
          " title="₹${v},000 INR" onmouseover="this.style.filter='brightness(1.15)'" onmouseout="this.style.filter=''">
          </div>
          <span style="font-size:0.65rem; color:#9E8572; font-weight:500;">${months[i]}</span>
        </div>
      `).join('')}
    </div>
    <div style="text-align:right; font-size:0.75rem; color:#9E8572; margin-top:8px;">*Monthly revenue in ₹ Thousands (INR)</div>
  `;
}

function renderCategoryDonut() {
  const el = document.getElementById('admin-chart-categories');
  if (!el) return;

  const data = [
    { label: 'Craft Lager',  value: 35, color: '#F4B52A' },
    { label: 'Amber Ale',    value: 25, color: '#EFA34A' },
    { label: 'India Pale Ale', value: 20, color: '#7DAF3A' },
    { label: 'Artisanal Stout', value: 12, color: '#30251C' },
    { label: 'Blonde Ale',   value: 8,  color: '#FACA5C' },
  ];

  let cumulativeAngle = -90;
  const r = 60, cx = 80, cy = 80;

  function polarToXY(angle, radius) {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function slice(start, sweep, color) {
    const end = start + sweep;
    const startPt = polarToXY(start, r);
    const endPt = polarToXY(end, r);
    const large = sweep > 180 ? 1 : 0;
    return `<path d="M${cx},${cy} L${startPt.x},${startPt.y} A${r},${r} 0 ${large} 1 ${endPt.x},${endPt.y} Z"
      fill="${color}" opacity="0.95" class="donut-slice"
      style="transition:transform 0.2s ease; cursor:pointer;"/>`;
  }

  const paths = data.map(d => {
    const sweep = (d.value / 100) * 360;
    const p = slice(cumulativeAngle, sweep, d.color);
    cumulativeAngle += sweep;
    return p;
  });

  el.innerHTML = `
    <div style="display:flex; align-items:center; gap:24px; flex-wrap:wrap;">
      <svg viewBox="0 0 160 160" width="160" height="160" style="flex-shrink:0;">
        ${paths.join('')}
        <circle cx="${cx}" cy="${cy}" r="38" fill="white"/>
        <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="12" font-weight="800" fill="#30251C">₹ Share</text>
        <text x="${cx}" y="${cy + 12}" text-anchor="middle" font-size="9" fill="#9E8572">By Volume</text>
      </svg>
      <div style="display:flex; flex-direction:column; gap:8px; flex:1;">
        ${data.map(d => `
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:10px; height:10px; border-radius:3px; background:${d.color}; flex-shrink:0;"></div>
            <span style="font-size:0.78rem; color:#5C4033; font-weight:500; flex:1;">${d.label}</span>
            <span style="font-size:0.8rem; font-weight:700; color:#30251C;">${d.value}%</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderMiniSparklines() {
  const els = document.querySelectorAll('.sparkline-chart');
  els.forEach(el => {
    const type = el.dataset.type;
    const data = type === 'up'
      ? [20, 35, 28, 45, 40, 58, 52, 70, 65, 80]
      : [80, 65, 72, 55, 60, 45, 50, 38, 42, 30];

    const w = 90, h = 36;
    const max = Math.max(...data), min = Math.min(...data);
    const range = max - min || 1;
    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    }).join(' ');

    const color = type === 'up' ? '#3DAD6E' : '#E05252';
    el.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="overflow:visible;">
        <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="0,${h} ${pts} ${w},${h}" fill="${color}" opacity="0.1"/>
      </svg>
    `;
  });
}

function renderAdminTable() {
  const tbody = document.getElementById('admin-table-body');
  if (!tbody) return;

  const products = [
    { id: 'SS-001', name: 'Golden Brew',    cat: 'Lager',  price: '₹299', stock: 48, status: 'In Stock' },
    { id: 'SS-002', name: 'Amber Classic',  cat: 'Ale',    price: '₹349', stock: 32, status: 'In Stock' },
    { id: 'SS-003', name: 'Sunset Lager',   cat: 'Lager',  price: '₹249', stock: 8,  status: 'Low Stock' },
    { id: 'SS-004', name: 'Royal Malt',     cat: 'Stout',  price: '₹499', stock: 24, status: 'In Stock' },
    { id: 'SS-005', name: 'Crystal Blonde', cat: 'Blonde', price: '₹279', stock: 0,  status: 'Out of Stock' },
    { id: 'SS-006', name: 'Premium Hops',   cat: 'IPA',    price: '₹399', stock: 56, status: 'In Stock' },
  ];

  tbody.innerHTML = products.map(p => {
    const statusColor = p.status === 'In Stock' ? '#3DAD6E' : p.status === 'Low Stock' ? '#F4B52A' : '#E05252';
    return `
      <tr style="border-bottom:1px solid rgba(244,181,42,0.1); transition:background 0.2s ease;"
          onmouseover="this.style.background='rgba(244,181,42,0.04)'"
          onmouseout="this.style.background=''">
        <td style="padding:16px; font-size:0.82rem; font-weight:700; color:#F4B52A;">${p.id}</td>
        <td style="padding:16px; font-size:0.88rem; font-weight:600; color:#30251C;">${p.name}</td>
        <td style="padding:16px;">
          <span style="font-size:0.72rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; padding:4px 10px; border-radius:999px; background:rgba(244,181,42,0.1); color:#D99A14;">${p.cat}</span>
        </td>
        <td style="padding:16px; font-size:0.92rem; font-weight:700; color:#30251C; font-family:'Playfair Display',serif;">${p.price}</td>
        <td style="padding:16px; font-size:0.88rem; color:#5C4033;">${p.stock}</td>
        <td style="padding:16px;">
          <span style="font-size:0.75rem; font-weight:600; padding:5px 12px; border-radius:999px; background:${statusColor}22; color:${statusColor};">${p.status}</span>
        </td>
        <td style="padding:16px;">
          <div style="display:flex; gap:8px;">
            <button onclick="showToast('Edit product (Demo)', '✏️')" style="padding:6px 14px; border-radius:999px; border:1px solid rgba(244,181,42,0.3); color:#D99A14; font-size:0.75rem; font-weight:600; cursor:pointer; background:transparent;">Edit</button>
            <button onclick="showToast('Delete simulated (Demo)', '🗑️')" style="padding:6px 14px; border-radius:999px; border:1px solid rgba(224,82,82,0.3); color:#E05252; font-size:0.75rem; font-weight:600; cursor:pointer; background:transparent;">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderAdminOrders() {
  const tbody = document.getElementById('admin-orders-body');
  if (!tbody) return;

  const orders = [
    { id: '#SS-ORD-9021', customer: 'Aarav Sharma',   products: 'Golden Brew × 2', total: '₹598', status: 'Delivered', date: 'Today, 4:30 PM' },
    { id: '#SS-ORD-9020', customer: 'Pooja Verma',    products: 'Amber Classic × 1, Royal Malt × 2', total: '₹1,347', status: 'Processing', date: 'Today, 2:15 PM' },
    { id: '#SS-ORD-9019', customer: 'Rohan Mehta',    products: 'Premium Hops × 3', total: '₹1,197', status: 'Shipped', date: 'Yesterday' },
    { id: '#SS-ORD-9018', customer: 'Ananya Iyer',    products: 'Crystal Blonde × 1', total: '₹279', status: 'Delivered', date: 'Yesterday' },
    { id: '#SS-ORD-9017', customer: 'Vikram Singh',   products: 'Sunset Lager × 2', total: '₹498', status: 'Cancelled', date: '24 Nov 2026' },
  ];

  const colors = { Delivered: '#3DAD6E', Processing: '#F4B52A', Shipped: '#5B9BD5', Cancelled: '#E05252' };

  tbody.innerHTML = orders.map(o => `
    <tr style="border-bottom:1px solid rgba(244,181,42,0.1);"
        onmouseover="this.style.background='rgba(244,181,42,0.03)'" onmouseout="this.style.background=''">
      <td style="padding:14px; font-size:0.82rem; font-weight:700; color:#F4B52A;">${o.id}</td>
      <td style="padding:14px; font-size:0.85rem; font-weight:600; color:#30251C;">${o.customer}</td>
      <td style="padding:14px; font-size:0.82rem; color:#9E8572;">${o.products}</td>
      <td style="padding:14px; font-size:0.9rem; font-weight:800; color:#30251C; font-family:'Playfair Display',serif;">${o.total}</td>
      <td style="padding:14px;">
        <span style="font-size:0.75rem; font-weight:600; padding:5px 12px; border-radius:999px; background:${colors[o.status]}22; color:${colors[o.status]};">${o.status}</span>
      </td>
      <td style="padding:14px; font-size:0.80rem; color:#9E8572;">${o.date}</td>
    </tr>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavFlowDiagram();
  renderShoppingFlow();
  renderAdminFlow();
  renderProcessDiagram();
  renderAdminCharts();
  renderAdminTable();
  renderAdminOrders();
});
