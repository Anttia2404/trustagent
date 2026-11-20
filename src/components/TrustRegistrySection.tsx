import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { registryTabs } from '../lib/content';
import { Reveal } from './Reveal';

type RegistryId = (typeof registryTabs)[number]['id'];
const REGISTRY_DURATION = 6500;

export function TrustRegistrySection() {
  const [active, setActive] = useState<RegistryId>('identity');
  const [focused, setFocused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, { amount: 0.15 });
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeRegistry = registryTabs.find((item) => item.id === active) ?? registryTabs[0];
  const ActiveIcon = activeRegistry.icon;
  const autoPlaying = visible && !reduceMotion && !focused;

  useEffect(() => {
    if (!autoPlaying) return;
    const timer = window.setTimeout(() => {
      setActive((current) => {
        const index = registryTabs.findIndex((item) => item.id === current);
        return registryTabs[(index + 1) % registryTabs.length].id;
      });
    }, REGISTRY_DURATION);
    return () => window.clearTimeout(timer);
  }, [active, autoPlaying]);

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
    <section ref={sectionRef} className="section section--trust" id="infrastructure" aria-labelledby="trust-heading"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="shell">
        <Reveal className="registry-shell">
          <h2 className="registry-title" id="trust-heading">ERC-8004</h2>
          <div className="registry-console" id="trust" data-ui>
            <div className="registry-console__rail">
              <div className="registry-tabs" role="tablist" aria-label="Sổ đăng ký ERC-8004">
                {registryTabs.map((tab, idx) => {
                  const Icon = tab.icon;
                  const isActive = active === tab.id;
                  return (
                    <button
                      key={tab.id}
                      ref={(element) => { tabRefs.current[idx] = element; }}
                      type="button"
                      role="tab"
                      id={`registry-tab-${tab.id}`}
                      aria-selected={isActive}
                      aria-controls="registry-panel"
                      tabIndex={isActive ? 0 : -1}
                      className={`registry-tab ${isActive ? 'is-active' : ''}`}
                      onClick={() => setActive(tab.id)}
                      onKeyDown={(event) => handleTabKeyDown(event, idx)}
                    >
                      <span className="registry-tab__icon"><Icon size={16} /></span>
                      <div className="registry-tab__text">
                        <span className="registry-tab__title">{tab.label}</span>
                        <span className="registry-tab__sub">{tab.subtitle}</span>
                      </div>
                      <ArrowRight size={14} className="registry-tab__arrow" aria-hidden="true" />
                      {isActive && autoPlaying && <motion.span
                        key={`${active}-progress`}
                        className="registry-tab__progress"
                        aria-hidden="true"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: REGISTRY_DURATION / 1000, ease: 'linear' }}
                      />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className="registry-console__main"
              role="tabpanel"
              id="registry-panel"
              aria-labelledby={`registry-tab-${activeRegistry.id}`}
              tabIndex={0}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRegistry.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                  className="registry-panel-content"
                >
                  <div className="registry-agent-head">
                    <div className="registry-agent-icon"><ActiveIcon size={20} /></div>
                    <div>
                      <div className="registry-agent-head__title">{activeRegistry.title}</div>
                      <div className="registry-agent-head__sub">Agent giao thông · Bản ghi ERC-8004</div>
                    </div>
                  </div>
                  <p className="registry-description">{activeRegistry.body}</p>

                  <div className="registry-fields">
                    {activeRegistry.fields.map(([label, value]) => {
                      const isPending = value.includes('Chưa') || value.includes('Chờ');
                      return (
                        <div className="registry-field" key={label}>
                          <span className="registry-field__label">{label}</span>
                          <span className={`registry-field__value ${isPending ? 'is-pending' : ''}`}>
                            {value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </Reveal>
      </div>
    </section>
  );
}
