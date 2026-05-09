/* =========================================================
   璨榮會登山聯誼會 — interactions
   - Loader
   - Scroll progress
   - Sticky nav state
   - Reveal-on-scroll (IntersectionObserver)
   - Counter animation
   - Parallax (hero & story)
   - Mobile menu
   ========================================================= */
(function(){
  'use strict';

  // ---------- Loader ----------
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(() => loader.classList.add('done'), 1200);
    setTimeout(() => loader.remove(), 2200);
  });

  // ---------- Scroll progress + nav state ----------
  const nav = document.getElementById('nav');
  const progress = document.getElementById('scrollProgress');
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
    if (nav) nav.classList.toggle('scrolled', h.scrollTop > 60);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Reveal-on-scroll ----------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // ---------- Stat counters ----------
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const dur = 1600;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(target * ease(t)).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          co.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => co.observe(el));
  }

  // ---------- Parallax ----------
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  let ticking = false;
  const updateParallax = () => {
    const y = window.scrollY;
    parallaxEls.forEach(el => {
      const factor = parseFloat(el.dataset.parallax) || 0;
      const rect = el.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (inView) {
        el.style.transform = `translate3d(0, ${y * factor}px, 0)`;
      }
    });
    ticking = false;
  };
  document.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // ---------- Mobile menu ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('menu-open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('menu-open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---------- Image fallbacks (hide broken <img>, show gradient parent) ----------
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => { img.style.display = 'none'; }, { once: true });
  });

  // ---------- Interactive Leaflet map (loads track.gpx if present) ----------
  function initInteractiveMap() {
    const el = document.getElementById('trackMap');
    if (!el || typeof L === 'undefined') return;

    // 嘉南雲峰登山口附近座標（古坑石壁九芎公廟周邊），先給合理初始視野
    const map = L.map(el, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    }).setView([23.5870, 120.7268], 14);

    // OpenStreetMap tiles（免費、不需金鑰）
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);
    el.classList.add('has-tiles');

    // 點地圖才啟用滾輪縮放，避免捲頁時被劫持
    let scrollEnabled = false;
    el.addEventListener('click', () => {
      if (!scrollEnabled) {
        map.scrollWheelZoom.enable();
        el.classList.add('scroll-active');
        scrollEnabled = true;
      }
    });
    document.addEventListener('click', (e) => {
      if (scrollEnabled && !el.contains(e.target)) {
        map.scrollWheelZoom.disable();
        el.classList.remove('scroll-active');
        scrollEnabled = false;
      }
    });

    // GPX 軌跡
    const gpxUrl = el.dataset.gpx || 'track.gpx';
    if (typeof L.GPX !== 'function') return;

    new L.GPX(gpxUrl, {
      async: true,
      marker_options: {
        startIcon: makeGpxMarker('#3a6ea5'),
        endIcon: makeGpxMarker('#e8504a'),
        wptIcons: { '': makeGpxMarker('#c9a14a', true) },
        shadowUrl: null,
      },
      polyline_options: {
        color: '#3e5641',
        weight: 4.5,
        opacity: .92,
        lineCap: 'round',
        lineJoin: 'round',
      },
    })
    .on('loaded', (e) => {
      map.fitBounds(e.target.getBounds(), { padding: [40, 40] });
      const t = e.target;
      const km = (t.get_distance() / 1000).toFixed(2);
      const elev = Math.round(t.get_elevation_gain());
      const popup = `<strong>嘉南雲峰 × 石壁山</strong><br/>距離 ${km} km　·　爬升 ${elev} m`;
      t.bindPopup(popup);
    })
    .on('error', () => {
      const note = L.control({ position: 'topright' });
      note.onAdd = () => {
        const div = L.DomUtil.create('div', 'gpx-missing');
        div.innerHTML = '尚未上傳 <strong>track.gpx</strong><br/><small>從健行筆記下載 GPX 後<br/>放到 repo 根目錄即可</small>';
        div.style.cssText = 'background:rgba(255,255,255,.96);padding:12px 14px;border-radius:4px;font-family:"Noto Sans TC",sans-serif;font-size:12px;line-height:1.6;color:#6b513a;border:1px solid rgba(29,36,25,.18);box-shadow:0 4px 12px rgba(0,0,0,.1);max-width:220px';
        return div;
      };
      note.addTo(map);
    })
    .addTo(map);
  }

  function makeGpxMarker(color, small) {
    const size = small ? 22 : 32;
    const h = small ? 28 : 40;
    const html = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" width="${size}" height="${h}" style="filter:drop-shadow(0 4px 8px rgba(0,0,0,.3))">
      <path d="M16 0C7.2 0 0 7.2 0 16c0 11.5 16 24 16 24s16-12.5 16-24C32 7.2 24.8 0 16 0z" fill="${color}"/>
      <circle cx="16" cy="16" r="6.5" fill="#fff"/>
    </svg>`;
    return L.divIcon({
      className: 'gpx-marker',
      html: html,
      iconSize: [size, h],
      iconAnchor: [size/2, h],
      popupAnchor: [0, -h + 4],
    });
  }

  // 等 Leaflet 載入後再 init
  if (typeof L !== 'undefined') {
    initInteractiveMap();
  } else {
    window.addEventListener('load', () => setTimeout(initInteractiveMap, 100));
  }

  // ---------- Hero title line stagger reveal ----------
  const heroLines = document.querySelectorAll('.hero-title .line');
  heroLines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(40px)';
    line.style.transition = `opacity 1.1s ${0.6 + i * 0.18}s cubic-bezier(.22,.61,.36,1), transform 1.1s ${0.6 + i * 0.18}s cubic-bezier(.22,.61,.36,1)`;
  });
  window.addEventListener('load', () => {
    setTimeout(() => {
      heroLines.forEach(line => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      });
    }, 1300);
  });

})();
