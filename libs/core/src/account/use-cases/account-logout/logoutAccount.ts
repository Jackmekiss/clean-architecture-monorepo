import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { removeAccount, removeToken } from '../../slice';

export const logoutAccountBuilder = (build: EndpointBuilder<BaseQueryFn, 'Account', 'accountAPI'>) => ({
  logoutAccount: build.mutation<void, void>({
    query: (data) => ({
      url: '/logout',
      method: 'POST',
      body: data,
    }),
    async onQueryStarted(_, { dispatch, queryFulfilled }) {
      await queryFulfilled;

      dispatch(removeToken());
      dispatch(removeAccount());
    },
  }),
});
