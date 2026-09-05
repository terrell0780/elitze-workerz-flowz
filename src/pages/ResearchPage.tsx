import { useState } from 'react';
import { Search, ExternalLink, ShieldCheck } from 'lucide-react';

const presets = [
  'best virtual assistant hiring platforms',
  'AI recruiting assistant resume screening',
  'remote team management tools Asana Trello Zapier',
  'HireVue AI interview analysis',
  'GoHighLevel recruiting CRM workflows',
];

export function ResearchPage() {
  const [query, setQuery] = useState('AI employee hiring agency');

  function openDuckDuckGo(q = query) {
    const clean = q.trim();
    if (!clean) return;
    window.open(`https://duckduckgo.com/?q=${encodeURIComponent(clean)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="min-h-screen bg-[#050608] px-6 lg:px-10 py-10">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-mono text-blue-400 uppercase tracking-[0.25em] mb-3">// DuckDuckGo Research</p>
        <h1 className="text-4xl font-bold text-white mb-4">Private market research workspace</h1>
        <p className="text-slate-400 max-w-2xl mb-8">
          Use DuckDuckGo to research hiring tools, virtual employee trends, competitors, and market positioning without leaving the Zevanto workspace.
        </p>

        <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] mb-8">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') openDuckDuckGo(); }}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-400/50"
                placeholder="Search DuckDuckGo..."
              />
            </div>
            <button onClick={() => openDuckDuckGo()} className="px-5 py-3 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
              Search <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {presets.map((p) => (
            <button key={p} onClick={() => openDuckDuckGo(p)} className="text-left p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-colors">
              <p className="text-sm text-white font-medium">{p}</p>
              <p className="text-[10px] text-slate-500 mt-1">Open in DuckDuckGo</p>
            </button>
          ))}
        </div>

        <div className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 flex gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-white mb-1">Research stays user-controlled</p>
            <p className="text-sm text-slate-400">
              Zevanto opens DuckDuckGo in a new tab. No hidden scraping, no stored search history, and no background tracking inside this app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}