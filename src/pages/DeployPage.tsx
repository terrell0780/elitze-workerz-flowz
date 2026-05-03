import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageType } from '../App';
import PageHeader from '../components/PageHeader';
import { pageSEO } from '../data/seo';
import { Check, ChevronLeft, Zap, Sparkles, TrendingUp } from 'lucide-react';

interface Props { onNavigate: (page: PageType) => void; isDark: boolean; }

const recommended = [
  { id: '1', name: 'Nova Pro', role: 'Support Agent', rate: 49.99, match: 98, reason: 'Based on ticket volume' },
  { id: '2', name: 'Atlas Elite', role: 'Sales Rep', rate: 79.99, match: 94, reason: 'Matches Q1 goals' },
  { id: '3', name: 'Echo Core', role: 'Content Creator', rate: 59.99, match: 91, reason: 'Content calendar fit' },
];

const departments = ['Support', 'Sales', 'Marketing', 'Operations', 'Engineering', 'Finance', 'HR'];

export default function DeployPage({ onNavigate, isDark }: Props) {
  const seo = pageSEO.deploy;
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<typeof recommended[0] | null>(null);
  const [dept, setDept] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const card = isDark ? 'bg-[#12121e] border-slate-800/60' : 'bg-white border-slate-200/60 shadow-sm';
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';
  const inputCls = isDark ? 'bg-[#12121e] border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-700';

  const handleDeploy = () => { setSuccess(true); setTimeout(() => onNavigate('analytics'), 2000); };

  if (success) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div className="text-center" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <motion.div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/30" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
          <Check className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className={`text-3xl font-bold ${textP}`}>Deployed!</h2>
        <p className={`${textS} mt-2 text-lg`}>{selected?.name} is now active and working</p>
      </motion.div>
    </div>
  );

  const steps = [{ id: 1, title: 'Select' }, { id: 2, title: 'Configure' }, { id: 3, title: 'Review' }];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <PageHeader title="Deploy Employee" description={seo.description} breadcrumbs={seo.breadcrumbs} isDark={isDark} />

        <div className="flex items-center justify-center gap-4 mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step > s.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : step === s.id ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25' : isDark ? 'bg-slate-800 text-slate-500 border border-slate-700' : 'bg-slate-100 text-slate-400'}`}>
                {step > s.id ? <Check className="w-5 h-5" /> : s.id}
              </div>
              <span className={`ml-2 text-sm font-medium ${step >= s.id ? textP : textS}`}>{s.title}</span>
              {i < steps.length - 1 && <div className={`w-16 h-px mx-4 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center gap-2 mb-4"><Sparkles className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} /><span className={`text-sm font-medium ${textS}`}>AI Recommendations</span></div>
              {recommended.map((emp) => (
                <motion.button key={emp.id} onClick={() => setSelected(emp)} className={`w-full p-5 rounded-xl border-2 text-left transition-all ${selected?.id === emp.id ? isDark ? 'bg-indigo-500/10 border-indigo-500/50' : 'bg-indigo-50 border-indigo-300' : card}`} whileHover={{ scale: 1.01 }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/15">{emp.name.split(' ').map(n => n[0]).join('')}</div>
                      <div><div className={`font-bold ${textP}`}>{emp.name}</div><div className={`text-sm ${textS}`}>{emp.role}</div></div>
                    </div>
                    <div className="text-right"><div className={`text-xl font-bold ${textP}`}>${emp.rate}<span className={`text-sm font-normal ${textS}`}>/day</span></div><div className="flex items-center gap-1 text-xs text-emerald-400 mt-1"><TrendingUp className="w-3 h-3" />{emp.match}% match</div></div>
                  </div>
                  <div className={`mt-3 pt-3 border-t text-xs ${isDark ? 'border-slate-700 text-slate-400' : 'border-slate-100 text-slate-500'}`}>💡 {emp.reason}</div>
                </motion.button>
              ))}
              <div className="pt-4 flex justify-end"><button onClick={() => selected && setStep(2)} disabled={!selected} className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold disabled:opacity-50 shadow-lg shadow-indigo-500/25">Continue</button></div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" className="space-y-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div><label className={`block text-sm font-semibold mb-2 ${textP}`}>Deployment Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Support Team Alpha" className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${inputCls}`} /></div>
              <div><label className={`block text-sm font-semibold mb-2 ${textP}`}>Department</label><div className="grid grid-cols-2 gap-2">{departments.map((d) => (<button key={d} onClick={() => setDept(d)} className={`p-3 rounded-xl text-sm font-medium transition-all ${dept === d ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md' : `${card} ${textS}`}`}>{d}</button>))}</div></div>
              <div className="pt-4 flex justify-between"><button onClick={() => setStep(1)} className={`flex items-center gap-1 ${textS}`}><ChevronLeft className="w-4 h-4" /> Back</button><button onClick={() => name && dept && setStep(3)} disabled={!name || !dept} className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold disabled:opacity-50 shadow-lg shadow-indigo-500/25">Continue</button></div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className={`p-5 rounded-xl border mb-6 ${isDark ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'}`}>
                <div className="grid grid-cols-2 gap-4 text-sm"><div><span className={textS}>Employee:</span> <span className={`font-semibold ${textP}`}>{selected?.name}</span></div><div><span className={textS}>Role:</span> <span className={`font-semibold ${textP}`}>{selected?.role}</span></div><div><span className={textS}>Department:</span> <span className={`font-semibold ${textP}`}>{dept}</span></div><div><span className={textS}>Daily Cost:</span> <span className={`font-semibold ${textP}`}>${selected?.rate}</span></div></div>
              </div>
              <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-100'}`}><div className="flex items-center gap-2 text-emerald-400"><Check className="w-5 h-5" /><span className="font-semibold">Ready to deploy</span></div></div>
              <div className="flex justify-between"><button onClick={() => setStep(2)} className={`flex items-center gap-1 ${textS}`}><ChevronLeft className="w-4 h-4" /> Back</button><motion.button onClick={handleDeploy} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/25" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}><Zap className="w-4 h-4" /> Deploy Now</motion.button></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}