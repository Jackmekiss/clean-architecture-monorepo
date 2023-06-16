import { ExceptionBase } from './ExceptionBase';

export class ForbiddenException extends ExceptionBase {
  constructor(message = 'Forbidden') {
    super(message);
  }

  readonly code = 'FORBIDDEN';
}
