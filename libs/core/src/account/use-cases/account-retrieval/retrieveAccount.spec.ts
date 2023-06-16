import { accountBuilder } from '../../domain/builders/accountBuilder';
import { Account } from '../../domain/account';
import { ReduxStore, createStore } from '../../../initReduxStore';
import { InMemoryAccountBaseQuery } from '../../adapters/in-memory/InMemoryAccountBaseQuery';
import { createAccountAPI } from '../../apis/accountAPI';

describe('Account retrieval', () => {
  let store: ReduxStore;
  let accountBaseQuery: InMemoryAccountBaseQuery;
  let accountAPI: ReturnType<typeof createAccountAPI>;

  beforeEach(() => {
    accountBaseQuery = new InMemoryAccountBaseQuery();
    accountAPI = createAccountAPI(accountBaseQuery.handle());
    store = createStore({ accountAPI }, { });
  });
  it('should retrieve account', async () => {
    const accountId = 'ba925002-28f2-4dcc-a654-93428b62f7cb';

    accountBaseQuery.account = accountBuilder().withId(accountId)
      .build();

    await retrieveAccount();

    const account = accountBuilder().withId(accountId)
      .build();

    expectAccount(account);
  });

  const expectAccount = (accountExpected: Account) => {
    expect(store.getState().account.data).toEqual(accountExpected);
  };

  const retrieveAccount = async () => await store.dispatch(accountAPI.endpoints.retrieveAccount.initiate());
});
