import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Filter, Users } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { pageSEO } from '../data/seo';
import { generateEmployees } from '../data';
import type { AIEmployee } from '../types';

interface Props { isDark: boolean; }

const departments = ['All', 'Support', 'Sales', 'Marketing', 'Operations', 'Engineering', 'Finance', 'HR'];

export default function EmployeesPage({ isDark }: Props) {
  const seo = pageSEO.employees;
  const [activeDept, setActiveDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);
  const [hoveredEmployee, setHoveredEmployee] = useState<AIEmployee | null>(null);

  const employees = useMemo(() => generateEmployees(), []);

  const card = isDark ? 'bg-[#12121e] border-slate-800/60' : 'bg-white border-slate-200/60 shadow-sm';
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';
  const inputCls = isDark ? 'bg-[#12121e] border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-700';

  const filtered = employees.filter(emp => {
    const matchesDept = activeDept === 'All' || emp.department === activeDept;
    return matchesDept && emp.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const visibleEmployees = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen p-8">
      <PageHeader title="AI Employees" description={seo.description} breadcrumbs={seo.breadcrumbs} isDark={isDark}
        action={<div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isDark ? 'bg-indigo-500/15 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}><Users className="w-4 h-4" /><span className="text-sm font-medium">1,000 Active</span></div>}
      />

      <div className={`p-5 rounded-xl border ${card} mb-6`}>
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search employees..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${inputCls}`} />
          </div>
          <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium ${isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}><Filter className="w-4 h-4" /> Filters</button>
        </div>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {departments.map((dept) => (
            <button key={dept} onClick={() => setActiveDept(dept)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${activeDept === dept ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20' : isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{dept}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <AnimatePresence>
          {visibleEmployees.map((emp, i) => (
            <motion.div
              key={emp.id}
              className={`relative p-5 rounded-xl border ${card} hover:border-indigo-500/30 transition-all cursor-pointer group overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => setHoveredEmployee(emp)}
              onMouseLeave={() => setHoveredEmployee(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/15">{emp.name.split(' ').map(n => n[0]).join('')}</div>
                  <div><h3 className={`font-semibold ${textP}`}>{emp.name}</h3><p className={`text-xs ${textS}`}>{emp.role}</p></div>
                </div>
                <span className={`w-2.5 h-2.5 rounded-full ${emp.status === 'available' ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-amber-400'}`} />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>{emp.department}</span>
                <div className="flex items-center gap-1 text-xs text-slate-500"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {emp.rating}</div>
              </div>
              <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-100'}`}>
                <div><span className={`text-lg font-bold ${textP}`}>${emp.dailyRate.toFixed(2)}</span><span className={`text-sm ${textS}`}>/day</span></div>
                <motion.button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-indigo-500/20" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Deploy</motion.button>
              </div>

              <div className={`pointer-events-none absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-4 ${isDark ? 'bg-[#0f1020]/95' : 'bg-white/95'} backdrop-blur-md border-t ${isDark ? 'border-slate-800/60' : 'border-slate-100'}`}>
                <div className="text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-2">Capabilities</div>
                <p className={`text-xs leading-5 ${textS}`}>{emp.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {emp.capabilities.slice(0, 3).map((cap) => (
                    <span key={cap} className={`px-2 py-1 rounded-full text-[10px] font-medium ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button onClick={() => setVisibleCount((c) => c + 12)} className={`px-5 py-3 rounded-xl font-semibold ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}>
            Load more employees
          </button>
        </div>
      )}

      {hoveredEmployee && (
        <div className="fixed bottom-6 right-6 max-w-sm z-50">
          <div className={`rounded-2xl p-4 border shadow-2xl ${isDark ? 'bg-[#12121e] border-slate-800/80' : 'bg-white border-slate-200'}`}>
            <div className="text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-2">Hover Preview</div>
            <div className={`font-bold ${textP}`}>{hoveredEmployee.name}</div>
            <div className={`text-sm ${textS}`}>{hoveredEmployee.role} • {hoveredEmployee.department}</div>
            <p className={`mt-3 text-sm leading-6 ${textS}`}>{hoveredEmployee.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {hoveredEmployee.capabilities.slice(0, 3).map((cap) => (
                <span key={cap} className={`px-2 py-1 rounded-full text-[10px] font-medium ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>{cap}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}