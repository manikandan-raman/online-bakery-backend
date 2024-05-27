import { Controller, Get } from "@nestjs/common";
import { CategoriesService } from "../services/categories.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("categories")
@ApiTags("Categories")
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.findAll();
  }
}
