import { ArrowRight, BadgeCheck, CircleDollarSign } from 'lucide-react';
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
              title={<>Help improve legal intelligence.<br /><span>Get rewarded for verified contributions.</span></>}
              description="People who know the law help keep the corpus current."
            />
            <div className="reward-status-card"><div className="reward-status-card__icon"><CircleDollarSign size={19} /></div><div><Badge tone="amber">Planned</Badge><p>Rewards are a future concept, possibly platform tokens or USDC. No token, payout or exchange rate is specified.</p></div></div>
          </div>
        </Reveal>

        <div className="contribution-grid">
          {contributionTypes.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.id} delay={index * 0.05}>
                <article className="contribution-card">
                  <div className="contribution-card__top"><div className="contribution-card__icon"><Icon size={18} /></div></div>
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
            <div><h3>Contribution in. Verified value out.</h3></div>
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
        </Reveal>

      </div>
    </section>
  );
}
