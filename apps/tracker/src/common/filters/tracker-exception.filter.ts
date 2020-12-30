import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { TrackerException } from '@tracker/common/exceptions';
import { trackerFailRes } from '@tracker/utils';

/**
 * catch tracker exception
 */
@Catch(TrackerException)
export class TrackerExceptionFilter implements ExceptionFilter {
  catch(exception: TrackerException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.end(trackerFailRes(exception.message, exception.errorCode));
  }
}
