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

// Log the credentials and region for debugging
console.log('AWS Credentials:');
console.log('Access Key:', process.env.ACCESS_KEY);
console.log('Secret Key:', process.env.SECRET_ACCESS_KEY);
console.log('Region:', process.env.AWS_REGION);
console.log('Bucket Name:', process.env.BUCKET_NAME);

const s3 = new AWS.S3();

export async function uploadToS3(
  imageProfile: string,
): Promise<AWS.S3.ManagedUpload.SendData> {
  // Log file details
  console.log('Uploading file:');
  console.log('Original Name:', file.originalname);
  console.log('MIME Type:', file.mimetype);
  console.log('Buffer Size:', file.buffer.length);

  const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: `ProfileImage/${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  // Log the upload parameters
  console.log('Upload Parameters:', uploadParams);

  // Perform the upload
  try {
    const result = await s3.upload(uploadParams).promise();
    console.log('Upload Successful:', result);
    return result;
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
}
