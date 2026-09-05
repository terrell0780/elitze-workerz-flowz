import { BarChart3, TrendingUp, Users, Timer, Activity, HeartHandshake } from 'lucide-react';

const metrics = [
  ['Time-to-hire', '5.7 days', Timer, 'Target: < 7 days'],
  ['Source effectiveness', '42% direct', TrendingUp, 'Top channel: referrals'],
  ['Conversion rate', '18.4%', BarChart3, 'Browse → checkout'],
  ['Agent utilization', '73%', Activity, 'Healthy capacity'],
  ['Satisfaction', '4.8/5', HeartHandshake, 'Post-activation survey'],
  ['Retention', '91%', Users, '30-day retained clients'],
];

export function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#050608] px-6 lg:px-10 py-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-mono text-blue-400 uppercase tracking-[0.25em] mb-3">// Analytics Dashboard</p>
        <h1 className="text-4xl font-bold text-white mb-4">Operational analytics for AI hiring</h1>
        <p className="text-slate-400 max-w-3xl mb-10">Track the metrics buyers expect: time-to-hire, sources, conversion, agent utilization, satisfaction, and retention.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {metrics.map(([label, value, Icon, note]) => (
            <div key={label as string} className="p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
              <Icon className="w-5 h-5 text-blue-400 mb-5" />
              <p className="text-3xl font-bold text-white font-mono">{value as string}</p>
              <p className="text-sm text-slate-300 mt-1">{label as string}</p>
              <p className="text-[11px] text-slate-500 mt-3">{note as string}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
          {['Lead submitted', 'Agent recommended', 'User signed in', 'Checkout started', 'Payment confirmed', 'Lindy onboarding started'].map((event, i) => (
            <div key={event} className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/5 last:border-0 text-sm"><span className="col-span-1 text-slate-600 font-mono">0{i + 1}</span><span className="col-span-7 text-white">{event}</span><span className="col-span-4 text-right text-slate-500">{Math.max(12, 96 - i * 11)}% throughput</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}