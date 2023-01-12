import { PickType } from '@nestjs/mapped-types';
import { Feedback } from './feedback';

export class UpdateFeedback extends PickType(Feedback, [
  'review',
  'rating',
  'id',
] as const) {}
