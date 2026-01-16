import { Injectable } from "@nestjs/common";
import S3 from "aws-sdk/clients/s3.js";
import "dotenv/config";

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;

const s3 = new S3({
  // Provide your Cloudflare account ID
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  // Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
  accessKeyId: `${ACCESS_KEY_ID}`,
  secretAccessKey: `${SECRET_ACCESS_KEY}`,
  signatureVersion: "v4",
});

@Injectable()
export class S3Service {
    async generateSignedUrl(fileName: string) {
        const signedUrl = await s3.getSignedUrlPromise("putObject", {
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
