import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ShoppingCart, Sparkles, Crown, Phone, Mail, ArrowLeftRight } from 'lucide-react';
import { detectIntent, lindaResponse, hermesResponse, type ChatMessage, type VIPTier } from '../store/chat';
import { cartStore } from '../store/cart';
import { cn } from '../utils/cn';

let _msgId = 0;
const uid = () => `msg-${++_msgId}-${Date.now()}`;
const TYPING_MS = 900;

interface ChatWindowProps { onOpenCart: () => void; }

type ActiveAgent = 'linda' | 'hermes';

export function ChatWindow({ onOpenCart }: ChatWindowProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [vipTier, setVipTier] = useState<VIPTier>('none');
  const [vipModalOpen, setVipModalOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [activeAgent, setActiveAgent] = useState<ActiveAgent>('linda');
  const [csmMode, setCsmMode] = useState<'chat' | 'call' | 'email' | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setUnread(0);
    if (messages.length === 0) {
      pushMsg('linda', `Welcome to Elitze One Stop Shop. I am Lindy AI, your customer service supervisor. I can help with hiring, billing, agent matching, and account support. If your request needs deeper strategy, I can bring in Hermes.`);
    }
    setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open]);

  function pushMsg(sender: ChatMessage['sender'], text: string, offer?: ChatMessage['offer']) {
    setMessages((m) => [...m, { id: uid(), sender, text, timestamp: new Date(), offer }]);
  }

  function switchAgent(to: ActiveAgent) {
    setActiveAgent(to);
    const msg = to === 'hermes'
      ? `Switching you over to Hermes now. He's our Head of Intelligence — people call him The Brain for good reason. He'll take it from here.`
      : `Hermes has briefed me. Lindy AI is back online. What else can I help with?`;
    pushMsg('linda', msg);
  }

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    // Intercept switch commands
    if (/switch to hermes/i.test(text)) {
      setMessages((m) => [...m, { id: uid(), sender: 'user', text, timestamp: new Date() }]);
      setInput('');
      setIsTyping(true);
      setTimeout(() => { setIsTyping(false); switchAgent('hermes'); }, TYPING_MS);
      return;
    }
    if (/switch to (lindy|linda)/i.test(text)) {
      setMessages((m) => [...m, { id: uid(), sender: 'user', text, timestamp: new Date() }]);
      setInput('');
      setIsTyping(true);
      setTimeout(() => { setIsTyping(false); switchAgent('linda'); }, TYPING_MS);
      return;
    }

    setMessages((m) => [...m, { id: uid(), sender: 'user', text: text.trim(), timestamp: new Date() }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (activeAgent === 'hermes') {
        pushMsg('hermes', hermesResponse(text, vipTier));
      } else {
        const intent = detectIntent(text);
        const raw = lindaResponse(intent, vipTier, text);
        if (typeof raw === 'object' && raw !== null && 'label' in raw) {
          pushMsg('linda', `I've got an exclusive offer for you, ${vipTier.toUpperCase()} member:`, raw);
        } else {
          pushMsg('linda', typeof raw === 'string' ? raw : String(raw));
        }
        // Auto-escalate complex/technical to Hermes
        if (['complex', 'technical', 'hermes'].includes(intent) && activeAgent === 'linda') {
          setTimeout(() => {
            pushMsg('linda', 'This one is better handled by Hermes. Switching you over now...');
            setTimeout(() => { setActiveAgent('hermes'); pushMsg('hermes', hermesResponse(text, vipTier)); }, 800);
          }, 600);
        }
      }
      if (!open) setUnread((n) => n + 1);
    }, TYPING_MS);
  }, [vipTier, activeAgent, open]);

  function handleOfferAccept(offer: NonNullable<ChatMessage['offer']>) {
    cartStore.addItem({ agentId: offer.agentId || 'vip-offer', agentName: offer.label, mode: 'buy', qty: 1, unitPrice: offer.offerPrice, total: offer.offerPrice });
    sendMessage(`I'll take the offer at $${offer.offerPrice}.`);
    onOpenCart();
  }

  const quickReplies = activeAgent === 'linda'
    ? ['Show me pricing', 'Browse agents', 'Flash sale?', 'Tell me about VIP', 'Switch to Hermes']
    : ['Tell me about the architecture', 'API integration help', 'Enterprise pricing', 'Security & compliance', 'Switch to Lindy AI'];

  const agentMeta = {
    linda: { name: 'Lindy AI', role: 'Customer Service Supervisor', avatar: 'LY', avatarColor: 'from-slate-700 to-slate-900', dotColor: 'bg-emerald-400' },
    hermes: { name: 'Hermes', role: 'Manager · The Big Brain', avatar: 'HM', avatarColor: 'from-slate-800 to-black', dotColor: 'bg-indigo-400' },
  }[activeAgent];

  return (
    <>
      {/* Floating trigger */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="bg-[#0f0f1e] border border-white/10 rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2 cursor-pointer hover:border-violet-400/30 transition-colors"
              onClick={() => setOpen(true)}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white font-medium">Lindy AI & Hermes online</span>
              <span className="text-slate-500 text-xs">— ask anything</span>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
          onClick={() => setOpen(!open)}
          className="relative w-16 h-16 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #a855f7, #d946ef)' }}
          aria-label="Open chat"
        >
          {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
          {unread > 0 && !open && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unread}</span>
          )}
        </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 right-6 z-[90] w-[390px] max-w-[calc(100vw-1.5rem)] flex flex-col rounded-2xl border border-white/10 bg-[#0a0a16] shadow-2xl overflow-hidden"
            style={{ maxHeight: '76vh' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8 flex-shrink-0"
              style={{ background: activeAgent === 'hermes' ? 'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.08))' : 'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(217,70,239,0.08))' }}
            >
              <div className="relative flex-shrink-0">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agentMeta.avatarColor} flex items-center justify-center text-white font-bold text-sm`}>{agentMeta.avatar}</div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${agentMeta.dotColor} rounded-full border-2 border-[#0a0a16]`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">{agentMeta.name}</p>
                <p className="text-[10px] text-slate-400">{agentMeta.role}</p>
              </div>
              <div className="flex items-center gap-1">
                {vipTier !== 'none' && (
                  <div className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/25 flex items-center gap-1">
                    <Crown className="w-2.5 h-2.5 text-amber-400" />
                    <span className="text-[9px] font-bold text-amber-300 uppercase">{vipTier}</span>
                  </div>
                )}
                <button onClick={() => switchAgent(activeAgent === 'linda' ? 'hermes' : 'linda')} title={`Switch to ${activeAgent === 'linda' ? 'Hermes' : 'Lindy AI'}`}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-violet-400 transition-colors">
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setVipModalOpen(true)} className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 transition-colors" title="VIP Plans">
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setCsmMode('call')} className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-400 transition-colors" title="Schedule a call">
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setCsmMode('email')} className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 transition-colors" title="Send email">
                  <Mail className="w-3.5 h-3.5" />
                </button>
                <button onClick={onOpenCart} className="p-1.5 rounded-lg text-slate-500 hover:text-violet-400 transition-colors" title="Cart">
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CSM modes */}
            <AnimatePresence>
              {csmMode && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="border-b border-white/8 overflow-hidden flex-shrink-0">
                  {csmMode === 'call' && (
                    <div className="px-5 py-4">
                      <p className="text-sm font-bold text-white mb-1">Schedule a Call</p>
                      <p className="text-xs text-slate-400 mb-3">VIP Gold & Partner members get priority scheduling. All others within 48h.</p>
                      <a href="mailto:terrell0780@gmail.com?subject=Elitze Call Request" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/15 border border-emerald-400/25 rounded-lg text-xs text-emerald-300 font-medium hover:bg-emerald-500/25 transition-colors">
                        <Phone className="w-3.5 h-3.5" /> Email Terrell to book
                      </a>
                      <button onClick={() => setCsmMode(null)} className="ml-3 text-xs text-slate-500 hover:text-white transition-colors">Close</button>
                    </div>
                  )}
                  {csmMode === 'email' && (
                    <div className="px-5 py-4">
                      <p className="text-sm font-bold text-white mb-1">Connect Your Email</p>
                      <div className="flex gap-2">
                        <input ref={emailRef} type="email" placeholder="your@email.com"
                          className="flex-1 px-3 py-2 rounded-lg border border-white/10 bg-black/40 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-400"
                          onChange={() => undefined}
                        />
                        <a href={`mailto:terrell0780@gmail.com?subject=Elitze Enquiry`}
                          className="px-3 py-2 bg-white text-black rounded-lg text-xs font-bold hover:bg-violet-100 transition-colors">Send</a>
                      </div>
                      <button onClick={() => setCsmMode(null)} className="mt-2 text-xs text-slate-500 hover:text-white transition-colors">Close</button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={cn('max-w-[85%] space-y-2', msg.sender === 'user' ? 'items-end' : 'items-start')}>
                    {msg.sender !== 'user' && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className={cn('w-4 h-4 rounded bg-gradient-to-br flex items-center justify-center text-[7px] text-white font-bold',
                          msg.sender === 'hermes' ? 'from-indigo-500 to-violet-600' : 'from-pink-500 to-rose-600')}>
                          {msg.sender === 'hermes' ? 'HM' : 'LA'}
                        </div>
                        <span className="text-[9px] text-slate-500 capitalize">{msg.sender}</span>
                      </div>
                    )}
                    <div className={cn('px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line',
                      msg.sender === 'user' ? 'bg-violet-500 text-white rounded-br-sm'
                        : msg.sender === 'hermes' ? 'bg-indigo-500/10 border border-indigo-400/15 text-slate-200 rounded-bl-sm'
                        : 'bg-white/[0.06] border border-white/8 text-slate-200 rounded-bl-sm')}>
                      {msg.text}
                    </div>
                    {msg.offer && (
                      <div className="p-4 rounded-xl border border-amber-400/25 bg-amber-500/5 space-y-3">
                        <p className="text-[10px] font-mono text-amber-300 uppercase tracking-widest">{msg.offer.label}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 line-through font-mono text-sm">${msg.offer.originalPrice}</span>
                          <span className="text-2xl font-bold text-white font-mono">${msg.offer.offerPrice}</span>
                          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            Save ${msg.offer.originalPrice - msg.offer.offerPrice}
                          </span>
                        </div>
                        <button onClick={() => handleOfferAccept(msg.offer!)}
                          className="w-full py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-violet-100 transition-colors">
                          Accept & Add to Cart
                        </button>
                      </div>
                    )}
                    <p className="text-[9px] text-slate-600 px-1">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white/[0.06] border border-white/8">
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400"
                        animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                {quickReplies.map((qr) => (
                  <button key={qr} onClick={() => sendMessage(qr)}
                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] text-slate-300 hover:border-violet-400/30 hover:text-white transition-all">
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-white/8 flex-shrink-0">
              <input ref={inputRef} type="text" value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                placeholder={`Message ${activeAgent === 'hermes' ? 'Hermes' : 'Lindy AI'}...`}
                className="flex-1 bg-white/[0.04] border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-400/40 transition-colors min-w-0"
              />
              <button onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-violet-500 hover:bg-violet-400 disabled:opacity-40 flex items-center justify-center transition-colors flex-shrink-0">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIP Modal */}
      <AnimatePresence>
        {vipModalOpen && <VIPModal current={vipTier} onSelect={(t) => { setVipTier(t); setVipModalOpen(false); }} onClose={() => setVipModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

// ── VIP Modal ─────────────────────────────────────────────────────────────────
interface VIPModalProps { current: VIPTier; onSelect: (t: VIPTier) => void; onClose: () => void; }

function VIPModal({ current, onSelect, onClose }: VIPModalProps) {
  const tiers: { id: VIPTier; name: string; price: string; icon: string; color: string; border: string; perks: string[]; cta: string }[] = [
    { id: 'silver', name: 'Silver VIP', price: '$49/mo', icon: '🥈', color: 'from-slate-400 to-gray-500', border: 'border-slate-400/30', perks: ['Priority Lindy AI support', '10% off all hires', 'Early agent access', 'Monthly briefing'], cta: 'Activate Silver' },
    { id: 'gold', name: 'Gold VIP', price: '$149/mo', icon: '🥇', color: 'from-amber-400 to-yellow-500', border: 'border-amber-400/30', perks: ['25% off all hires', 'Exclusive offer desk', 'Hermes direct access', 'CSM calls', 'Custom workflows'], cta: 'Activate Gold' },
    { id: 'partner', name: 'Partner', price: 'Custom', icon: '🤝', color: 'from-violet-500 to-fuchsia-600', border: 'border-violet-400/30', perks: ['White-label catalog', 'Revenue share', 'Direct Hermes API', 'Partner dashboard', 'Priority SLA'], cta: 'Apply for Partner' },
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.97 }}
        className="w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0b0b18] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/8">
          <div>
            <h3 className="text-xl font-bold text-white">VIP & Partner Programs</h3>
            <p className="text-xs text-slate-500 mt-0.5">Better deals, deeper access, real relationships.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6 grid md:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div key={tier.id} className={`relative p-5 rounded-2xl border ${tier.border} bg-white/[0.02] flex flex-col gap-4 ${current === tier.id ? 'ring-2 ring-violet-400/40' : ''}`}>
              {current === tier.id && <div className="absolute top-3 right-3 text-[9px] font-mono text-violet-300 bg-violet-500/15 px-2 py-0.5 rounded-full border border-violet-400/20 uppercase">Active</div>}
              <div>
                <span className="text-3xl">{tier.icon}</span>
                <h4 className="text-base font-bold text-white mt-2">{tier.name}</h4>
                <p className={`text-lg font-mono font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>{tier.price}</p>
              </div>
              <ul className="space-y-2 flex-1">
                {tier.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>{p}
                  </li>
                ))}
              </ul>
              <button onClick={() => onSelect(tier.id)}
                disabled={current === tier.id}
                className={cn('w-full py-2.5 rounded-xl font-bold text-sm transition-all', current === tier.id ? 'bg-white/10 text-slate-400 cursor-default' : 'bg-white text-black hover:bg-violet-100')}>
                {current === tier.id ? 'Current Plan' : tier.cta}
              </button>
            </div>
          ))}
        </div>
        <div className="px-7 py-4 border-t border-white/5 bg-white/[0.01]">
          <p className="text-xs text-slate-600 text-center">VIP unlocks Lindy AI's offer desk in real time. Partner applications reviewed within 48 hours.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
