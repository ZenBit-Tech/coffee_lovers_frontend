import {
  Action,
  combineReducers,
  configureStore,
  EnhancedStore,
  Middleware,
  Reducer,
} from '@reduxjs/toolkit';

export function setupApiStore<
  A extends {
    reducer: Reducer;
    reducerPath: string;
    middleware: Middleware;
    util: { resetApiState(): object };
  },
  R extends Record<string, Reducer> = Record<string | number | symbol, Reducer>,
>(api: A, extraReducers?: R): { api: A; store: EnhancedStore } {
  const getStore = (): EnhancedStore =>
    configureStore({
      reducer: combineReducers({
        [api.reducerPath]: api.reducer,
        ...extraReducers,
      }),
      middleware: gdm =>
        gdm({ serializableCheck: false, immutableCheck: false }).concat(
          api.middleware,
        ),
    });

  type StoreType = EnhancedStore<
    {
      api: ReturnType<A['reducer']>;
    } & {
      [K in keyof R]: ReturnType<R[K]>;
    },
    Action,
    ReturnType<typeof getStore> extends EnhancedStore<unknown, Action, infer M>
      ? M
      : never
  >;

  const initialStore = getStore() as StoreType;
  const refObj = {
    api,
    store: initialStore,
  };
  const store = getStore() as StoreType;
  refObj.store = store;

  return refObj;
}
