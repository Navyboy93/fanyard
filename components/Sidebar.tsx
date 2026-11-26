'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Flame, Sprout, BarChart3, Users, User, Sliders, Upload } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';
const items = [
  { href: '/home', label: 'Home', icon: Home }, { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/explore', label: 'Explore', icon: Flame }, { href: '/roots', label: 'Roots', icon: Sprout },
  { href: '/charts', label: 'Charts', icon: BarChart3 }, { href: '/community', label: 'Community', icon: Users },
  { href: '/my-yard', label: 'My Yard', icon: User },
];
const secondary = [ { href: '/studio', label: 'Artist Studio', icon: Upload }, { href: '/settings', label: 'Settings', icon: Sliders } ];
export function Sidebar() {
  const pathname = usePathname();
  return <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col bg-surface1 border-r border-line z-40">
    <div className="px-6 py-6"><Logo className="text-2xl" /><p className="text-[11px] uppercase tracking-widest text-muted mt-1">Where Music Belongs</p></div>
    <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== '/home' && pathname.startsWith(href));
        return <Link key={href} href={href} className={cn('flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors focus-ring', active ? 'bg-surface3 text-ink' : 'text-muted hover:text-ink hover:bg-surface2')}><Icon className="w-[18px] h-[18px]" />{label}</Link>;
      })}
    </nav>
    <div className="px-3 pb-3 pt-3 border-t border-line space-y-1">
      {secondary.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} className={cn('flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors focus-ring', pathname === href ? 'bg-surface3 text-ink' : 'text-muted hover:text-ink hover:bg-surface2')}><Icon className="w-[18px] h-[18px]" />{label}</Link>
      ))}
    </div>
  </aside>;
}
