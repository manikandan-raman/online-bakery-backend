import { Injectable } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { PrismaService } from "../shared/service/prisma.service";
import * as bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { InvalidRequest } from "../shared/exceptions/invalid-request.exception";
import { NotFound } from "../shared/exceptions/not-found-exception";
import { JwtService } from "@nestjs/jwt";
import { PostgresErrorCode } from "../utils/constants";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    try {
      registerDto.password = await bcrypt.hash(registerDto.password, 10);
      const user = await this.prismaService.user.create({ data: registerDto });
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
          throw new InvalidRequest("User already exists");
        }
      }
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { email: loginDto.email },
      });
      if (!bcrypt.compareSync(loginDto.password, user.password)) {
        throw new InvalidRequest("Invalid password");
      }
      delete user.password;
      return { user, token: this.jwtService.sign({ user }) };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PostgresErrorCode.UNIQUE_RESOURCE_NOT_FOUND) {
          throw new NotFound("User not found");
        }
      }
    }
  }
}
