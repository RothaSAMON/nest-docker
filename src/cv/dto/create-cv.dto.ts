import { IsString, IsUrl, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCvDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsUrl()
  @IsOptional()
  previewImageUrl?: string;

  // @IsMongoId()
  // templateId: Types.ObjectId;

  @IsString()
  @IsOptional()
  templateUrl: string;
}
