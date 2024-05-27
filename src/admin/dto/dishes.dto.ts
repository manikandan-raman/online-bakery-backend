import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from "class-validator";

export enum Status {
  Active = "active",
  Inactive = "inactive",
}

export class CreateDishDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsEnum(Status)
  status: Status;
}

export class UpdateDishDto extends PartialType(CreateDishDto) {}
