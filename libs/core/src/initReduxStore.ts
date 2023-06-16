import {
  configureStore, combineReducers, Middleware, ThunkDispatch, Action,
} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { createCustomSerializableMiddleware } from './middlewares/customSerializableMiddleware';
import { accountSlice, tokenSlice } from './account/slice';
import { UuidGenerator } from './shared/gateways/UuidGenerator';
import { createAccountAPI } from './account/apis/accountAPI';
import { UploadMediaService } from './shared/gateways/UploadMediaService';
import { createMessageAPI } from './dm/message/apis/messageAPI';
import { messageSlice } from './dm/message/slice';

export interface Apis {
  accountAPI: ReturnType<typeof createAccountAPI>;
  messageAPI: ReturnType<typeof createMessageAPI>;
}

export interface Dependencies {
  uuidGenerator: UuidGenerator;
  uploadMediaService: UploadMediaService;
}

const createReducers = (apis: Partial<Apis>) => combineReducers({
  ...apis.accountAPI && { [apis.accountAPI.reducerPath]: apis.accountAPI.reducer },
  ...apis.messageAPI && { [apis.messageAPI.reducerPath]: apis.messageAPI.reducer },
  [accountSlice.name]: accountSlice.reducer,
  [tokenSlice.name]: tokenSlice.reducer,
  [messageSlice.name]: messageSlice.reducer,
});

export interface PersistConfig {
  key: string;
  storage: any
}

export const createStore = (
  apis: Partial<Apis> = {},
  dependencies: Partial<Dependencies> = {},
  preloadedState?: Partial<RootState>,
  persistConfig?: PersistConfig,
) => {
  let rootReducer = createReducers(apis);

  if (persistConfig) {
    rootReducer = persistReducer<any>(
      persistConfig,
      createReducers(apis),
    );
  } else {
    rootReducer = createReducers(apis);
  }

  const middleware = Object.values(apis).flatMap((api) => api.middleware) as Middleware[];

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: dependencies,
      },
    }).concat(createCustomSerializableMiddleware()).concat(middleware),
    preloadedState: preloadedState as any,
  });

  return store;
};

export type RootState = ReturnType<ReturnType<typeof createReducers>>

export type ReduxStore = ReturnType<typeof createStore> & {
  dispatch: ThunkDispatch<RootState, Dependencies, Action>;
};
