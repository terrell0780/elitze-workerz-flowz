import { Video, ClipboardCheck, Star, FileText } from 'lucide-react';

const items = [
  ['Async video screening', 'Structured video prompts for communication, judgment, and role-specific scenarios.', Video],
  ['Skill scoring', 'Rubrics for technical, customer, operational, and analytical competencies.', Star],
  ['Interview kits', 'Reusable kits by role: SDR, Support, Dev, QA, EA, Research, and Ops.', ClipboardCheck],
  ['Scorecards', 'Manager-friendly evidence with strengths, risks, and follow-up questions.', FileText],
];

export function AssessmentsPage() {
  return (
    <div className="min-h-screen bg-[#050608] px-6 lg:px-10 py-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-mono text-blue-400 uppercase tracking-[0.25em] mb-3">// Interview + Assessment Layer</p>
        <h1 className="text-4xl font-bold text-white mb-4">Structured evidence before activation</h1>
        <p className="text-slate-400 max-w-3xl mb-10">Zevanto packages each AI employee with role evidence, assessment criteria, interview-style review, and scorecard exports.</p>
        <div className="grid md:grid-cols-2 gap-5">
          {items.map(([title, desc, Icon]) => <div key={title as string} className="p-6 rounded-2xl border border-white/8 bg-white/[0.02]"><Icon className="w-6 h-6 text-blue-400 mb-5" /><h2 className="text-xl font-bold text-white mb-2">{title as string}</h2><p className="text-sm text-slate-400 leading-relaxed">{desc as string}</p></div>)}
        </div>
      </div>
    </div>
  );
}