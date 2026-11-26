'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Flame, Sprout, TrendingUp } from 'lucide-react';
import { useStore } from '@/lib/store';
import { artists, tracks, getArtist } from '@/lib/data';
import { ArtistCard, TrackCard } from '@/components/cards';
import { SectionHeader, Badge, EmptyState } from '@/components/ui';
import { formatCount, cn } from '@/lib/utils';
const SORTS = ['Listeners','Followers','Day One Fans'] as const;
export default function RootsPage() {
  const dayOneFans = useStore(s => s.dayOneFans);
  const [sort, setSort] = useState<typeof SORTS[number]>('Listeners');
  const emerging = useMemo(() => {
    const list = artists.filter(a => a.isEmerging);
    if (sort === 'Followers') return [...list].sort((a,b) => b.followers - a.followers);
    if (sort === 'Day One Fans') return [...list].sort((a,b) => b.dayOneFans - a.dayOneFans);
    return [...list].sort((a,b) => b.monthlyListeners - a.monthlyListeners);
  }, [sort]);
  const radar = [...emerging].sort((a,b) => b.dayOneFans - a.dayOneFans).slice(0, 3);
  return <div className="max-w-7xl mx-auto space-y-10">
    <section><p className="text-xs uppercase tracking-widest text-primary mb-2">Roots</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Where artists begin.</h1>
      <p className="text-muted mt-2 max-w-2xl">Emerging artists are curated here — never paid-placement. Every rising name earns their spot through the community.</p></section>
    <section className="bg-surface1 border border-line rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4"><Flame className="w-5 h-5 text-primary" /><h2 className="font-display text-xl font-bold">Breakout Radar</h2>
        <Badge variant="outline" className="ml-2">Demonstration data</Badge></div>
      <div className="grid md:grid-cols-3 gap-4">{radar.map((a, i) => (
        <Link key={a.id} href={`/artist/${a.id}`} className="flex gap-3 p-3 rounded-lg hover:bg-surface2">
          <div className="w-6 font-display font-bold text-primary text-xl shrink-0">{i+1}</div>
          <div className="flex-1 min-w-0"><div className="font-medium truncate">{a.name}</div>
            <div className="text-xs text-muted">{formatCount(a.dayOneFans)} Day One Fans · {a.country}</div></div>
          <TrendingUp className="w-4 h-4 text-primary shrink-0" /></Link>))}</div></section>
    <div className="flex flex-wrap items-center gap-2"><span className="text-xs uppercase tracking-widest text-muted">Sort by</span>
      {SORTS.map(s => <button key={s} onClick={() => setSort(s)}
        className={cn('px-3 py-1.5 rounded-full text-xs border focus-ring', sort === s ? 'bg-primary text-black border-primary font-semibold' : 'border-line text-muted hover:text-ink')}>{s}</button>)}</div>
    <section><SectionHeader title="Emerging artists" subtitle={`${emerging.length} names worth knowing now.`} />
      {emerging.length === 0 ? <EmptyState title="No emerging artists yet" description="Check back soon." /> :
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{emerging.map(a => <ArtistCard key={a.id} artist={a} />)}</div>}</section>
    <section><SectionHeader title="Undiscovered talent" subtitle="Low listener counts. High potential." />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {emerging.flatMap(a => tracks.filter(t => t.artistId === a.id)).slice(0, 8).map(t => <TrackCard key={t.id} track={t} queue={tracks.filter(x => x.audioUrl)} />)}</div></section>
    {dayOneFans.length > 0 && <section className="bg-surface1 border border-line rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-2"><Sprout className="w-5 h-5 text-primary" /><h2 className="font-display text-xl font-bold">Your Day One Fans</h2></div>
      <p className="text-sm text-muted mb-4">Artists you supported before they broke through.</p>
      <div className="flex flex-wrap gap-2">{dayOneFans.map(id => { const a = getArtist(id); if (!a) return null;
        return <Link key={id} href={`/artist/${id}`} className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary text-primary text-sm">{a.name}</Link>; })}</div>
    </section>}
  </div>;
}
