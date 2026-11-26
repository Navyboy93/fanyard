'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Heart, Bookmark, UserPlus, Share2, Play, ChevronUp, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { tracks, getArtist, GENRES, MOODS } from '@/lib/data';
import { Artwork, Badge, EmptyState } from '@/components/ui';
import { cn, formatCount } from '@/lib/utils';
export default function DiscoverPage() {
  const play = useStore(s => s.play);
  const likedTracks = useStore(s => s.likedTracks);
  const toggleLike = useStore(s => s.toggleLike);
  const saved = useStore(s => s.savedAlbums);
  const toggleSave = useStore(s => s.toggleSaveAlbum);
  const followed = useStore(s => s.followedArtists);
  const toggleFollow = useStore(s => s.toggleFollow);
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const filtered = useMemo(() => tracks.filter(t => t.audioUrl && (!genre || t.genre === genre) && (!mood || t.mood === mood)), [genre, mood]);
  useEffect(() => { setIndex(0); }, [genre, mood]);
  const current = filtered[index];
  const artist = current ? getArtist(current.artistId) : null;
  const next = useCallback(() => setIndex(i => Math.min(i + 1, filtered.length - 1)), [filtered.length]);
  const prev = useCallback(() => setIndex(i => Math.max(i - 1, 0)), []);
  useEffect(() => { const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); next(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); prev(); }
  }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [next, prev]);
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 1800); };
  const share = async () => { if (!current) return; const text = `${current.title} by ${artist?.name} on FANyard`;
    try { if (navigator.share) await navigator.share({ title: 'FANyard', text });
      else { await navigator.clipboard.writeText(text); showToast('Copied'); } } catch {} };
  return <div className="max-w-5xl mx-auto">
    <div className="mb-6"><p className="text-xs uppercase tracking-widest text-primary mb-2">YardSwipe</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Discover, one track at a time.</h1>
      <p className="text-muted mt-2 text-sm">Vertical feed. Swipe with arrow keys or the buttons below.</p></div>
    <div className="flex flex-wrap gap-2 mb-6">
      <select value={genre} onChange={e => setGenre(e.target.value)} className="bg-surface2 border border-line rounded-full px-4 py-2 text-sm focus-ring" aria-label="Genre filter">
        <option value="">All genres</option>{GENRES.map(g => <option key={g} value={g}>{g}</option>)}</select>
      <select value={mood} onChange={e => setMood(e.target.value)} className="bg-surface2 border border-line rounded-full px-4 py-2 text-sm focus-ring" aria-label="Mood filter">
        <option value="">All moods</option>{MOODS.map(m => <option key={m} value={m}>{m}</option>)}</select>
      {(genre || mood) && <button onClick={() => { setGenre(''); setMood(''); }} className="text-sm px-4 py-2 rounded-full border border-line hover:border-primary">Clear</button>}
    </div>
    {!current ? <EmptyState title="No tracks match your filters" description="Try clearing the filters to see the full feed." /> : <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div key={current.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}
          className="grid md:grid-cols-2 gap-8 items-center bg-surface1 border border-line rounded-2xl p-6 md:p-8">
          <button onClick={() => play(current, filtered)} className="relative group aspect-square rounded-xl overflow-hidden">
            <Artwork src={current.artwork} alt={current.title} className="w-full h-full" seed={current.id} rounded={false} />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-black rounded-full p-4"><Play className="w-6 h-6 fill-current" /></span></span>
          </button>
          <div><div className="flex items-center gap-2 mb-3">
            <Badge variant="primary">{current.genre}</Badge><Badge variant="outline">{current.mood}</Badge><Badge variant="outline">{current.country}</Badge></div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{current.title}</h2>
            <p className="text-lg text-muted mt-1">{artist?.name} · {formatCount(current.plays)} plays</p>
            <p className="text-sm text-muted mt-4 line-clamp-3">{artist?.bio}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              <button onClick={() => play(current, filtered)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-black font-semibold text-sm focus-ring"><Play className="w-4 h-4 fill-current" /> Play full track</button>
              <button onClick={() => toggleLike(current.id)} aria-label="Like" className={cn('p-2.5 rounded-full border focus-ring', likedTracks.includes(current.id) ? 'border-primary text-primary bg-primary/10' : 'border-line')}>
                <Heart className={cn('w-4 h-4', likedTracks.includes(current.id) && 'fill-current')} /></button>
              <button onClick={() => { toggleSave(current.id); showToast(saved.includes(current.id) ? 'Removed' : 'Saved'); }} aria-label="Save"
                className={cn('p-2.5 rounded-full border focus-ring', saved.includes(current.id) ? 'border-primary text-primary bg-primary/10' : 'border-line')}>
                <Bookmark className={cn('w-4 h-4', saved.includes(current.id) && 'fill-current')} /></button>
              <button onClick={() => artist && toggleFollow(artist.id, artist.isEmerging)} aria-label="Follow"
                className={cn('p-2.5 rounded-full border focus-ring', artist && followed.includes(artist.id) ? 'border-primary text-primary bg-primary/10' : 'border-line')}>
                <UserPlus className="w-4 h-4" /></button>
              <button onClick={share} aria-label="Share" className="p-2.5 rounded-full border border-line focus-ring"><Share2 className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-2 mt-6 text-xs text-muted"><span>{index + 1} / {filtered.length}</span></div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-3 mt-6">
        <button onClick={prev} disabled={index === 0} aria-label="Previous" className="p-3 rounded-full border border-line disabled:opacity-40 focus-ring"><ChevronUp className="w-5 h-5" /></button>
        <button onClick={next} disabled={index === filtered.length - 1} aria-label="Next" className="p-3 rounded-full border border-line disabled:opacity-40 focus-ring"><ChevronDown className="w-5 h-5" /></button>
      </div>
    </div>}
    <AnimatePresence>{toast && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-surface3 text-ink text-sm px-4 py-2 rounded-full border border-line z-40">{toast}</motion.div>}</AnimatePresence>
  </div>;
}
