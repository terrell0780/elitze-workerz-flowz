// ── REAL Flash Sale — 7-day opening promotion ──────────────────────────────
// Rules:
//   • Active for 7 full days from the user's first visit
//   • 50% off any order where subtotal ≥ $100 (after volume discounts)
//   • Free VIP Gold (7-day) automatically granted on qualifying orders
//   • Countdown shows days, hours, minutes, seconds live
//   • VIP status stored in localStorage with exact expiry timestamp
// ─────────────────────────────────────────────────────────────────────────────

const VISIT_KEY   = 'elitze_first_visit';
const VIP_KEY     = 'elitze_vip_expiry';
const VIP_TIER_KEY = 'elitze_vip_tier';
const SALE_MS     = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
const VIP_DAYS_MS = 7 * 24 * 60 * 60 * 1000; // 7-day VIP grant
const MIN_ORDER   = 100;                        // minimum for discount

// ── First visit tracking ─────────────────────────────────────────────────────
function getFirstVisitMs(): number {
  const stored = localStorage.getItem(VISIT_KEY);
  if (stored) return parseInt(stored, 10);
  const now = Date.now();
  localStorage.setItem(VISIT_KEY, String(now));
  return now;
}

export function isFlashSaleActive(): boolean {
  return Date.now() - getFirstVisitMs() < SALE_MS;
}

export function getSaleExpiryMs(): number {
  return getFirstVisitMs() + SALE_MS;
}

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

export function getCountdown(): Countdown {
  const remaining = getSaleExpiryMs() - Date.now();
  if (remaining <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const days    = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours   = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
  return { days, hours, minutes, seconds, expired: false };
}

// ── Discount calculation ─────────────────────────────────────────────────────
export interface DiscountResult {
  originalTotal: number;
  discountedTotal: number;
  savings: number;
  discountApplied: boolean;
  discountPercent: number;
  vipGranted: boolean;
  qualifiesForDiscount: boolean;
}

export function applyFlashDiscount(subtotal: number): DiscountResult {
  const active = isFlashSaleActive();
  const qualifies = subtotal >= MIN_ORDER;

  if (!active || !qualifies) {
    return {
      originalTotal: subtotal,
      discountedTotal: subtotal,
      savings: 0,
      discountApplied: false,
      discountPercent: 0,
      vipGranted: false,
      qualifiesForDiscount: qualifies,
    };
  }

  const discountedTotal = Math.round(subtotal * 0.5);
  return {
    originalTotal: subtotal,
    discountedTotal,
    savings: subtotal - discountedTotal,
    discountApplied: true,
    discountPercent: 50,
    vipGranted: true,
    qualifiesForDiscount: true,
  };
}

// ── VIP granting ─────────────────────────────────────────────────────────────
export function grantFlashVIP(): void {
  const expiry = Date.now() + VIP_DAYS_MS;
  localStorage.setItem(VIP_KEY, String(expiry));
  localStorage.setItem(VIP_TIER_KEY, 'gold');
}

export function getVIPStatus(): { active: boolean; tier: string; expiryMs: number; daysLeft: number } {
  const expiryStr = localStorage.getItem(VIP_KEY);
  const tier = localStorage.getItem(VIP_TIER_KEY) || 'none';
  if (!expiryStr) return { active: false, tier: 'none', expiryMs: 0, daysLeft: 0 };
  const expiryMs = parseInt(expiryStr, 10);
  const now = Date.now();
  if (now >= expiryMs) {
    // VIP expired — clean up
    localStorage.removeItem(VIP_KEY);
    localStorage.removeItem(VIP_TIER_KEY);
    return { active: false, tier: 'none', expiryMs: 0, daysLeft: 0 };
  }
  const daysLeft = Math.ceil((expiryMs - now) / (24 * 60 * 60 * 1000));
  return { active: true, tier, expiryMs, daysLeft };
}

// ── Legacy helper (used in banner) ───────────────────────────────────────────
export function getDaysRemaining(): number {
  const remaining = getSaleExpiryMs() - Date.now();
  return Math.max(0, Math.ceil(remaining / (24 * 60 * 60 * 1000)));
}
