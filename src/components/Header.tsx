import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 blur-lg opacity-50"></div>
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-xl font-bold text-white">AI Workforce Hub</span>
              <div className="text-[10px] text-slate-400 tracking-widest uppercase">Autonomous Workforce Agency</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#employees" className="text-sm text-slate-300 hover:text-white transition-colors">Employees</a>
            <a href="#executive" className="text-sm text-slate-300 hover:text-white transition-colors">Executive AI</a>
            <a href="#departments" className="text-sm text-slate-300 hover:text-white transition-colors">Departments</a>
            <a href="#pricing" className="text-sm text-slate-300 hover:text-white transition-colors">Pricing</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm text-slate-300 hover:text-white transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg hover:from-violet-500 hover:to-cyan-500 transition-all shadow-lg shadow-violet-500/25">
              Deploy Workforce
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-4">
              <a href="#employees" className="text-slate-300 hover:text-white">Employees</a>
              <a href="#executive" className="text-slate-300 hover:text-white">Executive AI</a>
              <a href="#departments" className="text-slate-300 hover:text-white">Departments</a>
              <a href="#pricing" className="text-slate-300 hover:text-white">Pricing</a>
              <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                <button className="text-slate-300 hover:text-white text-left">Sign In</button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg">
                  Deploy Workforce
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
