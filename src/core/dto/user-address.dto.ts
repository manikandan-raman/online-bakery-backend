import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export enum Status {
  Active = "active",
  Inactive = "inactive",
}

export class CreateUserAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  addressLine2: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  cityId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  stateId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  countryId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pincode: number;
}
export class UpdateUserAddressDto extends PartialType(CreateUserAddressDto) {}
