import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { Account } from '../../domain/account';
import {
  addAccount, toggleIsLoadingAccount,
} from '../../slice';

export const retrieveAccountBuilder = (build: EndpointBuilder<BaseQueryFn, 'Account', 'accountAPI'>) => ({
  retrieveAccount: build.query<Account | null, void>({
    query: (params) => ({
      url: '/retrieve',
      method: 'GET',
      params,
    }),
    async onQueryStarted(_, { dispatch, queryFulfilled }) {
      dispatch(toggleIsLoadingAccount());

      const { data } = await queryFulfilled;

      dispatch(addAccount(data));
    },
  }),
});
