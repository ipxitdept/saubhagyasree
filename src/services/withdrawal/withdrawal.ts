import { baseApi } from '../base';
import { Root } from './type';

const withdrawalApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createWithdrawRequest: build.mutation<any, any>({
      query: data => ({
        method: 'POST',
        url: 'associate/user/walletreq',
        body: data,
      }),
      invalidatesTags: ['withdrawal'],
    }),
    getWithdrawalHistory: build.query<Root, void>({
      query: () => ({
        method: 'GET',
        url: 'associate/account/withdrawhistory',
      }),
      providesTags: ['withdrawal'],
    }),
    createOtp: build.mutation<any, any>({
      query: () => ({
        method: 'POST',
        url: 'associate/user/generateOtp',
      })
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateWithdrawRequestMutation,
  useGetWithdrawalHistoryQuery,
  useCreateOtpMutation
} = withdrawalApi;
