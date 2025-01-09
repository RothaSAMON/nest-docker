import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

export async function uploadToS3(
  imageProfile: string,
): Promise<AWS.S3.ManagedUpload.SendData> {
  const buffer = Buffer.from(imageProfile, 'base64');
  const uploadParams = {
    Bucket: 'your-bucket-name',
    Key: `${uuidv4()}.jpg`,
    Body: buffer,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
  };

  return s3.upload(uploadParams).promise();
}
