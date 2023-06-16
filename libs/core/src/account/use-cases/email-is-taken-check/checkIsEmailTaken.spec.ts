import { InMemoryAccountBaseQuery } from '../../adapters/in-memory/InMemoryAccountBaseQuery'; import { createAccountAPI } from '../../apis/accountAPI';
import { ReduxStore, createStore } from '../../../initReduxStore';
import {
  CheckIsEmailTakenParams, CheckIsEmailTakenResponse,
} from '../../gateways/AccountBaseQuery';

describe('Check is email taken', () => {
  let store: ReduxStore;
  let accountBaseQuery: InMemoryAccountBaseQuery;
  let accountAPI: ReturnType<typeof createAccountAPI>;

  beforeEach(() => {
    accountBaseQuery = new InMemoryAccountBaseQuery();
    accountAPI = createAccountAPI(accountBaseQuery.handle());
    store = createStore({ accountAPI }, { });
  });

  it('should check is the email is taken', async () => {
    accountBaseQuery.isEmailTaken = {
      isTaken: false,
    };

    await checkEmailIsTaken({
      email: 'martin@gmail.com',
    });

    expectQuery({ email: 'martin@gmail.com' }, { isTaken: false });
  });

  it('should throw an error if the email is not valid', async () => {
    const result = await checkEmailIsTaken({
      email: 'martin',
    });

    expect(result.isError).toEqual(true);
    expect((result.error as any).message).toEqual('Email is not valid');
  });

  const expectQuery = (query: CheckIsEmailTakenParams, expected: CheckIsEmailTakenResponse) => {
    expect(accountAPI.endpoints.checkIsEmailTaken.select(query)(store.getState() as any).data).toEqual(expected);
  };

  const checkEmailIsTaken = async (query: CheckIsEmailTakenParams) => await store.dispatch(accountAPI.endpoints.checkIsEmailTaken.initiate(query));
});
