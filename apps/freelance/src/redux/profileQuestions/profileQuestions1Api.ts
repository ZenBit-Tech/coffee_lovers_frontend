import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileQuestions1Api = createApi({
  reducerPath: 'profileQuestions1Api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['ProfileQuestions1'],
  endpoints: builder => ({
    addprofileQuestions1Data: builder.mutation({
      query: ({
        availableTime,
        description,
        hourlyRate,
        position,
        educationDescr,
        educationFrom,
        educationTo,
        workHistoryDescr,
        workHistoryFrom,
        workHistoryTo,
      }) => ({
        url: `/api/profile-questions-1`,
        method: 'POST',
        body: {
          available_time: availableTime,
          description: description,
          hourly_rate: hourlyRate,
          position: position,
          education_descr: educationDescr,
          education_from: educationFrom,
          education_to: educationTo,
          work_history_descr: workHistoryDescr,
          work_history_from: workHistoryFrom,
          work_history_to: workHistoryTo,
        },
      }),
      invalidatesTags: ['ProfileQuestions1'],
    }),
  }),
});

export const { useAddprofileQuestions1DataMutation } = profileQuestions1Api;
