import { useState } from 'react';
import { PageType } from '../../App';

interface EmployeesPageProps {
  onNavigate: (page: PageType) => void;
}

const departments = ['All', 'Customer Support', 'Sales', 'Marketing', 'Operations', 'Engineering', 'Finance', 'HR'];

const employees = [
  { id: 'EMP-0001', name: 'Nova Pro', department: 'Customer Support', role: 'Support Agent', rate: 49.99, rating: 4.9, deployed: 234, status: 'available' },
  { id: 'EMP-0002', name: 'Atlas Elite', department: 'Sales', role: 'Sales Rep', rate: 79.99, rating: 4.8, deployed: 156, status: 'available' },
  { id: 'EMP-0003', name: 'Echo Core', department: 'Marketing', role: 'Content Creator', rate: 59.99, rating: 4.7, deployed: 89, status: 'busy' },
  { id: 'EMP-0004', name: 'Orion Plus', department: 'Operations', role: 'Project Manager', rate: 69.99, rating: 4.9, deployed: 201, status: 'available' },
  { id: 'EMP-0005', name: 'Pulse Edge', department: 'Engineering', role: 'Code Reviewer', rate: 89.99, rating: 4.6, deployed: 67, status: 'available' },
  { id: 'EMP-0006', name: 'Vertex Nexus', department: 'Finance', role: 'Financial Analyst', rate: 74.99, rating: 4.8, deployed: 145, status: 'busy' },
  { id: 'EMP-0007', name: 'Cipher Axiom', department: 'HR', role: 'Recruiter', rate: 54.99, rating: 4.7, deployed: 112, status: 'available' },
  { id: 'EMP-0008', name: 'Prism Flow', department: 'Customer Support', role: 'Success Manager', rate: 64.99, rating: 4.9, deployed: 189, status: 'available' },
];

const executiveAI = [
  { name: 'ChatGPT', provider: 'OpenAI', role: 'Strategic Intelligence', status: 'online', color: 'from-emerald-500 to-teal-500' },
  { name: 'Lindy', provider: 'Lindy AI', role: 'Workflow Supervision', status: 'online', color: 'from-violet-500 to-purple-500' },
  { name: 'Hermes', provider: 'Hermes AI', role: 'Autonomous Execution', status: 'online', color: 'from-amber-500 to-orange-500' },
];

export default function EmployeesPage({ onNavigate }: EmployeesPageProps) {
  const [activeDept, setActiveDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter(emp => {
    const matchesDept = activeDept === 'All' || emp.department === activeDept;
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Employees</h1>
            <p className="text-slate-500 mt-1">1,000 deployable employees across 8 departments</p>
          </div>
          <button 
            onClick={() => onNavigate('deploy')}
            className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all"
          >
            Deploy New Employee
          </button>
        </div>
      </header>

      <div className="p-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search & Filter */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search employees by name, role, or capability..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              
              {/* Department Tabs */}
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      activeDept === dept
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Employee Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredEmployees.map((emp) => (
                <div key={emp.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{emp.name}</h3>
                        <p className="text-sm text-slate-500">{emp.role}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      emp.status === 'available' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-amber-50 text-amber-600'
                    }`}>
                      {emp.status === 'available' ? 'Available' : 'Busy'}
                    </span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{emp.department}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400">★</span>
                        <span className="text-slate-600">{emp.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <span className="text-lg font-bold text-slate-900">${emp.rate}</span>
                        <span className="text-slate-500 text-sm">/day</span>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-600">
                        Deploy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Executive AI */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Executive AI Layer</h3>
              <p className="text-xs text-slate-500 mb-4">Intelligence spine • Not for sale</p>
              <div className="space-y-3">
                {executiveAI.map((ai, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${ai.color} flex items-center justify-center`}>
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900">{ai.name}</div>
                      <div className="text-xs text-slate-500">{ai.role}</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-5 text-white">
              <div className="text-sm opacity-80">Total Employees</div>
              <div className="text-4xl font-bold mt-1">1,000</div>
              <div className="text-sm opacity-80 mt-2">across 8 departments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
