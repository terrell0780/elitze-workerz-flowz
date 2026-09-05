const THEME_KEY = 'elitze_theme';
type Theme = 'light' | 'dark';

let currentTheme: Theme = 'dark';
let listeners: Array<(theme: Theme) => void> = [];

function notify() {
  listeners.forEach((l) => l(currentTheme));
}

export const themeStore = {
  get(): Theme {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored) currentTheme = stored;
    return currentTheme;
  },
  set(theme: Theme) {
    currentTheme = theme;
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.classList.toggle('light-mode', theme === 'light');
    notify();
  },
  toggle() {
    this.set(currentTheme === 'dark' ? 'light' : 'dark');
  },
  subscribe(fn: (theme: Theme) => void) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  },
};

// Initialize on load
if (typeof window !== 'undefined') {
  const theme = themeStore.get();
  document.documentElement.classList.toggle('light-mode', theme === 'light');
}
