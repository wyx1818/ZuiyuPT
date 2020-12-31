import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as requestIp from 'request-ip';

import { TrackerRequest } from '@tracker/announce/interfaces';
import { BLACK_PORTS, IPV4_RE, IPV6_RE, REMOVE_IPV4_MAPPED_IPV6_RE } from '@tracker/common/constants';
import { TrackerException } from '@tracker/common/exceptions';
import { binaryToHex } from '@tracker/utils';
import { TrackerErrors } from '@tracker/common/enums';

@Injectable()
export class CheckFieldInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<TrackerRequest>();

    this.checkAnnounceFields(request);
    this.setAddr(request);

    return next.handle();
  }

  checkAnnounceFields({ query }: TrackerRequest) {
    console.log(query);
    /**
     * Check tracker required fields
     */
    for (const field of ['info_hash', 'peer_id', 'port', 'uploaded', 'downloaded', 'left']) {
      if (!query.hasOwnProperty(field)) {
        throw new TrackerException(TrackerErrors.MISS_FIELD, [field]);
      }
    }

    for (const field of ['info_hash', 'peer_id']) {
      const value: string = unescape(query[field]);
      if (typeof value !== 'string' || value.length !== 20) {
        throw new TrackerException(TrackerErrors.INVALID_FIELD_LENGTH, [field]);
      }

      query[field] = binaryToHex(value);
    }

    for (const field of ['uploaded', 'downloaded', 'left']) {
      console.log(query[field]);
      const value = Number(query[field]);
      if (Number.isNaN(value) || value < 0) {
        throw new TrackerException(TrackerErrors.INVALID_FIELD_NUMBER, [field]);
      }

      query[field] = value;
    }

    /**
     * Check tracker optional fields
     */
    query.event = query.event || '';
    query.no_peer_id = Number(query.no_peer_id) || 1;
    query.compact = Number(query.compact) || 0;
    query.corrupt = Number(query.corrupt) || 0;
    query.numwant = Number(query.numwant) || 50;
    query.key = query.key || '';

    for (const field of ['numwant', 'corrupt', 'no_peer_id', 'compact']) {
      if (query[field] < 0) {
        throw new TrackerException(TrackerErrors.INVALID_FIELD_NUMBER, [field]);
      }
    }

    if (['started', 'stopped', 'completed', 'paused', ''].includes(query.event.toLowerCase())) {
      throw new TrackerException(TrackerErrors.INVALID_EVENT, [query.event]);
    }

    /**
     * Check Port is Valid and Allowed
     * Normally , the port must in 1 - 65535 , that is ( $port > 0 && $port < 0xffff )
     * However, in some case , When `&event=stopped` the port may set to 0.
     */
    query.port = Number(query.port);

    if (query.port === 0 && query.event !== 'stopped') {
      throw new TrackerException(TrackerErrors.INVALID_PORT, [query.port]);
    }
    if (!query.port || query.port > 65535 || query.port < 1 || BLACK_PORTS.includes(query.port)) {
      throw new TrackerException(TrackerErrors.INVALID_PORT, [query.port]);
    }
  }

  /**
   * get client full ip
   * e.g.: 10.10.10.10:2233, [::1]:24888
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
      throw new TrackerException(TrackerErrors.INVALID_IP);
    }

    req.addr = `${isIpv6 ? '[' + ip + ']' : ip}:${req.query.port}`;
  }
}
