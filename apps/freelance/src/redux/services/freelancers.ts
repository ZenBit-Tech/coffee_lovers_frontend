import queryString from 'query-string';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';

import { FreelancerQuery } from '../types/user.types';

export const freelancersApi = createApi({
  reducerPath: 'freelancersReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env['NX_API_URL']}/user/freelancer`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.access_token as string;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
    paramsSerializer: params => {
      return queryString.stringify(params, { arrayFormat: 'bracket' });
    },
  }),
  endpoints: builder => ({
    getFreelancer: builder.query({
      query: (params: FreelancerQuery) => ({
        url: '/',
        params,
      }),
    }),
  }),
});

export const { useGetFreelancerQuery } = freelancersApi;
