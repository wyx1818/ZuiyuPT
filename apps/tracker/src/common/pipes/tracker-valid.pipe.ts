import { Injectable, PipeTransform } from '@nestjs/common';

type Trackers = {
  passkey: string;
  info_hash: string;
  peer_id: string;
  port: string | number;
  uploaded: string;
  downloaded: string;
};

@Injectable()
export class TrackerValidPipe implements PipeTransform {
  /**
   * @description Check tracker GET request keys
   * @see http://www.bittorrent.org/beps/bep_0003.html#trackers
   */
  transform(query: Trackers) {
    return query;
  }
}
