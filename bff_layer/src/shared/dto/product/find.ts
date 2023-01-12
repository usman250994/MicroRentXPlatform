import { PartialType, PickType } from '@nestjs/mapped-types';
import { Product } from './product';

export class FindProductById extends PickType(Product, ['_id']) {
  page: string;
}
export class FindProductBy extends PartialType(Product) {
  page: string;
}
