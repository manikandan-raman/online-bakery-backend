import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNumber, Min, Max } from "class-validator";

export class CreateRatingReviewDto {
  @ApiProperty({ description: "ID of the dish" })
  @IsString()
  dishId: string;

  @ApiProperty({ description: "Rating of the dish", minimum: 1, maximum: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  rating: number;

  @ApiProperty({ description: "Review of the dish" })
  @IsString()
  review: string;
}

export class UpdateRatingReviewDto extends PartialType(CreateRatingReviewDto) {}
