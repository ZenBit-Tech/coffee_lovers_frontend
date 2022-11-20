import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const talentApi = createApi({
  reducerPath: 'talentApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo',
  }),
  endpoints: builder => ({
    getTalents: builder.query({
      query: () => `/`,
    }),
  }),
});

export const { useGetTalentsQuery } = talentApi;
