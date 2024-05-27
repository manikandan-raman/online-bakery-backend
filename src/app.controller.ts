import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { PublicRoute } from "./shared/decorator/public-route.decorator";
import { ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags("Health")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @PublicRoute()
  getHello(): { message: string } {
    return this.appService.getHello();
  }
}
