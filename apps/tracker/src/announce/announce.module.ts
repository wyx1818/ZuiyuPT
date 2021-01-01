import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { FilterAnnounceMiddlewares } from '../common/middlewares/filter-announce.middlewares';

@Module({})
export class AnnounceModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FilterAnnounceMiddlewares).forRoutes({ path: 'announce', method: RequestMethod.GET });
  }
}
