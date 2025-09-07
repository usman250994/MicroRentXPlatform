import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Feedback, { RevieweeType } from 'src/database/feedback.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async createFeedbackAndReturnAvgRating(dto: any) {
    await this.create(dto);
    const avgRating = await this.getAvgRating({
      reviewOf: dto.reviewOf,
      reviewOfId: dto.reviewOfId,
    });
    return avgRating;
  }

  async updateFeedbackAndReturnAvgRating(dto: any) {
    await this.update(dto);
    const avgRating = await this.getAvgRating({
      reviewOf: dto.reviewOf,
      reviewOfId: dto.reviewOfId,
    });
    return avgRating;
  }

  async create(dto: any): Promise<any> {
    const res = this.feedbackRepository.create({
      ...dto.review,
      revieweeId: dto.userId,
    });
    const res2 = await this.feedbackRepository.save(res);
    return JSON.parse(JSON.stringify(res2));
  }

  async getAvgRating({ reviewOf, reviewOfId }) {
    const rating = await this.feedbackRepository.find({
      where: {
        reviewOf:
          reviewOf === 'product' ? RevieweeType.USER : RevieweeType.PRODUCT,
        reviewOfId: reviewOfId,
      },
      select: ['rating'],
    });
    const sum = rating.reduce((a, b) => Number(a) + Number(b), 0);
    const avg = sum / rating.length || 0;
    return avg;
  }

  async update(dto: any): Promise<any> {
    const updatedData = await this.feedbackRepository.update(
      dto.review.id,
      dto.review,
    );
    return updatedData.affected;
  }

  async findByUser(dto: any): Promise<any> {
    const res = await this.feedbackRepository.findAndCount({
      where: {
        reviewOf: RevieweeType.USER,
        revieweeId: dto.revieweeId,
      },
      skip: 3 * dto.page || 0,
      take: 3,
    });
    return res;
  }

  async findByProduct(dto: any): Promise<any> {
    const res = await this.feedbackRepository.findAndCount({
      where: {
        reviewOf: RevieweeType.PRODUCT,
        revieweeId: dto.revieweeId,
      },

      skip: 3 * dto.page || 0,
      take: 3,
    });
    return res;
  }

  async deleteById(dto: any): Promise<any> {
    const deleteResponse = await this.feedbackRepository.softDelete(dto);
    if (!deleteResponse.affected) {
      throw new InternalServerErrorException('deletion failed');
    }
    return true;
  }

  async deleteAllByProductId(dto: any): Promise<any> {
    const deleteResponse = await this.feedbackRepository.softDelete(dto);
    if (!deleteResponse.affected) {
      throw new InternalServerErrorException('deletion failed');
    }
    return true;
  }

  async deleteAllByUserId(dto: any): Promise<any> {
    const deleteResponse = await this.feedbackRepository.softDelete(dto);
    if (!deleteResponse.affected) {
      throw new InternalServerErrorException('deletion failed');
    }
    return true;
  }
}
