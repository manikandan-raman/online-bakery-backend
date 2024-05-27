import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsEnum,
  IsUUID,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsArray,
} from "class-validator";
export enum OrderStatus {
  Success = "success",
  Pending = "pending",
  Failure = "Failure",
}

export class CreateOrderItemsDto {
  @ApiPropertyOptional({ description: "ID of the dish" })
  @IsString()
  @IsOptional()
  dishId: string;

  @ApiPropertyOptional({ description: "Quantity of the dish", example: 1 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  quantity: number;

  @ApiPropertyOptional({ description: "Price of the dish", example: 10.99 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  price: number;
}

export class UpdateOrderItemsDto extends PartialType(CreateOrderItemsDto) {}

export class CreateOrderDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  addressId: string;

  @ApiProperty({ type: [CreateOrderItemsDto] })
  @IsArray()
  @Type(() => CreateOrderItemsDto)
  orderItems: CreateOrderItemsDto[];

  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: Lowercase<keyof typeof OrderStatus>;

  @IsArray()
  cart_ids: string[];
}

export class UpdateOrderDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  addressId?: string;

  @ApiProperty({ type: [UpdateOrderItemsDto] })
  @IsArray()
  @Type(() => UpdateOrderItemsDto)
  orderItems?: UpdateOrderItemsDto[];

  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status?: Lowercase<keyof typeof OrderStatus>;
}
