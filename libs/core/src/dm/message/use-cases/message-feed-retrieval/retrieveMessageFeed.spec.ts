import { EntityState } from '@reduxjs/toolkit';
import { ReduxStore, createStore } from '../../../../initReduxStore';
import { InMemoryMessageBaseQuery } from '../../adapters/in-memory/InMemoryMessageBaseQuery';
import { createMessageAPI } from '../../apis/messageAPI';
import { messageBuilder } from '../../domain/builders/messageBuilder';
import { RetrieveMessageFeedParams } from '../../gateways/MessageBaseQuery';
import { Message } from '../../domain/message';

describe('Message feed retrieval', () => {
  let store: ReduxStore;
  let messageBaseQuery: InMemoryMessageBaseQuery;
  let messageAPI: ReturnType<typeof createMessageAPI>;

  beforeEach(() => {
    messageBaseQuery = new InMemoryMessageBaseQuery();
    messageAPI = createMessageAPI(messageBaseQuery.handle());
    store = createStore({ messageAPI });
  });

  it('should retrieve feed messages', async () => {
    const messageId = 'ba925002-28f2-4dcc-a654-93428b62f7cb';

    const message = messageBuilder().withId(messageId).build();

    messageBaseQuery.messages = [message];

    await retrieveMessageFeed({ });

    const entities = {
      ids: [messageId],
      entities: {
        [messageId]: message,
      },
    };

    expectMessageFeed({ }, entities);

    expectMessage(entities);
  });

  const expectMessageFeed = (query: RetrieveMessageFeedParams, messageExpected: EntityState<Message>) => {
    expect(messageAPI.endpoints.retrieveMessageFeed.select(query)(store.getState() as any).data).toEqual(messageExpected);
  };

  const expectMessage = (messageExpected: EntityState<Message>) => {
    expect(store.getState().messages).toEqual(messageExpected);
  };

  const retrieveMessageFeed = async (query: RetrieveMessageFeedParams) => await store.dispatch(messageAPI.endpoints.retrieveMessageFeed.initiate(query));
});
