import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { Token } from '../../domain/token';
import { addToken, toggleIsLoadingToken } from '../../slice';

export const loginAccountBuilder = (build: EndpointBuilder<BaseQueryFn, 'Account', 'accountAPI'>) => ({
  loginAccount: build.mutation<Token | null, void>({
    query: (data) => ({
      url: '/login',
      method: 'POST',
      body: data,
    }),
    async onQueryStarted(_, { dispatch, queryFulfilled }) {
      dispatch(toggleIsLoadingToken());

      const { data } = await queryFulfilled;

      dispatch(addToken(data));
    },
  }),
});
