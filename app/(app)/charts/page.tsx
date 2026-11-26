'use client';
import { useState, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { tracks, artists, GENRES, getArtist, COUNTRIES } from '@/lib/data';
import { TrackCard, ArtistCard } from '@/components/cards';
import { SectionHeader, Badge, EmptyState } from '@/components/ui';
import { cn, formatCount } from '@/lib/utils';
const TABS = ['Trending','Rising','New Releases','By Genre','By Region','Breakout Radar'] as const;
type Tab = typeof TABS[number];
export default function ChartsPage() {
  const [tab, setTab] = useState<Tab>('Trending');
  const [region, setRegion] = useState('');
  const play = useStore(s => s.play);
  const trending = useMemo(() => [...tracks].filter(t => t.audioUrl).sort((a,b) => b.plays - a.plays), []);
  const rising = useMemo(() => artists.filter(a => a.isEmerging).sort((a,b) => b.followers - a.followers), []);
  const newReleases = tracks.filter(t => t.isNew && t.audioUrl);
  const breakout = useMemo(() => artists.filter(a => a.isEmerging).sort((a,b) => b.dayOneFans - a.dayOneFans).slice(0, 5), []);
  const byRegion = region ? tracks.filter(t => t.country === region && t.audioUrl) : [];
  return <div className="max-w-7xl mx-auto space-y-8">
    <section><p className="text-xs uppercase tracking-widest text-primary mb-2">Charts</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">What's moving the Yard.</h1>
      <p className="text-muted mt-2">All chart data is fictional demonstration content. No paid placement.</p></section>
    <div className="flex flex-wrap gap-2">{TABS.map(t => (
      <button key={t} onClick={() => setTab(t)}
        className={cn('px-4 py-2 rounded-full text-sm border focus-ring', tab === t ? 'bg-primary text-black border-primary font-semibold' : 'border-line text-muted hover:text-ink')}>{t}</button>))}</div>
    {tab === 'Trending' && <section><SectionHeader title="Trending tracks" subtitle="Ranked by demonstration play counts." />
      <div className="space-y-1">{trending.slice(0, 15).map((t, i) => (
        <button key={t.id} onClick={() => play(t, trending)} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-surface2 text-left">
          <span className="w-6 text-center font-display font-bold text-primary">{i+1}</span>
          <img src={t.artwork} alt={t.title} className="w-10 h-10 rounded object-cover" />
          <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{t.title}</div>
            <div className="text-xs text-muted">{getArtist(t.artistId)?.name}</div></div>
          <span className="text-xs text-muted">{formatCount(t.plays)}</span></button>))}</div></section>}
    {tab === 'Rising' && <section><SectionHeader title="Rising artists" subtitle="Emerging talent to watch." />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">{rising.map(a => <ArtistCard key={a.id} artist={a} />)}</div></section>}
    {tab === 'New Releases' && <section><SectionHeader title="New releases" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">{newReleases.map(t => <TrackCard key={t.id} track={t} queue={newReleases} />)}</div></section>}
    {tab === 'By Genre' && <section className="space-y-6">{GENRES.map(g => {
      const list = tracks.filter(t => t.genre === g && t.audioUrl).sort((a,b) => b.plays - a.plays);
      if (!list.length) return null;
      return <div key={g}><SectionHeader title={g} action={<Badge variant="outline">{list.length} tracks</Badge>} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">{list.slice(0, 5).map(t => <TrackCard key={t.id} track={t} queue={list} />)}</div></div>; })}</section>}
    {tab === 'By Region' && <section className="space-y-4">
      <div className="flex flex-wrap gap-2">{COUNTRIES.map(c => (
        <button key={c} onClick={() => setRegion(c === region ? '' : c)}
          className={cn('px-3 py-1.5 rounded-full text-xs border focus-ring', region === c ? 'bg-primary text-black border-primary font-semibold' : 'border-line text-muted hover:text-ink')}>{c}</button>))}</div>
      {!region ? <EmptyState title="Select a region" description="Pick a country to see its chart." /> :
        byRegion.length === 0 ? <EmptyState title="No chart data" description="No demonstration tracks for this region yet." /> :
        <div className="space-y-1">{byRegion.map((t, i) => (
          <button key={t.id} onClick={() => play(t, byRegion)} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-surface2 text-left">
            <span className="w-6 text-center font-display font-bold text-primary">{i+1}</span>
            <img src={t.artwork} alt={t.title} className="w-10 h-10 rounded object-cover" />
            <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{t.title}</div>
              <div className="text-xs text-muted">{getArtist(t.artistId)?.name}</div></div>
            <span className="text-xs text-muted">{formatCount(t.plays)}</span></button>))}</div>}</section>}
    {tab === 'Breakout Radar' && <section><SectionHeader title="Breakout Radar" subtitle="Early signals from the edges of the Yard." />
      <div className="space-y-2">{breakout.map((a, i) => (
        <div key={a.id} className="flex items-center gap-3 p-3 border border-line rounded-xl bg-surface1">
          <span className="font-display font-bold text-primary text-xl w-6">{i+1}</span>
          <img src={a.photo} alt={a.name} className="w-12 h-12 rounded-full object-cover" />
          <div className="flex-1 min-w-0"><div className="font-medium truncate">{a.name}</div>
            <div className="text-xs text-muted">{a.country} · {a.genres.join(' / ')}</div></div>
          <div className="text-right"><div className="text-sm font-semibold text-primary">{a.dayOneFans}</div>
            <div className="text-[10px] text-muted uppercase">Day One Fans</div></div></div>))}</div></section>}
  </div>;
}
