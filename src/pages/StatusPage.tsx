import { Activity, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

const services = [
  ['Web app', 'Operational', '99.98%'],
  ['Agent catalog', 'Operational', '99.97%'],
  ['Checkout', 'Operational', '99.95%'],
  ['Lindy AI chat', 'Operational', '99.96%'],
  ['Hermes routing', 'Operational', '99.94%'],
];

export function StatusPage() {
  return (
    <div className="min-h-screen bg-[#050608] px-6 lg:px-10 py-10">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-mono text-blue-400 uppercase tracking-[0.25em] mb-3">// Status + SLA</p>
        <h1 className="text-4xl font-bold text-white mb-4">All core systems operational</h1>
        <p className="text-slate-400 max-w-3xl mb-10">Public health, support expectations, incident tracking, and service-level commitments for Zevanto.</p>
        <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-3 mb-8"><CheckCircle2 className="w-5 h-5 text-emerald-400" /><span className="font-bold text-white">No active incidents</span></div>
        <div className="space-y-3 mb-10">
          {services.map(([name, status, uptime]) => <div key={name} className="flex items-center justify-between p-4 rounded-xl border border-white/8 bg-white/[0.02]"><div className="flex items-center gap-3"><Activity className="w-4 h-4 text-blue-400" /><span className="text-white font-medium">{name}</span></div><div className="flex items-center gap-6 text-sm"><span className="text-emerald-400">{status}</span><span className="text-slate-500 font-mono">{uptime}</span></div></div>)}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.02]"><Clock className="w-5 h-5 text-blue-400 mb-4" /><p className="font-bold text-white">Support SLA</p><p className="text-sm text-slate-400 mt-1">VIP Gold: same business day. Standard: 1-2 business days.</p></div>
          <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.02]"><ShieldCheck className="w-5 h-5 text-blue-400 mb-4" /><p className="font-bold text-white">Incident policy</p><p className="text-sm text-slate-400 mt-1">Major incidents are recorded with root cause, impact, and remediation notes.</p></div>
        </div>
      </div>
    </div>
  );
}