import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store/store';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://saubhagyashree.co.in/app/s1/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['user', 'fund', 'withdrawal', 'activation', 'wallet'],
});
