import { accountBuilder } from '../../domain/builders/accountBuilder';
import { tokenBuilder } from '../../domain/builders/tokenBuilder';
import { Token } from '../../domain/token';
import { createStore, ReduxStore } from '../../../initReduxStore';
import { InMemoryAccountBaseQuery } from '../../adapters/in-memory/InMemoryAccountBaseQuery';
import { createAccountAPI } from '../../apis/accountAPI';

describe('Account login', () => {
  let store: ReduxStore;
  let accountBaseQuery: InMemoryAccountBaseQuery;
  let accountAPI: ReturnType<typeof createAccountAPI>;
  beforeEach(() => {
    accountBaseQuery = new InMemoryAccountBaseQuery();
    accountAPI = createAccountAPI(accountBaseQuery.handle());
    store = createStore({ accountAPI }, { }, {
      account: {
        data: accountBuilder().build(),
        isLoading: false,
      },
      token: {
        data: tokenBuilder().build(),
        isLoading: false,
      },
    });
  });

  it('should login account', async () => {
    const accessToken = 'ba925002-28f2-4dcc-a654-93428b62f7cb';

    accountBaseQuery.token = tokenBuilder().withAccessToken(accessToken)
      .build();

    await loginAccount();

    const token = tokenBuilder().withAccessToken(accessToken)
      .build();

    expectToken(token);
  });

  const expectToken = (tokenExpected: Token) => {
    expect(store.getState().token.data).toEqual(tokenExpected);
  };
  const loginAccount = async () => await store.dispatch(accountAPI.endpoints.loginAccount.initiate());
});
