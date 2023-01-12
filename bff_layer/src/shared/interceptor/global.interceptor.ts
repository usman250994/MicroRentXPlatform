import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { catchError, map } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
export class GlobalInterceptor<T> implements NestInterceptor<T, Response<T>> {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    console.log('before interceptor', request);
    request.body = { dto: request.body, userId: request.user.id };
    request.query = { dto: request.query, userId: request.user.id };
    console.log('after interceptor', context.switchToHttp().getResponse());

    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((result) => {
        return response.status(HttpStatus.OK).json({
          message: 'successful',
          data: result,
        });
      }),

      catchError((err) => {
        console.log('caught inside interceptor', err);
        throw new HttpException(
          err.message + ' wwww',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
