import { useEffect, useState } from 'react';

const THEME_KEY = 'tria_theme';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const t = localStorage.getItem(THEME_KEY);
      if (t) return t === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      try { localStorage.setItem(THEME_KEY, 'dark'); } catch {}
    } else {
      root.classList.remove('dark');
      try { localStorage.setItem(THEME_KEY, 'light'); } catch {}
    }
  }, [isDark]);

  return (
    <button
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light' : 'Dark'}
      onClick={() => setIsDark(v => !v)}
      className="px-2 py-1 rounded-md border text-sm"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}
