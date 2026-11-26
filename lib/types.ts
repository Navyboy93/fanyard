export interface Artist {
  id: string; name: string; bio: string; photo: string; cover: string;
  monthlyListeners: number; followers: number; genres: string[]; country: string;
  isEmerging: boolean; dayOneFans: number; relatedArtists: string[];
}
export interface Track {
  id: string; title: string; artistId: string; duration: number; audioUrl: string | null;
  artwork: string; genre: string; mood: string; country: string; language: string;
  plays: number; isNew?: boolean; isUndiscovered?: boolean;
}
export interface Playlist { id: string; title: string; description: string; cover: string; trackIds: string[]; curator: string; isUser?: boolean; }
export interface Post { id: string; author: string; avatar: string; artistId?: string; content: string; likes: number; comments: number; time: string; community?: string; }
export interface Community { id: string; name: string; description: string; members: number; cover: string; }
export const GENRES = ['Afrobeats','Amapiano','Highlife','Afro-soul','Indie','Electronic','Jazz','R&B'] as const;
export const MOODS = ['Energetic','Chill','Focus','Late Night','Sunset','Romance','Uplift'] as const;
export const ACTIVITIES = ['Workout','Study','Commute','Party','Relax','Cook'] as const;
export const COUNTRIES = ['Nigeria','Ghana','South Africa','Kenya','UK','USA','Japan','Mexico','Lebanon'] as const;
export const LANGUAGES = ['English','Yoruba','Twi','Zulu','Arabic','Spanish','Japanese'] as const;
