import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { Message } from '../domain/message';
import { Media } from '../../../shared/domain/media';

export abstract class MessageBaseQuery {
  public handle = (): BaseQueryFn<
  {
    url: string
    method: 'GET' | 'POST'
    body: any
    params: any
  },
  unknown,
  unknown
> => async ({
    url, params, body,
  }) => {
    if (url === '/retrieve') {
      return {
        data: this.retrieve(params),
      };
    }

    if (url === '/add') {
      return {
        data: this.add(body),
      };
    }

    return {
      data: {},
    };
  };

  public abstract retrieve(params: RetrieveMessageFeedParams): Promise<Message[] | null>

  public abstract add(body: AddMessageParams): Promise<Message | null>
}

export interface RetrieveMessageFeedParams {
  limit?: number;
  offset?: number;
}

export interface AddMessageParams {
  content: string;
}
