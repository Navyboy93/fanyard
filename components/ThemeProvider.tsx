'use client';
import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useStore(s => s.theme);
  const [m, setM] = useState(false);
  useEffect(() => { setM(true); }, []);
  useEffect(() => { if (m) document.documentElement.classList.toggle('light', theme === 'light'); }, [theme, m]);
  return <>{children}</>;
}
