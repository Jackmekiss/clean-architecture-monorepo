import { EntityState } from '@reduxjs/toolkit';
import MockDate from 'mockdate';
import { ReduxStore, createStore } from '../../../../initReduxStore';
import { DeterministicUUIDGenerator } from '../../../../shared/adapters/uuid-generator/deterministicUUIDGenerator';
import { InMemoryMessageBaseQuery } from '../../adapters/in-memory/InMemoryMessageBaseQuery';
import { createMessageAPI } from '../../apis/messageAPI';
import { AddMessageParams, RetrieveMessageFeedParams } from '../../gateways/MessageBaseQuery';
import { messageBuilder } from '../../domain/builders/messageBuilder';
import { accountBuilder } from '../../../../account/domain/builders/accountBuilder';
import { Message } from '../../domain/message';
import { mediaBuilder } from '../../../../shared/domain/builder/mediaBuilder';
import { ForbiddenException } from '../../../../shared/domain/error/ForbiddenException';

describe('Message add', () => {
  let store: ReduxStore;
  let messageBaseQuery: InMemoryMessageBaseQuery;
  let messageAPI: ReturnType<typeof createMessageAPI>;
  let uuidGenerator: DeterministicUUIDGenerator;

  beforeEach(() => {
    messageBaseQuery = new InMemoryMessageBaseQuery();
    messageAPI = createMessageAPI(messageBaseQuery.handle());
    uuidGenerator = new DeterministicUUIDGenerator();
    store = createStore({ messageAPI }, { uuidGenerator }, {
      account: {
        isLoading: false,
        data: accountBuilder().withId('ba925002-28f2-4dcc-a654-93428b62f7cb').withUsername('John Doe')
          .build(),
      },
    });
  });

  it('should add message', async () => {
    const messageId = 'fd816978-219f-44d4-8234-8789588e13fb';

    const content = 'new text';

    const nextMessage = messageBuilder()
      .withId(messageId)
      .withContent(content)
      .withSender({
        id: 'ba925002-28f2-4dcc-a654-93428b62f7cb',
        username: 'John Doe',
        avatar: mediaBuilder().build(),
      })
      .createdAt(new Date(2022, 2, 2, 2, 2))
      .isProcessing(false)
      .build();

    messageBaseQuery.nextMessage = nextMessage;
    uuidGenerator.nextUUID = messageId;

    MockDate.set(new Date(2022, 2, 2, 2, 2));

    await store.dispatch(messageAPI.endpoints.retrieveMessageFeed.initiate({ }));

    await addMessage({ content });

    const entities = {
      ids: [messageId],
      entities: {
        [messageId]: messageBuilder()
          .withId(messageId)
          .withContent(content)
          .withSender({
            id: 'ba925002-28f2-4dcc-a654-93428b62f7cb',
            username: 'John Doe',
            avatar: mediaBuilder().build(),
          })
          .createdAt(new Date(2022, 2, 2, 2, 2))
          .isProcessing(false)
          .build(),
      },
    };

    expectMessageFeed({ }, entities);

    expectMessage(entities);
  });

  it('should raise an error when not connected', async () => {
    const storeWithoutAccountConnected = createStore({ messageAPI }, { uuidGenerator });
    const content = 'new text';

    const result = await storeWithoutAccountConnected.dispatch(messageAPI.endpoints.addMessage.initiate({ content }));

    expect(((result as any).error as ForbiddenException).message).toEqual('You are not allowed to execute this action');
  });

  describe('Optimistic update', () => {
    it('should optimistic processing message', (done) => {
      const messageId = 'ba925002-28f2-4dcc-a654-93428b62f7cb';
      const content = 'new text';

      uuidGenerator.nextUUID = messageId;

      const unsuscribe = store.subscribe(() => {
        if (store.getState().messages.entities[messageId]?.isProcessing) {
          unsuscribe();
          done();
        }
      });

      addMessage({ content });
    });

    it('should redo processing message', async () => {
      const messageId = 'ba925002-28f2-4dcc-a654-93428b62f7cb';
      const content = 'new text';

      messageBaseQuery.error = new Error('error');

      uuidGenerator.nextUUID = messageId;

      await store.dispatch(messageAPI.endpoints.retrieveMessageFeed.initiate({ }));

      await addMessage({ content });

      const entities = {
        ids: [],
        entities: {},
      };

      expectMessageFeed({ }, entities);
    });
  });

  const expectMessageFeed = (query: RetrieveMessageFeedParams, messageExpected: EntityState<Message>) => {
    expect(messageAPI.endpoints.retrieveMessageFeed.select(query)(store.getState() as any).data).toEqual(messageExpected);
  };

  const expectMessage = (messageExpected: EntityState<Message>) => {
    expect(store.getState().messages).toEqual(messageExpected);
  };

  const addMessage = async (command: AddMessageParams) => await store.dispatch(messageAPI.endpoints.addMessage.initiate(command));
});
