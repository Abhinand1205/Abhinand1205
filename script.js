const THEME_KEY = "preferred-theme";

function getSystemPrefersDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
  } else if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

function initTheme() {
  const stored = getStoredTheme();
  const theme = stored || (getSystemPrefersDark() ? 'dark' : 'light');
  applyTheme(theme);
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.textContent = (theme === 'dark') ? '🌙' : '☀️';
  }
}

function toggleTheme() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  applyTheme(next);
  setStoredTheme(next);
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.textContent = (next === 'dark') ? '🌙' : '☀️';
  }
}

function initPrint() {
  const btn = document.getElementById('print');
  if (!btn) return;
  btn.addEventListener('click', () => window.print());
}

function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = String(new Date().getFullYear());
}

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initPrint();
  setYear();
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});

