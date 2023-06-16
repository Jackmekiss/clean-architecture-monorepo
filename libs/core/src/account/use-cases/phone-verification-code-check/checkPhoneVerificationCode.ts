import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { CheckPhoneVerificationCodeParams, CheckPhoneVerificationCodeResponse } from '../../gateways/AccountBaseQuery';

export const checkPhoneVerificationCodeBuilder = (build: EndpointBuilder<BaseQueryFn, 'Account', 'accountAPI'>) => ({
  checkPhoneVerificationCode: build.query<CheckPhoneVerificationCodeResponse, CheckPhoneVerificationCodeParams>({
    query: (params) => ({
      url: '/check-phone-verification-code',
      method: 'GET',
      params,
    }),
    providesTags: ['Account'],
  }),
});
