import { Module } from "@nestjs/common";
import { CategoriesService } from "./services/categories.service";
import { CategoriesController } from "./controllers/categories.controller";
import { SharedModule } from "../shared/shared.module";
import { UserAddressController } from "./controllers/user-address.controller";
import { UserAddressService } from "./services/user-address.service";
import { CartController } from "./controllers/cart.controller";
import { RatingReviewController } from "./controllers/rating-review.controller";
import { OrderController } from "./controllers/order.controller";
import { CartService } from "./services/cart.service";
import { OrderService } from "./services/order.service";
import { RatingReviewService } from "./services/rating-review.service";
import { PaymentController } from "./controllers/payment.controller";
import { PaymentService } from "./services/payment.service";

@Module({
  imports: [SharedModule],
  controllers: [
    CategoriesController,
    UserAddressController,
    CartController,
    RatingReviewController,
    OrderController,
    PaymentController,
  ],
  providers: [
    CategoriesService,
    UserAddressService,
    CartService,
    RatingReviewService,
    OrderService,
    PaymentService,
  ],
})
export class CoreModule {}
