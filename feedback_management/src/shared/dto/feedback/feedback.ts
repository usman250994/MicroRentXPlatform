import { IsNotEmpty } from 'class-validator';

enum RevieweeType {
  PRODUCT = 'product',
  USER = 'user',
}

export class Feedback {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  rating: string;
  @IsNotEmpty()
  review: string;
  @IsNotEmpty()
  reviewOf: RevieweeType;
  @IsNotEmpty()
  reviewOfId: string;
  @IsNotEmpty()
  revieweeId: string;
}
