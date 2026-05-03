import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Send, ChevronDown, Sparkles, Wand2, Search, FileText, Mail, 
  Database, Calendar, MessageSquare, Brain, Workflow, Plus, Trash2,
  CheckCircle2, GitBranch, ArrowRight, CornerDownRight, Shield
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { pageSEO } from '../data/seo';

interface Props { isDark: boolean; }

type ModelName = 'Hermes' | 'Lindy' | 'ChatGPT 5.5';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
}

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  model?: ModelName;
  timestamp: string;
  toolExecution?: {
    name: string;
    status: 'running' | 'success' | 'failed';
    trace: string[];
  };
}

interface ChatThread {
  id: string;
  title: string;
  timestamp: string;
  messages: ChatMessage[];
  selectedModel: ModelName;
  selectedTool: string;
}

const modelMeta: Record<ModelName, { label: string; subtitle: string; color: string; icon: any }> = {
  Hermes: { label: 'Hermes', subtitle: 'Execution + Autonomous tools', color: 'from-amber-500 to-orange-500', icon: Bot },
  Lindy: { label: 'Lindy', subtitle: 'Frontline Agent + Workspace operations', color: 'from-indigo-500 to-violet-500', icon: MessageSquare },
  'ChatGPT 5.5': { label: 'ChatGPT 5.5', subtitle: 'Strategy + Complex reasoning', color: 'from-cyan-500 to-blue-500', icon: Brain },
};

const availableTools: Tool[] = [
  { id: 'auto', name: 'Auto Route', description: 'LangGraph autonomous routing', icon: Wand2, category: 'System' },
  { id: 'search', name: 'Web Search', description: 'Real-time search & data scraping', icon: Search, category: 'Research' },
  { id: 'draft-email', name: 'Draft Email', description: 'Write or respond to email threads', icon: Mail, category: 'Workspace' },
  { id: 'google-docs', name: 'Google Docs', description: 'Generate briefs, SOPs, and reports', icon: FileText, category: 'Workspace' },
  { id: 'workflow', name: 'Create Workflow', description: 'Build an agentic automation script', icon: Workflow, category: 'Automation' },
  { id: 'crm', name: 'CRM Sync', description: 'Update pipeline leads & activities', icon: Database, category: 'Systems' },
  { id: 'calendar', name: 'Schedule Follow-up', description: 'Manage calendar & book meetings', icon: Calendar, category: 'Workspace' },
];

const initialThreads: ChatThread[] = [
  {
    id: '1',
    title: 'Customer Onboarding Setup',
    timestamp: '2 hours ago',
    selectedModel: 'Lindy',
    selectedTool: 'auto',
    messages: [
      { id: 'm1', role: 'user', content: 'Set up a new customer onboarding workflow for Client XYZ.', timestamp: '10:15 AM' },
      { id: 'm2', role: 'assistant', model: 'Lindy', content: "Understood. I will leverage our GoHighLevel CRM layer to initialize the client record, draft a welcoming brief in Google Docs, and schedule their kick-off meeting via Google Calendar. \n\nHermes will then take over to monitor the data setup pipelines. Should I begin?", timestamp: '10:15 AM',
        toolExecution: {
          name: 'Auto Route',
          status: 'success',
          trace: ['Input Received', 'Lindy (Orchestrator) called', 'CRM Node triggered', 'Docs Node triggered', 'Success']
        }
      }
    ]
  },
  {
    id: '2',
    title: 'Lead Enrichment Campaign',
    timestamp: 'Yesterday',
    selectedModel: 'Hermes',
    selectedTool: 'search',
    messages: [
      { id: 'm3', role: 'user', content: 'Scrape and enrich the top 50 leads from the local finance sector.', timestamp: 'Yesterday' },
      { id: 'm4', role: 'assistant', model: 'Hermes', content: 'Executing scraping task. I am deploying Tier 1 employees to collect firmographic data, which will be cross-referenced with LinkedIn. I will feed the results directly into our HubSpot pipeline and alert the Sales SDR agent.', timestamp: 'Yesterday',
        toolExecution: {
          name: 'Web Search',
          status: 'success',
          trace: ['Task decomposed', 'Hermes (Execution Agent) running', 'Tier 1 workers dispatched', 'HubSpot API called', 'Complete']
        }
      }
    ]
  }
];

export default function ChatSystemPage({ isDark }: Props) {
  const seo = pageSEO.chat;
  const [threads, setThreads] = useState<ChatThread[]>(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>('1');
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showTrace, setShowTrace] = useState<string | null>(null);
  const [currentExecution, setCurrentExecution] = useState<{name: string, status: string, trace: string[]} | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages, isStreaming]);

  const card = isDark ? 'bg-[#12121e] border-slate-800/60' : 'bg-white border-slate-200/60 shadow-sm';
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';
  const textM = isDark ? 'text-slate-500' : 'text-slate-400';
  const border = isDark ? 'border-slate-800/60' : 'border-slate-100';
  const inputCls = isDark ? 'bg-[#0f1020] border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-700';

  const handleModelChange = (model: ModelName) => {
    setThreads(prev => prev.map(t => t.id === activeThreadId ? { ...t, selectedModel: model } : t));
  };

  const handleToolChange = (toolId: string) => {
    setThreads(prev => prev.map(t => t.id === activeThreadId ? { ...t, selectedTool: toolId } : t));
  };

  const createNewThread = () => {
    const newThread: ChatThread = {
      id: Date.now().toString(),
      title: 'New Conversation',
      timestamp: 'Just now',
      selectedModel: 'Hermes',
      selectedTool: 'auto',
      messages: [
        {
          id: Date.now().toString() + '-init',
          role: 'assistant',
          model: 'Hermes',
          content: 'Command center active. Specify a task, and I will decompose it via LangGraph and deploy the appropriate worker tiers. You can also switch to Lindy for frontline ops or ChatGPT 5.5 for strategy.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    setThreads(prev => [newThread, ...prev]);
    setActiveThreadId(newThread.id);
  };

  const deleteThread = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = threads.filter(t => t.id !== id);
    if (remaining.length === 0) {
      const newThread: ChatThread = {
        id: Date.now().toString(),
        title: 'New Conversation',
        timestamp: 'Just now',
        selectedModel: 'Hermes',
        selectedTool: 'auto',
        messages: [
          {
            id: Date.now().toString() + '-init',
            role: 'assistant',
            model: 'Hermes',
            content: 'Command center active. Specify a task, and I will decompose it via LangGraph and deploy the appropriate worker tiers. You can also switch to Lindy for frontline ops or ChatGPT 5.5 for strategy.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };
      setThreads([newThread]);
      setActiveThreadId(newThread.id);
    } else {
      setThreads(remaining);
      if (activeThreadId === id) {
        setActiveThreadId(remaining[0].id);
      }
    }
  };

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update thread title if it's the first user message
    const isFirstUserMessage = activeThread.messages.filter(m => m.role === 'user').length === 0;
    const updatedTitle = isFirstUserMessage ? (input.substring(0, 24) + (input.length > 24 ? '...' : '')) : activeThread.title;

    setThreads(prev => prev.map(t => t.id === activeThreadId ? {
      ...t,
      title: updatedTitle,
      messages: [...t.messages, userMsg]
    } : t));

    setInput('');
    setIsStreaming(true);

    const activeModel = activeThread.selectedModel;
    const activeToolId = activeThread.selectedTool;
    const selectedToolObj = availableTools.find(t => t.id === activeToolId);

    // Simulate LangGraph Execution Trace
    const toolName = selectedToolObj?.name ?? 'Auto Route';
    const executionTrace = ['LangGraph initialization', `${activeModel} (Decision Agent) called`];
    
    if (activeToolId !== 'auto') {
      executionTrace.push(`Routing request to tool node: ${toolName}`);
    } else {
      executionTrace.push('Analyzing request intent', 'Routing to best-match agent...');
    }

    setCurrentExecution({
      name: toolName,
      status: 'running',
      trace: executionTrace
    });

    // Animate streaming response
    setTimeout(() => {
      executionTrace.push('Executing operational payload', 'Connecting to secure environment');
      setCurrentExecution(prev => prev ? { ...prev, trace: [...executionTrace] } : null);

      setTimeout(() => {
        executionTrace.push('Processing response buffers', 'State updated in graph memory', 'Success');
        setCurrentExecution(prev => prev ? { ...prev, status: 'success', trace: [...executionTrace] } : null);

        let responseText = `[LangGraph Node: ${activeModel}] Request executed successfully. `;
        if (activeToolId === 'draft-email') {
          responseText += `I have drafted an email matching your parameters in your outbox. Lindy will manage subsequent customer correspondence. Execution metrics: nodes: 4, latency: 124ms.`;
        } else if (activeToolId === 'search') {
          responseText += `Web search and scraping complete. Hermes dispatched 3 Tier-1 agents to parse the target DOM nodes. 47 data points extracted and formatted into JSON.`;
        } else if (activeToolId === 'google-docs') {
          responseText += `Google Docs brief generated. I have constructed an SOP outline, injected your structural rules, and pushed it to your Workspace folder.`;
        } else if (activeToolId === 'crm') {
          responseText += `CRM sync complete. I triggered an API call to GoHighLevel to update lead score, log this interaction, and update the deal pipeline stage to 'Qualified'.`;
        } else if (activeToolId === 'workflow') {
          responseText += `Agentic workflow blueprint created. I have mapped out a stateful LangGraph node graph with 4 conditional edges, ready for deployment.`;
        } else if (activeToolId === 'calendar') {
          responseText += `Calendar action executed. Available slots analyzed, conflict resolution checked. Calendar event successfully published.`;
        } else {
          responseText += `I analyzed your request and orchestrated the appropriate business logic. Hermes is ready for further autonomous instructions. All workers reporting operational status.`;
        }

        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          model: activeModel,
          content: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          toolExecution: {
            name: toolName,
            status: 'success',
            trace: executionTrace
          }
        };

        setThreads(prev => prev.map(t => t.id === activeThreadId ? {
          ...t,
          messages: [...t.messages, assistantMsg]
        } : t));

        setIsStreaming(false);
        setCurrentExecution(null);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col">
      <PageHeader
        title="Command Center"
        description={seo.description}
        breadcrumbs={seo.breadcrumbs}
        isDark={isDark}
      />

      {/* Main Container: Chat Sidebar + Conversation Window */}
      <div className="flex-1 flex gap-6 min-h-[640px] items-stretch">
        
        {/* Left Rail: Chat History */}
        <div className={`w-64 rounded-2xl border flex flex-col ${card}`}>
          <div className="p-3 border-b border-slate-100 dark:border-slate-800/60">
            <button 
              onClick={createNewThread}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all"
            >
              <Plus className="w-4 h-4" /> New Chat
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <div className={`text-[10px] font-bold ${textM} uppercase tracking-widest px-3 py-2`}>Recent Conversations</div>
            {threads.map(t => (
              <div
                key={t.id}
                onClick={() => { if (!isStreaming) setActiveThreadId(t.id); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all text-left relative group ${
                  activeThreadId === t.id 
                    ? isDark ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                    : `border border-transparent ${isDark ? 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-50'}`
                }`}
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate">{t.title}</div>
                  <div className={`text-[10px] ${textM} mt-0.5`}>{t.timestamp}</div>
                </div>
                {threads.length > 1 && (
                  <button 
                    onClick={(e) => deleteThread(t.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Area: Thread window */}
        <div className={`flex-1 rounded-2xl border flex flex-col relative ${card}`}>
          
          {/* Header/Controls */}
          <div className={`p-4 border-b ${border} flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/20`}>
            <div className="flex items-center gap-2 flex-wrap">
              {(['Hermes', 'Lindy', 'ChatGPT 5.5'] as ModelName[]).map((m) => {
                const meta = modelMeta[m];
                return (
                  <button
                    key={m}
                    disabled={isStreaming}
                    onClick={() => handleModelChange(m)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                      activeThread.selectedModel === m 
                        ? `bg-gradient-to-r ${meta.color} text-white shadow-lg shadow-indigo-500/20` 
                        : `border border-slate-200/60 dark:border-slate-800/60 ${isDark ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`
                    }`}
                  >
                    <meta.icon className="w-3.5 h-3.5" />
                    <span>{meta.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tool Picker */}
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${textM}`}>Attach Tool:</span>
              <div className="relative">
                <select 
                  disabled={isStreaming}
                  value={activeThread.selectedTool} 
                  onChange={(e) => handleToolChange(e.target.value)}
                  className={`pl-3 pr-8 py-2 rounded-xl border text-xs font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {availableTools.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                <ChevronDown className={`w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 ${textM} pointer-events-none`} />
              </div>
            </div>
          </div>

          {/* Conversation viewport */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {activeThread.messages.map((message, idx) => {
              const isAssistant = message.role === 'assistant';
              return (
                <div key={message.id}>
                  <motion.div
                    className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex gap-4 max-w-[80%] items-start">
                      {isAssistant && (
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md ${
                          message.model === 'Hermes' ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                          message.model === 'Lindy' ? 'bg-gradient-to-br from-indigo-400 to-violet-500' :
                          'bg-gradient-to-br from-cyan-400 to-blue-500'
                        } text-white`}>
                          {message.model === 'Hermes' ? <Bot className="w-4 h-4" /> :
                           message.model === 'Lindy' ? <MessageSquare className="w-4 h-4" /> :
                           <Brain className="w-4 h-4" />}
                        </div>
                      )}
                      
                      <div className="flex flex-col">
                        <div className={`rounded-2xl px-5 py-3.5 shadow-sm border ${
                          !isAssistant 
                            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent' 
                            : isDark 
                            ? 'bg-slate-800 border-slate-700/80 text-slate-100' 
                            : 'bg-slate-50 border-slate-100 text-slate-800'
                        }`}>
                          {isAssistant && (
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className={`text-[10px] font-bold tracking-widest uppercase ${
                                message.model === 'Hermes' ? 'text-amber-400' : message.model === 'Lindy' ? 'text-indigo-400' : 'text-cyan-400'
                              }`}>
                                {message.model}
                              </span>
                              <span className={`text-[10px] ${textM}`}>{message.timestamp}</span>
                            </div>
                          )}
                          <p className="text-sm leading-6 whitespace-pre-wrap font-normal">{message.content}</p>
                        </div>

                        {/* If tool was executed, show a collapsed trace trigger */}
                        {isAssistant && message.toolExecution && (
                          <motion.button
                            onClick={() => setShowTrace(showTrace === message.id ? null : message.id)}
                            className={`flex items-center gap-1.5 mt-2 text-xs font-medium self-start px-2 py-1 rounded-md transition-all ${
                              isDark ? 'bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                            whileTap={{ scale: 0.98 }}
                          >
                            <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                            <span>LangGraph Execution Trace: {message.toolExecution.name}</span>
                            <ChevronDown className={`w-3 h-3 transition-transform ${showTrace === message.id ? 'rotate-180' : ''}`} />
                          </motion.button>
                        )}
                        
                        {/* Expanded trace view */}
                        {isAssistant && message.toolExecution && showTrace === message.id && (
                          <motion.div 
                            className={`mt-2 p-3 rounded-xl border font-mono text-[11px] space-y-1.5 ${
                              isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                            }`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            <div className={`text-xs font-bold uppercase tracking-wider mb-2 text-indigo-400`}>Execution Flow</div>
                            {message.toolExecution.trace.map((step, sIdx) => (
                              <div key={sIdx} className="flex items-center gap-2">
                                <CornerDownRight className="w-3 h-3 text-slate-600" />
                                <span className={step === 'Success' || step === 'Complete' ? 'text-emerald-400 font-bold' : ''}>
                                  {step}
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>

                      {!isAssistant && (
                        <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 text-sm font-bold text-slate-700 dark:text-slate-200">
                          U
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
            
            {/* Live Streaming Indicator */}
            {isStreaming && (
              <motion.div className="flex justify-start items-start gap-4 max-w-[80%]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${modelMeta[activeThread.selectedModel].color} text-white shadow-md`}>
                  {activeThread.selectedModel === 'Hermes' ? <Bot className="w-4 h-4 animate-pulse" /> : 
                   activeThread.selectedModel === 'Lindy' ? <MessageSquare className="w-4 h-4 animate-pulse" /> : 
                   <Brain className="w-4 h-4 animate-pulse" />}
                </div>
                <div className="flex flex-col flex-1">
                  <div className={`rounded-2xl px-5 py-3.5 border flex items-center gap-2 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex gap-1">
                      {[0,1,2].map(i => (
                        <motion.span key={i} className={`w-2 h-2 rounded-full bg-indigo-500`} animate={{ y: [-2, 2, -2] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} />
                      ))}
                    </div>
                    {currentExecution && (
                      <span className={`text-xs font-mono font-medium text-slate-400 ml-4`}>LangGraph: {currentExecution.name} ({currentExecution.status})...</span>
                    )}
                  </div>
                  
                  {currentExecution && (
                    <motion.div className={`mt-2 p-3 rounded-xl border font-mono text-[11px] space-y-1.5 ${isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                      {currentExecution.trace.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2">
                          <CornerDownRight className="w-3 h-3 text-slate-600" />
                          <span className={step === 'Success' ? 'text-emerald-400 font-bold' : ''}>{step}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-1.5 text-indigo-400 mt-1">
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-indigo-400" animate={{ opacity: [1,0.4,1] }} transition={{ duration: 1, repeat: Infinity }} />
                        <span className="text-[10px]">Processing node...</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Composer Footer */}
          <div className={`p-4 border-t ${border} bg-slate-50/30 dark:bg-slate-800/10`}>
            <div className={`flex items-end gap-3 rounded-2xl border p-3.5 shadow-sm transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/50 ${
              isDark ? 'bg-[#0b0c14] border-slate-700' : 'bg-white border-slate-200'
            }`}>
              <textarea
                rows={2}
                disabled={isStreaming}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder={`Instruct ${activeThread.selectedModel}... (Shift+Enter for newline, Enter to send)`}
                className={`flex-1 resize-none bg-transparent text-sm font-normal outline-none ${
                  isDark ? 'text-white placeholder-slate-500' : 'text-slate-800 placeholder-slate-400'
                }`}
              />
              <motion.button 
                onClick={handleSend}
                disabled={!input.trim() || isStreaming}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-bold shadow-lg transition-all ${
                  !input.trim() || isStreaming 
                    ? 'bg-slate-300 dark:bg-slate-700 text-slate-400 dark:text-slate-500 shadow-none cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500'
                }`}
                whileTap={{ scale: input.trim() && !isStreaming ? 0.96 : 1 }}
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </motion.button>
            </div>
            <div className={`flex items-center justify-between mt-2 text-[10px] px-1 ${textM}`}>
              <div>Shift + Enter for new line • Ctrl + K to clear history</div>
              <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> All data encrypted in private subgraphs</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
