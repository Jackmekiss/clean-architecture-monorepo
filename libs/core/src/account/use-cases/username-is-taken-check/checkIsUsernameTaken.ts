import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { CheckIsUsernameTakenParams, CheckIsUsernameTakenResponse } from '../../gateways/AccountBaseQuery';

export const checkIsUsernameTakenBuilder = (build: EndpointBuilder<BaseQueryFn, 'Account', 'accountAPI'>) => ({
  checkIsUsernameTaken: build.query<CheckIsUsernameTakenResponse, CheckIsUsernameTakenParams>({
    query: (params) => {
      const { username } = params;

      if (username.length < 3) throw new Error('Username is too short');
      if (username.length > 20) throw new Error('Username is too long');
      if (username.includes(' ')) throw new Error('Username cannot contain spaces');
      if (/^[a-z][a-z0-9]*$/i.test(username) === false) throw new Error('Username can only contain letters and numbers');

      return {
        url: '/check-is-username-taken',
        method: 'GET',
        params,
      };
    },
    providesTags: ['Account'],
  }),
});
