import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { profileQ1Payload } from 'redux/services/types/profileQuestions1.types';

declare let process: {
  env: {
    NX_API_URL: string;
  };
};

const baseUrl: string = (process.env.NX_API_URL as string) || '';

export const profileQuestions1Api = createApi({
  reducerPath: 'profileQuestions1Api',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['ProfileQuestions1'],
  endpoints: builder => ({
    addprofileQuestions1Data: builder.mutation({
      query: (payload: profileQ1Payload) => ({
        url: `/api/profile-questions-1`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['ProfileQuestions1'],
    }),
  }),
});

export const { useAddprofileQuestions1DataMutation } = profileQuestions1Api;
