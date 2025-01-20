import { IsString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  resumeId: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([
    'PersonalDetail',
    'Contact',
    'Skills',
    'Experiences',
    'Education',
    'Languages',
    'Reference',
  ])
  type: string;

  @IsOptional()
  content: Record<string, any>;
}
