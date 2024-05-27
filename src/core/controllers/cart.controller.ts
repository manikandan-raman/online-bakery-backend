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
import { CreateCartDto, UpdateCartDto } from "../dto/cart.dto";
import { CartService } from "../services/cart.service";
import { CurrentUser } from "../../shared/decorator/current-user.decorator";

@Controller("cart")
@ApiTags("Cart")
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post()
  addCart(
    @CurrentUser("id") userId: string,
    @Body() createCartDto: CreateCartDto,
  ) {
    return this.cartService.create(userId, createCartDto);
  }

  @Get()
  getAllCartByUserId(
    @CurrentUser("id") userId: string,
    @Query() queryParamsDto: QueryParamsDto,
  ) {
    return this.cartService.findAll(userId, queryParamsDto);
  }

  @Get(":id")
  getCartById(
    @CurrentUser("id") userId: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ) {
    return this.cartService.findOne(userId, id);
  }

  @Patch(":id")
  updateCart(
    @CurrentUser("id") userId: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.update(userId, id, updateCartDto);
  }

  @Delete(":id")
  deleteCartById(
    @CurrentUser("id") userId: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ) {
    return this.cartService.delete(userId, [id]);
  }
}
