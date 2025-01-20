// import {
//   Controller,
//   Get,
//   Post,
//   Param,
//   Body,
//   Put,
//   Delete,
//   Patch,
// } from '@nestjs/common';
// import { SectionService } from './section.service';
// import { Section } from './schema/section.schema';
// import { CreateSectionDto } from './dto/create-section.dto';

// @Controller('sections')
// export class SectionController {
//   constructor(private readonly sectionService: SectionService) {}

//   @Post()
//   async createSection(
//     @Body() createSectionDto: CreateSectionDto,
//   ): Promise<Section> {
//     return this.sectionService.createSection(createSectionDto);
//   }

//   @Get()
//   async findAllSections(): Promise<Section[]> {
//     return this.sectionService.findAllSections();
//   }

//   @Get(':id')
//   async findSectionById(@Param('id') id: string): Promise<Section> {
//     return this.sectionService.findSectionById(id);
//   }

//   @Patch(':cvId')
//   async updateSection(
//     @Param('cvId') resumeId: string,
//     @Body() updateSectionDto: any,
//   ): Promise<Section> {
//     const { type, content } = updateSectionDto;
//     return this.sectionService.updateSection(resumeId, type, content);
//   }

//   @Delete(':id')
//   async deleteSection(@Param('id') id: string): Promise<void> {
//     return this.sectionService.deleteSection(id);
//   }
// }
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { Section } from './schema/section.schema';
import { CreateSectionDto } from './dto/create-section.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSection(
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<{ message: string; data: Section }> {
    const section = await this.sectionService.createSection(createSectionDto);
    return { message: 'Section created successfully', data: section };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllSections(): Promise<{ message: string; data: Section[] }> {
    const sections = await this.sectionService.findAllSections();
    return { message: 'Sections retrieved successfully', data: sections };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findSectionById(
    @Param('id') id: string,
  ): Promise<{ message: string; data: Section }> {
    const section = await this.sectionService.findSectionById(id);
    return { message: 'Section retrieved successfully', data: section };
  }

  @Patch(':cvId')
  @HttpCode(HttpStatus.OK)
  async updateSection(
    @Param('cvId') resumeId: string,
    @Body() updateSectionDto: any,
  ): Promise<{ message: string; data: Section }> {
    const { type, content } = updateSectionDto;
    const section = await this.sectionService.updateSection(
      resumeId,
      type,
      content,
    );
    return { message: 'Section updated successfully', data: section };
  }

  @Patch(':cvId/image')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  async updateImageUrl(
    @Param('cvId') resumeId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: string; data: Section }> {
    const section = await this.sectionService.updateImageUrl(resumeId, file);
    return { message: 'Image URL updated successfully', data: section };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteSection(@Param('id') id: string): Promise<{ message: string }> {
    await this.sectionService.deleteSection(id);
    return { message: 'Section deleted successfully' };
  }
}
