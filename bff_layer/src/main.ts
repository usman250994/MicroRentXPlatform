import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyExceptionFilter } from './shared/helper/exceptionHandler';
import { GlobalInterceptor } from './shared/interceptor/global.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
