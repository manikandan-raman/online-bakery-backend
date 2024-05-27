import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../shared/service/prisma.service";

@Injectable()
export class CategoriesService {
  logger: Logger;
  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(CategoriesService.name);
  }

  async findAll() {
    return await this.prismaService.categories.findMany();
  }
}
