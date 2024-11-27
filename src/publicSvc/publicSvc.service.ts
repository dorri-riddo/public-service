import { Injectable } from '@nestjs/common';
import got from 'got';
import { ResPublicSvcDetail, ResPublicSvcs } from './dto/resp';
import { ReqPublicSvcDetailInput, ReqPublicSvcInput } from './dto/req';
import { PublicSvcRepository } from './publicSvc.repository';
import { Service } from './service.model';
import { ServiceMapping } from './ServiceMapping.model';

@Injectable()
export class PublicSvcService {
  constructor(private readonly repo: PublicSvcRepository) {}

  /**
   * 공공서비스 목록 조회
   *
   * @param payload
   * @returns
   */
  async getPublicSvcs(payload: ReqPublicSvcInput): Promise<ResPublicSvcs> {
    const { page, perPage } = payload;

    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    const result = await got
      .get(
        `http://openapi.seoul.go.kr:8088/${process.env.PUBLIC_SERVICE_KEY}/json/tvYeyakCOllect/${startIndex}/${endIndex}`,
      )
      .json<ResPublicSvcs>();

    return result;
  }

  /**
   * 공공서비스 상세 조회
   *
   * @param payload
   * @returns
   */
  async getPublicSvcDetail(
    payload: ReqPublicSvcDetailInput,
  ): Promise<ResPublicSvcDetail> {
    const { SVCID } = payload;

    const result = await got
      .get(
        `http://openapi.seoul.go.kr:8088/${process.env.PUBLIC_SERVICE_DETAIL_KEY}/json/ListPublicReservationDetail/1/1/${SVCID}`,
      )
      .json<ResPublicSvcDetail>();

    return result;
  }

  /**
   * 사용자별 공공서비스 목록 조회
   *
   * @param userId
   * @returns
   */
  async getPublicSvcByUserId(userId: number): Promise<Service[]> {
    return await this.repo.findByUserId(userId);
  }

  /**
   * 사용자별 공공서비스 추가
   *
   * @param payload
   * @param userId
   * @returns
   */
  async addPublicSvcByUser(
    payload: ReqPublicSvcDetailInput,
    userId: number,
  ): Promise<void> {
    const { SVCID } = payload;

    const service = await this.repo.findByExternalId(SVCID);
    if (service) {
      const mapping = new ServiceMapping();
      Object.assign(mapping, { serviceId: service.id, userId });
      await this.repo.createMapping(mapping);
      return;
    }

    const serviceDetail = await this.getPublicSvcDetail(payload);

    const newService = await this.repo.createService({
      externalId: SVCID,
      item: serviceDetail,
    });

    const mapping = new ServiceMapping();
    Object.assign(mapping, { serviceId: newService.id, userId });
    await this.repo.createMapping({ serviceId: newService.id, userId });
  }
}
