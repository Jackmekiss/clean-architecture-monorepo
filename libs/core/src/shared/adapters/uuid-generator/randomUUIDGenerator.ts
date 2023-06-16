import { v4 as uuidv4 } from 'uuid';
import { UuidGenerator } from '../../gateways/UuidGenerator';

export class RandomUUIDGenerator implements UuidGenerator {
  generate(): string {
    return uuidv4() as string;
  }
}
