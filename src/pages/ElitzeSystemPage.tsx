import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Palette, Music, BookOpen, 
  ArrowRight, CheckCircle2, Zap, 
  FileText, Video, Headphones, Presentation, Settings,
  Sparkles
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../utils/cn';

type RouteCategory = 'research' | 'visuals' | 'audio' | 'story' | 'unrouted';

interface RouteConfig {
  id: RouteCategory;
  label: string;
  icon: LucideIcon;
  tools: string[];
  outputs: string[];
  color: string;
  borderColor: string;
  bgColor: string;
}

const ROUTES: Record<RouteCategory, RouteConfig> = {
  research: {
    id: 'research',
    label: 'Research',
    icon: Search,
    tools: ['Perplexity', 'Consensus', 'NotebookLM'],
    outputs: ['doc', 'system'],
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10',
  },
  visuals: {
    id: 'visuals',
    label: 'Visuals',
    icon: Palette,
    tools: ['Napkin', 'Gamma', 'Ideogram'],
    outputs: ['video', 'pitch', 'doc'],
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/10',
  },
  audio: {
    id: 'audio',
    label: 'Audio',
    icon: Music,
    tools: ['ElevenLabs', 'Suno', 'Udio'],
    outputs: ['audio', 'video', 'pitch'],
    color: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    bgColor: 'bg-rose-500/10',
  },
  story: {
    id: 'story',
    label: 'Story',
    icon: BookOpen,
    tools: ['Tome'],
    outputs: ['pitch', 'doc', 'video'],
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
  },
  unrouted: {
    id: 'unrouted',
    label: 'Pending',
    icon: Zap,
    tools: [],
    outputs: [],
    color: 'text-slate-400',
    borderColor: 'border-white/10',
    bgColor: 'bg-white/[0.02]',
  },
};

const OUTPUT_ICONS: Record<string, LucideIcon> = {
  doc: FileText,
  video: Video,
  audio: Headphones,
  pitch: Presentation,
  system: Settings,
};

// Deterministic intent classifier
function classifyIntent(input: string): RouteCategory {
  const lower = input.toLowerCase();
  
  // Audio keywords
  if (/\b(audio|voice|music|song|narration|podcast|elevenlabs|suno|udio|speech)\b/.test(lower)) {
    return 'audio';
  }
  
  // Visual keywords
  if (/\b(visual|image|design|graphic|diagram|napkin|gamma|ideogram|slide|deck|art)\b/.test(lower)) {
    return 'visuals';
  }
  
  // Story keywords
  if (/\b(story|narrative|pitch|presentation|tome|script|plot|flow)\b/.test(lower)) {
    return 'story';
  }
  
  // Research keywords (default)
  if (/\b(research|study|analysis|report|data|perplexity|consensus|notebooklm|info|learn)\b/.test(lower)) {
    return 'research';
  }
  
  // Fallback: route to research for general queries
  return 'research';
}

export function ElitzeSystemPage() {
  const [input, setInput] = useState('');
  const [activeRoute, setActiveRoute] = useState<RouteCategory>('unrouted');
  const [selectedOutput, setSelectedOutput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<Array<{ input: string; route: RouteCategory; output: string; timestamp: Date }>>([]);

  const handleClassify = useCallback(() => {
    if (!input.trim() || isProcessing) return;
    setIsProcessing(true);
    setActiveRoute('unrouted');
    setSelectedOutput('');

    // Simulate classification delay (real intent detection happens instantly)
    setTimeout(() => {
      const route = classifyIntent(input);
      setActiveRoute(route);
      setSelectedOutput(ROUTES[route].outputs[0] || 'doc');
      setHistory(prev => [{
        input: input.trim(),
        route,
        output: ROUTES[route].outputs[0] || 'doc',
        timestamp: new Date()
      }, ...prev].slice(0, 5));
      setIsProcessing(false);
    }, 600);
  }, [input, isProcessing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleClassify();
    }
  };

  const currentRoute = ROUTES[activeRoute];
  const OutputIcon = OUTPUT_ICONS[selectedOutput] || FileText;

  return (
    <div className="min-h-screen bg-[#0f1117] px-6 lg:px-10 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-[11px] font-mono text-violet-200 tracking-wider uppercase">ELITZE AGENT SYSTEM</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            INPUT → Classify → Route → Generate
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            Intent-driven orchestration. Type a request, the system classifies intent, routes to specialized agents, and delivers structured assets.
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/[0.02]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
            <div className="flex-1">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">INPUT</p>
              <div className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-white">
                Natural Language Request
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-600 hidden md:block" />
            <div className="flex-1">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">INTENT CLASSIFIER</p>
              <div className="px-4 py-2 rounded-lg bg-violet-500/10 border border-violet-500/30 text-sm text-violet-300 font-semibold">
                Deterministic Routing
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-600 hidden md:block" />
            <div className="flex-1">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">ROUTES</p>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.values(ROUTES).filter(r => r.id !== 'unrouted').map(route => (
                  <span key={route.id} className={cn('px-2 py-1 rounded-md text-[10px] font-medium border', route.borderColor, route.bgColor, route.color)}>
                    {route.label}
                  </span>
                ))}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-600 hidden md:block" />
            <div className="flex-1">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">OUTPUT</p>
              <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-sm text-emerald-300 font-semibold">
                Structured Asset
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Classifier */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-white mb-4">Test Intent Routing</h2>
          <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
            <div className="flex gap-3 mb-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., Research market trends for AI staffing agencies in 2026..."
                rows={2}
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-400/50 transition-colors resize-none"
              />
              <button
                onClick={handleClassify}
                disabled={!input.trim() || isProcessing}
                className="px-5 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 flex-shrink-0"
              >
                {isProcessing ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <Zap className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Zap className="w-4 h-4" />
                )}
                Route
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeRoute !== 'unrouted' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  {/* Active Route Info */}
                  <div className={cn('p-4 rounded-xl border', currentRoute.borderColor, currentRoute.bgColor)}>
                    <div className="flex items-center gap-3 mb-3">
                      <currentRoute.icon className={cn('w-5 h-5', currentRoute.color)} />
                      <h3 className={cn('font-bold', currentRoute.color)}>{currentRoute.label} Agent</h3>
                    </div>
                    
                    {/* Tools */}
                    <div className="mb-3">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">Connected Tools</p>
                      <div className="flex flex-wrap gap-2">
                        {currentRoute.tools.map(tool => (
                          <span key={tool} className="px-2.5 py-1 rounded-md bg-black/30 border border-white/10 text-xs text-slate-300">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Output Selection */}
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">Output Format</p>
                      <div className="flex flex-wrap gap-2">
                        {currentRoute.outputs.map(format => {
                          const Icon = OUTPUT_ICONS[format] || FileText;
                          const isActive = selectedOutput === format;
                          return (
                            <button
                              key={format}
                              onClick={() => setSelectedOutput(format)}
                              className={cn(
                                'flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all',
                                isActive
                                  ? 'bg-white text-black border-white'
                                  : 'bg-white/[0.03] text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
                              )}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              {format.charAt(0).toUpperCase() + format.slice(1)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Generated Asset Preview */}
                  <div className="p-4 rounded-xl border border-white/8 bg-black/20">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Generated Asset</p>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <OutputIcon className="w-5 h-5 text-slate-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{input || 'Untitled Asset'}</p>
                        <p className="text-[10px] text-slate-500">{currentRoute.label} · {selectedOutput}</p>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Ready</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Recent Routing History */}
        {history.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">Recent Routing</h2>
            <div className="space-y-2">
              {history.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02]"
                >
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', ROUTES[item.route].bgColor, ROUTES[item.route].borderColor)}>
                    {(() => {
                      const Icon = ROUTES[item.route].icon;
                      return <Icon className={cn('w-4 h-4', ROUTES[item.route].color)} />;
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{item.input}</p>
                    <p className="text-[10px] text-slate-500">
                      {ROUTES[item.route].label} → {item.output}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-600 font-mono">
                    {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
