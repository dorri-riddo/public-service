import { Field, InputType } from '@nestjs/graphql';
import { User } from '../../user/user.model';

@InputType()
export class ReqConfirmAuth {
  @Field(() => String, { description: '이메일' })
  email: string;

  @Field(() => String, { description: '인증번호' })
  authCode: string;
}

@InputType()
export class ReqLoginInput {
  @Field({ description: '이메일' })
  email: string;

  @Field({ description: '비밀번호' })
  password: string;
}

export interface ReqValidateInput {
  user: User;
  password: string;
}
