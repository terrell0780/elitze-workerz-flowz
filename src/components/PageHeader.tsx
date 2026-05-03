import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface PageHeaderProps {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  isDark: boolean;
  action?: React.ReactNode;
}

export default function PageHeader({ title, description, breadcrumbs, isDark, action }: PageHeaderProps) {
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';
  const textM = isDark ? 'text-slate-500' : 'text-slate-400';

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 mb-3" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className={`w-3.5 h-3.5 ${textM}`} />}
            {crumb.active ? (
              <span className={`text-sm font-medium ${textP}`} aria-current="page">{crumb.label}</span>
            ) : (
              <span className={`text-sm ${textM} hover:${isDark ? 'text-slate-300' : 'text-slate-600'} cursor-pointer transition-colors`}>{crumb.label}</span>
            )}
          </div>
        ))}
      </nav>

      {/* Title & Description */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${textP}`}>{title}</h1>
          <p className={`mt-1 ${textS}`}>{description}</p>
        </div>
        {action && <div>{action}</div>}
      </div>
    </motion.div>
  );
}
