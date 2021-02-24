import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [UrlModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
