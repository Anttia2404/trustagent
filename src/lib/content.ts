import type { LucideIcon } from 'lucide-react';
import { BookOpenCheck, Calculator, FileText, BriefcaseBusiness, ShieldCheck, Fingerprint, ScanEye, FileSearch, Database, Layers3, Workflow } from 'lucide-react';

export type AgentStatus = 'IMPLEMENTED' | 'ROADMAP';

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
      ['Registration status', 'Not registered'],
      ['Agent ID', 'Not assigned'],
      ['Capabilities', 'Vietnamese traffic law · cited answers'],
      ['Service endpoint', 'Not connected'],
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
      ['Validation request', 'Not submitted'],
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
