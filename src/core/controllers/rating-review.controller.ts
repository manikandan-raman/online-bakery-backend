import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { QueryParamsDto } from "../../admin/dto/query-params.dto";
import { CurrentUser } from "../../shared/decorator/current-user.decorator";
import { RatingReviewService } from "../services/rating-review.service";
import {
  CreateRatingReviewDto,
  UpdateRatingReviewDto,
} from "../dto/rating-review.dto";

@Controller("rating-review")
@ApiTags("Rating Review")
@ApiBearerAuth()
export class RatingReviewController {
  constructor(private readonly ratingReviewService: RatingReviewService) {}
  @Post()
  addRatingReview(
    @CurrentUser("id") user_id: string,
    @Body() createRatingReviewDto: CreateRatingReviewDto,
  ) {
    return this.ratingReviewService.create(user_id, createRatingReviewDto);
  }

  @Get()
  getAllRatingReviewByUserId(
    @CurrentUser("id") user_id: string,
    @Query() queryParamsDto: QueryParamsDto,
  ) {
    return this.ratingReviewService.findAll(user_id, queryParamsDto);
  }

  @Get(":id")
  getRatingReviewById(
    @CurrentUser("id") user_id: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ) {
    return this.ratingReviewService.findOne(user_id, id);
  }

  @Patch(":id")
  updateRatingReview(
    @CurrentUser("id") user_id: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updateRatingReviewDto: UpdateRatingReviewDto,
  ) {
    return this.ratingReviewService.update(user_id, id, updateRatingReviewDto);
  }

  @Delete(":id")
  deleteRatingReviewById(
    @CurrentUser("id") user_id: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ) {
    return this.ratingReviewService.delete(user_id, id);
  }
}
