import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { MembershipTier } from "generated/prisma/enums";

export class CreateMembershipDto {
    
    @IsOptional()
    @Type(() => Date) 
    @IsDate()
    expiresAt?: Date;

    @IsEnum(MembershipTier)
    tier!: MembershipTier
}
