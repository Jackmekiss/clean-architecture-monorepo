import { UuidGenerator } from '../../../../gateways/UuidGenerator';

export class DeterministicUUIDGenerator implements UuidGenerator {
  private _nextUUID = '';

  generate(): string {
    return this._nextUUID;
  }

  set nextUUID(value: string) {
    this._nextUUID = value;
  }
}
