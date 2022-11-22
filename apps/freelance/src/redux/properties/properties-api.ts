import { ApiRoutes, baseUrl } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';

import { PropertiesResponse } from './types';

enum EndpointsRoutes {
  getAllProperties = '',
}

export const propertiesApi = createApi({
  reducerPath: 'propertiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + ApiRoutes.PROPERTIES,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.access_token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getAllProperties: builder.query<PropertiesResponse, void>({
      query: () => EndpointsRoutes.getAllProperties,
    }),
  }),
});

export const { useGetAllPropertiesQuery } = propertiesApi;
