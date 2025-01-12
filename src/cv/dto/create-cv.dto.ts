import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateCvDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsUrl()
  @IsOptional()
  previewImageUrl?: string;
}
