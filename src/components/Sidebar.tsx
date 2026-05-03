import { motion } from 'framer-motion';
import { PageType } from '../App';
import { LayoutDashboard, Users, Rocket, BarChart3, CreditCard, GitBranch, Plug, Settings, Sparkles, ChevronRight, Layers, Sun, Moon, Search, Lock, MessagesSquare, Workflow } from 'lucide-react';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  adminUnlocked: boolean;
}

const navItems: { id: PageType; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
  { id: 'chat', label: 'Chat System', icon: <MessagesSquare className="w-[18px] h-[18px]" /> },
  { id: 'employees', label: 'Employees', icon: <Users className="w-[18px] h-[18px]" /> },
  { id: 'deploy', label: 'Deploy', icon: <Rocket className="w-[18px] h-[18px]" /> },
  { id: 'lindy-tools', label: 'Lindy Tools', icon: <Workflow className="w-[18px] h-[18px]" /> },
  { id: 'workflows', label: 'Workflows', icon: <GitBranch className="w-[18px] h-[18px]" /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-[18px] h-[18px]" /> },
  { id: 'integrations', label: 'Integrations', icon: <Plug className="w-[18px] h-[18px]" /> },
  { id: 'architecture', label: 'Architecture', icon: <Layers className="w-[18px] h-[18px]" /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard className="w-[18px] h-[18px]" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-[18px] h-[18px]" /> },
];

export default function Sidebar({ currentPage, onNavigate, isDark, onToggleTheme, onOpenSearch, onOpenAdmin, adminUnlocked }: SidebarProps) {
  const bgClass = isDark ? 'bg-[#0c0c18]/95 border-slate-800/60' : 'bg-white/80 backdrop-blur-xl border-slate-200/60';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textMuted = isDark ? 'text-slate-500' : 'text-slate-400';
  const activeBg = isDark ? 'bg-indigo-500/15 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200';
  const activeText = isDark ? 'text-indigo-400' : 'text-indigo-600';
  const inactiveText = isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700';

  return (
    <motion.aside className={`fixed left-0 top-0 h-screen w-64 flex flex-col z-50 border-r ${bgClass}`} initial={{ x: -256 }} animate={{ x: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
      {/* Logo */}
      <div className={`h-16 flex items-center px-5 border-b ${isDark ? 'border-slate-800/60' : 'border-slate-200/60'}`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl blur-md opacity-40" />
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
          </div>
          <div>
            <div className={`font-bold ${textPrimary} tracking-tight`}>Workforce Hub</div>
            <div className={`text-[10px] ${textMuted} tracking-widest uppercase`}>AI Platform</div>
          </div>
        </div>
      </div>

      {/* Executive AI Status */}
      <div className="px-4 py-4">
        <motion.div className={`relative overflow-hidden rounded-xl border p-4 ${isDark ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-gradient-to-br from-indigo-50 to-violet-50 border-indigo-100'}`} whileHover={{ scale: 1.01 }}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
            <span className={`text-xs font-semibold ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>Executive AI Layer</span>
          </div>
          <div className="flex gap-3">
            {['ChatGPT', 'Lindy', 'Hermes'].map((ai, i) => (
              <div key={ai} className="flex items-center gap-1.5">
                <motion.div className="w-2 h-2 rounded-full bg-emerald-400" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }} />
                <span className={`text-[11px] ${textMuted}`}>{ai}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative ${currentPage === item.id ? activeText : inactiveText}`}
              whileTap={{ scale: 0.97 }}
            >
              {currentPage === item.id && (
                <motion.div className={`absolute inset-0 rounded-xl border ${activeBg}`} layoutId="activeNav" transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }} />
              )}
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10 text-[13px] font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className={`p-4 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200/60'}`}>
        {/* Theme & Search */}
        <div className="flex items-center gap-2 mb-3">
          <motion.button onClick={onToggleTheme} className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl transition-colors ${isDark ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`} whileTap={{ scale: 0.95 }}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="text-xs font-medium">{isDark ? 'Light' : 'Dark'}</span>
          </motion.button>
          <motion.button onClick={onOpenSearch} className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl transition-colors ${isDark ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`} whileTap={{ scale: 0.95 }}>
            <Search className="w-4 h-4" />
            <span className="text-xs font-medium">Search</span>
          </motion.button>
        </div>

        {/* Admin */}
        <motion.button onClick={onOpenAdmin} className={`w-full flex items-center gap-3 p-3 rounded-xl mb-3 transition-colors ${adminUnlocked ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : isDark ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`} whileHover={{ scale: 1.01 }}>
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">{adminUnlocked ? 'Admin Unlocked' : 'Admin Panel'}</span>
        </motion.button>

        {/* User */}
        <motion.div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${isDark ? 'bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700/60' : 'bg-slate-50 border border-slate-100 hover:bg-slate-100'}`} whileHover={{ scale: 1.01 }}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-indigo-500/20">JD</div>
          <div className="flex-1 min-w-0">
            <div className={`text-sm font-medium truncate ${textPrimary}`}>John Doe</div>
            <div className={`text-xs ${textMuted}`}>Enterprise Plan</div>
          </div>
          <ChevronRight className={`w-4 h-4 ${textMuted}`} />
        </motion.div>
      </div>
    </motion.aside>
  );
}