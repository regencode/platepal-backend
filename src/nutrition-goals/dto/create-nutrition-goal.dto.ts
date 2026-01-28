import { IsNumber, IsOptional } from "class-validator";

export class CreateNutritionGoalDto {
    @IsNumber()
    calories_kcal!: number;

    @IsNumber()
    carbohydrates_g!: number;

    @IsNumber()
    fat_g!: number;

    @IsNumber()
    protein_g!: number;
}


export class CreateNutritionGoalWithUserDto extends CreateNutritionGoalDto {
    @IsNumber()
    userId!: number;
}
