import React from 'react';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { renderHook, waitFor } from '@testing-library/react';
import { setUser } from 'redux/auth/auth-slice';
import { authReducer } from 'redux/auth/auth-slice';
import { setupApiStore } from 'redux/storeTest';

import { jobsApi, useFindUserJobsQuery } from '../jobsApi';

import { testToken } from './mock-data';

fetchMock.enableMocks();

describe('check job query', () => {
  const OLD_ENV = process.env;

  beforeEach((): void => {
    process.env = Object.assign(process.env, { ...OLD_ENV });
    jest.resetModules();
    fetchMock.resetMocks();
  });

  afterAll(() => {
    process.env = { ...OLD_ENV };
  });

  interface Props {
    children: React.ReactNode;
  }

  const wrapper: React.FC<Props> = ({ children }) => {
    const { store } = setupApiStore(jobsApi, { user: authReducer });

    return <Provider store={store}>{children}</Provider>;
  };
  test('Check if we have succes data fetching', async () => {
    try {
      fetchMock.mockResponse(JSON.stringify([]));
      const { store } = setupApiStore(jobsApi, { user: authReducer });
      store.dispatch(setUser({ access_token: testToken ? testToken : '' }));
      expect(store.getState().user.access_token).toBe(testToken);
      const { result } = renderHook(() => useFindUserJobsQuery(), {
        wrapper,
      });
      const initialResponse = result.current;
      expect(initialResponse.data).toBeUndefined();
      expect(initialResponse.isLoading).toBe(true);

      const resp = await waitFor(() => useFindUserJobsQuery());
      expect(resp.isSuccess).toBe(true);
      expect(resp.data).toBeDefined();
    } catch (err) {
      return err;
    }
  });

  test('Check the work of error handler', async () => {
    try {
      const { store } = setupApiStore(jobsApi, { auth: authReducer });
      const state = store.getState();
      store.dispatch(setUser({ access_token: testToken ? testToken : '' }));
      expect(state.auth.access_token).toBeDefined();
      fetchMock.mockReject(new Error('Internal Server Error'));
      const { result } = renderHook(() => useFindUserJobsQuery(), {
        wrapper,
      });
      const initialResponse = result.current;
      expect(initialResponse.data).toBeUndefined();
      expect(initialResponse.isLoading).toBe(true);

      const succes = await waitFor(() => useFindUserJobsQuery());
      expect(succes.isSuccess).toBe(true);
    } catch (err) {
      return err;
    }
  });
});
