import type { Metadata } from 'next';

import './globals.css';
import { Noto_Sans, Protest_Riot } from 'next/font/google';

import HeaderComponent from '@/app/_components/Header';
import Provider from '@/provider/Provider';

const font = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const logo_font = Protest_Riot({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'pictARound',
  description: 'picutre around you',
};

declare global {
  interface Window {
    naver: any;
  }
}

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko">
    <body
      className={`${font.className} antialiased`}
    >
    <Provider>
      <div id="side-bar"></div>
      <div className="flex flex-col items-center justify-items-center">
        <div className="flex-col items-center border w-[600px] max-w-[100%] justify-center">
          <HeaderComponent />
          {children}
        </div>
      </div>
    </Provider>
    </body>
    </html>
  );
}
