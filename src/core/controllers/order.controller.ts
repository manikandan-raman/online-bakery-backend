import {
  Controller,
  Post,
  Param,
  ParseUUIDPipe,
  Body,
  Get,
  Query,
  Patch,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { QueryParamsDto } from "../../admin/dto/query-params.dto";
import { CreateOrderDto, UpdateOrderDto } from "../dto/order.dto";
import { OrderService } from "../services/order.service";
import { CurrentUser } from "../../shared/decorator/current-user.decorator";
import { CartService } from "../services/cart.service";

@Controller("orders")
@ApiTags("Orders")
@ApiBearerAuth()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly cartService: CartService,
  ) {}
  @Post()
  async addOrder(
    @CurrentUser("id") userId: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const order = await this.orderService.create(userId, createOrderDto);
    if (order.id) {
      this.cartService.delete(userId, createOrderDto.cart_ids);
    }
    return order;
  }

  @Get()
  getAllOrderByUserId(
    @CurrentUser("id") userId: string,
    @Query() queryParamsDto: QueryParamsDto,
  ) {
    return this.orderService.findAll(userId, queryParamsDto);
  }

  @Get(":id")
  getOrderById(
    @CurrentUser("id") userId: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ) {
    return this.orderService.findOne(userId, id);
  }

  @Patch(":id")
  updateOrder(
    @CurrentUser("id") userId: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(userId, id, updateOrderDto);
  }

  @Delete(":id")
  deleteOrderById(
    @CurrentUser("id") userId: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ) {
    return this.orderService.delete(userId, id);
  }
}
