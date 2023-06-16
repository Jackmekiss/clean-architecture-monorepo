import { Token } from '../../domain/token';
import { Account } from '../../domain/account';
import {
  AccountBaseQuery, CheckIsEmailTakenResponse, CheckIsUsernameTakenResponse, CheckPhoneVerificationCodeResponse, CheckRefferalCodeResponse, UpdateAccountParams,
} from '../../gateways/AccountBaseQuery';
import { Media } from '../../../shared/domain/media';

export class FakeAccountBaseQuery extends AccountBaseQuery {
  private _isUsernameTaken: CheckIsUsernameTakenResponse = {
    isTaken: false,
  };

  private _isRefferalCodeValid: CheckRefferalCodeResponse = {
    isValid: true,
  };

  private _isPhoneVerificationCodeValid: CheckPhoneVerificationCodeResponse = {
    isValid: true,
  };

  private _isEmailTaken: CheckIsEmailTakenResponse = {
    isTaken: false,
  };

  private _account: Account = {
    id: '2ed983c6-9092-4c9f-b5b1-6a8140578dfc',
    username: 'Jackmekiss',
    name: 'Martin Seigneuret',
    avatar: {
      height: 200, width: 200, extension: 'jpg', type: 'image', uri: 'https://i.pravatar.cc/120?img=12',
    } as Media,
    bio: 'I am a software engineer',
    review: {
      total: 10,
      average: 4,
    },
    totalFollowers: 168000,
    totalFollowing: 721,
  };

  private _token: Token = {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  };

  constructor() {
    super();
  }

  async checkIsUsernameTaken(): Promise<CheckIsUsernameTakenResponse | null> {
    return new Promise((resolve) => setTimeout(() => resolve(this._isUsernameTaken), 1000));
  }

  async checkRefferalCode(): Promise<CheckRefferalCodeResponse | null> {
    return new Promise((resolve) => setTimeout(() => resolve(this._isRefferalCodeValid), 1000));
  }

  async checkPhoneVerificationCode(): Promise<CheckPhoneVerificationCodeResponse | null> {
    return new Promise((resolve) => setTimeout(() => resolve(this._isPhoneVerificationCodeValid), 1000));
  }

  async checkIsEmailTaken(): Promise<CheckIsEmailTakenResponse | null> {
    return new Promise((resolve) => setTimeout(() => resolve(this._isEmailTaken), 1000));
  }

  async registerAccount(): Promise<Token | null> {
    return this._token;
  }

  async logoutAccount(): Promise<void> {
    return;
  }

  async retrieveAccount(): Promise<Account | null> {
    return this._account;
  }

  async loginAccount(): Promise<Token | null> {
    return this._token;
  }

  async updateAccount(body: UpdateAccountParams): Promise<Account | null> {
    this._account = { ...this._account!, ...body };

    return this._account;
  }
}
