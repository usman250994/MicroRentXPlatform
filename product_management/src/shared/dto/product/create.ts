import { OmitType } from '@nestjs/mapped-types';
import { Product } from './product';

export class CreateProduct extends OmitType(Product, [
  '_id',
  'rating',
  'ownerId',
] as const) {}
