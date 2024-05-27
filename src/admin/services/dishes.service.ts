import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../shared/service/prisma.service";
import { CreateDishDto, UpdateDishDto } from "../dto/dishes.dto";
import { NotFound } from "../../shared/exceptions/not-found-exception";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PostgresErrorCode } from "../../utils/constants";
import { QueryParamsDto } from "../dto/query-params.dto";
import { InvalidRequest } from "../../shared/exceptions/invalid-request.exception";

@Injectable()
export class DishesService {
  logger: Logger;

  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(DishesService.name);
  }

  async addDish(createDishDto: CreateDishDto) {
    try {
      return await this.prismaService.dishes.create({
        data: createDishDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION) {
          throw new InvalidRequest(
            `No category found with id: ${createDishDto.categoryId}`,
          );
        }
      }
    }
  }

  async getDishes(queryParams: QueryParamsDto) {
    const { limit, offset } = queryParams;
    return await this.prismaService.dishes.findMany({
      take: limit,
      skip: offset,
    });
  }

  async getDishById(id: string) {
    const dish = await this.prismaService.dishes.findFirst({ where: { id } });
    if (!dish) {
      throw new NotFound("Dish not found");
    }
    return dish;
  }

  async updateDish(id: string, updateDishDto: UpdateDishDto) {
    try {
      return await this.prismaService.dishes.update({
        where: { id },
        data: updateDishDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_RESOURCE_NOT_FOUND) {
          throw new NotFound("Dish not found");
        }
      }
    }
  }

  async deleteDish(id: string) {
    return await this.prismaService.dishes.delete({
      where: { id },
    });
  }
}
