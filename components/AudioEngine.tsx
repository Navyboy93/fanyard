'use client';
import { useEffect, useRef } from 'react';
import { useStore } from '@/lib/store';
export function AudioEngine() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const currentTrack = useStore(s => s.currentTrack);
  const isPlaying = useStore(s => s.isPlaying);
  const volume = useStore(s => s.volume);
  const muted = useStore(s => s.muted);
  const setProgress = useStore(s => s.setProgress);
  const setDuration = useStore(s => s.setDuration);
  const setIsPlaying = useStore(s => s.setIsPlaying);
  const next = useStore(s => s.next);
  useEffect(() => { const a = ref.current; if (!a) return;
    if (!currentTrack?.audioUrl) { a.pause(); a.removeAttribute('src'); return; }
    if (!a.src.endsWith(currentTrack.audioUrl)) a.src = currentTrack.audioUrl; }, [currentTrack?.id, currentTrack?.audioUrl]);
  useEffect(() => { const a = ref.current; if (!a || !currentTrack?.audioUrl) return;
    if (isPlaying) a.play().catch(() => setIsPlaying(false)); else a.pause(); }, [isPlaying, currentTrack?.id, setIsPlaying]);
  useEffect(() => { const a = ref.current; if (!a) return; a.volume = muted ? 0 : volume; }, [volume, muted]);
  useEffect(() => { const a = ref.current; if (!a) return;
    const onTime = () => setProgress(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onEnded = () => { const s = useStore.getState();
      if (s.repeat === 'one' && a) { a.currentTime = 0; a.play().catch(() => {}); } else next(); };
    const onErr = () => setIsPlaying(false);
    a.addEventListener('timeupdate', onTime); a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('ended', onEnded); a.addEventListener('error', onErr);
    return () => { a.removeEventListener('timeupdate', onTime); a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('ended', onEnded); a.removeEventListener('error', onErr); };
  }, [next, setProgress, setDuration, setIsPlaying]);
  return <audio id="global-audio" ref={ref} preload="metadata" />;
}
