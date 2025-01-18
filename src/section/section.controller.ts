import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { Section } from './schema/section.schema';
import { CreateSectionDto } from './dto/create-section.dto';

@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  async createSection(
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<Section> {
    return this.sectionService.createSection(createSectionDto);
  }

  @Get()
  async findAllSections(): Promise<Section[]> {
    return this.sectionService.findAllSections();
  }

  @Get(':id')
  async findSectionById(@Param('id') id: string): Promise<Section> {
    return this.sectionService.findSectionById(id);
  }

  @Patch(':id')
  async updateSection(
    @Param('id') id: string,
    @Body() updateSectionDto: any,
  ): Promise<Section> {
    return this.sectionService.updateSection(id, updateSectionDto);
  }

  @Delete(':id')
  async deleteSection(@Param('id') id: string): Promise<void> {
    return this.sectionService.deleteSection(id);
  }
}
