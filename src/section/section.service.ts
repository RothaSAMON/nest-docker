import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section } from './schema/section.schema';

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

  async updateSection(id: string, updateSectionDto: any): Promise<Section> {
    const section = await this.sectionModel
      .findByIdAndUpdate(id, updateSectionDto, { new: true })
      .exec();
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
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
