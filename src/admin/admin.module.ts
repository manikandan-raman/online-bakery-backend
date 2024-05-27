import { Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";
import { CategoriesController } from "./controllers/categories.controller";
import { CategoriesService } from "./services/categories.service";
import { DishesController } from "./controllers/dishes.controller";
import { DishesService } from "./services/dishes.service";

@Module({
  imports: [SharedModule],
  controllers: [CategoriesController, DishesController],
  providers: [CategoriesService, DishesService],
})
export class AdminModule {}
