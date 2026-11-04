(() => {
  'use strict';

  /* ---------- Data (edit here to update the page) ---------- */
  const SCORE = 94;

  const STACK = [
    { group: 'Languages & Frameworks', items: ['TypeScript', 'JavaScript', 'Node.js', 'Python', 'React'] },
    { group: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
    { group: 'Architecture', items: ['REST APIs', 'Event-driven systems', 'Clean / Layered Architecture'] },
    { group: 'Messaging', items: ['Kafka', 'RabbitMQ'] },
    { group: 'Cloud & Platforms', items: ['AWS (Lambda, ECS, EKS, S3, API GW)', 'DigitalOcean'] },
    { group: 'DevOps & CI/CD', items: ['Docker', 'Kubernetes (basics)', 'GitHub Actions', 'CircleCI'] },
    { group: 'Testing & Observability', items: ['Jest', 'Playwright', 'Datadog', 'ELK'] },
    { group: 'Security', items: ['Auth0'] },
    { group: 'AI & Automation', items: ['AI Agents', 'n8n workflows', 'AI-assisted development'] },
  ];

  const API = {
    '/skills': {
      languages: ['TypeScript', 'JavaScript', 'Python'],
      frameworks: ['Node.js', 'React', 'Express', 'tRPC', 'FastAPI'],
      databases: ['PostgreSQL', 'MySQL', 'MongoDB'],
      messaging: ['Kafka', 'RabbitMQ'],
      cloud: ['AWS (Lambda, ECS, EKS, S3)', 'DigitalOcean', 'Docker', 'Kubernetes'],
    },
    '/experience': [
      { company: 'Strapi Solutions', role: 'Backend Engineer', location: 'Paris, France', start: '2023-10', end: '2026-01' },
      { company: 'Datagatherers', role: 'Co-founder & Backend Developer', location: 'Lisbon, Portugal', start: '2019-07', end: '2023-09' },
    ],
    '/projects': [
      { name: 'Signalex', desc: 'French company intelligence & health-scoring platform', status: 'private' },
      { name: 'Data Collector', desc: 'Centralized multi-source data ingestion pipeline', status: 'private' },
      { name: 'Mulinete', desc: 'Full-stack company data extraction platform', status: 'private' },
    ],
    '/score': { score: SCORE, grade: 'A', collectiveProceedings: 0, redFlags: 0 },
    '/contact': { email: 'oleg.v.maksimov@gmail.com', phone: '+33 6 52 64 23 77', linkedin: 'linkedin.com/in/olegmaksimov', location: 'Chanteheux, France' },
  };

  /* ---------- Utilities ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Year / date stamps ---------- */
  $('#year').textContent = new Date().getFullYear();
  $('#genDate').textContent = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });

  /* ---------- Mobile nav ---------- */
  const navToggle = $('#navToggle');
  const mobileNav = $('#mobileNav');
  navToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  $$('#mobileNav a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  /* ---------- Gauge animation (IntersectionObserver-triggered count-up) ---------- */
  const gauge = $('#gauge');
  const gaugeNum = $('#gaugeNum');
  let gaugeAnimated = false;

  function animateGauge() {
    if (gaugeAnimated) return;
    gaugeAnimated = true;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(eased * SCORE);
      gaugeNum.textContent = current;
      gauge.style.setProperty('--pct', (eased * SCORE).toFixed(1));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animateGauge(); io.disconnect(); } });
    }, { threshold: 0.4 });
    io.observe(gauge);
  } else {
    animateGauge();
  }

  /* ---------- Hero typewriter ---------- */
  const typeLine = $('#typeLine');
  const typeText = '> whoami';
  if (typeLine) {
    typeLine.textContent = '';
    let i = 0;
    (function type() {
      if (i <= typeText.length) {
        typeLine.textContent = typeText.slice(0, i);
        i++;
        setTimeout(type, 70);
      }
    })();
  }

  /* ---------- Feed accordion ---------- */
  $$('.feed-item').forEach(item => {
    const row = $('.feed-row', item);
    row.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      $$('.feed-item.open').forEach(o => o !== item && o.classList.remove('open'));
      item.classList.toggle('open', !wasOpen);
    });
  });

  /* ---------- Stack grid render ---------- */
  const stackGrid = $('#stackGrid');
  if (stackGrid) {
    stackGrid.innerHTML = STACK.map(g => `
      <div class="stack-group">
        <h4>${g.group}</h4>
        <ul class="stack-items">
          ${g.items.map(i => `<li><span class="name"><span class="status-dot" aria-hidden="true"></span>${i}</span></li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  /* ---------- Copy email ---------- */
  $$('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove();
      }
      const original = btn.textContent;
      btn.textContent = 'Copied';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, 1500);
    });
  });

  /* ---------- Session uptime ---------- */
  const uptimeEl = $('#uptime');
  const sessionStart = Date.now();
  function pad(n) { return String(n).padStart(2, '0'); }
  setInterval(() => {
    const s = Math.floor((Date.now() - sessionStart) / 1000);
    const hh = Math.floor(s / 3600), mm = Math.floor((s % 3600) / 60), ss = s % 60;
    if (uptimeEl) uptimeEl.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
  }, 1000);

  /* ---------- Query console ---------- */
  const out = $('#consoleOutput');
  const input = $('#consoleInput');
  const history = [];
  let historyPos = -1;

  function syntaxHighlight(json) {
    const esc = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return esc.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
      let cls = 'json-num';
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? 'json-key' : 'json-str';
      }
      return `<span class="${cls}">${match}</span>`;
    });
  }

  function printLine(html, isEcho = false) {
    const div = document.createElement('div');
    div.className = 'line' + (isEcho ? ' cmd-echo' : '');
    div.innerHTML = html;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }

  function printJSON(obj) {
    printLine(`<pre style="margin:0;font-family:inherit">${syntaxHighlight(JSON.stringify(obj, null, 2))}</pre>`);
  }

  const HELP_TEXT = [
    'Available commands:',
    '  help                 show this message',
    '  whoami               candidate identity',
    '  GET /skills          list monitored stack',
    '  GET /experience      employment history',
    '  GET /projects        shipped platforms',
    '  GET /score           current health score',
    '  GET /contact         contact details',
    '  clear                clear the console',
  ].join('\n');

  function runCommand(raw) {
    const cmd = raw.trim();
    if (!cmd) return;
    printLine(cmd.replace(/</g, '&lt;'), true);
    history.push(cmd);
    historyPos = history.length;

    const normalized = cmd.toLowerCase();

    if (normalized === 'help') {
      printLine(`<pre style="margin:0;font-family:inherit">${HELP_TEXT}</pre>`);
      return;
    }
    if (normalized === 'clear') {
      out.innerHTML = '';
      return;
    }
    if (normalized === 'whoami') {
      printJSON({ name: 'Oleg Maksimov', title: 'Senior Backend Engineer', status: 'open_to_opportunities' });
      return;
    }

    const match = cmd.match(/^GET\s+(\/\S+)$/i);
    if (match) {
      const path = match[1].toLowerCase();
      const key = Object.keys(API).find(k => k.toLowerCase() === path);
      if (key) {
        printJSON(API[key]);
        return;
      }
    }

    printLine(`command not found: <code>${cmd.replace(/</g, '&lt;')}</code> — try <code>help</code>`);
  }

  if (input) {
    printLine('Query console ready. Type <code>help</code> to see available commands.');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runCommand(input.value);
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length && historyPos > 0) { historyPos--; input.value = history[historyPos]; }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyPos < history.length - 1) { historyPos++; input.value = history[historyPos]; }
        else { historyPos = history.length; input.value = ''; }
      }
    });
  }

  $$('.chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      runCommand(cmd);
      input && input.focus();
    });
  });

  /* ---------- Scroll-spy ---------- */
  const navLinks = $$('.nav a, .mobile-nav a');
  const sections = navLinks
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a => a.style.color = (a.getAttribute('href') === `#${id}`) ? 'var(--accent)' : '');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => spy.observe(s));
  }
})();
