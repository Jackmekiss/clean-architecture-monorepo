import { UuidGenerator } from '../../../../shared/gateways/UuidGenerator';
import { Message } from '../../domain/message';
import { AddMessageParams, MessageBaseQuery } from '../../gateways/MessageBaseQuery';

export class FakeMessageBaseQuery extends MessageBaseQuery {
  private _messages: Message[] = [
    {
      id: '12e6319f-a645-434e-bae4-0c49a2d11464',
      sender: {
        id: '2ed983c6-9092-4c9f-b5b1-6a8140578dfc',
        username: 'jackmekiss ',
        avatar: {
          height: 200, width: 200, extension: 'jpg', type: 'image', uri: 'https://i.pravatar.cc/150?img=12',
        },
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget elementum aliquam, odio nibh aliquet sapien, eget lacinia nisl nunc quis nunc. Sed euismod, nisl eget elementum aliquam, odio nibh aliquet sapien, eget lacinia nisl nunc quis nunc.',
      createdAt: new Date(2022, 2, 2, 2, 3),
    },
  ];

  constructor(private readonly uuidGenerator: UuidGenerator) {
    super();
  }

  async retrieve({ limit = 10, offset = 0 }: {limit?: number, offset?: number}): Promise<Message[] | null> {
    return this._messages.slice(offset, limit);
  }

  async add(body: AddMessageParams): Promise<Message | null> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const message: Message = {
      id: this.uuidGenerator.generate(),
      content: body.content,
      createdAt: new Date(),
      sender: {
        id: '2ed983c6-9092-4c9f-b5b1-6a8140578dfc',
        username: 'Jackmekiss',
        avatar: {
          height: 200, width: 200, extension: 'jpg', type: 'image', uri: 'https://i.pravatar.cc/120?img=12',
        },
      },
    };

    this._messages.unshift(message);

    return message;
  }
}
