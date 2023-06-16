import { InMemoryAccountBaseQuery } from '../../adapters/in-memory/InMemoryAccountBaseQuery';
import { createAccountAPI } from '../../apis/accountAPI';
import { ReduxStore, createStore } from '../../../initReduxStore';
import { CheckIsUsernameTakenParams, CheckIsUsernameTakenResponse } from '../../gateways/AccountBaseQuery';

describe('Check is username taken', () => {
  let store: ReduxStore;
  let accountBaseQuery: InMemoryAccountBaseQuery;
  let accountAPI: ReturnType<typeof createAccountAPI>;

  beforeEach(() => {
    accountBaseQuery = new InMemoryAccountBaseQuery();
    accountAPI = createAccountAPI(accountBaseQuery.handle());
    store = createStore({ accountAPI }, { });
  });

  it('should check is the email is taken', async () => {
    accountBaseQuery.isUsernameTaken = {
      isTaken: false,
    };

    await checkUsernameIsTaken({
      username: 'jackmekiss',
    });

    expectQuery({ username: 'jackmekiss' }, { isTaken: false });
  });

  it('should raise an error if the username is not valid', async () => {
    let data = await checkUsernameIsTaken({
      username: 'js',
    });

    expect(data.isError).toEqual(true);
    expect((data.error as any).message).toEqual('Username is too short');

    data = await checkUsernameIsTaken({
      username: 'jackmekissfeafafafaefeafaefaefeafeafeaefe',
    });

    expect(data.isError).toEqual(true);
    expect((data.error as any).message).toEqual('Username is too long');

    data = await checkUsernameIsTaken({
      username: 'jackmek iss',
    });

    expect(data.isError).toEqual(true);
    expect((data.error as any).message).toEqual('Username cannot contain spaces');

    data = await checkUsernameIsTaken({
      username: 'jackmekiss@',
    });

    expect(data.isError).toEqual(true);
    expect((data.error as any).message).toEqual('Username can only contain letters and numbers');
  });

  const expectQuery = (query: CheckIsUsernameTakenParams, expected: CheckIsUsernameTakenResponse) => {
    expect(accountAPI.endpoints.checkIsUsernameTaken.select(query)(store.getState() as any).data).toEqual(expected);
  };

  const checkUsernameIsTaken = async (query: CheckIsUsernameTakenParams) => await store.dispatch(accountAPI.endpoints.checkIsUsernameTaken.initiate(query));
});
