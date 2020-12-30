import { ExecutionContext, Injectable } from '@nestjs/common';
import { I18nResolver, I18nResolverOptions } from 'nestjs-i18n';
import { TrackerRequest } from '@tracker/announce/interfaces';

@Injectable()
export class I18nQueryResolver implements I18nResolver {
  constructor(@I18nResolverOptions() private keys: string[]) {}

  resolve(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<TrackerRequest>();
    return request.lang;
  }
}
