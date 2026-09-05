import { CheckCircle2, XCircle, History, AlertTriangle } from 'lucide-react';

const controls = [
  ['Manual approval', 'Managers can pause activation, approve high-risk steps, or require human review.', CheckCircle2],
  ['Reject / approve logs', 'Every decision has timestamp, actor, reason, affected agent, and downstream impact.', XCircle],
  ['Escalation history', 'Lindy AI escalations to Hermes and manager overrides remain exportable.', History],
  ['Exception handling', 'Conflicts, failed tasks, missing credentials, and risky outputs require explicit resolution.', AlertTriangle],
];

export function ControlsPage() {
  return (
    <div className="min-h-screen bg-[#050608] px-6 lg:px-10 py-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-mono text-blue-400 uppercase tracking-[0.25em] mb-3">// Manager Override Controls</p>
        <h1 className="text-4xl font-bold text-white mb-4">Humans keep final authority</h1>
        <p className="text-slate-400 max-w-3xl mb-10">Zevanto clarifies where decisions live, where transcripts live, and where overrides are recorded.</p>
        <div className="grid md:grid-cols-2 gap-5">
          {controls.map(([title, desc, Icon]) => <div key={title as string} className="p-6 rounded-2xl border border-white/8 bg-white/[0.02]"><Icon className="w-5 h-5 text-blue-400 mb-5" /><p className="font-bold text-white mb-2">{title as string}</p><p className="text-sm text-slate-400">{desc as string}</p></div>)}
        </div>
      </div>
    </div>
  );
}