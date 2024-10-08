import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReqPublicSvcInput {
  @Field(() => Number, { description: '페이지' })
  page: number;

  @Field(() => Number, { description: '페이지 당 개수' })
  perPage: number;
}

@InputType()
export class ReqPublicSvcDetailInput {
  @Field(() => String, { description: '서비스 id' })
  SVCID: string;
}
