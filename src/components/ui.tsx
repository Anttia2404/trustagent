import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/utils';
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export function Button({ className, variant = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={cn('button', `button--${variant}`, className)} {...props} />;
}
export function ActionLink({ className, variant = 'primary', ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: ButtonVariant }) {
  return <a className={cn('button', `button--${variant}`, className)} {...props} />;
}
export function Badge({ className, tone = 'neutral', ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: 'neutral' | 'green' | 'blue' | 'amber' }) {
  return <span className={cn('badge', `badge--${tone}`, className)} {...props} />;
}
export function Surface({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('surface', className)} {...props} />;
}
export function SectionHeading({ title, description, level = 2, className }: { title: ReactNode; description?: ReactNode; level?: 2 | 3; className?: string }) {
  const Heading = level === 2 ? 'h2' : 'h3';
  return <div className={cn('section-heading', className)}><Heading>{title}</Heading>{description && <p>{description}</p>}</div>;
}
