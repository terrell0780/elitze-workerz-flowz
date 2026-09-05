import { CreditCard, ShieldCheck, FileText, Bitcoin, Landmark, Mail } from 'lucide-react';

export function LegalPage() {
  const sections = [
    {
      icon: FileText,
      title: 'Terms of Use',
      body: 'Zevanto provides AI employee rental and purchase services. By using the platform, you agree to authorized use only, no resale outside approved partner terms, and customer accountability for workflows run on connected tools.',
    },
    {
      icon: ShieldCheck,
      title: 'Privacy & Data Handling',
      body: 'Zevanto stores account data, order records, chat context, and activation logs needed to deliver services. Sensitive workflows should be reviewed before connecting live production systems. Audit visibility is available inside the platform.',
    },
    {
      icon: CreditCard,
      title: 'Payments & Billing',
      body: 'Supported payment methods include Stripe, crypto, and CDN e-transfer. Certain enterprise or partner orders may also use CDN-hosted invoice links or approved payment links. Flash sale pricing is automatically applied when eligible.',
    },
  ];

  const methods = [
    { icon: CreditCard, label: 'Stripe', note: 'Cards and subscription billing' },
    { icon: Bitcoin, label: 'Crypto', note: 'Manual confirmation flow for supported wallets' },
    { icon: Landmark, label: 'E-Transfer', note: 'North America transfer support' },
  ];

  return (
    <div className="min-h-screen bg-[#050608] px-6 lg:px-10 py-10">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-[0.25em] mb-3">// Legal & Payments</p>
        <h1 className="text-4xl font-bold text-white mb-4">Zevanto legal, payments, and platform terms</h1>
        <p className="text-slate-400 max-w-2xl mb-10">
          The essentials for using Zevanto responsibly, connecting payment methods, and understanding how AI employee services are delivered.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {sections.map((section) => (
            <div key={section.title} className="p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
              <section.icon className="w-5 h-5 text-slate-300 mb-4" />
              <h2 className="text-lg font-bold text-white mb-2">{section.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl border border-white/8 bg-white/[0.02] mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Accepted payment methods</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {methods.map((method) => (
              <div key={method.label} className="p-4 rounded-xl border border-white/5 bg-black/20">
                <method.icon className="w-5 h-5 text-slate-300 mb-3" />
                <p className="text-sm font-semibold text-white">{method.label}</p>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{method.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-blue-500/15 bg-blue-500/5">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-semibold mb-1">Contact</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                For billing, compliance, payment confirmations, legal requests, or manual crypto / e-transfer coordination, contact{' '}
                <a href="mailto:terrell0780@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">terrell0780@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
