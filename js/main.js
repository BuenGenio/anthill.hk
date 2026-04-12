/* ============================================================
   anthill.hk — Main JS
   ============================================================ */

(function () {
  'use strict';

  const LANG = document.documentElement.lang || 'en';

  /* ---- Language Switcher ---- */
  const langSwitcher = document.querySelector('.lang-switcher');
  if (langSwitcher) {
    const langBtn = langSwitcher.querySelector('.lang-switcher-btn');
    if (langBtn) {
      langBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        langSwitcher.classList.toggle('open');
      });
      document.addEventListener('click', function () {
        langSwitcher.classList.remove('open');
      });
    }
  }

  /* ---- Theme Toggle ---- */
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'anthill-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  applyTheme(saved || 'light');

  themeBtn?.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ---- Header Scroll Effect ---- */
  const header = document.getElementById('site-header');
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        header?.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile Menu ---- */
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('main-nav');

  function closeMobileNav() {
    nav?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    menuBtn?.focus();
  }

  function openMobileNav() {
    nav?.classList.add('open');
    menuBtn?.setAttribute('aria-expanded', 'true');
  }

  menuBtn?.addEventListener('click', () => {
    const isOpen = nav?.classList.contains('open');
    if (isOpen) closeMobileNav();
    else openMobileNav();
  });

  nav?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape key
  nav?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMobileNav();
    }
  });

  // Focus trap inside mobile nav
  const FOCUSABLE_NAV = 'a, button, [tabindex]:not([tabindex="-1"])';
  nav?.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !nav.classList.contains('open')) return;
    const focusables = [...nav.querySelectorAll(FOCUSABLE_NAV)].filter(el => !el.disabled);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* ---- Active Nav Highlight ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  function highlightNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((l) => l.classList.remove('active'));
        document.querySelector(`.main-nav a[href="#${id}"]`)?.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ---- Scroll-Reveal Animation ---- */
  const animatedEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    animatedEls.forEach((el) => observer.observe(el));
  } else {
    animatedEls.forEach((el) => el.classList.add('visible'));
  }

  /* ============================================================
     DASHBOARD INTERACTIVE TABS
     ============================================================ */

  const CHART_SVG = `<svg viewBox="0 0 600 160" preserveAspectRatio="none" class="chart-line">
    <polyline points="0,140 50,120 100,130 150,90 200,100 250,60 300,70 350,40 400,55 450,30 500,45 550,20 600,10" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <polyline points="0,140 50,120 100,130 150,90 200,100 250,60 300,70 350,40 400,55 450,30 500,45 550,20 600,10" fill="url(#chart-fill)" stroke="none"/>
    <defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--accent)" stop-opacity="0.25"/><stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
  </svg>`;

  const CHART_BAR = `<svg viewBox="0 0 600 160" preserveAspectRatio="none" class="chart-line">
    <rect x="20" y="80" width="40" height="80" rx="4" fill="var(--accent)" opacity=".7"/>
    <rect x="80" y="50" width="40" height="110" rx="4" fill="var(--accent)" opacity=".8"/>
    <rect x="140" y="90" width="40" height="70" rx="4" fill="var(--accent)" opacity=".6"/>
    <rect x="200" y="30" width="40" height="130" rx="4" fill="var(--accent)"/>
    <rect x="260" y="60" width="40" height="100" rx="4" fill="var(--accent)" opacity=".75"/>
    <rect x="320" y="40" width="40" height="120" rx="4" fill="var(--accent)" opacity=".9"/>
    <rect x="380" y="70" width="40" height="90" rx="4" fill="var(--accent)" opacity=".65"/>
    <rect x="440" y="20" width="40" height="140" rx="4" fill="var(--accent)"/>
    <rect x="500" y="55" width="40" height="105" rx="4" fill="var(--accent)" opacity=".8"/>
    <rect x="560" y="35" width="40" height="125" rx="4" fill="var(--accent)" opacity=".85"/>
  </svg>`;

  function renderMetrics(items) {
    return `<div class="dash-cards">${items.map(m =>
      `<div class="dash-metric">
        <span class="dash-metric-label">${m[0]}</span>
        <span class="dash-metric-value">${m[1]}</span>
        <span class="dash-metric-change ${m[3]}">${m[2]}</span>
      </div>`
    ).join('')}</div>`;
  }

  function renderTable(title, headers, rows, cols) {
    return `<div class="dash-section-title">${title}</div>
    <div class="dash-table">
      <div class="dash-table-head" style="grid-template-columns:${cols}">${headers.map(h => `<span>${h}</span>`).join('')}</div>
      ${rows.map(r => `<div class="dash-table-row" style="grid-template-columns:${cols}">${r.map(c => `<span>${c}</span>`).join('')}</div>`).join('')}
    </div>`;
  }

  function renderToggles(title, items) {
    return `<div class="dash-section-title">${title}</div>
    <div class="dash-table">${items.map(i =>
      `<div class="dash-toggle-row">
        <span>${i[0]}</span>
        <div class="dash-toggle-switch ${i[1] ? 'on' : 'off'}"></div>
      </div>`
    ).join('')}</div>`;
  }

  function renderDesign(title, colors, fonts) {
    return `<div class="dash-section-title">${title}</div>
    <div class="dash-color-row">${colors.map((c, i) =>
      `<div class="dash-color-swatch${i === 0 ? ' selected' : ''}" style="background:${c}"></div>`
    ).join('')}</div>
    ${fonts.map(f =>
      `<div class="dash-font-row"><span class="dash-font-name">${f[0]}</span><span>${f[1]}</span></div>`
    ).join('')}`;
  }

  const T = {
    en: {
      overview: () => renderMetrics([
        ['Revenue (MTD)', 'HK$284,520', '+18.3%', 'positive'],
        ['Orders', '1,247', '+12.1%', 'positive'],
        ['Visitors', '34.2K', '+8.7%', 'positive'],
        ['Tickets', '3', 'Open', 'neutral']
      ]) + `<div class="dash-chart">${CHART_SVG}</div>`,

      products: () => renderTable('Products (24)',
        ['Product', 'Price', 'Stock', 'Status'],
        [
          ['Premium Wireless Headphones', 'HK$2,399', '142', '<span class="dash-badge green">Active</span>'],
          ['Bamboo Desk Organiser', 'HK$459', '87', '<span class="dash-badge green">Active</span>'],
          ['Ergonomic Mouse Pad', 'HK$189', '0', '<span class="dash-badge red">Out of stock</span>'],
          ['USB-C Hub Pro 7-in-1', 'HK$699', '53', '<span class="dash-badge green">Active</span>'],
          ['Minimalist Leather Wallet', 'HK$349', '216', '<span class="dash-badge yellow">Draft</span>']
        ], '2fr 1fr 1fr 1fr'),

      pages: () => renderTable('Pages',
        ['Page', 'URL', 'Status'],
        [
          ['Home', '/', '<span class="dash-badge green">Published</span>'],
          ['About Us', '/about', '<span class="dash-badge green">Published</span>'],
          ['FAQ', '/faq', '<span class="dash-badge green">Published</span>'],
          ['Shipping Policy', '/shipping', '<span class="dash-badge yellow">Draft</span>'],
          ['Returns', '/returns', '<span class="dash-badge green">Published</span>']
        ], '2fr 2fr 1fr'),

      design: () => renderDesign('Theme — Modern Minimal',
        ['#6366f1', '#0ea5e9', '#f97316', '#10b981', '#f43f5e', '#8b5cf6'],
        [['Headings', 'Space Grotesk — Bold'], ['Body', 'Inter — Regular'], ['Accent', 'Indigo 500 (#6366f1)']]),

      payments: () => renderToggles('Payment Gateways', [
        ['Stripe', true], ['PayPal', true], ['Adyen', false],
        ['AlipayHK', true], ['Octopus', true], ['PayMe (HSBC)', false],
        ['PayDollar', false], ['Airwallex', true], ['Monobank', false]
      ]),

      features: () => renderToggles('Store Features', [
        ['Dark Mode', true], ['Multi-language (EN, ES, UK)', true],
        ['Customer Reviews', true], ['Wishlist', false],
        ['Live Chat Widget', true], ['Cookie Consent Banner', true],
        ['Social Login', false], ['Inventory Alerts', true]
      ]),

      analytics: () => renderMetrics([
        ['Conversion Rate', '3.6%', '+0.4%', 'positive'],
        ['Avg. Order Value', 'HK$228', '+11.2%', 'positive'],
        ['Bounce Rate', '42.1%', '-3.8%', 'positive']
      ]) + `<div class="dash-chart">${CHART_BAR}</div>`,

      support: () => renderTable('Support Tickets',
        ['ID', 'Subject', 'Status', 'Updated'],
        [
          ['#1042', 'Shipping delay to Kowloon', '<span class="dash-badge yellow">Pending</span>', '2h ago'],
          ['#1041', 'Payment not processed', '<span class="dash-badge green">Resolved</span>', '5h ago'],
          ['#1039', 'Wrong item received', '<span class="dash-badge red">Urgent</span>', '1d ago'],
          ['#1038', 'Refund request', '<span class="dash-badge green">Resolved</span>', '2d ago']
        ], '80px 2fr 1fr 1fr'),

      email: () => renderTable('Inbox',
        ['From', 'Subject', 'Time'],
        [
          ['<strong>John Chan</strong>', 'Re: Order #8841 confirmation', '11:32 AM'],
          ['<strong>Sarah Wong</strong>', 'Partnership inquiry', '10:15 AM'],
          ['<strong>Stripe</strong>', 'Your weekly payout summary', '9:00 AM'],
          ['<strong>Mike Liu</strong>', 'Bulk order discount?', 'Yesterday'],
          ['<strong>Support Bot</strong>', 'New ticket #1042 assigned', 'Yesterday']
        ], '1.5fr 2.5fr 1fr')
    },

    es: {
      overview: () => renderMetrics([
        ['Ingresos (MTD)', 'HK$284,520', '+18.3%', 'positive'],
        ['Pedidos', '1,247', '+12.1%', 'positive'],
        ['Visitantes', '34.2K', '+8.7%', 'positive'],
        ['Tickets', '3', 'Abiertos', 'neutral']
      ]) + `<div class="dash-chart">${CHART_SVG}</div>`,

      products: () => renderTable('Productos (24)',
        ['Producto', 'Precio', 'Stock', 'Estado'],
        [
          ['Auriculares Inalámbricos Premium', 'HK$2,399', '142', '<span class="dash-badge green">Activo</span>'],
          ['Organizador de Escritorio Bambú', 'HK$459', '87', '<span class="dash-badge green">Activo</span>'],
          ['Alfombrilla Ergonómica', 'HK$189', '0', '<span class="dash-badge red">Agotado</span>'],
          ['Hub USB-C Pro 7 en 1', 'HK$699', '53', '<span class="dash-badge green">Activo</span>'],
          ['Cartera Minimalista de Cuero', 'HK$349', '216', '<span class="dash-badge yellow">Borrador</span>']
        ], '2fr 1fr 1fr 1fr'),

      pages: () => renderTable('Páginas',
        ['Página', 'URL', 'Estado'],
        [
          ['Inicio', '/', '<span class="dash-badge green">Publicada</span>'],
          ['Sobre Nosotros', '/sobre', '<span class="dash-badge green">Publicada</span>'],
          ['Preguntas Frecuentes', '/faq', '<span class="dash-badge green">Publicada</span>'],
          ['Política de Envío', '/envio', '<span class="dash-badge yellow">Borrador</span>'],
          ['Devoluciones', '/devoluciones', '<span class="dash-badge green">Publicada</span>']
        ], '2fr 2fr 1fr'),

      design: () => renderDesign('Tema — Moderno Minimalista',
        ['#6366f1', '#0ea5e9', '#f97316', '#10b981', '#f43f5e', '#8b5cf6'],
        [['Títulos', 'Space Grotesk — Negrita'], ['Cuerpo', 'Inter — Regular'], ['Acento', 'Índigo 500 (#6366f1)']]),

      payments: () => renderToggles('Pasarelas de Pago', [
        ['Stripe', true], ['PayPal', true], ['Adyen', false],
        ['AlipayHK', true], ['Octopus', true], ['PayMe (HSBC)', false],
        ['PayDollar', false], ['Airwallex', true], ['Monobank', false]
      ]),

      features: () => renderToggles('Funciones de la Tienda', [
        ['Modo Oscuro', true], ['Multi-idioma (EN, ES, UK)', true],
        ['Reseñas de Clientes', true], ['Lista de Deseos', false],
        ['Chat en Vivo', true], ['Banner de Cookies', true],
        ['Login Social', false], ['Alertas de Inventario', true]
      ]),

      analytics: () => renderMetrics([
        ['Tasa de Conversión', '3.6%', '+0.4%', 'positive'],
        ['Valor Medio del Pedido', 'HK$228', '+11.2%', 'positive'],
        ['Tasa de Rebote', '42.1%', '-3.8%', 'positive']
      ]) + `<div class="dash-chart">${CHART_BAR}</div>`,

      support: () => renderTable('Tickets de Soporte',
        ['ID', 'Asunto', 'Estado', 'Actualizado'],
        [
          ['#1042', 'Retraso en envío a Kowloon', '<span class="dash-badge yellow">Pendiente</span>', 'Hace 2h'],
          ['#1041', 'Pago no procesado', '<span class="dash-badge green">Resuelto</span>', 'Hace 5h'],
          ['#1039', 'Artículo incorrecto', '<span class="dash-badge red">Urgente</span>', 'Hace 1d'],
          ['#1038', 'Solicitud de reembolso', '<span class="dash-badge green">Resuelto</span>', 'Hace 2d']
        ], '80px 2fr 1fr 1fr'),

      email: () => renderTable('Bandeja de Entrada',
        ['De', 'Asunto', 'Hora'],
        [
          ['<strong>John Chan</strong>', 'Re: Confirmación pedido #8841', '11:32'],
          ['<strong>Sarah Wong</strong>', 'Consulta de colaboración', '10:15'],
          ['<strong>Stripe</strong>', 'Resumen semanal de pagos', '9:00'],
          ['<strong>Mike Liu</strong>', '¿Descuento por pedido grande?', 'Ayer'],
          ['<strong>Bot de Soporte</strong>', 'Nuevo ticket #1042 asignado', 'Ayer']
        ], '1.5fr 2.5fr 1fr')
    },

    uk: {
      overview: () => renderMetrics([
        ['Дохід (MTD)', 'HK$284,520', '+18.3%', 'positive'],
        ['Замовлення', '1,247', '+12.1%', 'positive'],
        ['Відвідувачі', '34.2K', '+8.7%', 'positive'],
        ['Тікети', '3', 'Відкриті', 'neutral']
      ]) + `<div class="dash-chart">${CHART_SVG}</div>`,

      products: () => renderTable('Товари (24)',
        ['Товар', 'Ціна', 'Залишок', 'Статус'],
        [
          ['Бездротові навушники преміум', 'HK$2,399', '142', '<span class="dash-badge green">Активний</span>'],
          ['Бамбуковий органайзер', 'HK$459', '87', '<span class="dash-badge green">Активний</span>'],
          ['Ергономічний килимок', 'HK$189', '0', '<span class="dash-badge red">Немає в наявності</span>'],
          ['USB-C хаб Pro 7-в-1', 'HK$699', '53', '<span class="dash-badge green">Активний</span>'],
          ['Мінімалістичний шкіряний гаманець', 'HK$349', '216', '<span class="dash-badge yellow">Чернетка</span>']
        ], '2fr 1fr 1fr 1fr'),

      pages: () => renderTable('Сторінки',
        ['Сторінка', 'URL', 'Статус'],
        [
          ['Головна', '/', '<span class="dash-badge green">Опублікована</span>'],
          ['Про нас', '/про-нас', '<span class="dash-badge green">Опублікована</span>'],
          ['FAQ', '/faq', '<span class="dash-badge green">Опублікована</span>'],
          ['Доставка', '/доставка', '<span class="dash-badge yellow">Чернетка</span>'],
          ['Повернення', '/повернення', '<span class="dash-badge green">Опублікована</span>']
        ], '2fr 2fr 1fr'),

      design: () => renderDesign('Тема — Сучасний мінімалізм',
        ['#6366f1', '#0ea5e9', '#f97316', '#10b981', '#f43f5e', '#8b5cf6'],
        [['Заголовки', 'Space Grotesk — Жирний'], ['Текст', 'Inter — Звичайний'], ['Акцент', 'Індіго 500 (#6366f1)']]),

      payments: () => renderToggles('Платіжні шлюзи', [
        ['Stripe', true], ['PayPal', true], ['Adyen', false],
        ['AlipayHK', true], ['Octopus', true], ['PayMe (HSBC)', false],
        ['PayDollar', false], ['Airwallex', true], ['Monobank', false]
      ]),

      features: () => renderToggles('Функції магазину', [
        ['Темна тема', true], ['Мультимовність (EN, ES, UK)', true],
        ['Відгуки клієнтів', true], ['Список бажань', false],
        ['Живий чат', true], ['Банер файлів cookie', true],
        ['Вхід через соцмережі', false], ['Сповіщення про залишки', true]
      ]),

      analytics: () => renderMetrics([
        ['Конверсія', '3.6%', '+0.4%', 'positive'],
        ['Середній чек', 'HK$228', '+11.2%', 'positive'],
        ['Відмови', '42.1%', '-3.8%', 'positive']
      ]) + `<div class="dash-chart">${CHART_BAR}</div>`,

      support: () => renderTable('Тікети підтримки',
        ['ID', 'Тема', 'Статус', 'Оновлено'],
        [
          ['#1042', 'Затримка доставки в Коулун', '<span class="dash-badge yellow">Очікує</span>', '2 год тому'],
          ['#1041', 'Оплата не пройшла', '<span class="dash-badge green">Вирішено</span>', '5 год тому'],
          ['#1039', 'Отримано не той товар', '<span class="dash-badge red">Терміново</span>', '1 день тому'],
          ['#1038', 'Запит на повернення коштів', '<span class="dash-badge green">Вирішено</span>', '2 дні тому']
        ], '80px 2fr 1fr 1fr'),

      email: () => renderTable('Вхідні',
        ['Від', 'Тема', 'Час'],
        [
          ['<strong>John Chan</strong>', 'Re: Підтвердження замовлення #8841', '11:32'],
          ['<strong>Sarah Wong</strong>', 'Запит на партнерство', '10:15'],
          ['<strong>Stripe</strong>', 'Тижневий звіт виплат', '9:00'],
          ['<strong>Mike Liu</strong>', 'Знижка на гуртове замовлення?', 'Вчора'],
          ['<strong>Бот підтримки</strong>', 'Новий тікет #1042 призначено', 'Вчора']
        ], '1.5fr 2.5fr 1fr')
    },

    'zh-Hant-HK': {
      overview: () => renderMetrics([
        ['收入 (本月至今)', 'HK$284,520', '+18.3%', 'positive'],
        ['訂單', '1,247', '+12.1%', 'positive'],
        ['訪客', '34.2K', '+8.7%', 'positive'],
        ['工單', '3', '待處理', 'neutral']
      ]) + `<div class="dash-chart">${CHART_SVG}</div>`,

      products: () => renderTable('產品 (24)',
        ['產品', '價格', '庫存', '狀態'],
        [
          ['高級無線耳機', 'HK$2,399', '142', '<span class="dash-badge green">上架中</span>'],
          ['竹製桌面收納架', 'HK$459', '87', '<span class="dash-badge green">上架中</span>'],
          ['人體工學滑鼠墊', 'HK$189', '0', '<span class="dash-badge red">缺貨</span>'],
          ['USB-C 七合一擴展塢', 'HK$699', '53', '<span class="dash-badge green">上架中</span>'],
          ['極簡真皮銀包', 'HK$349', '216', '<span class="dash-badge yellow">草稿</span>']
        ], '2fr 1fr 1fr 1fr'),

      pages: () => renderTable('頁面',
        ['頁面', '網址', '狀態'],
        [
          ['主頁', '/', '<span class="dash-badge green">已發佈</span>'],
          ['關於我們', '/about', '<span class="dash-badge green">已發佈</span>'],
          ['常見問題', '/faq', '<span class="dash-badge green">已發佈</span>'],
          ['運送政策', '/shipping', '<span class="dash-badge yellow">草稿</span>'],
          ['退貨政策', '/returns', '<span class="dash-badge green">已發佈</span>']
        ], '2fr 2fr 1fr'),

      design: () => renderDesign('主題 — 現代極簡',
        ['#6366f1', '#0ea5e9', '#f97316', '#10b981', '#f43f5e', '#8b5cf6'],
        [['標題', 'Space Grotesk — 粗體'], ['正文', 'Inter — 常規'], ['強調色', 'Indigo 500 (#6366f1)']]),

      payments: () => renderToggles('支付網關', [
        ['Stripe', true], ['PayPal', true], ['Adyen', false],
        ['AlipayHK', true], ['八達通', true], ['PayMe (HSBC)', false],
        ['PayDollar', false], ['Airwallex', true], ['Monobank', false]
      ]),

      features: () => renderToggles('商店功能', [
        ['深色模式', true], ['多語言 (EN, ES, UK, 繁中)', true],
        ['顧客評價', true], ['願望清單', false],
        ['即時聊天', true], ['Cookie 橫幅', true],
        ['社交登入', false], ['庫存提醒', true]
      ]),

      analytics: () => renderMetrics([
        ['轉換率', '3.6%', '+0.4%', 'positive'],
        ['平均訂單金額', 'HK$228', '+11.2%', 'positive'],
        ['跳出率', '42.1%', '-3.8%', 'positive']
      ]) + `<div class="dash-chart">${CHART_BAR}</div>`,

      support: () => renderTable('支援工單',
        ['編號', '主題', '狀態', '更新'],
        [
          ['#1042', '九龍區配送延遲', '<span class="dash-badge yellow">等待中</span>', '2小時前'],
          ['#1041', '付款失敗', '<span class="dash-badge green">已解決</span>', '5小時前'],
          ['#1039', '收到錯誤商品', '<span class="dash-badge red">緊急</span>', '1日前'],
          ['#1038', '退款申請', '<span class="dash-badge green">已解決</span>', '2日前']
        ], '80px 2fr 1fr 1fr'),

      email: () => renderTable('收件匣',
        ['寄件人', '主題', '時間'],
        [
          ['<strong>John Chan</strong>', 'Re: 訂單 #8841 確認', '11:32'],
          ['<strong>Sarah Wong</strong>', '合作查詢', '10:15'],
          ['<strong>Stripe</strong>', '每週付款摘要', '9:00'],
          ['<strong>Mike Liu</strong>', '大量訂購折扣？', '昨日'],
          ['<strong>支援機械人</strong>', '新工單 #1042 已指派', '昨日']
        ], '1.5fr 2.5fr 1fr')
    }
  };

  function initDashboard() {
    const sidebar = document.getElementById('dash-sidebar');
    const main = document.getElementById('dash-main');
    if (!sidebar || !main) return;

    const items = sidebar.querySelectorAll('.dash-nav-item');
    const tabData = T[LANG] || T.en;

    items.forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.dataset.tab;
        if (!tab || !tabData[tab]) return;

        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        main.classList.add('fading');
        setTimeout(() => {
          main.innerHTML = tabData[tab]();
          main.classList.remove('fading');
        }, 150);
      });
    });
  }

  initDashboard();

  /* ============================================================
     CONTACT FORM
     ============================================================ */

  const CONTACT_EMAIL = 'business@anthill.hk';

  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('[name="name"]')?.value.trim() || '';
    const email   = form.querySelector('[name="email"]')?.value.trim() || '';
    const message = form.querySelector('[name="message"]')?.value.trim() || '';

    const subject = encodeURIComponent(`Inquiry from ${name}`);
    const body    = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
