import { Request } from 'express';

type OmitRequest = Omit<Request, 'query'>;
/**
 * BEP3
 * @see http://www.bittorrent.org/beps/bep_0003.html#trackers
 */
type TrackerQuery = {
  // **Need** Fields
  info_hash: string;
  peer_id: string;
  port: string | number;
  uploaded: string | number;
  downloaded: string | number;
  left: string;
  event: string;

  // **Option** Fields
  numwant?: string;
  compact?: string;
  no_peer_id?: string;
  corrupt?: string;
  key?: string;

  // Private Fields
  passkey: string;

  // Client Fields
  // qb
  supportcrypto?: string;
  redundant?: string;
};

export interface TrackerRequest extends OmitRequest {
  query: TrackerQuery;
  /* full ip address */
  addr: string;
  // user language
  lang: 'en' | 'zh-CN';
}
