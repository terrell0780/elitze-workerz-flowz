import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Crown, Sparkles, Phone, Mail, ShoppingCart, Bot, Brain, Zap } from 'lucide-react';
import { authStore } from '../store/auth';
import { cn } from '../utils/cn';

interface Message {
  id: string;
  role: 'user' | 'lindy' | 'hermes' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    agent?: string;
    skill?: string;
    workflow?: string;
    confidence?: number;
  };
}

type AgentMode = 'lindy' | 'hermes' | 'auto';
type TierId = 'none' | 'silver' | 'gold' | 'partner';

export function ChatPage({ onCartOpen }: { onCartOpen: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [agentMode, setAgentMode] = useState<AgentMode>('auto');
  const [activeAgent, setActiveAgent] = useState<'lindy' | 'hermes'>('lindy');
  const [vipTier, setVipTier] = useState<TierId>('none');
  const [vipOpen, setVipOpen] = useState(false);
  const [csmPanel, setCsmPanel] = useState<'call' | 'email' | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const lindyCapabilities = [
    'Agent Builder (natural language agent creation)',
    'Autopilot Computer Use (web automation beyond APIs)',
    '4,000-6,000+ integrations',
    'Claude Sonnet 4.5 integration',
    'Meeting recording and transcription',
    'Knowledge base integration',
    'Human-in-the-loop escalation',
    'No-code workflow builder',
    'Team accounts',
    'Voice automation (Gaia)',
    'Lindy Build for web apps',
  ];

  const hermesCapabilities = [
    'Persistent memory (SQLite + FTS5)',
    'Self-improving skill creation',
    'Multi-agent orchestration',
    'MCP integration',
    '200+ models via OpenRouter',
    'LLM-powered summarization',
    'Honcho user modeling',
    'Natural language scheduling',
    'Tool calling via execute_code',
    'Atropos RL integration',
    'Six terminal backends',
    'Agent-curated memory',
  ];

  const orchestrationPatterns = [
    'Subagents pattern',
    'Handoffs pattern',
    'Skills pattern',
    'Router pattern',
    'Custom workflows',
    'Parallel execution',
    'Cyclic reasoning',
    'Shared state',
  ];

  useEffect(() => {
    if (messages.length === 0) {
      const greeting = authStore.consumeGreeting();
      if (greeting) {
        push('lindy', `Hi there, ${greeting.name}! 👋 Welcome back to Elitze One Stop Shop. I'm Lindy, your personal hiring consultant. Great to see you again! What are we working on today? Finding the perfect AI employee? Scaling your team? Or just exploring what's possible? I'm here to help however I can.`);
      } else if (authStore.isAuthenticated()) {
        push('lindy', `Hello! 👋 Welcome to Elitze One Stop Shop. I'm Lindy, your personal hiring consultant. Think of me as your dedicated agent at our agency — I'm here to understand your needs and match you with the perfect AI talent. What brings you in today?`);
      } else {
        push('lindy', `Hi there! 👋 Welcome to Elitze One Stop Shop. I'm Lindy, your personal hiring consultant. We have over 1,000 certified AI employees ready to join your team — from sales and support to engineering and operations. Feel free to browse around, and when you're ready, I'd love to learn about what you're looking to build. What's on your mind today?`);
      }
    }
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function push(role: Message['role'], content: string, metadata?: Message['metadata']) {
    setMessages(m => [...m, { id: `m${Date.now()}-${Math.random()}`, role, content, timestamp: new Date(), metadata }]);
  }

  function switchAgent(to: AgentMode) {
    setAgentMode(to);
    if (to === 'lindy') {
      setActiveAgent('lindy');
      push('system', 'Switched to Lindy AI: customer service, hiring guidance, and workflow automation.');
    } else if (to === 'hermes') {
      setActiveAgent('hermes');
      push('system', 'Switched to Hermes: deep reasoning, multi-agent orchestration, and complex task execution.');
    } else {
      push('system', 'Auto mode enabled: I will route to Lindy or Hermes based on your request complexity.');
    }
  }

  // Simulated AI response generation
  function generateResponse(userMessage: string): { agent: 'lindy' | 'hermes'; response: string } {
    const lower = userMessage.toLowerCase();

    // Hermes triggers (complex, technical, orchestration)
    if (lower.includes('orchestrat') || lower.includes('multi-agent') || lower.includes('langgraph') ||
        lower.includes('workflow') || lower.includes('skill') || lower.includes('memory') ||
        lower.includes('code') || lower.includes('api') || lower.includes('deploy') ||
        lower.includes('architecture') || lower.includes('integration') || lower.includes('automation')) {
      return {
        agent: 'hermes',
        response: generateHermesResponse(userMessage),
      };
    }

    // Default to Lindy for customer service, hiring, pricing, browsing
    return {
      agent: 'lindy',
      response: generateLindyResponse(userMessage),
    };
  }

  function generateLindyResponse(msg: string): string {
    const lower = msg.toLowerCase();

    if (lower.includes('hire') || lower.includes('rent') || lower.includes('buy') || lower.includes('price') || lower.includes('cost')) {
      return `I can help you hire an AI employee! Here's how it works:

**Rent**: $49.99/day — perfect for short projects, trials, or peak periods. Cancel anytime.
**Buy**: $399 one-time — own the agent outright with lifetime access.
**Volume discounts**: 3+ agents = $375/ea, 5+ = $349/ea, 10+ = $299/ea.

Right now we have a 7-Day Flash Sale: 50% off orders over $100 + free 7-Day VIP Gold.

Would you like me to:
1. Show you available agents by category?
2. Help you choose the right agent for your use case?
3. Guide you through the checkout process?

Just let me know what you're looking to accomplish!`;
    }

    if (lower.includes('browse') || lower.includes('agent') || lower.includes('category') || lower.includes('sales') || lower.includes('support')) {
      return `We have 1,000+ certified AI employees across 10 categories:

**Sales**: SDR agents, Account Executive agents, Revenue Operations
**Support**: Customer support, Help desk, Ticket triage
**Engineering**: Dev agents, QA agents, DevOps agents
**Operations**: Executive assistants, Project managers, Data entry
**Marketing**: Content writers, Social media, SEO specialists
**Finance**: Bookkeeping, Accounts receivable, Financial analysis
**Legal**: Contract review, Compliance, Regulatory research
**HR**: Recruiting, Onboarding, Diversity & inclusion
**Research**: Market research, Competitive intelligence, Data analysis
**Creative**: Graphic design, Video editing, Podcast production

Each agent is Hermes AI certified, maxed-out in their skills, and comes with full audit logging.

What category interests you? I can show you specific agents with ratings, task history, and availability.`;
    }

    if (lower.includes('capability') || lower.includes('what can') || lower.includes('do')) {
      return `Here's what I (Lindy AI) can do for you:

${lindyCapabilities.map((c, i) => `${i + 1}. ${c}`).join('\n')}

I work alongside Hermes, who handles complex orchestration and multi-agent workflows. Together we provide end-to-end AI staffing and automation.

What would you like to automate or accomplish?`;
    }

    if (lower.includes('sign in') || lower.includes('login') || lower.includes('account')) {
      return `You can sign in with:
- Email + password
- Google
- Apple
- GitHub
- Vercel

Once signed in, you can rent or purchase agents, and I'll guide you through the entire hiring process with personalized recommendations.

Need help with an existing account? Let me know!`;
    }

    if (lower.includes('payment') || lower.includes('pay') || lower.includes('stripe') || lower.includes('crypto') || lower.includes('transfer')) {
      return `We accept multiple payment methods:

**Stripe**: All major credit/debit cards, subscription billing
**Crypto**: BTC, ETH, USDC (manual confirmation, contact for wallet address)
**CDN E-Transfer**: terrell0780@gmail.com (North America, include email in memo)

For enterprise or partner orders, we also support CDN-hosted invoice links and approved payment links.

All payments are secured with encryption and audit logging. Which method works best for you?`;
    }

    // Default helpful response
    return `I'm here to help! I can assist with:

- **Browsing agents**: Show you available AI employees by category
- **Hiring guidance**: Help you choose the right agent for your needs
- **Pricing questions**: Explain rent vs buy, volume discounts, flash sales
- **Payment setup**: Guide you through checkout and payment methods
- **Onboarding**: Walk you through agent activation and integration
- **Technical questions**: Connect you with Hermes for complex orchestration

What would you like to tackle today?`;
  }

  function generateHermesResponse(msg: string): string {
    const lower = msg.toLowerCase();

    if (lower.includes('capability') || lower.includes('what can') || lower.includes('do')) {
      return `Hermes AI capabilities:

${hermesCapabilities.map((c, i) => `${i + 1}. ${c}`).join('\n')}

I specialize in complex task orchestration, multi-agent coordination, and persistent learning. Unlike session-based assistants, I remember context across days and weeks, create reusable skills from completed tasks, and can coordinate multiple specialist agents toward shared goals.

What complex workflow are you looking to automate?`;
    }

    if (lower.includes('langgraph') || lower.includes('orchestrat') || lower.includes('pattern') || lower.includes('multi-agent')) {
      return `LangGraph orchestration patterns available in Zevanto:

${orchestrationPatterns.map((p, i) => `${i + 1}. ${p}`).join('\n')}

**Example workflow**:
1. **Router** classifies incoming request
2. **Subagents** execute specialized tasks in parallel
3. **Handoffs** route complex decisions to human review
4. **Skills** load domain-specific knowledge on-demand
5. **Cyclic reasoning** refines outputs through iteration
6. **Shared state** maintains context across all agents

This enables complex workflows like:
- Research → Analysis → Report generation → Human review
- Lead qualification → CRM update → Email sequence → Meeting scheduling
- Code generation → Testing → Deployment → Monitoring

What workflow are you designing? I can help architect the agent graph.`;
    }

    if (lower.includes('memory') || lower.includes('remember') || lower.includes('context')) {
      return `Hermes memory architecture:

**Persistent Memory**: SQLite database with FTS5 full-text search across all sessions. I remember who you are, what you're working on, and how you like things done — across days, weeks, and months.

**Active Curation**: I don't just store transcripts. I use LLM summarization and periodic nudges to save information I deem useful for future tasks.

**Honcho User Modeling**: Builds a progressively deeper understanding of how you work across sessions, adapting to your preferences and workflows.

**Cache-Aware**: System prompt snapshots freeze at session initialization, so high-frequency model calls use cached context windows without inflating token costs.

This means every conversation builds on prior context. You don't re-explain projects, preferences, or constraints.

What would you like me to remember or recall?`;
    }

    if (lower.includes('skill') || lower.includes('learn') || lower.includes('improve')) {
      return `Hermes skill creation loop:

1. **Execute** a complex task
2. **Evaluate** the outcome
3. **Extract** reusable patterns
4. **Refine** the skill file
5. **Retrieve** for future matching tasks

Skills are portable via agentskills.io open standard. Community-contributed skills can be shared across installations.

**Example skill progression**:
- First execution: Manual multi-step workflow
- After evaluation: Automated skill with error handling
- After refinement: Optimized with parallel execution
- After retrieval: One-command execution

This is how I become more effective the longer you use me. What task should I learn to automate?`;
    }

    // Default technical response
    return `I'm Hermes, the orchestration engine. I handle:

- Multi-agent coordination with LangGraph patterns
- Persistent memory and skill creation
- Complex workflow automation
- API integrations and tool orchestration
- Code generation and deployment
- Research and analysis pipelines

For customer service, hiring, and pricing, Lindy AI is your primary contact. For technical architecture and complex automation, I'm here to help.

What are you building?`;
  }

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    // Add user message
    push('user', text);
    setInput('');
    setTyping(true);

    // Determine agent and generate response
    setTimeout(() => {
      const { agent, response } = generateResponse(text);
      setActiveAgent(agent);
      push(agent, response, {
        agent,
        confidence: 0.85 + Math.random() * 0.1,
      });
      setTyping(false);
    }, 800 + Math.random() * 600);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#050608]">
      {/* Header */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center gap-4 flex-shrink-0 bg-[#0a0b12]/50 backdrop-blur-md">
        <div className="relative flex-shrink-0">
          <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold',
            activeAgent === 'lindy' ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600' : 'bg-gradient-to-br from-indigo-600 to-blue-600'
          )}>
            {activeAgent === 'lindy' ? <Bot className="w-6 h-6" /> : <Brain className="w-6 h-6" />}
          </div>
          <div className={cn('absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#050608]',
            activeAgent === 'lindy' ? 'bg-emerald-400' : 'bg-indigo-400'
          )} />
        </div>
        <div className="flex-1">
          <p className="font-bold text-white text-base tracking-tight">{activeAgent === 'lindy' ? 'Lindy AI' : 'Hermes'}</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">
            {activeAgent === 'lindy' ? 'Customer Service · Hiring · Automation' : 'Orchestration · Memory · Skills'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700">
            <button
              onClick={() => switchAgent('lindy')}
              className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors',
                agentMode === 'lindy' ? 'bg-violet-500/20 text-violet-300' : 'text-slate-400 hover:text-white'
              )}
            >
              Lindy
            </button>
            <button
              onClick={() => switchAgent('auto')}
              className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors',
                agentMode === 'auto' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
              )}
            >
              Auto
            </button>
            <button
              onClick={() => switchAgent('hermes')}
              className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors',
                agentMode === 'hermes' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'
              )}
            >
              Hermes
            </button>
          </div>
          {vipTier !== 'none' && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20">
              <Crown className="w-3 h-3 text-amber-400" />
              <span className="text-[9px] font-bold text-amber-300 uppercase tracking-tighter">{vipTier}</span>
            </div>
          )}
          <button onClick={() => setVipOpen(true)} title="VIP Programs"
            className="p-2 rounded-lg border border-white/5 text-slate-500 hover:text-amber-400 transition-colors">
            <Sparkles className="w-4 h-4" />
          </button>
          <button onClick={() => setCsmPanel(p => p === 'call' ? null : 'call')} title="Schedule Call"
            className="p-2 rounded-lg border border-white/5 text-slate-500 hover:text-emerald-400 transition-colors">
            <Phone className="w-4 h-4" />
          </button>
          <button onClick={() => setCsmPanel(p => p === 'email' ? null : 'email')} title="Email Support"
            className="p-2 rounded-lg border border-white/5 text-slate-500 hover:text-blue-400 transition-colors">
            <Mail className="w-4 h-4" />
          </button>
          <button onClick={onCartOpen} title="Cart"
            className="p-2 rounded-lg border border-white/5 text-slate-500 hover:text-white transition-colors">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CSM Panel */}
      <AnimatePresence>
        {csmPanel && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="border-b border-white/5 overflow-hidden flex-shrink-0 bg-[#0c0d18]">
            <div className="px-6 py-4">
              {csmPanel === 'call' && (
                <div className="flex items-center gap-4">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <p className="text-sm text-slate-300 font-medium">Schedule a call with our team</p>
                  <a href="mailto:terrell0780@gmail.com?subject=Elitze Call Request"
                    className="px-4 py-2 rounded-lg bg-emerald-500/15 border border-emerald-400/25 text-xs text-emerald-300 font-medium hover:bg-emerald-500/25 transition-colors">
                    Email to schedule →
                  </a>
                  <button onClick={() => setCsmPanel(null)} className="text-xs text-slate-600 hover:text-slate-400 ml-auto">Dismiss</button>
                </div>
              )}
              {csmPanel === 'email' && (
                <div className="flex items-center gap-4">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <p className="text-sm text-slate-300 font-medium">Support: <span className="text-blue-400 font-mono">terrell0780@gmail.com</span></p>
                  <a href="mailto:terrell0780@gmail.com" className="px-4 py-2 rounded-lg bg-blue-500/15 border border-blue-400/25 text-xs text-blue-300 font-medium hover:bg-blue-500/25 transition-colors">
                    Compose →
                  </a>
                  <button onClick={() => setCsmPanel(null)} className="text-xs text-slate-600 hover:text-slate-400 ml-auto">Dismiss</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 min-h-0 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn('max-w-[85%] space-y-2', msg.role === 'user' ? 'items-end' : 'items-start')}>
              {msg.role !== 'user' && (
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn('w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold',
                    msg.role === 'lindy' ? 'bg-violet-600' : msg.role === 'hermes' ? 'bg-indigo-600' : 'bg-slate-700'
                  )}>
                    {msg.role === 'lindy' ? <Bot className="w-3.5 h-3.5" /> : msg.role === 'hermes' ? <Brain className="w-3.5 h-3.5" /> : 'Z'}
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                    {msg.role === 'lindy' ? 'Lindy AI' : msg.role === 'hermes' ? 'Hermes' : 'System'}
                    {msg.metadata?.confidence && ` · ${(msg.metadata.confidence * 100).toFixed(0)}% confidence`}
                  </span>
                </div>
              )}
              <div className={cn('px-5 py-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-lg',
                msg.role === 'user' ? 'bg-slate-800 text-white rounded-br-sm border border-slate-700' :
                msg.role === 'lindy' ? 'bg-violet-900/20 border border-violet-500/20 text-slate-200 rounded-bl-sm' :
                msg.role === 'hermes' ? 'bg-indigo-900/20 border border-indigo-500/20 text-slate-200 rounded-bl-sm' :
                'bg-slate-900/50 border border-white/5 text-slate-300 rounded-bl-sm'
              )}>
                {msg.content}
              </div>
              <p className="text-[9px] text-slate-700 px-1 font-mono tracking-tighter">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 px-5 py-4 rounded-2xl bg-slate-900/40 border border-white/5">
              {[0, 1, 2].map(i => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-600"
                  animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/5 px-6 py-5 flex items-end gap-4 flex-shrink-0 bg-[#080910]">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Shift+Enter for new line)"
          rows={1}
          className="flex-1 bg-black/40 border border-white/5 rounded-xl px-5 py-3 text-sm text-slate-300 placeholder:text-slate-700 focus:outline-none focus:border-slate-600 transition-colors resize-none max-h-32"
          style={{ minHeight: '48px' }}
        />
        <button onClick={() => sendMessage(input)} disabled={!input.trim() || typing}
          className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-40 flex items-center justify-center transition-colors flex-shrink-0 text-slate-400">
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* VIP Modal */}
      <AnimatePresence>
        {vipOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setVipOpen(false)}>
            <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}
              className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0b0c16] p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Agency VIP Access</h3>
              <p className="text-slate-500 text-sm mb-8">Exclusive rates and strategic oversight for enterprise clients.</p>
              <div className="grid grid-cols-3 gap-4">
                {([
                  { id: 'silver', name: 'Silver', price: '$49/mo', icon: '🥈', perks: ['10% discount', 'Priority support', 'Early access'] },
                  { id: 'gold', name: 'Gold', price: '$149/mo', icon: '🥇', perks: ['25% discount', 'Offer desk access', 'Hermes escalations', 'CSM calls'] },
                  { id: 'partner', name: 'Partner', price: 'Custom', icon: '🤝', perks: ['White-label', 'Revenue share', 'API access'] },
                ] as Array<{ id: Exclude<TierId, 'none'>; name: string; price: string; icon: string; perks: string[] }>).map((tier) => (
                  <div key={tier.id} className={cn('p-5 rounded-xl border bg-white/[0.01] cursor-pointer transition-all flex flex-col',
                    vipTier === tier.id ? 'border-slate-600 bg-slate-800/20' : 'border-white/5 hover:border-white/20'
                  )} onClick={() => { setVipTier(tier.id); setVipOpen(false); }}>
                    <span className="text-3xl mb-3">{tier.icon}</span>
                    <p className="text-sm font-bold text-white uppercase tracking-tight">{tier.name}</p>
                    <p className="text-sm font-mono text-slate-400 mb-4">{tier.price}</p>
                    <ul className="space-y-2 flex-1">{tier.perks.map((p) => <li key={p} className="text-[10px] text-slate-500 leading-tight">✓ {p}</li>)}</ul>
                    <button className={cn('w-full mt-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors',
                      vipTier === tier.id ? 'bg-slate-700 text-slate-300' : 'bg-white text-black hover:bg-slate-200'
                    )}>
                      {vipTier === tier.id ? 'Current' : 'Authorize'}
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => setVipOpen(false)} className="mt-8 w-full py-2 text-[10px] text-slate-700 hover:text-slate-500 transition-colors uppercase tracking-[0.3em]">Close Portal</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
