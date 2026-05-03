export default function Architecture() {
  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Platform Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Autonomous Business Operating System
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            The infrastructure that powers your digital workforce. 
            Not just AI tools—deployable operational infrastructure.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="relative max-w-4xl mx-auto">
          {/* Parent Company */}
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-3 rounded-xl bg-slate-800/50 border border-white/10">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Parent Company</div>
              <div className="text-lg font-bold text-white">Digital Workforce Infrastructure</div>
            </div>
          </div>

          {/* Connection Line */}
          <div className="flex justify-center mb-4">
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"></div>
          </div>

          {/* Platform Layer */}
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-4 rounded-xl bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-500/30">
              <div className="text-xs text-violet-400 uppercase tracking-wider mb-1">Platform</div>
              <div className="text-2xl font-bold text-white">AI Workforce Hub</div>
            </div>
          </div>

          {/* Connection Lines */}
          <div className="flex justify-center gap-32 mb-4">
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"></div>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"></div>
          </div>

          {/* Dual System */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Executive Layer */}
            <div className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="text-xs text-amber-400 uppercase tracking-wider mb-4">Executive Layer — Intelligence Spine</div>
              <div className="space-y-3">
                {[
                  { name: 'ChatGPT', role: 'Strategic Intelligence', color: 'from-emerald-500 to-teal-500' },
                  { name: 'Lindy', role: 'Workflow Supervision', color: 'from-violet-500 to-purple-500' },
                  { name: 'Hermes', role: 'Autonomous Execution', color: 'from-amber-500 to-orange-500' }
                ].map((ai, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${ai.color} flex items-center justify-center`}>
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white">{ai.name}</div>
                      <div className="text-xs text-slate-500">{ai.role}</div>
                    </div>
                    <div className="ml-auto px-2 py-1 text-[10px] rounded bg-amber-500/10 text-amber-400">Not For Sale</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workforce Layer */}
            <div className="p-6 rounded-xl bg-violet-500/5 border border-violet-500/20">
              <div className="text-xs text-violet-400 uppercase tracking-wider mb-4">Workforce Layer — Revenue Engine</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🎧', name: 'Support', count: 97 },
                  { icon: '📈', name: 'Sales', count: 97 },
                  { icon: '⚙️', name: 'Operations', count: 97 },
                  { icon: '📋', name: 'Admin', count: 97 },
                  { icon: '🚀', name: 'Marketing', count: 97 },
                  { icon: '💰', name: 'Finance', count: 97 },
                  { icon: '👥', name: 'HR', count: 97 },
                  { icon: '💻', name: 'Engineering', count: 98 }
                ].map((dept, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50">
                    <span className="text-lg">{dept.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm text-white">{dept.name}</div>
                    </div>
                    <div className="text-xs text-slate-500">{dept.count}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-violet-600/10 to-cyan-600/10 border border-violet-500/20 text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">1,000</div>
                <div className="text-xs text-slate-500">Deployable AI Employees</div>
              </div>
            </div>
          </div>

          {/* Moat Section */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-white/5 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Your Moat</h3>
            <p className="text-slate-400 mb-4">Not "better prompts." Not "better AI tools."</p>
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Deployable Operational Infrastructure
            </div>
            <p className="text-slate-500 mt-2">That is hard to replace. That wins.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
