import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateCartDto {
  @ApiProperty({
    description: "Unique identifier for the dish",
    example: "d12345",
  })
  @IsString()
  @IsNotEmpty()
  dishId: string;

  @ApiProperty({
    description: "Quantity of the dish to order",
    example: 2,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity: number;

  @ApiProperty({
    description: "Price of the dish",
    example: 15.5,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;
}

export class UpdateCartDto extends PartialType(CreateCartDto) {}
