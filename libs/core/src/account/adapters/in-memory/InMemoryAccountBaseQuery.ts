import {
  AccountBaseQuery, CheckIsEmailTakenResponse, CheckIsUsernameTakenResponse, CheckPhoneVerificationCodeResponse, CheckRefferalCodeResponse, UpdateAccountParams,
} from '../../gateways/AccountBaseQuery';
import { Token } from '../../domain/token';
import { Account } from '../../domain/account';

export class InMemoryAccountBaseQuery extends AccountBaseQuery {
  private _isUsernameTaken: CheckIsUsernameTakenResponse | null = null;

  private _isRefferalCodeValid: CheckRefferalCodeResponse | null = null;

  private _isPhoneVerificationCodeValid: CheckPhoneVerificationCodeResponse | null = null;

  private _isEmailTaken: CheckIsEmailTakenResponse | null = null;

  private _token: Token | null = null;

  private _account: Account | null = null;

  constructor() {
    super();
  }

  async checkIsUsernameTaken(): Promise<CheckIsUsernameTakenResponse | null> {
    return this._isUsernameTaken;
  }

  async checkRefferalCode(): Promise<CheckRefferalCodeResponse | null> {
    return this._isRefferalCodeValid;
  }

  async checkPhoneVerificationCode(): Promise<CheckPhoneVerificationCodeResponse | null> {
    return this._isPhoneVerificationCodeValid;
  }

  async checkIsEmailTaken(): Promise<CheckIsEmailTakenResponse | null> {
    return this._isEmailTaken;
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

  set isUsernameTaken(value: CheckIsUsernameTakenResponse) {
    this._isUsernameTaken = value;
  }

  set isRefferalCodeValid(value: CheckRefferalCodeResponse) {
    this._isRefferalCodeValid = value;
  }

  set isPhoneVerificationCodeValid(value: CheckPhoneVerificationCodeResponse) {
    this._isPhoneVerificationCodeValid = value;
  }

  set isEmailTaken(value: CheckIsEmailTakenResponse) {
    this._isEmailTaken = value;
  }

  set token(value: Token) {
    this._token = value;
  }

  set account(value: Account) {
    this._account = value;
  }
}
