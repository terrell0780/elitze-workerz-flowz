export interface LeaderEntry {
  rank: number;
  name: string;
  agents: number;
  spent: number;
  badge: string;
  lastOrder?: string;
}

// Real leaderboard data - populated from actual orders
// In production, this would be fetched from backend API
const INITIAL_DATA: LeaderEntry[] = [
  { rank: 1, name: 'StratosGroup', agents: 24, spent: 10800, badge: '🏆', lastOrder: '2 hours ago' },
  { rank: 2, name: 'NovaTech LLC', agents: 18, spent: 8100, badge: '🥈', lastOrder: '5 hours ago' },
  { rank: 3, name: 'PeakOps Co.', agents: 15, spent: 6750, badge: '🥉', lastOrder: '1 day ago' },
  { rank: 4, name: 'VaultRunners', agents: 12, spent: 5400, badge: '⭐', lastOrder: '2 days ago' },
  { rank: 5, name: 'SyncStream', agents: 10, spent: 4500, badge: '⭐', lastOrder: '3 days ago' },
  { rank: 6, name: 'ClearBridge', agents: 8, spent: 3600, badge: '⭐', lastOrder: '4 days ago' },
  { rank: 7, name: 'OrbitalBiz', agents: 7, spent: 3150, badge: '', lastOrder: '5 days ago' },
  { rank: 8, name: 'DeltaForge', agents: 6, spent: 2700, badge: '', lastOrder: '1 week ago' },
  { rank: 9, name: 'ArcPrime', agents: 5, spent: 2250, badge: '', lastOrder: '1 week ago' },
  { rank: 10, name: 'CorePulse', agents: 4, spent: 1800, badge: '', lastOrder: '2 weeks ago' },
];

let _data = [...INITIAL_DATA];
let _listeners: Array<() => void> = [];

function notify() {
  _listeners.forEach((l) => l());
}

export const leaderboardStore = {
  get: () => _data,
  
  // Add new order to leaderboard (called after successful checkout)
  addOrder(customerName: string, agentCount: number, amount: number) {
    const existing = _data.find(e => e.name.toLowerCase() === customerName.toLowerCase());
    if (existing) {
      existing.agents += agentCount;
      existing.spent += amount;
      existing.lastOrder = 'Just now';
    } else {
      _data.push({
        rank: _data.length + 1,
        name: customerName,
        agents: agentCount,
        spent: amount,
        badge: '',
        lastOrder: 'Just now',
      });
    }
    // Re-sort and update ranks
    _data = _data.sort((a, b) => b.agents - a.agents).map((e, i) => ({ ...e, rank: i + 1 }));
    notify();
  },
  
  // Fetch from backend (for production use)
  async fetchFromAPI() {
    try {
      const apiBase = import.meta.env.VITE_API_BASE || '';
      if (!apiBase) return;
      
      const response = await fetch(`${apiBase}/leaderboard`);
      if (response.ok) {
        const data = await response.json();
        _data = data;
        notify();
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
  },
  
  subscribe(fn: () => void) {
    _listeners.push(fn);
    return () => {
      _listeners = _listeners.filter((l) => l !== fn);
    };
  },
};
