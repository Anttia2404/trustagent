import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
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
}: HTMLAttributes<HTMLSpanElement> & { tone?: 'neutral' | 'green' | 'blue' | 'amber' }) {
  return (
    <span className={cn('badge', `badge--${tone}`, className)} {...props}>
      {children}
    </span>
  );
}

export function Surface({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('surface relative rounded-2xl border border-white/[.085] bg-[#0c100e]/90', className)} {...props} />;
}

/**
 * Section title block. `level={3}` marks a sub-section that sits under a chapter
 * intro (e.g. the ERC-8004 and x402 parts of the infrastructure chapter).
 */
export function SectionHeading({
  title,
  description,
  level = 2,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  level?: 2 | 3;
  className?: string;
}) {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
    <div className={cn('section-heading', level === 3 && 'section-heading--sub', className)}>
      <Heading>{title}</Heading>
      {description && <p>{description}</p>}
    </div>
  );
}
