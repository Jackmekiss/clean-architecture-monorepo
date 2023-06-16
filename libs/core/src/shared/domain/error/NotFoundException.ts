import { ExceptionBase } from './ExceptionBase';

export class NotFoundException extends ExceptionBase {
  constructor(message = 'Not found') {
    super(message);
  }

  readonly code = 'NOT_FOUND';
}
