import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { TrackerException } from '../exceptions/tracker.exception';
import { trackerFailRes } from '@tracker/utils';

@Catch(TrackerException)
export class TrackerExceptionFilter implements ExceptionFilter {
  catch(exception: TrackerException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.end(trackerFailRes(exception.message, exception.errorCode));
  }
}
