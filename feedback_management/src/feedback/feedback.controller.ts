import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { exceptionHandler } from 'src/helper/exceptionHandler';
import { FeedbackConstants } from 'src/shared/constant/feedback';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @MessagePattern(FeedbackConstants.topics.CREATE_AND_GET_AVG_RATING)
  async readMessage(@Payload() message: any) {
    return exceptionHandler(
      this.feedbackService.createFeedbackAndReturnAvgRating(message),
    );
  }

  @MessagePattern(FeedbackConstants.topics.UPDATE_AND_GET_AVG_RATING)
  async updatereview(@Payload() message: any) {
    return exceptionHandler(this.feedbackService.update(message));
  }

  @MessagePattern(FeedbackConstants.topics.ALL_BY_USER)
  async getAllByUser(@Payload() message: any) {
    return exceptionHandler(this.feedbackService.findByUser(message));
  }

  @MessagePattern(FeedbackConstants.topics.ALL_BY_PRODUCT)
  async getAllByProduct(@Payload() message: any) {
    return exceptionHandler(this.feedbackService.findByProduct(message));
  }

  @MessagePattern(FeedbackConstants.topics.DELETE_BY_ID)
  async deleteById(@Payload() message: any) {
    return exceptionHandler(this.feedbackService.deleteById(message));
  }

  @MessagePattern(FeedbackConstants.topics.DELETE_ALL_FOR_USER)
  async deleteAllByUser(@Payload() message: any) {
    return exceptionHandler(this.feedbackService.deleteAllByUserId(message));
  }

  @MessagePattern(FeedbackConstants.topics.DELETE_ALL_FOR_PRODUCT)
  async deleteAllByProduct(@Payload() message: any) {
    return exceptionHandler(this.feedbackService.deleteAllByProductId(message));
  }
}
