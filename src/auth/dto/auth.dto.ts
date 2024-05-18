import { OmitType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class TokenPayload extends OmitType(RegisterDto, ["password"]) {}
