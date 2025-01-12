import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateCvDto {
  @IsString()
  title: string;

  @IsUrl()
  @IsOptional()
  previewImageUrl?: string;
}
