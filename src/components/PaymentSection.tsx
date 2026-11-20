import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Activity, ArrowRight, Check, CircleDollarSign, Code2, Copy, FileCheck2, Play, ShieldCheck, WalletCards } from 'lucide-react';
import { paymentSteps } from '../lib/content';
import { Badge, Button, SectionHeading } from './ui';
import { Reveal } from './Reveal';

export function PaymentSection() {
  const [activeStep, setActiveStep] = useState(paymentSteps.length - 1);
  const [running, setRunning] = useState(false);
  const reduceMotion = useReducedMotion();

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
    if (reduceMotion) {
      setActiveStep(paymentSteps.length - 1);
      setRunning(false);
      return;
    }
    setActiveStep(0);
    setRunning(true);
  };

  return (
    <section className="section section--payment" id="payment">
      <div className="shell">
        <Reveal>
          <div className="payment-heading-grid">
            <SectionHeading
              eyebrow="x402 · OPTIONAL PAID TRAFFIC ROUTE"
              title={<>Pay per request on<br /><span>the traffic-law API.</span></>}
              description="When enabled and configured, x402 middleware protects POST /paid/traffic/ask. Payment is separate from retrieval, answer generation and agent identity."
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
              <div className="api-endpoint"><span className="api-method">POST</span><code>/paid/traffic/ask</code><Code2 size={15} /></div>
              <div className="api-request-status"><span><Activity size={15} /> Request status</span><Badge tone={activeStep >= 2 ? 'blue' : 'neutral'}>{activeStep >= 2 ? 'PAYMENT HANDSHAKE · DEMO' : 'WAITING · DEMO'}</Badge></div>
              <div className="payment-detail-grid">
                <div><span>Paid service</span><strong>Vietnam traffic-law RAG</strong></div>
                <div><span>Payment asset</span><strong><span className="usdc-token">$</span> USDC · illustrative</strong></div>
                <div><span>Default config</span><strong className="amount-example">$0.01 <small>PER REQUEST · CONFIGURABLE</small></strong></div>
              </div>
              <div className="payment-code"><span className="code-line-number">01</span><code>{'{'} <em>"query"</em>: <b>"Xe máy vượt đèn đỏ bị phạt bao nhiêu?"</b>,</code><br /><span className="code-line-number">02</span><code>{'  '}<em>"k"</em>: <b>5</b> {'}'}</code></div>
              <div className="payment-demo__action"><Button variant="secondary" onClick={replay} disabled={running}><Play size={14} /> {running ? 'Running illustrative flow…' : 'Replay demo flow'}</Button><span>Simulation only · no payment is sent</span></div>
            </div>

            <div className="api-response-card">
              <div className="api-response-card__header"><span className="mono-label">RESPONSE PREVIEW</span><Badge tone="green"><span className="status-dot status-dot--small" /> ANSWER + RECEIPT</Badge></div>
              <div className="response-document-icon"><FileCheck2 size={19} /></div>
              <div className="response-eyebrow">LEGAL ANSWER · DEMO</div>
              <h3>Vietnamese traffic regulations</h3>
              <p>The paid route returns an answer, legal citations and a provenance receipt when x402 is enabled.</p>
              <div className="citation-preview"><span className="citation-preview__mark">§</span><div><strong>Legal citation</strong><span>Article 33(2) · preview</span></div><ArrowRight size={14} /></div>
              <div className="receipt-preview"><div className="receipt-preview__icon"><ShieldCheck size={15} /></div><div><strong>Provenance receipt</strong><span>Returned by the paid route</span></div><Badge tone="neutral">DEMO</Badge></div>
            </div>
          </div>
          <div className="payment-note"><WalletCards size={15} /> x402 represents the payment handshake. Agent identity and independent trust signals belong to ERC-8004.</div>
        </Reveal>
      </div>
    </section>
  );
}
