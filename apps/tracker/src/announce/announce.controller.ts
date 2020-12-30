import { Controller, Get, Query, UseInterceptors, UsePipes } from '@nestjs/common';
import { TrackerValidPipe } from '../common/pipes/tracker-valid.pipe';
import { CheckTrackerInterceptor } from '@tracker/common/interceptors';

@Controller('announce')
export class AnnounceController {
  @Get()
  @UseInterceptors(CheckTrackerInterceptor)
  @UsePipes(TrackerValidPipe)
  getSe(@Query() query) {
    return '2';
  }
}
