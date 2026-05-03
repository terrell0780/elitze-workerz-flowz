import { pricingTiers } from '../data';

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Revenue Model
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Build Your Workforce. Your Way.
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            From daily rentals to permanent ownership to enterprise infrastructure. 
            Choose the model that fits your operations.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative group ${
                tier.highlighted ? 'md:-mt-4 md:mb-4' : ''
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -inset-px bg-gradient-to-r from-violet-500 to-cyan-500 rounded-2xl"></div>
              )}
              <div
                className={`relative h-full p-8 rounded-2xl ${
                  tier.highlighted
                    ? 'bg-slate-900'
                    : 'bg-slate-900/50 border border-white/5'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="px-4 py-1 text-xs font-medium bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-sm text-slate-400">{tier.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-slate-500 text-sm ml-2">{tier.priceDetail}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-medium transition-all ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Revenue Streams */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Additional Revenue Streams</h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Executive Consultation',
                description: 'Workflow architecture, deployment strategy, private systems',
                icon: '🎯',
                price: 'High-Ticket'
              },
              {
                title: 'White Label Licensing',
                description: 'Deploy our infrastructure under your brand',
                icon: '🏷️',
                price: 'Enterprise'
              },
              {
                title: 'Custom Integration',
                description: 'Connect to your existing tools and workflows',
                icon: '🔗',
                price: 'Project-Based'
              },
              {
                title: 'Training & Fine-tuning',
                description: 'Customize employees for your specific operations',
                icon: '🎓',
                price: 'Premium'
              }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-all">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400 mb-3">{item.description}</p>
                <span className="text-xs px-2 py-1 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-violet-900/20 to-cyan-900/20 border border-white/5">
          <h3 className="text-xl font-bold text-white mb-2">Enterprise Contracts & Private Infrastructure</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Large retainers, private infrastructure, long-term contracts. 
            This is where real scale happens.
          </p>
          <button className="px-8 py-3 rounded-xl bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors">
            Contact Enterprise Sales
          </button>
        </div>
      </div>
    </section>
  );
}
