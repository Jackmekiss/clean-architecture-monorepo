import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import isEmail from 'validator/lib/isEmail';
import {
  CheckIsEmailTakenParams, CheckIsEmailTakenResponse,
} from '../../gateways/AccountBaseQuery';

export const checkIsEmailTakenBuilder = (build: EndpointBuilder<BaseQueryFn, 'Account', 'accountAPI'>) => ({
  checkIsEmailTaken: build.query<CheckIsEmailTakenResponse, CheckIsEmailTakenParams>({
    query: (params) => {
      if (!isEmail(params.email)) throw new Error('Email is not valid');

      return {
        url: '/check-is-email-taken',
        method: 'GET',
        params,
      };
    },
  }),
});
