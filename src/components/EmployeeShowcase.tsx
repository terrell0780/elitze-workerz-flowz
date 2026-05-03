import { useState, useMemo } from 'react';
import { generateEmployees, departments } from '../data';
import { AIEmployee } from '../types';

const statusColors = {
  'available': 'bg-green-400',
  'busy': 'bg-amber-400',
  'enterprise-only': 'bg-violet-400'
};

const statusLabels = {
  'available': 'Available',
  'busy': 'Busy',
  'enterprise-only': 'Enterprise'
};

export default function EmployeeShowcase() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  const allEmployees = useMemo(() => generateEmployees(), []);

  const filteredEmployees = useMemo(() => {
    return allEmployees.filter((emp) => {
      const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
      const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           emp.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDepartment && matchesSearch;
    });
  }, [allEmployees, selectedDepartment, searchQuery]);

  const displayedEmployees = filteredEmployees.slice(0, visibleCount);

  return (
    <section id="employees" className="relative py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Deployable AI Workforce
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            Each employee is trained, tested, and ready for deployment. 
            Select your team from our marketplace of 1,000 specialized agents.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>

          {/* Department Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setSelectedDepartment('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedDepartment === 'all'
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
              }`}
            >
              All
            </button>
            {departments.slice(0, 5).map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedDepartment === dept.name
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            Showing {displayedEmployees.length} of {filteredEmployees.length} employees
          </p>
        </div>

        {/* Employee Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filteredEmployees.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              Load More Employees
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function EmployeeCard({ employee }: { employee: AIEmployee }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative rounded-xl bg-slate-800/30 border border-white/5 hover:border-violet-500/30 overflow-hidden transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className={`h-2 bg-gradient-to-r ${employee.avatar}`}></div>
      
      <div className="p-5">
        {/* Top Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[employee.status]}`}></div>
            <span className="text-xs text-slate-500">{statusLabels[employee.status]}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-medium">{employee.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Name & Role */}
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-violet-300 transition-colors">
          {employee.name}
        </h3>
        <p className="text-sm text-slate-500 mb-3">{employee.role}</p>

        {/* Department Badge */}
        <div className="inline-flex px-2 py-1 rounded-md bg-white/5 text-xs text-slate-400 mb-4">
          {employee.department}
        </div>

        {/* Capabilities */}
        <div className="flex flex-wrap gap-1 mb-4">
          {employee.capabilities.slice(0, 3).map((cap, i) => (
            <span key={i} className="px-2 py-0.5 text-[10px] rounded bg-slate-700/50 text-slate-400">
              {cap}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <span>{employee.deployed} deployments</span>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div>
            <div className="text-lg font-bold text-white">${employee.dailyRate.toFixed(2)}</div>
            <div className="text-[10px] text-slate-500">/day rental</div>
          </div>
          <button className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
            isHovered
              ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white'
              : 'bg-white/5 text-slate-400'
          }`}>
            Deploy
          </button>
        </div>
      </div>
    </div>
  );
}
