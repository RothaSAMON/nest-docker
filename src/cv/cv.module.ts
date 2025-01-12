import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { Cv, ResumeSchema } from './schema/cv.schema';
import { Section, SectionSchema } from 'src/section/schema/section.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cv.name, schema: ResumeSchema },
      { name: Section.name, schema: SectionSchema },
    ]),
  ],
  providers: [CvService],
  controllers: [CvController],
})
export class CvModule {}
