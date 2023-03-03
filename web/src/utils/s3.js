import { S3Client, ListObjectsCommand, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

export function getConnection() {
    return JSON.parse(window.localStorage.getItem('connection'));
}

export function getS3Client() {
    const s3 = new S3Client(getConnection());
    return s3;
}

export async function getList(Prefix) {
    const s3 = getS3Client();
    const data = s3.send(new ListObjectsCommand({Bucket: getConnection().Bucket, Prefix}));
    return (await data).Contents ? (await data).Contents : [];
}

export async function uploadFile({Key, Body}) {
    const s3 = getS3Client();
    try {
        const data = await s3.send(new PutObjectCommand({
            Bucket: getConnection().Bucket,
            Key,
            Body,
        }));
        return await data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export async function deleteFile({Key}) {
    const s3 = getS3Client();
    return await s3.send(new DeleteObjectCommand({
        Bucket: getConnection().Bucket,
        Key,
    }));
}

export async function downloadFile({Key}) {
    const s3 = getS3Client();
    let data = await s3.send(new GetObjectCommand({
        Bucket: getConnection().Bucket,
        Key,
    }));
    data = new Blob([await data.Body.transformToByteArray()]);
    let csvURL = await window.URL.createObjectURL(data);
    let tempLink = await document.createElement('a');
    tempLink.href = await csvURL;
    tempLink.setAttribute('download', Key.split('/').at(-1));
    tempLink.click();
}