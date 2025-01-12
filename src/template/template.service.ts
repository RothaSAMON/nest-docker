import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template } from './schema/template.schema';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(Template.name) private readonly templateModel: Model<Template>,
  ) {}

  async createTemplate(templateData: Partial<Template>): Promise<Template> {
    const createdTemplate = new this.templateModel(templateData);
    return createdTemplate.save();
  }

  async getAllTemplates(): Promise<Template[]> {
    return this.templateModel.find().exec();
  }

  async getTemplateById(id: string): Promise<Template> {
    return this.templateModel.findById(id).exec();
  }

  async updateTemplate(
    id: string,
    templateData: Partial<Template>,
  ): Promise<Template> {
    return this.templateModel
      .findByIdAndUpdate(id, templateData, { new: true })
      .exec();
  }

  async deleteTemplate(id: string): Promise<Template> {
    return this.templateModel.findByIdAndDelete(id).exec();
  }
}
