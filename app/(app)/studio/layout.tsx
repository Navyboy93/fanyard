'use client';

import dynamic from 'next/dynamic';

const StudioClient = dynamic(() => import('./page'), { ssr: false });

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <StudioClient />;
}