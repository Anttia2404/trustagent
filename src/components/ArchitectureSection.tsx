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
              index="06"
              eyebrow="A CONNECTED TRUST STACK"
              title={<>Separate layers.<br /><span>One verifiable system.</span></>}
              description="Legal knowledge, agents, identity, payments, evidence and community work together — while each layer keeps a distinct role."
            />
            <div className="architecture-key"><span><i className="architecture-key__line" /> Connected flow</span><Badge tone="neutral">SYSTEM MAP · CONCEPT</Badge></div>
          </div>
        </Reveal>

        <Reveal className="architecture-map">
          <div className="architecture-map__top"><div className="architecture-map__title"><Network size={16} /><span>TrustAgent architecture</span></div><span className="mono-label">6 INTERCONNECTED LAYERS</span></div>
          <div className="architecture-layers">
            {architectureLayers.map((layer, index) => {
              const Icon = layer.icon;
              return (
                <div className={`architecture-layer architecture-layer--${layer.color}`} key={layer.id}>
                  <div className="architecture-layer__label"><span className="architecture-layer__number">{layer.number}</span><span className="architecture-layer__icon"><Icon size={16} /></span><div><strong>{layer.label}</strong><small>{index === 2 ? 'ERC-8004' : index === 3 ? 'x402 · USDC' : 'TRUSTAGENT'}</small></div></div>
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
          <div className="architecture-map__footer"><span>Separate protocols, explicit hand-offs.</span><span>Illustrative architecture · not a deployment claim</span></div>
        </Reveal>
      </div>
    </section>
  );
}
