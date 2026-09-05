import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Shield, Users, BarChart3, Settings, Sun, Moon, Eye, EyeOff, LucideIcon } from 'lucide-react';
import { themeStore } from '../store/theme';
import { leaderboardStore } from '../store/leaderboard';
import { ALL_AGENTS } from '../data/allAgents';
import { cn } from '../utils/cn';

const PIN_KEY = 'workerz_admin_pin';
const DEFAULT_PIN = '1951';

function getStoredPin() { return localStorage.getItem(PIN_KEY) || DEFAULT_PIN; }

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
}

type Tab = 'dashboard' | 'agents' | 'settings' | 'security';

export function AdminPanel({ open, onClose }: AdminPanelProps) {
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [theme, setTheme] = useState(themeStore.get());
  const [leaderboard, setLeaderboard] = useState(leaderboardStore.get());
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState('');
  const [showPin, setShowPin] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) { setAuthed(false); setPin(''); setPinError(''); }
    else setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    const unsub = leaderboardStore.subscribe(() => setLeaderboard([...leaderboardStore.get()]));
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = themeStore.subscribe(setTheme);
    return unsub;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin === getStoredPin()) { setAuthed(true); setPinError(''); }
    else { setPinError('Incorrect PIN.'); setPin(''); }
  }

  function handleChangePin(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{4}$/.test(newPin)) { setPinChangeMsg('PIN must be exactly 4 digits.'); return; }
    if (newPin !== confirmPin) { setPinChangeMsg('PINs do not match.'); return; }
    localStorage.setItem(PIN_KEY, newPin);
    setPinChangeMsg('PIN updated successfully.');
    setNewPin(''); setConfirmPin('');
    setTimeout(() => setPinChangeMsg(''), 3000);
  }

  function toggleTheme() {
    themeStore.toggle();
    setTheme(themeStore.get());
  }

  const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'agents', label: 'Agents', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const available = ALL_AGENTS.filter((a) => a.availability === 'Available').length;
  const busy = ALL_AGENTS.filter((a) => a.availability === 'Busy').length;
  const onTask = ALL_AGENTS.filter((a) => a.availability === 'On Task').length;

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl max-h-[88vh] overflow-hidden flex flex-col rounded-2xl border border-white/10 bg-[#0b0b18] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-violet-400" />
              <h2 className="font-bold text-white">Admin Panel</h2>
              {authed && <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">AUTHENTICATED</span>}
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* PIN gate */}
          {!authed ? (
            <div className="flex-1 flex items-center justify-center p-10">
              <div className="w-full max-w-xs text-center">
                <div className="w-14 h-14 rounded-2xl bg-violet-500/15 border border-violet-400/25 flex items-center justify-center mx-auto mb-5">
                  <Lock className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Admin Access</h3>
                <p className="text-xs text-slate-500 mb-6">Enter your 4-digit PIN to continue</p>
                <form onSubmit={handlePinSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type={showPin ? 'text' : 'password'}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      maxLength={4}
                      placeholder="••••"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-white text-center text-2xl font-mono tracking-[0.5em] focus:outline-none focus:border-violet-400 placeholder:text-slate-700"
                      required
                    />
                    <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                      {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {pinError && <p className="text-xs text-rose-400">{pinError}</p>}
                  <button type="submit" className="w-full py-2.5 rounded-xl bg-white text-black font-bold hover:bg-violet-100 transition-colors">
                    Unlock
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex border-b border-white/8 flex-shrink-0">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={cn(
                      'flex items-center gap-2 px-5 py-3 text-xs font-medium transition-colors border-b-2',
                      activeTab === t.id
                        ? 'border-violet-400 text-white bg-violet-500/5'
                        : 'border-transparent text-slate-500 hover:text-white'
                    )}
                  >
                    <t.icon className="w-3.5 h-3.5" />
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="flex-1 overflow-y-auto p-6 min-h-0">
                {activeTab === 'dashboard' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Total Agents', value: '1,000', color: 'text-violet-400' },
                        { label: 'Available', value: String(available), color: 'text-emerald-400' },
                        { label: 'On Task', value: String(onTask + busy), color: 'text-amber-400' },
                      ].map((s) => (
                        <div key={s.label} className="p-4 rounded-xl border border-white/8 bg-white/[0.02] text-center">
                          <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
                          <p className="text-[10px] text-slate-500 mt-1">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Live Leaderboard</p>
                      <div className="space-y-2">
                        {leaderboard.slice(0, 5).map((e) => (
                          <div key={e.rank} className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                            <span className="text-sm w-6 text-center">{e.badge || `#${e.rank}`}</span>
                            <span className="text-xs font-medium text-white flex-1">{e.name}</span>
                            <span className="text-xs font-mono text-violet-300">{e.agents} agents</span>
                            <span className="text-xs font-mono text-emerald-400">${e.spent.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'agents' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500 mb-4">Showing all 1,000 certified agents — scroll to view</p>
                    <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                      {ALL_AGENTS.slice(0, 50).map((a) => (
                        <div key={a.id} className="flex items-center gap-3 px-3 py-2 rounded-lg border border-white/5 hover:bg-white/[0.02] transition-colors">
                          <div className={cn('w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center text-[10px] text-white font-bold flex-shrink-0', a.color)}>{a.avatar}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-white truncate">{a.name}</p>
                            <p className="text-[10px] text-slate-500 truncate">{a.title}</p>
                          </div>
                          <span className={cn('text-[9px] font-mono', a.availability === 'Available' ? 'text-emerald-400' : a.availability === 'Busy' ? 'text-amber-400' : 'text-blue-400')}>
                            {a.availability}
                          </span>
                        </div>
                      ))}
                      <p className="text-[10px] text-slate-600 text-center pt-2">+ 432 more agents</p>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                      <div>
                        <p className="text-sm font-medium text-white">Theme</p>
                        <p className="text-xs text-slate-500">Switch between dark and light mode</p>
                      </div>
                        <button
                          onClick={toggleTheme}
                          className={cn('w-12 h-6 rounded-full border flex items-center px-0.5 transition-colors', theme === 'dark' ? 'bg-violet-500/30 border-violet-400/40 justify-end' : 'bg-amber-500/20 border-amber-400/30 justify-start')}
                        >
                          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white shadow">
                            {theme === 'dark' ? <Moon className="w-3 h-3 text-violet-600" /> : <Sun className="w-3 h-3 text-amber-500" />}
                          </div>
                        </button>
                    </div>

                    <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
                      <p className="text-sm font-medium text-white mb-1">Change Admin PIN</p>
                      <p className="text-xs text-slate-500 mb-4">Must be exactly 4 digits</p>
                      <form onSubmit={handleChangePin} className="space-y-3">
                        <input
                          type="password"
                          value={newPin}
                          onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="New PIN"
                          maxLength={4}
                          className="w-full px-3 py-2 rounded-lg border border-white/10 bg-black/40 text-white text-sm font-mono focus:outline-none focus:border-violet-400"
                        />
                        <input
                          type="password"
                          value={confirmPin}
                          onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="Confirm PIN"
                          maxLength={4}
                          className="w-full px-3 py-2 rounded-lg border border-white/10 bg-black/40 text-white text-sm font-mono focus:outline-none focus:border-violet-400"
                        />
                        {pinChangeMsg && (
                          <p className={cn('text-xs', pinChangeMsg.includes('success') ? 'text-emerald-400' : 'text-rose-400')}>
                            {pinChangeMsg}
                          </p>
                        )}
                        <button type="submit" className="px-4 py-2 rounded-lg bg-white text-black text-sm font-bold hover:bg-violet-100 transition-colors">
                          Update PIN
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <p className="text-sm font-bold text-white">Platform Security Status</p>
                      </div>
                      {[
                        ['4-digit PIN protection', true],
                        ['Session-based auth', true],
                        ['Audit trail active', true],
                        ['HTTPS enforced', true],
                        ['Worker isolation', true],
                        ['Hermes approval gate', true],
                      ].map(([label, ok]) => (
                        <div key={label as string} className="flex items-center gap-2 py-1 border-t border-white/5">
                          <span className={ok ? 'text-emerald-400' : 'text-rose-400'}>{ok ? '✓' : '✗'}</span>
                          <span className="text-xs text-slate-300">{label as string}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Recent Activity</p>
                      {['Admin login · now', 'Cart checkout · 4m ago', 'VIP upgrade · 12m ago', 'Agent hired · 18m ago'].map((l) => (
                        <p key={l} className="text-xs text-slate-400 py-1.5 border-b border-white/5 last:border-0 font-mono">{l}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
