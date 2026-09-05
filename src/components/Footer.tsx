import { Cpu, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050508]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.4)]">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white tracking-tight">ELITZE</span>
          </div>
          <p className="text-sm text-slate-500 max-w-xs leading-relaxed mb-5">
            The world's first autonomous AI staffing agency. 1,000 certified agents. Hermes AI orchestrated. Lindy AI supervised.
          </p>
          <a href="mailto:terrell0780@gmail.com" className="inline-flex items-center gap-2 text-xs text-violet-400 hover:text-violet-300 transition-colors mb-2">
            <Mail className="w-3.5 h-3.5" /> terrell0780@gmail.com
          </a>
          <div className="flex items-center gap-2 mt-3 text-xs font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational
          </div>
        </div>

        {[
          { title: 'Hire', items: [
            { label: 'Browse 1,000 Agents', href: '#agents' },
            { label: 'Pricing', href: '#compare' },
            { label: 'Flash Sale', href: '#agents' },
            { label: 'VIP Program', href: '#agents' },
          ]},
          { title: 'Platform', items: [
            { label: 'How It Works', href: '#workflow' },
            { label: 'Ecosystem', href: '#ecosystem' },
            { label: 'Security', href: '#security' },
            { label: 'Leaderboard', href: '#leaderboard' },
          ]},
          { title: 'Company', items: [
            { label: 'Testimonials', href: '#testimonials' },
            { label: 'FAQs', href: '#faq' },
            { label: 'Contact Terrell Hall', href: 'mailto:terrell0780@gmail.com' },
            { label: 'Partner Program', href: '#ecosystem' },
          ]},
        ].map((col) => (
          <div key={col.title}>
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">{col.title}</p>
            <ul className="space-y-3">
              {col.items.map((item) => (
                <li key={item.label}>
                  <a href={item.href}
                    target={item.href.startsWith('mailto') ? undefined : undefined}
                    className="text-sm text-slate-500 hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-mono">
          <p>© 2026 TruElitze Digital · Terrell Hall · All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
            <a href="mailto:terrell0780@gmail.com" className="hover:text-slate-400 transition-colors">Contact</a>
            <span>Elitze v2.4.1 · Production</span>
          </div>
        </div>
        <div className="border-t border-white/[0.03] py-2 text-center">
          <p className="text-[10px] text-slate-700 font-mono">
            ⚡ Powered by Hermes AI · Supervised by Lindy AI · Built by Terrell Hall — TruElitze Digital 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
