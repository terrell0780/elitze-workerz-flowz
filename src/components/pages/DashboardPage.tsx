import { PageType } from '../../App';

interface DashboardPageProps {
  onNavigate: (page: PageType) => void;
}

const flowSteps = [
  { step: 1, title: 'Discover', description: 'Browse 1,000 AI employees', icon: '🔍', status: 'complete' },
  { step: 2, title: 'Select', description: 'Choose your workforce', icon: '✓', status: 'complete' },
  { step: 3, title: 'Deploy', description: 'Deploy to operations', icon: '🚀', status: 'current' },
  { step: 4, title: 'Monitor', description: 'Track performance', icon: '📊', status: 'upcoming' },
  { step: 5, title: 'Scale', description: 'Expand your team', icon: '📈', status: 'upcoming' },
];

const quickActions = [
  { label: 'Deploy New Employee', description: 'Add an AI employee to your team', icon: '➕', page: 'deploy' as PageType, color: 'from-blue-500 to-cyan-500' },
  { label: 'View Analytics', description: 'Check workforce performance', icon: '📊', page: 'analytics' as PageType, color: 'from-violet-500 to-purple-500' },
  { label: 'Manage Billing', description: 'Update payment methods', icon: '💳', page: 'billing' as PageType, color: 'from-amber-500 to-orange-500' },
];

const activeEmployees = [
  { name: 'Nova Pro', department: 'Support', tasks: 47, rating: 4.9, status: 'active' },
  { name: 'Atlas Elite', department: 'Sales', tasks: 23, rating: 4.8, status: 'active' },
  { name: 'Echo Core', department: 'Marketing', tasks: 31, rating: 4.7, status: 'active' },
];

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back, John</h1>
            <p className="text-slate-500 mt-1">Your AI workforce is ready. What would you like to do today?</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              View Reports
            </button>
            <button 
              onClick={() => onNavigate('deploy')}
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
            >
              Deploy Employee
            </button>
          </div>
        </div>
      </header>

      <div className="p-8 space-y-8">
        {/* Behavioral Flow Engine */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Your Journey</h2>
              <p className="text-sm text-slate-500">Follow the path to build your AI workforce</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              Step 3 of 5
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            {flowSteps.map((step, index) => (
              <div key={step.step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all ${
                    step.status === 'complete' 
                      ? 'bg-emerald-500 text-white' 
                      : step.status === 'current'
                      ? 'bg-blue-500 text-white ring-4 ring-blue-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step.status === 'complete' ? '✓' : step.icon}
                  </div>
                  <div className="mt-3 text-center">
                    <div className={`text-sm font-medium ${step.status === 'current' ? 'text-slate-900' : 'text-slate-500'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{step.description}</div>
                  </div>
                </div>
                {index < flowSteps.length - 1 && (
                  <div className={`w-20 h-0.5 mx-2 rounded-full ${
                    step.status === 'complete' ? 'bg-emerald-500' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => onNavigate(action.page)}
                className="group p-5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all text-left"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h3 className="font-semibold text-slate-900">{action.label}</h3>
                <p className="text-sm text-slate-500 mt-1">{action.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-4 gap-4">
          {[
            { label: 'Active Employees', value: '24', change: '+3', color: 'text-blue-600' },
            { label: 'Tasks Today', value: '156', change: '+12%', color: 'text-emerald-600' },
            { label: 'Hours Saved', value: '42h', change: '+8h', color: 'text-violet-600' },
            { label: 'Monthly Spend', value: '$2,450', change: '-5%', color: 'text-amber-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="text-sm text-slate-500">{stat.label}</div>
              <div className="flex items-end justify-between mt-2">
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Active Employees */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Active Employees</h2>
            <button 
              onClick={() => onNavigate('employees')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </button>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Employee</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Tasks</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Rating</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {activeEmployees.map((emp, i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-slate-900">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{emp.department}</td>
                    <td className="px-5 py-4 text-slate-600">{emp.tasks}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400">★</span>
                        <span className="text-slate-600">{emp.rating}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
