import { PickType } from '@nestjs/mapped-types';
import { Product } from './product';

export class DeleteProductById extends PickType(Product, ['_id']) {}
export class DeleteProductByOwner extends PickType(Product, ['ownerId']) {}
