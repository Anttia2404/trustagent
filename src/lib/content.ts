import type { LucideIcon } from 'lucide-react';
import { BookOpenCheck, Calculator, FileText, BriefcaseBusiness, ShieldCheck, Fingerprint, ScanEye, FileSearch, CircleDollarSign, Database, Layers3, Workflow } from 'lucide-react';

export type AgentStatus = 'IMPLEMENTED' | 'ROADMAP';

/** Backend API and setup docs live in the project README until dedicated docs exist. */
export const apiReadmeUrl = 'https://github.com/minhtangithu0b123/Trust-Agent/blob/develop/README.md';

export interface LegalAgent {
  domain: 'traffic' | 'labor' | 'tax';
  collection: string;
  name: string;
  specialty: string;
  status: AgentStatus;
  icon: LucideIcon;
  capabilities: string[];
  accent: 'green' | 'blue' | 'amber' | 'violet' | 'neutral';
}

export const agents: LegalAgent[] = [
  {
    domain: 'traffic', collection: 'legal_traffic',
    name: 'Traffic Law Agent', specialty: 'Vietnamese traffic regulations and penalties', status: 'IMPLEMENTED', icon: BookOpenCheck, accent: 'green',
    capabilities: ['Legal Q&A', 'Hybrid retrieval', 'Citation guardrail'],
  },
  {
    domain: 'labor', collection: 'legal_labor',
    name: 'Labor Law Agent', specialty: 'Vietnamese employment and workplace regulations', status: 'IMPLEMENTED', icon: BriefcaseBusiness, accent: 'blue',
    capabilities: ['Legal Q&A', 'Hybrid retrieval', 'Citation guardrail'],
  },
  {
    domain: 'tax', collection: 'legal_accounting',
    name: 'Tax Agent', specialty: 'Vietnamese tax and invoice regulations', status: 'IMPLEMENTED', icon: Calculator, accent: 'amber',
    capabilities: ['Tax research', 'Source references', 'Citation guardrail'],
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
      ['Agent ID', 'Illustrative profile · unregistered'],
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
  { icon: FileText, title: 'Legal question', detail: 'Traffic API request' },
  { icon: Database, title: 'RAG answer', detail: 'Retrieved legal evidence' },
  { icon: FileSearch, title: 'Citations', detail: 'Documents & provisions' },
  { icon: Fingerprint, title: 'Receipt', detail: 'Paid endpoint · when enabled' },
  { icon: Layers3, title: 'Merkle batch', detail: 'Prepared separately' },
  { icon: Workflow, title: 'Chain anchor', detail: 'No live automation' },
  { icon: ShieldCheck, title: 'Integrity check', detail: 'Receipt proof endpoint' },
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
    id: 'documents', title: 'Submit legal documents', icon: FileText,
    description: 'Share new laws, amendments or updated versions. Source, metadata and validity are checked before anything enters the knowledge pipeline.',
    tags: ['Source check', 'Version history'],
  },
  {
    id: 'reports', title: 'Report an answer', icon: FileSearch,
    description: 'Flag a potentially incorrect answer with its question, answer reference and relevant legal source. A reviewer verifies it before the knowledge base changes.',
    tags: ['Evidence required', 'Reviewer-led'],
  },
  {
    id: 'review', title: 'Review & validate', icon: ShieldCheck,
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
  tag: string;
  icon: LucideIcon;
  color: string;
  nodes: string[];
}

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: 'client', number: '01', label: 'Client', tag: 'NEXT.JS', icon: BookOpenCheck, color: 'green',
    nodes: ['Next.js frontend', 'Next.js API proxy'],
  },
  {
    id: 'api', number: '02', label: 'API & routing', tag: 'FASTAPI · LANGGRAPH', icon: Workflow, color: 'blue',
    nodes: ['FastAPI', 'LangGraph router', 'Traffic · Labor · Tax agents'],
  },
  {
    id: 'retrieval', number: '03', label: 'Legal retrieval', tag: 'CHROMA · BM25 · RRF', icon: FileSearch, color: 'amber',
    nodes: ['Metadata-aware query plan', 'Chroma + BM25', 'RRF + parent context', 'Optional reranker · off by default'],
  },
  {
    id: 'answer', number: '04', label: 'Answer & safety', tag: 'OPENAI / GEMINI', icon: ShieldCheck, color: 'green',
    nodes: ['OpenAI or Gemini', 'Self-RAG / reflection', 'Citation checks', 'Quantitative guardrail'],
  },
  {
    id: 'storage', number: '05', label: 'State & corpus', tag: 'SQLITE · POSTGRESQL', icon: Database, color: 'neutral',
    nodes: ['Chroma legal collections', 'SQLite / PostgreSQL conversations', 'SQLite LangGraph checkpoints'],
  },
  {
    id: 'payment', number: '06', label: 'Optional paid route', tag: 'X402 · WHEN ENABLED', icon: CircleDollarSign, color: 'blue',
    nodes: ['POST /paid/traffic/ask', 'x402 payment middleware', 'Answer + citations + provenance receipt'],
  },
];
