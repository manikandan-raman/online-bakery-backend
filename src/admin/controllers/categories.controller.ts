import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../../shared/decorator/roles.decorator";
import { Role } from "../../shared/enum/roles.enum";
import { RolesGuard } from "../../shared/guard/roles.guard";
import { CategoriesService } from "../services/categories.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/categories.dto";
import { QueryParamsDto } from "../dto/query-params.dto";

@Controller("admin/categories")
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@ApiTags("Admin - Categories")
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  addCategories(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.addCategory(createCategoryDto);
  }

  @Get()
  getCategories(@Query() queryParams: QueryParamsDto) {
    return this.categoriesService.getCategories(queryParams);
  }

  @Get(":id")
  getCategoryById(@Param("id") id: string) {
    return this.categoriesService.getCategoryById(id);
  }

  @Patch(":id")
  updateCategories(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(":id")
  deleteCategories(@Param("id") id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
