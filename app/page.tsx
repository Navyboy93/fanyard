'use client';
import Link from 'next/link';
import { ArrowRight, Play, Sparkles, Users, Sprout, TrendingUp, Headphones } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Artwork, Badge } from '@/components/ui';
import { artists, tracks, getArtist } from '@/lib/data';
import { useStore } from '@/lib/store';
import { formatCount } from '@/lib/utils';
import { TrackCard } from '@/components/cards';
const cycle = ['Create','Collaborate','Release','Discover','Connect','Monetize','Grow','Reinvest'];
export default function LandingPage() {
  const play = useStore(s => s.play);
  const featured = tracks.filter(t => t.audioUrl).slice(0, 4);
  const emerging = artists.filter(a => a.isEmerging).slice(0, 6);
  const heroTrack = tracks[0]; const heroArtist = getArtist(heroTrack.artistId);
  const startListening = () => { const t = tracks.find(x => x.audioUrl); if (t) play(t, tracks.filter(x => x.audioUrl)); };
  return <div className="min-h-screen bg-bg text-ink">
    <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-16">
        <Logo href="/" className="text-2xl" />
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
          <a href="#discover" className="hover:text-ink">Discover</a><a href="#roots" className="hover:text-ink">Roots</a>
          <a href="#community" className="hover:text-ink">Community</a><a href="#studio" className="hover:text-ink">Studio</a></nav>
        <div className="flex items-center gap-2">
          <Link href="/home" className="text-sm px-3 py-2 rounded-full hover:bg-surface2 focus-ring">Sign in</Link>
          <Link href="/home" className="text-sm px-4 py-2 rounded-full bg-primary text-black font-semibold hover:opacity-90 focus-ring">Enter the Yard</Link></div>
      </div>
    </header>
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge variant="primary" className="mb-6">Welcome to the Yard</Badge>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">Where Music <span className="text-primary">Belongs.</span></h1>
          <p className="mt-6 text-lg text-muted max-w-lg">FANyard is a home for the full music lifecycle — from the first bedroom demo to the stadium. Discover emerging voices, connect with artists, and grow a musical identity that is yours.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={startListening} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-black font-semibold hover:opacity-90 focus-ring"><Play className="w-4 h-4 fill-current" /> Enter the Yard</button>
            <Link href="/discover" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-line hover:border-primary focus-ring">Try YardSwipe <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-muted">
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-primary" /> FullCycle philosophy</span>
            <span className="flex items-center gap-1.5"><Sprout className="w-4 h-4 text-primary" /> Emerging-first</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" /> Community-led</span>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl"><Artwork src={heroTrack.artwork} alt={heroTrack.title} className="w-full h-full" seed="hero" rounded={false} /></div>
          <div className="absolute -bottom-4 -left-2 md:left-6 bg-surface1 border border-line rounded-xl p-3 flex items-center gap-3 shadow-xl w-64">
            <Artwork src={heroArtist?.photo} alt={heroArtist?.name || ''} className="w-12 h-12 rounded-full" seed="hero-art" />
            <div className="min-w-0 flex-1"><div className="text-sm font-semibold truncate">{heroTrack.title}</div><div className="text-xs text-muted truncate">{heroArtist?.name}</div></div>
            <button onClick={startListening} aria-label="Play" className="w-9 h-9 rounded-full bg-primary text-black flex items-center justify-center"><Play className="w-4 h-4 fill-current ml-0.5" /></button>
          </div>
        </div>
      </div>
    </section>
    <div className="border-y border-line overflow-hidden py-5 bg-surface1">
      <div className="flex animate-marquee whitespace-nowrap gap-12 font-display text-2xl md:text-3xl font-bold tracking-tight">
        {[0,1].map(k => <div key={k} className="flex gap-12 shrink-0">
          {['Afrobeats','Amapiano','Highlife','Afro-soul','Indie','Electronic','Jazz','R&B','Roots','Day One Fans'].map(g => <span key={g} className="text-muted">{g} <span className="text-primary">✦</span></span>)}
        </div>)}
      </div>
    </div>
    <section id="discover" className="max-w-7xl mx-auto px-5 md:px-8 py-20">
      <div className="flex items-end justify-between mb-8">
        <div><p className="text-xs uppercase tracking-widest text-primary mb-2">Discovery</p><h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">The sound of the Yard</h2></div>
        <Link href="/discover" className="hidden md:inline-flex items-center gap-1 text-sm text-muted hover:text-ink">Try YardSwipe <ArrowRight className="w-4 h-4" /></Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">{featured.map(t => <TrackCard key={t.id} track={t} queue={featured} />)}</div>
    </section>
    <section id="roots" className="bg-surface1 border-y border-line">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <div className="flex items-end justify-between mb-8">
          <div><p className="text-xs uppercase tracking-widest text-primary mb-2">Roots</p><h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Emerging voices, first.</h2>
            <p className="text-muted mt-2 max-w-xl">Become a Day One Fan. Support the artists shaping what comes next, before the world catches on.</p></div>
          <Link href="/roots" className="hidden md:inline-flex items-center gap-1 text-sm text-muted hover:text-ink">All emerging <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {emerging.map(a => <Link key={a.id} href={`/artist/${a.id}`} className="group text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-3"><Artwork src={a.photo} alt={a.name} className="w-full h-full" seed={a.id} rounded={false} /></div>
            <div className="font-medium text-sm truncate">{a.name}</div><div className="text-xs text-muted">{formatCount(a.monthlyListeners)} listeners</div></Link>)}
        </div>
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
      <div className="text-center mb-10"><p className="text-xs uppercase tracking-widest text-primary mb-2">FullCycle</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">The complete music lifecycle.</h2>
        <p className="text-muted mt-2 max-w-2xl mx-auto">FANyard follows the life of a song — not just its release. Every stage matters, every contributor is visible.</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cycle.map((step, i) => <div key={step} className="border border-line rounded-xl p-5 bg-surface1"><div className="text-xs text-muted tabular-nums mb-3">{String(i+1).padStart(2,'0')}</div><div className="font-display text-xl font-bold">{step}</div></div>)}
      </div>
    </section>
    <section id="community" className="bg-surface1 border-y border-line">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div><p className="text-xs uppercase tracking-widest text-primary mb-2">Community</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Built with fans in the room.</h2>
          <p className="text-muted mt-4">Fan communities sit at the heart of FANyard. Real conversations, artist updates, and shared discovery — not an algorithmic void. Every Day One Fan is remembered.</p>
          <Link href="/community" className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-line hover:border-primary text-sm focus-ring">Visit Community <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="space-y-3">
          {[
            { author: 'Amara Osei', content: 'New single "Golden Hour" is out today. It\'s about the light in Accra at 6pm.', community: 'Afro-Soul Society' },
            { author: 'Kezia M.', content: 'Just found Akena Wanjiru through Roots. Day One Fan confirmed.', community: 'Roots Watchers' },
            { author: 'Kofi Mensah', content: 'Studio session tonight. Kpanlogo rhythms and tape delay. Something is happening.', community: 'Highlife Revival' },
          ].map((p, i) => <div key={i} className="border border-line rounded-xl p-4 bg-bg">
            <div className="flex items-center gap-2 mb-2"><div className="w-7 h-7 rounded-full bg-primary text-black text-xs font-bold flex items-center justify-center">{p.author.charAt(0)}</div>
              <span className="text-sm font-medium">{p.author}</span><span className="text-xs text-muted ml-auto">{p.community}</span></div>
            <p className="text-sm text-muted">{p.content}</p></div>)}
        </div>
      </div>
    </section>
    <section id="studio" className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
      <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
        {[
          { icon: Headphones, label: 'Audience analytics', value: '12.4K', sub: 'monthly listeners' },
          { icon: TrendingUp, label: 'Follower growth', value: '+18%', sub: 'this month' },
          { icon: Sprout, label: 'Day One Fans', value: '342', sub: 'early supporters' },
          { icon: Sparkles, label: 'Top track', value: '4.8M', sub: 'streams' },
        ].map(({ icon: Icon, label, value, sub }) => <div key={label} className="border border-line rounded-xl p-5 bg-surface1">
          <Icon className="w-5 h-5 text-primary mb-3" /><div className="text-2xl font-display font-bold">{value}</div>
          <div className="text-xs text-muted">{label}</div><div className="text-[11px] text-muted mt-1">{sub}</div></div>)}
      </div>
      <div className="order-1 md:order-2"><p className="text-xs uppercase tracking-widest text-primary mb-2">YardStudio</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Built for the artist's whole journey.</h2>
        <p className="text-muted mt-4">Upload, release, understand your audience, and grow. YardStudio gives independent artists the tools that used to be locked away.</p>
        <Link href="/studio" className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-black font-semibold text-sm focus-ring">Open Studio <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </section>
    <section className="border-t border-line bg-surface1">
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-24 text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">Welcome to the Yard.</h2>
        <p className="text-muted mt-4 text-lg">Stream, discover, and belong. FANyard — Where Music Belongs.</p>
        <Link href="/home" className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-black font-semibold text-lg focus-ring">Enter the Yard <ArrowRight className="w-5 h-5" /></Link>
      </div>
    </section>
    <footer className="border-t border-line">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 grid md:grid-cols-4 gap-8">
        <div><Logo href="/" className="text-xl" /><p className="text-xs text-muted mt-3 max-w-xs">Where Music Belongs. A functional prototype. All content is fictional demonstration data. Audio via SoundHelix (CC).</p></div>
        {[
          { title: 'Product', links: [['Discover','/discover'],['Explore','/explore'],['Roots','/roots'],['Charts','/charts']] },
          { title: 'Community', links: [['Community','/community'],['My Yard','/my-yard'],['Artist Studio','/studio']] },
          { title: 'About', links: [['Settings','/settings'],['FullCycle','#studio'],['Welcome to the Yard','/home']] },
        ].map(g => <div key={g.title}><div className="text-xs uppercase tracking-widest text-muted mb-3">{g.title}</div>
          <ul className="space-y-2 text-sm">{g.links.map(([label, href]) => <li key={label}><Link href={href} className="text-muted hover:text-ink">{label}</Link></li>)}</ul></div>)}
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted">© {new Date().getFullYear()} FANyard · Prototype. Not a real music service. No real payments.</div>
    </footer>
  </div>;
}
