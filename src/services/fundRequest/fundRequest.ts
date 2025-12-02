import { baseApi } from '../base';
import { Root } from './type';

const fundRequestApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createFundRequest: build.mutation<any, any>({
      query: data => ({
        method: 'POST',
        url: 'associate/account/fund_request',
        body: data,
      }),
      invalidatesTags: ['fund'],
    }),
    getfundHistory: build.query<Root, void>({
      query: () => ({
        method: 'GET',
        url: 'associate/account/fundrequest',
      }),
    }),
    createP2p: build.mutation<any, any>({
      query: data => ({
        method: 'POST',
        url: 'associate/account/fundtranx',
        body: data,
      }),
      invalidatesTags: ['wallet'],
    }),
      createP2a: build.mutation<any, any>({
      query: data => ({
        method: 'POST',
        url: 'associate/account/nettranx',
        body: data,
      }),
      invalidatesTags: ['wallet'],
    }),
     createC2a: build.mutation<any, any>({
      query: data => ({
        method: 'POST',
        url: 'associate/account/capitaltranx',
        body: data,
      }),
      invalidatesTags: ['wallet'],
    }),
     getP2pHistory: build.query<any, any>({
      query: id => ({
        method: 'GET',
        url: `associate/account/transfer/${id}`,
      }),
    }),
      getActivationHistory: build.query<Root, void>({
      query: () => ({
        method: 'GET',
        url: 'associate/account/activation',
      }),
    }),
     getFundHistory: build.query<Root, void>({
      query: () => ({
        method: 'GET',
        url: 'associate/account/myfund',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateFundRequestMutation,
  useGetfundHistoryQuery,
  useCreateP2pMutation,
  useGetP2pHistoryQuery,
  useCreateP2aMutation,
  useCreateC2aMutation,
  useGetActivationHistoryQuery,
  useGetFundHistoryQuery
} = fundRequestApi;
