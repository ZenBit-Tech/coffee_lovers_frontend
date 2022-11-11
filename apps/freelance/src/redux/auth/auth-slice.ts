
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth/' }),
    endpoints: builder => ({
        loginUser: builder.mutation({
            query: (body: { email: string; password: string }) => {
                return {
                    url: 'signin',
                    method: 'POST',
                    body,
                };
            },
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
            url: 'signup',
            method: 'POST',
            body: newUser
            }),
        }),
    }),
})

export const { useLoginUserMutation, useCreateUserMutation } = authApi;
