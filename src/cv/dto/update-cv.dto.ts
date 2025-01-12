import { IsString, IsUrl, IsOptional } from 'class-validator';

export class UpdateCvDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsUrl()
  @IsOptional()
  previewImageUrl?: string;
}
