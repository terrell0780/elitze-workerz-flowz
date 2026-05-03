import { executiveAIs } from '../data';

const iconMap = {
  brain: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  workflow: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  execute: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
};

const gradients = [
  'from-emerald-500 to-teal-500',
  'from-violet-500 to-purple-500',
  'from-amber-500 to-orange-500'
];

export default function ExecutiveLayer() {
  return (
    <section id="executive" className="relative py-24 bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Executive Intelligence Layer — Not For Sale
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            The Intelligence Behind Your Workforce
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            Three executive AI consultants that supervise, strategize, and execute. 
            They don't work for you—they work with you.
          </p>
        </div>

        {/* Executive Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {executiveAIs.map((ai, index) => (
            <div 
              key={ai.id}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${gradients[index]} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity`}></div>
              
              <div className="relative h-full p-8 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm hover:border-white/10 transition-all">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${gradients[index]} mb-6`}>
                  <div className="text-white">{iconMap[ai.icon]}</div>
                </div>

                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{ai.name}</h3>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-slate-400">{ai.provider}</span>
                  </div>
                  <p className="text-sm text-slate-500">{ai.role}</p>
                </div>

                {/* Description */}
                <p className="text-slate-400 mb-6">
                  {ai.description}
                </p>

                {/* Capabilities */}
                <div className="space-y-2">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Core Capabilities</div>
                  <div className="flex flex-wrap gap-2">
                    {ai.capabilities.map((cap, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-white/5 text-slate-300 border border-white/5"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm">
            These three form the <span className="text-white font-medium">intelligence spine</span> of the Autonomous Business Operating System.
            <br />
            They supervise your deployed workforce. They are not rented. They are not sold.
          </p>
        </div>
      </div>
    </section>
  );
}
