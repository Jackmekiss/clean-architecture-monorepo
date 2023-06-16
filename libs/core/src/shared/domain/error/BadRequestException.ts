import { ExceptionBase } from './ExceptionBase';

export class BadRequestException extends ExceptionBase {
  constructor(message = 'Bad Request') {
    super(message);
  }

  readonly code = 'BAD_REQUEST';
}
