import { Global, Module } from '@nestjs/common';
import { ExceptionHandler } from './helper/exceptionHandler';

@Global()
@Module({
  providers: [ExceptionHandler],
  exports: [ExceptionHandler],
})
export class SharedModule {}
