import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../shared/service/prisma.service";
import { CreateOrderDto, UpdateOrderDto } from "../dto/order.dto";
import { QueryParamsDto } from "../../admin/dto/query-params.dto";
import { InvalidRequest } from "../../shared/exceptions/invalid-request.exception";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PostgresErrorCode } from "../../utils/constants";

@Injectable()
export class OrderService {
  logger: Logger;
  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(OrderService.name);
  }

  async create(userId: string, createOrderDto: CreateOrderDto) {
    try {
      return await this.prismaService.orders.create({
        data: {
          addressId: createOrderDto.addressId,
          status: createOrderDto.status,
          userId,
          orderItems: { create: createOrderDto.orderItems },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION) {
          throw new InvalidRequest(
            `No address found with id: ${createOrderDto.addressId}`,
          );
        }
      }
    }
  }

  async findAll(userId: string, queryParamsDto: QueryParamsDto) {
    const { limit, offset } = queryParamsDto;
    return await this.prismaService.orders.findMany({
      where: { userId },
      take: limit,
      skip: offset,
    });
  }

  async findOne(userId: string, id: string) {
    const order = await this.prismaService.orders.findFirst({
      where: { userId, id },
    });
    if (!order) {
      throw new InvalidRequest(`No order found with id: ${id}`);
    }
    return order;
  }

  async update(userId: string, id: string, updateOrderDto: UpdateOrderDto) {
    try {
      return await this.prismaService.orders.update({
        where: { userId, id },
        data: {
          addressId: updateOrderDto.addressId,
          status: updateOrderDto.status,
          userId,
          orderItems: {
            updateMany: updateOrderDto.orderItems.map((item) => ({
              where: { orderId: id },
              data: {
                quantity: item.quantity,
                price: item.price,
              },
            })),
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_RESOURCE_NOT_FOUND) {
          throw new InvalidRequest(`No order found with id: ${id}`);
        } else if (error.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION) {
          throw new InvalidRequest(
            `No address found with id: ${updateOrderDto.addressId}`,
          );
        }
      }
    }
  }

  async delete(userId: string, id: string) {
    try {
      return await this.prismaService.orders.delete({
        where: { userId, id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_RESOURCE_NOT_FOUND) {
          throw new InvalidRequest(`No order found with id: ${id}`);
        }
      }
    }
  }
}
