import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../shared/service/prisma.service";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/categories.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PostgresErrorCode } from "../../utils/constants";
import { InvalidRequest } from "../../shared/exceptions/invalid-request.exception";
import { NotFound } from "../../shared/exceptions/not-found-exception";
import { QueryParamsDto } from "../dto/query-params.dto";

@Injectable()
export class CategoriesService {
  logger: Logger;

  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(CategoriesService.name);
  }

  async addCategory(createCategoryDto: CreateCategoryDto) {
    return await this.prismaService.categories.create({
      data: createCategoryDto,
    });
  }

  async getCategories(queryParams: QueryParamsDto) {
    const { limit = 10, offset = 0 } = queryParams;
    return await this.prismaService.categories.findMany({
      take: limit,
      skip: offset,
    });
  }

  async getCategoryById(id: string) {
    const category = await this.prismaService.categories.findFirst({
      where: { id },
    });
    if (!category) {
      throw new NotFound("Category not found");
    }
    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prismaService.categories.update({
        where: { id },
        data: updateCategoryDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_RESOURCE_NOT_FOUND) {
          throw new NotFound("Category not found");
        }
      }
    }
  }

  async deleteCategory(id: string) {
    try {
      return await this.prismaService.categories.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION) {
          throw new InvalidRequest("This Category was used by a dish");
        }
      }
    }
  }
}
