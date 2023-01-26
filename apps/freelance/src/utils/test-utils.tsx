import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>{children}</BrowserRouter>
    </PersistGate>
  </Provider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
