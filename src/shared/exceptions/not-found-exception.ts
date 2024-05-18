import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFound extends HttpException {
  constructor(data?: string) {
    super(data ? data : "Not found", HttpStatus.NOT_FOUND);
  }
}
