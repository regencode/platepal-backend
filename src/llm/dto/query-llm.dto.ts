import { IsString } from "class-validator";


export class QueryLLMDto{
    @IsString()
    text?: string;

    @IsString()
    encodedImage?: string;
}
