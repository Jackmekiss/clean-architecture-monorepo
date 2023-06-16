import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createAccountAPI } from '@core/account/apis/accountAPI';
import { RandomUUIDGenerator } from '@core/shared/adapters/uuid-generator/randomUUIDGenerator';
import { InMemoryAccountBaseQuery } from '@core/account/adapters/in-memory/InMemoryAccountBaseQuery';
import { FakeAccountBaseQuery } from '@core/account/adapters/fake/FakeAccountBaseQuery';
import { createStore } from '@core/initReduxStore';
import { AccountBaseQuery } from '@core/account/gateways/AccountBaseQuery';
import { MessageBaseQuery } from '@core/dm/message/gateways/MessageBaseQuery';
import { createMessageAPI } from '@core/dm/message/apis/messageAPI';
import { InMemoryMessageBaseQuery } from '@core/dm/message/adapters/in-memory/InMemoryMessageBaseQuery';
import { FakeMessageBaseQuery } from '@core/dm/message/adapters/fake/FakeMessageBaseQuery';
import Chat from './screens/chat';

let accountBaseQuery: AccountBaseQuery;
let messageBaseQuery: MessageBaseQuery;

let accountAPI: ReturnType<typeof createAccountAPI>;
let messageAPI: ReturnType<typeof createMessageAPI>;

let uuidGenerator: RandomUUIDGenerator;

// eslint-disable-next-line prefer-const
uuidGenerator = new RandomUUIDGenerator();

if (import.meta.env.VITE_APP_MODE === 'inmemory') {
  accountBaseQuery = new InMemoryAccountBaseQuery();
  accountAPI = createAccountAPI(accountBaseQuery.handle());

  messageBaseQuery = new InMemoryMessageBaseQuery();
  messageAPI = createMessageAPI(messageBaseQuery.handle());
} else if (import.meta.env.VITE_APP_MODE === 'fake') {
  accountBaseQuery = new FakeAccountBaseQuery();
  accountAPI = createAccountAPI(accountBaseQuery.handle());

  messageBaseQuery = new FakeMessageBaseQuery(uuidGenerator);
  messageAPI = createMessageAPI(messageBaseQuery.handle());
} else {
  accountBaseQuery = new FakeAccountBaseQuery();
  accountAPI = createAccountAPI(accountBaseQuery.handle());

  messageBaseQuery = new FakeMessageBaseQuery(uuidGenerator);
  messageAPI = createMessageAPI(messageBaseQuery.handle());
}

const persistConfig = {
  key: 'root',
  whitelist: [],
  storage,
};

export const {
  useLazyCheckIsUsernameTakenQuery,
  useLazyCheckRefferalCodeQuery,
  useLazyCheckPhoneVerificationCodeQuery,
  useLazyCheckIsEmailTakenQuery,
  useRegisterAccountMutation,
  useLazyRetrieveAccountQuery,
  useLogoutAccountMutation,
} = accountAPI;

export const {
  useRetrieveMessageFeedQuery,
  useAddMessageMutation,
} = messageAPI;

const store = createStore(
  {
    accountAPI,
    messageAPI,
  },
  {
    uuidGenerator,
  },
  {},
  persistConfig,
);

export type AppDispatch = any;

function App() {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Chat />}
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
