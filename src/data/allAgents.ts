import { type AgentCategory } from './agents';

export interface FullAgent {
  id: string;
  name: string;
  title: string;
  category: AgentCategory;
  avatar: string;
  color: string;
  tasks: string; // hover description of job tasks
  popular: boolean;
  popularity: number; // 0–100 for sort
  rating: number;
  tasksCompleted: number;
  availability: 'Available' | 'Busy' | 'On Task';
  responseTime: string;
  rentPerDay: 49.99;
  buyPrice: 399;
}

// Helper to build agents fast
const mk = (
  id: string, name: string, title: string, cat: AgentCategory,
  av: string, color: string, tasks: string,
  pop: boolean, popularity: number, rating: number, done: number,
  avail: 'Available' | 'Busy' | 'On Task', rt: string
): FullAgent => ({
  id, name, title, category: cat, avatar: av, color, tasks,
  popular: pop, popularity, rating, tasksCompleted: done,
  availability: avail, responseTime: rt, rentPerDay: 49.99, buyPrice: 399,
});

export const ALL_AGENTS: FullAgent[] = [
  // ── SALES (50 agents) ──────────────────────────────────────────────────────
  mk('s001','Aria V.','SDR — Outbound Sales','Sales','AV','from-violet-500 to-purple-600','Qualifies inbound leads, runs 6-touch email sequences, syncs every CRM field in real time, scores prospects by ICP fit, books demos automatically.',true,98,4.9,12840,'Available','<30s'),
  mk('s002','Max R.','Account Executive Agent','Sales','MR','from-blue-500 to-indigo-600','Handles discovery calls end-to-end, prepares custom proposals, manages deal rooms, pushes stalled deals, forecasts close probability weekly.',true,91,4.8,9210,'Available','<45s'),
  mk('s003','Cole T.','Revenue Operations Agent','Sales','CT','from-indigo-500 to-violet-600','Cleans CRM data, reconciles pipeline stages, builds revenue dashboards, flags data hygiene issues, sends weekly RevOps report.',true,85,4.7,6400,'Available','<1m'),
  mk('s004','Petra M.','Sales Enablement Agent','Sales','PM','from-purple-500 to-pink-600','Builds battle cards, updates sales decks, creates objection-handling guides, tracks competitor changes, delivers weekly enablement brief.',false,62,4.6,3200,'Available','<2m'),
  mk('s005','Finn O.','Cold Email Agent','Sales','FO','from-fuchsia-500 to-violet-600','Writes hyper-personalised cold emails at scale, A/B tests subject lines, monitors open/reply rates, auto-pauses bouncing domains.',true,88,4.8,18200,'Available','<30s'),
  mk('s006','Zara K.','Deal Desk Agent','Sales','ZK','from-pink-600 to-rose-600','Reviews discount requests, checks pricing policy compliance, generates custom quote PDFs, routes approvals, logs deal economics.',false,58,4.6,2100,'On Task','<3m'),
  mk('s007','Noel B.','Demo Booking Agent','Sales','NB','from-violet-600 to-blue-600','Identifies high-intent leads, sends calendar links, confirms demos, sends pre-call research packs, reschedules no-shows.',true,82,4.7,7800,'Available','<30s'),
  mk('s008','Mia S.','LinkedIn Outreach Agent','Sales','MS','from-blue-600 to-cyan-600','Sends personalised LinkedIn connection requests, follows up with value messages, monitors profile views, tracks response threads.',false,70,4.6,5500,'Available','<1m'),
  mk('s009','Ray D.','Proposal Writing Agent','Sales','RD','from-indigo-600 to-violet-600','Generates tailored proposals from a deal brief, pulls in case studies, formats executive summaries, delivers editable DOCX or PDF.',false,55,4.5,1900,'Available','<5m'),
  mk('s010','Jade N.','Win/Loss Analysis Agent','Sales','JN','from-violet-500 to-fuchsia-500','Conducts post-deal interviews, codes themes, benchmarks win rates by segment, delivers monthly win/loss intelligence report.',false,48,4.5,1100,'Available','<5m'),
  mk('s011','Tara F.','Pipeline Health Agent','Sales','TF','from-purple-600 to-indigo-600','Monitors deal velocity, flags deals stuck >14 days, sends automated nudges to reps, generates pipeline health score.',false,60,4.6,3300,'Available','<1m'),
  mk('s012','Hugo L.','Upsell & Expansion Agent','Sales','HL','from-blue-500 to-violet-500','Identifies expansion signals in product usage, triggers upsell playbooks, drafts expansion proposals, tracks NRR weekly.',false,65,4.7,4100,'Available','<2m'),
  mk('s013','Bea W.','Sales Reporting Agent','Sales','BW','from-violet-500 to-pink-500','Pulls CRM data, builds weekly/monthly sales reports, visualises quota attainment, sends auto-digest to leadership.',false,52,4.5,2600,'Available','<2m'),
  mk('s014','Eli C.','Territory Planning Agent','Sales','EC','from-indigo-500 to-blue-500','Segments market by geo/vertical, assigns accounts to reps by TAM, builds territory maps, rebalances on headcount changes.',false,44,4.4,890,'Available','<5m'),
  mk('s015','Asha R.','Partner Sales Agent','Sales','AR','from-fuchsia-600 to-pink-600','Manages partner deal registration, co-sell coordination, partner enablement emails, and monthly partner pipeline review.',false,49,4.5,1400,'Available','<2m'),
  mk('s016','Kyan J.','ABM Campaign Agent','Sales','KJ','from-blue-600 to-violet-600','Builds account-based marketing sequences, coordinates LinkedIn + email touchpoints, tracks engagement per account, flags buying signals.',true,78,4.7,5900,'Available','<1m'),
  mk('s017','Ona P.','Competitive Intel Agent','Sales','OP','from-violet-600 to-purple-600','Monitors competitor pricing, feature releases, and job postings. Delivers weekly competitive brief. Alerts on major moves.',false,57,4.6,2800,'Available','<1m'),
  mk('s018','Val T.','SaaS Trial Conversion Agent','Sales','VT','from-indigo-500 to-violet-500','Monitors trial usage, sends contextual tips, identifies high-intent users, triggers human handoff for enterprise prospects.',true,80,4.8,6700,'Available','<30s'),
  mk('s019','Cora B.','Churn Risk Agent','Sales','CB','from-purple-500 to-rose-500','Monitors health scores, flags at-risk accounts, triggers save playbooks, escalates to CS, logs intervention outcomes.',true,83,4.8,8200,'On Task','<1m'),
  mk('s020','Rex A.','Sales Forecasting Agent','Sales','RA','from-blue-500 to-indigo-500','Runs weighted pipeline models, scenario forecasts, tracks forecast accuracy, delivers board-ready slides every Monday.',false,61,4.6,3100,'Available','<3m'),

  // ── SUPPORT (50 agents) ────────────────────────────────────────────────────
  mk('su001','Lena C.','Customer Success Agent','Support','LC','from-emerald-500 to-teal-600','Triages tickets, drafts replies, resolves tier-1 issues, escalates complex cases with full context. 85% resolution without human.',true,97,4.9,28400,'Available','<15s'),
  mk('su002','Omar S.','Live Chat Support Agent','Support','OS','from-cyan-500 to-blue-600','Handles live chat 24/7 across Intercom, Drift, and Zendesk. Resolves 85% of issues instantly, smart escalation.',true,94,4.7,44200,'On Task','<8s'),
  mk('su003','Beth K.','Email Support Agent','Support','BK','from-teal-500 to-emerald-600','Processes support inboxes, categorises tickets, writes empathetic replies, tracks SLA, escalates priority cases.',true,89,4.8,31000,'Available','<20s'),
  mk('su004','Jay M.','Social Media Support Agent','Support','JM','from-blue-500 to-cyan-600','Monitors Twitter, Instagram, LinkedIn mentions, replies to complaints publicly and via DM, escalates PR risks immediately.',false,67,4.6,9800,'Available','<1m'),
  mk('su005','Pip R.','Returns & Refunds Agent','Support','PR','from-emerald-600 to-green-600','Processes return requests, validates policy eligibility, initiates refunds, logs outcomes, sends resolution confirmation.',false,61,4.6,7200,'Available','<2m'),
  mk('su006','Nico V.','Technical Support L1 Agent','Support','NV','from-cyan-600 to-blue-600','Diagnoses common technical issues using knowledge base, walks users through fixes, escalates L2 with reproduction steps.',true,84,4.7,15600,'Available','<30s'),
  mk('su007','Elle P.','CSAT & NPS Agent','Support','EP','from-teal-600 to-cyan-600','Sends CSAT surveys post-resolution, tracks NPS trends, segments detractors for follow-up, reports weekly satisfaction score.',false,55,4.5,4100,'Available','<2m'),
  mk('su008','Gus T.','Knowledge Base Agent','Support','GT','from-emerald-500 to-cyan-500','Identifies ticket patterns, writes and updates help articles, organises KB structure, tracks article deflection rate.',false,52,4.5,3200,'Available','<3m'),
  mk('su009','Pia L.','Onboarding Support Agent','Support','PL','from-blue-600 to-emerald-600','Guides new customers through product setup, sends step-by-step tutorials, checks activation milestones, flags stuck users.',true,76,4.7,11200,'Available','<30s'),
  mk('su010','Rex O.','Escalation Manager Agent','Support','RO','from-teal-500 to-blue-600','Intercepts critical tickets, coordinates cross-team resolution, sends status updates to customers, closes escalation loop.',false,58,4.6,3900,'Available','<1m'),
  mk('su011','Faye H.','Billing Support Agent','Support','FH','from-cyan-500 to-teal-600','Handles billing questions, processes plan changes, explains invoices, issues credits within policy, escalates disputes.',false,60,4.6,5800,'Available','<1m'),
  mk('su012','Rex W.','Proactive Outreach Agent','Support','RW','from-emerald-600 to-teal-600','Monitors product usage drops, reaches out proactively, offers tips, books check-in calls, prevents churn before it starts.',true,79,4.8,8900,'Available','<30s'),
  mk('su013','Ada M.','VIP Client Support Agent','Support','AM','from-blue-500 to-violet-600','Dedicated white-glove support for enterprise accounts. Priority routing, named account manager, SLA guarantee.',true,86,4.9,6700,'Available','<5s'),
  mk('su014','Drew N.','Community Support Agent','Support','DN','from-teal-600 to-emerald-600','Monitors Discord, Slack, and forum communities. Answers questions, flags bugs, surfaces product feedback, rewards contributors.',false,54,4.5,4300,'Available','<2m'),
  mk('su015','Lexi T.','Crisis Response Agent','Support','LT','from-cyan-600 to-blue-600','Activates during outages or PR events. Sends status updates, coordinates internal comms, drafts public statements.',false,50,4.5,1200,'Available','<30s'),

  // ── ENGINEERING (40 agents) ────────────────────────────────────────────────
  mk('e001','Dev X1','Full-Stack Dev Agent','Engineering','DX','from-orange-500 to-red-600','Writes production-grade TypeScript/React/Node.js code, opens PRs, runs tests, fixes CI failures. Operates under human review gate.',true,96,4.8,6720,'Available','<2m'),
  mk('e002','Kai P.','QA Automation Agent','Engineering','KP','from-yellow-500 to-orange-500','Writes Playwright/Jest/Cypress E2E suites, runs regression on every deploy, files bugs with video reproduction steps.',true,88,4.9,8100,'Available','<1m'),
  mk('e003','Ops Z.','DevOps & Infra Agent','Engineering','OZ','from-orange-500 to-amber-600','Manages AWS/GCP infra, monitors uptime, runs blue-green deployments, auto-scales, alerts on anomalies, manages Terraform.',true,90,4.8,4300,'Available','<1m'),
  mk('e004','Patch N.','Cybersecurity Monitor Agent','Engineering','PN','from-red-600 to-rose-700','Monitors endpoints, scans for CVEs, alerts on anomalous access, patches known vulnerabilities, generates security posture report.',true,85,4.9,3800,'Available','<30s'),
  mk('e005','Syn T.','API Integration Agent','Engineering','ST','from-amber-500 to-orange-600','Builds and maintains REST/GraphQL integrations, writes API wrappers, tests endpoints, documents schemas in OpenAPI.',false,68,4.7,2900,'Available','<3m'),
  mk('e006','Flux B.','Backend Dev Agent','Engineering','FB','from-red-500 to-orange-600','Writes Node.js/Python/Go backend services, designs database schemas, optimises queries, documents endpoints.',true,84,4.7,5100,'Available','<2m'),
  mk('e007','Code R.','Code Review Agent','Engineering','CR','from-orange-600 to-yellow-600','Reviews PRs for security vulnerabilities, performance issues, and style violations. Leaves inline comments, blocks merges on critical issues.',true,87,4.8,7200,'Available','<1m'),
  mk('e008','Dbug A.','Debugging Agent','Engineering','DA','from-red-500 to-pink-600','Analyses error logs, traces stack traces, proposes root cause hypothesis, submits fix PR, monitors for recurrence.',false,72,4.7,3400,'Available','<2m'),
  mk('e009','Perf M.','Performance Engineering Agent','Engineering','PE','from-amber-600 to-red-600','Runs load tests, profiles bottlenecks, optimises DB queries, reduces bundle size, delivers performance benchmark report.',false,65,4.6,2200,'Available','<5m'),
  mk('e010','Mob D.','Mobile Dev Agent','Engineering','MD','from-orange-500 to-red-500','Builds React Native / Flutter features, handles platform-specific bugs, submits to App Store & Play Store, monitors crash reports.',false,60,4.6,1800,'Available','<3m'),
  mk('e011','Arch P.','System Architecture Agent','Engineering','AP','from-red-600 to-orange-600','Reviews technical architecture decisions, proposes scalable patterns, produces ADR documents, evaluates tech debt.',false,58,4.7,1400,'Available','<5m'),
  mk('e012','Doc W.','Technical Documentation Agent','Engineering','DW','from-amber-500 to-yellow-600','Writes API docs, README files, architecture diagrams, runbooks, and internal wikis from code and comments.',false,55,4.5,2800,'Available','<3m'),
  mk('e013','Git M.','Git & Version Control Agent','Engineering','GM','from-orange-500 to-amber-500','Manages branching strategies, enforces commit conventions, automates changelog generation, handles merge conflict resolution.',false,50,4.5,1900,'Available','<1m'),
  mk('e014','ML E.','ML Engineering Agent','Engineering','ME','from-red-500 to-orange-500','Trains, evaluates, and deploys ML models. Monitors model drift, retrains on schedule, documents model cards.',false,63,4.7,2100,'Available','<5m'),
  mk('e015','Cloud A.','Cloud Cost Optimisation Agent','Engineering','CA','from-amber-600 to-orange-600','Analyses cloud spend, identifies waste, rightsizes instances, recommends reserved pricing, delivers monthly savings report.',false,62,4.6,1700,'Available','<3m'),

  // ── OPERATIONS (40 agents) ─────────────────────────────────────────────────
  mk('o001','Lindy A.','Executive Assistant Agent','Operations','LY','from-pink-500 to-rose-600','Manages executive calendars, books meetings with context briefs, summarises call recordings, chases deliverables, triages inbox.',true,99,4.9,31000,'Available','<20s'),
  mk('o002','Sam W.','Project Manager Agent','Operations','SW','from-indigo-500 to-blue-600','Runs sprints in Jira/Asana, tracks milestones, writes weekly status reports, flags blockers, facilitates async standups.',true,88,4.7,5900,'Available','<1m'),
  mk('o003','Supply C.','Supply Chain Agent','Operations','SC','from-lime-500 to-green-600','Tracks inventory, monitors supplier windows, generates POs, forecasts demand, syncs with ERP, flags stock-out risks.',false,68,4.6,1600,'Available','<2m'),
  mk('o004','Proc M.','Procurement Agent','Operations','PM','from-green-600 to-teal-600','Manages vendor onboarding, processes purchase requests, tracks spend against budget, negotiates renewal quotes.',false,58,4.5,1200,'Available','<3m'),
  mk('o005','Sched A.','Scheduling & Dispatch Agent','Operations','SA','from-lime-600 to-green-600','Optimises team schedules, dispatches field workers, handles last-minute changes, sends confirmation notifications.',false,55,4.5,2100,'Available','<1m'),
  mk('o006','SOP W.','SOP Writing Agent','Operations','SW2','from-emerald-500 to-lime-600','Interviews process owners, documents standard operating procedures, formats into version-controlled wiki pages.',false,50,4.5,900,'Available','<5m'),
  mk('o007','Kpi T.','KPI Tracking Agent','Operations','KT','from-teal-500 to-emerald-600','Pulls metrics from data sources, builds KPI dashboards, sends weekly ops digest, flags metrics outside target range.',true,75,4.7,4800,'Available','<2m'),
  mk('o008','Vend M.','Vendor Management Agent','Operations','VM','from-green-500 to-teal-600','Manages vendor contracts, tracks renewal dates, collects performance reviews, flags SLA breaches.',false,52,4.5,1100,'Available','<3m'),
  mk('o009','Fac M.','Facilities Management Agent','Operations','FM','from-lime-500 to-emerald-600','Manages office maintenance requests, tracks asset inventory, schedules repairs, monitors lease renewals.',false,40,4.4,600,'Available','<5m'),
  mk('o010','Risk M.','Risk Management Agent','Operations','RM','from-teal-600 to-green-600','Maintains risk register, monitors risk indicators, drafts mitigation plans, delivers quarterly risk report.',false,48,4.5,800,'Available','<5m'),
  mk('o011','Travel C.','Corporate Travel Agent','Operations','TC','from-emerald-600 to-lime-600','Books flights and hotels within policy, manages itineraries, processes expense reports, handles cancellations.',false,55,4.5,3400,'Available','<1m'),
  mk('o012','Meet S.','Meeting Summariser Agent','Operations','MS2','from-green-600 to-emerald-600','Joins calls, transcribes, extracts action items, assigns owners, sends summary within 2 minutes of call end.',true,92,4.9,19000,'Available','<2m'),
  mk('o013','Onb F.','Employee Onboarding Agent','Operations','OF','from-sky-500 to-blue-600','Guides new hires through setup checklists, sends welcome kits, books intro calls, tracks completion, flags blockers.',true,78,4.7,2200,'Available','<30s'),
  mk('o014','Event P.','Event Planning Agent','Operations','EP2','from-lime-600 to-teal-600','Plans company events, manages vendor bookings, tracks RSVPs, coordinates logistics, sends day-of briefings.',false,46,4.4,700,'Available','<5m'),
  mk('o015','Process A.','Process Automation Agent','Operations','PA','from-teal-500 to-lime-600','Identifies manual process steps, designs automation flows, implements in n8n/Zapier, monitors execution, reports time savings.',true,80,4.8,3600,'Available','<2m'),

  // ── MARKETING (45 agents) ─────────────────────────────────────────────────
  mk('m001','Nova M.','Content Marketing Agent','Marketing','NM','from-fuchsia-500 to-pink-600','Researches keywords, drafts SEO articles, writes social copy, schedules across all channels, tracks engagement metrics.',true,93,4.8,14200,'Available','<3m'),
  mk('m002','Echo A.','Paid Ads Agent','Marketing','EA','from-amber-500 to-yellow-600','Manages Google & Meta campaigns, A/B tests creatives, adjusts bids in real-time, reports ROAS daily.',true,86,4.6,3200,'Busy','<5m'),
  mk('m003','Pulse P.','PR & Comms Agent','Marketing','PP','from-indigo-500 to-violet-600','Writes press releases, monitors media mentions, pitches journalists, drafts thought-leadership content.',false,62,4.6,1400,'Available','<8m'),
  mk('m004','SEO K.','SEO Strategy Agent','Marketing','SK','from-pink-500 to-fuchsia-600','Runs keyword research, audits on-page SEO, builds internal link maps, tracks rank positions, delivers monthly SEO report.',true,88,4.8,8900,'Available','<3m'),
  mk('m005','Email C.','Email Marketing Agent','Marketing','EC2','from-fuchsia-600 to-pink-600','Designs email campaigns, writes copy, segments lists, schedules sends, A/B tests subject lines, reports open and click rates.',true,90,4.8,12000,'Available','<2m'),
  mk('m006','Social M.','Social Media Manager Agent','Marketing','SM','from-pink-600 to-rose-600','Schedules posts across LinkedIn/Twitter/Instagram, monitors engagement, replies to comments, tracks follower growth.',true,87,4.7,10500,'Available','<1m'),
  mk('m007','Brand V.','Brand Voice Agent','Marketing','BV','from-violet-600 to-fuchsia-600','Enforces brand guidelines across all content, reviews copy for tone consistency, maintains brand style guide.',false,52,4.5,1600,'Available','<5m'),
  mk('m008','Infl M.','Influencer Outreach Agent','Marketing','IM','from-pink-500 to-violet-600','Identifies brand-fit influencers, sends partnership proposals, tracks response rates, manages collaboration briefs.',false,58,4.5,2100,'Available','<3m'),
  mk('m009','Pod P.','Podcast Marketing Agent','Marketing','PP2','from-fuchsia-500 to-violet-600','Books podcast guest appearances, prepares talking points briefs, writes episode summaries, clips social cuts.',false,48,4.4,900,'Available','<5m'),
  mk('m010','Webinar A.','Webinar & Events Agent','Marketing','WA','from-pink-600 to-fuchsia-600','Promotes webinars via email + social, manages registrations, sends reminders, clips highlights post-event.',false,50,4.5,1200,'Available','<3m'),
  mk('m011','Market R.','Market Research Agent','Marketing','MR2','from-violet-500 to-pink-600','Maps market size, segments audiences, benchmarks competitors, builds buyer personas, delivers research report.',true,76,4.7,3800,'Available','<5m'),
  mk('m012','Growth H.','Growth Hacking Agent','Marketing','GH','from-fuchsia-600 to-rose-600','Runs rapid A/B experiments across channels, identifies growth levers, documents winning experiments in playbook.',true,84,4.8,5200,'Available','<2m'),
  mk('m013','Video S.','Video Script Agent','Marketing','VS','from-red-500 to-rose-600','Writes YouTube, TikTok, and ad scripts with retention arcs, hooks, and CTAs tailored to your audience.',true,82,4.8,2900,'Available','<5m'),
  mk('m014','Analytics A.','Marketing Analytics Agent','Marketing','AA','from-pink-500 to-fuchsia-500','Integrates GA4, HubSpot, and ad platforms. Builds unified attribution dashboards. Delivers weekly performance digest.',true,85,4.7,6100,'Available','<2m'),
  mk('m015','Aff M.','Affiliate Marketing Agent','Marketing','AM2','from-violet-500 to-fuchsia-500','Manages affiliate partners, tracks conversions, sends monthly payouts, recruits new affiliates, monitors fraud.',false,52,4.5,1400,'Available','<3m'),

  // ── FINANCE (30 agents) ────────────────────────────────────────────────────
  mk('f001','Fenn B.','Bookkeeping Agent','Finance','FB2','from-green-500 to-emerald-600','Reconciles transactions daily, categorises expenses, prepares monthly P&L summaries, flags anomalies for human review.',true,91,4.9,7800,'Available','<2m'),
  mk('f002','Vera L.','Financial Analyst Agent','Finance','VL','from-teal-500 to-cyan-600','Builds financial models, runs scenario analysis, creates board-ready dashboards, delivers weekly forecast updates.',true,84,4.8,2100,'Available','<10m'),
  mk('f003','Tax A.','Tax Preparation Agent','Finance','TA','from-emerald-600 to-teal-600','Organises tax documents, identifies deductible expenses, prepares tax summary packages for CPA review.',false,65,4.6,1800,'Available','<5m'),
  mk('f004','Payroll A.','Payroll Processing Agent','Finance','PA2','from-green-600 to-emerald-600','Processes payroll runs, checks compliance, handles contractor payments, generates payslips, files payroll reports.',true,80,4.8,3200,'Available','<3m'),
  mk('f005','AR A.','Accounts Receivable Agent','Finance','AR2','from-teal-600 to-green-600','Sends invoices, tracks payment status, sends overdue reminders, escalates collections, reports AR aging weekly.',true,82,4.7,4500,'Available','<2m'),
  mk('f006','AP A.','Accounts Payable Agent','Finance','AP2','from-emerald-500 to-green-600','Processes vendor invoices, validates against POs, schedules payments, reconciles statements, manages cash flow calendar.',false,68,4.6,2900,'Available','<2m'),
  mk('f007','Budget A.','Budget Management Agent','Finance','BA','from-cyan-500 to-teal-600','Tracks spend vs budget in real time, sends alerts at 80% threshold, builds reforecast models, delivers variance reports.',false,60,4.6,1600,'Available','<3m'),
  mk('f008','Audit A.','Financial Audit Agent','Finance','AA2','from-teal-500 to-emerald-600','Prepares audit evidence packages, cross-references ledger entries, flags discrepancies, coordinates with external auditors.',false,55,4.5,900,'Available','<5m'),
  mk('f009','Invest A.','Investment Research Agent','Finance','IA','from-green-500 to-teal-600','Analyses investment opportunities, prepares memo summaries, tracks portfolio performance, monitors market news.',false,58,4.6,1100,'Available','<10m'),
  mk('f010','Exp A.','Expense Management Agent','Finance','EA2','from-emerald-600 to-cyan-600','Reviews expense reports, checks policy compliance, approves/rejects claims, processes reimbursements, flags abuse.',false,64,4.6,3800,'Available','<1m'),

  // ── LEGAL (25 agents) ──────────────────────────────────────────────────────
  mk('l001','Lex D.','Contract Review Agent','Legal','LD','from-slate-500 to-gray-600','Reviews NDAs, SaaS agreements, and vendor contracts. Flags risk clauses, suggests redlines. Does not provide legal advice.',true,88,4.7,1850,'Available','<15m'),
  mk('l002','Trust S.','Compliance & Audit Agent','Legal','TS','from-green-500 to-teal-600','Monitors regulatory changes, runs internal audit logs, flags compliance gaps, prepares SOC2 evidence packages.',true,82,4.9,980,'Available','<5m'),
  mk('l003','GDPR A.','GDPR Compliance Agent','Legal','GA','from-slate-600 to-blue-600','Audits data processing activities, reviews consent flows, drafts privacy notices, monitors data subject requests.',false,65,4.6,720,'Available','<5m'),
  mk('l004','IP A.','IP & Trademark Agent','Legal','IA2','from-gray-500 to-slate-600','Monitors trademark registers, flags potential conflicts, prepares filing briefs, tracks renewal deadlines.',false,52,4.5,480,'Available','<10m'),
  mk('l005','Policy W.','Policy Writing Agent','Legal','PW','from-slate-500 to-gray-600','Drafts internal policies (HR, IT, security), aligns with regulations, version-controls, sends for approval.',false,56,4.5,640,'Available','<8m'),
  mk('l006','Litigation S.','Litigation Support Agent','Legal','LS','from-gray-600 to-slate-600','Organises case files, researches precedents, summarises depositions, prepares discovery document indexes.',false,48,4.4,310,'Available','<15m'),
  mk('l007','Contract G.','Contract Generation Agent','Legal','CG','from-slate-600 to-gray-600','Generates standard contracts from template library, populates variables, routes for signature via DocuSign.',true,76,4.7,1400,'Available','<5m'),
  mk('l008','Equity A.','Equity & Cap Table Agent','Legal','EA3','from-gray-500 to-slate-500','Maintains cap table, models dilution scenarios, prepares 409A summaries, tracks option vesting schedules.',false,60,4.6,580,'Available','<10m'),

  // ── HR (30 agents) ─────────────────────────────────────────────────────────
  mk('hr001','Rosa H.','Recruiter Agent','HR','RH','from-rose-500 to-pink-600','Sources candidates from LinkedIn, GitHub, Arc.dev. Screens resumes against rubric, schedules interviews, sends offers.',true,91,4.8,3400,'Available','<2m'),
  mk('hr002','Onboard F.','Employee Onboarding Agent','HR','OF2','from-sky-500 to-blue-600','Sends welcome kits, guides new hires through setup, books intro meetings, tracks checklist completion.',true,84,4.7,2200,'Available','<30s'),
  mk('hr003','Perf R.','Performance Review Agent','HR','PR2','from-rose-600 to-pink-600','Coordinates review cycles, collects 360 feedback, synthesises themes, drafts performance summaries.',false,65,4.6,1100,'Available','<5m'),
  mk('hr004','L&D A.','Learning & Development Agent','HR','LA2','from-pink-500 to-rose-600','Curates learning paths, enrolls employees in courses, tracks completion, surfaces skill gaps, reports L&D ROI.',false,58,4.5,890,'Available','<3m'),
  mk('hr005','Benefits A.','Benefits Administration Agent','HR','BA2','from-sky-600 to-blue-600','Answers benefits questions, processes enrolment changes, tracks leave balances, sends open enrolment reminders.',false,60,4.5,1700,'Available','<2m'),
  mk('hr006','Culture A.','Culture & Engagement Agent','HR','CA2','from-rose-500 to-fuchsia-600','Runs pulse surveys, analyses engagement scores, surfaces themes, recommends initiatives, tracks eNPS.',false,55,4.5,780,'Available','<3m'),
  mk('hr007','Policy H.','HR Policy Agent','HR','PH','from-blue-600 to-sky-600','Answers HR policy questions, updates employee handbook, tracks policy changes, ensures regulatory compliance.',false,52,4.5,1200,'Available','<2m'),
  mk('hr008','Exit I.','Exit Interview Agent','HR','EI','from-pink-600 to-rose-600','Conducts structured exit interviews, codes themes, benchmarks against previous exits, delivers quarterly turnover report.',false,48,4.4,420,'Available','<5m'),
  mk('hr009','Headcount P.','Headcount Planning Agent','HR','HP','from-sky-500 to-indigo-500','Models headcount scenarios, tracks open roles vs plan, generates hiring dashboard, flags budget overruns.',false,55,4.6,680,'Available','<5m'),
  mk('hr010','Comp B.','Compensation Benchmarking Agent','HR','CB2','from-blue-500 to-sky-600','Pulls market salary data, benchmarks roles against peers, identifies pay equity gaps, prepares comp review report.',false,58,4.5,520,'Available','<5m'),

  // ── RESEARCH (25 agents) ───────────────────────────────────────────────────
  mk('r001','Scout R.','Market Research Agent','Research','SR','from-blue-500 to-violet-600','Maps markets, benchmarks competitors, tracks news, delivers structured intelligence briefs on a weekly schedule.',true,91,4.9,6200,'Available','<5m'),
  mk('r002','Flux D.','Data Analyst Agent','Research','FD','from-cyan-500 to-teal-600','Cleans datasets, runs SQL queries, builds Looker dashboards, answers data questions in plain English.',true,89,4.9,5600,'Available','<3m'),
  mk('r003','Cite R.','Academic Research Agent','Research','CR2','from-violet-500 to-blue-600','Searches academic databases, synthesises literature, writes annotated bibliographies, checks citations.',false,55,4.6,900,'Available','<10m'),
  mk('r004','Patent A.','Patent Research Agent','Research','PA3','from-blue-600 to-indigo-600','Searches patent databases, analyses claims, identifies prior art, prepares infringement risk summaries.',false,50,4.5,580,'Available','<10m'),
  mk('r005','Survey A.','Survey & Insights Agent','Research','SA2','from-violet-600 to-blue-600','Designs surveys, analyses responses, segments results, builds insight presentations, tracks longitudinal trends.',false,60,4.6,1400,'Available','<5m'),
  mk('r006','Trend W.','Trend Watching Agent','Research','TW','from-cyan-600 to-blue-600','Monitors industry news, social signals, and analyst reports. Delivers weekly trend brief with implication analysis.',true,78,4.7,3200,'Available','<2m'),
  mk('r007','User R.','User Research Agent','Research','UR','from-blue-500 to-cyan-600','Conducts user interviews, synthesises findings, maps jobs-to-be-done, delivers insights to product team.',false,62,4.7,1800,'Available','<5m'),
  mk('r008','Bench A.','Benchmarking Agent','Research','BA3','from-indigo-500 to-blue-600','Benchmarks your metrics against industry standards, identifies performance gaps, delivers quarterly benchmark report.',false,55,4.5,1100,'Available','<5m'),

  // ── CREATIVE (30 agents) ───────────────────────────────────────────────────
  mk('c001','Iris C.','Visual Design Agent','Creative','IC','from-fuchsia-500 to-violet-600','Creates social graphics, pitch decks, and brand assets in Figma and Canva, consistent with your brand kit.',true,85,4.7,4100,'Available','<10m'),
  mk('c002','Reel V.','Video Script Agent','Creative','RV','from-red-500 to-rose-600','Writes YouTube, TikTok, and ad scripts. Hooks, retention arcs, and CTAs optimised for your audience.',true,82,4.8,2900,'Available','<5m'),
  mk('c003','Copy W.','Copywriting Agent','Creative','CW','from-pink-500 to-fuchsia-600','Writes conversion-focused website copy, landing pages, ads, and product descriptions.',true,88,4.8,7800,'Available','<3m'),
  mk('c004','Brand S.','Brand Strategy Agent','Creative','BS','from-violet-600 to-pink-600','Develops brand positioning, messaging framework, taglines, and tone-of-voice guide.',false,60,4.6,1200,'Available','<10m'),
  mk('c005','UI D.','UI Design Agent','Creative','UD','from-fuchsia-600 to-violet-600','Designs UI components, screens, and flows in Figma, following design system conventions.',true,80,4.7,3300,'Available','<5m'),
  mk('c006','Illus A.','Illustration Agent','Creative','IA3','from-pink-600 to-fuchsia-600','Creates custom digital illustrations, icon sets, and infographics for marketing materials.',false,55,4.5,1600,'Available','<10m'),
  mk('c007','Story B.','Storytelling Agent','Creative','SB','from-violet-500 to-fuchsia-500','Writes brand narratives, founder stories, case studies, and long-form thought-leadership pieces.',false,58,4.6,1900,'Available','<5m'),
  mk('c008','Narr V.','Narrative Video Agent','Creative','NV2','from-rose-600 to-pink-600','Writes video briefs, storyboards, voiceover scripts, and B-roll shot lists for brand films.',false,50,4.5,800,'Available','<8m'),
  mk('c009','Ux W.','UX Writing Agent','Creative','UW','from-fuchsia-500 to-pink-500','Writes microcopy, error messages, onboarding flows, and tooltip text that reduces friction.',false,62,4.6,2400,'Available','<3m'),
  mk('c010','Prod D.','Product Design Agent','Creative','PD','from-violet-600 to-fuchsia-600','Designs end-to-end product experiences, conducts usability heuristics, delivers annotated wireframes.',false,57,4.6,1100,'Available','<5m'),
];

// Seed the remaining roster programmatically to reach 1,000 total AI employees.

const SEED_TEMPLATES: Array<[AgentCategory, string, string, string, string]> = [
  ['Sales','Territory Manager Agent','Manages geographic territory coverage, tracks account penetration, builds expansion plans.','from-violet-500 to-blue-500','TM'],
  ['Sales','Channel Partner Agent','Manages reseller relationships, co-marketing activities, and partner deal registration.','from-blue-500 to-violet-500','CP'],
  ['Sales','Sales Coach Agent','Analyses rep call recordings, identifies coaching moments, delivers personalised feedback briefs.','from-violet-600 to-purple-600','SC'],
  ['Support','Chatbot Training Agent','Builds and improves chatbot intents, reviews misclassified utterances, expands training data.','from-teal-500 to-emerald-600','CT'],
  ['Support','Accessibility Support Agent','Ensures product accessibility compliance, answers WCAG questions, audits user flows.','from-emerald-500 to-teal-600','AS'],
  ['Engineering','Security Audit Agent','Runs automated penetration tests, audits code for OWASP vulnerabilities, generates security reports.','from-red-600 to-orange-600','SA'],
  ['Engineering','Database Admin Agent','Monitors query performance, runs index optimisations, manages backups, handles schema migrations.','from-orange-600 to-red-600','DB'],
  ['Operations','Change Management Agent','Plans organisational change initiatives, creates communication plans, tracks adoption metrics.','from-green-500 to-emerald-600','CM'],
  ['Operations','Data Entry Agent','Processes bulk data entry tasks, cleans spreadsheets, validates records, imports to CRM or ERP.','from-lime-500 to-green-600','DE'],
  ['Marketing','Conversion Rate Agent','Audits landing pages, proposes A/B tests, analyses funnel drop-off, delivers CRO recommendations.','from-pink-500 to-fuchsia-600','CR'],
  ['Marketing','Community Manager Agent','Grows and nurtures online communities, moderates content, recognises top contributors.','from-fuchsia-600 to-pink-600','CM'],
  ['Finance','Grants Research Agent','Identifies applicable grants, prepares application summaries, tracks deadlines and requirements.','from-emerald-500 to-green-600','GR'],
  ['Legal','Regulatory Research Agent','Monitors regulatory changes across jurisdictions, summarises impact, recommends compliance actions.','from-slate-500 to-gray-600','RR'],
  ['HR','Diversity & Inclusion Agent','Tracks D&I metrics, audits job descriptions for bias, recommends inclusive hiring practices.','from-rose-500 to-pink-600','DI'],
  ['Research','Geopolitical Risk Agent','Monitors political developments, assesses business risk by market, delivers weekly risk briefing.','from-blue-600 to-violet-600','GR'],
  ['Creative','Podcast Production Agent','Edits audio, writes show notes, creates episode artwork, schedules distribution across platforms.','from-fuchsia-500 to-pink-600','PP'],
];

// Generate seed agents to reach 1,000 total
let seedId = 1000;
const SEED_COUNT = 1000 - ALL_AGENTS.length;

for (let i = 0; i < SEED_COUNT; i++) {
  const t = SEED_TEMPLATES[i % SEED_TEMPLATES.length];
  const num = Math.floor(i / SEED_TEMPLATES.length) + 2;
  const rating = parseFloat((4.3 + Math.random() * 0.6).toFixed(1));
  const done = Math.floor(200 + Math.random() * 5000);
  const avails: Array<'Available' | 'Busy' | 'On Task'> = ['Available', 'Available', 'Available', 'Busy', 'On Task'];
  ALL_AGENTS.push(
    mk(
      `seed-${seedId++}`,
      `${t[4]}${num < 10 ? '0' + num : num}`,
      t[1],
      t[0],
      t[4],
      t[3],
      t[2],
      false,
      Math.floor(20 + Math.random() * 40),
      rating,
      done,
      avails[Math.floor(Math.random() * avails.length)],
      `<${Math.ceil(Math.random() * 10)}m`
    )
  );
}

export const POPULAR_AGENTS = ALL_AGENTS
  .filter((a) => a.popular)
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 12);

export const TOTAL_AGENT_COUNT = ALL_AGENTS.length;
