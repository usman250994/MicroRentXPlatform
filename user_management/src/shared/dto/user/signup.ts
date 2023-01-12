import { PickType } from '@nestjs/mapped-types';
import { User } from './user';
export class Signup extends PickType(User, [
  'email',
  'password',
  'number',
] as const) {}
