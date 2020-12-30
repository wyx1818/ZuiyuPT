import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { TrackerRequest } from '@tracker/announce/interfaces/tracker.interface';

@Injectable()
export class CheckAnnounceMiddlewares implements NestMiddleware {
  use(req: TrackerRequest, res: Response, next: NextFunction): any {
    next();
  }
}
