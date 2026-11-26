'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
export function Artwork({ src, alt, className, seed, rounded = true }: { src?: string | null; alt: string; className?: string; seed?: string; rounded?: boolean }) {
  const [err, setErr] = useState(false);
  const initials = alt.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  if (!src || err) {
    return <div className={cn('bg-gradient-to-br from-primary/30 via-surface3 to-surface1 flex items-center justify-center', rounded && 'rounded-lg', className)}>
      <span className="font-display font-bold text-xl text-ink/60">{initials || '♪'}</span></div>;
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setErr(true)} className={cn('object-cover', rounded && 'rounded-lg', className)} />;
}
export function Badge({ children, variant = 'default', className }: { children: React.ReactNode; variant?: 'default'|'primary'|'muted'|'outline'; className?: string }) {
  const s = { default: 'bg-surface3 text-ink', primary: 'bg-primary text-black font-semibold', muted: 'bg-surface2 text-muted', outline: 'border border-line text-muted' };
  return <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider', s[variant], className)}>{children}</span>;
}
export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return <div className="flex items-end justify-between mb-5"><div>
    <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
    {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
  </div>{action}</div>;
}
export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="text-center py-16 px-6 border border-line rounded-xl bg-surface1/50">
    <p className="font-display text-lg font-semibold mb-1">{title}</p>
    <p className="text-sm text-muted max-w-sm mx-auto">{description}</p></div>;
}
