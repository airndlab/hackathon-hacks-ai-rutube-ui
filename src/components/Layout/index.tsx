import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/Layout/Header';
import NavigationBackdrop from '@/components/Layout/NavigationBackdrop';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children?: ReactNode;
};

function Layout ({ children }: Props) {
  return (
    <main
      className={`flex relative min-h-screen flex-col items-center justify-start pb-8 px-0 lg:px-24 ${inter.className}`}
    >
      <Header/>
      <NavigationBackdrop/>
      {children}
      <div className="main-bg"/>
    </main>
  );
}

export default Layout;
