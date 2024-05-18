import { Controller, Post, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Roles } from "../../shared/decorator/roles.decorator";
import { Role } from "../../shared/enum/roles.enum";
import { RolesGuard } from "../../shared/guard/roles.guard";
import { CreateCategoryDto } from "./dto/categories.dto";

@Controller("categories")
@Roles(Role.Admin)
@UseGuards(RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  addCategories(createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.addCategory(createCategoryDto);
  }
}
