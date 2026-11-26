'use client';
import { useState } from 'react';
import { Heart, MessageCircle, UserPlus, Check } from 'lucide-react';
import { useStore } from '@/lib/store';
import { posts as fixturePosts, communities } from '@/lib/data';
import { SectionHeader, Artwork } from '@/components/ui';
import { cn } from '@/lib/utils';
export default function CommunityPage() {
  const followed = useStore(s => s.followedArtists);
  const toggleFollow = useStore(s => s.toggleFollow);
  const [localPosts, setLocalPosts] = useState(fixturePosts);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [newPost, setNewPost] = useState('');
  const like = (id: string) => {
    setLocalPosts(p => p.map(post => post.id === id ? { ...post, likes: post.likes + (likes[id] ? -1 : 1) } : post));
    setLikes(l => ({ ...l, [id]: !l[id] }));
  };
  const submit = () => { if (!newPost.trim()) return;
    setLocalPosts(p => [{ id: `local-${Date.now()}`, author: 'You', avatar: '', content: newPost.trim(), likes: 0, comments: 0, time: 'now', community: 'yard' }, ...p]);
    setNewPost(''); };
  return <div className="max-w-4xl mx-auto space-y-8">
    <section><p className="text-xs uppercase tracking-widest text-primary mb-2">Community</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">The Yard is talking.</h1>
      <p className="text-muted mt-2">Artist updates, fan reactions, and shared discovery. Local interactions persist on this device.</p></section>
    <section><SectionHeader title="Featured communities" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{communities.map(c => (
        <div key={c.id} className="border border-line rounded-xl overflow-hidden bg-surface1">
          <Artwork src={c.cover} alt={c.name} className="w-full h-24" seed={c.id} rounded={false} />
          <div className="p-3"><div className="font-medium text-sm">{c.name}</div><div className="text-xs text-muted">{c.members.toLocaleString()} members</div></div></div>))}</div></section>
    <section><SectionHeader title="The feed" />
      <div className="border border-line rounded-xl p-4 bg-surface1 mb-4">
        <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Share something with the Yard…" rows={2}
          className="w-full bg-surface2 border border-line rounded-lg p-3 text-sm focus-ring outline-none resize-none" />
        <div className="flex justify-end mt-2"><button onClick={submit} disabled={!newPost.trim()}
          className="px-4 py-2 rounded-full bg-primary text-black text-sm font-semibold disabled:opacity-40 focus-ring">Post</button></div></div>
      <div className="space-y-3">{localPosts.map(p => (
        <div key={p.id} className="border border-line rounded-xl p-4 bg-surface1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-primary text-black flex items-center justify-center text-sm font-bold">{p.author.charAt(0)}</div>
            <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{p.author}</div>
              <div className="text-xs text-muted">{p.time} ago{p.community ? ` · ${p.community}` : ''}</div></div>
            {p.artistId && <button onClick={() => toggleFollow(p.artistId!, true)}
              className={cn('px-3 py-1 rounded-full text-xs border focus-ring', followed.includes(p.artistId!) ? 'border-primary text-primary bg-primary/10' : 'border-line text-muted')}>
              {followed.includes(p.artistId!) ? <><Check className="w-3 h-3 inline" /> Following</> : <><UserPlus className="w-3 h-3 inline" /> Follow</>}</button>}</div>
          <p className="text-sm">{p.content}</p>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted">
            <button onClick={() => like(p.id)} className={cn('flex items-center gap-1', likes[p.id] && 'text-primary')}>
              <Heart className={cn('w-4 h-4', likes[p.id] && 'fill-current')} /> {p.likes}</button>
            <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {p.comments}</span></div></div>))}</div>
    </section>
  </div>;
}
