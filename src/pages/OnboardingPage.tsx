import { FileCheck2, PenTool, Bell, FolderCheck, UserCheck } from 'lucide-react';

const steps = [
  ['Digital forms', 'Role intake, company context, success criteria, billing contact, and stakeholder map.', FileCheck2],
  ['Document collection', 'SOPs, brand docs, product docs, credentials, and integration requirements.', FolderCheck],
  ['Credential reminders', 'Automated reminders for missing access, expiring approvals, and required files.', Bell],
  ['E-signatures', 'Terms, DPA, service order, enterprise addendum, and approval acknowledgement.', PenTool],
  ['Activation handoff', 'Lindy AI confirms deployment, onboarding checklist, and first task milestone.', UserCheck],
];

export function OnboardingPage() {
  return (
    <div className="min-h-screen bg-[#050608] px-6 lg:px-10 py-10">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-mono text-blue-400 uppercase tracking-[0.25em] mb-3">// Onboarding Workflow</p>
        <h1 className="text-4xl font-bold text-white mb-4">From purchase to first value</h1>
        <p className="text-slate-400 max-w-3xl mb-10">A structured onboarding layer that handles documents, credentials, e-signatures, reminders, and activation milestones.</p>
        <div className="space-y-4">
          {steps.map(([title, desc, Icon], i) => <div key={title as string} className="flex gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.02]"><div className="w-10 h-10 rounded-xl border border-white/10 bg-black/20 flex items-center justify-center text-slate-400 font-mono">{i + 1}</div><Icon className="w-5 h-5 text-blue-400 mt-2" /><div><h2 className="font-bold text-white">{title as string}</h2><p className="text-sm text-slate-400 mt-1">{desc as string}</p></div></div>)}
        </div>
      </div>
    </div>
  );
}