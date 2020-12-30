import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as requestIp from 'request-ip';

import { TrackerRequest } from '@tracker/announce/interfaces';
import { BLACK_PORTS, IPV4_RE, IPV6_RE, REMOVE_IPV4_MAPPED_IPV6_RE } from '@tracker/common/constants';
import { TrackerException } from '@tracker/common/exceptions';
import { binaryToHex } from '@tracker/utils';
import { TrackerErrors } from '@tracker/common/enums';

@Injectable()
export class CheckTrackerInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<TrackerRequest>();

    await this.setInfoHash(request);
    await this.setPeerId(request);
    await this.setPort(request);
    await this.setAddr(request);

    return next.handle();
  }

  /**
   * get client full ip
   * eg: 10.10.10.10:2233, [::1]:24888
   * @param req
   */
  async setAddr(req: TrackerRequest) {
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
      throw new TrackerException(TrackerErrors.INVALID_IP);
    }

    req.addr = `${isIpv6 ? '[' + ip + ']' : ip}:${req.query.port}`;
  }

  /**
   * decode info_hash and convert it to Hex
   */
  async setInfoHash({ query }: TrackerRequest) {
    const info_hash = unescape(query.info_hash);

    if (typeof info_hash !== 'string' || info_hash.length !== 20) {
      throw new TrackerException(TrackerErrors.INVALID_INFO_HASH);
    }

    query.info_hash = binaryToHex(info_hash);
  }

  /**
   * decode peer_id and convert it to Hex
   */
  async setPeerId({ query }: TrackerRequest) {
    const peer_id = unescape(query.peer_id);
    if (typeof peer_id !== 'string' || peer_id.length !== 20) {
      throw new TrackerException(TrackerErrors.INVALID_PEER_ID);
    }
    query.peer_id = binaryToHex(peer_id);
  }

  /**
   * check port and convert it to number
   */
  async setPort({ query }: TrackerRequest) {
    query.port = Number(query.port);
    if (!query.port || query.port > 65535 || query.port < 1) {
      throw new TrackerException(TrackerErrors.INVALID_PORT, { port: query.port });
    } else if (BLACK_PORTS.includes(query.port)) {
      throw new TrackerException(TrackerErrors.BLACKLIST_PORT, { port: query.port });
    }
  }
}
