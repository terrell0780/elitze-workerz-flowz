import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu, Share2, Globe, Apple, GitBranch, Sun, Moon, Search, Settings, CheckCircle2 } from 'lucide-react';
import { AgentDropdown } from './AgentDropdown';
import { authStore, type AuthProvider } from '../store/auth';
import { themeStore } from '../store/theme';

const links = [
  { href: '#agents', label: 'Browse Agents' },
  { href: '#hire', label: 'Hire' },
  { href: '#chat', label: 'Chat' },
  { href: '#eliteze-system', label: 'ELITZE System' },
  { href: '#ecosystem', label: 'Ecosystem' },
  { href: '#security', label: 'Security' },
  { href: '#legal', label: 'Legal' },
];

interface NavProps {
  onOpenCart?: () => void;
  onOpenAdmin?: () => void;
}

const providerButtons: Array<{ id: Exclude<AuthProvider, 'email'>; label: string; icon: React.ReactNode }> = [
  { id: 'google', label: 'Google', icon: <Globe className="w-4 h-4" /> },
  { id: 'apple', label: 'Apple', icon: <Apple className="w-4 h-4" /> },
  { id: 'github', label: 'GitHub', icon: <GitBranch className="w-4 h-4" /> },
  { id: 'vercel', label: 'Vercel', icon: <span className="text-xs font-bold">▲</span> },
];

export function Nav({ onOpenCart, onOpenAdmin }: NavProps) {
  const [open, setOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signedInAs, setSignedInAs] = useState(authStore.getUser());
  const [theme, setTheme] = useState(themeStore.get());
  const [searchOpen, setSearchOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setLoading(true);
    // Simulate password reset email sending
    setTimeout(() => {
      setResetSent(true);
      setLoading(false);
      setTimeout(() => {
        setForgotPasswordOpen(false);
        setResetSent(false);
        setForgotEmail('');
      }, 3000);
    }, 1000);
  }

  useEffect(() => {
    return authStore.subscribe(() => setSignedInAs(authStore.getUser()));
  }, []);

  useEffect(() => {
    return themeStore.subscribe(setTheme);
  }, []);

  useEffect(() => {
    if (!signInOpen) {
      setError('');
      return;
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSignInOpen(false);
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [signInOpen]);

  async function handleEmailSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }
    setLoading(true);
    try {
      await authStore.signInWithEmail(email, password);
      setSignInOpen(false);
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed.');
    } finally {
      setLoading(false);
    }
  }

  async function handleProviderSignIn(provider: Exclude<AuthProvider, 'email'>) {
    setError('');
    setLoading(true);
    try {
      await authStore.signInWithProvider(provider);
      if (!import.meta.env.VITE_AUTH_API_BASE) setSignInOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Provider sign in failed.');
    } finally {
      setLoading(false);
    }
  }

  function handleShare() {
    const url = 'https://elitze.shop';
    const title = 'Elitze One Stop Shop';
    const text = 'Elitze One Stop Shop — AI staffing agency for hiring certified AI employees.';
    if (navigator.share) {
      navigator.share({ title, text, url }).catch(() => {});
      return;
    }
    navigator.clipboard.writeText(url).catch(() => {});
  }

  function handleSignOut() {
    authStore.signOut();
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#050608]/82 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-8">
          <a href="#home" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-7 h-7 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg">
              <Cpu className="w-4 h-4 text-slate-300" />
            </div>
            <span className="font-bold text-white tracking-tight hidden sm:block">ELITZE</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors whitespace-nowrap">
                {l.label}
              </a>
            ))}
            <div className="hidden md:block">
              <AgentDropdown onOpenCart={onOpenCart || (() => {})} />
            </div>
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => setSearchOpen(!searchOpen)} className="hidden md:inline-flex p-2 border border-white/8 rounded-lg text-slate-500 hover:text-white hover:border-white/20 transition-colors" title="Search">
              <Search className="w-4 h-4" />
            </button>
            <button onClick={() => themeStore.toggle()} className="hidden md:inline-flex p-2 border border-white/8 rounded-lg text-slate-500 hover:text-white hover:border-white/20 transition-colors" title="Toggle theme">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={handleShare} className="hidden md:inline-flex p-2 border border-white/8 rounded-lg text-slate-500 hover:text-white hover:border-white/20 transition-colors" title="Share">
              <Share2 className="w-4 h-4" />
            </button>
            {signedInAs ? (
              <button
                onClick={handleSignOut}
                className="hidden md:inline-flex text-xs font-mono text-emerald-300 hover:text-white transition-colors px-3 py-1.5 border border-emerald-500/20 rounded-lg max-w-[160px] truncate"
                title={`Signed in as ${signedInAs.email}`}
              >
                {signedInAs.name} · Sign Out
              </button>
            ) : (
              <button
                onClick={() => setSignInOpen(true)}
                className="hidden md:inline-flex text-sm text-slate-300 hover:text-white transition-colors px-3 py-1.5"
              >
                Sign In
              </button>
            )}
            <button
              onClick={onOpenCart}
              className="hidden md:inline-flex px-3 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg font-semibold text-sm hover:bg-slate-700 transition-all whitespace-nowrap"
            >
              Cart
            </button>
            <button
              onClick={onOpenAdmin}
              className="hidden md:inline-flex px-3 py-2 border border-white/8 text-slate-500 rounded-lg text-xs hover:text-white hover:border-white/20 transition-all whitespace-nowrap"
              title="Admin Panel"
            >
              🔐
            </button>
            <a href="#hire" className="hidden md:inline-flex px-4 py-2 bg-white text-black rounded-lg font-semibold text-sm hover:bg-slate-200 transition-all whitespace-nowrap">
              Hire Now
            </a>
            <button className="md:hidden p-2 text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 inset-x-0 z-40 bg-[#0a0a12] border-b border-white/10 md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base text-slate-300 hover:text-white transition-colors py-1 border-b border-white/5 pb-3">
                  {l.label}
                </a>
              ))}
              <div className="pt-2 flex gap-3">
                {signedInAs ? (
                  <button onClick={() => { handleSignOut(); setOpen(false); }} className="flex-1 px-4 py-2.5 border border-emerald-500/25 rounded-lg text-sm text-emerald-300">
                    Sign Out
                  </button>
                ) : (
                  <button onClick={() => { setOpen(false); setSignInOpen(true); }} className="flex-1 px-4 py-2.5 border border-white/15 rounded-lg text-sm text-white">
                    Sign In
                  </button>
                )}
                <a href="#hire" onClick={() => setOpen(false)} className="flex-1 px-4 py-2.5 bg-white text-black rounded-lg font-semibold text-sm text-center">
                  Hire Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {signInOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSignInOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-2xl border border-white/12 bg-[#0b0b16] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-7 py-5 border-b border-white/8">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <Cpu className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                  <h3 className="text-base font-bold text-white">Sign In to Elitze</h3>
                </div>
                <button onClick={() => setSignInOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-colors" aria-label="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-7 py-5 border-b border-white/5">
                <p className="text-xs font-medium text-slate-400 mb-3">Continue with</p>
                <div className="grid grid-cols-2 gap-2">
                  {providerButtons.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => handleProviderSignIn(provider.id)}
                      disabled={loading}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-white/10 bg-black/30 text-sm text-slate-200 hover:bg-white/[0.04] hover:border-white/20 transition-colors disabled:opacity-60"
                    >
                      {provider.icon}
                      {provider.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleEmailSignIn} className="px-7 py-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-black/50 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400/30 transition-colors"
                    placeholder="you@company.com"
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-black/50 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400/30 transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="flex items-center justify-end -mt-2 mb-3">
                  <button
                    type="button"
                    onClick={() => { setSignInOpen(false); setForgotPasswordOpen(true); }}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {error && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3.5 py-2.5">
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing In…' : 'Continue with Email'}
                </button>

                <p className="text-center text-xs text-slate-600 pt-1">
                  Browse is open to everyone. Renting or purchasing an agent requires login and Lindy AI authorization.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search agents, features, documentation..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 bg-[#0b0c16] text-white text-lg placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-colors"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 px-4">
                <p className="text-xs text-slate-500 mb-2">Quick searches:</p>
                <div className="flex flex-wrap gap-2">
                  {['Sales agents', 'Support agents', 'Pricing', 'Hermes AI', 'Lindy AI', 'LangGraph'].map((q) => (
                    <button
                      key={q}
                      onClick={() => setSearchOpen(false)}
                      className="px-3 py-1.5 rounded-lg border border-white/8 bg-white/[0.02] text-xs text-slate-400 hover:text-white hover:border-white/20 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Forgot Password Modal */}
        <AnimatePresence>
          {forgotPasswordOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => { setForgotPasswordOpen(false); setResetSent(false); setForgotEmail(''); }}
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-md rounded-2xl border border-white/12 bg-[#0b0b16] shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-7 py-5 border-b border-white/8">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                      <Settings className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-white">Reset Password</h3>
                  </div>
                  <button
                    onClick={() => { setForgotPasswordOpen(false); setResetSent(false); setForgotEmail(''); }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {!resetSent ? (
                  <form onSubmit={handleForgotPassword} className="px-7 py-6 space-y-4">
                    <p className="text-xs text-slate-400">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Email address</label>
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-black/50 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/30 transition-colors"
                        placeholder="you@company.com"
                        required
                        autoFocus
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-4 py-2.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setForgotPasswordOpen(false); setResetSent(false); setForgotEmail(''); }}
                      className="w-full px-4 py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      Back to Sign In
                    </button>
                  </form>
                ) : (
                  <div className="px-7 py-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-1">Check your email</p>
                      <p className="text-xs text-slate-400">
                        We've sent a password reset link to <span className="text-white">{forgotEmail}</span>
                      </p>
                    </div>
                    <p className="text-xs text-slate-500">
                      Didn't receive the email? Check your spam folder or contact support.
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </>
  );
}
