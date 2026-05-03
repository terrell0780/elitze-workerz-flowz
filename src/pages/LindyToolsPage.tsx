import { motion } from 'framer-motion';
import { Mail, FileText, Calendar, Database, Workflow, MessageSquare, RefreshCw, Sparkles, Wand2, CheckCircle2, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { pageSEO } from '../data/seo';

interface Props {
  isDark: boolean;
}

const tools = [
  { id: 't1', name: 'Email Inbox Agent', desc: 'Draft, send, and autonomously follow up on email threads, supervised by Lindy AI.', icon: Mail, accent: 'indigo', slug: 'gmail-sync' },
  { id: 't2', name: 'Google Workspace', desc: 'Read/write briefs, technical summaries, and SOP documents in real-time.', icon: FileText, accent: 'violet', slug: 'gdocs-sync' },
  { id: 't3', name: 'Calendar Dispatch', desc: 'Book meetings, manage availability across timezones, and resolve conflicts.', icon: Calendar, accent: 'amber', slug: 'cal-sync' },
  { id: 't4', name: 'CRM Core Sync', desc: 'Synchronize leads, interaction notes, and pipeline stages in HubSpot/Salesforce.', icon: Database, accent: 'emerald', slug: 'crm-sync' },
  { id: 't5', name: 'LangGraph Builder', desc: 'Construct stateful node graphs for complex agentic automations and routing.', icon: Workflow, accent: 'cyan', slug: 'node-builder' },
  { id: 't6', name: 'Conversation Store', desc: 'Persistent multi-channel memory to sustain context across customer touchpoints.', icon: MessageSquare, accent: 'rose', slug: 'memory-store' },
];

const recipes = [
  {
    title: 'Autonomous Lead Enrichment Loop',
    desc: 'Lindy intercepts lead intake, coordinates with Hermes to scrape, and triggers a CRM sync.',
    steps: ['Lead Created (CRM)', 'Lindy Drafts Email', 'Hermes Enriches Data', 'Calendar Scheduled'],
    nodes: 4,
    successRate: 98.4
  },
  {
    title: 'Customer Ticket Escalation Loop',
    desc: 'LangGraph stateful workflow resolving customer inquiries by tapping internal documentation.',
    steps: ['Zendesk Ticket', 'Lindy Classifies', 'Hermes Executes Fetch', 'Email Response Drafted'],
    nodes: 5,
    successRate: 97.2
  },
  {
    title: 'Operational Briefing Sync',
    desc: 'Weekly extraction of workspace activities compiled into an editable Google Docs format.',
    steps: ['Trigger Friday 5PM', 'ChatGPT Aggregates', 'Lindy Writes Doc', 'Slack Alert Broadcasted'],
    nodes: 4,
    successRate: 100.0
  },
];

const accentClasses: Record<string, string> = {
  indigo: 'from-indigo-500 to-blue-500 shadow-indigo-500/15',
  violet: 'from-violet-500 to-purple-500 shadow-violet-500/15',
  amber: 'from-amber-500 to-orange-500 shadow-amber-500/15',
  emerald: 'from-emerald-500 to-teal-500 shadow-emerald-500/15',
  cyan: 'from-cyan-500 to-blue-500 shadow-cyan-500/15',
  rose: 'from-rose-500 to-pink-500 shadow-rose-500/15',
};

export default function LindyToolsPage({ isDark }: Props) {
  const seo = pageSEO['lindy-tools'];
  const card = isDark ? 'bg-[#12121e] border-slate-800/60' : 'bg-white border-slate-200/60 shadow-sm';
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';
  const textM = isDark ? 'text-slate-500' : 'text-slate-400';
  const border = isDark ? 'border-slate-800/60' : 'border-slate-100';

  return (
    <div className="min-h-screen p-8">
      <PageHeader
        title="Lindy Tools"
        description={seo.description}
        breadcrumbs={seo.breadcrumbs}
        isDark={isDark}
        action={
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-mono ${
            isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'
          }`}>
            <Wand2 className="w-4 h-4" />
            <span className="text-xs font-bold">Workbench v2.4</span>
          </div>
        }
      />

      <div className="grid grid-cols-[minmax(0,1.6fr)_320px] gap-6 items-start">
        {/* Left Area */}
        <div className="space-y-6">
          
          {/* Tools Grid */}
          <div className="grid grid-cols-3 gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.id}
                className={`rounded-2xl border p-5 group flex flex-col relative overflow-hidden cursor-pointer ${card}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.3)' }}
              >
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${accentClasses[tool.accent]} opacity-[0.03] rounded-bl-full group-hover:opacity-10 transition-opacity`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accentClasses[tool.accent]} flex items-center justify-center shadow-lg text-white mb-4`}>
                  <tool.icon className="w-5 h-5" />
                </div>
                <h3 className={`font-bold text-sm ${textP}`}>{tool.name}</h3>
                <p className={`text-xs leading-5 mt-1.5 flex-1 ${textS}`}>{tool.desc}</p>
                <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mt-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <span>Connect Tool</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Augmented Workflows Recipes */}
          <div className={`rounded-2xl border p-6 ${card}`}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Workflow className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h3 className={`font-bold ${textP}`}>Augmented Agentic Recipes</h3>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 flex items-center gap-1.5`}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Stateful graphs online
              </span>
            </div>

            <div className="space-y-4">
              {recipes.map((recipe, rIdx) => (
                <motion.div 
                  key={recipe.title} 
                  className={`rounded-xl border p-4 group transition-colors ${isDark ? 'bg-slate-800/40 border-slate-800/80 hover:bg-slate-800/60' : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + rIdx * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className={`font-semibold text-sm ${textP}`}>{recipe.title}</h4>
                      <p className={`text-xs mt-0.5 ${textS}`}>{recipe.desc}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-400">{recipe.successRate}% success</div>
                      <div className={`text-[10px] ${textM} mt-0.5`}>{recipe.nodes} nodes</div>
                    </div>
                  </div>
                  
                  {/* Flow Trace */}
                  <div className="flex items-center gap-2 flex-wrap mt-3 bg-white/5 dark:bg-slate-900/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800/40 font-mono">
                    {recipe.steps.map((step, idx) => (
                      <div key={step} className="flex items-center gap-1.5">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700 border border-slate-200'}`}>
                          {step}
                        </span>
                        {idx < recipe.steps.length - 1 && <RefreshCw className={`w-3 h-3 text-indigo-400 animate-spin-slow`} style={{ animationDuration: '6s' }} />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Rail */}
        <div className="space-y-4">
          
          {/* Lindy Status */}
          <div className={`rounded-2xl border p-5 ${card}`}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className={`w-4 h-4 text-indigo-400`} />
              <h3 className={`font-bold ${textP}`}>Lindy AI Orchestrator</h3>
            </div>
            <p className={`text-xs leading-5 ${textS}`}>
              Lindy serves as the frontline cognitive boundary. No execution workers communicate with customers directly. Lindy parses intent, references LangGraph state, and triggers Hermes for worker dispatch.
            </p>
          </div>

          {/* Workflow Stack */}
          <div className={`rounded-2xl border p-5 ${card}`}>
            <div className="flex items-center gap-2 mb-4">
              <Workflow className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <h3 className={`font-bold ${textP}`}>Execution Capabilities</h3>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Email intake', count: '14,242 threads' },
                { label: 'CRM core syncs', count: '89.4K calls' },
                { label: 'Workspace writes', count: '1,231 docs' },
                { label: 'Calendar dispatches', count: '3,121 booked' },
                { label: 'Agentic routings', count: '102,847 graphs' },
              ].map((item) => (
                <div key={item.label} className={`flex items-center justify-between p-3 rounded-xl border border-dashed ${isDark ? 'bg-slate-800/40 border-slate-700/80' : 'bg-slate-50/50 border-slate-200/50'}`}>
                  <span className={`text-xs font-medium ${textP}`}>{item.label}</span>
                  <span className={`text-[10px] font-bold font-mono ${textM}`}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Integrations */}
          <div className={`rounded-2xl border p-5 ${card}`}>
            <div className="flex items-center gap-2 mb-4">
              <Database className={`w-4 h-4 text-emerald-400`} />
              <h3 className={`font-bold ${textP}`}>Tool API Sync</h3>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Google Workspace', status: 'Healthy', ping: '12ms' },
                { name: 'HubSpot API', status: 'Healthy', ping: '18ms' },
                { name: 'Salesforce Connect', status: 'Healthy', ping: '24ms' },
                { name: 'Zendesk Core', status: 'Healthy', ping: '15ms' },
                { name: 'Stripe Gateway', status: 'Healthy', ping: '9ms' },
              ].map((api) => (
                <div key={api.name} className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-slate-800/40' : 'bg-slate-50/50'}`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className={`text-xs font-semibold ${textP}`}>{api.name}</span>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-slate-400">{api.ping}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}