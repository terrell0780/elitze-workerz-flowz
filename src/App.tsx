import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
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

export type PageType = 'dashboard' | 'employees' | 'deploy' | 'analytics' | 'billing' | 'workflows' | 'integrations' | 'settings' | 'architecture' | 'chat' | 'lindy-tools';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({ isDark: true, toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

// Admin PIN Modal
function AdminPinModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);

  const handleDigit = (digit: string) => {
    const newPin = [...pin];
    const emptyIndex = newPin.indexOf('');
    if (emptyIndex !== -1) {
      newPin[emptyIndex] = digit;
      setPin(newPin);
      setError(false);
    }
  };

  const handleBackspace = () => {
    const newPin = [...pin];
    for (let i = newPin.length - 1; i >= 0; i--) {
      if (newPin[i] !== '') { newPin[i] = ''; break; }
    }
    setPin(newPin);
  };

  const handleSubmit = () => {
    if (pin.join('') === '1234') { onSuccess(); }
    else { setError(true); setPin(['', '', '', '']); }
  };

  return (
    <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Admin Access</h2>
          <p className="text-slate-500 text-sm mt-1">Enter 4-digit PIN</p>
        </div>
        <div className="flex justify-center gap-3 mb-6">
          {pin.map((digit, i) => (
            <div key={i} className={`w-14 h-16 rounded-xl border-2 flex items-center justify-center text-3xl font-bold transition-all ${error ? 'border-red-300 bg-red-50' : digit ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-slate-200 bg-white'}`}>
              {digit ? '•' : ''}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'].map((key, i) => (
            <button key={i} onClick={() => { if (key === 'del') handleBackspace(); else if (key !== '') handleDigit(String(key)); }} className={`h-14 rounded-xl text-lg font-semibold transition-all active:scale-95 ${key === '' ? 'bg-transparent cursor-default' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
              {key === 'del' ? '⌫' : key}
            </button>
          ))}
        </div>
        <button onClick={handleSubmit} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/25">Unlock</button>
        <button onClick={onClose} className="w-full mt-2 py-2 text-slate-400 text-sm hover:text-slate-600">Cancel</button>
        <p className="text-center text-xs text-slate-400 mt-3">Demo PIN: 1234</p>
      </motion.div>
    </motion.div>
  );
}

// Search Modal
function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const programs = [
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
  const filtered = programs.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="bg-white rounded-2xl max-w-xl w-full mx-4 shadow-2xl overflow-hidden" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search similar programs..." value={query} onChange={e => setQuery(e.target.value)} className="flex-1 bg-transparent text-lg outline-none text-slate-800 placeholder-slate-400" autoFocus />
            <kbd className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-400">ESC</kbd>
          </div>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {filtered.map((p) => (
            <div key={p.name} className="flex items-center gap-4 p-4 hover:bg-indigo-50/50 cursor-pointer transition-colors">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">{p.name[0]}</div>
              <div className="flex-1"><div className="font-semibold text-slate-800">{p.name}</div><div className="text-sm text-slate-500">{p.category}</div></div>
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-medium">Compare</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);

  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 900); return () => clearTimeout(t); }, []);

  // Update document title and meta description on page change
  useEffect(() => {
    const seo = pageSEO[currentPage];
    if (seo) {
      document.title = seo.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', seo.description);
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) metaKeywords.setAttribute('content', seo.keywords);
    }
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <div className="text-center">
          <motion.div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mx-auto shadow-2xl shadow-indigo-500/30" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.4 }}>
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </motion.div>
          <motion.p className="mt-6 text-slate-400 font-medium text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>AI Workforce Hub</motion.p>
          <motion.div className="flex items-center justify-center gap-1.5 mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {[0, 1, 2].map(i => <motion.div key={i} className="w-2 h-2 rounded-full bg-indigo-500" animate={{ y: [-3, 3, -3] }} transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }} />)}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(!isDark) }}>
      <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#0a0a14]' : 'bg-gradient-to-br from-slate-50 via-indigo-50/20 to-violet-50/30'}`}>
        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015]">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs><pattern id="dotGrid" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="0.4" fill={isDark ? '#818cf8' : '#6366f1'} /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#dotGrid)" />
            </svg>
          </div>
          <div className="absolute top-20 left-1/3 w-[500px] h-[500px] opacity-[0.04]">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#6366f1" strokeWidth="0.3" strokeDasharray="6 6" />
              <circle cx="100" cy="100" r="65" fill="none" stroke="#8b5cf6" strokeWidth="0.3" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="#a78bfa" strokeWidth="0.3" />
              <circle cx="100" cy="100" r="3" fill="#6366f1" opacity="0.5" />
            </svg>
          </div>
          <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] opacity-[0.03]">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <rect x="40" y="40" width="120" height="120" fill="none" stroke="#06b6d4" strokeWidth="0.3" rx="12" />
              <rect x="65" y="65" width="70" height="70" fill="none" stroke="#22d3ee" strokeWidth="0.3" rx="8" />
              <line x1="40" y1="40" x2="100" y2="100" stroke="#67e8f9" strokeWidth="0.2" />
              <line x1="160" y1="40" x2="100" y2="100" stroke="#67e8f9" strokeWidth="0.2" />
              <line x1="40" y1="160" x2="100" y2="100" stroke="#67e8f9" strokeWidth="0.2" />
              <line x1="160" y1="160" x2="100" y2="100" stroke="#67e8f9" strokeWidth="0.2" />
            </svg>
          </div>
        </div>

        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} onOpenSearch={() => setShowSearchModal(true)} onOpenAdmin={() => setShowPinModal(true)} adminUnlocked={adminUnlocked} />

        <main className="flex-1 ml-64 relative z-10 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div key={currentPage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
              {currentPage === 'dashboard' && <DashboardPage onNavigate={setCurrentPage} isDark={isDark} />}
              {currentPage === 'chat' && <ChatSystemPage isDark={isDark} />}
              {currentPage === 'lindy-tools' && <LindyToolsPage isDark={isDark} />}
              {currentPage === 'employees' && <EmployeesPage isDark={isDark} />}
              {currentPage === 'deploy' && <DeployPage onNavigate={setCurrentPage} isDark={isDark} />}
              {currentPage === 'analytics' && <AnalyticsPage isDark={isDark} />}
              {currentPage === 'billing' && <BillingPage isDark={isDark} />}
              {currentPage === 'workflows' && <WorkflowsPage isDark={isDark} />}
              {currentPage === 'integrations' && <IntegrationsPage isDark={isDark} />}
              {currentPage === 'settings' && <SettingsPage isDark={isDark} onOpenAdmin={() => setShowPinModal(true)} />}
              {currentPage === 'architecture' && <ArchitecturePage isDark={isDark} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {showPinModal && <AdminPinModal onClose={() => setShowPinModal(false)} onSuccess={() => { setAdminUnlocked(true); setShowPinModal(false); }} />}
          {showSearchModal && <SearchModal onClose={() => setShowSearchModal(false)} />}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}