import { baseApi } from '../base';

const teamApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getLevelTeam: build.query<any, any>({
      query: () => ({
        method: 'GET',
        url: 'associate/team/level',
      }),
    }),
    getLevelMember: build.query<any, any>({
      query: id => ({
        method: 'GET',
        url: `associate/team/levelmember/${id}`,
      }),
    }),
    getGenealogy: build.query<any, { user?: string }>({
      query: ({ user }) => ({
        method: 'GET',
        url: `associate/team/genealogy`,
        params: user ? { user } : {},   
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetLevelTeamQuery, useGetLevelMemberQuery, useGetGenealogyQuery } = teamApi;
