import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LlmService } from './llm.service';
import { QueryLLMDto } from './dto/query-llm.dto';

@Controller('llm')
export class LlmController {
    constructor(private readonly llmService: LlmService) {}

    @Post()
    queryMealInformation(@Body() dto: QueryLLMDto) {
        if(!dto.encodedImage) {
            return this.llmService.textQuery(dto);
        }
        return this.llmService.queryMealInformation(dto);
    }
}
