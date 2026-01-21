import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateMealItemDto {
    @IsString()
    food_name!: string;

    @IsNumber()
    estimated_portion_g!: number;

    @IsNumber()
    calories_kcal!: number;

    @IsNumber()
    protein_g!: number;

    @IsNumber()
    fat_g!: number;

    @IsNumber()
    carbohydrates_g!: number;

    @IsNumber()
    @IsOptional()
    fiber_g?: number;

    @IsNumber()
    @IsOptional()
    sugar_g?: number;

    @IsNumber()
    @IsOptional()
    sodium_mg?: number;

    @IsString()
    @IsOptional()
    imageUri?: string;

    @IsString()
    @IsOptional()
    imageSrc?: string;
}
