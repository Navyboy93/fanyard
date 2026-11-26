'use client';
import { X, Play, Pause, SkipBack, SkipForward, Heart, Shuffle, Repeat, Repeat1, Volume2, VolumeX, ListMusic, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { getArtist } from '@/lib/data';
import { Artwork } from './ui';
import { cn, formatTime } from '@/lib/utils';
export function FullPlayer() {
  const s = useStore();
  if (!s.fullPlayerOpen) return null;
  const track = s.currentTrack;
  const artist = track ? getArtist(track.artistId) : null;
  const liked = track ? s.likedTracks.includes(track.id) : false;
  return <AnimatePresence><motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.25 }} className="fixed inset-0 z-50 bg-bg flex flex-col">
    <div className="flex items-center justify-between p-4 border-b border-line">
      <button onClick={() => s.setFullPlayerOpen(false)} aria-label="Close" className="p-2 focus-ring rounded-full hover:bg-surface2"><X className="w-5 h-5" /></button>
      <span className="text-xs uppercase tracking-widest text-muted">Now Playing</span><div className="w-9" />
    </div>
    <div className="flex-1 overflow-y-auto">
      {track ? <div className="max-w-md mx-auto px-6 pt-6 pb-24">
        <Artwork src={track.artwork} alt={track.title} className="w-full aspect-square" seed={track.id} />
        <div className="mt-6 flex items-start justify-between gap-3">
          <div className="min-w-0"><h2 className="font-display text-2xl font-bold truncate">{track.title}</h2><p className="text-muted truncate">{artist?.name}</p></div>
          <button onClick={() => s.toggleLike(track.id)} aria-label="Like" className="p-2 focus-ring rounded-full"><Heart className={cn('w-6 h-6', liked && 'fill-primary text-primary')} /></button>
        </div>
        <input type="range" className="slider w-full mt-6" min={0} max={s.duration || 0} step={1} value={s.progress} onChange={e => s.seek(Number(e.target.value))} aria-label="Seek" />
        <div className="flex justify-between text-xs text-muted tabular-nums mt-1"><span>{formatTime(s.progress)}</span><span>{formatTime(s.duration)}</span></div>
        <div className="flex items-center justify-center gap-6 mt-6">
          <button onClick={s.toggleShuffle} aria-label="Shuffle" className={cn('p-2 rounded-full focus-ring', s.shuffle ? 'text-primary' : 'text-muted')}><Shuffle className="w-5 h-5" /></button>
          <button onClick={s.prev} aria-label="Previous" className="p-2 focus-ring"><SkipBack className="w-6 h-6" /></button>
          <button onClick={s.togglePlay} aria-label="Play/pause" className="w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center focus-ring">
            {s.isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}</button>
          <button onClick={s.next} aria-label="Next" className="p-2 focus-ring"><SkipForward className="w-6 h-6" /></button>
          <button onClick={s.cycleRepeat} aria-label="Repeat" className={cn('p-2 rounded-full focus-ring', s.repeat !== 'off' ? 'text-primary' : 'text-muted')}>
            {s.repeat === 'one' ? <Repeat1 className="w-5 h-5" /> : <Repeat className="w-5 h-5" />}</button>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={s.toggleMute} aria-label="Mute" className="p-1.5">{s.muted || s.volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}</button>
          <input type="range" className="slider flex-1" min={0} max={1} step={0.01} value={s.muted ? 0 : s.volume} onChange={e => s.setVolume(Number(e.target.value))} aria-label="Volume" />
        </div>
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3"><ListMusic className="w-4 h-4" /><h3 className="text-sm font-semibold">Queue</h3></div>
          <div className="space-y-1">
            {s.queue.map((t, i) => { const a = getArtist(t.artistId); const active = t.id === track.id;
              return <div key={`${t.id}-${i}`} className={cn('flex items-center gap-2 p-2 rounded-lg', active && 'bg-surface2')}>
                <button onClick={() => s.play(t, s.queue)} className="flex-1 flex items-center gap-2 text-left min-w-0">
                  <Artwork src={t.artwork} alt={t.title} className="w-9 h-9" seed={t.id} />
                  <div className="min-w-0"><div className={cn('text-sm truncate', active && 'text-primary')}>{t.title}</div><div className="text-xs text-muted truncate">{a?.name}</div></div>
                </button>
                <button onClick={() => s.removeFromQueue(i)} aria-label="Remove" className="p-1.5 text-muted hover:text-ink"><Trash2 className="w-4 h-4" /></button>
              </div>; })}
          </div>
        </div>
      </div> : <div className="flex items-center justify-center h-full text-muted text-sm">Nothing playing</div>}
    </div>
  </motion.div></AnimatePresence>;
}
