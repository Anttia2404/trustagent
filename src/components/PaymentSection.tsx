import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Bot, Check, CircleDollarSign, FileCheck2, MessageSquareText, ReceiptText } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { Reveal } from './Reveal';

const steps = [
  { label: 'Yêu cầu', message: 'Gửi câu hỏi', icon: MessageSquareText },
  { label: 'Báo phí', message: '402 · Yêu cầu trả phí', icon: ReceiptText },
  { label: 'USDC', message: '0,01 USDC', icon: CircleDollarSign },
  { label: 'Kết quả', message: 'Câu trả lời + nguồn', icon: FileCheck2 },
];
const durations = [1800, 2200, 2200, 1800, 3800];
const lawSource = 'https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm';

export function PaymentSection() {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const current = reduceMotion ? 4 : phase;
  const stepIndex = Math.min(current, 3);
  const step = steps[stepIndex];
  const StepIcon = step.icon;
  const outbound = current === 0 || current === 2;
  const done = current === 4;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !('IntersectionObserver' in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduceMotion) return;
    const timer = window.setTimeout(() => setPhase((value) => (value + 1) % durations.length), durations[phase]);
    return () => window.clearTimeout(timer);
  }, [phase, visible, reduceMotion]);

  return <section ref={sectionRef} className="section section--payment" id="payment" aria-labelledby="payment-heading"><div className="shell">
    <Reveal className="x402-heading"><h3 id="payment-heading">Trả phí từng lượt.</h3><p>Qua x402, Agent trả phí rồi nhận câu trả lời kèm nguồn.</p></Reveal>
    <Reveal><div className="x402-demo" data-ui data-phase={current}>
      <ol className="x402-stages" aria-label="Các bước thanh toán x402">{steps.map((item, index) => {
        const Icon = item.icon;
        return <li key={item.label} className={`${index === stepIndex ? 'is-current' : ''} ${index < stepIndex || done ? 'is-complete' : ''}`} aria-current={index === stepIndex ? 'step' : undefined}><span>{index < stepIndex || done ? <Check size={15} /> : <Icon size={15} />}</span>{item.label}</li>;
      })}</ol>
      <div className="x402-exchange" role="group" aria-label="Minh hoạ tự động: gửi câu hỏi, nhận yêu cầu thanh toán 402, xác nhận USDC, nhận câu trả lời">
        <div className={`x402-actor ${outbound || done ? 'is-active' : ''}`}><div className="x402-actor-icon"><Bot size={34} strokeWidth={1.4} /></div><strong>Agent gọi</strong></div>
        <div className="x402-channel">
          <div className="x402-message" key={current}><StepIcon size={18} /><span>{done ? 'Đã nhận kết quả' : step.message}</span></div>
          <svg className="x402-wire" viewBox="0 0 400 144" preserveAspectRatio="none" aria-hidden="true">
            <defs><marker id="x402-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L8 4.5L0 9" fill="none" stroke="var(--accent)" strokeWidth="1.6" /></marker></defs>
            <path d={outbound ? 'M6 72H394' : 'M394 72H6'} fill="none" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" markerEnd="url(#x402-arrow)" />
            {!done && visible && !reduceMotion && <circle className="x402-packet" key={current} r="5" fill="var(--document)"><animateMotion dur="1.5s" repeatCount="1" fill="freeze" path={outbound ? 'M6 72H394' : 'M394 72H6'} /></circle>}
          </svg>
        </div>
        <div className={`x402-actor ${!outbound && !done ? 'is-active' : ''}`}><div className="x402-actor-icon"><BrandMark size={38} className="x402-brandmark" /></div><strong>TrustAgent</strong></div>
      </div>
      <div className={`x402-scene ${done ? 'is-delivered' : ''}`} key={current}>
        {current === 0 && <><MessageSquareText size={25} strokeWidth={1.4} /><p>Ngồi sau xe máy có cần đội mũ bảo hiểm?</p></>}
        {current === 1 && <><ReceiptText size={25} strokeWidth={1.4} /><p>0,01 USDC</p><span>Phí minh hoạ cho một lượt hỏi.</span></>}
        {current === 2 && <><CircleDollarSign size={25} strokeWidth={1.4} /><p>Xác nhận thanh toán</p><span>Agent uỷ quyền trả phí bằng USDC.</span></>}
        {current === 3 && <><FileCheck2 size={25} strokeWidth={1.4} /><p>Trả lời kèm nguồn</p><span>Kết quả được gửi về Agent gọi.</span></>}
        {done && <><Check size={25} /><p>Có. Người ngồi sau cũng phải đội mũ bảo hiểm.</p><div className="x402-answer-proof"><a href={lawSource} target="_blank" rel="noreferrer">Khoản 2 Điều 33</a><span><ReceiptText size={15} /> Kèm biên nhận</span></div></>}
      </div>
    </div></Reveal>
  </div></section>;
}
