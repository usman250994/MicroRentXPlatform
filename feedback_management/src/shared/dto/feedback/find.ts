import { PickType } from '@nestjs/mapped-types';
import { Feedback } from './feedback';

export class FindFeedbackBy extends PickType(Feedback, [
  'revieweeId',
] as const) {
  page: string;
}
