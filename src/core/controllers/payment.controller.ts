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
import { CreatePaymentDto, UpdatePaymentDto } from "../dto/payment.dto";
import { PaymentService } from "../services/payment.service";
import { CurrentUser } from "../../shared/decorator/current-user.decorator";

@Controller("payment")
@ApiTags("Payment")
@ApiBearerAuth()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post()
  addPayment(
    @CurrentUser("id") user_id: string,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentService.create(user_id, createPaymentDto);
  }

  @Get()
  getAllPaymentByUserId(
    @CurrentUser("id") user_id: string,
    @Query() queryParamsDto: QueryParamsDto,
  ) {
    return this.paymentService.findAll(user_id, queryParamsDto);
  }

  @Get(":id")
  getPaymentById(
    @CurrentUser("id") user_id: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ) {
    return this.paymentService.findOne(user_id, id);
  }

  @Patch(":id")
  updatePayment(
    @CurrentUser("id") user_id: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.update(user_id, id, updatePaymentDto);
  }

  @Delete(":id")
  deletePaymentById(
    @CurrentUser("id") user_id: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ) {
    return this.paymentService.delete(user_id, id);
  }
}
