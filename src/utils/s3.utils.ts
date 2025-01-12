import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';

config();

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1',
});

export async function uploadToS3(
  file: Express.Multer.File,
): Promise<AWS.S3.ManagedUpload.SendData> {
  const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: `ProfileImage/${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  // It perform the upload
  try {
    const result = await s3.upload(uploadParams).promise();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteFromS3(key: string): Promise<void> {
  const deleteParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };

  // It perfoerm the delete from bucket
  try {
    await s3.deleteObject(deleteParams).promise();
  } catch (error) {
    throw error;
  }
}
