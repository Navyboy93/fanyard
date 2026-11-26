'use client';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { Player } from '@/components/Player';
import { FullPlayer } from '@/components/FullPlayer';
import { MobileNav } from '@/components/MobileNav';
import { AudioEngine } from '@/components/AudioEngine';
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-bg text-ink">
    <AudioEngine /><Sidebar />
    <div className="lg:pl-60"><TopBar /><main className="px-4 md:px-8 py-6 pb-40 lg:pb-28">{children}</main></div>
    <Player /><FullPlayer /><MobileNav />
  </div>;
}
