import { ArrowRight, Network } from 'lucide-react';
import { architectureLayers } from '../lib/content';
import { Badge, SectionHeading } from './ui';
import { Reveal } from './Reveal';

export function ArchitectureSection() {
  return (
    <section className="section section--architecture" id="architecture">
      <div className="shell">
        <Reveal>
          <div className="architecture-heading-row">
            <SectionHeading
              title={<>Routing, retrieval<br /><span>and answer checks.</span></>}
              description="The current service routes a legal query to one of three domain agents, retrieves evidence, then checks citations and quantitative claims before responding."
            />
            <div className="architecture-key"><span><i className="architecture-key__line" /> Request flow</span><Badge tone="neutral">CURRENT BACKEND</Badge></div>
          </div>
        </Reveal>

        <Reveal className="architecture-map">
          <div className="architecture-map__top"><div className="architecture-map__title"><Network size={16} /><span>TrustAgent request path</span></div><span className="mono-label">QUESTION TO CHECKED RESPONSE</span></div>
          <div className="architecture-layers">
            {architectureLayers.map((layer) => {
              const Icon = layer.icon;
              return (
                <div className={`architecture-layer architecture-layer--${layer.color}`} key={layer.id}>
                  <div className="architecture-layer__label"><span className="architecture-layer__number">{layer.number}</span><span className="architecture-layer__icon"><Icon size={16} /></span><div><strong>{layer.label}</strong><small>{layer.tag}</small></div></div>
                  <div className="architecture-layer__flow">
                    {layer.nodes.map((node, nodeIndex) => (
                      <div className="architecture-node-wrap" key={node}>
                        <span className={`architecture-node ${nodeIndex === 0 ? 'architecture-node--start' : ''}`}>{node}</span>
                        {nodeIndex < layer.nodes.length - 1 && <ArrowRight className="architecture-node__arrow" size={13} />}
                      </div>
                    ))}
                  </div>
                  <span className="architecture-layer__connector" aria-hidden="true" />
                </div>
              );
            })}
          </div>
          <div className="architecture-map__footer"><span>Conversation store: SQLite or PostgreSQL · LangGraph checkpoint: SQLite.</span><span>Paid traffic endpoint uses x402 only when configured.</span></div>
        </Reveal>
      </div>
    </section>
  );
}
