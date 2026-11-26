'use client';
import { useMemo, useState } from 'react';
import { Trash2, Plus, Heart } from 'lucide-react';
import { useStore } from '@/lib/store';
import { getTrack, getArtist } from '@/lib/data';
import { TrackCard, ArtistCard } from '@/components/cards';
import { SectionHeader, EmptyState, Artwork, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';
const TABS = ['Liked','Saved','Following','Playlists','History','Achievements','Taste'] as const;
type Tab = typeof TABS[number];
export default function MyYardPage() {
  const s = useStore();
  const [tab, setTab] = useState<Tab>('Liked');
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const liked = useMemo(() => s.likedTracks.map(getTrack).filter((t): t is NonNullable<typeof t> => !!t), [s.likedTracks]);
  const savedTracks = useMemo(() => s.savedAlbums.map(getTrack).filter((t): t is NonNullable<typeof t> => !!t), [s.savedAlbums]);
  const following = useMemo(() => s.followedArtists.map(getArtist).filter((a): a is NonNullable<typeof a> => !!a), [s.followedArtists]);
  const history = useMemo(() => s.recentlyPlayed.map(getTrack).filter((t): t is NonNullable<typeof t> => !!t), [s.recentlyPlayed]);
  const taste = useMemo(() => { const c: Record<string, number> = {};
    [...liked, ...history].forEach(t => { c[t.genre] = (c[t.genre] || 0) + 1; });
    return Object.entries(c).sort((a,b) => b[1] - a[1]).slice(0, 3); }, [liked, history]);
  return <div className="max-w-7xl mx-auto space-y-8">
    <section><p className="text-xs uppercase tracking-widest text-primary mb-2">My Yard</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{s.displayName}</h1>
      <p className="text-muted mt-1">Your musical identity, saved locally on this device.</p></section>
    <div className="flex flex-wrap gap-2">{TABS.map(t => (
      <button key={t} onClick={() => setTab(t)}
        className={cn('px-4 py-2 rounded-full text-sm border focus-ring', tab === t ? 'bg-primary text-black border-primary font-semibold' : 'border-line text-muted hover:text-ink')}>{t}</button>))}</div>
    {tab === 'Liked' && (liked.length ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">{liked.map(t => <TrackCard key={t.id} track={t} queue={liked} />)}</div>
      : <EmptyState title="No liked tracks yet" description="Tap the heart on any track to save it here." />)}
    {tab === 'Saved' && (savedTracks.length ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">{savedTracks.map(t => <TrackCard key={t.id} track={t} queue={savedTracks} />)}</div>
      : <EmptyState title="No saved tracks yet" description="Save tracks while discovering." />)}
    {tab === 'Following' && (following.length ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{following.map(a => <ArtistCard key={a.id} artist={a} />)}</div>
      : <EmptyState title="Not following anyone yet" description="Follow artists to build your Yard." />)}
    {tab === 'Playlists' && <div className="space-y-6">
      <div className="flex flex-wrap gap-2">{creating ? <div className="flex gap-2">
        <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Playlist name"
          className="bg-surface2 border border-line rounded-full px-4 py-2 text-sm focus-ring" />
        <button onClick={() => { if (newName.trim()) { s.createPlaylist(newName.trim()); setNewName(''); setCreating(false); } }}
          className="px-4 py-2 rounded-full bg-primary text-black text-sm font-semibold">Create</button>
        <button onClick={() => setCreating(false)} className="px-4 py-2 rounded-full border border-line text-sm">Cancel</button></div>
        : <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line text-sm hover:border-primary"><Plus className="w-4 h-4" /> New playlist</button>}</div>
      {s.playlists.length === 0 ? <EmptyState title="No playlists yet" description="Create your first playlist above." /> :
        <div className="space-y-4">{s.playlists.map(p => { const pT = p.trackIds.map(getTrack).filter((t): t is NonNullable<typeof t> => !!t);
          return <div key={p.id} className="border border-line rounded-xl p-4 bg-surface1">
            <div className="flex items-center gap-3 mb-3"><Artwork src={p.cover} alt={p.title} className="w-12 h-12" seed={p.id} />
              <div className="flex-1"><div className="font-medium">{p.title}</div><div className="text-xs text-muted">{pT.length} tracks · {p.curator}</div></div></div>
            <div className="space-y-1">{pT.map(t => <div key={t.id} className="flex items-center gap-2 p-1.5 rounded hover:bg-surface2">
              <Artwork src={t.artwork} alt={t.title} className="w-8 h-8" seed={t.id} />
              <div className="flex-1 min-w-0"><div className="text-sm truncate">{t.title}</div><div className="text-xs text-muted truncate">{getArtist(t.artistId)?.name}</div></div>
              <button onClick={() => s.removeTrackFromPlaylist(p.id, t.id)} aria-label="Remove" className="p-1.5 text-muted hover:text-ink"><Trash2 className="w-4 h-4" /></button></div>)}
              {pT.length === 0 && <p className="text-xs text-muted">No tracks yet.</p>}</div></div>; })}</div>}
    </div>}
    {tab === 'History' && (history.length ? <div className="space-y-1">{history.map((t, i) => (
      <div key={`${t.id}-${i}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface2">
        <Artwork src={t.artwork} alt={t.title} className="w-10 h-10" seed={t.id} />
        <div className="flex-1 min-w-0"><div className="text-sm truncate">{t.title}</div><div className="text-xs text-muted">{getArtist(t.artistId)?.name}</div></div></div>))}</div>
      : <EmptyState title="No listening history" description="Play a track to start building your history." />)}
    {tab === 'Achievements' && <div className="grid md:grid-cols-2 gap-4">
      <div className="border border-line rounded-xl p-6 bg-surface1"><Badge variant="primary" className="mb-3">Day One Fan</Badge>
        <h3 className="font-display text-xl font-bold">You were here first.</h3>
        <p className="text-sm text-muted mt-1">Achievement for supporting emerging artists before they break.</p>
        <div className="mt-4">{s.dayOneFans.length === 0 ? <p className="text-sm text-muted">Follow an emerging artist from Roots to unlock.</p> :
          <div className="flex flex-wrap gap-2">{s.dayOneFans.map(id => { const a = getArtist(id); if (!a) return null;
            return <span key={id} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs border border-primary">{a.name}</span>; })}</div>}</div></div>
      <div className="border border-line rounded-xl p-6 bg-surface1"><Heart className="w-5 h-5 text-primary mb-3" />
        <h3 className="font-display text-xl font-bold">{liked.length} tracks liked</h3>
        <p className="text-sm text-muted mt-1">Keep curating. The Yard remembers.</p></div></div>}
    {tab === 'Taste' && <div className="grid md:grid-cols-2 gap-6">
      <div className="border border-line rounded-xl p-6 bg-surface1"><h3 className="font-display text-xl font-bold mb-3">Your taste profile</h3>
        {taste.length === 0 ? <p className="text-sm text-muted">Play and like tracks to reveal your taste.</p> :
          <div className="space-y-3">{taste.map(([genre, count]) => { const max = taste[0][1];
            return <div key={genre}><div className="flex justify-between text-sm mb-1"><span>{genre}</span><span className="text-muted">{count}</span></div>
              <div className="h-2 bg-surface3 rounded-full overflow-hidden"><div className="h-full bg-primary" style={{ width: `${(count / max) * 100}%` }} /></div></div>; })}</div>}</div>
      <div className="border border-line rounded-xl p-6 bg-surface1"><h3 className="font-display text-xl font-bold mb-3">Community memberships</h3>
        <p className="text-sm text-muted">You're not in any communities yet.</p>
        <a href="/community" className="mt-3 inline-block text-sm text-primary">Explore communities →</a></div></div>}
  </div>;
}
