import { stats } from '../data';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-sm text-slate-300">Autonomous Business Operating System</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-white">Hire </span>
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">AI Employees.</span>
          </h1>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-400 mb-8">
            Not Software.
          </h2>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-400 mb-12">
            Build a real digital workforce powered by autonomous execution, strategic intelligence, 
            and operational supervision. Deploy trained AI staff for any business operation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="group relative px-8 py-4 text-lg font-semibold text-white rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 transition-transform group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <span className="relative flex items-center gap-2">
                Browse 1,000 Employees
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button className="px-8 py-4 text-lg font-semibold text-slate-300 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all">
              Schedule Executive Consultation
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Employee Cards Preview */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
      </div>
    </section>
  );
}
