import { accountBuilder } from '../../domain/builders/accountBuilder';
import { tokenBuilder } from '../../domain/builders/tokenBuilder';
import { selectAccount, selectIsConnected, selectToken } from './accountSelectors';
import { createStore, ReduxStore } from '../../../initReduxStore';

describe('Account selectors', () => {
  let store: ReduxStore;

  beforeEach(() => {
    store = createStore({ }, { }, {
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

  it('should adapt the view models to is connected', () => {
    expect(selectIsConnected(store.getState())).toEqual(true);
  });

  it('should adapt the view models to account', () => {
    expect(selectAccount(store.getState())).toEqual({
      isLoading: false,
      data: accountBuilder().build(),
    });
  });

  it('should adapt the view models to token', () => {
    expect(selectToken(store.getState())).toEqual({
      isLoading: false,
      data: tokenBuilder().build(),
    });
  });
});
