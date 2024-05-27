import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../shared/service/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { QueryParamsDto } from "../../admin/dto/query-params.dto";
import { InvalidRequest } from "../../shared/exceptions/invalid-request.exception";
import { PostgresErrorCode } from "../../utils/constants";
import { CreatePaymentDto, UpdatePaymentDto } from "../dto/payment.dto";

@Injectable()
export class PaymentService {
  logger: Logger;
  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(PaymentService.name);
  }

  async create(userId: string, createPaymentDto: CreatePaymentDto) {
    return await this.prismaService.payments.create({
      data: { ...createPaymentDto, userId },
    });
  }

  async findAll(userId: string, queryParamsDto: QueryParamsDto) {
    const { limit, offset } = queryParamsDto;
    return await this.prismaService.payments.findMany({
      where: { userId },
      take: limit,
      skip: offset,
    });
  }

  async findOne(userId: string, id: string) {
    const payment = await this.prismaService.payments.findFirst({
      where: { userId, id },
    });
    if (!payment) {
      throw new InvalidRequest(`No payment found with id: ${id}`);
    }
    return payment;
  }

  async update(userId: string, id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      return await this.prismaService.payments.update({
        where: { userId, id },
        data: { ...updatePaymentDto, userId },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_RESOURCE_NOT_FOUND) {
          throw new InvalidRequest(`No payment found with id: ${id}`);
        }
      }
    }
  }

  async delete(userId: string, id: string) {
    try {
      return await this.prismaService.payments.delete({
        where: { userId, id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_RESOURCE_NOT_FOUND) {
          throw new InvalidRequest(`No payment found with id: ${id}`);
        }
      }
    }
  }
}
