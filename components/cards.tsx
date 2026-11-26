'use client';
import Link from 'next/link';
import { Play, Heart, Check } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Track, Artist, Playlist } from '@/lib/types';
import { getArtist, getTrack } from '@/lib/data';
import { cn, formatCount } from '@/lib/utils';
import { Artwork } from './ui';
export function TrackCard({ track, queue }: { track: Track; queue?: Track[] }) {
  const play = useStore(s => s.play);
  const liked = useStore(s => s.likedTracks.includes(track.id));
  const toggleLike = useStore(s => s.toggleLike);
  const artist = getArtist(track.artistId);
  return <div className="group"><button onClick={() => play(track, queue)} className="block w-full text-left">
    <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
      <Artwork src={track.artwork} alt={track.title} className="w-full h-full" seed={track.id} />
      {!track.audioUrl && <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] uppercase tracking-wide px-2 py-1 rounded">Unavailable</span>}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-black rounded-full p-3"><Play className="w-5 h-5 fill-current" /></span></div>
    </div>
    <div className="flex items-start justify-between gap-2"><div className="min-w-0">
      <div className="font-medium truncate">{track.title}</div>
      <div className="text-sm text-muted truncate">{artist?.name}</div></div>
      <button onClick={(e) => { e.stopPropagation(); toggleLike(track.id); }} aria-label={liked ? 'Unlike' : 'Like'}
        className="shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity">
        <Heart className={cn('w-4 h-4', liked && 'fill-primary text-primary')} /></button></div>
  </button></div>;
}
export function ArtistCard({ artist }: { artist: Artist }) {
  const following = useStore(s => s.followedArtists.includes(artist.id));
  const toggleFollow = useStore(s => s.toggleFollow);
  return <Link href={`/artist/${artist.id}`} className="group text-center">
    <div className="relative aspect-square mb-3 overflow-hidden rounded-full">
      <Artwork src={artist.photo} alt={artist.name} className="w-full h-full" seed={artist.id} rounded={false} />
      {artist.isEmerging && <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">Rising</span>}
    </div>
    <div className="font-medium truncate">{artist.name}</div>
    <div className="text-xs text-muted truncate">{formatCount(artist.monthlyListeners)} listeners</div>
    <button onClick={(e) => { e.preventDefault(); toggleFollow(artist.id, artist.isEmerging); }}
      className={cn('mt-2 text-xs px-3 py-1 rounded-full border transition-colors', following ? 'border-primary text-primary bg-primary/10' : 'border-line hover:border-primary hover:text-primary')}>
      {following ? <><Check className="w-3 h-3 inline mr-1" />Following</> : 'Follow'}</button>
  </Link>;
}
export function PlaylistCard({ playlist }: { playlist: Playlist }) {
  const play = useStore(s => s.play);
  return <button onClick={() => {
    const t = getTrack(playlist.trackIds[0]); if (!t) return;
    const q = playlist.trackIds.map(getTrack).filter((x): x is Track => !!x);
    play(t, q);
  }} className="group text-left">
    <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
      <Artwork src={playlist.cover} alt={playlist.title} className="w-full h-full" seed={playlist.id} />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-black rounded-full p-3"><Play className="w-5 h-5 fill-current" /></span></div>
    </div>
    <div className="font-medium truncate">{playlist.title}</div>
    <div className="text-sm text-muted truncate">{playlist.description}</div>
  </button>;
}
