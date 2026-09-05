import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, RotateCcw, ChevronRight, GitBranch, Layers,
  CheckCircle2, Clock, AlertCircle, Zap, BarChart3, FileCode2
} from 'lucide-react';
import {
  AGENT_ROUTING_MAP, EXAMPLE_PLANS, DECISION_TREE,
  type OrchestratorPlan, type OrchestratorTask, type TaskStatus, type AgentType,
} from '../../data/orchestrator';
import { cn } from '../../utils/cn';

// ── Sub-components ─────────────────────────────────────────────────────────

function AgentBadge({ agent, size = 'sm' }: { agent: AgentType; size?: 'sm' | 'md' }) {
  const meta = AGENT_ROUTING_MAP[agent];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-mono font-bold',
        size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-3 py-1 text-[10px]'
      )}
      style={{ borderColor: `${meta.color}40`, background: `${meta.color}12`, color: meta.color }}
    >
      <span>{meta.icon}</span>
      {meta.label}
    </span>
  );
}

function StatusIcon({ status }: { status: TaskStatus }) {
  if (status === 'done')    return <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
  if (status === 'running') return <motion.div className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent flex-shrink-0" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />;
  if (status === 'failed')  return <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />;
  if (status === 'blocked') return <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />;
  return <div className="w-4 h-4 rounded-full border-2 border-white/20 flex-shrink-0" />;
}

function TaskRow({ task, index }: { task: OrchestratorTask; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className={cn(
        'rounded-xl border transition-all overflow-hidden',
        task.status === 'done'    ? 'border-emerald-500/25 bg-emerald-500/5' :
        task.status === 'running' ? 'border-indigo-400/40 bg-indigo-500/8' :
        task.status === 'failed'  ? 'border-rose-500/25 bg-rose-500/5' :
        task.status === 'blocked' ? 'border-amber-500/20 bg-amber-500/5' :
                                    'border-white/8 bg-white/[0.02]'
      )}
    >
      <button
        onClick={() => task.output && setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <StatusIcon status={task.status} />
        <span className="text-[10px] font-mono text-slate-500 w-5 flex-shrink-0">#{task.id}</span>
        <span className="text-sm font-medium text-white flex-1 min-w-0 truncate">{task.name}</span>
        {task.dependencies.length > 0 && (
          <span className="text-[9px] text-slate-600 font-mono hidden sm:block flex-shrink-0">
            deps: [{task.dependencies.join(', ')}]
          </span>
        )}
        <AgentBadge agent={task.agent} />
        {task.status === 'running' && (
          <span className="text-[9px] font-mono text-indigo-300 animate-pulse flex-shrink-0">RUNNING</span>
        )}
        {task.output && <ChevronRight className={cn('w-3.5 h-3.5 text-slate-600 flex-shrink-0 transition-transform', expanded && 'rotate-90')} />}
      </button>
      <AnimatePresence>
        {expanded && task.output && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 pt-0 border-t border-white/5">
              <p className="text-[11px] font-mono text-emerald-300 leading-relaxed">
                ✔ {task.output}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Orchestrator Skill Section ───────────────────────────────────────────

export function OrchestratorSkill() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [plan, setPlan] = useState<OrchestratorPlan>(() => JSON.parse(JSON.stringify(EXAMPLE_PLANS[0])));
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [customGoal, setCustomGoal] = useState('');
  const [activeTab, setActiveTab] = useState<'executor' | 'routing' | 'decision' | 'yaml'>('executor');
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const runRef = useRef(false);

  const resetPlan = useCallback((idx: number) => {
    const fresh: OrchestratorPlan = JSON.parse(JSON.stringify(EXAMPLE_PLANS[idx]));
    fresh.tasks.forEach((t) => { t.status = 'pending'; delete t.output; });
    setPlan(fresh);
    setRunning(false);
    setDone(false);
    setElapsed(0);
    runRef.current = false;
  }, []);

  useEffect(() => { resetPlan(selectedPlan); }, [selectedPlan, resetPlan]);

  // Simulate orchestrated execution
  const runOrchestrator = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setDone(false);
    setElapsed(0);
    runRef.current = true;

    // Start elapsed timer
    const startTime = Date.now();
    timerRef.current = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 200);

    const tasks: OrchestratorTask[] = JSON.parse(JSON.stringify(plan.tasks));
    const completed = new Set<number>();

    const updateTask = (id: number, status: TaskStatus, output?: string) => {
      setPlan((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => t.id === id ? { ...t, status, output: output ?? t.output } : t),
      }));
    };

    // Find ready tasks (all dependencies met)
    const getReady = () =>
      tasks.filter((t) => t.status === 'pending' && t.dependencies.every((d) => completed.has(d)));

    while (runRef.current) {
      const ready = getReady();
      if (ready.length === 0) {
        if (tasks.every((t) => completed.has(t.id))) break;
        await new Promise((r) => setTimeout(r, 200));
        continue;
      }

      // In parallel mode run all ready; in sequential run one at a time
      const toRun = plan.execution_mode === 'sequential' ? [ready[0]] : ready;

      await Promise.all(
        toRun.map(async (task) => {
          task.status = 'running';
          updateTask(task.id, 'running');
          await new Promise((r) => setTimeout(r, task.duration));
          task.status = 'done';
          const spec = AGENT_ROUTING_MAP[task.agent];
          updateTask(task.id, 'done', task.output || `${spec.label} completed: ${task.name}`);
          completed.add(task.id);
        })
      );
    }

    if (timerRef.current) clearInterval(timerRef.current);
    setRunning(false);
    setDone(true);
    runRef.current = false;
  }, [plan, running]);

  const handleReset = () => { runRef.current = false; if (timerRef.current) clearInterval(timerRef.current); resetPlan(selectedPlan); };

  const completedCount = plan.tasks.filter((t) => t.status === 'done').length;
  const progress = Math.round((completedCount / plan.tasks.length) * 100);

  // Build YAML output
  const yamlOutput = `# Agent Orchestrator Plan
# Generated by Elitze Hermes Engine

goal: "${plan.goal}"
execution_mode: ${plan.execution_mode}
final_step: ${plan.final_step}

tasks:${plan.tasks.map((t) => `
  - id: ${t.id}
    name: "${t.name}"
    agent: ${t.agent}
    dependencies: [${t.dependencies.join(', ')}]
    status: ${t.status}`).join('')}

# Execution Decision Tree:
# Step 1: Multi-step → YES → continue
# Step 2: Multi-domain → YES → multi-agent orchestration
# Step 3: Requires ordering → ${plan.execution_mode !== 'parallel' ? 'YES' : 'NO'} → ${plan.execution_mode} execution
# Step 4: Needs synthesis → YES → aggregator final pass`;

  const modeColor = { sequential: '#f97316', parallel: '#10b981', hybrid: '#6366f1' }[plan.execution_mode];

  return (
    <section id="orchestrator" className="relative py-28 px-6 lg:px-12 bg-[#070710] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-indigo-600/7 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-violet-600/7 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/5 mb-5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[11px] font-mono text-indigo-300 tracking-wider uppercase">
                  Agent Orchestrator Skill · v1.0 (Completed)
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Break → Assign →{' '}
                <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                  Coordinate → Deliver.
                </span>
              </h2>
              <p className="text-slate-400 mt-4 text-base max-w-2xl leading-relaxed">
                The Orchestrator is Elitze's coordination layer. It decomposes complex goals into structured
                task graphs, routes subtasks to specialist agents, manages dependencies, and assembles final output.
                It <span className="text-white font-medium">never solves everything itself</span> — it delegates.
              </p>
            </div>

            {/* Mode badge */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-2"
                style={{ borderColor: `${modeColor}40`, background: `${modeColor}12`, color: modeColor }}>
                <Zap className="w-3.5 h-3.5" />
                {plan.execution_mode.toUpperCase()} MODE
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white font-mono">{plan.tasks.length}</p>
                <p className="text-[10px] text-slate-500 uppercase">subtasks</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl border border-white/8 bg-white/[0.02] w-fit">
          {([
            { id: 'executor',  label: 'Live Executor', icon: Play },
            { id: 'routing',   label: 'Agent Routing', icon: GitBranch },
            { id: 'decision',  label: 'Decision Tree', icon: BarChart3 },
            { id: 'yaml',      label: 'YAML Output',   icon: FileCode2 },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-indigo-500/15 text-white border border-indigo-400/25'
                  : 'text-slate-500 hover:text-white'
              )}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT: Controls + Plan selector */}
          <div className="space-y-4">
            {/* Plan selector */}
            <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
              <p className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-3">Example Plans</p>
              <div className="space-y-2">
                {EXAMPLE_PLANS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPlan(i)}
                    className={cn(
                      'w-full text-left px-3 py-2.5 rounded-xl border text-xs transition-all',
                      selectedPlan === i
                        ? 'border-indigo-400/35 bg-indigo-500/10 text-white'
                        : 'border-white/5 text-slate-400 hover:border-white/15 hover:text-white'
                    )}
                  >
                    <p className="font-medium leading-tight line-clamp-2">{p.goal}</p>
                    <p className={cn('text-[9px] font-mono mt-1',
                      { sequential: 'text-orange-400', parallel: 'text-emerald-400', hybrid: 'text-indigo-400' }[p.execution_mode])}>
                      {p.execution_mode.toUpperCase()} · {p.tasks.length} tasks
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom goal input */}
            <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
              <p className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-3">Custom Goal</p>
              <textarea
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="Describe a complex project goal and the orchestrator will build a plan..."
                className="w-full bg-black/30 border border-white/8 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-700 focus:outline-none focus:border-indigo-400/40 resize-none leading-relaxed"
                rows={4}
              />
              <p className="text-[9px] text-slate-600 mt-1 font-mono">Hermes decomposes your goal via the Lobster pipeline</p>
            </div>

            {/* Run controls */}
            <div className="flex gap-2">
              <button
                onClick={runOrchestrator}
                disabled={running}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4" />
                {running ? `Running... ${elapsed}s` : done ? 'Run Again' : 'Run Orchestrator'}
              </button>
              <button onClick={handleReset} className="px-3 py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Progress */}
            {(running || done) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-slate-400">{completedCount}/{plan.tasks.length} tasks</span>
                  <span className={cn('text-xs font-mono font-bold', done ? 'text-emerald-400' : 'text-indigo-300')}>{progress}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, #6366f1, #06b6d4)` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                {done && (
                  <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-emerald-400 font-mono mt-2">
                    ✔ All tasks completed · {elapsed}s total
                  </motion.p>
                )}
              </motion.div>
            )}
          </div>

          {/* RIGHT: Main content panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* EXECUTOR TAB */}
              {activeTab === 'executor' && (
                <motion.div key="executor" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-white/8 bg-white/[0.02] mb-4">
                    <div>
                      <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-0.5">Current Goal</p>
                      <p className="text-sm font-medium text-white">{plan.goal}</p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-end gap-1">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border" style={{ borderColor: `${modeColor}40`, color: modeColor, background: `${modeColor}12` }}>
                        {plan.execution_mode}
                      </span>
                      <span className="text-[9px] font-mono text-slate-600">final: {plan.final_step}</span>
                    </div>
                  </div>
                  {plan.tasks.map((task, i) => (
                    <TaskRow key={task.id} task={task} index={i} />
                  ))}
                </motion.div>
              )}

              {/* ROUTING MAP TAB */}
              {activeTab === 'routing' && (
                <motion.div key="routing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <p className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-4">
                    // From: agent-routing-map.md
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {Object.entries(AGENT_ROUTING_MAP).map(([key, meta]) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-xl border hover:border-white/20 transition-all"
                        style={{ borderColor: `${meta.color}30`, background: `${meta.color}08` }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{meta.icon}</span>
                          <span className="text-xs font-bold text-white">{meta.label}</span>
                        </div>
                        <p className="text-[11px] font-mono mb-2" style={{ color: meta.color }}>{key}</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{meta.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* DECISION TREE TAB */}
              {activeTab === 'decision' && (
                <motion.div key="decision" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <p className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-5">
                    // Workflow Decision Tree — Steps 1–4
                  </p>
                  <div className="relative space-y-4">
                    {DECISION_TREE.map((node, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-4"
                      >
                        {/* Step number + connector */}
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center text-xs font-bold text-indigo-300">
                            {i + 1}
                          </div>
                          {i < DECISION_TREE.length - 1 && (
                            <div className="w-px flex-1 bg-gradient-to-b from-indigo-500/40 to-transparent mt-1 min-h-4" />
                          )}
                        </div>

                        <div className="pb-4 flex-1">
                          <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                            <p className="text-sm font-bold text-white mb-0.5">{node.question}</p>
                            <p className="text-[11px] text-slate-500 mb-3">{node.sub}</p>
                            <div className="grid sm:grid-cols-2 gap-2">
                              <div className="px-3 py-2 rounded-lg bg-emerald-500/8 border border-emerald-500/20">
                                <p className="text-[9px] font-mono text-emerald-400 uppercase mb-1">→ YES</p>
                                <p className="text-[11px] text-emerald-300">{node.yesPath}</p>
                              </div>
                              <div className="px-3 py-2 rounded-lg bg-indigo-500/8 border border-indigo-500/20">
                                <p className="text-[9px] font-mono text-indigo-400 uppercase mb-1">→ NO</p>
                                <p className="text-[11px] text-indigo-300">{node.noPath}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Execution modes */}
                  <div className="mt-6 p-5 rounded-xl border border-white/8 bg-white/[0.02]">
                    <p className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-3">Execution Modes</p>
                    <div className="grid grid-cols-3 gap-3">
                      {([
                        { mode: 'sequential', color: '#f97316', desc: 'Tasks run one at a time in dependency order. Maximum control.' },
                        { mode: 'parallel',   color: '#10b981', desc: 'All independent tasks run simultaneously. Maximum speed.' },
                        { mode: 'hybrid',     color: '#6366f1', desc: 'Dependency groups run sequentially; within groups, parallel.' },
                      ] as const).map((m) => (
                        <div key={m.mode} className="p-3 rounded-lg border" style={{ borderColor: `${m.color}30`, background: `${m.color}08` }}>
                          <p className="text-[10px] font-bold uppercase mb-1" style={{ color: m.color }}>{m.mode}</p>
                          <p className="text-[10px] text-slate-500 leading-relaxed">{m.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* YAML TAB */}
              {activeTab === 'yaml' && (
                <motion.div key="yaml" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div className="rounded-2xl border border-white/8 bg-black/60 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">yaml-task-graph-template.yaml</p>
                      <button
                        onClick={() => navigator.clipboard.writeText(yamlOutput)}
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors font-mono"
                      >
                        copy
                      </button>
                    </div>
                    <pre className="p-5 text-[11px] font-mono leading-relaxed overflow-x-auto text-emerald-300/90 max-h-[60vh] overflow-y-auto">
                      <code>{yamlOutput}</code>
                    </pre>
                  </div>

                  <div className="mt-4 grid sm:grid-cols-3 gap-3">
                    {[
                      { file: 'planner.py', desc: 'Builds task dependency graphs from goal input' },
                      { file: 'router.py',  desc: 'Assigns subtasks to the correct agent class' },
                      { file: 'executor.py',desc: 'Runs workflows, manages parallelism' },
                    ].map((f) => (
                      <div key={f.file} className="p-3 rounded-xl border border-white/8 bg-white/[0.02]">
                        <p className="text-xs font-mono text-indigo-300 mb-1">{f.file}</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom rule strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-400/25 flex items-center justify-center text-xl flex-shrink-0">🧠</div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white mb-1">The Orchestrator's Core Rule</p>
            <p className="text-xs text-slate-400 font-mono leading-relaxed">
              <span className="text-indigo-300">NEVER</span> directly solve everything itself unless the task is trivial.
              Instead: <span className="text-white">Break → Assign → Coordinate → Verify → Assemble</span>.
              Every subtask is routed to its specialist. Every handoff is logged. Every output is verified before assembly.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 text-[10px] font-mono text-indigo-400">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Hermes-coordinated
          </div>
        </motion.div>
      </div>
    </section>
  );
}
