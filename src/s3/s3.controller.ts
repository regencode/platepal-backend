import { Controller, Query, Get } from "@nestjs/common";
import { S3Service } from "./s3.service";

@Controller("s3")
export class S3Controller {
    constructor(private readonly service: S3Service) {}

    @Get('upload-url')
    async getSignedUrl(@Query('fileName') fileName: string) {
        const signedUrl = await this.service.generateSignedUrl(fileName);
        const publicUrl = this.service.getPublicUrl(fileName);
        return { signedUrl, publicUrl };
    }

}
