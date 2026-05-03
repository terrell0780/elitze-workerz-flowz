import { motion } from 'framer-motion';
import { Check, CreditCard, FileText, Crown } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { pageSEO } from '../data/seo';

interface Props { isDark: boolean; }

export default function BillingPage({ isDark }: Props) {
  const seo = pageSEO.billing;
  const card = isDark ? 'bg-[#12121e] border-slate-800/60' : 'bg-white border-slate-200/60 shadow-sm';
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';

  const plans = [
    { name: 'Starter', price: '$299', period: '/mo', features: ['5 employees', '1K tasks/mo', 'Email support'], current: false },
    { name: 'Professional', price: '$799', period: '/mo', features: ['15 employees', '5K tasks/mo', 'Priority support', 'API access'], current: true },
    { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited', 'Custom tasks', 'Dedicated support', 'SLA'], current: false },
  ];

  const invoices = [
    { id: 'INV-001', date: 'Dec 1', amount: '$799', status: 'paid' },
    { id: 'INV-002', date: 'Nov 1', amount: '$799', status: 'paid' },
    { id: 'INV-003', date: 'Oct 1', amount: '$799', status: 'paid' },
  ];

  return (
    <div className="min-h-screen p-8">
      <PageHeader title="Billing" description={seo.description} breadcrumbs={seo.breadcrumbs} isDark={isDark} />

      <motion.div className={`p-6 rounded-xl border mb-8 ${isDark ? 'bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border-indigo-500/20' : 'bg-gradient-to-br from-indigo-50 to-violet-50 border-indigo-100'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-2"><Crown className="w-5 h-5 text-amber-400" /><span className={`text-sm font-medium ${textS}`}>Current Plan</span></div>
        <div className="flex items-end justify-between"><div><h2 className={`text-xl font-bold ${textP}`}>Professional</h2><p className={textS}>$799/month • Renews Jan 1</p></div><div className="text-right"><div className={`text-sm ${textS}`}>This month</div><div className={`text-3xl font-bold ${textP}`}>$2,450</div></div></div>
      </motion.div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        {plans.map((plan, i) => (
          <motion.div key={plan.name} className={`p-6 rounded-xl border ${plan.current ? isDark ? 'bg-indigo-500/10 border-indigo-500/40' : 'bg-indigo-50 border-indigo-200' : card}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            {plan.current && <span className="text-xs font-bold text-indigo-400 mb-2 block">● Current</span>}
            <h3 className={`font-bold ${textP}`}>{plan.name}</h3>
            <div className="mt-2"><span className={`text-3xl font-bold ${textP}`}>{plan.price}</span><span className={textS}>{plan.period}</span></div>
            <ul className="mt-4 space-y-2">{plan.features.map((f) => (<li key={f} className={`flex items-center gap-2 text-sm ${textS}`}><Check className="w-4 h-4 text-emerald-400" /> {f}</li>))}</ul>
            {!plan.current && <button className={`w-full mt-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${plans.indexOf(plan) === 0 ? isDark ? 'border border-slate-700 text-slate-300 hover:bg-slate-800' : 'border border-slate-200 text-slate-600 hover:bg-slate-50' : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20'}`}>{plans.indexOf(plan) === 0 ? 'Downgrade' : 'Contact Sales'}</button>}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <motion.div className={`p-5 rounded-xl border ${card}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <h3 className={`font-bold mb-4 ${textP}`}>Payment Method</h3>
          <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-slate-800/80' : 'bg-slate-50'}`}>
            <CreditCard className={`w-5 h-5 ${textS}`} />
            <div className="flex-1"><div className={`text-sm font-semibold ${textP}`}>•••• 4242</div><div className={`text-xs ${textS}`}>Expires 12/25</div></div>
            <span className="text-xs text-indigo-400 font-semibold">Default</span>
          </div>
        </motion.div>
        <motion.div className={`p-5 rounded-xl border ${card}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <h3 className={`font-bold mb-4 ${textP}`}>Recent Invoices</h3>
          <div className="space-y-2">{invoices.map((inv) => (<div key={inv.id} className="flex items-center justify-between py-2"><div className="flex items-center gap-2"><FileText className={`w-4 h-4 ${textS}`} /><span className={`text-sm ${textS}`}>{inv.id} • {inv.date}</span></div><span className={`text-sm font-semibold ${textP}`}>{inv.amount}</span></div>))}</div>
        </motion.div>
      </div>
    </div>
  );
}