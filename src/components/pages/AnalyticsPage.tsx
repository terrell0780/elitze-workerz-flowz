const metrics = [
  { label: 'Tasks Completed', value: '12,847', change: '+15%', trend: 'up', period: 'vs last month' },
  { label: 'Avg Response Time', value: '1.2s', change: '-23%', trend: 'down', period: 'improvement' },
  { label: 'Customer Satisfaction', value: '94.2%', change: '+4.2%', trend: 'up', period: 'vs last month' },
  { label: 'Cost per Task', value: '$0.42', change: '-18%', trend: 'down', period: 'efficiency gain' },
];

const departmentPerformance = [
  { name: 'Customer Support', employees: 8, tasks: 4234, efficiency: 94, color: 'from-blue-500 to-cyan-500' },
  { name: 'Sales', employees: 5, tasks: 2847, efficiency: 89, color: 'from-violet-500 to-purple-500' },
  { name: 'Marketing', employees: 4, tasks: 1923, efficiency: 91, color: 'from-amber-500 to-orange-500' },
  { name: 'Operations', employees: 4, tasks: 2156, efficiency: 87, color: 'from-emerald-500 to-teal-500' },
];

const recentTasks = [
  { employee: 'Nova Pro', task: 'Resolved 12 support tickets', time: '2 min ago', status: 'completed' },
  { employee: 'Atlas Elite', task: 'Qualified 8 leads', time: '15 min ago', status: 'completed' },
  { employee: 'Echo Core', task: 'Created blog post draft', time: '32 min ago', status: 'completed' },
  { employee: 'Orion Plus', task: 'Updated project timeline', time: '1 hour ago', status: 'completed' },
  { employee: 'Pulse Edge', task: 'Code review for PR #142', time: '2 hours ago', status: 'in-progress' },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
            <p className="text-slate-500 mt-1">Monitor your AI workforce performance</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all">
              Export Report
            </button>
          </div>
        </div>
      </header>

      <div className="p-8 space-y-8">
        {/* Key Metrics */}
        <section>
          <div className="grid grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="text-sm text-slate-500">{metric.label}</div>
                <div className="flex items-end justify-between mt-2">
                  <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-emerald-600' : 'text-blue-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">{metric.period}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Charts Row */}
        <section className="grid lg:grid-cols-3 gap-6">
          {/* Performance Chart Placeholder */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-900">Performance Overview</h3>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  Tasks
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  Efficiency
                </span>
              </div>
            </div>
            
            {/* Simple Bar Chart */}
            <div className="flex items-end justify-between h-48 gap-2">
              {[65, 78, 82, 71, 89, 94, 88, 76, 92, 85, 79, 96].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-md transition-all hover:from-blue-600 hover:to-cyan-600"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>

          {/* Department Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Department Performance</h3>
            <div className="space-y-4">
              {departmentPerformance.map((dept, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-600">{dept.name}</span>
                    <span className="font-medium text-slate-900">{dept.efficiency}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${dept.color} rounded-full`}
                      style={{ width: `${dept.efficiency}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>{dept.employees} employees</span>
                    <span>{dept.tasks} tasks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Recent Activity</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {recentTasks.map((task, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                  {task.employee.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-900">{task.employee}</div>
                  <div className="text-sm text-slate-500">{task.task}</div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    task.status === 'completed' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-amber-50 text-amber-600'
                  }`}>
                    {task.status === 'completed' ? '✓' : '⏳'} {task.status}
                  </span>
                  <div className="text-xs text-slate-400 mt-1">{task.time}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
