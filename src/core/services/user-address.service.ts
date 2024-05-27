import { Injectable, Logger } from "@nestjs/common";
import {
  CreateUserAddressDto,
  UpdateUserAddressDto,
} from "../dto/user-address.dto";
import { PrismaService } from "../../shared/service/prisma.service";
import { QueryParamsDto } from "../../admin/dto/query-params.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PostgresErrorCode } from "../../utils/constants";
import { InvalidRequest } from "../../shared/exceptions/invalid-request.exception";

@Injectable()
export class UserAddressService {
  logger: Logger;
  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(UserAddressService.name);
  }
  async create(userId: string, createUserAddressdto: CreateUserAddressDto) {
    return await this.prismaService.userAddress.create({
      data: { ...createUserAddressdto, userId },
    });
  }

  async findAll(userId: string, queryParamsDto: QueryParamsDto) {
    const { limit, offset } = queryParamsDto;
    return await this.prismaService.userAddress.findMany({
      where: { userId },
      take: limit,
      skip: offset,
    });
  }

  async findOne(userId: string, id: string) {
    const userAddress = await this.prismaService.userAddress.findFirst({
      where: { userId, id },
    });
    if (!userAddress) {
      throw new InvalidRequest(`No user address found with id: ${id}`);
    }
    return userAddress;
  }

  async update(
    userId: string,
    id: string,
    updateUserAddressdto: UpdateUserAddressDto,
  ) {
    try {
      return await this.prismaService.userAddress.update({
        where: { userId, id },
        data: { ...updateUserAddressdto, userId },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_RESOURCE_NOT_FOUND) {
          throw new InvalidRequest(`No user address found with id: ${id}`);
        }
      }
    }
  }

  async delete(userId: string, id: string) {
    try {
      return await this.prismaService.userAddress.delete({
        where: { userId, id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_RESOURCE_NOT_FOUND) {
          throw new InvalidRequest(`No user address found with id: ${id}`);
        }
      }
    }
  }
}
