import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum Status {
  Active = "active",
  Inactive = "inactive",
}

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEnum(Status)
  status: Status;
}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
