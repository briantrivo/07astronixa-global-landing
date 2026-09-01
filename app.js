/**
 * Astronixa Global — Interactive Engine
 * High-performance, Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Cosmic Space Canvas Engine (Shooting Stars & Starfield)
  initSpaceCanvas();

  // 1. Header scroll effect
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  // 2. Responsive Mobile Navigation
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  const navClose = document.getElementById('navClose');
  
  if (burger && navLinks) {
    burger.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
    if (navClose) navClose.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
    });
    navLinks.addEventListener('click', (e) => {
      if (e.target === navLinks) navLinks.classList.remove('mobile-open');
    });
  }

  // 3. Scroll Reveal Animation
  const revealSelectors = '.sec-head h2, .sec-head p, .sec-head .tag, .hero .lead, .hero h1, .hero .hero-pill, .hero .hero-note, .m-name, .m-role, .m-bio, .m-creds, .vtpl, .rm-phase, .feat, .mod, .agent, .wp-pill, .office, .tchip, .op-reel, .yt-wrap, .m-channels, .pain';
  document.querySelectorAll(revealSelectors).forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' });

  document.querySelectorAll('.reveal').forEach((el) => {
    try {
      const siblings = Array.prototype.filter.call(el.parentElement.children, (c) => c.classList && c.classList.contains('reveal'));
      const index = siblings.indexOf(el);
      if (index > 0) el.style.transitionDelay = Math.min(index * 0.07, 0.42) + 's';
    } catch (err) {}
    io.observe(el);
  });

  function revealInView() {
    document.querySelectorAll('.reveal:not(.show)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < (window.innerHeight || 0) * 0.98 && rect.bottom > 0) {
        el.classList.add('show');
        io.unobserve(el);
      }
    });
  }
  revealInView();
  setTimeout(revealInView, 300);
  setTimeout(revealInView, 1200);

  // 4. Ecosystem Apps Data & Track Render
  const ECO = [
    { n: 'OHANA', s: 'Social App', i: '🌐', g: 'linear-gradient(135deg,#8B5CFF,#C74BFF)' },
    { n: 'OHANA AGENT', s: 'AI Agent', i: '🤖', g: 'linear-gradient(135deg,#6C7BFF,#8B5CFF)' },
    { n: 'OHANA MEET', s: 'Họp 4K', i: '🎥', g: 'linear-gradient(135deg,#3ABEFF,#6C7BFF)' },
    { n: 'OHANA-C', s: 'Kênh & Chat', i: '💬', g: 'linear-gradient(135deg,#C74BFF,#FF6B8A)' },
    { n: 'ASTROPAY', s: 'Thanh toán', i: '💳', g: 'linear-gradient(135deg,#3ADE7A,#0EA5E9)' },
    { n: 'ASTRO BUY', s: 'E-commerce', i: '🛍️', g: 'linear-gradient(135deg,#F5B942,#F97316)' },
    { n: 'ASTROADS', s: 'Quảng cáo', i: '📣', g: 'linear-gradient(135deg,#FF6B8A,#C74BFF)' },
    { n: 'ASTRO CHAIN', s: 'Blockchain', i: '⛓️', g: 'linear-gradient(135deg,#6C7BFF,#3ABEFF)' },
    { n: 'ASTRO TOKEN', s: 'Token', i: '🪙', g: 'linear-gradient(135deg,#FFD873,#F5B942)' },
    { n: 'ASTRO WALLET', s: 'Ví Web3', i: '👛', g: 'linear-gradient(135deg,#8B5CFF,#3ABEFF)' },
    { n: 'ASTRO PLAY', s: 'Game & Play', i: '🎮', g: 'linear-gradient(135deg,#C74BFF,#6C7BFF)' },
    { n: 'ASTRO NFT', s: 'NFT', i: '🖼️', g: 'linear-gradient(135deg,#3ABEFF,#C74BFF)' }
  ];

  const appTrack = document.getElementById('appTrack');
  if (appTrack) {
    const tiles = ECO.map(a => `<div class="app-tile"><div class="app-ic" style="background:${a.g}">${a.i}</div><div class="app-nm">${a.n}</div></div>`).join('');
    appTrack.innerHTML = tiles + tiles;
  }

  // 5. Fanned App Deck Render
  const deckEl = document.getElementById('deck');
  if (deckEl) {
    const FAN = ECO.filter(a => a.n !== 'OHANA AGENT');
    const n = FAN.length, mid = (n - 1) / 2, spread = 7.5;
    deckEl.innerHTML = FAN.map((a, i) => {
      const ang = ((i - mid) * spread).toFixed(1);
      const z = 20 - Math.abs(i - mid);
      const dur = (4.2 + Math.abs(i - mid) * 0.28).toFixed(2);
      const delay = (i * 0.18).toFixed(2);
      return `<div class="fan-card" style="transform:rotate(${ang}deg);z-index:${z}">
        <div class="fan-inner" style="animation-duration:${dur}s;animation-delay:${delay}s">
          <div class="mini-screen" style="background:radial-gradient(130% 80% at 50% 0%,#3a2168,#180f38 70%)">
            <div class="mini-island"></div>
            <div class="mini-ic" style="background:${a.g}">${a.i}</div>
            <div class="mini-nm">${a.n}</div>
            <div class="mini-sub">${a.s}</div>
            <div class="mini-dots"><i></i><i></i><i></i></div>
            <div class="mini-home"></div>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  // 6. Interactive Simulator Stage & Package Switcher
  const packageData = [
    { name: 'Basic', fee: '0đ', balance: '$120.00', growth: '+2.1%', r1: '+$5.00', r2: '+$15.00', r3: '+$0.00', total: '+$20.00' },
    { name: 'Pro Month', fee: '$10', balance: '$680.50', growth: '+8.4%', r1: '+$35.00', r2: '+$120.00', r3: '+$12.50', total: '+$167.50' },
    { name: 'Pro Year', fee: '$108', balance: '$1,890.00', growth: '+15.2%', r1: '+$68.00', r2: '+$450.00', r3: '+$32.00', total: '+$550.00' },
    { name: 'Family', fee: '$508', balance: '$2,485.60', growth: '+18.6%', r1: '+$88.00', r2: '+$650.00', r3: '+$45.50', total: '+$783.50' }
  ];

  const pkgButtons = document.querySelectorAll('.pkgs .pkg');
  pkgButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      pkgButtons.forEach(b => b.classList.remove('act'));
      btn.classList.add('act');
      const data = packageData[idx];
      const valEl = document.getElementById('simWalletVal');
      const r1 = document.getElementById('simRow1');
      const r2 = document.getElementById('simRow2');
      const r3 = document.getElementById('simRow3');
      const tot = document.getElementById('simRowTotal');

      if (valEl) valEl.innerHTML = `${data.balance} <small>${data.growth}</small>`;
      if (r1) r1.textContent = data.r1;
      if (r2) r2.textContent = data.r2;
      if (r3) r3.textContent = data.r3;
      if (tot) tot.textContent = data.total;
    });
  });

  // 7. Tech Giants Marquee
  const TG = [
    { 
      n: 'Apple', 
      svg: '<svg viewBox="0 0 170 170" width="22" height="22" fill="#fff"><path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.65-7.79-11.86-14.25-6.3-9.67-11.2-20.73-14.7-33.17-3.5-12.44-5.25-24.1-5.25-34.98 0-14.57 3.73-26.75 11.19-36.54 7.46-9.78 16.92-14.75 28.38-14.9 4.35 0 9.4 1.16 15.16 3.47 5.75 2.31 9.45 3.52 11.09 3.63 1.96 0 5.8-1.25 11.51-3.74 5.71-2.5 10.7-3.69 14.97-3.58 12.83.65 22.95 5.56 30.36 14.73-11.19 6.74-16.68 15.98-16.47 27.72.22 9.13 3.75 16.85 10.59 23.16 6.84 6.31 15.11 10.06 24.81 11.25-2.18 6.31-4.79 12.45-7.83 18.42zM119.22 33.6c0-7.18 2.61-13.92 7.83-20.22 5.22-6.31 11.64-10.11 19.25-11.41.43 1.96.65 3.7.65 5.22 0 7.07-2.72 13.92-8.16 20.55-5.44 6.63-11.86 10.33-19.25 11.1-.22-1.74-.32-3.5-.32-5.24z"/></svg>',
      g: 'linear-gradient(135deg,rgba(255,255,255,.15),rgba(255,255,255,.04))', 
      t: 'iPhone & hệ sinh thái', 
      c: '~3.500 tỉ $' 
    },
    { 
      n: 'Microsoft', 
      svg: '<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#F25022" d="M1 1h10v10H1z"/><path fill="#7FBA00" d="M13 1h10v10H13z"/><path fill="#00A4EF" d="M1 13h10v10H1z"/><path fill="#FFB900" d="M13 13h10v10H13z"/></svg>',
      g: 'linear-gradient(135deg,rgba(0,164,239,.18),rgba(127,186,0,.18))', 
      t: 'Phần mềm · Cloud · AI', 
      c: '~3.200 tỉ $' 
    },
    { 
      n: 'NVIDIA', 
      svg: '<svg viewBox="0 0 48 48" width="24" height="24" fill="none"><path fill="#76B900" d="M19.16 11.45c-4.98.63-9.52 3.12-12.7 7a18.3 18.3 0 00-3.32 10.87c0 4.14 1.45 8.1 4.12 11.23l5.06-4.51c-1.87-2.02-2.88-4.66-2.88-7.39 0-2.86 1.13-5.59 3.16-7.66 2.32-2.36 5.47-3.66 8.78-3.66 3.18 0 6.22 1.2 8.52 3.39l4.9-4.54a17.9 17.9 0 00-15.64-4.73zm1.14 5.92c-3.34.45-6.38 2.1-8.5 4.63a12.06 12.06 0 00-2.16 7.15c0 2.76 1 5.38 2.8 7.42l5.03-4.48c-.75-.9-1.15-2.04-1.15-3.23 0-1.24.45-2.42 1.28-3.33.95-1.04 2.27-1.63 3.67-1.63 1.34 0 2.62.53 3.59 1.5l4.87-4.49a11.85 11.85 0 00-9.43-3.54zm.64 6.08c-1.64.29-3.1 1.2-4.08 2.54-.73.99-1.13 2.19-1.13 3.44 0 1.33.46 2.6 1.3 3.59l4.94-4.41c-.04-.15-.06-.3-.06-.46 0-.58.26-1.12.71-1.49.52-.42 1.2-.57 1.84-.41l2.05-1.9c-1.61-.7-3.63-.9-5.57-.9zm20.89-6.38a24.1 24.1 0 00-17.78-6.84c-7.05 0-13.67 2.87-18.49 7.97L9.94 22.1c3.81-3.93 8.94-6.13 14.34-6.13 4.86 0 9.47 1.78 13.06 5.03l4.49-3.93zm-2.82 9.07a18.3 18.3 0 00-11.45-5.26c-4.4 0-8.54 1.72-11.64 4.85l4.47 3.98a12.08 12.08 0 018.06-3.14c3.1 0 6.03 1.15 8.3 3.25l2.26-8.68z"/></svg>',
      g: 'linear-gradient(135deg,rgba(118,185,0,.22),rgba(40,80,0,.45))', 
      t: 'Chip AI', 
      c: '~5.400 tỉ $' 
    },
    { 
      n: 'Alphabet', 
      svg: '<svg viewBox="0 0 48 48" width="24" height="24"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>',
      g: 'linear-gradient(135deg,rgba(66,133,244,.18),rgba(234,67,53,.18))', 
      t: 'Tìm kiếm & Quảng cáo', 
      c: '~2.300 tỉ $' 
    },
    { 
      n: 'Amazon', 
      svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path fill="#FF9900" d="M13.88 18.28c-3.15 2.32-7.75 3.56-11.7 1.83-.56-.25-.09-.81.38-.56 3.61 1.94 7.8.97 10.74-1.07.45-.31.95.2.58-.2z"/><path fill="#FF9900" d="M14.7 17.15c-.4-.51-1.34-.24-1.99-.12-.2.04-.23-.13-.05-.26 1.17-.83 3.09-.59 3.44.02.34.6-0.34 2.51-1.46 3.39-.17.14-.34.06-.26-.11.27-.58.64-1.85.32-2.92z"/><path fill="#fff" d="M12.42 12.78c.03.73.47 1.11 1.19 1.11.83 0 1.63-.51 2.21-1.22.09-.11.2-.07.2.06v1.39c0 .1-.06.18-.16.23-.97.55-1.95.81-2.94.81-1.74 0-2.88-.99-2.88-2.65 0-1.77 1.25-2.88 3.19-2.88.75 0 1.48.16 2.05.47.12.07.16.17.16.31v1.93c-.92-.47-2.02-.66-3.02-.66-.6 0-1.01.21-1.01.71 0 .42.34.61 1.01.69zm-5.46-5.83h1.87c.12 0 .2.08.2.2v8.71c0 .12-.08.2-.2.2H7c-.12 0-.2-.08-.2-.2V7.15c0-.12.08-.2.2-.2z"/></svg>',
      g: 'linear-gradient(135deg,rgba(255,153,0,.18),rgba(20,110,180,.18))', 
      t: 'TMĐT & Cloud AWS', 
      c: '~2.000 tỉ $' 
    },
    { 
      n: 'Meta', 
      svg: '<svg viewBox="0 0 36 36" width="24" height="24" fill="none"><path fill="#1877F2" d="M36 18c0-9.94-8.06-18-18-18S0 8.06 0 18c0 8.98 6.6 16.42 15.19 17.77V23.2h-4.57V18h4.57v-3.95c0-4.51 2.68-7 6.8-7 1.97 0 4.03.35 4.03.35v4.43h-2.27c-2.24 0-2.93 1.39-2.93 2.82V18h5l-.8 5.2h-4.2v12.57C29.4 34.42 36 26.98 36 18z"/><path fill="#fff" d="M25.02 23.2l.8-5.2h-5v-3.35c0-1.43.69-2.82 2.93-2.82h2.27V7.4s-2.06-.35-4.03-.35c-4.12 0-6.8 2.49-6.8 7V18h-4.57v5.2h4.57v12.57c.92.14 1.87.23 2.81.23s1.89-.09 2.81-.23V23.2h4.21z"/></svg>',
      g: 'linear-gradient(135deg,rgba(24,119,242,.22),rgba(0,128,251,.35))', 
      t: 'Mạng xã hội', 
      c: '~1.500 tỉ $' 
    },
    { 
      n: 'OpenAI', 
      svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#10A37F"><path d="M22.28 9.87a5.98 5.98 0 0 0-.52-4.92 6.05 6.05 0 0 0-6.57-2.84 5.98 5.98 0 0 0-4.4-1.98 6.05 6.05 0 0 0-5.75 4.15 5.98 5.98 0 0 0-3.87 2.8 6.05 6.05 0 0 0 .82 7.15 5.98 5.98 0 0 0 .52 4.92 6.05 6.05 0 0 0 6.57 2.84 5.98 5.98 0 0 0 4.4 1.98 6.05 6.05 0 0 0 5.75-4.15 5.98 5.98 0 0 0 3.87-2.8 6.05 6.05 0 0 0-.82-7.15zM12 21.87a4.43 4.43 0 0 1-2.91-1.09l.13-.08 4.83-2.79a.8.8 0 0 0 .4-.7v-6.81l2.06 1.19a.07.07 0 0 1 .04.06v5.77a4.46 4.46 0 0 1-4.55 4.45zm-8.38-4.47a4.42 4.42 0 0 1-.52-3.07l.14.08 4.83 2.79a.8.8 0 0 0 .8 0l5.9-3.41v2.38a.07.07 0 0 1-.03.06l-5 2.89a4.46 4.46 0 0 1-6.12-1.72zM2.87 8.35a4.43 4.43 0 0 1 2.39-1.98v.16l4.83 2.79a.8.8 0 0 0 .8 0l5.9-3.41-2.06-1.19a.07.07 0 0 1-.04-.06H8.92a4.46 4.46 0 0 0-6.05 3.69zm15.42 3.4l-5.9 3.41-2.06-1.19a.07.07 0 0 1-.04-.06V8.08a4.46 4.46 0 0 1 7.46-3.36l-.13.08-4.83 2.79a.8.8 0 0 0-.4.7v6.81l5.9-3.41v-2.38a.07.07 0 0 1 .03-.06l5-2.89a4.46 4.46 0 0 1 .52 3.07l-.14-.08-4.83-2.79a.8.8 0 0 0-.8 0zM12 10.42l2.74 1.58-2.74 1.58-2.74-1.58 2.74-1.58z"/></svg>',
      g: 'linear-gradient(135deg,rgba(16,163,127,.22),rgba(11,107,83,.4))', 
      t: 'Trí tuệ nhân tạo', 
      c: '~800 tỉ $' 
    }
  ];

  function tgCard(a) {
    return `<div class="tg-card"><div class="tg-logo" style="background:${a.g}">${a.svg}</div><div class="tg-info"><h5>${a.n}</h5><div class="tl">${a.t}</div><div class="cap">${a.c}</div></div></div>`;
  }

  const r1 = document.getElementById('tgRow1');
  if (r1) { const h1 = TG.map(tgCard).join(''); r1.innerHTML = h1 + h1; }

  // 8. Daily Timeline
  const TL = [
    { time: '08:00', short: 'Học trực tuyến', act: '🎓 Học trực tuyến', old: 'Mở ứng dụng học / LMS riêng lẻ', mod: '→ Astronixa Academy & Live Mentoring', ben: 'Học kiến thức thực chiến, AI tóm tắt bài giảng tức thì.', big: '24/7', lb: 'Không giới hạn', note: 'Học mọi lúc, mọi nơi ngay trong app — AI đồng hành ghi chú và ôn tập cùng bạn.' },
    { time: '10:00', short: 'Sử dụng AI', act: '🤖 Sử dụng AI', old: 'Mở web ChatGPT / Claude trả phí riêng', mod: '→ Astronixa AI Agent 24/7', ben: 'Soạn nội dung, thiết kế ảnh, phân tích dữ liệu trong một chạm.', big: '10x', lb: 'Tăng năng suất', note: 'Một AI Agent thay cả đội ngũ — làm việc liên tục thay bạn suốt ngày đêm.' },
    { time: '13:00', short: 'Đăng bài & Tương tác', act: '📣 Đăng bài & Tương tác', old: 'Đăng Facebook / TikTok thủ công', mod: '→ Astronixa Social Feed & Hub', ben: 'Phân phối đa kênh tự động, nhận thưởng Token theo tương tác.', big: '3,2M', lb: 'Lượt tương tác/tuần', note: 'Mỗi bài viết viral là một cơ hội nhận token thưởng thật vào ví.' },
    { time: '15:00', short: 'Chăm sóc khách hàng', act: '💬 Chăm sóc khách hàng', old: 'Chuyển qua Zalo / Telegram / CRM rời rạc', mod: '→ Unified Smart Chat & Auto Bot', ben: 'Tự động phân loại lead, trả lời thắc mắc và gửi link chốt đơn.', big: '0đ', lb: 'Chi phí nhân sự', note: 'Bot AI trực chat xuyên đêm, không bỏ lỡ bất kỳ khách hàng tiềm năng nào.' },
    { time: '20:00', short: 'Họp & Đào tạo', act: '🎥 Họp & Đào tạo trực tuyến', old: 'Mở Zoom / Google Meet giới hạn 40 phút', mod: '→ Astronixa Ultra Meeting Room', ben: 'Họp 4K không giới hạn giờ, dịch thuật thời gian thực.', big: '4K', lb: 'Ultra HD', note: 'Phòng họp cao cấp, khử ồn AI và phiên dịch đa ngôn ngữ trực tiếp.' },
    { time: '22:00', short: 'Theo dõi doanh thu', act: '👛 Theo dõi doanh thu', old: 'Mở Excel tính toán, kiểm tra app ngân hàng', mod: '→ Astronixa Realtime E-Wallet', ben: 'Dòng tiền thụ động nhảy số trực tiếp, rút tiền trong 3 giây.', big: '3s', lb: 'Rút tiền tức thì', note: 'Kết ngày bằng con số doanh thu thật — minh bạch và thanh khoản ngay lập tức.' }
  ];

  const tlTabs = document.getElementById('tlTabs');
  const tlPanel = document.getElementById('tlPanel');

  function renderTL(i) {
    if (!tlTabs || !tlPanel) return;
    tlTabs.querySelectorAll('.tl-tab').forEach((t, idx) => t.classList.toggle('active', idx === i));
    const d = TL[i];
    tlPanel.innerHTML = `
      <div class="tl-main">
        <div class="tl-act">${d.act}</div>
        <div class="tl-old">🕒 Trước đây: ${d.old}</div>
        <div class="tl-new">${d.mod}</div>
        <div class="tl-ben">✓ ${d.ben}</div>
      </div>
      <div class="tl-side">
        <div class="big">${d.big}</div>
        <div class="lb">${d.lb}</div>
        <p>${d.note}</p>
      </div>`;
  }

  if (tlTabs) {
    TL.forEach((d, i) => {
      const b = document.createElement('div');
      b.className = 'tl-tab' + (i === 0 ? ' active' : '');
      b.innerHTML = `<div class="tt-h">${d.time}</div><div class="tt-l">${d.short}</div>`;
      b.addEventListener('click', () => renderTL(i));
      tlTabs.appendChild(b);
    });
    renderTL(0);
  }

  // 9. Module Carousel
  const car = document.getElementById('car');
  if (car) {
    document.getElementById('carNext')?.addEventListener('click', () => car.scrollBy({ left: 320, behavior: 'smooth' }));
    document.getElementById('carPrev')?.addEventListener('click', () => car.scrollBy({ left: -320, behavior: 'smooth' }));
  }

  // 10. Video Chapters
  const CH = [
    { ic: '💬', h: '01. Trải nghiệm Chat & Kết nối', p: 'Nhắn tin mã hóa, nhóm VIP và bot hỗ trợ.', t: '0:06' },
    { ic: '🤖', h: '02. Kích hoạt AI Agent', p: 'Ra lệnh cho trợ lý AI tự động hoàn thành việc.', t: '0:12' },
    { ic: '🎥', h: '03. Họp Meeting 4K', p: 'Vào phòng họp Ultra HD, dịch thuật thời gian thực.', t: '0:18' },
    { ic: '🛍️', h: '04. Bán hàng Marketplace', p: 'Đăng sản phẩm và chốt đơn chỉ trong 30 giây.', t: '0:24' },
    { ic: '👛', h: '05. Nhận thu nhập thụ động', p: 'Xem ví doanh thu nhảy số và rút tiền tức thì.', t: '0:30' }
  ];

  const chaps = document.getElementById('chaps');
  const vdTitle = document.getElementById('vdTitle');
  const vdDesc = document.getElementById('vdDesc');
  const vdBar = document.getElementById('vdBar');

  if (chaps) {
    CH.forEach((c, i) => {
      const el = document.createElement('div');
      el.className = 'chap' + (i === 0 ? ' active' : '');
      el.innerHTML = `<div class="ci">${c.ic}</div><div class="cb"><h5>${c.h}</h5><p>${c.p}</p></div><span class="ct">${c.t}</span>`;
      el.addEventListener('click', () => {
        chaps.querySelectorAll('.chap').forEach(x => x.classList.remove('active'));
        el.classList.add('active');
        if (vdTitle) vdTitle.innerHTML = c.h;
        if (vdDesc) vdDesc.innerHTML = c.p;
        if (vdBar) vdBar.style.width = ((i + 1) / CH.length * 100) + '%';
      });
      chaps.appendChild(el);
    });
  }

  // 11. Form Handler
  document.getElementById('regForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const fd = new FormData(this);
    const lead = {
      name: fd.get('name'),
      phone: fd.get('phone'),
      email: fd.get('email'),
      interest: fd.get('interest'),
      time: new Date().toLocaleString('vi-VN')
    };
    try {
      const list = JSON.parse(localStorage.getItem('astronixa_leads') || '[]');
      list.push(lead);
      localStorage.setItem('astronixa_leads', JSON.stringify(list));
    } catch (err) {}

    const okMsg = document.getElementById('okMsg');
    const benefits = document.getElementById('benefits');
    if (okMsg) okMsg.style.display = 'block';
    if (benefits) benefits.classList.add('show');
    this.reset();
    showToast('🎉 Đăng ký thành công! Đang chuyển đến danh sách quyền lợi.');
    setTimeout(() => {
      if (benefits) benefits.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 250);
  });

  // 12. Language Selector
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('open');
    });
    document.addEventListener('click', () => langMenu.classList.remove('open'));
    langMenu.querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => {
        const lang = b.dataset.lang;
        langMenu.classList.remove('open');
        const flag = document.getElementById('langFlag');
        const label = document.getElementById('langLabel');
        if (lang === 'en') {
          if (flag) flag.className = 'flag flag-us';
          if (label) label.textContent = 'EN';
          showToast('🇺🇸 English version updating. You are exploring in full Vietnamese interface.');
        } else {
          if (flag) flag.className = 'flag flag-vn';
          if (label) label.textContent = 'VI';
          showToast('🇻🇳 Đang hiển thị giao diện Tiếng Việt chuẩn.');
        }
      });
    });
  }

  // 13. AI Chat System Setup
  buildTabs();
});

// Helper Functions
function openRegister() {
  const el = document.getElementById('register');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function playTpl(sel) {
  const e = document.querySelector(sel);
  if (e) e.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function shareTpl(title) {
  const url = location.href.split('#')[0];
  if (navigator.share) {
    navigator.share({ title: 'Astronixa', text: title, url }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(title + ' — ' + url).then(() => {
      showToast('🔗 Đã sao chép link chia sẻ vào bộ nhớ tạm!');
    }).catch(() => {});
  } else {
    showToast('🔗 ' + url);
  }
}

function openWP() {
  const modal = document.getElementById('wpModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeWP() {
  const modal = document.getElementById('wpModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeWP();
});

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

// 5 AI Specialist Agents System
const PKG_INFO = 'Astronixa có 4 gói: 🌱 <b>Basic 0đ</b> (miễn phí), ⚡ <b>Pro Month $10/tháng</b>, 👑 <b>Pro Year $108/năm</b> ($9/tháng), và 💎 <b>Family Year $508/năm</b> (5 tài khoản).';

const AGENTS = {
  sofia: {
    name: 'Sofia',
    emoji: '🛰️',
    role: 'Sản phẩm & Gói dịch vụ',
    greeting: 'Chào bạn 👋 Mình là <b>Sofia</b> — phụ trách <b>Sản phẩm & Gói dịch vụ</b>. Bạn muốn hỏi gói dịch vụ nào ạ?',
    quick: ['Astronixa là gì?', 'So sánh 4 gói SaaS', 'Tôi không rành công nghệ']
  },
  aris: {
    name: 'Aris',
    emoji: '🤖',
    role: 'Công nghệ & AI Agent',
    greeting: 'Xin chào 👋 Mình là <b>Aris</b> — phụ trách <b>Công nghệ & AI Agent</b>. Bạn cần giải đáp tính năng AI Agent nào ạ?',
    quick: ['AI Agent làm được gì?', 'Bảo mật E2E thế nào?', 'Meeting 4K có gì hot?']
  },
  vera: {
    name: 'Vera',
    emoji: '💰',
    role: 'Tài chính & Thu nhập',
    greeting: 'Chào bạn 👋 Mình là <b>Vera</b> — phụ trách <b>Tài chính & Affiliate</b>. Bạn muốn hỏi về rút tiền hay hoa hồng ạ?',
    quick: ['Hoa hồng rút thế nào?', 'Ít vốn bắt đầu thế nào?', 'Staking thưởng bao nhiêu?']
  },
  leo: {
    name: 'Leo',
    emoji: '🛠️',
    role: 'Kỹ thuật & Kích hoạt',
    greeting: 'Xin chào 👋 Mình là <b>Leo</b> — phụ trách <b>Pháp lý & Kỹ thuật</b>. Bạn cần kiểm chứng điều gì ạ?',
    quick: ['Công ty có hợp pháp không?', 'Văn phòng ở đâu?', 'Cách đăng ký tài khoản']
  },
  mai: {
    name: 'Mai',
    emoji: '💜',
    role: 'Quyền lợi & Đồng hành',
    greeting: 'Chào bạn 💜 Mình là <b>Mai</b> — phụ trách <b>Quyền lợi khách hàng</b>. Mình luôn sẵn sàng hỗ trợ bạn!',
    quick: ['Đăng ký có ưu đãi gì?', 'Kênh Zalo chính thức', 'Mentor hỗ trợ 1-1']
  }
};

const KB = [
  { k: ['astronixa là gì', 'là gì vậy', 'giới thiệu', 'super app'], a: '🌌 <b>Astronixa</b> là siêu ứng dụng <b>All-in-One từ Mỹ</b>, hợp nhất: Mạng xã hội, Ví Crypto, TMĐT, AI Agent, Meeting 4K & Affiliate. Giúp tiết kiệm 80% chi phí và tự động hóa công việc.' },
  { k: ['gói', 'bảng giá', 'giá', 'phí', 'saas'], a: PKG_INFO },
  { k: ['pháp lý', 'hợp pháp', 'văn phòng', 'ở đâu', 'trụ sở'], a: '🏢 <b>Astronixa LLC (Mỹ):</b> 8 The Green, STE B, Dover, DE 19958, USA (Tel: 00 1 (302) 215-5384 | Email: Suport@astronixa.com).<br><b>Astronixa VN:</b> Tầng 7 Rise Building, 2A1 Nguyễn Thị Minh Khai, TP.HCM (MST 0319573968).' },
  { k: ['rút tiền', 'hoa hồng', 'rút', 'thu nhập'], a: '💸 Hoa hồng Affiliate trả trực tiếp vào ví. Rút tiền nhanh chóng trong 3 giây về tài khoản ngân hàng hoặc ví Web3. Lệnh rút tối thiểu 10 USDT.' },
  { k: ['bảo mật', 'an toàn', 'e2e', 'zero-knowledge'], a: '🔒 Bảo mật tuyệt đối bằng mã hóa đầu cuối E2EE (Signal Protocol) & kiến trúc Zero-Knowledge. Máy chủ không thể đọc tin nhắn của bạn.' },
  { k: ['zalo', 'liên hệ', 'mentor', 'võ quốc trí', 'giám đốc', 'hotline', 'tư vấn'], a: '💬 Bạn có thể kết nối trực tiếp với <b>Chuyên Gia Võ Quốc Trí</b> (Giám Đốc Phát Triển Thị Trường Astronixa Việt Nam) qua Hotline/Zalo: <b>0931332671</b> để được hướng dẫn 1-1.' }
];

let curAgent = 'sofia';
const chatBody = document.getElementById('chatBody');
const chatQuick = document.getElementById('chatQuick');
const agentTabs = document.getElementById('agentTabs');

function buildTabs() {
  if (!agentTabs) return;
  agentTabs.innerHTML = '';
  Object.keys(AGENTS).forEach(id => {
    const a = AGENTS[id];
    const b = document.createElement('button');
    b.className = 'agent-tab' + (id === curAgent ? ' active' : '');
    b.innerHTML = `${a.emoji} ${a.name}`;
    b.onclick = () => switchAgent(id);
    agentTabs.appendChild(b);
  });
}

function addMsg(html, who) {
  const body = document.getElementById('chatBody');
  if (!body) return;
  const d = document.createElement('div');
  d.className = 'msg ' + who;
  d.innerHTML = html;
  body.appendChild(d);
  body.scrollTop = body.scrollHeight;
}

function buildQuick() {
  const quickEl = document.getElementById('chatQuick');
  if (!quickEl) return;
  quickEl.innerHTML = '';
  AGENTS[curAgent].quick.forEach(q => {
    const b = document.createElement('button');
    b.textContent = q;
    b.onclick = () => {
      addMsg(q, 'me');
      respond(q);
    };
    quickEl.appendChild(b);
  });
}

function switchAgent(id) {
  curAgent = id;
  const a = AGENTS[id];
  const chAv = document.getElementById('chAv');
  const chNm = document.getElementById('chNm');
  const chSt = document.getElementById('chSt');
  const body = document.getElementById('chatBody');

  if (chAv) chAv.textContent = a.emoji;
  if (chNm) chNm.innerHTML = `${a.name} <span style="font-size:.7rem">✔</span>`;
  if (chSt) chSt.textContent = `${a.role} · Đang trực tuyến`;
  if (body) body.innerHTML = '';
  buildTabs();
  buildQuick();
  setTimeout(() => addMsg(a.greeting, 'bot'), 150);
}

function respond(text) {
  const t = (text || '').toLowerCase();
  let best = null;
  for (const item of KB) {
    if (item.k.some(k => t.includes(k))) {
      best = item;
      break;
    }
  }
  setTimeout(() => {
    if (best) {
      addMsg(best.a, 'bot');
    } else {
      addMsg('Cảm ơn bạn! 💜 Bạn có thể để lại thông tin trong Form đăng ký hoặc liên hệ trực tiếp Hotline/Zalo <b>0931332671</b> của <b>Chuyên Gia Võ Quốc Trí</b> để được giải đáp chuyên sâu nhé.', 'bot');
    }
  }, 350);
}

function sendChat() {
  const inp = document.getElementById('chatInput');
  const v = inp?.value.trim();
  if (!v) return;
  addMsg(v, 'me');
  if (inp) inp.value = '';
  respond(v);
}

function toggleChat() {
  const p = document.getElementById('chatPanel');
  const f = document.getElementById('chatFab');
  if (!p) return;
  const open = p.classList.toggle('open');
  if (f) f.style.display = open ? 'none' : 'flex';
  const body = document.getElementById('chatBody');
  if (open && !body?.dataset.init) {
    if (body) body.dataset.init = '1';
    switchAgent(curAgent);
  }
}

function openChat(id) {
  const p = document.getElementById('chatPanel');
  const f = document.getElementById('chatFab');
  if (!p) return;
  p.classList.add('open');
  if (f) f.style.display = 'none';
  const body = document.getElementById('chatBody');
  if (body) body.dataset.init = '1';
  switchAgent(id || 'sofia');
}

// ===== 14. COSMIC SPACE CANVAS ENGINE (METEOR SHOWER & TWINKLING STARS) =====
function initSpaceCanvas() {
  const canvas = document.getElementById('spaceCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  // Background Twinkling Stars
  const STAR_COUNT = Math.min(160, Math.floor((width * height) / 8000));
  const stars = [];
  const starColors = ['#FFFFFF', '#E0D5FF', '#38BDF8', '#C084FC', '#FDE047'];

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulsePhase: Math.random() * Math.PI * 2,
      driftY: Math.random() * 0.08 + 0.02,
      color: starColors[Math.floor(Math.random() * starColors.length)]
    });
  }

  // Floating Cosmic Stardust (Soft Glowing Orbs)
  const DUST_COUNT = 25;
  const dustParticles = [];
  for (let i = 0; i < DUST_COUNT; i++) {
    dustParticles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1.5,
      alpha: Math.random() * 0.25 + 0.05,
      driftX: (Math.random() - 0.5) * 0.15,
      driftY: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.5 ? 'rgba(56, 189, 248, ' : 'rgba(168, 85, 247, '
    });
  }

  // Meteors / Falling Shooting Stars
  const meteors = [];

  function spawnMeteor() {
    if (document.hidden) return;
    
    // Spawn mostly from top and right area
    const startX = Math.random() * (width * 1.1) - (width * 0.1);
    const startY = Math.random() * (height * 0.45) - 60;
    const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.22; // ~45 deg downward-right
    const speed = Math.random() * 9 + 11;
    const length = Math.random() * 140 + 90;
    const radius = Math.random() * 1.5 + 1.2;

    const colors = [
      { core: '#FFFFFF', glow: '#38BDF8', trail: 'rgba(56, 189, 248, ' },
      { core: '#FFFFFF', glow: '#C084FC', trail: 'rgba(192, 132, 252, ' },
      { core: '#FFFFFF', glow: '#FDE047', trail: 'rgba(253, 224, 71, ' },
      { core: '#FFFFFF', glow: '#67E8F9', trail: 'rgba(103, 232, 249, ' }
    ];
    const theme = colors[Math.floor(Math.random() * colors.length)];

    meteors.push({
      x: startX,
      y: startY,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      len: length,
      r: radius,
      opacity: 1,
      decay: Math.random() * 0.012 + 0.012,
      theme
    });

    // 25% chance of a twin meteor (meteor shower cluster)
    if (Math.random() < 0.25) {
      setTimeout(() => {
        if (meteors.length < 12) {
          meteors.push({
            x: startX + (Math.random() * 120 - 60),
            y: startY + (Math.random() * 60 - 30),
            dx: Math.cos(angle) * (speed * 0.95),
            dy: Math.sin(angle) * (speed * 0.95),
            len: length * 0.8,
            r: radius * 0.85,
            opacity: 0.9,
            decay: Math.random() * 0.014 + 0.014,
            theme
          });
        }
      }, Math.random() * 250 + 80);
    }
  }

  // Periodic meteor spawner
  function scheduleNextMeteor() {
    const delay = Math.random() * 1800 + 1200; // 1.2s - 3.0s
    setTimeout(() => {
      spawnMeteor();
      scheduleNextMeteor();
    }, delay);
  }
  spawnMeteor();
  scheduleNextMeteor();

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    if (document.hidden) return;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Twinkling Background Stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.pulsePhase += s.pulseSpeed;
      s.alpha = s.baseAlpha + Math.sin(s.pulsePhase) * (s.baseAlpha * 0.65);
      s.y += s.driftY;
      if (s.y > height) {
        s.y = 0;
        s.x = Math.random() * width;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0.05, Math.min(1, s.alpha));
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();

      // Subtle sparkle cross for larger stars
      if (s.r > 1.2 && s.alpha > 0.6) {
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(s.x - s.r * 2, s.y);
        ctx.lineTo(s.x + s.r * 2, s.y);
        ctx.moveTo(s.x, s.y - s.r * 2);
        ctx.lineTo(s.x, s.y + s.r * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 2. Draw Floating Stardust Orbs
    for (let i = 0; i < dustParticles.length; i++) {
      const d = dustParticles[i];
      d.x += d.driftX;
      d.y += d.driftY;
      if (d.x < 0) d.x = width;
      if (d.x > width) d.x = 0;
      if (d.y < 0) d.y = height;
      if (d.y > height) d.y = 0;

      ctx.save();
      ctx.fillStyle = d.color + d.alpha + ')';
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 3. Draw Meteors (Shooting Stars)
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += m.dx;
      m.y += m.dy;
      m.opacity -= m.decay;

      if (m.opacity <= 0 || m.x > width + 200 || m.y > height + 200) {
        meteors.splice(i, 1);
        continue;
      }

      const tailX = m.x - (m.dx / Math.hypot(m.dx, m.dy)) * m.len;
      const tailY = m.y - (m.dy / Math.hypot(m.dx, m.dy)) * m.len;

      ctx.save();
      // Draw Gradient Streak Trail
      const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
      grad.addColorStop(0, m.theme.trail + '0)');
      grad.addColorStop(0.7, m.theme.trail + (0.35 * m.opacity) + ')');
      grad.addColorStop(1, m.theme.trail + (0.95 * m.opacity) + ')');

      ctx.strokeStyle = grad;
      ctx.lineWidth = m.r;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(m.x, m.y);
      ctx.stroke();

      // Draw Glowing Head Core
      ctx.shadowColor = m.theme.glow;
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r * 1.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  requestAnimationFrame(animate);
}
