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
    // console.log('路由收到参数', params);
    return this.announceService.getOrCreatSwarm(params.info_hash);
  }
}
