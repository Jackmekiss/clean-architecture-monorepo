import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { retrieveMessageFeedBuilder } from '../use-cases/message-feed-retrieval/retrieveMessageFeed';
import { addMessageBuilder } from '../use-cases/message-add/addMessage';

export const createMessageAPI = (baseQuery: BaseQueryFn) => {
  const messageAPI = createApi({
    baseQuery,
    reducerPath: 'messageAPI',
    tagTypes: ['Message'],
    endpoints: (builder) => ({
      ...retrieveMessageFeedBuilder(builder),
    }),
  });

  const injectedApi = messageAPI.injectEndpoints({
    endpoints: (builder) => ({
      ...addMessageBuilder(builder, messageAPI),
    }),
  });

  return injectedApi;
};
