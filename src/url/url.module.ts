import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { urlProviders } from './url.providers';
import { UrlService } from './url.service';

@Module({
  controllers: [UrlController],
  providers: [UrlService, ...urlProviders],
  exports: [UrlService],
})
export class UrlModule {}
