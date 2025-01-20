import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Section } from './schema/section.schema';
import { uploadToS3 } from 'src/utils/s3.utils';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Section.name) private readonly sectionModel: Model<Section>,
  ) {}

  private readonly allowedTypes = [
    'PersonalDetail',
    'Contact',
    'Skills',
    'Experiences',
    'Education',
    'Languages',
    'Reference',
  ];

  async createSection(createSectionDto: any): Promise<Section> {
    const { type } = createSectionDto;

    // Validate the type field
    if (!this.allowedTypes.includes(type)) {
      throw new BadRequestException(
        `Invalid section type: ${type}. Allowed types are: ${this.allowedTypes.join(', ')}`,
      );
    }

    const section = new this.sectionModel(createSectionDto);
    return section.save();
  }

  async findAllSections(): Promise<Section[]> {
    return this.sectionModel.find().exec();
  }

  async findSectionById(id: string): Promise<Section> {
    const section = await this.sectionModel.findById(id).exec();
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
    return section;
  }

  async updateSection(
    resumeId: string,
    type: string,
    content: any,
  ): Promise<Section> {
    const convertedResumeId = new mongoose.Types.ObjectId(resumeId);
    const section = await this.sectionModel
      .findOneAndUpdate(
        { resumeId: convertedResumeId, type },
        { $set: { content } },
        { new: true },
      )
      .exec();
    console.log('Section updated👋', section);
    console.log('Resume ID:', resumeId);
    console.log('Type:', type);
    console.log('Content:', content);

    if (!section) {
      throw new NotFoundException(`Section with ID ${resumeId} not found`);
    }
    return section;
  }

  async updateImageUrl(
    resumeId: string,
    file: Express.Multer.File,
  ): Promise<Section> {
    const uploadResult = await uploadToS3(file);
    const imageUrl = uploadResult.Location;

    const section = await this.sectionModel
      .findOneAndUpdate(
        { resumeId: new Types.ObjectId(resumeId), type: 'PersonalDetail' },
        { $set: { 'content.imageUrl': imageUrl } },
        { new: true },
      )
      .exec();
    if (!section) {
      throw new NotFoundException(
        `PersonalDetail section not found for CV with ID ${resumeId}`,
      );
    }
    return section;
  }

  async deleteSection(id: string): Promise<void> {
    const result = await this.sectionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
  }
}
