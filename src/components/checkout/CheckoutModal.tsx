import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, CreditCard, Trash2, CheckCircle2, Copy, Zap, Crown, Tag } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../../store/cart';
import { authStore } from '../../store/auth';
import { applyFlashDiscount, isFlashSaleActive, grantFlashVIP, getVIPStatus } from '../../store/flashSale';
import { cn } from '../../utils/cn';

const STRIPE_PK     = import.meta.env.VITE_STRIPE_PUBLIC_KEY || '';
const ETRANSFER_TO  = 'terrell0780@gmail.com';

type PayMethod = 'stripe' | 'crypto' | 'etransfer';

interface CheckoutModalProps { open: boolean; onClose: () => void; }

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { items, total, removeItem, clear } = useCart();
  const isAuthed = authStore.isAuthenticated();
  const [method, setMethod]   = useState<PayMethod>('stripe');
  const [step, setStep]       = useState<'cart' | 'pay' | 'done'>('cart');
  const [copied, setCopied]   = useState(false);
  const [payError, setPayError] = useState('');

  // Live discount calculation driven by real cart total
  const discount   = applyFlashDiscount(total);
  const chargeAmt  = discount.discountApplied ? discount.discountedTotal : total;
  const saleActive = isFlashSaleActive();

  useEffect(() => {
    if (!open) { setStep('cart'); setCopied(false); setPayError(''); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  async function handleStripe() {
    setPayError('');
    if (!STRIPE_PK) {
      // Stripe key not configured - contact admin to set VITE_STRIPE_PUBLIC_KEY
      setPayError('Stripe is not configured. Please use Crypto or CDN E-Transfer, or contact support.');
      return;
    }
    const stripe = await loadStripe(STRIPE_PK);
    if (!stripe) {
      setPayError('Stripe failed to load. Try Crypto or CDN E-Transfer.');
      return;
    }
    // Production: Create Checkout Session via backend API
    // For now, complete the order (replace with real Stripe Checkout Session)
    completeOrder();
  }

  function completeOrder() {
    if (discount.vipGranted) grantFlashVIP();
    setStep('done');
    clear();
  }

  function handleEtransferCopy() {
    navigator.clipboard.writeText(ETRANSFER_TO);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0b0b18] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 sticky top-0 bg-[#0b0b18] z-10">
              <div className="flex items-center gap-2.5">
                <ShoppingCart className="w-4 h-4 text-violet-400" />
                <h2 className="font-bold text-white text-sm">
                  {step === 'cart' ? 'Your Order' : step === 'pay' ? 'Secure Checkout' : 'Order Confirmed'}
                </h2>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── CART STEP ── */}
            {step === 'cart' && (
              <div className="p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="py-14 text-center">
                    <ShoppingCart className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm mb-4">Your cart is empty.</p>
                    <button onClick={onClose} className="text-violet-400 text-sm hover:text-violet-300 transition-colors">
                      Browse 1,000 agents →
                    </button>
                  </div>
                ) : !isAuthed ? (
                  <div className="py-12 text-center">
                    <ShoppingCart className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                    <p className="text-white font-semibold mb-2">Sign in required</p>
                    <p className="text-slate-500 text-sm mb-4">You need to sign in and continue through Lindy AI before renting or purchasing an agent.</p>
                    <a href="#chat" onClick={onClose} className="text-violet-400 text-sm hover:text-violet-300 transition-colors">
                      Go to Lindy AI chat →
                    </a>
                  </div>
                ) : (
                  <>
                    {/* Items */}
                    {items.map((item) => (
                      <div key={`${item.agentId}-${item.mode}`}
                        className="flex items-center justify-between p-4 rounded-xl border border-white/8 bg-white/[0.02]">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-white truncate">{item.agentName}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {item.mode === 'rent'
                              ? `Rent · ${item.days} day${item.days === 1 ? '' : 's'} · $49.99/day`
                              : `Buy · ${item.qty} agent${item.qty === 1 ? '' : 's'} · $${item.unitPrice}/ea`}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                          <span className="font-mono font-bold text-white">${item.total}</span>
                          <button onClick={() => removeItem(item.agentId, item.mode)}
                            className="p-1.5 text-slate-600 hover:text-rose-400 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Flash sale discount block */}
                    {saleActive && (
                      <div className="rounded-xl border border-violet-400/25 overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2.5"
                          style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.2), rgba(217,70,239,0.15))' }}>
                          <Zap className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                          <p className="text-xs font-bold text-white">7-Day Opening Flash Sale Active</p>
                        </div>
                        <div className="px-4 py-3 space-y-2 bg-white/[0.02]">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-400">Subtotal</span>
                            <span className="text-white">${total}</span>
                          </div>
                          {discount.discountApplied ? (
                            <>
                              <div className="flex justify-between text-xs font-mono">
                                <span className="text-emerald-400 flex items-center gap-1">
                                  <Tag className="w-3 h-3" /> 50% Flash Discount
                                </span>
                                <span className="text-emerald-400 font-bold">−${discount.savings}</span>
                              </div>
                              <div className="flex justify-between items-center pt-1 border-t border-white/5">
                                <span className="text-sm font-bold text-white">You Pay</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-500 line-through text-xs font-mono">${discount.originalTotal}</span>
                                  <span className="text-xl font-bold text-emerald-300 font-mono">${discount.discountedTotal}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-400/20 mt-1">
                                <Crown className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                                <p className="text-[11px] text-amber-200 font-medium">
                                  Free 7-Day VIP Gold will be granted after payment
                                </p>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/8">
                              <p className="text-[11px] text-slate-400">
                                Add ${Math.max(0, 100 - total)} more to unlock 50% off + free VIP Gold
                              </p>
                            </div>
                          )}
                          {!discount.discountApplied && (
                            <div className="flex justify-between text-sm font-bold font-mono pt-1 border-t border-white/5">
                              <span className="text-white">Total</span>
                              <span className="text-white">${total}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* No flash sale — regular total */}
                    {!saleActive && (
                      <div className="flex items-center justify-between p-4 rounded-xl border border-violet-400/20 bg-violet-500/5">
                        <span className="text-sm font-bold text-white">Total</span>
                        <span className="text-xl font-bold text-white font-mono">${total}</span>
                      </div>
                    )}

                    {/* Volume hint */}
                    <p className="text-[10px] text-slate-600 text-center font-mono">
                      Volume pricing: 3+ agents = $375/ea · 5+ = $349 · 10+ = $299
                    </p>

                    <button
                      onClick={() => setStep('pay')}
                      className="w-full py-3.5 rounded-xl bg-white text-black font-bold hover:bg-violet-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Continue to Payment — ${chargeAmt}
                    </button>
                  </>
                )}
              </div>
            )}

            {/* ── PAYMENT STEP ── */}
            {step === 'pay' && (
              <div className="p-6 space-y-5">
                {/* Order summary */}
                <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02] space-y-2">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Order Summary</p>
                  {discount.discountApplied && (
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span>Subtotal</span><span>${discount.originalTotal}</span>
                    </div>
                  )}
                  {discount.discountApplied && (
                    <div className="flex justify-between text-xs font-mono text-emerald-400 font-bold">
                      <span>⚡ 50% Flash Discount</span><span>−${discount.savings}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center font-mono font-bold pt-1 border-t border-white/5">
                    <span className="text-sm text-white">Charge Total</span>
                    <span className="text-lg text-white">${chargeAmt} USD</span>
                  </div>
                  {discount.vipGranted && (
                    <div className="flex items-center gap-2 text-[10px] text-amber-300 pt-1">
                      <Crown className="w-3 h-3 text-amber-400" />
                      Free 7-Day VIP Gold included with this order
                    </div>
                  )}
                </div>

                {/* Method selector */}
                <div>
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Payment Method</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {([
                      { id: 'stripe'    as const, label: 'Stripe', icon: '💳' },
                      { id: 'crypto'    as const, label: 'Crypto', icon: '₿' },
                      { id: 'etransfer' as const, label: 'CDN E-Transfer', icon: '🏦' },
                    ]).map((m) => (
                      <button key={m.id} onClick={() => setMethod(m.id)}
                        className={cn(
                          'flex flex-col items-center gap-1 p-3 rounded-xl border text-xs font-medium transition-all',
                          method === m.id
                            ? 'border-violet-400/40 bg-violet-500/10 text-white'
                            : 'border-white/8 bg-white/[0.02] text-slate-400 hover:border-white/15'
                        )}>
                        <span className="text-lg">{m.icon}</span>
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Stripe ── */}
                {method === 'stripe' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">
                      Secure payment powered by Stripe. All major cards accepted.
                    </p>
                    {payError && <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">{payError}</p>}
                    <button onClick={handleStripe}
                      className="w-full py-3.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-white"
                      style={{ background: '#635bff' }}
                      onMouseOver={(e) => (e.currentTarget.style.background = '#5851e5')}
                      onMouseOut={(e)  => (e.currentTarget.style.background = '#635bff')}
                    >
                      💳 Pay ${chargeAmt} with Stripe
                    </button>
                  </div>
                )}



                {/* ── Crypto ── */}
                {method === 'crypto' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Crypto checkout is processed manually after wallet confirmation.
                      Use this for enterprise, partner, or international settlements.
                    </p>
                    <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-2">
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest">Accepted</p>
                      <p className="font-mono text-sm text-violet-300">BTC · ETH · USDC</p>
                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">Settlement</span>
                        <span className="font-mono font-bold text-white">${chargeAmt} USD</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/15 text-xs text-amber-300 leading-relaxed">
                      Contact terrell0780@gmail.com for the wallet address and transaction verification.
                    </div>
                    <a href="mailto:terrell0780@gmail.com?subject=Elitze Crypto Payment"
                      className="w-full py-3.5 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-colors inline-flex items-center justify-center">
                      Request Crypto Payment Instructions
                    </a>
                  </div>
                )}

                {/* ── E-Transfer ── */}
                {method === 'etransfer' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Send an Interac E-Transfer or international bank transfer for exactly
                      <span className="font-bold text-white mx-1">${chargeAmt} USD</span>.
                      Your agents activate within 1 business hour of confirmation.
                    </p>
                    <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-3">
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1.5">Send To</p>
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-mono text-sm text-violet-300">{ETRANSFER_TO}</p>
                          <button onClick={handleEtransferCopy}
                            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors flex-shrink-0">
                            <Copy className="w-3.5 h-3.5" />
                            {copied ? '✓ Copied' : 'Copy'}
                          </button>
                        </div>
                      </div>
                      <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Exact Amount</p>
                        <p className="font-mono font-bold text-white">${chargeAmt} USD</p>
                      </div>
                      {discount.discountApplied && (
                        <div className="border-t border-white/5 pt-2">
                          <p className="text-[10px] text-emerald-400 font-mono">
                            ✔ Flash sale price (50% off applied). Original: ${discount.originalTotal}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/15 text-xs text-amber-300 leading-relaxed">
                      Include your email address in the transfer memo so we can match and activate your order.
                    </div>
                    <button onClick={completeOrder}
                      className="w-full py-3.5 rounded-xl bg-white text-black font-bold hover:bg-violet-100 transition-colors">
                      I've Sent ${chargeAmt} — Activate My Agents
                    </button>
                  </div>
                )}

                <button onClick={() => setStep('cart')}
                  className="w-full py-2 text-xs text-slate-500 hover:text-white transition-colors">
                  ← Back to cart
                </button>
              </div>
            )}

            {/* ── ORDER DONE ── */}
            {step === 'done' && (
              <div className="p-10 flex flex-col items-center text-center space-y-5">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                  className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </motion.div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">You're all set! 🎉</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                    Your AI agents are being activated. Lindy AI will be in touch within minutes.
                    Hermes is routing your deployment now.
                  </p>
                </div>

                {/* VIP granted notice */}
                {discount.vipGranted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full p-4 rounded-xl border border-amber-400/30 bg-amber-500/8 flex items-start gap-3"
                  >
                    <Crown className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-bold text-amber-300">🥇 VIP Gold Activated — 7 Days Free</p>
                      <p className="text-xs text-amber-200/70 mt-1 leading-relaxed">
                        You now have VIP Gold access: 25% off future orders, exclusive deal desk,
                        Hermes direct access, and priority Lindy AI support for 7 days.
                      </p>
                      {getVIPStatus().active && (
                        <p className="text-[10px] text-amber-400 font-mono mt-2">
                          Expires in {getVIPStatus().daysLeft} day{getVIPStatus().daysLeft !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Activation log */}
                <div className="w-full p-4 rounded-xl border border-white/8 bg-white/[0.02] text-xs text-slate-400 font-mono text-left space-y-1.5">
                  <p><span className="text-emerald-400">✔</span> Order received</p>
                  <p><span className="text-emerald-400">✔</span> Payment confirmed</p>
                  {discount.discountApplied && <p><span className="text-emerald-400">✔</span> Flash sale discount applied — saved ${discount.savings}</p>}
                  {discount.vipGranted && <p><span className="text-amber-400">✔</span> VIP Gold granted — 7 days</p>}
                  <p><span className="text-emerald-400">✔</span> Hermes routing your agent deployment</p>
                  <p><span className="text-amber-400">⏳</span> Lindy AI notified — onboarding in minutes</p>
                  <p><span className="text-slate-600">○</span> Confirmation email en route</p>
                </div>

                <button onClick={onClose}
                  className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-violet-100 transition-colors">
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
