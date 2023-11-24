import '@/styles/globals.css';
import '@/styles/themeSwitcher.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import Layout from '@/components/Layout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function defaultLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? defaultLayout;

  return getLayout(<Component {...pageProps} />);
}
