'use client';
import { useMemo, useState } from 'react';
import { tracks, artists, getArtist } from '@/lib/data';
import { TrackCard, ArtistCard } from '@/components/cards';
import { SectionHeader, EmptyState } from '@/components/ui';
export default function SearchClient({ initialQuery }: { initialQuery: string }) {
  const [q, setQ] = useState(initialQuery);
  const query = q.trim().toLowerCase();
  const trackResults = useMemo(() => query ? tracks.filter(t => t.title.toLowerCase().includes(query) || getArtist(t.artistId)?.name.toLowerCase().includes(query)) : [], [query]);
  const artistResults = useMemo(() => query ? artists.filter(a => a.name.toLowerCase().includes(query) || a.genres.some(g => g.toLowerCase().includes(query))) : [], [query]);
  const anything = trackResults.length + artistResults.length > 0;
  return <div className="max-w-6xl mx-auto space-y-8">
    <section><p className="text-xs uppercase tracking-widest text-primary mb-2">Search</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Find anything in the Yard.</h1>
      <div className="mt-4 max-w-xl"><input autoFocus value={q} onChange={e => setQ(e.target.value)}
        placeholder="Search tracks, artists, genres…" className="w-full bg-surface2 border border-line rounded-full px-4 py-2.5 text-sm focus-ring outline-none" /></div>
      {query && <p className="text-sm text-muted mt-2">{anything ? `${trackResults.length} tracks · ${artistResults.length} artists` : 'No results'}</p>}</section>
    {!query ? <EmptyState title="Start typing" description="Search across the demonstration catalogue." /> :
      !anything ? <EmptyState title="Nothing found" description={`No results for "${q}". Try another search.`} /> :
      <><>{artistResults.length > 0 && <section><SectionHeader title="Artists" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">{artistResults.map(a => <ArtistCard key={a.id} artist={a} />)}</div></section>}</>
        <>{trackResults.length > 0 && <section><SectionHeader title="Tracks" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {trackResults.map(t => <TrackCard key={t.id} track={t} queue={trackResults.filter(x => x.audioUrl)} />)}</div></section>}</></>}
  </div>;
}
