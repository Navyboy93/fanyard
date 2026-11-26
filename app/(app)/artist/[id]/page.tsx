import { artists } from '@/lib/data';
import ArtistClient from './ArtistClient';
export function generateStaticParams() { return artists.map(a => ({ id: a.id })); }
export default function Page({ params }: { params: { id: string } }) { return <ArtistClient artistId={params.id} />; }
