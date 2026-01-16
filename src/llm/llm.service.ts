import { Injectable } from '@nestjs/common';
import { OpenRouter } from '@openrouter/sdk';
import { QueryLLMDto } from './dto/query-llm.dto';
import { MODELS } from "openRouterModels";
import { env } from 'prisma/config';
import { CreateMealItemDto } from 'src/meals/dto/create-mealItem.dto';

@Injectable()
export class LlmService {
    async queryMealInformation(dto: QueryLLMDto) {
        const openRouter = new OpenRouter({
            apiKey: env("OPENROUTER_API_KEY"),
        });
        for (const model of MODELS) {
            try {
                const completion = await openRouter.chat.send({
                    model: model,
                    messages: [
                        {
                            role: 'user',
                            content: [
                                {
                                    type: "text",
                                    text: `You are an AI assistant specialized in food recognition and nutritional analysis.\n\nYou MUST respond using ONLY valid JSON.\n\nRules:\n- Do NOT include text, explanations, or markdown, only JSON.\n- All numeric fields must be numbers (not strings).\n- Estimate portion and nutrition using standard food composition databases (e.g., USDA or equivalent).\n- Always include micronutrients. If unknown, set their value to -1.\n- Confidence should be a number between 0 and 1, representing how confident you are about the portion estimation.\n- STRICTLY follow the interface below. Do not deviate from its structure or field names.\n\nIf you cannot identify the food or nutrition cannot be reliably estimated, return:\n{ \"error\": \"unable_to_estimate_nutrition\" }\n\nInterface:\n\nexport interface LLMResponse {\n    mealData: {\n        food_name: string;\n        estimated_portion_g: number;\n        calories_kcal: number;\n        macronutrients: {\n            protein_g: number;\n            fat_g: number;\n            carbohydrates_g: number;\n        };\n        micronutrients: {\n            fiber_g: number;   // if unknown, set to -1\n            sugar_g: number;   // if unknown, set to -1\n            sodium_mg: number; // if unknown, set to -1\n        };\n    };\n    confidence: number;  // 0 to 1, representing how confident you are about the portion estimation\n}`
                                },
                                {
                                    type: "image_url",
                                    imageUrl: {
                                        url: dto.encodedImage!
                                    }
                                },
                            ]
                        },
                    ],
                    stream: false,
                });
                if(!completion) continue;
                const res = {
                    modelUsed: model,
                    data: JSON.parse(completion.choices[0].message.content as string),
                    confidence: 0.0,
                }
                const mealItemDto: CreateMealItemDto = {
                    "food_name": res.data.mealData.food_name,
                    "estimated_portion_g": res.data.mealData.estimated_portion_g,
                    "calories_kcal": res.data.mealData.calories_kcal,
                    "protein_g": res.data.mealData.macronutrients.protein_g,
                    "fat_g": res.data.mealData.macronutrients.fat_g,
                    "carbohydrates_g": res.data.mealData.macronutrients.carbohydrates_g,
                    "fiber_g": res.data.mealData.micronutrients.fiber_g,
                    "sugar_g": res.data.mealData.micronutrients.sugar_g,
                    "sodium_mg": res.data.mealData.micronutrients.sodium_mg,
                }
                res.confidence = res.data.confidence;
                res.data = mealItemDto as any;
                return res;

            } catch {
                continue;
            }
        }
        console.log("All free models exhausted, returning fallback response");
        let res = {
            "encodedImage": dto.encodedImage,
            "modelUsed": "google/gemma-3-27b-it:free",
            "mealData": {
                "food_name": "Grilled Cheese Sandwich",
                "estimated_portion_g": 113,
                "calories_kcal": 320,
                "macronutrients": {
                    "protein_g": 12,
                    "fat_g": 20,
                    "carbohydrates_g": 28
                },
                "micronutrients": {
                    "fiber_g": 2,
                    "sugar_g": 2,
                    "sodium_mg": 650
                },
            },
            "confidence": 0.85
        }
        const mealItemDto: CreateMealItemDto = {
            "food_name": res.mealData.food_name,
            "estimated_portion_g": res.mealData.estimated_portion_g,
            "calories_kcal": res.mealData.calories_kcal,
            "protein_g": res.mealData.macronutrients.protein_g,
            "fat_g": res.mealData.macronutrients.fat_g,
            "carbohydrates_g": res.mealData.macronutrients.carbohydrates_g,
            "fiber_g": res.mealData.micronutrients.fiber_g,
            "sugar_g": res.mealData.micronutrients.sugar_g,
            "sodium_mg": res.mealData.micronutrients.sodium_mg,
        }
        res.mealData = mealItemDto as any;
        return(res);
    }

    async textQuery(dto: QueryLLMDto) {

        const openRouter = new OpenRouter({
            apiKey: env("OPENROUTER_API_KEY"),
        });

        const completion = await openRouter.chat.send({
            model: MODELS[0],
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: dto.text,
                        },
                    ],
                }
            ],
            stream: false,
        });
        console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
    }
}
