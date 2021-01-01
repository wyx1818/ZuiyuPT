import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { TrackerRequest } from '@tracker/announce/interfaces/tracker.interface';
import { REMOVE_IPV4_MAPPED_IPV6_RE, INNER_IP_RE } from '@tracker/common/constants';

@Injectable()
export class FilterAnnounceMiddlewares implements NestMiddleware {
  /**
   * TODO: Filter IPv6
   * Filter multiple requests for a single seed, filter out local IP and redundant IPv6
   */
  use(req: TrackerRequest, res: Response, next: NextFunction): any {
    const ip = req.ip.replace(REMOVE_IPV4_MAPPED_IPV6_RE, '');
    const isLocalIP = INNER_IP_RE.test(ip);
    if (isLocalIP) {
      res.send('false');
      return;
    }

    next();
  }
}
