import type { Metadata } from 'next';

import './globals.css';
import { Noto_Sans, Protest_Riot } from 'next/font/google';

import Provider from '@/provider/Provider';
import HeaderComponent from '@/components/Header';

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
      <div id="portal" className={'non-block'}></div>
      <div className="flex flex-col items-center justify-items-center h-[100vh]">
        <div className="flex flex-col items-center w-[600px] max-w-[100%] h-[100vh]">
          <HeaderComponent />
          <div className={'w-full flex flex-col flex-1'}>
            {children}
          </div>
        </div>
      </div>
    </Provider>
    </body>
    </html>
  );
}
