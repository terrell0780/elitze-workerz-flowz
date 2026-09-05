import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { FlashSaleBanner } from './components/FlashSaleBanner';
import { PageTransition3D } from './components/PageTransition3D';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';
import { Breadcrumbs } from './components/Breadcrumbs';
import { SEO } from './components/SEO';
import { CommandPalette } from './components/CommandPalette';
import { OnboardingTour } from './components/OnboardingTour';
import { router, type PageId } from './store/router';

// Pages
import { HomePage }         from './pages/HomePage';
import { AgentsPage }       from './pages/AgentsPage';
import { HirePage }         from './pages/HirePage';
import { ChatPage }         from './pages/ChatPage';
import { ResearchPage }     from './pages/ResearchPage';
import { ElitzeSystemPage } from './pages/ElitzeSystemPage';
import { LegalPage }        from './pages/LegalPage';
import { TrustCenterPage }  from './pages/TrustCenterPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { AnalyticsPage }    from './pages/AnalyticsPage';
import { AssessmentsPage }  from './pages/AssessmentsPage';
import { OnboardingPage }   from './pages/OnboardingPage';
import { ControlsPage }     from './pages/ControlsPage';
import { StatusPage }       from './pages/StatusPage';

// Sections used as pages
import { OrchestratorSkill } from './components/sections/OrchestratorSkill';
import { HiringGuide }      from './components/sections/HiringGuide';
import { BehavioralFlow }    from './components/sections/BehavioralFlow';
import { LobsterWorkflow }   from './components/LobsterWorkflow';
import { Comparison }        from './components/sections/Comparison';
import { Ecosystem }         from './components/sections/Ecosystem';
import { Community }         from './components/sections/Community';
import { Testimonials }      from './components/sections/Testimonials';
import { Leaderboard }       from './components/sections/Leaderboard';
import { FAQ }               from './components/sections/FAQ';
import { Security }          from './components/sections/Security';
import { Footer }            from './components/Footer';

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22 }}
      className="flex-1 min-h-screen"
    >
      {children}
    </motion.div>
  );
}

function ScrollPage({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <div className="overflow-y-auto">{children}<Footer /></div>
    </PageShell>
  );
}

export default function App() {
  const [page, setPage] = useState<PageId>(router.current);
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    return router.subscribe(() => setPage(router.current));
  }, []);

  // Admin PIN check — if navigating to admin via router, open panel
  useEffect(() => {
    if (page === 'admin') { setAdminOpen(true); }
  }, [page]);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  return (
    <div className="professional-theme flex h-screen overflow-hidden bg-[#050508] text-slate-200 antialiased selection:bg-slate-500/30 selection:text-white">
      {/* 3D page transition overlay */}
      <PageTransition3D />
      <SEO page={page} />

      {/* Modals — rendered outside layout */}
      <CheckoutModal open={cartOpen} onClose={closeCart} />
      <AdminPanel open={adminOpen} onClose={() => { setAdminOpen(false); router.go('home'); }} />
      <CommandPalette />
      <OnboardingTour />

      {/* Left sidebar — always visible */}
      <Sidebar onCartOpen={openCart} />

      {/* Main content area — scrolls independently */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Flash sale banner at top of content */}
        <FlashSaleBanner />
        <Breadcrumbs page={page} />

        {/* Page content */}
        <div className="flex-1 overflow-y-auto relative scroll-smooth" id="main-scroll">
          <AnimatePresence mode="wait">
            {page === 'home' && (
              <PageShell key="home"><HomePage onCartOpen={openCart} /></PageShell>
            )}
            {page === 'agents' && (
              <PageShell key="agents"><AgentsPage onCartOpen={openCart} /></PageShell>
            )}
            {page === 'hire' && (
              <PageShell key="hire"><HirePage onCartOpen={openCart} /></PageShell>
            )}
            {page === 'chat' && (
              <PageShell key="chat"><ChatPage onCartOpen={openCart} /></PageShell>
            )}
            {page === 'hiring-guide' && (
              <ScrollPage key="hiring-guide"><HiringGuide /></ScrollPage>
            )}
            {page === 'trust' && (
              <PageShell key="trust"><TrustCenterPage /></PageShell>
            )}
            {page === 'integrations' && (
              <PageShell key="integrations"><IntegrationsPage /></PageShell>
            )}
            {page === 'analytics' && (
              <PageShell key="analytics"><AnalyticsPage /></PageShell>
            )}
            {page === 'assessments' && (
              <PageShell key="assessments"><AssessmentsPage /></PageShell>
            )}
            {page === 'onboarding' && (
              <PageShell key="onboarding"><OnboardingPage /></PageShell>
            )}
            {page === 'controls' && (
              <PageShell key="controls"><ControlsPage /></PageShell>
            )}
            {page === 'status' && (
              <PageShell key="status"><StatusPage /></PageShell>
            )}
            {page === 'research' && (
              <PageShell key="research"><ResearchPage /></PageShell>
            )}
            {page === 'eliteze-system' && (
              <PageShell key="eliteze-system"><ElitzeSystemPage /></PageShell>
            )}
            {page === 'legal' && (
              <PageShell key="legal"><LegalPage /></PageShell>
            )}
            {page === 'behavior' && (
              <ScrollPage key="behavior"><BehavioralFlow /></ScrollPage>
            )}
            {page === 'orchestrator' && (
              <ScrollPage key="orchestrator"><OrchestratorSkill /></ScrollPage>
            )}
            {page === 'workflow' && (
              <ScrollPage key="workflow"><LobsterWorkflow /></ScrollPage>
            )}
            {page === 'compare' && (
              <ScrollPage key="compare"><Comparison /></ScrollPage>
            )}
            {page === 'ecosystem' && (
              <ScrollPage key="ecosystem"><Ecosystem /></ScrollPage>
            )}
            {page === 'community' && (
              <ScrollPage key="community"><Community /></ScrollPage>
            )}
            {page === 'testimonials' && (
              <ScrollPage key="testimonials"><Testimonials /></ScrollPage>
            )}
            {page === 'leaderboard' && (
              <ScrollPage key="leaderboard"><Leaderboard /></ScrollPage>
            )}
            {page === 'faq' && (
              <ScrollPage key="faq"><FAQ /></ScrollPage>
            )}
            {page === 'security' && (
              <ScrollPage key="security"><Security /></ScrollPage>
            )}
            {/* admin is handled by modal — show home behind it */}
            {page === 'admin' && (
              <PageShell key="admin-home"><HomePage onCartOpen={openCart} /></PageShell>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
