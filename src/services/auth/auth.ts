import { baseApi } from '../base';

const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createLogin: build.mutation<any, any>({
      query: data => ({
        method: 'POST',
        url: 'auth/login',
        body: data,
      }),
    }),
  }),
  overrideExisting: true
});

export const { useCreateLoginMutation } = authApi;
