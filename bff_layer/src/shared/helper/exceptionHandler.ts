import { Injectable } from '@nestjs/common';

import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ExceptionHandler {
  async tryAndCatch(method: any) {
    let res: any;
    try {
      res = await method();
    } catch (e) {
      res = e;
    } finally {
      return res;
    }
  }
}

@Catch(RpcException)
export class MyExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    return throwError(() => exception.getError());
  }
}
