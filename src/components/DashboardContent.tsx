import { generateEmployees, departments, executiveAIs } from '../data';

const metrics = [
  {
    label: 'Active Deployments',
    value: '24',
    change: '+3',
    changeType: 'positive',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'from-violet-500 to-purple-500'
  },
  {
    label: 'Tasks Completed',
    value: '1,247',
    change: '+89',
    changeType: 'positive',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-emerald-500 to-teal-500'
  },
  {
    label: 'Hours Saved',
    value: '342',
    change: '+28',
    changeType: 'positive',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-amber-500 to-orange-500'
  },
  {
    label: 'Monthly Spend',
    value: '$2,450',
    change: '-12%',
    changeType: 'positive',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-cyan-500 to-blue-500'
  }
];

const recentActivity = [
  { type: 'deployment', message: 'Nova Pro deployed to Customer Support', time: '2 min ago', status: 'success' },
  { type: 'task', message: 'Atlas Elite completed 12 support tickets', time: '15 min ago', status: 'success' },
  { type: 'alert', message: 'Orion Plus responding slowly', time: '32 min ago', status: 'warning' },
  { type: 'deployment', message: 'Echo Core deployed to Sales', time: '1 hour ago', status: 'success' },
  { type: 'task', message: 'Pulse Edge closed 3 deals', time: '2 hours ago', status: 'success' },
];

export default function DashboardContent() {
  const employees = generateEmployees();
  const recentEmployees = employees.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm">Welcome back, John. Your workforce is performing well.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Last 30 days</span>
          <button className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-white/5 text-sm text-slate-300 hover:bg-slate-700 transition-all">
            Change
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="p-5 rounded-xl bg-slate-800/30 border border-white/5 hover:border-white/10 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-lg bg-gradient-to-br ${metric.color}`}>
                <div className="text-white">{metric.icon}</div>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                metric.changeType === 'positive' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-sm text-slate-500">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Employees Table */}
        <div className="lg:col-span-2 rounded-xl bg-slate-800/30 border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-semibold text-white">Active Employees</h3>
            <button className="text-sm text-violet-400 hover:text-violet-300 transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b border-white/5">
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Tasks</th>
                  <th className="px-4 py-3">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${emp.avatar} flex items-center justify-center`}>
                          <span className="text-xs font-bold text-white">{emp.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{emp.name}</div>
                          <div className="text-xs text-slate-500">{emp.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-300">{emp.department}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${
                        emp.status === 'available' ? 'bg-emerald-500/10 text-emerald-400' :
                        emp.status === 'busy' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-violet-500/10 text-violet-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          emp.status === 'available' ? 'bg-emerald-400' :
                          emp.status === 'busy' ? 'bg-amber-400' :
                          'bg-violet-400'
                        }`}></span>
                        {emp.status === 'available' ? 'Active' : emp.status === 'busy' ? 'Busy' : 'Enterprise'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-300">{Math.floor(Math.random() * 50) + 10}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-slate-300">{emp.rating.toFixed(1)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Executive Status */}
          <div className="rounded-xl bg-slate-800/30 border border-white/5 p-4">
            <h3 className="font-semibold text-white mb-4">Executive AI Status</h3>
            <div className="space-y-3">
              {executiveAIs.map((ai) => (
                <div key={ai.id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    ai.id === 'chatgpt' ? 'bg-gradient-to-br from-emerald-500 to-teal-500' :
                    ai.id === 'lindy' ? 'bg-gradient-to-br from-violet-500 to-purple-500' :
                    'bg-gradient-to-br from-amber-500 to-orange-500'
                  }`}>
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white">{ai.name}</div>
                    <div className="text-xs text-slate-500 truncate">{ai.role}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs text-emerald-400">Online</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl bg-slate-800/30 border border-white/5 p-4">
            <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-1 w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-emerald-400' :
                    activity.status === 'warning' ? 'bg-amber-400' :
                    'bg-red-400'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300">{activity.message}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="rounded-xl bg-slate-800/30 border border-white/5 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Department Performance</h3>
          <select className="bg-slate-800/50 border border-white/5 rounded-lg px-3 py-1.5 text-sm text-slate-300 focus:outline-none">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.slice(0, 4).map((dept) => (
            <div key={dept.id} className="p-4 rounded-lg bg-slate-800/50 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{dept.icon}</span>
                <span className="text-sm font-medium text-white">{dept.name}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Efficiency</span>
                  <span className="text-emerald-400">{85 + Math.floor(Math.random() * 15)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-700">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                    style={{ width: `${85 + Math.floor(Math.random() * 15)}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{Math.floor(Math.random() * 20) + 5} active</span>
                  <span>{Math.floor(Math.random() * 200) + 50} tasks</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
