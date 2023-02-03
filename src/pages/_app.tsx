import { type AppType } from 'next/app';
import React from 'react';
// import { api } from "../../__exclude/src/utils/api";

import '../styles/globals.css';

// eslint-disable-next-line react/prop-types -- s
const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// export default api.withTRPC(MyApp);
export default MyApp;
