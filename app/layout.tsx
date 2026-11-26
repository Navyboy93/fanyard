import type { Metadata } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
export const metadata: Metadata = { title: 'FANyard — Where Music Belongs' };
const themeScript = `try{const s=localStorage.getItem('fanyard-store');if(s){const t=JSON.parse(s)?.state?.theme;if(t==='light')document.documentElement.classList.add('light');}}catch(e){}`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
