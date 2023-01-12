import { PickType } from '@nestjs/mapped-types';
import { Feedback } from './feedback';

export class CreateFeedback extends PickType(Feedback, [
  'review',
  'rating',
  'reviewOf',
  'reviewOfId',
] as const) {}
