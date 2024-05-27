import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsUUID, IsNotEmpty, IsEnum, IsString } from "class-validator";
import { OrderStatus } from "./order.dto";

export class CreatePaymentDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  modeOfPayment: string;

  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: Lowercase<keyof typeof OrderStatus>;
}

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
