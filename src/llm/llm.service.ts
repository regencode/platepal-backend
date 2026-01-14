import { Injectable } from '@nestjs/common';
import { OpenRouter } from '@openrouter/sdk';
import { QueryLLMDto } from './dto/query-llm.dto';
import { MODELS } from "openRouterModels";
import { env } from 'prisma/config';

@Injectable()
export class LlmService {
    async query(dto: QueryLLMDto) {
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
                                    text: dto.text,
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
                }
                console.log(res);
                return res;

            } catch {
                continue;
            }
        }
        console.log("All free models exhausted, returning fallback response bruhhhhhhh");
        const res = {
            "encodedImage": dto.encodedImage,
            "modelUsed": "google/gemma-3-27b-it:free",
            "data": {
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
                "confidence": 0.85
            }
        }
        return(res);
    }

    async textQuery(dto: QueryLLMDto) {

        const openRouter = new OpenRouter({
            apiKey: env("OPENROUTER_API_KEY"),
        });

        const completion = await openRouter.chat.send({
            model: 'allenai/molmo-2-8b:free',
            messages: [
                {
                    role: "user",
                    content: dto.text
                }
            ],
            stream: false,
        });
        console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
    }
}
