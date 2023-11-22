import React, { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import theme from '@/shared/theme/themeConfig';
import { NextAuth } from '@/shared/context/NextAuth';
import { TRPCProvider } from '@/shared/context/TRPCProdvider';
import { ConfigProvider } from 'antd';
import '@/styles/globals.css'
import { NextPage } from 'next';
import ErrorBoundary from '@/shared/components/common/ErrorBoundary';
import Head from 'next/head';
import DashBoardLayout from '@/shared/components/common/admin/DashboardLayout';
import { Provider } from 'react-redux';
import { store } from '@/shared/stores';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};


function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => <DashBoardLayout>{page}</DashBoardLayout>);
  return (
    <ErrorBoundary>
      <Head>
        <title>Admin site</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/favicon.ico' />
      </Head>
      <Provider store={store}>
        <NextAuth>
          <TRPCProvider>
            {getLayout(<Component {...pageProps} />)}
          </TRPCProvider>
        </NextAuth>
      </Provider>
    </ErrorBoundary>
  );
}
export default App;