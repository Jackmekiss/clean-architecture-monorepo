import { Message } from '../../domain/message';
import { MessageBaseQuery } from '../../gateways/MessageBaseQuery';

export class InMemoryMessageBaseQuery extends MessageBaseQuery {
  private _messages: Message[] = [];

  private _error: Error | null = null;

  private _nextMessage: Message | null = null;

  constructor() {
    super();
  }

  async retrieve({ limit = 20, offset = 0 }: {limit?: number, offset?: number}): Promise<Message[] | null> {
    return this._messages.slice(offset, offset! + limit!);
  }

  async add(): Promise<Message | null> {
    if (this._error) {
      throw this._error;
    }

    const message: Message = this._nextMessage!;

    this._messages.unshift(message);

    return message;
  }

  set error(value: Error) {
    this._error = value;
  }

  set messages(value: Message[]) {
    this._messages = value;
  }

  set nextMessage(value: Message) {
    this._nextMessage = value;
  }
}
