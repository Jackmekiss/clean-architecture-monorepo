import { ExceptionBase } from './ExceptionBase';

export class InternalServerErrorException extends ExceptionBase {
  constructor(message = 'InternalServerError') {
    super(message);
  }

  readonly code = 'INTERNAL_SERVER_ERROR';
}
