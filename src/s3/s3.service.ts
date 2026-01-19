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
    async generateSignedUrl(fileName: string) {
        const signedUrl = await client.send("putObject", {
            Bucket: process.env.R2_BUCKET,
            Key: fileName,
            Expires: 180,
            ContentType: "image/jpg"
        })
        return signedUrl;
    }
    getPublicUrl(fileName: string) {
        return `https://${ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET}/${fileName}`;
    }
}
