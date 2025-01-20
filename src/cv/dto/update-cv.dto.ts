import { IsString, IsUrl, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateCvDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsUrl()
  @IsOptional()
  previewImageUrl?: string;

  // @IsMongoId()
  // @IsOptional()
  // templateId?: Types.ObjectId;

  @IsString()
  @IsOptional()
  templateUrl: string;
}
