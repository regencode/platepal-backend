import { Controller, Query, Get, UseGuards } from "@nestjs/common";
import { S3Service } from "./s3.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("s3")
export class S3Controller {
    constructor(private readonly service: S3Service) {}

    @UseGuards(JwtAuthGuard)
    @Get('upload-url')
    async getSignedUrl(@Query('fileName') fileName: string) {
        //const signedUrl = await this.service.generateSignedUrl(fileName);
        //const publicUrl = this.service.getPublicUrl(fileName);
        //return { signedUrl, publicUrl };
        return "Not implemented";
    }

}
