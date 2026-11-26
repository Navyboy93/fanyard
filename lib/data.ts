import { Artist, Track, Playlist, Post, Community } from './types';

const ph = (seed: string, w = 400, h = 400) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const fallback = (n: number) => `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`;

export const artists: Artist[] = [
  { id:'navyboyxo', name:'NavyboyXO', bio:'Abuja-based rising star blending Afrofusion, R&B, and Afro-soul. His sound is a smooth, trap-infused exploration of modern Nigerian life.', photo:'/navyboyxo-profile.jpg', cover:'/navyboyxo-cover.jpg', monthlyListeners:15400, followers:820, genres:['Afrofusion','R&B','Afro-soul'], country:'Nigeria', isEmerging:true, dayOneFans:142, relatedArtists:['tunde','amara','djoduya'] },
  { id:'kai-engel', name:'Kai Engel', bio:'A prolific independent composer from Germany. Kai blends ambient textures, modern classical piano, and post-rock to create deeply moving cinematic soundscapes.', photo:ph('kai-engel'), cover:ph('kai-cov',1200,400), monthlyListeners:142000, followers:8400, genres:['Ambient','Modern Classical'], country:'Germany', isEmerging:false, dayOneFans:0, relatedArtists:['scott-buckley','chad-crouch','safir-nou'] },
  { id:'holiznacc0', name:'HoliznaCC0', bio:'An incredibly prolific lo-fi and hip-hop producer from the USA. HoliznaCC0 releases all music directly to the public domain, building a massive catalogue of dusty, soulful beats.', photo:ph('holizna'), cover:ph('holi-cov',1200,400), monthlyListeners:89000, followers:4200, genres:['Lo-Fi','Hip-Hop'], country:'USA', isEmerging:true, dayOneFans:890, relatedArtists:['aso','broke-for-free'] },
  { id:'scott-buckley', name:'Scott Buckley', bio:'Australian composer known for epic, cinematic, and emotive orchestral music. His work is heavily featured in indie films, games, and documentaries worldwide.', photo:ph('scott'), cover:ph('scott-cov',1200,400), monthlyListeners:210000, followers:15000, genres:['Cinematic','Orchestral'], country:'Australia', isEmerging:false, dayOneFans:0, relatedArtists:['kai-engel','komiku'] },
  { id:'amine-maxwell', name:'Amine Maxwell', bio:'Moroccan R&B and soul artist blending smooth vocals with modern, chill production. A standout voice in the independent global R&B scene.', photo:ph('amine'), cover:ph('amine-cov',1200,400), monthlyListeners:45000, followers:3100, genres:['R&B','Soul'], country:'Morocco', isEmerging:true, dayOneFans:412, relatedArtists:['jahzzar','aso'] },
  { id:'jahzzar', name:'Jahzzar', bio:'An Italian multi-instrumentalist and composer. Jahzzar explores jazz, afrobeat, and funk, creating rich, organic grooves that feel timeless.', photo:ph('jahzzar'), cover:ph('jah-cov',1200,400), monthlyListeners:62000, followers:2800, genres:['Jazz','Afrobeat'], country:'Italy', isEmerging:false, dayOneFans:0, relatedArtists:['amine-maxwell','lobo-loco'] },
  { id:'komiku', name:'Komiku', bio:'French chiptune and indie electronic artist. Komiku creates bouncy, nostalgic melodies using vintage game consoles and modern synths.', photo:ph('komiku'), cover:ph('kom-cov',1200,400), monthlyListeners:34000, followers:1900, genres:['Chiptune','Electronic'], country:'France', isEmerging:true, dayOneFans:620, relatedArtists:['scott-buckley','broke-for-free'] },
  { id:'broke-for-free', name:'Broke For Free', bio:'An American electronic and instrumental hip-hop duo. Known for blending glitchy beats with warm, atmospheric melodies.', photo:ph('broke'), cover:ph('broke-cov',1200,400), monthlyListeners:78000, followers:3900, genres:['Electronic','Chill'], country:'USA', isEmerging:false, dayOneFans:0, relatedArtists:['holiznacc0','aso'] },
  { id:'aso', name:'Aso', bio:'A producer crafting lush, jazzy chillhop. Aso\'s beats are the perfect soundtrack for late-night drives and focused study sessions.', photo:ph('aso'), cover:ph('aso-cov',1200,400), monthlyListeners:154000, followers:9200, genres:['Chillhop','Lo-Fi'], country:'USA', isEmerging:true, dayOneFans:1200, relatedArtists:['holiznacc0','broke-for-free'] },
  { id:'safir-nou', name:'Safir Nou', bio:'A world-fusion artist blending Middle Eastern strings with Western electronic and ambient elements. Music that crosses borders.', photo:ph('safir'), cover:ph('safir-cov',1200,400), monthlyListeners:28000, followers:1100, genres:['World','Ambient'], country:'Lebanon', isEmerging:true, dayOneFans:314, relatedArtists:['kai-engel','jahzzar'] },
  { id:'lobo-loco', name:'Lobo Loco', bio:'German independent artist creating quirky, psychedelic indie-folk and alternative country with a distinct DIY ethos.', photo:ph('lobo'), cover:ph('lobo-cov',1200,400), monthlyListeners:41000, followers:1800, genres:['Indie','Folk'], country:'Germany', isEmerging:false, dayOneFans:0, relatedArtists:['jahzzar','chad-crouch'] },
  { id:'chad-crouch', name:'Chad Crouch', bio:'Portland-based composer and filmmaker creating pastoral folk and ambient guitar soundscapes inspired by the Pacific Northwest.', photo:ph('chad'), cover:ph('chad-cov',1200,400), monthlyListeners:19000, followers:900, genres:['Folk','Ambient'], country:'USA', isEmerging:true, dayOneFans:214, relatedArtists:['kai-engel','lobo-loco'] },
  { id:'nicolai-heidlas', name:'Nicolai Heidlas', bio:'German pop and acoustic artist. Uplifting, bright melodies paired with warm acoustic guitar and modern production.', photo:ph('nicolai'), cover:ph('nic-cov',1200,400), monthlyListeners:37000, followers:2100, genres:['Pop','Acoustic'], country:'Germany', isEmerging:true, dayOneFans:512, relatedArtists:['amine-maxwell','lobo-loco'] },
];

export const tracks: Track[] = [
  { id:'t31', title:'Silent Agreement', artistId:'navyboyxo', duration:185, audioUrl:'/silent-agreement.wav', artwork:'/navyboyxo-cover.jpg', genre:'Afrofusion', mood:'Late Night', country:'Nigeria', language:'English', plays:14500, isNew:true },
  { id:'t32', title:'Abuja Nights (Unreleased)', artistId:'navyboyxo', duration:0, audioUrl:null, artwork:'/navyboyxo-cover.jpg', genre:'R&B', mood:'Chill', country:'Nigeria', language:'English', plays:0, isUndiscovered:true },
  { id:'t01', title:'Brand New', artistId:'kai-engel', duration:214, audioUrl:'https://www.chosic.com/wp-content/uploads/2020/06/And-So-It-Begins-by-Kai-Engel.mp3', artwork:ph('brand-new'), genre:'Modern Classical', mood:'Focus', country:'Germany', language:'Instrumental', plays:482000, isNew:true },
  { id:'t02', title:'Blue', artistId:'holiznacc0', duration:158, audioUrl:'https://www.chosic.com/wp-content/uploads/2020/05/Blue-by-HoliznaCC0.mp3', artwork:ph('blue-holi'), genre:'Lo-Fi', mood:'Chill', country:'USA', language:'Instrumental', plays:892000 },
  { id:'t03', title:'Morning Routine', artistId:'scott-buckley', duration:242, audioUrl:'https://www.chosic.com/wp-content/uploads/2021/04/Morning-Routine-by-Scott-Buckley.mp3', artwork:ph('morning-routine'), genre:'Cinematic', mood:'Uplift', country:'Australia', language:'Instrumental', plays:1240000, isNew:true },
  { id:'t04', title:'Life', artistId:'amine-maxwell', duration:186, audioUrl:'https://www.chosic.com/wp-content/uploads/2021/04/Life-by-Amine-Maxwell.mp3', artwork:ph('life-amine'), genre:'R&B', mood:'Romance', country:'Morocco', language:'English', plays:214000, isUndiscovered:true },
  { id:'t05', title:'Sixty Four', artistId:'jahzzar', duration:228, audioUrl:'https://www.chosic.com/wp-content/uploads/2020/06/Sixty-Four-by-Jahzzar.mp3', artwork:ph('sixty-four'), genre:'Jazz', mood:'Chill', country:'Italy', language:'Instrumental', plays:342000 },
  { id:'t06', title:'A Good Bass for Gambling', artistId:'komiku', duration:252, audioUrl:'https://www.chosic.com/wp-content/uploads/2020/04/A-Good-Bass-for-Gambling-by-Komiku.mp3', artwork:ph('bass-gambling'), genre:'Chiptune', mood:'Energetic', country:'France', language:'Instrumental', plays:142000, isUndiscovered:true },
  { id:'t07', title:'Night Owl', artistId:'broke-for-free', duration:302, audioUrl:'https://www.chosic.com/wp-content/uploads/2020/05/Night-Owl-by-Broke-For-Free.mp3', artwork:ph('night-owl'), genre:'Electronic', mood:'Late Night', country:'USA', language:'Instrumental', plays:4821000 },
  { id:'t08', title:'Seasons', artistId:'aso', duration:288, audioUrl:fallback(8), artwork:ph('seasons-aso'), genre:'Chillhop', mood:'Focus', country:'USA', language:'Instrumental', plays:2103000 },
  { id:'t09', title:'Freeky Friday', artistId:'lobo-loco', duration:264, audioUrl:'https://www.chosic.com/wp-content/uploads/2021/02/Freeky-Friday-by-Lobo-Loco.mp3', artwork:ph('freeky-friday'), genre:'Indie', mood:'Uplift', country:'Germany', language:'English', plays:68400, isUndiscovered:true },
  { id:'t10', title:'Desert Wind', artistId:'safir-nou', duration:216, audioUrl:fallback(10), artwork:ph('desert-wind'), genre:'World', mood:'Chill', country:'Lebanon', language:'Arabic', plays:42100, isUndiscovered:true },
  { id:'t11', title:'Pacific', artistId:'chad-crouch', duration:246, audioUrl:fallback(11), artwork:ph('pacific'), genre:'Folk', mood:'Focus', country:'USA', language:'Instrumental', plays:5821000, isNew:true },
  { id:'t12', title:'Sunny', artistId:'nicolai-heidlas', duration:212, audioUrl:fallback(12), artwork:ph('sunny'), genre:'Pop', mood:'Uplift', country:'Germany', language:'English', plays:3421000 },
  { id:'t13', title:'Soul Searching', artistId:'amine-maxwell', duration:238, audioUrl:fallback(13), artwork:ph('soul-search'), genre:'R&B', mood:'Late Night', country:'Morocco', language:'English', plays:28900, isUndiscovered:true },
  { id:'t14', title:'The Journey', artistId:'scott-buckley', duration:224, audioUrl:fallback(14), artwork:ph('journey'), genre:'Cinematic', mood:'Energetic', country:'Australia', language:'Instrumental', plays:19800, isUndiscovered:true },
  { id:'t15', title:'Dusty Roads', artistId:'holiznacc0', duration:234, audioUrl:fallback(15), artwork:ph('dusty-roads'), genre:'Lo-Fi', mood:'Chill', country:'USA', language:'Instrumental', plays:4210000 },
  { id:'t16', title:'Afternoon Tea', artistId:'kai-engel', duration:206, audioUrl:fallback(16), artwork:ph('afternoon-tea'), genre:'Ambient', mood:'Focus', country:'Germany', language:'Instrumental', plays:1890000 },
  { id:'t17', title:'Funky Town', artistId:'jahzzar', duration:248, audioUrl:fallback(17), artwork:ph('funky-town'), genre:'Afrobeat', mood:'Energetic', country:'Italy', language:'Instrumental', plays:2840000 },
  { id:'t18', title:'Midnight Drive', artistId:'aso', duration:212, audioUrl:fallback(1), artwork:ph('midnight-drive'), genre:'Chillhop', mood:'Late Night', country:'USA', language:'Instrumental', plays:1120000 },
  { id:'t19', title:'Arcade Dreams', artistId:'komiku', duration:272, audioUrl:fallback(2), artwork:ph('arcade-dreams'), genre:'Chiptune', mood:'Energetic', country:'France', language:'Instrumental', plays:142000, isUndiscovered:true },
  { id:'t20', title:'Glitch', artistId:'broke-for-free', duration:254, audioUrl:fallback(3), artwork:ph('glitch'), genre:'Electronic', mood:'Energetic', country:'USA', language:'Instrumental', plays:96400, isUndiscovered:true },
  { id:'t21', title:'Mountain View', artistId:'chad-crouch', duration:286, audioUrl:fallback(4), artwork:ph('mountain-view'), genre:'Folk', mood:'Chill', country:'USA', language:'Instrumental', plays:684000 },
  { id:'t22', title:'Open Road', artistId:'lobo-loco', duration:312, audioUrl:fallback(5), artwork:ph('open-road'), genre:'Folk', mood:'Uplift', country:'Germany', language:'English', plays:384000 },
  { id:'t23', title:'New Horizons', artistId:'nicolai-heidlas', duration:226, audioUrl:fallback(6), artwork:ph('new-horizons'), genre:'Acoustic', mood:'Romance', country:'Germany', language:'English', plays:14200, isUndiscovered:true },
  { id:'t24', title:'Cosmic Dust', artistId:'safir-nou', duration:244, audioUrl:fallback(7), artwork:ph('cosmic-dust'), genre:'Ambient', mood:'Focus', country:'Lebanon', language:'Instrumental', plays:9800, isUndiscovered:true },
  { id:'t25', title:'Golden Skies', artistId:'scott-buckley', duration:236, audioUrl:fallback(8), artwork:ph('golden-skies'), genre:'Cinematic', mood:'Uplift', country:'Australia', language:'Instrumental', plays:2840000 },
  { id:'t26', title:'Smooth Sailing', artistId:'amine-maxwell', duration:258, audioUrl:fallback(9), artwork:ph('smooth-sailing'), genre:'R&B', mood:'Romance', country:'Morocco', language:'English', plays:2420000 },
  { id:'t27', title:'Deep Focus', artistId:'holiznacc0', duration:318, audioUrl:fallback(10), artwork:ph('deep-focus'), genre:'Lo-Fi', mood:'Focus', country:'USA', language:'Instrumental', plays:3120000 },
  { id:'t28', title:'Nightfall', artistId:'kai-engel', duration:262, audioUrl:fallback(11), artwork:ph('nightfall'), genre:'Modern Classical', mood:'Late Night', country:'Germany', language:'Instrumental', plays:1840000 },
  { id:'t29', title:'Groove Theory', artistId:'jahzzar', duration:198, audioUrl:fallback(12), artwork:ph('groove-theory'), genre:'Jazz', mood:'Energetic', country:'Italy', language:'Instrumental', plays:4210000 },
];

export const playlists: Playlist[] = [
  { id:'p1', title:'Focus & Flow', description:'Ambient and classical for deep work.', cover:ph('focus-flow',600,600), curator:'FANyard', trackIds:['t01','t08','t16','t24','t27'] },
  { id:'p2', title:'Lo-Fi Sessions', description:'Dusty beats and chillhop.', cover:ph('lofi-sess',600,600), curator:'FANyard', trackIds:['t02','t15','t18','t20'] },
  { id:'p3', title:'Cinematic World', description:'Epic orchestral journeys.', cover:ph('cine-world',600,600), curator:'FANyard', trackIds:['t03','t14','t25'] },
  { id:'p4', title:'Late Night R&B', description:'Smooth vocals for the after-hours.', cover:ph('late-rnb',600,600), curator:'FANyard', trackIds:['t04','t13','t26','t31'] },
  { id:'p5', title:'Global Grooves', description:'Afrobeat, jazz, and world rhythms.', cover:ph('global-groove',600,600), curator:'FANyard', trackIds:['t05','t09','t17','t29'] },
  { id:'p6', title:'Indie Electronic', description:'Synths and chiptune energy.', cover:ph('indie-elec',600,600), curator:'FANyard', trackIds:['t06','t19'] },
  { id:'p7', title:'Acoustic Mornings', description:'Warm guitars to start the day.', cover:ph('acoustic-morn',600,600), curator:'FANyard', trackIds:['t12','t21','t22','t23'] },
  { id:'p8', title:'Undiscovered Gems', description:'Fresh talent you need to hear.', cover:ph('undiscovered',600,600), curator:'FANyard', trackIds:['t04','t06','t09','t10','t13','t19','t24','t32'] },
];

export const posts: Post[] = [
  { id:'c7', author:'NavyboyXO', avatar:'/navyboyxo-profile.jpg', artistId:'navyboyxo', content:'"Silent Agreement" is officially out in the Yard. Abuja to the world. Let me know what you think of the new sound.', likes:156, comments:24, time:'1h', community:'roots' },
  { id:'c1', author:'Femi A.', avatar:ph('femi',80,80), content:'Kai Engel\'s ambient work is literally keeping me sane during finals week.', likes:24, comments:3, time:'2h', community:'focus-flow' },
  { id:'c2', author:'Scott Buckley', avatar:ph('scott',80,80), artistId:'scott-buckley', content:'Just finished scoring a new indie documentary. Hope you all enjoy the new cinematic tracks soon.', likes:412, comments:56, time:'5h', community:'cinematic-world' },
  { id:'c3', author:'Kezia M.', avatar:ph('kezia',80,80), content:'Just found HoliznaCC0 through the Roots page. Day One Fan confirmed. That "Blue" beat is insane.', likes:18, comments:1, time:'6h', community:'roots' },
  { id:'c4', author:'HoliznaCC0', avatar:ph('holizna',80,80), artistId:'holiznacc0', content:'Dropped 5 new beat tapes on the internet archive today. Go dig.', likes:67, comments:9, time:'8h', community:'lofi-sessions' },
  { id:'c5', author:'Tomás R.', avatar:ph('tomas',80,80), content:'Amine Maxwell is criminally underrated. That R&B sound is so smooth.', likes:41, comments:4, time:'12h', community:'global-indies' },
];

export const communities: Community[] = [
  { id:'lofi-sessions', name:'Lo-Fi Sessions', description:'Dusty beats and study vibes.', members:18400, cover:ph('lofi-comm',600,300) },
  { id:'focus-flow', name:'Focus & Flow', description:'Ambient sounds for deep work.', members:9200, cover:ph('focus-comm',600,300) },
  { id:'roots', name:'Roots Watchers', description:'Early fans of emerging artists.', members:4800, cover:ph('roots-comm',600,300) },
  { id:'cinematic-world', name:'Cinematic World', description:'Epic orchestral soundtracks.', members:2100, cover:ph('cine-comm',600,300) },
  { id:'global-indies', name:'Global Indies', description:'Indie music from every corner.', members:6100, cover:ph('global-comm',600,300) },
  { id:'indie-electronic', name:'After Hours', description:'Synths and electronic beats.', members:3400, cover:ph('elec-comm',600,300) },
];

export const GENRES = ['Afrobeats','Amapiano','Highlife','Afro-soul','Indie','Electronic','Jazz','R&B','Afrofusion','Lo-Fi','Chiptune','Cinematic','Chillhop'] as const;
export const MOODS = ['Energetic','Chill','Focus','Late Night','Sunset','Romance','Uplift'] as const;
export const ACTIVITIES = ['Workout','Study','Commute','Party','Relax','Cook'] as const;
export const COUNTRIES = ['Nigeria','Ghana','South Africa','Kenya','UK','USA','Japan','Mexico','Lebanon','Germany','Australia','France','Italy'] as const;
export const LANGUAGES = ['English','Yoruba','Twi','Zulu','Arabic','Spanish','Japanese','Instrumental'] as const;

export const getArtist = (id: string) => artists.find(a => a.id === id);
export const getTrack = (id: string) => tracks.find(t => t.id === id);
export const getPlaylist = (id: string) => playlists.find(p => p.id === id);
export const tracksByArtist = (artistId: string) => tracks.filter(t => t.artistId === artistId);
export const artistName = (id: string) => getArtist(id)?.name ?? 'Unknown';