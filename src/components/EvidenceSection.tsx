import { ArrowRight, Check, CircleHelp, FileCheck2, ShieldCheck } from 'lucide-react';
import { evidenceSteps } from '../lib/content';
import { Badge, SectionHeading } from './ui';
import { Reveal } from './Reveal';

const fields = [
  ['Receipt ID', 'Created on paid traffic route'],
  ['Index version', 'Set by deployment'],
  ['Answer SHA-256', 'Included in receipt'],
  ['Citation references', 'Document · law · article · source'],
  ['Evidence text hash', 'Included when available'],
  ['Batch / chain anchor', 'Optional · not automated'],
];

export function EvidenceSection() {
  return (
    <section className="section section--evidence" id="evidence">
      <div className="shell">
        <Reveal>
          <div className="evidence-heading-grid">
            <SectionHeading
              title={<>Inspect the sources<br /><span>behind an answer.</span></>}
              description="The paid traffic endpoint can return a provenance receipt with an answer hash, citation references and index version."
            />
            <div className="evidence-principle">
              <div className="evidence-principle__icon"><FileCheck2 size={18} /></div>
              <div><strong>Integrity ≠ correctness</strong><p>Hashes help show whether a record changed. They do not prove that a legal answer is correct.</p></div>
            </div>
          </div>
        </Reveal>

        <Reveal className="evidence-pipeline-wrap">
          <div className="pipeline-header"><span className="mono-label">PAID TRAFFIC RECEIPT FLOW</span><Badge tone="amber">Only when x402 is enabled</Badge></div>
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
        </Reveal>

        <Reveal className="evidence-explorer-grid">
          <div className="evidence-copy">
            <h3>Trace what was returned.<br />Keep correctness separate.</h3>
            <p>When x402 is enabled, the paid traffic route creates a receipt with a timestamp, index version, answer SHA-256 and citation details. Citation text hashes are recorded when present.</p>
            <ul className="evidence-list">
              <li><Check size={15} /> Receipt ID, timestamp and configured index version</li>
              <li><Check size={15} /> Answer hash and cited source references</li>
              <li><Check size={15} /> Evidence text hash when available</li>
              <li><Check size={15} /> Optional Merkle batch proof</li>
            </ul>
          </div>

          <div className="evidence-explorer">
            <div className="explorer-topbar">
              <div className="explorer-window-dots"><i /><i /><i /></div>
              <span>Evidence explorer</span>
              <Badge tone="amber">Illustrative</Badge>
            </div>
            <div className="explorer-status"><span><CircleHelp size={15} /> No backend receipt loaded</span></div>
            <div className="explorer-fields">
              {fields.map(([label, value]) => <div className="explorer-field" key={label}><span>{label}</span><strong>{value}</strong></div>)}
            </div>
            <div className="explorer-verification"><div className="explorer-verification__icon"><ShieldCheck size={16} /></div><div><strong>Integrity verification</strong><span>Runs once a receipt is loaded</span></div><Badge tone="neutral">Not run</Badge></div>
          </div>
        </Reveal>

        <div className="evidence-caveat"><ShieldCheck size={15} /><span>Effective-date metadata is uneven across the corpus: a document whose status is unknown is not confirmed to be in force.</span></div>
      </div>
    </section>
  );
}
