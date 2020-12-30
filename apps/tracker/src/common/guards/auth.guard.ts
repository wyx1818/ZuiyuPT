import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TrackerRequest } from '@tracker/announce/interfaces';
import { TrackerException } from '@tracker/common/exceptions';
import { TrackerErrors } from '@tracker/common/enums';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<TrackerRequest>();

    return this.validateRequest(request);
  }

  async validateRequest(request: TrackerRequest) {
    const passkey = request.query.passkey;

    // TODO: 动态认证
    if (typeof passkey === 'string' && passkey.length === 32) {
      request.lang = 'zh-CN';
      return true;
    }

    throw new TrackerException(TrackerErrors.INVALID_PASSKEY);
  }
}
