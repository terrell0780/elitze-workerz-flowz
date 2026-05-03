export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-white">AI Workforce Hub</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm mb-4">
              Autonomous Business Operating System delivered through Digital Workforce Infrastructure.
            </p>
            <div className="text-xs text-slate-600">
              Powered by ChatGPT • Lindy • Hermes
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-3">
              {['Browse Employees', 'Executive Layer', 'Departments', 'Pricing', 'Enterprise'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Careers', 'Press', 'Partners', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              {['Documentation', 'API Reference', 'Integrations', 'Status', 'Support'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            © 2024 AI Workforce Hub. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">Terms</a>
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">Security</a>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 text-sm">
            Hire AI employees. Not software.
          </p>
        </div>
      </div>
    </footer>
  );
}
