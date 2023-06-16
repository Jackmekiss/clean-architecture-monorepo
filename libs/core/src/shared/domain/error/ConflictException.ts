import { ExceptionBase } from './ExceptionBase';

export class ConflictException extends ExceptionBase {
  constructor(message = 'Conflict') {
    super(message);
  }

  readonly code = 'CONFLICT';
}
