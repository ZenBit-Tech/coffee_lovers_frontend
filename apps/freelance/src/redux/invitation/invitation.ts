import { ApiRoutes, baseUrl } from '@freelance/constants';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';

import { Error, InviteParams } from './invitation.types';

export const invitationApi = createApi({
  reducerPath: 'invitationApi',
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
    getInvitationDetails: builder.query({
      query: (body: InviteParams) => `${ApiRoutes.INVITE}/${body.frId}`,
    }),
  }),
});

export const { useGetInvitationDetailsQuery } = invitationApi;
