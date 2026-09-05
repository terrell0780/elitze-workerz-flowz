// ── Communication Architecture ────────────────────────────────────────────────
// Lindy AI = customer service supervisor. Warm, professional. Handles day-to-day ops.
// Hermes = Human intelligence interface. Complex situations, deep expertise.
//          Known as "The Brain" — knows every trade, workflow, integration.
//          Reachable in chat. Handles escalations Lindy AI sends up.
// Workers = Isolated execution units. Task output only. No conversation.
// Lobster = Controlled JSON pipeline. No agent-to-agent unless routed.
// ─────────────────────────────────────────────────────────────────────────────

export type Sender = 'user' | 'linda' | 'hermes';

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  timestamp: Date;
  offer?: {
    label: string;
    originalPrice: number;
    offerPrice: number;
    agentId?: string;
  };
}

export type VIPTier = 'none' | 'silver' | 'gold' | 'partner';

export type Intent =
  | 'greeting'
  | 'pricing'
  | 'browse'
  | 'vip'
  | 'offer'
  | 'partner'
  | 'hermes'
  | 'complex'
  | 'technical'
  | 'worker_status'
  | 'support'
  | 'hire'
  | 'flash_sale'
  | 'contact'
  | 'unknown';

export function detectIntent(text: string): Intent {
  const t = text.toLowerCase();
  if (/^(hi|hello|hey|sup|yo|good\s*(morning|evening|afternoon))/.test(t)) return 'greeting';
  if (/price|cost|how much|rent|buy|afford|cheap|expensive|deal|discount|offer/.test(t)) return 'pricing';
  if (/browse|show|list|find|search|agent|who.*available|catalog/.test(t)) return 'browse';
  if (/vip|subscribe|member|premium|exclusive|upgrade/.test(t)) return 'vip';
  if (/offer|negotiate|counter|proposal/.test(t)) return 'offer';
  if (/partner|affiliate|white.*label|resell|referral/.test(t)) return 'partner';
  if (/hermes|brain|complex|strategic|architecture|pipeline|lobster|orchestrat/.test(t)) return 'hermes';
  if (/technical|integration|api|webhook|deploy|infra|code|debug/.test(t)) return 'technical';
  if (/status|task|working|busy|progress|done|complete/.test(t)) return 'worker_status';
  if (/sale|flash|discount|promo|code|launch/.test(t)) return 'flash_sale';
  if (/contact|email|phone|reach|terrell|trueelitze/.test(t)) return 'contact';
  if (/help|support|issue|problem|broken|not working/.test(t)) return 'support';
  if (/hire|deploy|get|start|onboard|want/.test(t)) return 'hire';
  if (/strategy|plan|scale|grow|expand|enterprise|custom/.test(t)) return 'complex';
  return 'unknown';
}

// ── LINDY AI responses — warm, direct, professional ───────────────────────────
export function lindaResponse(intent: Intent, vipTier: VIPTier, _text: string): ChatMessage['offer'] | string {
  const isVIP = vipTier !== 'none';
  switch (intent) {
    case 'greeting':
      return isVIP
        ? `Welcome back. I am Lindy AI, your customer service supervisor. How can I assist with your workforce today?`
        : "Welcome to Elitze One Stop Shop. I am Lindy AI, customer service supervisor. I am here to facilitate your hiring process and ensure your AI employees are properly managed.";

    case 'pricing':
      return `Here is our updated professional rate card:\n\n📅 **Rent:** $49.99/day — full access to any maxed-out agent.\n💼 **Buy:** $399 — own the agent outright, no recurring fees.\n\nOur current Flash Sale gives you 50% off orders over $100, which means you can own an elite agent for just $199.50 right now. Shall I start an order for you?`;

    case 'flash_sale':
      return `⚡ Yes — our 7-Day Opening Flash Sale is 100% real!\n\n✅ 50% OFF any order over $100 — automatically applied at checkout\n✅ Free 7-Day VIP Gold — granted the moment payment clears\n✅ No code needed — it's live right now in your cart\n\nYour countdown started when you first visited. Head to checkout and you'll see the exact savings before you pay. Want me to help you put together an order?`;

    case 'browse':
      return `We've got 1,000 certified agents across 10 categories — Sales, Support, Engineering, Operations, Marketing, Finance, Legal, HR, Research, and Creative.\n\nAll Hermes AI certified, all available right now. Scroll up to the catalog or tell me what role you need and I'll find your best match.`;

    case 'vip':
      return `Our VIP tiers:\n\n🥈 Silver — $49/mo · Priority support · 10% off\n🥇 Gold — $149/mo · 25% off · Exclusive offers · Dedicated support\n🤝 Partner — Custom · White-label rights · Revenue share · API access\n\nClick the ✨ icon in this chat to activate. Want me to walk you through which tier makes sense for your business?`;

    case 'offer':
      if (isVIP) {
        return {
          label: `Exclusive Counter-Offer — ${vipTier.toUpperCase()} VIP`,
          originalPrice: 399,
          offerPrice: vipTier === 'partner' ? 250 : vipTier === 'gold' ? 310 : 390,
        };
      }
      return `We do consider offers — that's part of who we are. Upgrade to VIP to unlock our negotiation desk, or tell me more about what you're trying to build and I'll see what we can do directly.`;

    case 'partner':
      return `Partner Program gives you:\n\nWhite-label rights to our full 1,000-agent catalog\nRevenue share on every agent you place\nDirect Hermes API for custom integrations\nPartner earnings dashboard\n\nPartners are vetted — we want it to be the right fit both ways. Want to start the conversation? I'll connect you with Hermes for the deep dive.`;

    case 'hermes':
      return `Hermes is our Head of Intelligence — people call him The Brain because he knows the inside-out of every trade, workflow, and system integration. For anything complex or strategic, he's who you want.\n\nType "Switch to Hermes" and I'll hand you over right now. Or just ask your complex question here and I'll escalate it up to him.`;

    case 'technical':
      return `For technical architecture questions, I'd recommend looping in Hermes — he's the deepest technical mind on the team.\n\nThat said, I can help with most setup questions. What specifically are you trying to connect or configure?`;

    case 'complex':
      return `That sounds like something Hermes should weigh in on — he's built for exactly this kind of strategic planning. I'll flag this conversation for him.\n\nIn the meantime, tell me more about your scale, use case, and timeline. The more context, the faster we move.`;

    case 'hire':
      return `Let's get you set up:\n\n1. Browse the agent catalog above\n2. Click any agent to see their full profile\n3. Choose Rent ($49.99/day) or Buy ($399)\n4. Add to cart → checkout via Stripe, Crypto, or CDN E-Transfer\n\nOnce hired, I personally oversee onboarding and make sure they're running within minutes. What role are you looking for?`;

    case 'worker_status':
      return `Your agents run through Hermes around the clock. Every action is logged to the audit trail in real time.\n\nGive me an agent name or ID and I'll pull their current status immediately. ⚡`;

    case 'support':
      return `Right here — let's fix it. Tell me exactly what's happening and I'll get it sorted. Technical issue? I'll route it through Hermes and have an engineering agent on it within minutes. Nothing goes unresolved on my watch. 💪`;

    case 'contact':
      return `You can reach us directly:\n\n📧 Terrell Hall (Founder) — terrell0780@gmail.com\n💬 Right here in this chat — Lindy AI or Hermes\n📞 CSM calls available for VIP Gold & Partner members\n\nWe're real people. Terrell built this system and is reachable.`;

    default:
      return `Got it — give me a bit more detail so I can make sure I find exactly the right solution for you. No generic answers here.`;
  }
}

// ── HERMES responses — strategic, expert, precise ────────────────────────────
export function hermesResponse(text: string, vipTier: VIPTier): string {
  const t = text.toLowerCase();
  const isVIP = vipTier !== 'none';

  if (/architect|design|system|pipeline|lobster|workflow/.test(t)) {
    return `The Lobster Claw architecture is deterministic by design — two JSON arms meeting at an approval gate. Left arm handles intake and classification. Right arm handles verification and delivery. The gate is where I sit.\n\nNo side-effect fires without explicit approval. No agent talks to another without a pipeline step routing it. That's how we keep 1,000 agents coordinated without chaos.\n\nWhat are you trying to build or integrate?`;
  }
  if (/api|webhook|integration|connect/.test(t)) {
    return `For API integrations: Elitze exposes a REST API at /api/v1/ with endpoints for agent management, task submission, audit retrieval, and webhook registration.\n\nSet VITE_API_BASE in your .env and every Lindy AI/Hermes interaction flows through it. Lindy AI integrations use the /agents/lindy adapter. Browserless connects on port 3000 via CDP.\n\nWhat stack are you integrating with? I'll give you the exact config.`;
  }
  if (/scale|enterprise|volume|large/.test(t)) {
    return `At enterprise scale, the architecture shifts:\n\n1. BullMQ worker pool scales horizontally — add nodes, not config\n2. Redis cluster handles queue state across regions\n3. Hermes approval gates can be configured per-org with custom risk thresholds\n4. Audit logs stream to your SIEM via webhook\n\n${isVIP ? 'As a VIP member, I can provision a dedicated cluster environment.' : 'Partner tier includes dedicated infrastructure with direct SLA.'}\n\nWhat volume are you anticipating?`;
  }
  if (/price|cost|deal|offer|negotiate/.test(t)) {
    return `I handle the complex commercial conversations. Here's what I can tell you:\n\nFor 10+ agents, we can structure a custom enterprise agreement with volume pricing, dedicated SLA, and a Partner dashboard. The economics work well at scale.\n\nIf you have a specific budget or headcount target, give me the numbers and I'll tell you exactly what we can build.`;
  }
  if (/security|compliance|soc|gdpr|audit/.test(t)) {
    return `Security posture:\n\n• Agent isolation: gVisor sandboxing, read-only filesystem\n• Audit trail: immutable Postgres with cryptographic hash chain\n• Secrets: encrypted at rest, never in logs\n• Approval gates: every side-effect requires explicit sign-off\n• Compliance: SOC2-aligned practices, GDPR-ready data handling\n\nI can generate a technical security brief for your compliance team. What framework are you working within?`;
  }
  return `That's a good question — let me think through it properly.\n\nThe depth of what you're asking means there's more than one right answer depending on your context. Give me your specific constraints — scale, stack, timeline, budget — and I'll give you a precise recommendation rather than a generic one.\n\nThat's the only way I work.`;
}
