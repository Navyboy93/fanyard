'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Track, Playlist } from './types';
export type RepeatMode = 'off' | 'all' | 'one';
interface Store {
  theme: 'dark' | 'light'; toggleTheme: () => void;
  currentTrack: Track | null; queue: Track[]; history: Track[]; isPlaying: boolean;
  volume: number; muted: boolean; shuffle: boolean; repeat: RepeatMode;
  progress: number; duration: number; fullPlayerOpen: boolean;
  play: (t: Track, q?: Track[]) => void; togglePlay: () => void;
  next: () => void; prev: () => void; seek: (t: number) => void;
  setVolume: (v: number) => void; toggleMute: () => void;
  toggleShuffle: () => void; cycleRepeat: () => void;
  addToQueue: (t: Track) => void; removeFromQueue: (i: number) => void;
  setFullPlayerOpen: (o: boolean) => void;
  setProgress: (p: number) => void; setDuration: (d: number) => void;
  setIsPlaying: (p: boolean) => void;
  likedTracks: string[]; savedAlbums: string[]; followedArtists: string[]; dayOneFans: string[];
  playlists: Playlist[]; recentlyPlayed: string[]; displayName: string;
  notifications: { newReleases: boolean; community: boolean; studio: boolean };
  audioQuality: 'standard' | 'high' | 'lossless'; reducedMotion: boolean;
  toggleLike: (id: string) => void; toggleSaveAlbum: (id: string) => void;
  toggleFollow: (id: string, e: boolean) => void;
  createPlaylist: (n: string) => string; addTrackToPlaylist: (p: string, t: string) => void;
  removeTrackFromPlaylist: (p: string, t: string) => void;
  setDisplayName: (n: string) => void;
  setNotifications: (n: Partial<Store['notifications']>) => void;
  setAudioQuality: (q: Store['audioQuality']) => void;
  setReducedMotion: (v: boolean) => void; clearData: () => void;
}
export const useStore = create<Store>()(persist((set, get) => ({
  theme: 'dark', toggleTheme: () => set(s => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
  currentTrack: null, queue: [], history: [], isPlaying: false, volume: 0.8, muted: false,
  shuffle: false, repeat: 'off', progress: 0, duration: 0, fullPlayerOpen: false,
  play: (track, queue) => {
    const q = queue && queue.length ? queue : [track];
    set(s => ({ currentTrack: track, queue: q, isPlaying: !!track.audioUrl, progress: 0, duration: 0,
      history: [track, ...s.history.filter(t => t.id !== track.id)].slice(0, 50),
      recentlyPlayed: [track.id, ...s.recentlyPlayed.filter(id => id !== track.id)].slice(0, 20) }));
  },
  togglePlay: () => { const { currentTrack, isPlaying } = get(); if (!currentTrack?.audioUrl) return; set({ isPlaying: !isPlaying }); },
  next: () => { const { queue, currentTrack, shuffle, repeat } = get(); if (!currentTrack || !queue.length) return;
    const idx = queue.findIndex(t => t.id === currentTrack.id); let n = shuffle ? Math.floor(Math.random() * queue.length) : idx + 1;
    if (n >= queue.length) { if (repeat === 'all') n = 0; else return; } get().play(queue[n], queue); },
  prev: () => { const { queue, currentTrack, progress } = get(); if (!currentTrack) return;
    if (progress > 3) { const a = document.getElementById('global-audio') as HTMLAudioElement | null; if (a) a.currentTime = 0; set({ progress: 0 }); return; }
    const idx = queue.findIndex(t => t.id === currentTrack.id); get().play(queue[Math.max(0, idx - 1)], queue); },
  seek: (t) => { const a = document.getElementById('global-audio') as HTMLAudioElement | null; if (a) a.currentTime = t; set({ progress: t }); },
  setVolume: (v) => set({ volume: v, muted: false }), toggleMute: () => set(s => ({ muted: !s.muted })),
  toggleShuffle: () => set(s => ({ shuffle: !s.shuffle })),
  cycleRepeat: () => set(s => ({ repeat: s.repeat === 'off' ? 'all' : s.repeat === 'all' ? 'one' : 'off' })),
  addToQueue: (t) => set(s => ({ queue: [...s.queue, t] })),
  removeFromQueue: (i) => set(s => ({ queue: s.queue.filter((_, idx) => idx !== i) })),
  setFullPlayerOpen: (o) => set({ fullPlayerOpen: o }),
  setProgress: (p) => set({ progress: p }), setDuration: (d) => set({ duration: d }),
  setIsPlaying: (p) => set({ isPlaying: p }),
  likedTracks: [], savedAlbums: [], followedArtists: [], dayOneFans: [], playlists: [], recentlyPlayed: [],
  displayName: 'Yard Visitor',
  notifications: { newReleases: true, community: true, studio: false },
  audioQuality: 'high', reducedMotion: false,
  toggleLike: (id) => set(s => ({ likedTracks: s.likedTracks.includes(id) ? s.likedTracks.filter(x => x !== id) : [...s.likedTracks, id] })),
  toggleSaveAlbum: (id) => set(s => ({ savedAlbums: s.savedAlbums.includes(id) ? s.savedAlbums.filter(x => x !== id) : [...s.savedAlbums, id] })),
  toggleFollow: (id, e) => set(s => { const f = s.followedArtists.includes(id);
    const followedArtists = f ? s.followedArtists.filter(x => x !== id) : [...s.followedArtists, id];
    const dayOneFans = !f && e && !s.dayOneFans.includes(id) ? [...s.dayOneFans, id] : s.dayOneFans;
    return { followedArtists, dayOneFans }; }),
  createPlaylist: (n) => { const id = `user-${Date.now()}`;
    const p: Playlist = { id, title: n, description: 'Your playlist', cover: `https://picsum.photos/seed/${id}/600/600`, trackIds: [], curator: get().displayName, isUser: true };
    set(s => ({ playlists: [p, ...s.playlists] })); return id; },
  addTrackToPlaylist: (p, t) => set(s => ({ playlists: s.playlists.map(x => x.id === p && !x.trackIds.includes(t) ? { ...x, trackIds: [...x.trackIds, t] } : x) })),
  removeTrackFromPlaylist: (p, t) => set(s => ({ playlists: s.playlists.map(x => x.id === p ? { ...x, trackIds: x.trackIds.filter(y => y !== t) } : x) })),
  setDisplayName: (n) => set({ displayName: n }),
  setNotifications: (n) => set(s => ({ notifications: { ...s.notifications, ...n } })),
  setAudioQuality: (q) => set({ audioQuality: q }),
  setReducedMotion: (v) => set({ reducedMotion: v }),
  clearData: () => { localStorage.removeItem('fanyard-store');
    set({ likedTracks: [], savedAlbums: [], followedArtists: [], dayOneFans: [], playlists: [], recentlyPlayed: [], displayName: 'Yard Visitor' }); },
}), { name: 'fanyard-store', partialize: (s) => ({
  theme: s.theme, volume: s.volume, muted: s.muted, shuffle: s.shuffle, repeat: s.repeat,
  likedTracks: s.likedTracks, savedAlbums: s.savedAlbums, followedArtists: s.followedArtists,
  dayOneFans: s.dayOneFans, playlists: s.playlists, recentlyPlayed: s.recentlyPlayed,
  displayName: s.displayName, notifications: s.notifications, audioQuality: s.audioQuality,
  reducedMotion: s.reducedMotion }) }));

export const usePlayback = useStore;
