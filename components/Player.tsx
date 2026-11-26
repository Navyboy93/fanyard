'use client';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Repeat1, Heart, Maximize2 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { getArtist } from '@/lib/data';
import { Artwork } from './ui';
import { cn, formatTime } from '@/lib/utils';
export function Player() {
  const s = useStore();
  const track = s.currentTrack;
  const artist = track ? getArtist(track.artistId) : null;
  const liked = track ? s.likedTracks.includes(track.id) : false;
  return <>
    <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 bg-surface1 border-t border-line">
      {track ? <div className="flex items-center gap-3 px-3 py-2" onClick={() => s.setFullPlayerOpen(true)}>
        <Artwork src={track.artwork} alt={track.title} className="w-10 h-10" seed={track.id} />
        <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{track.title}</div><div className="text-xs text-muted truncate">{artist?.name}</div></div>
        <button onClick={(e) => { e.stopPropagation(); s.togglePlay(); }} className="p-2" aria-label="Play/pause">
          {s.isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}</button>
      </div> : <div className="text-center text-xs text-muted py-3">Nothing playing yet</div>}
    </div>
    <div className="hidden lg:flex fixed bottom-0 left-60 right-0 h-20 bg-surface1 border-t border-line z-30 items-center gap-6 px-4">
      <div className="flex items-center gap-3 w-64 min-w-0">
        {track ? <>
          <Artwork src={track.artwork} alt={track.title} className="w-12 h-12" seed={track.id} />
          <div className="min-w-0"><div className="text-sm font-medium truncate">{track.title}</div><div className="text-xs text-muted truncate">{artist?.name}</div></div>
          <button onClick={() => s.toggleLike(track.id)} aria-label="Like" className="ml-auto p-1 focus-ring rounded"><Heart className={cn('w-4 h-4', liked && 'fill-primary text-primary')} /></button>
        </> : <div className="text-xs text-muted">Select a track to begin</div>}
      </div>
      <div className="flex-1 flex flex-col items-center gap-1">
        <div className="flex items-center gap-3">
          <button onClick={s.toggleShuffle} aria-label="Shuffle" className={cn('p-1.5 rounded focus-ring', s.shuffle ? 'text-primary' : 'text-muted hover:text-ink')}><Shuffle className="w-4 h-4" /></button>
          <button onClick={s.prev} aria-label="Previous" className="p-1.5 rounded focus-ring"><SkipBack className="w-4 h-4" /></button>
          <button onClick={s.togglePlay} disabled={!track} aria-label="Play/pause" className="w-9 h-9 rounded-full bg-primary text-black flex items-center justify-center disabled:opacity-40 focus-ring">
            {s.isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}</button>
          <button onClick={s.next} aria-label="Next" className="p-1.5 rounded focus-ring"><SkipForward className="w-4 h-4" /></button>
          <button onClick={s.cycleRepeat} aria-label="Repeat" className={cn('p-1.5 rounded focus-ring', s.repeat !== 'off' ? 'text-primary' : 'text-muted hover:text-ink')}>
            {s.repeat === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}</button>
        </div>
        <div className="w-full max-w-xl flex items-center gap-2 text-[11px] text-muted tabular-nums">
          <span>{formatTime(s.progress)}</span>
          <input type="range" className="slider flex-1" min={0} max={s.duration || 0} step={1} value={s.progress} onChange={e => s.seek(Number(e.target.value))} aria-label="Seek" />
          <span>{formatTime(s.duration)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 w-56 justify-end">
        <button onClick={s.toggleMute} aria-label="Mute" className="p-1.5 rounded focus-ring">
          {s.muted || s.volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}</button>
        <input type="range" className="slider w-24" min={0} max={1} step={0.01} value={s.muted ? 0 : s.volume} onChange={e => s.setVolume(Number(e.target.value))} aria-label="Volume" />
        <button onClick={() => s.setFullPlayerOpen(true)} aria-label="Expand" className="p-1.5 rounded focus-ring"><Maximize2 className="w-4 h-4" /></button>
      </div>
    </div>
  </>;
}
