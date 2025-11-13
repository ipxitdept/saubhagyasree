import { baseApi } from '../base';

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getUserDetails: build.query<any, any>({
      query: () => ({
        method: 'GET',
        url: 'associate/user/user_details',
      }),
      providesTags: ['user'],
    }),
    updateUserProfile: build.mutation<any, any>({
      query: data => ({
        method: 'POST',
        url: 'associate/user/updateinfo',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    updateUserBank: build.mutation<any, any>({
      query: data => ({
        method: 'POST',
        url: 'associate/user/updatebank',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserDetailsQuery,
  useUpdateUserProfileMutation,
  useUpdateUserBankMutation,
} = userApi;
