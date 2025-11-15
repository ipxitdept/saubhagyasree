import { baseApi } from '../base';

const rewardApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getReward: build.query<any, any>({
      query: () => ({
        method: 'GET',
        url: 'associate/team/reward',
      }),
    }),
    getDirectReward: build.query<any, any>({
      query: () => ({
        method: 'GET',
        url: 'associate/team/directreward',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetRewardQuery, useGetDirectRewardQuery } = rewardApi;
