import { Injectable } from '@nestjs/common';

@Injectable()
export class ExceptionHandler {
  async tryAndCatch(method: any) {
    try {
      return method();
    } catch (e) {
      throw e;
    }
  }
}
