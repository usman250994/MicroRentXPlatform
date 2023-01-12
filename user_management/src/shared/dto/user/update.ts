import { OmitType } from '@nestjs/mapped-types';
import { User } from './user';

export class UpdateUser extends OmitType(User, ['id']) {}
