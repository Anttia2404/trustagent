import type { LucideIcon } from 'lucide-react';
import { BookOpenCheck, Calculator, FileText, Landmark, BriefcaseBusiness, ShieldCheck, Fingerprint, ScanEye, FileSearch, CircleDollarSign, Database, UsersRound, Layers3, Workflow, ReceiptText } from 'lucide-react';

export type AgentStatus = 'MVP' | 'COMING SOON';

export interface LegalAgent {
  name: string;
  specialty: string;
  status: AgentStatus;
  icon: LucideIcon;
  capabilities: string[];
  accent: 'green' | 'blue' | 'amber' | 'violet' | 'neutral';
}

export const agents: LegalAgent[] = [
  {
    name: 'Traffic Law Agent', specialty: 'Vietnamese traffic regulations & penalties', status: 'MVP', icon: BookOpenCheck, accent: 'green',
    capabilities: ['Legal Q&A', 'Cited provisions', 'Version-aware lookup'],
  },
  {
    name: 'Accounting Law Agent', specialty: 'Accounting standards & compliance', status: 'MVP', icon: Calculator, accent: 'blue',
    capabilities: ['Accounting research', 'Source references', 'Compliance context'],
  },
  {
    name: 'Labor Law Agent', specialty: 'Employment law & workplace policy', status: 'COMING SOON', icon: BriefcaseBusiness, accent: 'amber',
    capabilities: ['Employment Q&A', 'Regulation discovery', 'Cited guidance'],
  },
  {
    name: 'Tax Law Agent', specialty: 'Tax obligations & statutory guidance', status: 'COMING SOON', icon: ReceiptText, accent: 'violet',
    capabilities: ['Tax research', 'Document references', 'Policy context'],
  },
  {
    name: 'Enterprise Law Agent', specialty: 'Business operations & legal workflows', status: 'COMING SOON', icon: Landmark, accent: 'neutral',
    capabilities: ['Enterprise research', 'Legal workflows', 'Source discovery'],
  },
];

export const registryTabs = [
  {
    id: 'identity', label: 'Identity Registry', icon: Fingerprint, tag: 'ERC-8004 / IDENTITY',
    title: 'Discoverable by design.',
    body: 'Every participating agent can expose a portable on-chain identity, its declared capabilities and service endpoints for other agents to discover.',
    fields: [
      ['Agent', 'Traffic Law Agent'],
      ['Registration status', 'Not registered · illustrative'],
      ['Agent ID', 'Demo placeholder · not registered'],
      ['Capabilities', 'Vietnamese traffic law · cited answers'],
      ['Service endpoint', 'Not connected · illustrative'],
    ],
  },
  {
    id: 'reputation', label: 'Reputation Registry', icon: ScanEye, tag: 'ERC-8004 / FEEDBACK',
    title: 'Signals, not guarantees.',
    body: 'Clients and peer agents can leave feedback about a service. Reputation helps agents compare providers, but it is not proof of legal accuracy.',
    fields: [
      ['Answer quality', 'Awaiting verified feedback'],
      ['Citation accuracy', 'No production score'],
      ['Successful requests', 'Not connected'],
      ['Client feedback', 'No submissions yet'],
    ],
  },
  {
    id: 'validation', label: 'Validation Registry', icon: ShieldCheck, tag: 'ERC-8004 / VALIDATION',
    title: 'Independent review, separately recorded.',
    body: 'A validator can inspect an agent’s work against its evidence reference and submit a validation result distinct from ordinary client feedback.',
    fields: [
      ['Validation request', 'Illustrative · not submitted'],
      ['Evidence reference', 'Not connected'],
      ['Validator result', 'Pending independent review'],
      ['Reputation effect', 'Not recorded'],
    ],
  },
] as const;

export const evidenceSteps = [
  { icon: FileText, title: 'Legal documents', detail: 'Source & effective date' },
  { icon: Database, title: 'Versioned RAG', detail: 'Index & provisions' },
  { icon: FileSearch, title: 'Answer + citations', detail: 'Relevant legal basis' },
  { icon: Fingerprint, title: 'Evidence record', detail: 'Request & answer ref' },
  { icon: Layers3, title: 'Batch commitment', detail: 'Merkle root · example' },
  { icon: Workflow, title: 'Optional anchor', detail: 'On-chain · roadmap' },
  { icon: ShieldCheck, title: 'Independent check', detail: 'Integrity verification' },
] as const;

export const paymentSteps = [
  'External agent',
  'API request',
  'HTTP 402 Payment Required',
  'Payment authorization',
  'Payment verification / settlement',
  'Legal agent executes RAG',
  'Answer + citations + evidence receipt',
] as const;

export const contributionTypes = [
  {
    id: 'documents', number: '01', title: 'Submit legal documents', icon: FileText,
    description: 'Share new laws, amendments or updated versions. Source, metadata and validity are checked before anything enters the knowledge pipeline.',
    tags: ['Source check', 'Version history'],
  },
  {
    id: 'reports', number: '02', title: 'Report an answer', icon: FileSearch,
    description: 'Flag a potentially incorrect answer with its question, answer reference and relevant legal source. A reviewer verifies it before the knowledge base changes.',
    tags: ['Evidence required', 'Reviewer-led'],
  },
  {
    id: 'review', number: '03', title: 'Review & validate', icon: ShieldCheck,
    description: 'Qualified reviewers check document authenticity, legal references and proposed corrections, then record accepted decisions with an audit trail.',
    tags: ['Human review', 'Auditable'],
  },
] as const;

export const rewardSteps = [
  'Contribution submitted',
  'Quality & authenticity checks',
  'Human review',
  'Approved contribution',
  'Reward issued',
  'Contribution history',
] as const;

export interface ArchitectureLayer {
  id: string;
  number: string;
  label: string;
  icon: LucideIcon;
  color: string;
  nodes: string[];
}

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: 'knowledge', number: '01', label: 'Legal knowledge', icon: BookOpenCheck, color: 'green',
    nodes: ['Vietnamese traffic law documents', 'Normalization', 'Versioned RAG', 'Citation verification'],
  },
  {
    id: 'agents', number: '02', label: 'Agent layer', icon: Workflow, color: 'blue',
    nodes: ['TrustAgent orchestrator', 'Traffic law agent', 'Accounting agent', 'Future legal agents'],
  },
  {
    id: 'trust', number: '03', label: 'Trust layer', icon: ShieldCheck, color: 'violet',
    nodes: ['ERC-8004 identity', 'Reputation registry', 'Validation registry'],
  },
  {
    id: 'payment', number: '04', label: 'Payment layer', icon: CircleDollarSign, color: 'amber',
    nodes: ['External AI agent', 'x402 payment', 'USDC payment', 'Legal API response'],
  },
  {
    id: 'evidence', number: '05', label: 'Evidence layer', icon: Fingerprint, color: 'cyan',
    nodes: ['Answer + citations', 'Evidence record', 'Batch commitment', 'Blockchain anchor'],
  },
  {
    id: 'community', number: '06', label: 'Community layer', icon: UsersRound, color: 'rose',
    nodes: ['Contributors', 'Qualified reviewers', 'Approved legal updates', 'Planned rewards'],
  },
];
