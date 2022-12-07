import { authReducer, logout, setRole, setUser } from 'redux/auth/auth-slice';
import { jobsApi } from 'redux/services/jobsApi';
import { setupApiStore } from 'redux/storeTest';

import { mockRole, testToken } from './mock-data';

describe('Auth actions', () => {
  test('Test if user has token after login', () => {
    const { store } = setupApiStore(jobsApi, { user: authReducer });
    const stateBeforeAction = store.getState();
    store.dispatch(setUser({ access_token: testToken }));
    const stateAfterAction = store.getState();

    expect(stateBeforeAction.user.access_token).toBe(null);
    expect(stateAfterAction.user.access_token).toBe(testToken);
  });

  test('Test if user has ni token after logout', () => {
    const { store } = setupApiStore(jobsApi, { user: authReducer });
    const stateBeforeAction = store.getState();
    store.dispatch(logout());
    const stateAfterAction = store.getState();

    expect(stateBeforeAction.user.access_token).toBeDefined();
    expect(stateAfterAction.user.access_token).toBe(null);
  });

  test('Test the role change', () => {
    const { store } = setupApiStore(jobsApi, { user: authReducer });
    store.dispatch(setRole({ role: mockRole }));
    const state = store.getState();

    expect(state.user.role).toBe(mockRole);
  });
});
