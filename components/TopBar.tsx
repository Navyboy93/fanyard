'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Moon, Sun, Bell } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
export function TopBar() {
  const router = useRouter();
  const theme = useStore(s => s.theme);
  const toggleTheme = useStore(s => s.toggleTheme);
  const displayName = useStore(s => s.displayName);
  const [q, setQ] = useState('');
  return <header className="sticky top-0 z-30 bg-bg/85 backdrop-blur border-b border-line">
    <div className="flex items-center gap-3 px-4 md:px-8 h-16">
      <Link href="/home" className="lg:hidden font-display text-xl tracking-tight"><span className="font-bold">FAN</span><span className="font-light">yard</span></Link>
      <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`); }} className="flex-1 max-w-xl relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search the Yard" aria-label="Search"
          className="w-full bg-surface2 border border-line rounded-full pl-9 pr-3 py-2 text-sm focus-ring outline-none placeholder:text-muted" />
      </form>
      <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full hover:bg-surface2 focus-ring">{theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
      <button aria-label="Notifications" className="p-2 rounded-full hover:bg-surface2 focus-ring relative"><Bell className="w-5 h-5" /><span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" /></button>
      <Link href="/my-yard" aria-label="Profile" className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-surface2 focus-ring">
        <span className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center text-sm font-bold">{displayName.charAt(0).toUpperCase()}</span>
        <span className="hidden md:inline text-sm">{displayName}</span></Link>
    </div>
  </header>;
}
