import { useState } from 'react';

export default function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-slate-900/50 backdrop-blur-sm border-b border-white/5 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search employees, departments, deployments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800/50 border border-white/5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <kbd className="px-2 py-0.5 text-xs rounded bg-slate-700 text-slate-400 border border-white/5">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        {/* Quick Deploy */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-medium hover:from-violet-500 hover:to-cyan-500 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Deploy
        </button>

        {/* Credits */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-white/5">
          <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-white font-medium">$2,450</span>
          <span className="text-xs text-slate-500">credits</span>
        </div>
      </div>
    </header>
  );
}
