export type AuthProvider = 'email' | 'google' | 'apple' | 'github' | 'vercel';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  provider: AuthProvider;
  role: 'customer' | 'vip' | 'employee' | 'admin';
  createdAt: string;
}

const USER_KEY = 'elitze_auth_user';
const TOKEN_KEY = 'elitze_auth_token';
const GREETING_KEY = 'elitze_pending_greeting';
let listeners: Array<() => void> = [];

function notify() {
  listeners.forEach((l) => l());
}

function saveSession(user: AuthUser, token: string) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(GREETING_KEY, JSON.stringify({ name: user.name, provider: user.provider }));
  notify();
}

function createLocalUser(provider: AuthProvider, email?: string): AuthUser {
  const baseName =
    provider === 'email'
      ? (email?.split('@')[0] || 'Customer')
      : provider === 'google'
      ? 'Google User'
      : provider === 'apple'
      ? 'Apple User'
      : provider === 'github'
      ? 'GitHub User'
      : 'Vercel User';

  return {
    id: `${provider}_${Date.now()}`,
    name: baseName,
    email: email || `${provider}@elitze.shop`,
    provider,
    role: 'customer',
    createdAt: new Date().toISOString(),
  };
}

export const authStore = {
  getUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  },
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(TOKEN_KEY) && localStorage.getItem(USER_KEY));
  },
  async signInWithEmail(email: string, _password: string) {
    const apiBase = import.meta.env.VITE_AUTH_API_BASE || '';
    if (apiBase) {
      const res = await fetch(`${apiBase}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: _password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Sign in failed.');
      saveSession(data.user as AuthUser, data.token as string);
      return;
    }
    const user = createLocalUser('email', email);
    saveSession(user, `local_${btoa(`${email}:${Date.now()}`)}`);
  },
  async signInWithProvider(provider: Exclude<AuthProvider, 'email'>) {
    const apiBase = import.meta.env.VITE_AUTH_API_BASE || '';
    if (apiBase) {
      window.location.href = `${apiBase}/oauth/${provider}`;
      return;
    }
    const user = createLocalUser(provider);
    saveSession(user, `local_${provider}_${Date.now()}`);
  },
  signOut() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(GREETING_KEY);
    notify();
  },
  consumeGreeting(): { name: string; provider: AuthProvider } | null {
    const raw = localStorage.getItem(GREETING_KEY);
    if (!raw) return null;
    localStorage.removeItem(GREETING_KEY);
    return JSON.parse(raw) as { name: string; provider: AuthProvider };
  },
  subscribe(fn: () => void) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  },
};
