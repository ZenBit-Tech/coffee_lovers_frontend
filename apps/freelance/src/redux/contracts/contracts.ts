import { ApiRoutes, baseUrl } from '@freelance/constants';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';

import { ContractsResponse, Error } from './types';

enum ContractsEndpoints {
  opened = '/active',
  closed = '/closed',
}

export const contractsApi = createApi({
  reducerPath: 'contractsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.access_token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, Error>,

  endpoints: builder => ({
    getActiveConracts: builder.query<ContractsResponse[], void>({
      query: () => `${ApiRoutes.CONTRACTS}${ContractsEndpoints.opened}`,
    }),
    getClosedContracts: builder.query<ContractsResponse[], void>({
      query: () => `${ApiRoutes.CONTRACTS}${ContractsEndpoints.closed}`,
    }),
  }),
});

export const { useGetClosedContractsQuery, useGetActiveConractsQuery } =
  contractsApi;
