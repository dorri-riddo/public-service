import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ReqConfirmAuth, ReqLoginInput } from './dto/req';
import { ResLogin } from './dto/resp';

@Resolver()
export class AuthResolver {
  constructor(private readonly service: AuthService) {}

  @Mutation(() => Boolean, { description: '이메일 인증코드 발송' })
  async sendAuthCodeEmail(@Args('email') email: string): Promise<boolean> {
    await this.service.sendAuthCodeEmail(email);
    return true;
  }

  @Mutation(() => Boolean, { description: '이메일에 따른 인증코드 확인' })
  async confirmAuthCode(
    @Args('payload') payload: ReqConfirmAuth,
  ): Promise<boolean> {
    return await this.service.confirmAuthCode(payload);
  }

  @Mutation(() => ResLogin, { description: '로그인' })
  async logIn(@Args('payload') payload: ReqLoginInput): Promise<ResLogin> {
    return await this.service.logIn(payload);
  }
}
