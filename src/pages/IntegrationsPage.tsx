import { CheckCircle2, RefreshCcw, ShieldCheck } from 'lucide-react';

const ats = ['Greenhouse', 'Lever', 'Workable', 'Ashby', 'Bullhorn'];
const crm = ['Salesforce', 'HubSpot', 'GoHighLevel', 'Pipedrive', 'Zoho CRM'];
const syncRules = [
  ['System of record', 'ATS/CRM remains the owner of candidate, client, and requisition records.'],
  ['Decision sync', 'Scores, shortlist status, approvals, rejections, and overrides are written back as structured events.'],
  ['Transcript location', 'Chat and interview transcripts stay attached to the Zevanto audit object with exportable references.'],
  ['Override logs', 'Manual approvals, rejects, escalation notes, and manager decisions are timestamped and retained.'],
];

export function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-[#050608] px-6 lg:px-10 py-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-mono text-blue-400 uppercase tracking-[0.25em] mb-3">// ATS + CRM Integrations</p>
        <h1 className="text-4xl font-bold text-white mb-4">System-of-record sync for modern recruiting stacks</h1>
        <p className="text-slate-400 max-w-3xl mb-10">Zevanto keeps client, candidate, agent, and decision records aligned with the systems companies already trust.</p>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[['ATS systems', ats], ['CRM systems', crm]].map(([title, list]) => (
            <div key={title as string} className="p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
              <p className="font-bold text-white mb-4">{title as string}</p>
              <div className="grid grid-cols-2 gap-3">
                {(list as string[]).map((name) => <div key={name} className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" />{name}</div>)}
              </div>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          {syncRules.map(([title, desc]) => (
            <div key={title} className="p-5 rounded-2xl border border-white/8 bg-white/[0.02] flex gap-4"><RefreshCcw className="w-5 h-5 text-blue-400 flex-shrink-0" /><div><p className="font-semibold text-white">{title}</p><p className="text-sm text-slate-400 mt-1">{desc}</p></div></div>
          ))}
        </div>
        <div className="mt-8 p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 flex gap-3"><ShieldCheck className="w-5 h-5 text-blue-400" /><p className="text-sm text-slate-300">API wiring requires backend credentials. The frontend is ready for secure token-based integration once `VITE_API_BASE` is connected.</p></div>
      </div>
    </div>
  );
}