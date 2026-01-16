

export interface LLMResponse 
{
    mealData: {
        food_name: string;
        estimated_portion_g: number;
        calories_kcal: number;
        macronutrients: {
            protein_g: number;
            fat_g: number;
            carbohydrates_g: number;
        }
        micronutrients: {
            fiber_g: number;
            sugar_g: number;
            sodium_mg: number;
        }
    }
    confidence: number,
}

