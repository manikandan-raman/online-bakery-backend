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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DishesService } from "../services/dishes.service";
import { CreateDishDto, UpdateDishDto } from "../dto/dishes.dto";
import { QueryParamsDto } from "../dto/query-params.dto";

@Controller("admin/dishes")
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@ApiTags("Admin - Dishes")
@ApiBearerAuth()
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  addCategories(@Body() createDishDto: CreateDishDto) {
    return this.dishesService.addDish(createDishDto);
  }

  @Get()
  getDishes(@Query() queryParams: QueryParamsDto) {
    return this.dishesService.getDishes(queryParams);
  }

  @Get(":id")
  getDishById(@Param("id") id: string) {
    return this.dishesService.getDishById(id);
  }

  @Patch(":id")
  updateDishes(@Param("id") id: string, @Body() updateDishDto: UpdateDishDto) {
    return this.dishesService.updateDish(id, updateDishDto);
  }

  @Delete(":/id")
  deleteDishes(@Param("id") id: string) {
    return this.dishesService.deleteDish(id);
  }
}
