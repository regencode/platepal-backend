import { Injectable } from "@nestjs/common";
import { S3Client, PutObjectCommand, S3ServiceException } from "@aws-sdk/client-s3";
import "dotenv/config";

const client = new S3Client([{
    forcePathStyle: true,
    region: process.env.S3_PROJECT_REGION,
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    }
}]);

@Injectable()
export class S3Service {
}
