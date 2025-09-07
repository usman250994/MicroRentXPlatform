import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class MyExceptionFilter extends BaseExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    return { eror: exception.getError() };
  }
}
