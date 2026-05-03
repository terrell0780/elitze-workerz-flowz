import { useState } from 'react';

const plans = [
  {
    name: 'Starter',
    price: '$299',
    period: '/month',
    description: 'Perfect for small teams getting started',
    features: ['5 AI employees', '1,000 tasks/month', 'Email support', 'Basic analytics'],
    current: false
  },
  {
    name: 'Professional',
    price: '$799',
    period: '/month',
    description: 'For growing businesses with more needs',
    features: ['15 AI employees', '5,000 tasks/month', 'Priority support', 'Advanced analytics', 'API access'],
    current: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Full-scale workforce infrastructure',
    features: ['Unlimited employees', 'Unlimited tasks', 'Dedicated support', 'Custom integrations', 'White-label option', 'SLA guarantees'],
    current: false
  }
];

const paymentMethods = [
  { type: 'card', last4: '4242', brand: 'Visa', expiry: '12/25', default: true },
  { type: 'card', last4: '5555', brand: 'Mastercard', expiry: '08/26', default: false },
];

const recentInvoices = [
  { id: 'INV-2024-001', date: 'Dec 1, 2024', amount: '$799.00', status: 'paid' },
  { id: 'INV-2024-002', date: 'Nov 1, 2024', amount: '$799.00', status: 'paid' },
  { id: 'INV-2024-003', date: 'Oct 1, 2024', amount: '$799.00', status: 'paid' },
  { id: 'INV-2024-004', date: 'Sep 1, 2024', amount: '$799.00', status: 'paid' },
];

export default function BillingPage() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Billing & Plans</h1>
            <p className="text-slate-500 mt-1">Manage your subscription and payment methods</p>
          </div>
        </div>
      </header>

      <div className="p-8 space-y-8">
        {/* Current Plan */}
        <section className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Current Plan</div>
              <div className="text-2xl font-bold mt-1">Professional</div>
              <div className="text-sm opacity-80 mt-2">$799/month • Renews Jan 1, 2025</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">This month's usage</div>
              <div className="text-3xl font-bold mt-1">$2,450</div>
              <div className="text-sm opacity-80 mt-2">24 employees deployed</div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/20 flex items-center gap-4">
            <button 
              onClick={() => setShowUpgradeModal(true)}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-all"
            >
              Upgrade Plan
            </button>
            <button className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-all">
              View Usage Details
            </button>
          </div>
        </section>

        {/* Plans Comparison */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Available Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`bg-white rounded-xl border-2 p-6 ${plan.current ? 'border-blue-500' : 'border-slate-200'}`}
              >
                {plan.current && (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full mb-3">
                    Current Plan
                  </span>
                )}
                <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">{plan.description}</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {!plan.current && (
                  <button className="w-full mt-6 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50 transition-all">
                    {plans.indexOf(plan) === 0 ? 'Downgrade' : 'Contact Sales'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Payment Methods & Invoices */}
        <section className="grid lg:grid-cols-2 gap-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Payment Methods</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">+ Add New</button>
            </div>
            <div className="space-y-3">
              {paymentMethods.map((method, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-slate-200">
                  <div className="w-12 h-8 bg-gradient-to-r from-slate-700 to-slate-900 rounded flex items-center justify-center text-white text-xs font-bold">
                    {method.brand}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">•••• {method.last4}</div>
                    <div className="text-xs text-slate-500">Expires {method.expiry}</div>
                  </div>
                  {method.default && (
                    <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded">Default</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Recent Invoices</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>
            <div className="space-y-2">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{invoice.id}</div>
                    <div className="text-xs text-slate-500">{invoice.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">{invoice.amount}</div>
                    <span className="text-xs text-emerald-600">{invoice.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-900">Upgrade to Enterprise</h3>
            <p className="text-slate-500 mt-2">Get unlimited employees, dedicated support, and custom integrations.</p>
            <div className="mt-4 p-4 rounded-lg bg-slate-50">
              <div className="text-sm text-slate-600">Starting at</div>
              <div className="text-2xl font-bold text-slate-900">$1,999<span className="text-sm font-normal text-slate-500">/month</span></div>
            </div>
            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
