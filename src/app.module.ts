import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from "./admin/admin.module";
import { CoreModule } from "./core/core.module";
import { LoggerMiddleware } from "./middlewares/logger.middleware";

@Module({
  imports: [
    SharedModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AdminModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
