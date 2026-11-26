'use client';
import { useState, useRef } from 'react';
import { Upload, Play, TrendingUp, Users, DollarSign, Music, AlertTriangle } from 'lucide-react';
import { useStore } from '@/lib/store';
import { tracks as allTracks, getArtist } from '@/lib/data';
import { SectionHeader, Badge, Artwork } from '@/components/ui';
import { formatCount } from '@/lib/utils';
import type { Track } from '@/lib/types';
export default function StudioPage() {
  const s = useStore();
  const [uploaded, setUploaded] = useState<Track[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const fileInput = useRef<HTMLInputElement>(null);
  const artistId = 'kofi';
  const artist = getArtist(artistId)!;
  const myTracks = allTracks.filter(t => t.artistId === artistId);
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const url = URL.createObjectURL(file);
    const newTrack: Track = { id: `local-${Date.now()}`, title: file.name.replace(/\.[^.]+$/, ''), artistId, duration: 0, audioUrl: url,
      artwork: `https://picsum.photos/seed/${Date.now()}/400/400`, genre: 'Highlife', mood: 'Chill', country: 'Ghana', language: 'English', plays: 0 };
    setUploaded(u => [newTrack, ...u]); setActiveTab('catalogue');
    if (fileInput.current) fileInput.current.value = '';
  };
  const tabs = [{ id: 'overview', label: 'Overview' }, { id: 'catalogue', label: 'Catalogue' }, { id: 'upload', label: 'Upload' },
    { id: 'analytics', label: 'Analytics' }, { id: 'earnings', label: 'Earnings' }, { id: 'profile', label: 'Profile' }];
  return <div className="max-w-6xl mx-auto space-y-6">
    <section className="flex items-start justify-between gap-4 flex-wrap">
      <div><p className="text-xs uppercase tracking-widest text-primary mb-2">YardStudio</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Artist Studio</h1>
        <p className="text-muted mt-1">Signed in as <span className="text-ink font-medium">{artist.name}</span> (demonstration account)</p></div>
      <Badge variant="outline">Prototype — analytics & earnings are simulated</Badge></section>
    <div className="flex flex-wrap gap-2">{tabs.map(t => (
      <button key={t.id} onClick={() => setActiveTab(t.id)}
        className={`px-4 py-2 rounded-full text-sm border focus-ring ${activeTab === t.id ? 'bg-primary text-black border-primary font-semibold' : 'border-line text-muted hover:text-ink'}`}>{t.label}</button>))}</div>
    {activeTab === 'overview' && <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[{ icon: Users, label: 'Monthly listeners', value: formatCount(artist.monthlyListeners), sub: '+12% vs last month' },
        { icon: TrendingUp, label: 'Followers', value: formatCount(artist.followers), sub: '+8% vs last month' },
        { icon: Music, label: 'Tracks released', value: String(myTracks.length), sub: '2 new this month' },
        { icon: DollarSign, label: 'Est. earnings', value: '$1,240', sub: 'Simulated · last 30 days' }].map(({ icon: Icon, label, value, sub }) => (
        <div key={label} className="border border-line rounded-xl p-5 bg-surface1"><Icon className="w-5 h-5 text-primary mb-3" />
          <div className="text-2xl font-display font-bold">{value}</div><div className="text-sm text-muted">{label}</div>
          <div className="text-xs text-muted mt-1">{sub}</div></div>))}</div>}
    {activeTab === 'catalogue' && <section><SectionHeader title="Your catalogue" subtitle="Uploads from this session are playable but not persisted after reload." />
      <div className="space-y-1">{[...uploaded, ...myTracks].map(t => (
        <div key={t.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface2">
          <Artwork src={t.artwork} alt={t.title} className="w-10 h-10" seed={t.id} />
          <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{t.title}</div>
            <div className="text-xs text-muted">{t.genre} · {formatCount(t.plays)} plays</div></div>
          {t.audioUrl ? <button onClick={() => s.play(t, [t])} className="p-2 rounded-full bg-primary text-black" aria-label="Preview"><Play className="w-3.5 h-3.5 fill-current" /></button>
            : <Badge variant="outline">No audio</Badge>}</div>))}</div></section>}
    {activeTab === 'upload' && <section className="border border-line rounded-xl p-8 bg-surface1 text-center">
      <Upload className="w-10 h-10 text-primary mx-auto mb-4" />
      <h2 className="font-display text-xl font-bold mb-2">Upload a demo</h2>
      <p className="text-sm text-muted mb-4 max-w-md mx-auto">Files stay on your device and are not uploaded anywhere. Session-only — refresh clears them.</p>
      <input ref={fileInput} type="file" accept="audio/*" onChange={onUpload} className="hidden" id="audio-upload" />
      <label htmlFor="audio-upload" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-black font-semibold cursor-pointer focus-ring"><Upload className="w-4 h-4" /> Choose audio file</label>
      {uploaded.length > 0 && <div className="mt-6 text-left space-y-1">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">This session</p>
        {uploaded.map(t => <div key={t.id} className="flex items-center gap-3 p-2 rounded-lg bg-surface2">
          <Artwork src={t.artwork} alt={t.title} className="w-9 h-9" seed={t.id} />
          <div className="flex-1 min-w-0"><div className="text-sm truncate">{t.title}</div><div className="text-xs text-muted">Local file</div></div>
          <button onClick={() => s.play(t, [t])} className="p-1.5 rounded-full bg-primary text-black" aria-label="Play"><Play className="w-3 h-3 fill-current" /></button></div>)}</div>}
    </section>}
    {activeTab === 'analytics' && <section className="space-y-4">
      <div className="border border-line rounded-xl p-6 bg-surface1"><h3 className="font-display text-lg font-bold mb-4">Top performing tracks</h3>
        <div className="space-y-2">{myTracks.map((t, i) => (
          <div key={t.id} className="flex items-center gap-3"><span className="text-sm text-muted w-4">{i+1}</span>
            <div className="flex-1"><div className="text-sm mb-1">{t.title}</div>
              <div className="h-1.5 bg-surface3 rounded-full overflow-hidden"><div className="h-full bg-primary" style={{ width: `${Math.max(8, (t.plays / myTracks[0].plays) * 100)}%` }} /></div></div>
            <span className="text-xs text-muted tabular-nums w-16 text-right">{formatCount(t.plays)}</span></div>))}</div></div>
      <div className="border border-line rounded-xl p-6 bg-surface1"><h3 className="font-display text-lg font-bold mb-2">Follower growth</h3>
        <p className="text-sm text-muted">Simulated for this prototype.</p>
        <svg viewBox="0 0 300 100" className="w-full mt-4 h-32"><polyline points="0,80 50,70 100,72 150,55 200,45 250,40 300,30" fill="none" stroke="#D4FF48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div></section>}
    {activeTab === 'earnings' && <section className="border border-line rounded-xl p-6 bg-surface1">
      <div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-5 h-5 text-primary" /><h3 className="font-display text-lg font-bold">Simulated earnings</h3></div>
      <p className="text-sm text-muted mb-6">Demonstration data only. No real financial transactions occur in this prototype.</p>
      <div className="grid md:grid-cols-3 gap-4">{[{ label: 'Streaming', value: '$842.10' }, { label: 'Fan support', value: '$318.00' }, { label: 'Sync licensing', value: '$80.00' }].map(r => (
        <div key={r.label} className="border border-line rounded-lg p-4"><div className="text-xs uppercase tracking-widest text-muted">{r.label}</div>
          <div className="font-display text-2xl font-bold mt-1">{r.value}</div></div>))}</div></section>}
    {activeTab === 'profile' && <section className="border border-line rounded-xl p-6 bg-surface1">
      <h3 className="font-display text-lg font-bold mb-4">Artist profile</h3>
      <div className="flex items-center gap-4 mb-4"><Artwork src={artist.photo} alt={artist.name} className="w-20 h-20 rounded-full" seed={artist.id} rounded={false} />
        <div><div className="font-display text-xl font-bold">{artist.name}</div><div className="text-sm text-muted">{artist.country} · {artist.genres.join(', ')}</div></div></div>
      <p className="text-sm text-muted">{artist.bio}</p>
      <p className="text-xs text-muted mt-4 italic">Profile editing is not enabled in this prototype.</p></section>}
  </div>;
}
