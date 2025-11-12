import { baseApi } from '../base';

const activationApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createActivation: build.mutation<any, any>({
      query: data => ({
        method: 'POST',
        url: 'associate/user/active_user_sponsor',
        body: data,
      }),
      invalidatesTags: ['activation'],
    }),
    getUpgradeHistory: build.query<any, any>({
      query: () => ({
        method: 'GET',
        url: 'associate/user/upgradehistory',
      }),
      providesTags: ['activation']
    }),
  }),
  overrideExisting: true,
});

export const {useCreateActivationMutation, useGetUpgradeHistoryQuery} = activationApi;
