import 'utils/setup';
import 'styles/styles.css';
import 'swiper/css';
import 'swiper/css/pagination';

import { AppProps } from 'next/app';
import React from 'react';

import { ConfigProvider } from 'antd';
import { RecoilRoot } from 'recoil';

import { RecoilUtilsComponent } from 'stores/RecoilUtils';

import { theme } from 'styles/theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ConfigProvider theme={{ token: { colorPrimary: theme.color.primary } }}>
        <Component {...pageProps} />
      </ConfigProvider>

      <RecoilUtilsComponent />
    </RecoilRoot>
  );
}

export default App;
