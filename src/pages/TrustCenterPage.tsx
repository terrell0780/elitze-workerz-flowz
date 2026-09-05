import { ShieldCheck, FileText, LockKeyhole, Database, Clock, Download } from 'lucide-react';

const controls = [
  ['SOC 2 roadmap', 'Controls mapped; audit preparation in progress; evidence register maintained.'],
  ['GDPR privacy language', 'Data subject access, deletion, processor/subprocessor language, and retention statements documented.'],
  ['AI transparency', 'Buyer-facing disclosure on AI use, human review, appeal paths, and auditability.'],
  ['Audit retention', 'Decision logs, approvals, overrides, and task history retained for enterprise review.'],
  ['Security posture', 'Access controls, encrypted transport, auth-gated checkout, and admin PIN governance.'],
  ['Vendor oversight', 'ATS, CRM, payment, and automation vendors tracked as subprocessors.'],
];

export function TrustCenterPage() {
  return (
    <div className="min-h-screen bg-[#050608] px-6 lg:px-10 py-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-mono text-blue-400 uppercase tracking-[0.25em] mb-3">// Trust Center</p>
        <h1 className="text-4xl font-bold text-white mb-4">Enterprise trust, compliance, and audit readiness</h1>
        <p className="text-slate-400 max-w-3xl mb-10">Zevanto documents the security and compliance posture buyers expect before approving AI employee workflows. This page centralizes the trust signals needed for enterprise review.</p>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            { icon: ShieldCheck, title: 'Security posture', value: 'Published' },
            { icon: FileText, title: 'DPA / privacy docs', value: 'Available on request' },
            { icon: Clock, title: 'Evidence retention', value: '4 years target' },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
              <item.icon className="w-5 h-5 text-blue-400 mb-4" />
              <p className="font-bold text-white">{item.title}</p>
              <p className="text-sm text-slate-400 mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mb-10">
          {controls.map(([title, desc]) => (
            <div key={title} className="p-5 rounded-2xl border border-white/8 bg-white/[0.02] flex gap-4">
              <LockKeyhole className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
              <div><p className="font-semibold text-white">{title}</p><p className="text-sm text-slate-400 mt-1 leading-relaxed">{desc}</p></div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex gap-3"><Database className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" /><div><p className="font-bold text-white">Security packet</p><p className="text-sm text-slate-400">DPA, subprocessor list, AI disclosure, data retention, and questionnaire responses.</p></div></div>
          <a href="mailto:terrell0780@gmail.com?subject=Zevanto Security Packet Request" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-slate-200 transition-colors"><Download className="w-4 h-4" /> Request packet</a>
        </div>
      </div>
    </div>
  );
}