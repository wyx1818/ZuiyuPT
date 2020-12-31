import { Injectable } from '@nestjs/common';
import { trackerSuccessRes } from '@tracker/announce/services';

@Injectable()
export class AnnounceService {
  getOrCreatSwarm(infoHash: string) {
    return trackerSuccessRes();
  }
}
