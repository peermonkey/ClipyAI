"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
exports.getUploadUrl = getUploadUrl;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const REGION = process.env.AWS_REGION || 'us-east-1';
const s3 = new client_s3_1.S3Client({
    region: REGION,
    endpoint: process.env.S3_ENDPOINT || undefined,
    forcePathStyle: !!process.env.S3_ENDPOINT, // needed for MinIO
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
    },
});
exports.s3 = s3;
async function getUploadUrl(key, contentType, expiresInSeconds = 3600) {
    const command = new client_s3_1.PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        ContentType: contentType,
    });
    const url = await (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: expiresInSeconds });
    return url;
}
