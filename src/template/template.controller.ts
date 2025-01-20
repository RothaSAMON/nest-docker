import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { Template } from './schema/template.schema';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async create(@Body() templateData: Partial<Template>): Promise<Template> {
    return this.templateService.createTemplate(templateData);
  }

  @Get()
  async findAll(): Promise<Template[]> {
    return this.templateService.getAllTemplates();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Template> {
    return this.templateService.getTemplateById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() templateData: Partial<Template>,
  ): Promise<Template> {
    return this.templateService.updateTemplate(id, templateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Template> {
    return this.templateService.deleteTemplate(id);
  }
}
