import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidRequest extends HttpException {
  constructor(data?: string) {
    super(data ? data : "Invalid payload", HttpStatus.BAD_REQUEST);
  }
}
