import { jobsApi } from 'redux/services/jobsApi';
import { setupApiStore } from 'redux/storeTest';

import { authReducer, logout, setRole, setUser } from '../auth-slice';

import { mockRole, testToken } from './mock-data';

describe('Auth actions', () => {
  test('Test login operation', () => {
    const { store } = setupApiStore(jobsApi, { user: authReducer });
    const stateBeforeAction = store.getState();
    store.dispatch(setUser({ access_token: testToken }));
    const stateAfterAction = store.getState();

    expect(stateBeforeAction.user.access_token).toBe(null);
    expect(stateAfterAction.user.access_token).toBe(testToken);
  });

  test('Test logout operation', () => {
    const { store } = setupApiStore(jobsApi, { user: authReducer });
    const stateBeforeAction = store.getState();
    store.dispatch(logout());
    const stateAfterAction = store.getState();

    expect(stateBeforeAction.user.access_token).toBeDefined();
    expect(stateAfterAction.user.access_token).toBe(null);
  });

  test('Test set role operation', () => {
    const { store } = setupApiStore(jobsApi, { user: authReducer });
    store.dispatch(setRole({ role: mockRole }));
    const state = store.getState();

    expect(state.user.role).toBe(mockRole);
  });
});
