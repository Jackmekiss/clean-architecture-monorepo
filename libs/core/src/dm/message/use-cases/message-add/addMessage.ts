import type { EntityState } from '@reduxjs/toolkit';
import { Api, BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder, QueryDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { coreModuleName } from '@reduxjs/toolkit/dist/query/core/module';
import { reactHooksModuleName } from '@reduxjs/toolkit/dist/query/react/module';
import { Message } from '../../domain/message';
import { addMessage, removeMessage } from '../../slice';
import { AddMessageParams, RetrieveMessageFeedParams } from '../../gateways/MessageBaseQuery';
import { UuidGenerator } from '../../../../shared/gateways/UuidGenerator';
import { RootState } from '../../../../initReduxStore';
import { ForbiddenException } from '../../../../shared/domain/error/ForbiddenException';

export const addMessageBuilder = (
  build: EndpointBuilder<BaseQueryFn, 'Message', 'messageAPI'>,
  api: Api<BaseQueryFn, {retrieveMessageFeed: QueryDefinition<RetrieveMessageFeedParams, BaseQueryFn, 'Message', EntityState<Message>, 'messageAPI'>;
}, 'messageAPI', 'Message', typeof coreModuleName | typeof reactHooksModuleName>,
) => ({
  addMessage: build.mutation<EntityState<Message>, AddMessageParams>({
    queryFn: async (
      data: AddMessageParams,
      { extra, getState, dispatch },
      extraOptions: any,
      baseQuery: any,
    ) => {
      const messageId = ((extra as any)?.uuidGenerator as UuidGenerator)?.generate();
      const account = (getState() as RootState).account.data!;

      if (!account) {
        throw new ForbiddenException('You are not allowed to execute this action');
      }

      const message: Message = {
        id: messageId,
        content: data.content,
        createdAt: new Date(),
        isProcessing: true,
        sender: {
          id: account.id,
          username: account.username,
          avatar: account.avatar,
        },
      };

      dispatch(addMessage(message));

      dispatch(
        api.util.updateQueryData('retrieveMessageFeed', { }, (draft) => {
          draft.ids.unshift(messageId);
          draft.entities[messageId] = message;
        }),
      );

      try {
        const result = await baseQuery({
          url: '/add',
          method: 'POST',
          body: data,
        });

        const responseData = await result.data as Message;

        dispatch(removeMessage(messageId));

        const serverMessage = {
          ...responseData, isProcessing: false,
        };

        dispatch(addMessage(serverMessage));

        dispatch(
          api.util.updateQueryData('retrieveMessageFeed', { }, (draft) => {
            const index = draft.ids.indexOf(messageId);
            if (index !== -1) {
              draft.ids[index] = serverMessage.id;
            }
            delete draft.entities[messageId];
            draft.entities[serverMessage.id] = serverMessage;
          }),
        );

        return result;
      } catch (err) {
        dispatch(
          api.util.updateQueryData('retrieveMessageFeed', { }, (draft) => {
            const index = draft.ids.indexOf(messageId);
            if (index !== -1) {
              draft.ids.splice(index, 1);
            }
            delete draft.entities[messageId];
          }),
        );
        dispatch(removeMessage(messageId));
      }
    },
  }),
});
