import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicSvcService } from './publicSvc.service';
import { PublicSvcResolver } from './publicSvc.resolver';
import { PublicSvcRepository } from './publicSvc.repository';
import { Service } from './service.model';
import { ServiceMapping } from './serviceMapping.model';

@Module({
  imports: [TypeOrmModule.forFeature([Service, ServiceMapping])],
  providers: [PublicSvcService, PublicSvcResolver, PublicSvcRepository],
})
export class PublicSvcModule {}
