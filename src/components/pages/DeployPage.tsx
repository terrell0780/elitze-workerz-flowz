import { useState } from 'react';
import { PageType } from '../../App';

interface DeployPageProps {
  onNavigate: (page: PageType) => void;
}

const deploySteps = [
  { id: 1, title: 'Select Employee', description: 'Choose an AI employee' },
  { id: 2, title: 'Configure', description: 'Set up deployment' },
  { id: 3, title: 'Review', description: 'Confirm details' },
  { id: 4, title: 'Deploy', description: 'Launch employee' },
];

const recommendedEmployees = [
  { id: 'EMP-0001', name: 'Nova Pro', department: 'Customer Support', role: 'Support Agent', rate: 49.99, match: 98, reason: 'Based on your recent support ticket volume' },
  { id: 'EMP-0002', name: 'Atlas Elite', department: 'Sales', role: 'Sales Rep', rate: 79.99, match: 94, reason: 'Matches your Q1 sales goals' },
  { id: 'EMP-0003', name: 'Echo Core', department: 'Marketing', role: 'Content Creator', rate: 59.99, match: 91, reason: 'Aligned with content calendar needs' },
];

const departments = ['Customer Support', 'Sales', 'Marketing', 'Operations', 'Engineering', 'Finance', 'HR', 'Administration'];

export default function DeployPage({ onNavigate }: DeployPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<typeof recommendedEmployees[0] | null>(null);
  const [selectedDept, setSelectedDept] = useState('');
  const [deploymentName, setDeploymentName] = useState('');
  const [deploySuccess, setDeploySuccess] = useState(false);

  const handleDeploy = () => {
    setDeploySuccess(true);
    setTimeout(() => {
      onNavigate('analytics');
    }, 2000);
  };

  if (deploySuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Employee Deployed!</h2>
          <p className="text-slate-500 mt-2">{selectedEmployee?.name} is now active and ready to work.</p>
          <p className="text-sm text-slate-400 mt-4">Redirecting to analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Deploy Employee</h1>
            <p className="text-slate-500 mt-1">Add a new AI employee to your workforce</p>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {deploySteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep > step.id 
                      ? 'bg-emerald-500 text-white' 
                      : currentStep === step.id 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {currentStep > step.id ? '✓' : step.id}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${currentStep >= step.id ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-slate-400">{step.description}</div>
                  </div>
                </div>
                {index < deploySteps.length - 1 && (
                  <div className={`w-20 h-0.5 mx-4 ${currentStep > step.id ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Recommended for You</h3>
              <p className="text-sm text-slate-500 mb-6">Based on your current operations and usage patterns</p>
              
              <div className="space-y-4">
                {recommendedEmployees.map((emp) => (
                  <button
                    key={emp.id}
                    onClick={() => setSelectedEmployee(emp)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedEmployee?.id === emp.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{emp.name}</div>
                          <div className="text-sm text-slate-500">{emp.role} • {emp.department}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900">${emp.rate}<span className="text-sm font-normal text-slate-500">/day</span></div>
                        <div className="text-xs text-emerald-600 font-medium">{emp.match}% match</div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2">
                      💡 {emp.reason}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => selectedEmployee && setCurrentStep(2)}
                  disabled={!selectedEmployee}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Configure Deployment</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Deployment Name</label>
                  <input
                    type="text"
                    value={deploymentName}
                    onChange={(e) => setDeploymentName(e.target.value)}
                    placeholder="e.g., Customer Support Team"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Assign to Department</label>
                  <div className="grid grid-cols-2 gap-3">
                    {departments.map((dept) => (
                      <button
                        key={dept}
                        onClick={() => setSelectedDept(dept)}
                        className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                          selectedDept === dept
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Deploying: <span className="font-semibold text-slate-900">{selectedEmployee?.name}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Daily cost: <span className="font-medium text-slate-700">${selectedEmployee?.rate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => deploymentName && selectedDept && setCurrentStep(3)}
                  disabled={!deploymentName || !selectedDept}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Review & Deploy</h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-500">Employee</div>
                      <div className="font-medium text-slate-900">{selectedEmployee?.name}</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Role</div>
                      <div className="font-medium text-slate-900">{selectedEmployee?.role}</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Department</div>
                      <div className="font-medium text-slate-900">{selectedDept}</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Deployment Name</div>
                      <div className="font-medium text-slate-900">{deploymentName}</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Daily Cost</div>
                      <div className="font-medium text-slate-900">${selectedEmployee?.rate}</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Monthly Estimate</div>
                      <div className="font-medium text-slate-900">${((selectedEmployee?.rate || 0) * 30).toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Ready to deploy</span>
                  </div>
                  <p className="text-sm text-emerald-600 mt-1">Your employee will be active immediately after deployment.</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={handleDeploy}
                  className="px-8 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all"
                >
                  Deploy Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
