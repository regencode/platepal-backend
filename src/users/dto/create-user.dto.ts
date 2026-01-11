import {IsEmail, IsString, IsOptional, IsEnum } from "class-validator";
import { Role } from "generated/prisma/enums";

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsString()
  refreshToken?: string;
}
