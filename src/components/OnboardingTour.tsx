import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Sparkles } from 'lucide-react';

const steps = [
  { title: 'Welcome to Elitze', desc: 'The elite AI staffing agency. Let us show you how to build your digital workforce.' },
  { title: 'Hire Any Role', desc: 'Browse over 1,000 agents. Choose specialized skills for any task.' },
  { title: 'Orchestration Core', desc: 'Meet Lindy AI and Hermes. They handle the management, so you do not have to.' },
];

export function OnboardingTour() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const skip = localStorage.getItem('elitze_skip_tour');
    if (!skip) setOpen(true);
  }, []);

  const close = () => {
    localStorage.setItem('elitze_skip_tour', 'true');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-sm bg-[#0d0d1e] border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-400/20 text-violet-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <button onClick={close} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="mb-8">
            <p className="text-[10px] font-mono text-violet-400 uppercase tracking-widest mb-2">Step {current + 1} of {steps.length}</p>
            <h3 className="text-xl font-bold text-white mb-2">{steps[current].title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{steps[current].desc}</p>
          </div>
          <div className="flex items-center gap-2">
            {current < steps.length - 1 ? (
              <button 
                onClick={() => setCurrent(current + 1)}
                className="flex-1 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-violet-100 transition-all flex items-center justify-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={close}
                className="flex-1 py-3 rounded-xl bg-violet-500 text-white font-bold text-sm hover:bg-violet-400 transition-all"
              >
                Get Started
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
