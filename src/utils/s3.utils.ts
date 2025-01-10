import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';

config();

console.log('AWS Access Key:', process.env.ACCESS_KEY);
console.log('AWS Secret Access Key:', process.env.SECRET_ACCESS_KEY);
console.log('AWS Bucket Name:', process.env.BUCKET_NAME);
console.log('AWS Region:', process.env.AWS_REGION);

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

  // Perform the upload
  try {
    const result = await s3.upload(uploadParams).promise();
    return result;
  } catch (error) {
    throw error;
  }
}
