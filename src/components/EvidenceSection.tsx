import { ArrowDown, ArrowRight, Check, CircleHelp, FileCheck2, ShieldCheck } from 'lucide-react';
import { evidenceSteps } from '../lib/content';
import { Badge, SectionHeading } from './ui';
import { Reveal } from './Reveal';

const fields = [
  ['Request ID', 'DEMO · not generated'],
  ['Legal document version', 'Illustrative · pending source'],
  ['RAG index version', 'Not connected'],
  ['Answer hash', 'Not generated'],
  ['Batch ID', 'No batch committed'],
  ['Transaction reference', 'No on-chain anchor'],
];

export function EvidenceSection() {
  return (
    <section className="section section--evidence" id="evidence">
      <div className="shell">
        <Reveal>
          <div className="evidence-heading-grid">
            <SectionHeading
              index="03"
              eyebrow="VERIFIABLE LEGAL EVIDENCE"
              title={<>Every Answer Leaves<br /><span>Verifiable Evidence.</span></>}
              description="A user or external agent submits a legal question; TrustAgent retrieves relevant documents, resolves version, effective date and provisions, then returns a cited answer with an evidence record. Batch commitments enable independent integrity checks."
            />
            <div className="evidence-principle">
              <div className="evidence-principle__icon"><FileCheck2 size={18} /></div>
              <div><strong>Integrity ≠ correctness</strong><p>Hashes help show whether a record changed. They do not prove that a legal answer is correct.</p></div>
            </div>
          </div>
        </Reveal>

        <Reveal className="evidence-pipeline-wrap">
          <div className="pipeline-header"><span className="mono-label">EVIDENCE PIPELINE</span><Badge tone="amber">DESIGN PREVIEW</Badge></div>
          <div className="evidence-pipeline">
            {evidenceSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div className="evidence-step-wrap" key={step.title}>
                  <div className={`evidence-step ${index === 3 ? 'evidence-step--focus' : ''}`}>
                    <span className="evidence-step__icon"><Icon size={17} /></span>
                    <strong>{step.title}</strong>
                    <span>{step.detail}</span>
                  </div>
                  {index < evidenceSteps.length - 1 && <ArrowRight className="evidence-step__arrow" size={15} />}
                </div>
              );
            })}
          </div>
          <div className="pipeline-caption"><span className="pipeline-caption__line" /> From versioned source to independent integrity check <ArrowDown size={13} /></div>
        </Reveal>

        <Reveal className="evidence-explorer-grid">
          <div className="evidence-copy">
            <span className="mono-label">VERIFIABLE BY REFERENCE</span>
            <h3>One answer.<br />A traceable evidence trail.</h3>
            <p>Each record is designed to retain a legal document hash, document version and effective date, RAG index/version, cited provisions, answer hash, timestamp and request identifier — plus batch references when available.</p>
            <ul className="evidence-list">
              <li><Check size={15} /> Source document hash, version and effective date</li>
              <li><Check size={15} /> RAG index version and referenced legal provisions</li>
              <li><Check size={15} /> Answer hash, timestamp and request ID</li>
              <li><Check size={15} /> Batch commitment and independent verification</li>
            </ul>
          </div>

          <div className="evidence-explorer">
            <div className="explorer-topbar">
              <div className="explorer-window-dots"><i /><i /><i /></div>
              <span>Evidence explorer</span>
              <Badge tone="amber">ILLUSTRATIVE DATA</Badge>
            </div>
            <div className="explorer-status"><span><CircleHelp size={15} /> No production record loaded</span><span className="explorer-status__badge">DEMO</span></div>
            <div className="explorer-fields">
              {fields.map(([label, value]) => <div className="explorer-field" key={label}><span>{label}</span><strong>{value}</strong></div>)}
            </div>
            <div className="explorer-verification"><div className="explorer-verification__icon"><ShieldCheck size={16} /></div><div><strong>Verification result</strong><span>Illustrative only · no batch to verify</span></div><Badge tone="neutral">NOT RUN</Badge></div>
          </div>
        </Reveal>

        <div className="evidence-caveat"><ShieldCheck size={15} /><span>Anchoring is shown as an optional design path, not a live integration. Hash algorithm and production transaction references are intentionally left unspecified pending backend confirmation.</span></div>
      </div>
    </section>
  );
}
