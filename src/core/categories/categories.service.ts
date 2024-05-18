import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/service/prisma.service";
import { CreateCategoryDto } from "./dto/categories.dto";

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async addCategory(createCategoryDto: CreateCategoryDto) {
    return await this.prismaService.categories.create({
      data: createCategoryDto,
    });
  }
}
