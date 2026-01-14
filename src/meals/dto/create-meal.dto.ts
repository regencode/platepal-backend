import { IsString } from "class-validator"

export class CreateMealDto {
    @IsString()
    name!: string;
}
