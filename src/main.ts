import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api");
  app.useGlobalPipes(new ValidationPipe());

  /* Swagger Setup */
  const config = new DocumentBuilder()
    .setTitle("Online Bakery Backend")
    .setDescription("API Documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, swaggerDocument);
  await app.listen(3000);
}
bootstrap();
