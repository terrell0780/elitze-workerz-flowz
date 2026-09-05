import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Home, Users, UserPlus, Layers, Workflow,
  MessageSquare, ShoppingCart, Trophy, Shield,
  HelpCircle, Globe, Star, Settings, ChevronLeft,
  ChevronRight, Menu, Zap, Crown, Search, BarChart3,
  ClipboardCheck, FileCheck2, SlidersHorizontal, Activity
} from 'lucide-react';
import { router, type PageId } from '../store/router';
import { ALL_AGENTS } from '../data/allAgents';
import { cn } from '../utils/cn';
import { useCart } from '../store/cart';
import { isFlashSaleActive } from '../store/flashSale';
import { getVIPStatus } from '../store/flashSale';
import { NavItem } from '../types/core';

const NAV_ITEMS: NavItem[] = [
  { id: 'home',         label: 'Dashboard',      icon: Home },
  { id: 'agents',       label: 'Browse Agents',  icon: Users,       badge: '1000', badgeColor: 'bg-slate-500/20 text-slate-300' },
  { id: 'hire',         label: 'Hire an Agent',  icon: UserPlus,    badge: 'NEW', badgeColor: 'bg-blue-500/20 text-blue-300' },
  { id: 'hiring-guide', label: 'Hiring Guide',   icon: HelpCircle },
  { id: 'integrations', label: 'ATS / CRM Sync', icon: Globe },
  { id: 'analytics',    label: 'Analytics',      icon: BarChart3 },
  { id: 'assessments',  label: 'Assessments',    icon: ClipboardCheck },
  { id: 'onboarding',   label: 'Onboarding',     icon: FileCheck2 },
  { id: 'controls',     label: 'Approvals',      icon: SlidersHorizontal },
  { id: 'trust',        label: 'Trust Center',   icon: Shield },
  { id: 'status',       label: 'Status / SLA',   icon: Activity },
  { id: 'research',     label: 'DuckDuckGo Research', icon: Search },
  { id: 'behavior',     label: 'Behavioral Flow',icon: Zap },
  { id: 'orchestrator', label: 'Orchestrator',   icon: Layers,      dividerBefore: true },
  { id: 'workflow',     label: 'Process Map',    icon: Workflow },
  { id: 'chat',         label: 'Agent Services', icon: MessageSquare, badge: '●', badgeColor: 'text-emerald-400' },
  { id: 'checkout',     label: 'Checkout',       icon: ShoppingCart, dividerBefore: true },
  { id: 'leaderboard',  label: 'Top Performers', icon: Trophy },
  { id: 'ecosystem',    label: 'Network',        icon: Globe,       dividerBefore: true },
  { id: 'eliteze-system', label: 'ELITZE System', icon: Zap },
  { id: 'testimonials', label: 'Case Studies',   icon: Star },
  { id: 'security',     label: 'Compliance',     icon: Shield },
  { id: 'faq',          label: 'Knowledge',      icon: HelpCircle },
  { id: 'legal',        label: 'Legal & Payments', icon: Shield },
  { id: 'admin',        label: 'Administration', icon: Settings,    dividerBefore: true },
];

interface SidebarProps {
  onCartOpen: () => void;
}

import { NotificationCenter } from './NotificationCenter';
import { ProfileSettings } from './ProfileSettings';

export function Sidebar({ onCartOpen }: SidebarProps) {
  const [current, setCurrent] = useState<PageId>(router.current);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useCart();
  const vip = getVIPStatus();
  const saleActive = isFlashSaleActive();

  useEffect(() => {
    const unsub = router.subscribe(() => {
      setCurrent(router.current);
      setMobileOpen(false);
    });
    return unsub;
  }, []);

  function navigate(id: PageId) {
    if (id === 'checkout') { onCartOpen(); return; }
    router.go(id);
  }

  const cartCount = items.length;

  const sidebar = (
    <div className={cn(
      'h-full flex flex-col bg-[#0a0b12] border-r border-white/5 transition-all duration-300 ease-in-out',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className={cn('flex items-center gap-3 px-4 py-6 border-b border-white/5 flex-shrink-0', collapsed && 'justify-center px-0')}>
        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 shadow-lg">
          <Cpu className="w-4 h-4 text-slate-300" />
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white tracking-wide leading-tight uppercase">Elitze</p>
            <p className="text-[9px] text-slate-500 font-mono tracking-widest">AGENCY GRADE v2.4</p>
          </div>
        )}
        {!collapsed && (
          <div className="flex items-center gap-1">
            <NotificationCenter />
            <ProfileSettings />
          </div>
        )}
      </div>

      {/* Sale/VIP Summary */}
      {!collapsed && (saleActive || vip.active) && (
        <div className="px-3 py-3 space-y-2 flex-shrink-0 bg-white/[0.01]">
          {saleActive && (
            <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
              <Zap className="w-3 h-3 text-blue-400" />
              <p className="text-[9px] font-bold text-slate-300">OPENING PROMO ACTIVE</p>
            </div>
          )}
          {vip.active && (
            <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
              <Crown className="w-3 h-3 text-slate-300" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">VIP STATUS ACTIVE</p>
            </div>
          )}
        </div>
      )}

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 min-h-0 scrollbar-hide">
        {NAV_ITEMS.map((item) => {
          const active = current === item.id;
          const showCart = item.id === 'checkout' && cartCount > 0;
          return (
            <div key={item.id}>
              {item.dividerBefore && <div className="my-2 border-t border-white/5" />}
              <button
                onClick={() => navigate(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative group',
                  collapsed && 'justify-center px-0',
                  active
                    ? 'bg-slate-800/50 text-white border border-slate-700/50 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.02] border border-transparent'
                )}
              >
                <item.icon className={cn('w-4 h-4 flex-shrink-0 transition-colors', active ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300')} />
                {!collapsed && <span className="flex-1 text-left truncate tracking-tight">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className={cn('text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0', item.badgeColor)}>
                    {showCart ? cartCount : item.badge}
                  </span>
                )}
                {collapsed && showCart && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-slate-700 text-white text-[8px] font-bold flex items-center justify-center border border-white/10 shadow-lg">
                    {cartCount}
                  </span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 rounded-lg bg-[#0d0d1e] border border-white/10 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-all shadow-2xl translate-x-2 group-hover:translate-x-0">
                    {item.label}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Agents Roster */}
      {!collapsed && (
        <div className="border-t border-white/5 flex-shrink-0 bg-[#080910]">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Roster</p>
              <button onClick={() => router.go('agents')} className="text-[9px] text-blue-400/70 hover:text-blue-300 transition-colors font-mono">
                Catalog →
              </button>
            </div>
            <div className="space-y-0.5 max-h-48 overflow-y-auto pr-0.5 custom-scrollbar">
              {ALL_AGENTS.filter(a => a.availability === 'Available').slice(0, 15).map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => router.go('hire')}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.03] transition-colors text-left group"
                  title={agent.tasks}
                >
                  <div className={cn('w-5 h-5 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-[7px] text-slate-300 font-bold flex-shrink-0 group-hover:border-slate-500 transition-colors')}>
                    {agent.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium text-slate-400 truncate group-hover:text-white transition-colors">{agent.name}</p>
                    <p className="text-[8px] text-slate-600 truncate">{agent.title}</p>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer / Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center p-4 border-t border-white/5 hover:bg-white/[0.02] transition-colors text-slate-500 hover:text-slate-300 flex-shrink-0"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <div className="flex items-center gap-2 text-[10px] font-mono"><ChevronLeft className="w-4 h-4" /> COLLAPSE</div>}
      </button>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex h-screen sticky top-0 flex-shrink-0 z-40">
        {sidebar}
      </aside>
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-[#0a0b12] border border-white/5 flex items-center justify-center text-white shadow-2xl"
      >
        <Menu className="w-5 h-5" />
      </button>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/80 z-40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-64 z-50 flex"
            >
              {sidebar}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
