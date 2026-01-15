import { IsString, IsEmail, IsEnum, IsOptional, MinLength, Matches } from 'class-validator';
import { Role } from "generated/prisma/enums";

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[A-Za-z])/, {
      message: "Password must contain at least one letter",
  })
  @Matches(/(?=.*\d)/, {
      message: "Password must contain at least one number",
  })
  password!: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsString()
  refreshToken?: string;
}
