import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReqCreateUserInput {
  @Field(() => String, { description: '이름' })
  name: string;

  @Field(() => String, { description: '이메일' })
  email: string;

  @Field(() => String, { description: '비밀번호' })
  password: string;
}
