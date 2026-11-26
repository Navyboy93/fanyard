'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { SectionHeader } from '@/components/ui';
import { AlertTriangle } from 'lucide-react';
export default function SettingsPage() {
  const s = useStore();
  const [name, setName] = useState(s.displayName);
  const [saved, setSaved] = useState(false);
  const saveName = () => { s.setDisplayName(name.trim() || 'Yard Visitor'); setSaved(true); setTimeout(() => setSaved(false), 1500); };
  return <div className="max-w-3xl mx-auto space-y-8">
    <section><p className="text-xs uppercase tracking-widest text-primary mb-2">Settings</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Your preferences</h1>
      <p className="text-muted mt-2">Only preferences that actually persist are shown here.</p></section>
    <section className="border border-line rounded-xl p-6 bg-surface1"><SectionHeader title="Profile" />
      <label className="text-sm text-muted">Display name</label>
      <div className="flex gap-2 mt-1"><input value={name} onChange={e => setName(e.target.value)} className="flex-1 bg-surface2 border border-line rounded-lg px-3 py-2 text-sm focus-ring" />
        <button onClick={saveName} className="px-4 py-2 rounded-lg bg-primary text-black text-sm font-semibold">Save</button></div>
      {saved && <p className="text-xs text-primary mt-1">Saved.</p>}</section>
    <section className="border border-line rounded-xl p-6 bg-surface1"><SectionHeader title="Appearance" />
      <div className="flex items-center justify-between"><div><div className="text-sm font-medium">Theme</div>
        <div className="text-xs text-muted">Light or dark surfaces.</div></div>
        <button onClick={() => s.toggleTheme()} className="px-3 py-1.5 rounded-full border border-line text-sm capitalize">{s.theme}</button></div>
      <div className="flex items-center justify-between mt-4"><div><div className="text-sm font-medium">Reduced motion</div>
        <div className="text-xs text-muted">Disable non-essential animation.</div></div>
        <Toggle on={s.reducedMotion} onChange={s.setReducedMotion} /></div></section>
    <section className="border border-line rounded-xl p-6 bg-surface1"><SectionHeader title="Playback" />
      <div className="space-y-4">
        <div className="flex items-center justify-between"><span className="text-sm">Volume</span>
          <input type="range" className="slider w-40" min={0} max={1} step={0.01} value={s.muted ? 0 : s.volume} onChange={e => s.setVolume(Number(e.target.value))} aria-label="Volume" /></div>
        <div className="flex items-center justify-between"><span className="text-sm">Shuffle on play</span>
          <Toggle on={s.shuffle} onChange={s.toggleShuffle} /></div>
        <div className="flex items-center justify-between"><span className="text-sm">Repeat</span>
          <div className="flex gap-1">{(['off','all','one'] as const).map(r => (
            <button key={r} onClick={() => { while (s.repeat !== r) s.cycleRepeat(); }}
              className={`px-3 py-1 rounded-full text-xs border ${s.repeat === r ? 'bg-primary text-black border-primary' : 'border-line text-muted'}`}>{r}</button>))}</div></div>
        <div className="flex items-center justify-between"><span className="text-sm">Audio quality</span>
          <select value={s.audioQuality} onChange={e => s.setAudioQuality(e.target.value as 'standard' | 'high' | 'lossless')}
            className="bg-surface2 border border-line rounded-lg px-3 py-1.5 text-sm">
            <option value="standard">Standard</option><option value="high">High</option><option value="lossless">Lossless (UI only)</option></select></div>
        <p className="text-xs text-muted italic">Quality preference is saved, but the prototype streams SoundHelix demo MP3s regardless.</p></div></section>
    <section className="border border-line rounded-xl p-6 bg-surface1"><SectionHeader title="Notifications" />
      <div className="space-y-3">{[['newReleases','New releases from artists I follow'],['community','Community activity'],['studio','Artist Studio tips']] .map(([key, label]) => (
        <div key={key} className="flex items-center justify-between"><span className="text-sm">{label}</span>
          <Toggle on={s.notifications[key as 'newReleases' | 'community' | 'studio']} onChange={(v) => s.setNotifications({ [key]: v } as never)} /></div>))}</div>
      <p className="text-xs text-muted mt-3 italic">Push notifications are not part of this prototype.</p></section>
    <section className="border border-line rounded-xl p-6 bg-surface1"><SectionHeader title="Privacy & data" />
      <p className="text-sm text-muted mb-4">All state lives in your browser's localStorage.</p>
      <button onClick={() => s.clearData()} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/40 text-red-400 text-sm hover:bg-red-500/10">
        <AlertTriangle className="w-4 h-4" /> Clear all local data</button></section>
  </div>;
}
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return <button onClick={() => onChange(!on)} role="switch" aria-checked={on}
    className={`w-11 h-6 rounded-full transition-colors relative focus-ring ${on ? 'bg-primary' : 'bg-surface3'}`}>
    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-[22px]' : 'translate-x-0.5'}`} /></button>;
}
