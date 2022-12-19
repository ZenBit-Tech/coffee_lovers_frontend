import queryString from 'query-string';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';
import { FreelancerDataById } from 'redux/types/freelancers.types';
import { FreelancerQuery } from 'redux/types/user.types';

enum EndpointsRoutes {
  freelancer = '/freelancer',
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
    paramsSerializer: params => {
      return queryString.stringify(params, { arrayFormat: 'bracket' });
    },
  }),
  endpoints: builder => ({
    getFreelancer: builder.query({
      query: (params: FreelancerQuery) => ({
        url: EndpointsRoutes.freelancer,
        params,
      }),
    }),
    getFreelancerById: builder.query<FreelancerDataById, number>({
      query: (key: number) => ({
        url: `${EndpointsRoutes.freelancer}/${key}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetFreelancerQuery, useGetFreelancerByIdQuery } =
  freelancersApi;
