import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../shared/service/prisma.service";
import { QueryParamsDto } from "../../admin/dto/query-params.dto";
import { InvalidRequest } from "../../shared/exceptions/invalid-request.exception";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PostgresErrorCode } from "../../utils/constants";
import {
  CreateRatingReviewDto,
  UpdateRatingReviewDto,
} from "../dto/rating-review.dto";

@Injectable()
export class RatingReviewService {
  logger: Logger;
  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(RatingReviewService.name);
  }

  async create(userId: string, createRatingReviewDto: CreateRatingReviewDto) {
    try {
      return await this.prismaService.ratingReviews.create({
        data: {
          ...createRatingReviewDto,
          userId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
          throw new InvalidRequest(`You've already reviewed this dish`);
        }
      }
    }
  }

  async findAll(userId: string, queryParamsDto: QueryParamsDto) {
    const { limit, offset } = queryParamsDto;
    return await this.prismaService.ratingReviews.findMany({
      where: { userId },
      take: limit,
      skip: offset,
    });
  }

  async findOne(userId: string, id: string) {
    const ratingReview = await this.prismaService.ratingReviews.findFirst({
      where: { userId, id },
    });
    if (!ratingReview) {
      throw new InvalidRequest(`No rating review found with id: ${id}`);
    }
    return ratingReview;
  }

  async update(
    userId: string,
    id: string,
    updateRatingReviewDto: UpdateRatingReviewDto,
  ) {
    try {
      return await this.prismaService.ratingReviews.update({
        where: { userId, id },
        data: { ...updateRatingReviewDto, userId },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_RESOURCE_NOT_FOUND) {
          throw new InvalidRequest(`No rating review found with id: ${id}`);
        }
      }
    }
  }

  async delete(userId: string, id: string) {
    try {
      return await this.prismaService.ratingReviews.delete({
        where: { userId, id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_RESOURCE_NOT_FOUND) {
          throw new InvalidRequest(`No rating review found with id: ${id}`);
        }
      }
    }
  }
}
