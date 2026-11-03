import { useEffect, useState } from 'react';
import { Activity, ArrowRight, Check, CircleDollarSign, Code2, Copy, FileCheck2, Play, ShieldCheck, WalletCards } from 'lucide-react';
import { paymentSteps } from '../lib/content';
import { Badge, Button, SectionHeading } from './ui';
import { Reveal } from './Reveal';

export function PaymentSection() {
  const [activeStep, setActiveStep] = useState(paymentSteps.length - 1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (activeStep >= paymentSteps.length - 1) {
      setRunning(false);
      return;
    }
    const timer = window.setTimeout(() => setActiveStep((current) => current + 1), 760);
    return () => window.clearTimeout(timer);
  }, [activeStep, running]);

  const replay = () => {
    setActiveStep(0);
    setRunning(true);
  };

  return (
    <section className="section section--payment" id="payment">
      <div className="shell">
        <Reveal>
          <div className="payment-heading-grid">
            <SectionHeading
              index="04"
              eyebrow="x402 · PAY PER REQUEST"
              title={<>AI Agents Pay Only<br /><span>for What They Use.</span></>}
              description="External agents can request specialized legal intelligence and authorize payment per call — rather than committing to a subscription."
            />
            <div className="protocol-distinction">
              <div><span className="protocol-distinction__mark protocol-distinction__mark--payment">402</span><div><strong>x402</strong><span>Payment protocol</span></div></div>
              <div className="protocol-distinction__divider" />
              <div><span className="protocol-distinction__mark protocol-distinction__mark--identity"><ShieldCheck size={18} /></span><div><strong>ERC-8004</strong><span>Identity · discovery · trust signals</span></div></div>
            </div>
          </div>
        </Reveal>

        <Reveal className="payment-demo">
          <div className="payment-demo__top">
            <div className="console-label"><span className="console-label__icon console-label__icon--blue"><CircleDollarSign size={16} /></span> Pay-per-request preview</div>
            <div className="payment-demo__top-right"><Badge tone="blue">CONCEPTUAL FLOW</Badge><span className="mono-label">NOT A LIVE API</span></div>
          </div>

          <div className="payment-flow" aria-label="Illustrative x402 payment flow">
            {paymentSteps.map((step, index) => (
              <div className={`payment-flow__item ${index < activeStep ? 'is-complete' : ''} ${index === activeStep ? 'is-current' : ''}`} key={step}>
                <div className="payment-flow__node">{index < activeStep ? <Check size={13} /> : <span>{String(index + 1).padStart(2, '0')}</span>}</div>
                <span>{step}</span>
                {index < paymentSteps.length - 1 && <span className="payment-flow__line"><i /></span>}
              </div>
            ))}
          </div>

          <div className="payment-console-grid">
            <div className="api-request-card">
              <div className="api-request-card__header"><span className="mono-label">REQUEST PREVIEW</span><span className="copy-demo"><Copy size={13} /> illustrative</span></div>
              <div className="api-endpoint"><span className="api-method">POST</span><code>[demo endpoint — not published]</code><Code2 size={15} /></div>
              <div className="api-request-status"><span><Activity size={15} /> Request status</span><Badge tone={activeStep >= 2 ? 'blue' : 'neutral'}>{activeStep >= 2 ? 'PAYMENT HANDSHAKE · DEMO' : 'WAITING · DEMO'}</Badge></div>
              <div className="payment-detail-grid">
                <div><span>Agent identity</span><strong>Traffic Law Agent · placeholder</strong></div>
                <div><span>Payment asset</span><strong><span className="usdc-token">$</span> USDC · illustrative</strong></div>
                <div><span>Example amount</span><strong className="amount-example">$0.02 <small>DESIGN EXAMPLE ONLY</small></strong></div>
              </div>
              <div className="payment-code"><span className="code-line-number">01</span><code>{'{'} <em>"question"</em>: <b>"[your legal question]"</b>,</code><br /><span className="code-line-number">02</span><code>{'  '}<em>"evidence"</em>: <b>true</b> {'}'}</code></div>
              <div className="payment-demo__action"><Button variant="secondary" onClick={replay} disabled={running}><Play size={14} /> {running ? 'Running illustrative flow…' : 'Replay demo flow'}</Button><span>Simulation only · no payment is sent</span></div>
            </div>

            <div className="api-response-card">
              <div className="api-response-card__header"><span className="mono-label">RESPONSE PREVIEW</span><Badge tone="green"><span className="status-dot status-dot--small" /> ANSWER + RECEIPT</Badge></div>
              <div className="response-document-icon"><FileCheck2 size={19} /></div>
              <div className="response-eyebrow">LEGAL ANSWER · DEMO</div>
              <h3>Vietnamese traffic regulations</h3>
              <p>Answer preview with cited legal provisions, document version and an evidence reference.</p>
              <div className="citation-preview"><span className="citation-preview__mark">§</span><div><strong>Legal citation</strong><span>[Provision reference · illustrative]</span></div><ArrowRight size={14} /></div>
              <div className="receipt-preview"><div className="receipt-preview__icon"><ShieldCheck size={15} /></div><div><strong>Evidence receipt</strong><span>Placeholder · not generated</span></div><Badge tone="neutral">DEMO</Badge></div>
            </div>
          </div>
          <div className="payment-note"><WalletCards size={15} /> x402 represents the payment handshake. Agent identity and independent trust signals belong to ERC-8004.</div>
        </Reveal>
      </div>
    </section>
  );
}
