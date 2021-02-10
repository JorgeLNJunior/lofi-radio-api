import { HttpError } from './http.error';

export class InternalError extends HttpError {
  constructor(errors: string[] | undefined, message?: string) {
    super(500, message || 'internal error', errors);
  }
}
