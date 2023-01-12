import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Review from './feedback.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('MONGODB_CONNECTION_STRING'),
        database: configService.get('MONGO_DB'),
        entities: [Review],
        useNewUrlParser: true,
        useUnifiedTopology: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
