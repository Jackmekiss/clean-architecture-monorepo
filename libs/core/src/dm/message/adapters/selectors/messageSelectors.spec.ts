import { ReduxStore, createStore } from '../../../../initReduxStore';
import { messageBuilder } from '../../domain/builders/messageBuilder';
import { selectMessageById } from './messageSelectors';

describe('Message selectors', () => {
  let store: ReduxStore;

  const messageId = 'ba925002-28f2-4dcc-a654-93428b62f7cb';
  const message = messageBuilder().withId(messageId).build();

  beforeEach(() => {
    store = createStore({}, {}, {
      messages: {
        ids: [messageId],
        entities: {
          [messageId]: message,
        },
      },
    });
  });

  it('should select message by id', () => {
    expect(selectMessageById(messageId)(store.getState())).toEqual({
      message: {
        ...message,
        isMe: false,
      },
    });
  });
});
