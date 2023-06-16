import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { Token } from '../../domain/token';
import { addToken, toggleIsLoadingToken } from '../../slice';
import { RegisterAccountParams } from '../../gateways/AccountBaseQuery';

export const registerAccountBuilder = (build: EndpointBuilder<BaseQueryFn, 'Account', 'accountAPI'>) => ({
  registerAccount: build.mutation<Token | null, RegisterAccountParams>({
    query: (data) => ({
      url: '/register',
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
