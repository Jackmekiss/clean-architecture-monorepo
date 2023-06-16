import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type { EntityState } from '@reduxjs/toolkit';
import { compact, omit, values } from 'lodash';
import { Message, messagesAdapter } from '../../domain/message';
import { addManyMessage } from '../../slice';
import { RetrieveMessageFeedParams } from '../../gateways/MessageBaseQuery';

export const retrieveMessageFeedBuilder = (build: EndpointBuilder<BaseQueryFn, 'Message', 'messageAPI'>) => ({
  retrieveMessageFeed: build.query<EntityState<Message>, RetrieveMessageFeedParams>({
    query: (params) => ({
      url: '/retrieve',
      method: 'GET',
      params,
    }),
    providesTags: ['Message'],
    transformResponse: async (response: Promise<Message[]>) => {
      const data = await response;

      if (!data) return messagesAdapter.getInitialState();

      return messagesAdapter.addMany(messagesAdapter.getInitialState(), data);
    },
    serializeQueryArgs: ({ endpointName, queryArgs }) => JSON.stringify({ endpointName, queryArgs: omit(queryArgs, ['limit', 'offset']) }),
    merge: (currentCache, newItems, { arg }) => {
      const offset = arg?.offset ?? 0;

      currentCache.ids.splice(offset, newItems.ids.length, ...newItems.ids);
      currentCache.entities = { ...currentCache.entities, ...newItems.entities };
    },
    forceRefetch({ currentArg, previousArg }) {
      return currentArg !== previousArg;
    },
    async onQueryStarted(_, { dispatch, queryFulfilled }) {
      const { data } = await queryFulfilled;
      const messages = compact(values(data.entities));
      dispatch(addManyMessage(messages));
    },
  }),
});
