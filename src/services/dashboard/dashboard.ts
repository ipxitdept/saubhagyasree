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
    }),
  }),
  overrideExisting: true
});

export const { useGetDashboardQuery, useGetWalletQuery } = dashboardApi;
