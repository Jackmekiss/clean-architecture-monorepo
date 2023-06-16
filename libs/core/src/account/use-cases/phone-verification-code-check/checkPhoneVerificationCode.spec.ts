import { InMemoryAccountBaseQuery } from '../../adapters/in-memory/InMemoryAccountBaseQuery';
import { createAccountAPI } from '../../apis/accountAPI';
import { ReduxStore, createStore } from '../../../initReduxStore';
import { CheckPhoneVerificationCodeParams, CheckPhoneVerificationCodeResponse } from '../../gateways/AccountBaseQuery';

describe('Check phone verification code valid', () => {
  let store: ReduxStore;
  let accountBaseQuery: InMemoryAccountBaseQuery;
  let accountAPI: ReturnType<typeof createAccountAPI>;

  beforeEach(() => {
    accountBaseQuery = new InMemoryAccountBaseQuery();
    accountAPI = createAccountAPI(accountBaseQuery.handle());
    store = createStore({ accountAPI }, { });
  });

  it('should check is the phone verification code vald', async () => {
    accountBaseQuery.isPhoneVerificationCodeValid = {
      isValid: false,
    };

    await checkPhoneVerificationCode({
      code: '123456',
    });

    expectQuery({ code: '123456' }, { isValid: false });
  });

  const expectQuery = (query: CheckPhoneVerificationCodeParams, expected: CheckPhoneVerificationCodeResponse) => {
    expect(accountAPI.endpoints.checkPhoneVerificationCode.select(query)(store.getState() as any).data).toEqual(expected);
  };

  const checkPhoneVerificationCode = async (query: CheckPhoneVerificationCodeParams) => await store.dispatch(accountAPI.endpoints.checkPhoneVerificationCode.initiate(query));
});
