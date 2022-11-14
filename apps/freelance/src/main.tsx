import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from 'styled-components';

import './translations';

import App from './app/app';
import { store } from './redux/store';
import { GlobalStyle } from './styles/GlobalStyle';
import { baseTheme } from './styles/theme';

import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <GoogleOAuthProvider clientId={process.env['NX_CLIENT_ID'] as string}>
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <ThemeProvider theme={baseTheme}>
            <BrowserRouter>
              <GlobalStyle />
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </Suspense>
    </StrictMode>
    ,
  </GoogleOAuthProvider>,
);
