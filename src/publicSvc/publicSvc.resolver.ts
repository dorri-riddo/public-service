import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PublicSvcService } from './publicSvc.service';
import { ResPublicSvcDetail, ResPublicSvcs } from './dto/resp';
import { ReqPublicSvcDetailInput, ReqPublicSvcInput } from './dto/req';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/guard';
import { Service } from './service.model';

@Resolver()
export class PublicSvcResolver {
  constructor(private readonly service: PublicSvcService) {}

  @Query(() => ResPublicSvcs, { description: '공공서비스 목록 조회' })
  async getPublicSvcs(
    @Args('payload') payload: ReqPublicSvcInput,
  ): Promise<ResPublicSvcs> {
    return await this.service.getPublicSvcs(payload);
  }

  @Query(() => ResPublicSvcDetail, { description: '공공서비스 상세 조회' })
  async getPublicSvcDetail(
    @Args('payload') payload: ReqPublicSvcDetailInput,
  ): Promise<ResPublicSvcDetail> {
    return await this.service.getPublicSvcDetail(payload);
  }

  @Query(() => [Service], {
    description: '사용자별로 담은 공공서비스 목록 조회',
  })
  @UseGuards(RolesGuard)
  async getPublicSvcByUserId(@Context() context: any): Promise<Service[]> {
    const user = context.req.user;

    return await this.service.getPublicSvcByUserId(user.userId);
  }

  @Mutation(() => String)
  @UseGuards(RolesGuard)
  async addPublicSvcByUser(
    @Args('payload') payload: ReqPublicSvcDetailInput,
    @Context() context: any,
  ): Promise<string> {
    const user = context.req.user;

    await this.service.addPublicSvcByUser(payload, user.userId);
    return 'ok';
  }
}
