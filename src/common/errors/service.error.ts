import { HttpError } from '@/common/errors/http.error';

export class ServiceError extends HttpError {
  public static CODE = 'err_service';

  constructor(reason: string) {
    super(ServiceError.CODE, 422, reason);
  }
}
