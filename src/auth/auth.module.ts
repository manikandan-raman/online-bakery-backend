import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthService } from "./auth.service";
import { SharedModule } from "../shared/shared.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    SharedModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configSerivce: ConfigService) => ({
        secret: configSerivce.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "5m" },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    JwtStrategy,
  ],
})
export class AuthModule {}
