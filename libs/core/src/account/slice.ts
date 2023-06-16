import { createSlice } from '@reduxjs/toolkit';
import { Account } from './domain/account';
import { Token } from './domain/token';

interface AccountState {
  data: Account | null;
  isLoading: boolean;
}

const initialAccountState: AccountState = {
  data: null,
  isLoading: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState: initialAccountState,
  reducers: {
    toggleIsLoading: (state) => ({ ...state, isLoading: !state.isLoading }),
    addAccount: (state, action) => ({ ...state, isLoading: false, data: action.payload }),
    updateAccount: (state, action) => ({ ...state, isLoading: false, data: action.payload }),
    removeAccount: () => ({ isLoading: false, data: null }),
  },
});

interface TokenState {
  data: Token | null;
  isLoading: boolean;
}

const initialTokenState: TokenState = {
  data: null,
  isLoading: false,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState: initialTokenState,
  reducers: {
    toggleIsLoading: (state) => ({ ...state, isLoading: !state.isLoading }),
    addToken: (state, action) => ({ ...state, isLoading: false, data: action.payload }),
    removeToken: () => ({ isLoading: false, data: null }),
  },
});

export const accountReducer = accountSlice.reducer;

export const {
  toggleIsLoading: toggleIsLoadingToken,
  addToken,
  removeToken,
} = tokenSlice.actions;

export const {
  toggleIsLoading: toggleIsLoadingAccount,
  addAccount,
  removeAccount,
  updateAccount,
} = accountSlice.actions;
