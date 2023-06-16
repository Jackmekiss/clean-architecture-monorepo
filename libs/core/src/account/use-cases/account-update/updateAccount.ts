import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { toggleIsLoadingToken, updateAccount } from '../../slice';
import { UpdateAccountParams } from '../../gateways/AccountBaseQuery';
import { Account } from '../../domain/account';

export const updateAccountBuilder = (build: EndpointBuilder<BaseQueryFn, 'Account', 'accountAPI'>) => ({
  updateAccount: build.mutation<Account, UpdateAccountParams>({
    queryFn: async (
      data: UpdateAccountParams,
      { dispatch },
      extraOptions: any,
      baseQuery: any,
    ) => {
      dispatch(toggleIsLoadingToken());

      const result = await baseQuery({
        url: '/update',
        method: 'POST',
        body: data,
      });

      const responseData = await result.data as Account;

      dispatch(updateAccount(responseData));

      return result;
    },
  }),
});
