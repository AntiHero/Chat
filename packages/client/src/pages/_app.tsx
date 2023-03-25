import { type AppProps } from 'next/app';
import React from 'react';

const MainApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MainApp;
