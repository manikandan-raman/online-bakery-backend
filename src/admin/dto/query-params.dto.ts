import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class QueryParamsDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit = 10;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  offset = 8;
}
