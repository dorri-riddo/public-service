import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResLogin {
  @Field({ description: '액세스 토큰' })
  accessToken: string;

  @Field({ description: '리프레쉬 토큰' })
  refreshToken: string;
}
