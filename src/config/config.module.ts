import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [{ provide: ConfigService, useValue: new ConfigService() }],
  controllers: [],
  exports: [ConfigService],
})
export class ConfigModule {}
