'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Sprout, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';
const items = [
  { href: '/home', label: 'Home', icon: Home }, { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/roots', label: 'Roots', icon: Sprout }, { href: '/community', label: 'Community', icon: Users },
  { href: '/my-yard', label: 'My Yard', icon: User },
];
export function MobileNav() {
  const pathname = usePathname();
  return <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface1 border-t border-line z-40 flex items-center">
    {items.map(({ href, label, icon: Icon }) => {
      const active = pathname === href || (href !== '/home' && pathname.startsWith(href));
      return <Link key={href} href={href} className={cn('flex-1 flex flex-col items-center gap-0.5 text-[10px] font-medium', active ? 'text-primary' : 'text-muted')}>
        <Icon className="w-5 h-5" />{label}</Link>;
    })}
  </nav>;
}
