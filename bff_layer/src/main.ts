import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyExceptionFilter } from './shared/helper/exceptionHandler';
import { GlobalInterceptor } from './shared/interceptor/global.interceptor';

async function bootstrap() {
  console.log('hello world');
  const app = await NestFactory.create(AppModule);
  console.log('hello world 22');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new GlobalInterceptor());
  app.useGlobalFilters(new MyExceptionFilter());
  await app.listen(3000);
}
bootstrap();
