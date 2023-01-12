import { PickType } from '@nestjs/mapped-types';
import { User } from './user';
export class Login extends PickType(User, ['email', 'password'] as const) {}
