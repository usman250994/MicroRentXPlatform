import { PartialType, PickType } from '@nestjs/mapped-types';
import { User } from './user';
export class FindUserConditions extends PickType(User, [
  'email',
  'name',
  'number',
] as const) {
  page: string;
}

export class FindUserBy extends PartialType(FindUserConditions) {
  page: string;
}
