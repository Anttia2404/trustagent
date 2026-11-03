import { ArrowRight, BadgeCheck, CircleDollarSign, FileCheck2, History, ShieldAlert } from 'lucide-react';
import { contributionTypes, rewardSteps } from '../lib/content';
import { Badge, SectionHeading } from './ui';
import { Reveal } from './Reveal';

export function CommunitySection() {
  return (
    <section className="section section--community" id="community">
      <div className="shell">
        <Reveal>
          <div className="community-heading-grid">
            <SectionHeading
              index="05"
              eyebrow="COMMUNITY CONTRIBUTION"
              title={<>Help Improve Legal Intelligence.<br /><span>Get Rewarded for Verified Contributions.</span></>}
              description="A stronger legal knowledge base starts with people who know the source, spot the change and help verify what comes next."
            />
            <div className="reward-status-card"><div className="reward-status-card__icon"><CircleDollarSign size={19} /></div><div><Badge tone="amber">PLANNED · EXPERIMENTAL</Badge><p>Rewards are a future design concept, subject to review and approval.</p></div></div>
          </div>
        </Reveal>

        <div className="contribution-grid">
          {contributionTypes.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.id} delay={index * 0.05}>
                <article className="contribution-card">
                  <div className="contribution-card__top"><span>{item.number}</span><div className="contribution-card__icon"><Icon size={18} /></div></div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="contribution-card__tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="reward-flow-card">
          <div className="reward-flow-card__header">
            <div><span className="mono-label">REVIEW-GATED REWARD FLOW</span><h3>Contribution in. Verified value out.</h3></div>
            <div className="reward-flow-card__pill"><BadgeCheck size={14} /> Human approval required</div>
          </div>
          <div className="reward-flow">
            {rewardSteps.map((step, index) => (
              <div className="reward-flow__item" key={step}>
                <span className={`reward-flow__node ${index === 3 ? 'is-approved' : ''}`}>{index === 3 ? <BadgeCheck size={15} /> : String(index + 1).padStart(2, '0')}</span>
                <span>{step}</span>
                {index < rewardSteps.length - 1 && <ArrowRight className="reward-flow__arrow" size={14} />}
              </div>
            ))}
          </div>
          <div className="community-safeguards">
            <div><ShieldAlert size={15} /><span>Spam & duplicate checks</span></div>
            <div><FileCheck2 size={15} /><span>Reviewer approval before rewards</span></div>
            <div><History size={15} /><span>Accepted & rejected history</span></div>
          </div>
        </Reveal>

        <div className="community-reward-note"><span className="reward-note-dot" /> Potential rewards may be platform tokens or USDC in a future design. No token name, payout, exchange rate or tokenomics are specified.</div>
      </div>
    </section>
  );
}
