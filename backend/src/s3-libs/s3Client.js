import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: 'ru-1',
    endpoint: 'https://s3.timeweb.com',
    credentials: {
        accessKeyId: "",
        secretAccessKey: "",
    }
});

export {s3Client}