import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CheckAnnounceMiddlewares } from '../common/middlewares/check-announce.middlewares';

@Module({})
export class AnnounceModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CheckAnnounceMiddlewares).forRoutes({ path: 'announce', method: RequestMethod.GET });
  }
}
