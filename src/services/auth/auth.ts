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
     createSignup: build.mutation<any, any>({
      query: data => ({
        method: 'POST',
        url: 'auth/custsignup',
        body: data,
      }),
    }),
  }),
  overrideExisting: true
});

export const { useCreateLoginMutation, useCreateSignupMutation } = authApi;
