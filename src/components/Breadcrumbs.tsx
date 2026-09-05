import { ChevronRight, Home } from 'lucide-react';
import { PageId, router } from '../store/router';
import { PAGE_META } from '../data/pageMeta';

export function Breadcrumbs({ page }: { page: PageId }) {
  if (page === 'home') return null;
  const meta = PAGE_META[page];
  return (
    <nav className="sticky top-0 z-30 border-b border-white/5 bg-[#050608]/85 backdrop-blur-xl px-6 lg:px-10 py-3">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <button onClick={() => router.go('home')} className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Home className="w-3.5 h-3.5" /> Elitze
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
        <span className="text-slate-300">{meta.crumb}</span>
      </div>
    </nav>
  );
}