import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserService } from './user.service';
import { Auth } from '../auth/auth.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Auth])],
  providers: [UserResolver, UserRepository, UserService],
})
export class UserModule {}
