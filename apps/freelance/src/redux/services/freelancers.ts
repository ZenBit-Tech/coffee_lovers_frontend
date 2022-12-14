import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';
import { FreelancerDataById } from 'redux/types/freelancers.types';

import { takeItems } from './constants';

enum EndpointsRoutes {
  freelancer = 'freelancer',
  user = 'user',
}

export const freelancersApi = createApi({
  reducerPath: 'freelancersReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env['NX_API_URL']}/${EndpointsRoutes.user}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.access_token as string;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getFreelancer: builder.query({
      query: (page: number) =>
        `${EndpointsRoutes.freelancer}/?page=${page}&take=${takeItems}`,
    }),
    getFreelancerById: builder.query<FreelancerDataById, number>({
      query: (key: number) => ({
        url: `/${key}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetFreelancerQuery, useGetFreelancerByIdQuery } =
  freelancersApi;
