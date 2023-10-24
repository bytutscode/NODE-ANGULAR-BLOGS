import aws from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const endpoint = new aws.Endpoint(process.env.AWS_URL as string);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.AWS_KEYID as string,
        secretAccessKey: process.env.AWS_APPLICATIONKEY as string
    }
});

export const uploadImage = async (Key: string, minitype: string, data: Buffer): Promise<string> => {
    const newName = String(Date.now()) + Math.random().toString() + Key; // just to make sure that the file name will be unique.
    const image = await s3.upload({
        Key: newName,
        Bucket: process.env.AWS_KEYNAME as string,
        ContentType: minitype,
        Body: data
    }).promise()
    return image.Key;
}

export const deleteImage = async (Key: string): Promise<object> => {
    const image = await s3.deleteObject({
        Bucket: process.env.AWS_KEYNAME as string,
        Key
    }).promise()
    return image;
}

