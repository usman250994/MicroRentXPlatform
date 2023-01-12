import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class PasswordService {
  async hash(password: string) {
    return bcrypt.hash(password, saltOrRounds);
  }
  async compareHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
