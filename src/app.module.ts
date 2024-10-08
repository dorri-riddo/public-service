import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './config/database/database.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { GqlHttpExceptionFilter } from './filter/http-exception.filter';
import { PublicSvcModule } from './publicSvc/publicSvc.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    PublicSvcModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { useClass: GqlHttpExceptionFilter, provide: APP_FILTER },
  ],
})
export class AppModule {}
