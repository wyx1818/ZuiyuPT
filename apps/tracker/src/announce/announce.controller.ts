import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { CheckFieldInterceptor } from '@tracker/common/interceptors';

import { AnnounceService } from './announce.service';
import { TrackerParams } from './interfaces';

@Controller('announce')
export class AnnounceController {
  constructor(private readonly announceService: AnnounceService) {}

  @Get()
  @UseInterceptors(CheckFieldInterceptor)
  onAnnounce(@Query() params: TrackerParams) {
    console.log(params);
    return this.announceService.getOrCreatSwarm(params.info_hash);
  }
}
