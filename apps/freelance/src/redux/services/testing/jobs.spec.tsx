import React from 'react';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { renderHook, waitFor } from '@testing-library/react';
import { setUser } from 'redux/auth/auth-slice';
import { authReducer } from 'redux/auth/auth-slice';
import { jobsApi, useFindUserJobsQuery } from 'redux/services/jobsApi';
import { setupApiStore } from 'redux/storeTest';

import { freelancerId, testToken, userJobs } from './mock-data';

fetchMock.enableMocks();

describe('check userjob query', () => {
  beforeEach((): void => {
    jest.resetModules();
    fetchMock.resetMocks();
  });

  interface Props {
    children: React.ReactNode;
  }

  const wrapper: React.FC<Props> = ({ children }) => {
    const { store } = setupApiStore(jobsApi, { user: authReducer });

    return <Provider store={store}>{children}</Provider>;
  };

  test('Check if after data loading, we have data about user jobs from userFindUserQuery() hook ', async () => {
    try {
      fetchMock.mockResponse(JSON.stringify(userJobs));
      const { store } = setupApiStore(jobsApi, { user: authReducer });
      store.dispatch(setUser({ access_token: testToken ? testToken : '' }));
      expect(store.getState().user.access_token).toBe(testToken);
      const { result } = renderHook(() => useFindUserJobsQuery(freelancerId), {
        wrapper,
      });
      const initialResponse = result.current;
      expect(initialResponse.data).toBeUndefined();
      expect(initialResponse.isLoading).toBe(true);

      await waitFor(() => expect(initialResponse.data).toBeDefined());
      expect(initialResponse.isLoading).toBeFalsy();
    } catch (err) {
      return err;
    }
  });

  test('Check does user have error handler for Internal Server Error after data loaded in case of something went wrong', async () => {
    try {
      const { store } = setupApiStore(jobsApi, { auth: authReducer });
      const state = store.getState();
      store.dispatch(setUser({ access_token: testToken ? testToken : '' }));
      expect(state.auth.access_token).toBeDefined();
      fetchMock.mockReject(new Error('Internal Server Error'));
      const { result } = renderHook(() => useFindUserJobsQuery(freelancerId), {
        wrapper,
      });
      const initialResponse = result.current;
      expect(initialResponse.data).toBeUndefined();
      expect(initialResponse.isLoading).toBe(true);

      await waitFor(() => expect(initialResponse.data).toBeDefined());
      expect(initialResponse.isError).toBe(true);
    } catch (err) {
      return err;
    }
  });
});
