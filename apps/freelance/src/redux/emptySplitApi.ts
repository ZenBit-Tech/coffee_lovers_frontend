import queryString from 'query-string';
import { apiTags, baseUrl } from '@freelance/constants';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';

import { ApiError } from './types/error.types';

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: getHeaders(),
    paramsSerializer: params => {
      return queryString.stringify(params, { arrayFormat: 'bracket' });
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, ApiError>,
  endpoints: () => ({}),
  tagTypes: Object.values(apiTags),
});
