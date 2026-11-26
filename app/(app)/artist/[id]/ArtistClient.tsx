'use client';
import Link from 'next/link';
import { Play, Check } from 'lucide-react';
import { useStore } from '@/lib/store';
import { getArtist, tracksByArtist, posts } from '@/lib/data';
import { Artwork, Badge, SectionHeader } from '@/components/ui';
import { TrackCard } from '@/components/cards';
import { cn, formatCount } from '@/lib/utils';
export default function ArtistClient({ artistId }: { artistId: string }) {
  const artist = getArtist(artistId);
  const play = useStore(s => s.play);
  const following = useStore(s => s.followedArtists.includes(artistId));
  const toggleFollow = useStore(s => s.toggleFollow);
  const isDayOne = useStore(s => s.dayOneFans.includes(artistId));
  if (!artist) return <div className="max-w-3xl mx-auto py-20 text-center">
    <h1 className="font-display text-2xl font-bold">Artist not found</h1>
    <Link href="/roots" className="mt-4 inline-block text-primary">Back to Roots</Link></div>;
  const artistTracks = tracksByArtist(artist.id);
  const playable = artistTracks.filter(t => t.audioUrl);
  const artistPosts = posts.filter(p => p.artistId === artist.id);
  const related = artist.relatedArtists.map(getArtist).filter((a): a is NonNullable<typeof a> => !!a);
  return <div className="max-w-6xl mx-auto">
    <div className="relative rounded-2xl overflow-hidden -mt-6 mb-6">
      <Artwork src={artist.cover} alt={artist.name} className="w-full h-48 md:h-72" seed={`${artist.id}-cov`} rounded={false} />
      <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" /></div>
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 md:-mt-24 px-4 md:px-6 relative z-10">
      <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-bg shrink-0">
        <Artwork src={artist.photo} alt={artist.name} className="w-full h-full" seed={artist.id} rounded={false} /></div>
      <div className="flex-1"><div className="flex flex-wrap items-center gap-2 mb-2">
        {artist.isEmerging && <Badge variant="primary">Rising</Badge>}
        {isDayOne && <Badge variant="outline">Day One Fan</Badge>}
        <Badge variant="outline">{artist.country}</Badge></div>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">{artist.name}</h1>
        <p className="text-sm text-muted mt-1">{formatCount(artist.monthlyListeners)} monthly listeners · {formatCount(artist.followers)} followers</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <button onClick={() => playable[0] && play(playable[0], playable)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-black font-semibold text-sm focus-ring"><Play className="w-4 h-4 fill-current" /> Play</button>
          <button onClick={() => toggleFollow(artist.id, artist.isEmerging)}
            className={cn('inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm focus-ring', following ? 'border-primary text-primary bg-primary/10' : 'border-line')}>
            {following ? <><Check className="w-4 h-4" /> Following</> : 'Follow'}</button></div></div></div>
    <p className="text-muted mt-6 max-w-2xl px-4 md:px-6">{artist.bio}</p>
    <section className="mt-10"><SectionHeader title="Popular tracks" />
      <div className="space-y-1">{artistTracks.map((t, i) => (
        <button key={t.id} onClick={() => t.audioUrl && play(t, playable)} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-surface2 text-left">
          <span className="w-6 text-muted text-sm tabular-nums text-center">{i+1}</span>
          <Artwork src={t.artwork} alt={t.title} className="w-10 h-10" seed={t.id} />
          <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{t.title}</div>
            <div className="text-xs text-muted">{formatCount(t.plays)} plays</div></div>
          {!t.audioUrl && <Badge variant="outline">Unavailable</Badge>}</button>))}</div></section>
    {artistPosts.length > 0 && <section className="mt-10"><SectionHeader title="Artist updates" />
      <div className="space-y-3">{artistPosts.map(p => <div key={p.id} className="border border-line rounded-xl p-4 bg-surface1">
        <p className="text-sm">{p.content}</p><div className="text-xs text-muted mt-2">{p.likes} likes · {p.comments} comments · {p.time}</div></div>)}</div></section>}
    <section className="mt-10"><SectionHeader title="Fan community" subtitle={`${formatCount(artist.dayOneFans || artist.followers)} fans in the Yard`} />
      <div className="grid grid-cols-3 gap-3">{playable.slice(0, 3).map(t => <TrackCard key={t.id} track={t} queue={playable} />)}</div></section>
    {related.length > 0 && <section className="mt-10 mb-12"><SectionHeader title="Related artists" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{related.map(a => (
        <Link key={a.id} href={`/artist/${a.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface2">
          <Artwork src={a.photo} alt={a.name} className="w-12 h-12 rounded-full" seed={a.id} rounded={false} />
          <div className="min-w-0"><div className="text-sm font-medium truncate">{a.name}</div>
            <div className="text-xs text-muted">{formatCount(a.monthlyListeners)} listeners</div></div></Link>))}</div></section>}
  </div>;
}
