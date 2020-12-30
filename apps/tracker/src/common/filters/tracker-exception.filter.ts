import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { TrackerException } from '@tracker/common/exceptions';
import { trackerFailRes } from '@tracker/utils';
import { I18nService } from 'nestjs-i18n';
import { TrackerRequest } from '@tracker/announce/interfaces';

/**
 * catch tracker exception
 */
@Catch(TrackerException)
export class TrackerExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: TrackerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<TrackerRequest>();
    const response = ctx.getResponse<Response>();

    const errStr = await this.i18n.translate(`tracker.${exception.errStr}`, {
      lang: request.lang,
      args: exception.transArgs,
    });
    const resStr = exception.errCode + ', ' + errStr;

    response.end(trackerFailRes(resStr));
  }
}
