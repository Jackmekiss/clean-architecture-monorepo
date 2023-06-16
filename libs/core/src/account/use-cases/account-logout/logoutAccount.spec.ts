import { accountBuilder } from '../../domain/builders/accountBuilder';
import { tokenBuilder } from '../../domain/builders/tokenBuilder';
import { createStore, ReduxStore } from '../../../initReduxStore';
import { createAccountAPI } from '../../apis/accountAPI';
import { InMemoryAccountBaseQuery } from '../../adapters/in-memory/InMemoryAccountBaseQuery';

describe('Account logout', () => {
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

  it('should logout account', async () => {
    await logoutAccount();

    expectState();
  });

  const expectState = () => {
    expect(store.getState().token.data).toEqual(null);
    expect(store.getState().account.data).toEqual(null);
  };

  const logoutAccount = async () => await store.dispatch(accountAPI.endpoints.logoutAccount.initiate());
});
