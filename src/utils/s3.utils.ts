import * as AWS from 'aws-sdk';
import { configDotenv } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
configDotenv();

// Load credentials from environment variables
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export async function uploadToS3(
  imageProfile: string,
): Promise<AWS.S3.ManagedUpload.SendData> {
  const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: `ProfileImage/${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  // Perform the upload
  try {
    const result = await s3.upload(uploadParams).promise();

    return result;
  } catch (error) {
    throw error;
  }
}
