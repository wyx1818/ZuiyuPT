import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import * as requestIp from 'request-ip';

import { TrackerRequest } from '@tracker/announce/interfaces/tracker.interface';
import { BLACK_PORTS, IPV4_RE, IPV6_RE, REMOVE_IPV4_MAPPED_IPV6_RE } from '../constants';
import { TrackerException } from '@tracker/common/exceptions/tracker.exception';
import { binaryToHex, trackerFailRes } from '@tracker/utils';

@Injectable()
export class CheckAnnounceMiddlewares implements NestMiddleware {
  use(req: TrackerRequest, res: Response, next: NextFunction): any {
    try {
      this.setInfoHash(req);
      this.setPeerId(req);
      this.setPort(req);
      this.setAddr(req);

      next();
    } catch (e) {
      if (e instanceof TrackerException) {
        res.send(trackerFailRes(e.message, e.errorCode));
      } else {
        throw new BadRequestException();
      }
    }
  }

  /**
   * get client full ip
   * eg: 10.10.10.10:2233, [::1]:24888
   * @param req
   */
  setAddr(req: TrackerRequest) {
    // TODO: 通过配置控制是否信任代理
    const trustProxy = true;

    // get real-ip and force to ipv4
    const ip = trustProxy
      ? requestIp.getClientIp(req).replace(REMOVE_IPV4_MAPPED_IPV6_RE, '')
      : req.ip.replace(REMOVE_IPV4_MAPPED_IPV6_RE, '');

    // check ip format
    const isIpv4 = IPV4_RE.test(ip);
    const isIpv6 = IPV6_RE.test(ip);

    if (!isIpv4 && !isIpv6) {
      throw new TrackerException('invalid ip', 100);
    }

    req.addr = `${isIpv6 ? '[' + ip + ']' : ip}:${req.query.port}`;
  }

  /**
   * decode info_hash and convert it to Hex
   */
  setInfoHash({ query }: TrackerRequest) {
    const info_hash = unescape(query.info_hash);
    if (typeof info_hash !== 'string' || info_hash.length !== 20) {
      throw new TrackerException('invalid info_hash', 101);
    }

    query.info_hash = binaryToHex(info_hash);
  }

  /**
   * decode peer_id and convert it to Hex
   */
  setPeerId({ query }: TrackerRequest) {
    const peer_id = unescape(query.peer_id);
    if (typeof peer_id !== 'string' || peer_id.length !== 20) {
      throw new TrackerException('invalid peer_id', 102);
    }
    query.peer_id = binaryToHex(peer_id);
  }

  /**
   * check port and convert it to number
   */
  setPort({ query }: TrackerRequest) {
    query.port = Number(query.port);
    if (!query.port || query.port > 65535 || query.port < 1 || BLACK_PORTS.includes(query.port))
      throw new TrackerException('invalid port', 103);
  }
}
