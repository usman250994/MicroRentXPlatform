import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Product } from './product';

export class UpdateProduct extends OmitType(Product, ['_id', 'rating']) {
  @IsNotEmpty()
  _id: string;
}
