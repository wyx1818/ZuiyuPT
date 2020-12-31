import { Request } from 'express';

type OmitRequest = Omit<Request, 'query'>;
/**
 * BEP3
 * @see http://www.bittorrent.org/beps/bep_0003.html#trackers
 */
export type TrackerParams = {
  // **Need** Fields
  info_hash: string;
  peer_id: string;
  port: string | number;
  uploaded: string | number;
  downloaded: string | number;
  left: string;
  event: 'started' | 'stopped' | 'update' | 'completed' | '';

  // **Option** Fields
  // The number of peers the client wants to return
  numwant?: string | number;
  compact?: string | number;
  no_peer_id?: string | number;
  corrupt?: string | number;
  key?: string;

  // Private Fields
  passkey: string;

  // Client Fields
  // qb
  supportcrypto?: string;
  redundant?: string;
};

export interface TrackerRequest extends OmitRequest {
  query: TrackerParams;
  /* full ip address */
  addr: string;
  // user language
  lang: 'en' | 'zh-CN';
}
