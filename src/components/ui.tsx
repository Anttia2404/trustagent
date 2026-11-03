import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const buttonVariants = cva(
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b0a] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[#c1ff83] text-[#091007] shadow-[0_0_28px_rgba(183,247,122,.13)] hover:bg-[#d2ffa1]',
        secondary: 'border border-white/12 bg-white/[.035] text-white hover:border-white/20 hover:bg-white/[.07]',
        ghost: 'text-white/70 hover:bg-white/[.06] hover:text-white',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
);

export function Button({
  className,
  variant = 'primary',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; children: ReactNode }) {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ActionLink({
  className,
  variant = 'primary',
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: ButtonVariant; children: ReactNode }) {
  return (
    <a
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {children}
    </a>
  );
}

export function Badge({
  className,
  children,
  tone = 'neutral',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: 'neutral' | 'green' | 'blue' | 'amber' | 'red' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[.1em]',
        tone === 'neutral' && 'border-white/10 bg-white/[.035] text-[#a5aea9]',
        tone === 'green' && 'border-[#b7f77a]/20 bg-[#b7f77a]/[.08] text-[#c8ff9b]',
        tone === 'blue' && 'border-sky-300/20 bg-sky-300/[.08] text-sky-200',
        tone === 'amber' && 'border-amber-300/20 bg-amber-300/[.08] text-amber-100',
        tone === 'red' && 'border-rose-300/20 bg-rose-300/[.08] text-rose-200',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function Surface({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('surface relative rounded-2xl border border-white/[.085] bg-[#0c100e]/90', className)} {...props} />;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('eyebrow', className)}>{children}</div>;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('section-heading', className)}>
      <div className="section-heading__meta">
        <span className="section-index">{index}</span>
        <span className="section-heading__eyebrow">{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function ArrowLink({ children, href, className }: { children: ReactNode; href: string; className?: string }) {
  return (
    <a href={href} className={cn('arrow-link', className)}>
      {children}
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}
