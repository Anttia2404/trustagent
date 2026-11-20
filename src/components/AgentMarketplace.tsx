import { useState } from 'react';
import { ArrowRight, Database, Fingerprint, ShieldCheck, X } from 'lucide-react';
import { agents, type LegalAgent } from '../lib/content';
import { Badge, SectionHeading } from './ui';
import { Reveal } from './Reveal';
import { useDialogAccessibility } from '../hooks/useDialogAccessibility';

function AgentDialog({ agent, onClose }: { agent: LegalAgent; onClose: () => void }) {
  const Icon = agent.icon;
  const { dialogRef, closeButtonRef } = useDialogAccessibility(onClose);

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} tabIndex={-1} className="agent-dialog" role="dialog" aria-modal="true" aria-labelledby="agent-dialog-title">
        <button ref={closeButtonRef} className="dialog-close" type="button" onClick={onClose} aria-label="Close details"><X size={18} /></button>
        <div className={`agent-icon agent-icon--${agent.accent}`}><Icon size={20} /></div>
        <Badge tone={agent.status === 'IMPLEMENTED' ? 'green' : 'neutral'}>{agent.status === 'IMPLEMENTED' ? 'Implemented' : 'Roadmap'}</Badge>
        <h3 id="agent-dialog-title">{agent.name}</h3>
        <p>{agent.specialty}</p>
        <div className="dialog-details">
          <div><span>Public domain</span><strong>{agent.domain}</strong></div>
          <div><span>Corpus collection</span><strong>{agent.collection}</strong></div>
          <div><span>Question endpoint</span><strong>POST /domains/{agent.domain}/ask</strong></div>
          <div><span>Retrieval & safety</span><strong>Hybrid search · citation checks</strong></div>
        </div>
        <div className="dialog-capabilities">
          <span className="mono-label">IMPLEMENTED PIPELINE</span>
          <div>{agent.capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div>
        </div>
        <p className="dialog-disclaimer">API availability depends on the backend deployment and its configuration.</p>
      </div>
    </div>
  );
}

export function AgentMarketplace() {
  const [selected, setSelected] = useState<LegalAgent | null>(null);

  return (
    <section className="section section--agents" id="agents">
      <div className="shell">
        <Reveal>
          <div className="marketplace-heading">
            <SectionHeading
              title={<>Legal agents across<br /><span>three Vietnam domains.</span></>}
              description="The backend routes legal questions to traffic, labor and tax agents. Each uses hybrid retrieval and checks citations before returning an answer."
            />
          </div>
        </Reveal>

        <div className="agent-grid">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            const isImplemented = agent.status === 'IMPLEMENTED';
            return (
              <Reveal key={agent.name} delay={index * 0.045} className={`agent-card-wrap ${index < 2 ? 'agent-card-wrap--featured' : ''}`}>
                <article className={`agent-card ${isImplemented ? 'agent-card--implemented' : ''}`}>
                  <div className="agent-card__top">
                    <div className={`agent-icon agent-icon--${agent.accent}`}><Icon size={20} /></div>
                    <Badge tone={isImplemented ? 'green' : 'neutral'}>{isImplemented ? 'Implemented' : 'Roadmap'}</Badge>
                  </div>
                  <h3>{agent.name}</h3>
                  <p className="agent-card__specialty">{agent.specialty}</p>
                  <div className="agent-card__capabilities">
                    {agent.capabilities.map((capability) => <span key={capability}>{capability}</span>)}
                  </div>
                  <div className="agent-card__meta">
                    <div className="agent-meta-row"><span><Fingerprint size={13} /> Public domain</span><strong>{agent.domain}</strong></div>
                    <div className="agent-meta-row"><span><Database size={13} /> Chroma collection</span><strong>{agent.collection}</strong></div>
                  </div>
                  <button type="button" className="agent-card__action" onClick={() => setSelected(agent)} aria-haspopup="dialog" aria-label={`View ${agent.name} details`}>
                    View details <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="marketplace-footnote"><ShieldCheck size={15} /> The tax agent covers tax and invoice law, not full accounting.</div>
      </div>
      {selected && <AgentDialog agent={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
