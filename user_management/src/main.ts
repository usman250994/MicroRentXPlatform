import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { MyExceptionFilter } from './shared/helper/exceptionHandler';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:29092'],
        },
        consumer: {
          groupId: 'user-consumer',
        },
      },
    },
  );
  app.useGlobalFilters(new MyExceptionFilter());
  await app.listen();
}
bootstrap();
