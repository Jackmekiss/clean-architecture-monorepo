import { InMemoryAccountBaseQuery } from '../../adapters/in-memory/InMemoryAccountBaseQuery';
import { createAccountAPI } from '../../apis/accountAPI';
import { ReduxStore, createStore } from '../../../initReduxStore';
import { CheckRefferalCodeParams, CheckRefferalCodeResponse } from '../../gateways/AccountBaseQuery';

describe('Check is refferal code valid', () => {
  let store: ReduxStore;
  let accountBaseQuery: InMemoryAccountBaseQuery;
  let accountAPI: ReturnType<typeof createAccountAPI>;

  beforeEach(() => {
    accountBaseQuery = new InMemoryAccountBaseQuery();
    accountAPI = createAccountAPI(accountBaseQuery.handle());
    store = createStore({ accountAPI }, { });
  });

  it('should check is refferal code is valid', async () => {
    accountBaseQuery.isRefferalCodeValid = {
      isValid: false,
    };

    await checkRefferalCode({
      code: '123456',
    });

    expectQuery({ code: '123456' }, { isValid: false });
  });

  const expectQuery = (query: CheckRefferalCodeParams, expected: CheckRefferalCodeResponse) => {
    expect(accountAPI.endpoints.checkRefferalCode.select(query)(store.getState() as any).data).toEqual(expected);
  };

  const checkRefferalCode = async (query: CheckRefferalCodeParams) => await store.dispatch(accountAPI.endpoints.checkRefferalCode.initiate(query));
});
