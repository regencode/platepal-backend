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
        throw new Error("All free models exhausted");
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
