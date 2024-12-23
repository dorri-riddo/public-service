import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config.module';
import { ConfigService } from '../config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        if (process.env.NODE_ENV === 'test') {
          return {
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: configService.get('DATABASE_USER'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            entities: [__dirname + './../../**/**.model{.ts,.js}'],
            synchronize: false,
            dropSchema: false,
            logging: false,
          };
        }

        return {
          type: 'mysql',
          host: configService.get('DATABASE_HOST'),
          port: Number(configService.get('DATABASE_PORT')),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          entities: [__dirname + './../../**/**.model{.ts,.js}'],
          synchronize: false,
          dropSchema: false,
          logging: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
