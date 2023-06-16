import { Account } from '../../domain/account';
import { Token } from '../../domain/token';
import { RootState } from '../../../initReduxStore';

export const selectIsConnected = (state: RootState): boolean => {
  const isConnected = !!state.account.data;

  return isConnected;
};

export const selectAccount = (state: RootState): {isLoading: boolean, data: Account | null} => ({
  isLoading: state.account.isLoading,
  data: state.account.data,
});

export const selectToken = (state: RootState): {isLoading: boolean, data: Token | null} => state.token;
