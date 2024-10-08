import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthResolver } from './auth.resolver';
import { AuthRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.model';
import { User } from '../user/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, User]),
    JwtModule.register({ global: true }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.naver.com',
          port: 587,
          secure: false,
          auth: {
            user: 's3823672@naver.com',
            pass: 'akdgkfshaemfdl@',
          },
        },
        defaults: {
          from: '"nest-modules" <s3823672@naver.com>',
        },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, AuthRepository],
})
export class AuthModule {}
