import { departments } from '../data';

export default function Departments() {
  return (
    <section id="departments" className="relative py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Workforce Layer — Revenue Engine
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            1,000 AI Employees. 8 Departments.
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            Deployable digital staff trained for real business operations. 
            Rent daily, purchase permanently, or build custom enterprise solutions.
          </p>
        </div>

        {/* Department Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <div 
              key={dept.id}
              className="group relative p-6 rounded-2xl bg-slate-800/30 border border-white/5 hover:border-violet-500/30 transition-all cursor-pointer"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600/0 to-cyan-600/0 group-hover:from-violet-600/10 group-hover:to-cyan-600/10 transition-all"></div>
              
              <div className="relative">
                {/* Icon */}
                <div className="text-4xl mb-4">{dept.icon}</div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {dept.name}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-slate-400 mb-4">
                  {dept.description}
                </p>
                
                {/* Count */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {dept.employeeCount}
                  </span>
                  <span className="text-xs text-slate-500">employees</span>
                </div>

                {/* Arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
            <span>View All 1,000 Employees</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
