import { IsString, IsNotEmpty, IsIn } from 'class-validator';

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

  @IsNotEmpty()
  content: Record<string, any>;
}
