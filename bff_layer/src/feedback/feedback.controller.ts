import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/authentication/gaurds/jwt-authentication-gaurds';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createReview(@Body() body: any) {
    return this.feedbackService.createReviewAndReturnAvgRating(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateReview(@Body() body: any) {
    return this.feedbackService.updateReviewAndReturnAvgRating(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/allForUser')
  async allForUser(@Query() query) {
    const allreviews: any[] = await this.feedbackService.allForUser(query);
    return allreviews.length;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/allForProduct')
  async allForProduct(@Query() query) {
    const allreviews: any[] = await this.feedbackService.allForProduct(query);
    return allreviews.length;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deleteById')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteById(@Query() query) {
    return this.feedbackService.deleteById(query);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deleteAllForUser')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteAllForUser(@Query() query) {
    return this.feedbackService.deleteAllForUser(query);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deleteAllForProduct')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteAllForProduct(@Query() query) {
    return this.feedbackService.deleteAllForProduct(query);
  }
}
