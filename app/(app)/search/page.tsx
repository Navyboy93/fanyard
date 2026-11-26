import SearchClient from './SearchClient';
export default function Page({ searchParams }: { searchParams: { q?: string } }) {
  return <SearchClient initialQuery={searchParams.q ?? ''} />;
}
