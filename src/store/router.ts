// ── Client-side router — no React Router needed ──────────────────────────────
// Uses hash-based routing so it works in static hosting (Vercel, etc.)

export type PageId =
  | 'home'
  | 'agents'
  | 'hire'
  | 'orchestrator'
  | 'workflow'
  | 'behavior'
  | 'hiring-guide'
  | 'trust'
  | 'integrations'
  | 'analytics'
  | 'assessments'
  | 'onboarding'
  | 'controls'
  | 'status'
  | 'research'
  | 'chat'
  | 'eliteze-system'
  | 'checkout'
  | 'compare'
  | 'leaderboard'
  | 'security'
  | 'faq'
  | 'ecosystem'
  | 'community'
  | 'legal'
  | 'admin'
  | 'testimonials';

let _current: PageId = 'home';
let _listeners: Array<() => void> = [];

function readHash(): PageId {
  const h = window.location.hash.replace('#', '') as PageId;
  const valid: PageId[] = ['home','agents','hire','orchestrator','workflow','behavior','hiring-guide','trust','integrations','analytics','assessments','onboarding','controls','status','research','chat','eliteze-system','checkout','compare','leaderboard','security','faq','ecosystem','community','legal','admin','testimonials'];
  return valid.includes(h) ? h : 'home';
}

function notify() { _listeners.forEach((l) => l()); }

// Init from URL
_current = readHash();
window.addEventListener('hashchange', () => {
  _current = readHash();
  window.scrollTo(0, 0);
  notify();
});

export const router = {
  get current() { return _current; },
  go(page: PageId) {
    window.location.hash = page;
    _current = page;
    window.scrollTo(0, 0);
    notify();
  },
  subscribe(fn: () => void) {
    _listeners.push(fn);
    return () => { _listeners = _listeners.filter((l) => l !== fn); };
  },
};


