import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

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
  </StrictMode>,
);
