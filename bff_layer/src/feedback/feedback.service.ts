import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ProductConstants } from 'src/shared/constant/product';
import { FeedbackConstants } from 'src/shared/constant/feedback';
import { UserConsants } from 'src/shared/constant/user';
import { ExceptionHandler } from 'src/shared/helper/exceptionHandler';

@Injectable()
export class FeedbackService {
  constructor(
    private exceptionHandler: ExceptionHandler,
    @Inject(UserConsants.NAME) private readonly userMicroservice: ClientKafka,
    @Inject(ProductConstants.NAME)
    private readonly productMicroservice: ClientKafka,
    @Inject(FeedbackConstants.NAME)
    private readonly feedbackMicroservice: ClientKafka,
  ) {}

  async createReviewAndReturnAvgRating(createReviewDto: any): Promise<any> {
    const feedbackCreationResponse = await this.exceptionHandler.tryAndCatch(
      lastValueFrom(
        this.feedbackMicroservice.send(
          FeedbackConstants.topics.CREATE_AND_GET_AVG_RATING,
          createReviewDto,
        ),
      ),
    );
    if (createReviewDto.review.reviewOf === ProductConstants.name) {
      this.exceptionHandler.tryAndCatch(
        lastValueFrom(
          this.productMicroservice.emit(ProductConstants.topics.UPDATE, {
            _id: createReviewDto.reviewOfId,
            rating: feedbackCreationResponse,
          }),
        ),
      );
    } else {
      this.exceptionHandler.tryAndCatch(
        lastValueFrom(
          this.userMicroservice.emit(UserConsants.topics.UPDATE, {
            userId: createReviewDto.reviewOfId,
            userDetails: { rating: feedbackCreationResponse },
          }),
        ),
      );
    }
    return feedbackCreationResponse;
  }

  async updateReviewAndReturnAvgRating(updatereviewDto: any) {
    const feedbackUpdationResponse = await lastValueFrom(
      this.feedbackMicroservice.send(
        FeedbackConstants.topics.UPDATE_AND_GET_AVG_RATING,
        updatereviewDto,
      ),
    );
    if (updatereviewDto.review.rating) {
      if (updatereviewDto.review.reviewOf === ProductConstants.name) {
        lastValueFrom(
          this.productMicroservice.emit(ProductConstants.topics.UPDATE, {
            _id: updatereviewDto.reviewOfId,
            rating: feedbackUpdationResponse,
          }),
        );
      } else {
        lastValueFrom(
          this.userMicroservice.emit(UserConsants.topics.UPDATE, {
            userId: updatereviewDto.reviewOfId,
            userDetails: { rating: updatereviewDto },
          }),
        );
      }
    }
    return feedbackUpdationResponse;
  }

  async allForProduct(dto: any) {
    return this.exceptionHandler.tryAndCatch(
      lastValueFrom(
        this.feedbackMicroservice.send(
          FeedbackConstants.topics.ALL_BY_PRODUCT,
          dto,
        ),
      ),
    );
  }

  async allForUser(dto: any) {
    return this.exceptionHandler.tryAndCatch(
      lastValueFrom(
        this.feedbackMicroservice.send(
          FeedbackConstants.topics.ALL_BY_USER,
          dto,
        ),
      ),
    );
  }

  async deleteById(dto: any) {
    return this.exceptionHandler.tryAndCatch(
      lastValueFrom(
        this.feedbackMicroservice.send(
          FeedbackConstants.topics.DELETE_BY_ID,
          dto,
        ),
      ),
    );
  }

  async deleteAllForUser(dto: any) {
    return this.exceptionHandler.tryAndCatch(
      lastValueFrom(
        this.feedbackMicroservice.send(
          FeedbackConstants.topics.DELETE_ALL_FOR_USER,
          dto,
        ),
      ),
    );
  }

  async deleteAllForProduct(dto: any) {
    return this.exceptionHandler.tryAndCatch(
      lastValueFrom(
        this.feedbackMicroservice.send(
          FeedbackConstants.topics.DELETE_ALL_FOR_PRODUCT,
          dto,
        ),
      ),
    );
  }
}
