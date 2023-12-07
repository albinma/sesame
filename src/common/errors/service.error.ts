import { ApplicationError } from '@/common/errors/application.error';

export class ServiceError extends ApplicationError {
  public static CODE = 'err_service';

  constructor(reason: string) {
    super(ServiceError.CODE, 422, reason);
  }
}
