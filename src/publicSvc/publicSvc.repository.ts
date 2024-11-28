import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Service } from './service.model';
import { ServiceMapping } from './serviceMapping.model';

@Injectable()
export class PublicSvcRepository {
  constructor(
    @InjectRepository(Service) private readonly repo: Repository<Service>,
    @InjectRepository(ServiceMapping)
    private readonly mappingRepo: Repository<ServiceMapping>,
  ) {}

  async findByExternalId(externalId: string): Promise<Service | null> {
    return await this.repo.findOne({ where: { externalId } });
  }

  async findByUserId(userId: number): Promise<Service[]> {
    return await this.repo
      .createQueryBuilder('service')
      .innerJoinAndMapOne(
        'service.mapping',
        ServiceMapping,
        'mapping',
        'mapping.serviceId = service.id',
      )
      .where('mapping.userId = :userId', { userId })
      .getMany();
  }

  async createService(payload: DeepPartial<Service>): Promise<Service> {
    return await this.repo.save(payload);
  }

  async createMapping(payload: DeepPartial<ServiceMapping>): Promise<void> {
    await this.mappingRepo.save(payload);
  }

  async deleteMapping(id: number, userId: number): Promise<void> {
    await this.mappingRepo.softDelete({ id, userId });
  }
}
