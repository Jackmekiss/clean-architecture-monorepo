import { ReduxStore, createStore } from '@core/initReduxStore';
import { DeterministicUUIDGenerator } from '../../../shared/adapters/uuid-generator/deterministicUUIDGenerator';
import { DeterministicUploadMediaService } from '../../../shared/adapters/upload-media-service/DeterministicUploadMediaService';
import { InMemoryAccountBaseQuery } from '../../adapters/in-memory/InMemoryAccountBaseQuery';
import { createAccountAPI } from '../../apis/accountAPI';
import { accountBuilder } from '../../domain/builders/accountBuilder';
import { UpdateAccountParams } from '../../gateways/AccountBaseQuery';
import { Account } from '../../domain/account';

describe('Account update', () => {
  let uuidGenerator: DeterministicUUIDGenerator;
  let uploadMediaService: DeterministicUploadMediaService;
  let store: ReduxStore;
  let accountBaseQuery: InMemoryAccountBaseQuery;
  let accountAPI: ReturnType<typeof createAccountAPI>;

  const accountId = 'ba925002-28f2-4dcc-a654-93428b62f7cb';

  beforeEach(() => {
    uuidGenerator = new DeterministicUUIDGenerator();
    uploadMediaService = new DeterministicUploadMediaService();
    accountBaseQuery = new InMemoryAccountBaseQuery();
    accountAPI = createAccountAPI(accountBaseQuery.handle());
    store = createStore({ accountAPI }, { uuidGenerator, uploadMediaService }, {
      account: {
        isLoading: false,
        data: accountBuilder().withId(accountId).withUsername('John Doe')
          .build(),
      },
    });
  });

  it('should update account', async () => {
    accountBaseQuery.account = accountBuilder().withId(accountId).withUsername('John Doe').build();

    await updateAccount({ username: 'jackmekiss' });

    const account = accountBuilder().withId(accountId).withUsername('jackmekiss').build();

    expectAccount(account);
  });

  const expectAccount = (accountExpected: Account) => {
    expect(store.getState().account.data).toEqual(accountExpected);
  };

  const updateAccount = async (command: UpdateAccountParams) => {
    await store.dispatch(accountAPI.endpoints.updateAccount.initiate(command));
  };
});
