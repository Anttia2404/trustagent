import { ArrowRight } from 'lucide-react';
import { evidenceSteps } from '../lib/content';
import { SectionHeading } from './ui';
import { Reveal } from './Reveal';

export function EvidenceSection() {
  return (
    <section className="section section--evidence" id="evidence">
      <div className="shell">
        <Reveal>
          <div className="evidence-heading-grid">
            <SectionHeading
              level={3}
              title={<>Lưu lại bằng chứng.</>}
              description="Câu trả lời trả phí có thể kèm biên nhận gồm mã băm câu trả lời, nguồn trích dẫn và phiên bản chỉ mục."
            />
          </div>
        </Reveal>

        <Reveal className="evidence-pipeline-wrap">
          <div className="pipeline-header"><span className="mono-label">Luồng biên nhận giao thông trả phí</span></div>
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

      </div>
    </section>
  );
}
