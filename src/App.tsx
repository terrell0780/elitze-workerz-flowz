import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import DeployPage from './pages/DeployPage';
import AnalyticsPage from './pages/AnalyticsPage';
import BillingPage from './pages/BillingPage';
import WorkflowsPage from './pages/WorkflowsPage';
import IntegrationsPage from './pages/IntegrationsPage';
import SettingsPage from './pages/SettingsPage';
import ArchitecturePage from './pages/ArchitecturePage';
import ChatSystemPage from './pages/ChatSystemPage';
import LindyToolsPage from './pages/LindyToolsPage';

import { pageSEO } from './data/seo';
import { api } from './lib/api';
import { usePersistentTheme, type ThemePreference } from './lib/hooks';

export const PAGE_IDS = [
  'dashboard',
  'chat',
  'employees',
  'deploy',
  'lindy-tools',
  'workflows',
  'analytics',
  'integrations',
  'architecture',
  'billing',
  'settings',
] as const;

export type PageType = (typeof PAGE_IDS)[number];

export function isPageType(value: string): value is PageType {
  return (PAGE_IDS as readonly string[]).includes(value);
}

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({ isDark: true, toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

interface AdminContextType {
  unlocked: boolean;
  token: string | null;
  unlock: (token: string, expiresAt: string) => void;
  lock: () => void;
  /** Present when the admin session expired mid-session. */
  expiry: string | null;
}

const AdminContext = createContext<AdminContextType>({
  unlocked: false,
  token: null,
  unlock: () => {},
  lock: () => {},
  expiry: null,
});

export const useAdmin = () => useContext(AdminContext);

/**
 * Hash-based routing.
 *
 * The app previously kept the active page in component state only, so reloads
 * always returned to the dashboard, links were unshareable and the browser back
 * button did nothing. Routing through the URL fixes all three without pulling
 * in a router dependency.
 */
function useHashRoute(): [PageType, (page: PageType) => void] {
  const read = useCallback((): PageType => {
    const raw = window.location.hash.replace(/^#\/?/, '');
    return isPageType(raw) ? raw : 'dashboard';
  }, []);

  const [page, setPage] = useState<PageType>(read);

  useEffect(() => {
    if (!isPageType(window.location.hash.replace(/^#\/?/, ''))) {
      // Replace so the redirect does not create an extra history entry.
      window.history.replaceState(null, '', '#/dashboard');
    }
    const onHashChange = () => setPage(read());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [read]);

  const navigate = useCallback((next: PageType) => {
    if (window.location.hash.replace(/^#\/?/, '') === next) return;
    window.location.hash = `/${next}`;
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return [page, navigate];
}

/** Admin PIN gate — the PIN is verified by the API, never in the browser. */
function AdminPinModal({ isDark, onClose }: { isDark: boolean; onClose: (result?: { token: string; expiresAt: string }) => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const submit = useCallback(
    async (candidate: string) => {
      if (candidate.length !== 4 || verifying) return;
      setVerifying(true);
      setError(null);
      try {
        const { token, expiresAt } = await api.verifyPin(candidate);
        onClose({ token, expiresAt });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to verify PIN');
        setPin('');
      } finally {
        setVerifying(false);
      }
    },
    [onClose, verifying],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key >= '0' && event.key <= '9') {
        setPin((current) => (current.length < 4 ? current + event.key : current));
      } else if (event.key === 'Backspace') {
        setPin((current) => current.slice(0, -1));
      } else if (event.key === 'Enter') {
        void submit(pin);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [pin, submit]);

  useEffect(() => {
    if (pin.length === 4) void submit(pin);
  }, [pin, submit]);

  const digits = Array.from({ length: 4 }, (_, i) => pin[i] ?? '');

  return (
    <Modal
      open
      isDark={isDark}
      title="Admin access"
      description="Enter the 4-digit admin PIN. It is verified server-side."
      onClose={() => onClose()}
    >
      <div className="flex justify-center gap-3" aria-hidden="true">
        {digits.map((digit, i) => (
          <div
            key={i}
            className={`flex h-16 w-14 items-center justify-center rounded-xl border-2 text-3xl font-bold transition-all ${
              error
                ? 'border-red-400 bg-red-50'
                : digit
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
                  : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
            }`}
          >
            {digit ? '•' : ''}
          </div>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {pin.length} of 4 digits entered
      </p>

      <div className="mt-6 grid grid-cols-3 gap-2.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setPin((current) => (current.length < 4 ? current + String(key) : current))}
            className="h-14 rounded-xl bg-slate-100 text-lg font-semibold text-slate-700 transition-all active:scale-95 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {key}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPin('')}
          className="h-14 rounded-xl bg-slate-100 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => setPin((current) => (current.length < 4 ? current + '0' : current))}
          className="h-14 rounded-xl bg-slate-100 text-lg font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
        >
          0
        </button>
        <button
          type="button"
          onClick={() => setPin((current) => current.slice(0, -1))}
          aria-label="Delete last digit"
          className="h-14 rounded-xl bg-slate-100 text-lg font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
        >
          ⌫
        </button>
      </div>

      <button
        type="button"
        onClick={() => void submit(pin)}
        disabled={verifying || pin.length !== 4}
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50"
      >
        {verifying ? 'Verifying…' : 'Unlock'}
      </button>

      {error && (
        <p role="alert" className="mt-3 text-center text-sm text-red-500">
          {error}
        </p>
      )}
    </Modal>
  );
}

const COMPARABLE_PROGRAMS = [
  { name: 'Deel', category: 'Global Payroll & HR' },
  { name: 'Rippling', category: 'Unified HR Platform' },
  { name: 'Gusto', category: 'Payroll & Benefits' },
  { name: 'Workday', category: 'Enterprise HCM' },
  { name: 'BambooHR', category: 'SMB HR Software' },
  { name: 'Greenhouse', category: 'Recruiting Platform' },
  { name: 'Lever', category: 'Talent Acquisition' },
  { name: 'Ashby', category: 'Modern Recruiting' },
  { name: 'Eightfold AI', category: 'AI Talent Intelligence' },
  { name: 'Paradox', category: 'Conversational AI Hiring' },
];

function SearchModal({ isDark, onClose }: { isDark: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return COMPARABLE_PROGRAMS;
    return COMPARABLE_PROGRAMS.filter(
      (program) => program.name.toLowerCase().includes(needle) || program.category.toLowerCase().includes(needle),
    );
  }, [query]);

  return (
    <Modal open isDark={isDark} align="top" title="Search comparable programs" onClose={onClose}>
      <input
        type="search"
        autoFocus
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search…"
        aria-label="Search comparable programs"
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-indigo-500 ${
          isDark ? 'border-slate-700 bg-slate-900 text-white placeholder-slate-500' : 'border-slate-200 bg-slate-50 text-slate-800'
        }`}
      />

      <ul className="mt-4 max-h-80 space-y-1 overflow-y-auto">
        {filtered.map((program) => (
          <li key={program.name}>
            <button
              type="button"
              className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors ${
                isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
              }`}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white"
                aria-hidden="true"
              >
                {program.name[0]}
              </span>
              <span className="flex-1">
                <span className={`block text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{program.name}</span>
                <span className={`block text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{program.category}</span>
              </span>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                Compare
              </span>
            </button>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className={`p-4 text-center text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>No matches</li>
        )}
      </ul>
    </Modal>
  );
}

function LoadingSplash() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a14]">
      <div className="text-center">
        <motion.div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-2xl shadow-indigo-500/30"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
        >
          <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </motion.div>
        <p className="mt-6 text-lg font-medium text-slate-400">AI Workforce Hub</p>
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-indigo-500"
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, toggleTheme] = usePersistentTheme();
  const isDark = theme === 'dark';

  const [showPinModal, setShowPinModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const [currentPage, navigate] = useHashRoute();
  const [adminSession, setAdminSession] = useState<{ token: string; expiresAt: string } | null>(null);

  const unlock = useCallback((token: string, expiresAt: string) => setAdminSession({ token, expiresAt }), []);
  const lock = useCallback(() => setAdminSession(null), []);
  const adminValue = useMemo<AdminContextType>(
    () => ({ unlocked: adminSession !== null, token: adminSession?.token ?? null, unlock, lock, expiry: adminSession?.expiresAt ?? null }),
    [adminSession, unlock, lock],
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  // Automatically drop the admin session once the token expires.
  useEffect(() => {
    if (!adminSession) return;
    const msRemaining = new Date(adminSession.expiresAt).getTime() - Date.now();
    if (msRemaining <= 0) {
      setAdminSession(null);
      return;
    }
    const timer = setTimeout(() => setAdminSession(null), msRemaining);
    return () => clearTimeout(timer);
  }, [adminSession]);

  // Keep document metadata in sync with the active route.
  useEffect(() => {
    const seo = pageSEO[currentPage];
    if (!seo) return;

    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', seo.keywords);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', seo.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', seo.description);
  }, [currentPage]);

  // Cmd/Ctrl-K opens search.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setShowSearchModal(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (isLoading) return <LoadingSplash />;

  const renderPage = (): ReactNode => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={navigate} isDark={isDark} />;
      case 'chat':
        return <ChatSystemPage isDark={isDark} />;
      case 'lindy-tools':
        return <LindyToolsPage isDark={isDark} />;
      case 'employees':
        return <EmployeesPage isDark={isDark} />;
      case 'deploy':
        return <DeployPage onNavigate={navigate} isDark={isDark} />;
      case 'analytics':
        return <AnalyticsPage isDark={isDark} />;
      case 'billing':
        return <BillingPage isDark={isDark} />;
      case 'workflows':
        return <WorkflowsPage isDark={isDark} />;
      case 'integrations':
        return <IntegrationsPage isDark={isDark} />;
      case 'settings':
        return <SettingsPage isDark={isDark} onOpenAdmin={() => setShowPinModal(true)} />;
      case 'architecture':
        return <ArchitecturePage isDark={isDark} />;
      default:
        return <DashboardPage onNavigate={navigate} isDark={isDark} />;
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <AdminContext.Provider value={adminValue}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <div
          className={`min-h-screen transition-colors duration-500 ${
            isDark ? 'bg-[#0a0a14]' : 'bg-gradient-to-br from-slate-50 via-indigo-50/20 to-violet-50/30'
          }`}
        >
          <BackgroundPattern isDark={isDark} />

          <Sidebar
            currentPage={currentPage}
            onNavigate={navigate}
            isDark={isDark}
            onToggleTheme={toggleTheme}
            onOpenSearch={() => setShowSearchModal(true)}
            onOpenAdmin={() => (adminSession ? lock() : setShowPinModal(true))}
            adminUnlocked={adminSession !== null}
          />

          <main id="main-content" tabIndex={-1} className="relative z-10 ml-64 overflow-auto">
            <p className="sr-only" role="status" aria-live="polite">
              {pageSEO[currentPage]?.title ?? currentPage}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>

          {showPinModal && (
            <AdminPinModal
              isDark={isDark}
              onClose={(result) => {
                setShowPinModal(false);
                if (result) unlock(result.token, result.expiresAt);
              }}
            />
          )}
          {showSearchModal && <SearchModal isDark={isDark} onClose={() => setShowSearchModal(false)} />}
        </div>
      </AdminContext.Provider>
    </ThemeContext.Provider>
  );
}

function BackgroundPattern({ isDark }: { isDark: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.015]">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="dotGrid" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="0.4" fill={isDark ? '#818cf8' : '#6366f1'} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>
      <div className="absolute left-1/3 top-20 h-[500px] w-[500px] opacity-[0.04]">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#6366f1" strokeWidth="0.3" strokeDasharray="6 6" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="#8b5cf6" strokeWidth="0.3" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="#a78bfa" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="3" fill="#6366f1" opacity="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-1/4 h-[400px] w-[400px] opacity-[0.03]">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <rect x="40" y="40" width="120" height="120" fill="none" stroke="#06b6d4" strokeWidth="0.3" rx="12" />
          <rect x="65" y="65" width="70" height="70" fill="none" stroke="#22d3ee" strokeWidth="0.3" rx="8" />
          <line x1="40" y1="40" x2="100" y2="100" stroke="#67e8f9" strokeWidth="0.2" />
          <line x1="160" y1="40" x2="100" y2="100" stroke="#67e8f9" strokeWidth="0.2" />
          <line x1="40" y1="160" x2="100" y2="100" stroke="#67e8f9" strokeWidth="0.2" />
          <line x1="160" y1="160" x2="100" y2="100" stroke="#67e8f9" strokeWidth="0.2" />
        </svg>
      </div>
    </div>
  );
}

export type { ThemePreference };
