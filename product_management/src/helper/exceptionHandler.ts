import { rentalException } from './exception';

export async function exceptionHandler(method: any) {
  try {
    return method();
  } catch (e) {
    throw e;
  }
}
