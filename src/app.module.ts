import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { CategoriesModule } from "./core/categories/categories.module";

@Module({
  imports: [
    SharedModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
