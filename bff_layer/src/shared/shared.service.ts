import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { FeedbackConstants } from './constant/feedback';
import { ProductConstants } from './constant/product';
import { UserConsants } from './constant/user';

@Injectable()
export class SharedService {
  constructor(
    @Inject(UserConsants.NAME) private readonly userMicroservice: ClientKafka,
    @Inject(ProductConstants.NAME)
    private readonly productMicroservice: ClientKafka,
    @Inject(FeedbackConstants.NAME)
    private readonly reviewMicroservice: ClientKafka,
  ) {}

  async onModuleInit() {
    this.userMicroservice.subscribeToResponseOf(UserConsants.topics.SIGNUP);
    this.userMicroservice.subscribeToResponseOf(UserConsants.topics.UPDATE);
    this.userMicroservice.subscribeToResponseOf(
      UserConsants.topics.FIND_ONE_BY_CONDITION,
    );
    this.userMicroservice.subscribeToResponseOf(
      UserConsants.topics.FIND_ALL_BY_CONDITION,
    );
    this.userMicroservice.subscribeToResponseOf(UserConsants.topics.GET_ALL);
    this.userMicroservice.subscribeToResponseOf(UserConsants.topics.DELETE);
    this.userMicroservice.connect();

    this.productMicroservice.subscribeToResponseOf(
      ProductConstants.topics.CREATE,
    );
    this.productMicroservice.subscribeToResponseOf(
      ProductConstants.topics.UPDATE,
    );
    this.productMicroservice.subscribeToResponseOf(
      ProductConstants.topics.FIND_ONE_BY_CONDITION,
    );
    this.productMicroservice.subscribeToResponseOf(
      ProductConstants.topics.FIND_ALL_BY_CONDITION,
    );
    this.productMicroservice.subscribeToResponseOf(
      ProductConstants.topics.GET_ALL,
    );
    this.productMicroservice.subscribeToResponseOf(
      ProductConstants.topics.DELETE,
    );
    this.productMicroservice.subscribeToResponseOf(
      ProductConstants.topics.DELETE_ALL_PRODUCT_BY_USER,
    );
    this.productMicroservice.connect();

    this.reviewMicroservice.subscribeToResponseOf(
      FeedbackConstants.topics.CREATE_AND_GET_AVG_RATING,
    );
    this.reviewMicroservice.subscribeToResponseOf(
      FeedbackConstants.topics.UPDATE_AND_GET_AVG_RATING,
    );
    this.reviewMicroservice.subscribeToResponseOf(
      FeedbackConstants.topics.ALL_BY_USER,
    );
    this.reviewMicroservice.subscribeToResponseOf(
      FeedbackConstants.topics.ALL_BY_PRODUCT,
    );
    this.reviewMicroservice.subscribeToResponseOf(
      FeedbackConstants.topics.DELETE_BY_ID,
    );
    this.reviewMicroservice.subscribeToResponseOf(
      FeedbackConstants.topics.DELETE_ALL_FOR_USER,
    );
    this.reviewMicroservice.subscribeToResponseOf(
      FeedbackConstants.topics.DELETE_ALL_FOR_PRODUCT,
    );
    this.reviewMicroservice.connect();
  }
}
