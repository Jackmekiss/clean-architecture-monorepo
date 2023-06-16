import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { CheckRefferalCodeParams, CheckRefferalCodeResponse } from '../../gateways/AccountBaseQuery';

export const checkRefferalCodeBuilder = (build: EndpointBuilder<BaseQueryFn, 'Account', 'accountAPI'>) => ({
  checkRefferalCode: build.query<CheckRefferalCodeResponse, CheckRefferalCodeParams>({
    query: (params) => ({
      url: '/check-refferal-code',
      method: 'GET',
      params,
    }),
    providesTags: ['Account'],
  }),
});
