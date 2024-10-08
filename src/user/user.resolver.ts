import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { ReqCreateUserInput } from './dto/req';

@Resolver()
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Mutation(() => User, { description: '회원가입' })
  async createUser(
    @Args('payload') payload: ReqCreateUserInput,
  ): Promise<User> {
    return await this.service.createUser(payload);
  }
}
