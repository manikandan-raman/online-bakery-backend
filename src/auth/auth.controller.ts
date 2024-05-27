import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { PublicRoute } from "../shared/decorator/public-route.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("Auth")
@ApiBearerAuth()
@PublicRoute()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("/register")
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post("/login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
