import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { Token } from '../domain/token';
import { Account } from '../domain/account';
import { Media } from '../../shared/domain/media';

export abstract class AccountBaseQuery {
  public handle = (): BaseQueryFn<
  {
    url: string
    method: 'GET' | 'POST'
    body: any
    params: any
  },
  unknown,
  unknown
> => async ({
    url, params, body,
  }) => {
    if (url === '/check-is-username-taken') {
      return {
        data: this.checkIsUsernameTaken(params),
      };
    }

    if (url === '/check-refferal-code') {
      return {
        data: this.checkRefferalCode(params),
      };
    }

    if (url === '/check-phone-verification-code') {
      return {
        data: this.checkPhoneVerificationCode(params),
      };
    }

    if (url === '/check-is-email-taken') {
      return {
        data: this.checkIsEmailTaken(params),
      };
    }

    if (url === '/retrieve') {
      return {
        data: this.retrieveAccount(),
      };
    }

    if (url === '/register') {
      return {
        data: this.registerAccount(body),
      };
    }

    if (url === '/logout') {
      return {
        data: this.logoutAccount(),
      };
    }

    if (url === '/login') {
      return {
        data: this.loginAccount(),
      };
    }

    if (url === '/update') {
      return {
        data: this.updateAccount(body),
      };
    }

    return {
      data: {},
    };
  };

  public abstract checkIsUsernameTaken(params: CheckIsUsernameTakenParams): Promise<CheckIsUsernameTakenResponse | null>

  public abstract checkRefferalCode(params: CheckRefferalCodeParams): Promise<CheckRefferalCodeResponse | null>

  public abstract checkPhoneVerificationCode(params: CheckPhoneVerificationCodeParams): Promise<CheckPhoneVerificationCodeResponse | null>

  public abstract checkIsEmailTaken(params: CheckIsEmailTakenParams): Promise<CheckIsEmailTakenResponse | null>

  public abstract registerAccount(params: RegisterAccountParams): Promise<Token | null>

  public abstract logoutAccount(): Promise<void>

  public abstract loginAccount(): Promise<Token | null>

  public abstract retrieveAccount(): Promise<Account | null>

  public abstract updateAccount(params: UpdateAccountParams): Promise<Account | null>
}

export interface UpdateAccountParams {
  username?: string;
  name?: string;
  avatar?: Media;
}

export interface RegisterAccountParams {
  googleToken?: string
}

export interface CheckIsUsernameTakenParams {
  username: string;
}

export interface CheckIsUsernameTakenResponse {
  isTaken: boolean;
}

export interface CheckIsEmailTakenParams {
  email: string;
}

export interface CheckIsEmailTakenResponse {
  isTaken: boolean;
}

export interface CheckRefferalCodeParams {
  code: string;
}

export interface CheckRefferalCodeResponse {
  isValid: boolean;
}

export interface CheckPhoneVerificationCodeParams {
  code: string;
}

export interface CheckPhoneVerificationCodeResponse {
  isValid: boolean;
}
