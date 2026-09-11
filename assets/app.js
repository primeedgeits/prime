/*
 * MNVR Docs viewer.
 *
 * llms.txt is the single source of truth for navigation: each "## " heading becomes a
 * sidebar card, and its nested "- [Title](path): description" list becomes the collapsible
 * tree (an item without a link is a group). Pages are plain Markdown files fetched and
 * rendered on demand, so people and AI assistants read exactly the same source.
 */
(function () {
  'use strict';

  const INDEX_FILE = 'llms.txt';
  const MERMAID_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.9.1/mermaid.min.js';
  const SAFE_PATH = /^(?!.*\.\.)[\w\-./]+\.md$/;
  const DOC_ORIGIN = 'https://docs.local/'; // stand-in origin for resolving links relative to a page
  const SITE_NAME = document.title;
  const CHEVRON = '<svg class="chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5"/></svg>';

  const $ = (id) => document.getElementById(id);
  const els = {
    nav: $('app-nav'),
    filter: $('app-filter'),
    sidebar: $('app-sidebar'),
    menuBtn: $('app-menu'),
    scrim: $('app-scrim'),
    docBar: $('app-docbar'),
    crumbs: $('app-crumbs'),
    rawLink: $('app-raw'),
    copyBtn: $('app-copy'),
    content: $('app-content'),
    pager: $('app-pager'),
  };

  let sections = [];
  const pages = [];        // every linked page in reading order: { title, path, trail }
  let shownPath = null;    // page currently rendered, so anchor-only changes don't refetch
  let renderBase = null;   // URL of the page being rendered, for resolving its relative links
  let loadToken = 0;       // stops a slow fetch from overwriting a newer page
  let mermaidLoader = null;

  /* ---------- llms.txt ---------- */

  function parseIndex(text) {
    const result = [];
    let section = null;
    let stack = [];
    for (const line of text.split(/\r?\n/)) {
      const heading = line.match(/^##\s+(.+)/);
      if (heading) {
        section = { title: heading[1].trim(), children: [] };
        result.push(section);
        stack = [];
        continue;
      }
      const item = section && line.match(/^(\s*)[-*]\s+(.+)$/);
      if (!item) continue;
      const indent = item[1].replace(/\t/g, '    ').length;
      const link = item[2].match(/^\[([^\]]+)\]\(([^)\s]+)\)(?:\s*:\s*(.*))?$/);
      const node = link
        ? { title: link[1].trim(), path: link[2].replace(/^\.?\//, ''), desc: (link[3] || '').trim(), children: [] }
        : { title: item[2].trim(), children: [] };
      while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
      (stack.length ? stack[stack.length - 1].node.children : section.children).push(node);
      stack.push({ indent, node });
    }
    return result;
  }

  function collectPages(nodes, trail) {
    for (const node of nodes) {
      if (node.path) pages.push({ title: node.title, path: node.path, trail });
      collectPages(node.children, trail.concat(node.title));
    }
  }

  function countPages(nodes) {
    return nodes.reduce((n, node) => n + (node.path ? 1 : 0) + countPages(node.children), 0);
  }

  /* ---------- Sidebar ---------- */

  function renderNav() {
    const query = els.filter.value.trim().toLowerCase();
    els.nav.replaceChildren();
    for (const section of sections) {
      const tree = buildTree(section.children, query);
      if (!tree) continue;
      const card = document.createElement('details');
      card.className = 'card';
      card.open = true;
      card.append(makeSummary(section.title, countPages(section.children)), tree);
      els.nav.append(card);
    }
    if (!els.nav.children.length) {
      const empty = document.createElement('p');
      empty.className = 'nav-empty';
      empty.textContent = 'No pages match.';
      els.nav.append(empty);
    }
    markActive(parseHash().path);
  }

  function buildTree(nodes, query) {
    const ul = document.createElement('ul');
    ul.className = 'tree';
    for (const node of nodes) {
      const matches = !query || `${node.title} ${node.desc || ''}`.toLowerCase().includes(query);
      const li = document.createElement('li');
      if (node.children.length) {
        // A matching group shows all its pages; otherwise only the pages inside it that match.
        const sub = buildTree(node.children, matches ? '' : query);
        if (!sub) continue;
        if (node.path) sub.prepend(wrapInLi(makeLink(node)));
        const group = document.createElement('details');
        group.className = 'group';
        group.open = Boolean(query);
        group.append(makeSummary(node.title, countPages(node.children)), sub);
        li.append(group);
      } else if (matches) {
        li.append(node.path ? makeLink(node) : makeText(node.title));
      } else {
        continue;
      }
      ul.append(li);
    }
    return ul.children.length ? ul : null;
  }

  function makeSummary(title, count) {
    const summary = document.createElement('summary');
    const label = document.createElement('span');
    label.textContent = title;
    const badge = document.createElement('span');
    badge.className = 'count';
    badge.textContent = count;
    summary.append(label, badge);
    summary.insertAdjacentHTML('beforeend', CHEVRON);
    return summary;
  }

  function makeLink(node) {
    const a = document.createElement('a');
    a.href = `#/${node.path}`;
    a.textContent = node.title;
    if (node.desc) a.title = node.desc;
    return a;
  }

  function makeText(text) {
    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = text;
    return span;
  }

  function wrapInLi(el) {
    const li = document.createElement('li');
    li.append(el);
    return li;
  }

  function markActive(path) {
    for (const a of els.nav.querySelectorAll('a')) {
      const isActive = a.getAttribute('href') === `#/${path}`;
      a.classList.toggle('active', isActive);
      if (!isActive) {
        a.removeAttribute('aria-current');
        continue;
      }
      a.setAttribute('aria-current', 'page');
      for (let d = a.closest('details'); d; d = d.parentElement.closest('details')) d.open = true;
    }
  }

  function setSidebar(open) {
    els.sidebar.classList.toggle('open', open);
    els.scrim.hidden = !open;
    els.menuBtn.setAttribute('aria-expanded', String(open));
  }

  /* ---------- Routing ---------- */

  function parseHash() {
    const [rawPath = '', anchor = ''] = location.hash.replace(/^#\/?/, '').split('#');
    const path = safeDecode(rawPath) || (pages[0] ? pages[0].path : '');
    return { path, anchor: safeDecode(anchor) };
  }

  function safeDecode(text) {
    try {
      return decodeURIComponent(text);
    } catch (e) {
      return text;
    }
  }

  async function route() {
    const { path, anchor } = parseHash();
    setSidebar(false);
    markActive(path);

    if (path === shownPath) {
      scrollToAnchor(anchor);
      return;
    }
    if (!SAFE_PATH.test(path)) {
      showError('Page not found', `"${path}" is not a documentation page.`);
      return;
    }

    const token = ++loadToken;
    els.content.setAttribute('aria-busy', 'true');
    let markdown;
    try {
      const res = await fetch(path, { cache: 'no-cache' });
      if (!res.ok) {
        throw new Error(res.status === 404
          ? `${path} does not exist yet. Check its link in llms.txt.`
          : `The server returned ${res.status} for ${path}.`);
      }
      markdown = await res.text();
    } catch (err) {
      if (token === loadToken) showError('Could not load this page', describe(err));
      return;
    }
    if (token !== loadToken) return;

    renderBase = new URL(path, DOC_ORIGIN);
    els.content.innerHTML = marked.parse(markdown);
    els.content.removeAttribute('aria-busy');
    shownPath = path;
    enhance();
    updateChrome(path);
    scrollToAnchor(anchor);
  }

  function scrollToAnchor(anchor) {
    const target = anchor && els.content.querySelector(`#${CSS.escape(anchor)}`);
    if (target) target.scrollIntoView({ block: 'start' });
    else window.scrollTo(0, 0);
  }

  function showError(title, message) {
    shownPath = null;
    const box = document.createElement('div');
    box.className = 'error';
    const heading = document.createElement('h1');
    heading.textContent = title;
    const text = document.createElement('p');
    text.textContent = message;
    box.append(heading, text);
    els.content.replaceChildren(box);
    els.content.removeAttribute('aria-busy');
    els.docBar.hidden = true;
    els.pager.replaceChildren();
    document.title = SITE_NAME;
  }

  function describe(err) {
    if (location.protocol === 'file:') {
      return 'Browsers block loading files straight from disk. Preview the site through a local web server (see README.md), or open the live site.';
    }
    return err.message;
  }

  /* ---------- Rendering ---------- */

  // Markdown links are written relative to the page they're in (like on GitHub).
  // Rewrite them so page links route through the viewer and asset links resolve from the site root.
  function walkTokens(token) {
    if ((token.type !== 'link' && token.type !== 'image') || !renderBase) return;
    const href = token.href;
    if (href.startsWith('#')) {
      token.href = `#/${renderBase.pathname.slice(1)}${href}`;
      return;
    }
    let url;
    try {
      url = new URL(href, renderBase);
    } catch (e) {
      return;
    }
    if (url.origin !== renderBase.origin) return;
    const target = url.pathname.slice(1);
    token.href = token.type === 'link' && target.endsWith('.md') ? `#/${target}${url.hash}` : target + url.hash;
  }

  function enhance() {
    const used = new Set();
    for (const heading of els.content.querySelectorAll('h1, h2, h3, h4')) {
      const stem = slugify(heading.textContent) || 'section';
      let id = stem;
      for (let i = 2; used.has(id); i++) id = `${stem}-${i}`;
      used.add(id);
      heading.id = id;
    }

    for (const a of els.content.querySelectorAll('a[href^="http"]')) {
      a.target = '_blank';
      a.rel = 'noopener';
    }

    for (const table of els.content.querySelectorAll('table')) {
      const wrap = document.createElement('div');
      wrap.className = 'table-wrap';
      table.before(wrap);
      wrap.append(table);
    }

    const diagrams = [];
    for (const code of els.content.querySelectorAll('pre > code')) {
      if (code.classList.contains('language-mermaid')) {
        const div = document.createElement('div');
        div.className = 'mermaid';
        div.textContent = code.textContent;
        code.parentElement.replaceWith(div);
        diagrams.push(div);
      } else if (window.hljs && /\blanguage-/.test(code.className)) {
        window.hljs.highlightElement(code);
      }
    }
    if (diagrams.length) renderMermaid(diagrams);
  }

  // GitHub-style heading anchors, so links like decisions.md#dec-001-... work in both places.
  function slugify(text) {
    return text.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s/g, '-');
  }

  function renderMermaid(blocks) {
    if (!mermaidLoader) {
      mermaidLoader = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = MERMAID_SRC;
        script.onload = () => {
          const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          window.mermaid.initialize({ startOnLoad: false, theme: dark ? 'dark' : 'default', securityLevel: 'strict' });
          resolve(window.mermaid);
        };
        script.onerror = () => {
          mermaidLoader = null;
          reject(new Error('Could not load the diagram library.'));
        };
        document.head.append(script);
      });
    }
    const token = loadToken;
    mermaidLoader
      .then((mermaid) => {
        if (token === loadToken) return mermaid.run({ nodes: blocks });
      })
      .catch(() => {}); // the diagram source stays visible as text
  }

  function updateChrome(path) {
    const index = pages.findIndex((p) => p.path === path);
    const page = pages[index];
    const heading = els.content.querySelector('h1');
    const title = page ? page.title : heading ? heading.textContent : path;
    document.title = `${title} · ${SITE_NAME}`;

    const trail = page ? [...page.trail, page.title] : [title];
    els.crumbs.replaceChildren(...trail.map((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      return li;
    }));
    els.rawLink.href = path;
    els.docBar.hidden = false;

    els.pager.replaceChildren();
    if (index > 0) els.pager.append(pagerLink(pages[index - 1], 'Previous', 'prev'));
    if (index >= 0 && index < pages.length - 1) els.pager.append(pagerLink(pages[index + 1], 'Next', 'next'));
  }

  function pagerLink(page, label, className) {
    const a = document.createElement('a');
    a.className = className;
    a.href = `#/${page.path}`;
    const small = document.createElement('span');
    small.textContent = label;
    const strong = document.createElement('strong');
    strong.textContent = page.title;
    a.append(small, strong);
    return a;
  }

  /* ---------- Events ---------- */

  els.filter.addEventListener('input', renderNav);
  els.menuBtn.addEventListener('click', () => setSidebar(!els.sidebar.classList.contains('open')));
  els.scrim.addEventListener('click', () => setSidebar(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setSidebar(false);
  });

  els.copyBtn.addEventListener('click', async () => {
    const url = new URL(els.rawLink.getAttribute('href'), location.href).href;
    try {
      await navigator.clipboard.writeText(url);
      els.copyBtn.textContent = 'Copied';
      clearTimeout(els.copyBtn.resetTimer);
      els.copyBtn.resetTimer = setTimeout(() => { els.copyBtn.textContent = els.copyBtn.dataset.label; }, 1500);
    } catch (e) {
      window.prompt('Copy this URL:', url);
    }
  });

  /* ---------- Start ---------- */

  async function init() {
    if (!window.marked) {
      showError('Could not load the Markdown renderer', 'The page could not download its libraries. Check your internet connection and reload.');
      return;
    }
    marked.use({ walkTokens });
    els.copyBtn.dataset.label = els.copyBtn.textContent;

    try {
      const res = await fetch(INDEX_FILE, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`${INDEX_FILE} returned ${res.status}.`);
      sections = parseIndex(await res.text());
    } catch (err) {
      showError('Could not load the documentation index', describe(err));
      return;
    }

    for (const section of sections) collectPages(section.children, [section.title]);
    renderNav();
    window.addEventListener('hashchange', route);
    route();
  }

  init();
})();
