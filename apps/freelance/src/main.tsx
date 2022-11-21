import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';

import './translations';

import App from './app/app';
import { persistor, store } from './redux/store';
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
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={baseTheme}>
              <BrowserRouter>
                <GlobalStyle />
                <App />
              </BrowserRouter>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </Suspense>
    </StrictMode>
  </GoogleOAuthProvider>,
);
