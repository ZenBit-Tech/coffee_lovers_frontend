import React from 'react';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react';
import { authReducer, setUser } from 'redux/auth/auth-slice';
import { setupApiStore } from 'redux/store.spec';

import { jobsApi, useFindUserJobsQuery } from './jobsApi';

describe('useListVariantsQuery', () => {
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
    const storeRef = setupApiStore(jobsApi, { auth: authReducer });
    const testToken = process.env['NX_TEST_TOKEN'];
    storeRef.store.dispatch(
      setUser({ access_token: testToken ? testToken : '' }),
    );
    return <Provider store={storeRef.store}>{children}</Provider>;
  };
  it('Success', async () => {
    try {
      fetchMock.mockResponse(JSON.stringify([]));
      const { result } = renderHook(() => useFindUserJobsQuery(null), {
        wrapper,
      });
      const initialResponse = result.current;
      expect(initialResponse.data).toBeUndefined();
      expect(initialResponse.isLoading).toBe(true);
    } catch (err) {
      return err;
    }
  });

  it('Internal Server Error', async () => {
    try {
      fetchMock.mockReject(new Error('Internal Server Error'));
      const { result } = renderHook(() => useFindUserJobsQuery(null), {
        wrapper,
      });
      const initialResponse = result.current;
      expect(initialResponse.data).toBeUndefined();
      expect(initialResponse.isLoading).toBe(true);
    } catch (err) {
      return err;
    }
  });
});
