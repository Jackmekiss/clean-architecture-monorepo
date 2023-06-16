import { tokenBuilder } from '../../domain/builders/tokenBuilder';
import { Token } from '../../domain/token';
import { createStore, ReduxStore } from '../../../initReduxStore';
import { RegisterAccountParams } from '../../gateways/AccountBaseQuery';
import { InMemoryAccountBaseQuery } from '../../adapters/in-memory/InMemoryAccountBaseQuery';
import { createAccountAPI } from '../../apis/accountAPI';

describe('Account register', () => {
  let store: ReduxStore;
  let accountBaseQuery: InMemoryAccountBaseQuery;
  let accountAPI: ReturnType<typeof createAccountAPI>;

  beforeEach(() => {
    accountBaseQuery = new InMemoryAccountBaseQuery();
    accountAPI = createAccountAPI(accountBaseQuery.handle());
    store = createStore({ accountAPI }, { });
  });

  it('should register account', async () => {
    const accessToken = 'ba925002-28f2-4dcc-a654-93428b62f7cb';

    accountBaseQuery.token = tokenBuilder().withAccessToken(accessToken)
      .build();

    await registerAccount({ googleToken: '' });

    const token = tokenBuilder().withAccessToken(accessToken)
      .build();

    expectToken(token);
  });

  const expectToken = (tokenExpected: Token) => {
    expect(store.getState().token.data).toEqual(tokenExpected);
  };

  const registerAccount = async (command: RegisterAccountParams) => await store.dispatch(accountAPI.endpoints.registerAccount.initiate(command));
});
