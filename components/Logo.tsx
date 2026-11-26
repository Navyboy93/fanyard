import Link from 'next/link';
import { cn } from '@/lib/utils';
export function Logo({ className, href = '/home' }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn('inline-flex items-baseline font-display tracking-tight', className)}>
      <span className="font-bold">FAN</span><span className="font-light">yard</span>
    </Link>
  );
}
