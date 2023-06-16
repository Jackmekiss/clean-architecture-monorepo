import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { checkIsUsernameTakenBuilder } from '../use-cases/username-is-taken-check/checkIsUsernameTaken';
import { checkRefferalCodeBuilder } from '../use-cases/refferal-code-check/checkRefferalCode';
import { checkPhoneVerificationCodeBuilder } from '../use-cases/phone-verification-code-check/checkPhoneVerificationCode';
import { checkIsEmailTakenBuilder } from '../use-cases/email-is-taken-check/checkIsEmailTaken';
import { registerAccountBuilder } from '../use-cases/account-register/registerAccount';
import { logoutAccountBuilder } from '../use-cases/account-logout/logoutAccount';
import { retrieveAccountBuilder } from '../use-cases/account-retrieval/retrieveAccount';
import { loginAccountBuilder } from '../use-cases/account-login/loginAccount';
import { updateAccountBuilder } from '../use-cases/account-update/updateAccount';

export const createAccountAPI = (baseQuery: BaseQueryFn) => {
  const accountAPI = createApi({
    baseQuery,
    reducerPath: 'accountAPI',
    tagTypes: ['Account'],
    endpoints: (builder) => ({
      ...checkIsUsernameTakenBuilder(builder),
      ...checkRefferalCodeBuilder(builder),
      ...checkPhoneVerificationCodeBuilder(builder),
      ...checkIsEmailTakenBuilder(builder),
      ...registerAccountBuilder(builder),
      ...logoutAccountBuilder(builder),
      ...retrieveAccountBuilder(builder),
      ...loginAccountBuilder(builder),
      ...updateAccountBuilder(builder),
    }),
  });

  return accountAPI;
};
