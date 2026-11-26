'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { useStore } from '@/lib/store';
import { tracks, playlists, artists, getTrack } from '@/lib/data';
import { TrackCard, ArtistCard, PlaylistCard } from '@/components/cards';
import { SectionHeader } from '@/components/ui';
const MOODS = ['Late Night','Chill','Energetic','Sunset','Focus','Romance'] as const;
export default function HomePage() {
  const displayName = useStore(s => s.displayName);
  const recentlyPlayed = useStore(s => s.recentlyPlayed);
  const play = useStore(s => s.play);
  const recentTracks = useMemo(() => recentlyPlayed.map(getTrack).filter((t): t is NonNullable<typeof t> => !!t), [recentlyPlayed]);
  const madeForYou = tracks.filter(t => t.audioUrl).slice(4, 12);
  const rising = artists.filter(a => a.isEmerging);
  const gems = tracks.filter(t => t.isUndiscovered);
  const trending = [...tracks].filter(t => t.audioUrl).sort((a,b) => b.plays - a.plays).slice(0, 6);
  const newReleases = tracks.filter(t => t.isNew);
  return <div className="max-w-7xl mx-auto space-y-12">
    <section><p className="text-xs uppercase tracking-widest text-primary mb-2">Welcome back</p>
      <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Hey, {displayName}.</h1>
      <p className="text-muted mt-2">Here's what's growing in the Yard today.</p></section>
    {recentTracks.length > 0 && <section><SectionHeader title="Recently played" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">{recentTracks.slice(0, 6).map(t => <TrackCard key={t.id} track={t} queue={recentTracks} />)}</div></section>}
    <section><SectionHeader title="Made for you" subtitle="A blend of your recent listens and the Yard's emerging voices." />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{madeForYou.map(t => <TrackCard key={t.id} track={t} queue={madeForYou} />)}</div></section>
    <section className="bg-surface1 border border-line rounded-2xl p-6 md:p-8">
      <SectionHeader title="Rising in the Yard" subtitle="Emerging artists building momentum right now." action={<Link href="/roots" className="text-sm text-muted hover:text-ink">See all →</Link>} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">{rising.map(a => <ArtistCard key={a.id} artist={a} />)}</div></section>
    <section><SectionHeader title="Undiscovered gems" subtitle="Low play counts, high quality. Support the first listeners." action={<Link href="/discover" className="text-sm text-muted hover:text-ink">Swipe →</Link>} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">{gems.map(t => <TrackCard key={t.id} track={t} queue={gems} />)}</div></section>
    <section><SectionHeader title="Trending tracks" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">{trending.map(t => <TrackCard key={t.id} track={t} queue={trending} />)}</div></section>
    <section><SectionHeader title="Featured artists" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">{artists.slice(0, 6).map(a => <ArtistCard key={a.id} artist={a} />)}</div></section>
    <section><SectionHeader title="Recommended playlists" action={<Link href="/explore" className="text-sm text-muted hover:text-ink">Explore →</Link>} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{playlists.slice(0, 4).map(p => <PlaylistCard key={p.id} playlist={p} />)}</div></section>
    <section><SectionHeader title="New releases" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">{newReleases.map(t => <TrackCard key={t.id} track={t} queue={newReleases} />)}</div></section>
    <section><SectionHeader title="Explore by mood" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {MOODS.map(m => { const list = tracks.filter(t => t.mood === m && t.audioUrl);
          return <button key={m} onClick={() => list[0] && play(list[0], list)} className="relative aspect-square rounded-xl overflow-hidden bg-surface2 border border-line group text-left">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-end p-4"><span className="font-display text-lg font-bold">{m}</span></div>
          </button>; })}
      </div></section>
  </div>;
}
