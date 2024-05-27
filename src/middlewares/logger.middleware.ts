import { NestMiddleware, Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("Http");
  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get("user-agent") || "";

    response.on("finish", () => {
      const { statusCode } = response;
      const contentLength = response.get("content-length");

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
      if (["POST", "PATCH"].includes(request.method)) {
        this.logger.log(request.body);
      }
    });

    next();
  }
}
