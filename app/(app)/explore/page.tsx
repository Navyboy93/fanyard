'use client';
import { useMemo, useState } from 'react';
import { tracks, GENRES, MOODS, ACTIVITIES, COUNTRIES, LANGUAGES } from '@/lib/data';
import { TrackCard } from '@/components/cards';
import { SectionHeader, EmptyState } from '@/components/ui';
import { cn } from '@/lib/utils';
const FILTERS = ['genre','mood','country','language','activity'] as const;
type Filter = typeof FILTERS[number];
export default function ExplorePage() {
  const [active, setActive] = useState<Filter>('genre');
  const [value, setValue] = useState('');
  const options: Record<Filter, readonly string[]> = { genre: GENRES, mood: MOODS, country: COUNTRIES, language: LANGUAGES, activity: ACTIVITIES };
  const filtered = useMemo(() => {
    if (!value) return tracks.filter(t => t.audioUrl);
    return tracks.filter(t => { if (!t.audioUrl) return false;
      if (active === 'genre') return t.genre === value;
      if (active === 'mood') return t.mood === value;
      if (active === 'country') return t.country === value;
      if (active === 'language') return t.language === value;
      if (active === 'activity') return true;
      return true; });
  }, [active, value]);
  return <div className="max-w-7xl mx-auto space-y-10">
    <section><p className="text-xs uppercase tracking-widest text-primary mb-2">Explore</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Every corner of the Yard.</h1>
      <p className="text-muted mt-2">A strong focus on African and international music culture.</p></section>
    <div className="flex flex-wrap gap-2">{FILTERS.map(f => (
      <button key={f} onClick={() => { setActive(f); setValue(''); }}
        className={cn('px-4 py-2 rounded-full text-sm border focus-ring', active === f ? 'bg-primary text-black border-primary font-semibold' : 'border-line text-muted hover:text-ink')}>By {f}</button>))}</div>
    <div className="flex flex-wrap gap-2">{options[active].map(o => (
      <button key={o} onClick={() => setValue(o === value ? '' : o)}
        className={cn('px-3 py-1.5 rounded-full text-xs border focus-ring', value === o ? 'bg-primary text-black border-primary font-semibold' : 'border-line text-muted hover:text-ink')}>{o}</button>))}</div>
    <section><SectionHeader title={value ? `${value} tracks` : 'Browse all'} subtitle={value ? `Filtered by ${active}` : 'Select a filter above to narrow the Yard.'} />
      {filtered.length === 0 ? <EmptyState title="Nothing here yet" description="No tracks match this filter. Try another combination." /> :
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">{filtered.map(t => <TrackCard key={t.id} track={t} queue={filtered} />)}</div>}</section>
    <section className="bg-surface1 border border-line rounded-2xl p-6 md:p-8">
      <SectionHeader title="Trending now" subtitle="Across all genres and regions." />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...tracks].filter(t => t.audioUrl).sort((a,b) => b.plays - a.plays).slice(0, 10).map(t => <TrackCard key={t.id} track={t} queue={tracks.filter(x => x.audioUrl)} />)}</div></section>
    <section><SectionHeader title="New releases" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {tracks.filter(t => t.isNew && t.audioUrl).map(t => <TrackCard key={t.id} track={t} queue={tracks.filter(x => x.isNew && x.audioUrl)} />)}</div></section>
  </div>;
}
