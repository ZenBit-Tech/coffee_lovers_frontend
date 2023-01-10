import React from 'react';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { renderHook, waitFor } from '@testing-library/react';
import { setUser } from 'redux/auth/auth-slice';
import { useGetUserWorkInfoQuery } from 'redux/services/userApi';
import { store } from 'redux/store';

import { noToken, testToken, userApiWorkHistory } from './mock-data';

fetchMock.enableMocks();

describe('check userApi use tocken of current user and query correct user data', () => {
  beforeEach((): void => {
    jest.resetModules();
    fetchMock.resetMocks();
  });

  beforeAll((): void => {
    store.dispatch(setUser({ access_token: testToken ? testToken : '' }));
  });

  interface Props {
    children: React.ReactNode;
  }

  const wrapper: React.FC<Props> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  test('Check token is rendered correctly after being set during auth', () => {
    expect(store.getState().user.access_token).not.toBe(noToken);
  });

  test('Check that we have user workhistory data from rtk query', async () => {
    try {
      fetchMock.mockResponseOnce(JSON.stringify(userApiWorkHistory));
      const { result } = renderHook(() => useGetUserWorkInfoQuery(), {
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
      fetchMock.mockReject(new Error('Internal Server Error'));
      const { result } = renderHook(() => useGetUserWorkInfoQuery(), {
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
