import React from 'react';
import type { AppProps } from 'next/app';
import theme from '@/shared/theme/themeConfig';
import { NextAuth } from '@/shared/context/NextAuth';
import { TRPCProvider } from '@/shared/context/TRPCProdvider';
import { ConfigProvider } from 'antd';
import '@/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => (
  <NextAuth>
    <TRPCProvider>
      <Component {...pageProps} />
    </TRPCProvider>
  </NextAuth>
);

export default App;