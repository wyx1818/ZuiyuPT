import { Controller, Get, Query, UseFilters, UsePipes } from '@nestjs/common';
import { TrackerExceptionFilter } from '../common/filters/tracker-exception.filter';
import { TrackerValidPipe } from '../common/pipes/tracker-valid.pipe';

@Controller('announce')
export class AnnounceController {
  @Get()
  @UsePipes(TrackerValidPipe)
  @UseFilters(TrackerExceptionFilter)
  getSe(@Query() query) {
    return '2';
  }
}
