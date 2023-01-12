import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express';
import { FeedbackConstants } from './constant/feedback';
import { ProductConstants } from './constant/product';
import { UserConsants } from './constant/user';
import { ExceptionHandler } from './helper/exceptionHandler';
import { GlobalInterceptor } from './interceptor/global.interceptor';
import { SharedService } from './shared.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: FeedbackConstants.NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: FeedbackConstants.name,
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'feedback-consumer',
          },
        },
      },
      {
        name: ProductConstants.NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: ProductConstants.name,
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'product-consumer',
          },
        },
      },
      {
        name: UserConsants.NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: UserConsants.name,

            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'user-consumer',
          },
        },
      },
    ]),
    MulterModule.register({ dest: './uploads' }),
  ],
  providers: [SharedService, ExceptionHandler, GlobalInterceptor],
  exports: [
    ClientsModule,
    SharedService,
    MulterModule,
    ExceptionHandler,

    GlobalInterceptor,
  ],
})
export class SharedModule {}
