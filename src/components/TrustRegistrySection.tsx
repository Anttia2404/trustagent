import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Fingerprint, MessageSquareText, ShieldCheck } from 'lucide-react';
import { registryTabs } from '../lib/content';
import { Badge, SectionHeading } from './ui';
import { Reveal } from './Reveal';

const flow = ['Agent registration', 'Agent discovery', 'API request', 'User feedback', 'Validation', 'Reputation updates'];

type RegistryId = (typeof registryTabs)[number]['id'];

export function TrustRegistrySection() {
  const [active, setActive] = useState<RegistryId>('identity');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeRegistry = registryTabs.find((item) => item.id === active) ?? registryTabs[0];
  const ActiveIcon = activeRegistry.icon;

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % registryTabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + registryTabs.length) % registryTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = registryTabs.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    setActive(registryTabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="section section--trust" id="trust">
      <div className="shell">
        <div className="split-heading">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="ERC-8004 · TRUST LAYER"
              title={<>Every Agent Has an Identity.<br /><span>Every Interaction Builds Reputation.</span></>}
              description="Make specialized legal agents discoverable, identifiable and independently reviewable across the agent ecosystem."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <a className="standard-link" href="https://eips.ethereum.org/EIPS/eip-8004" target="_blank" rel="noreferrer">
              Read the ERC-8004 standard <ExternalLink size={14} />
            </a>
          </Reveal>
        </div>

        <Reveal className="registry-shell">
          <div className="registry-console">
            <div className="registry-console__rail">
              <div className="console-label"><span className="console-label__icon"><Fingerprint size={15} /></span> Registry explorer <Badge tone="neutral">DEMO</Badge></div>
              <p className="console-intro">A trust stack with distinct signals — not a single trust score.</p>
              <div className="registry-tabs" role="tablist" aria-label="ERC-8004 registry">
                {registryTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      ref={(element) => { tabRefs.current[registryTabs.indexOf(tab)] = element; }}
                      type="button"
                      role="tab"
                      id={`registry-tab-${tab.id}`}
                      aria-selected={active === tab.id}
                      aria-controls="registry-panel"
                      tabIndex={active === tab.id ? 0 : -1}
                      className={`registry-tab ${active === tab.id ? 'is-active' : ''}`}
                      onClick={() => setActive(tab.id)}
                      onKeyDown={(event) => handleTabKeyDown(event, registryTabs.indexOf(tab))}
                    >
                      <Icon size={16} />
                      <span>{tab.label}</span>
                      <ArrowRight size={14} className="registry-tab__arrow" />
                    </button>
                  );
                })}
              </div>
              <div className="registry-note">
                <div className="registry-note__icon"><MessageSquareText size={15} /></div>
                <p><strong>Three signals. Separate meanings.</strong><br />Registration establishes an identity — it does not guarantee trust or legal correctness.</p>
              </div>
            </div>

            <div className="registry-console__main" role="tabpanel" id="registry-panel" aria-labelledby={`registry-tab-${activeRegistry.id}`} tabIndex={0}>
              <div className="registry-panel-top">
                <span className="mono-label">{activeRegistry.tag}</span>
                <Badge tone="amber">Illustrative · not connected</Badge>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRegistry.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="registry-panel-content"
                >
                  <div className="registry-agent-head">
                    <div className="registry-agent-icon"><ActiveIcon size={20} /></div>
                    <div>
                      <div className="registry-agent-head__title">{activeRegistry.title}</div>
                      <div className="registry-agent-head__sub">Traffic Law Agent <span className="bullet-divider">·</span> Demo profile</div>
                    </div>
                    <span className="registry-demo-indicator"><span /> DEMO</span>
                  </div>
                  <p className="registry-description">{activeRegistry.body}</p>

                  <div className="registry-fields">
                    {activeRegistry.fields.map(([label, value]) => (
                      <div className="registry-field" key={label}>
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="registry-footnote">
                    <ShieldCheck size={15} />
                    <span>Identity, user feedback and independent validation remain distinct records.</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="trust-flow">
            <div className="trust-flow__caption"><span className="flow-live-dot" /> TRUST LIFECYCLE <span className="trust-flow__caption-muted">Illustrative sequence</span></div>
            <div className="trust-flow__steps">
              {flow.map((step, index) => (
                <div className="trust-flow__item" key={step}>
                  <span className={`trust-flow__number ${index === 0 ? 'is-highlighted' : ''}`}>{String(index + 1).padStart(2, '0')}</span>
                  <span>{step}</span>
                  {index < flow.length - 1 && <ArrowRight className="trust-flow__arrow" size={13} />}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
