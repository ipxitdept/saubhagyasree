import { baseApi } from '../base';

const dashboardApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getDashboard: build.query<any, any>({
      query: () => ({
        method: 'GET',
        url: 'associate/dashboard/index',
      }),
    }),
    getWallet: build.query<any, any>({
      query: () => ({
        method: 'GET',
        url: 'associate/dashboard/wallet',
      }),
      providesTags: ['wallet'],
    }),
    getIncomeHistory: build.query<any, any>({
      query: id => ({
        method: 'GET',
        url: `associate/income/${id}`,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDashboardQuery,
  useGetWalletQuery,
  useGetIncomeHistoryQuery,
} = dashboardApi;
