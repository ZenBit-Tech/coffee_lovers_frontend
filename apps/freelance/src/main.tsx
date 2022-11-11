import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './translations';
import App from './app/app';
import { store } from './redux/store';
import { GlobalStyle } from './styles/GlobalStyle';
import { baseTheme } from './styles/theme';

import 'antd/dist/antd.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <GoogleOAuthProvider clientId="71848933982-oc9dn519u5k0dp3pp0a8h20maaokdap8.apps.googleusercontent.com">
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
