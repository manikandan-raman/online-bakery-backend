import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../shared/service/prisma.service";
import { CreateCartDto, UpdateCartDto } from "../dto/cart.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { QueryParamsDto } from "../../admin/dto/query-params.dto";
import { InvalidRequest } from "../../shared/exceptions/invalid-request.exception";
import { PostgresErrorCode } from "../../utils/constants";

@Injectable()
export class CartService {
  logger: Logger;
  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(CartService.name);
  }

  async create(userId: string, createCartDto: CreateCartDto) {
    return await this.prismaService.cart.create({
      data: { ...createCartDto, userId },
    });
  }

  async findAll(userId: string, queryParamsDto: QueryParamsDto) {
    const { limit, offset } = queryParamsDto;
    return await this.prismaService.cart.findMany({
      where: { userId },
      take: limit,
      skip: offset,
    });
  }

  async findOne(userId: string, id: string) {
    const cart = await this.prismaService.cart.findFirst({
      where: { userId, id },
    });
    if (!cart) {
      throw new InvalidRequest(`No cart found with id: ${id}`);
    }
    return cart;
  }

  async update(userId: string, id: string, updateCartDto: UpdateCartDto) {
    try {
      return await this.prismaService.cart.update({
        where: { userId, id },
        data: { ...updateCartDto, userId },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_RESOURCE_NOT_FOUND) {
          throw new InvalidRequest(`No cart found with id: ${id}`);
        }
      }
    }
  }

  async delete(userId: string, id: string[]) {
    try {
      return await this.prismaService.cart.deleteMany({
        where: { userId, id: { in: id } },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_RESOURCE_NOT_FOUND) {
          throw new InvalidRequest(`No cart found with id: ${id}`);
        }
      }
    }
  }
}
