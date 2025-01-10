import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

// Base schema for Section
@Schema({ timestamps: true })
export class Section {
  @Prop({ type: Types.ObjectId, ref: 'Resume', required: true })
  resumeId: Types.ObjectId;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Map, of: mongoose.Schema.Types.Mixed })
  content: Map<string, any>;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const SectionSchema = SchemaFactory.createForClass(Section);

// PersonalDetail schema
@Schema()
export class PersonalDetail extends Section {
  @Prop() firstName: string;
  @Prop() lastName: string;
  @Prop() imageUrl: string;
  @Prop() position: string;
  @Prop() summary: string;
}

export const PersonalDetailSchema =
  SchemaFactory.createForClass(PersonalDetail);

// Contact schema
@Schema()
export class Contact extends Section {
  @Prop() phoneNumber: string;
  @Prop() email: string;
  @Prop() address: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

// Skills schema
@Schema()
export class Skills extends Section {
  @Prop() name: string;
  @Prop() level: string; // e.g., "beginner", "intermediate", "expert"
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);

// Experiences schema
@Schema()
export class Experiences extends Section {
  @Prop() jobTitle: string;
  @Prop() position: string;
  @Prop() startDate: Date;
  @Prop() endDate: Date;
}

export const ExperiencesSchema = SchemaFactory.createForClass(Experiences);

// Education schema
@Schema()
export class Education extends Section {
  @Prop() schoolName: string;
  @Prop() degreeMajor: string;
  @Prop() startDate: Date;
  @Prop() endDate: Date;
}

export const EducationSchema = SchemaFactory.createForClass(Education);

// Languages schema
@Schema()
export class Languages extends Section {
  @Prop() language: string;
  @Prop() level: string;
}

export const LanguagesSchema = SchemaFactory.createForClass(Languages);

// Reference schema
@Schema()
export class Reference extends Section {
  @Prop() firstName: string;
  @Prop() lastName: string;
  @Prop() position: string;
  @Prop() company: string;
  @Prop() email: string;
  @Prop() phoneNumber: string;
}

export const ReferenceSchema = SchemaFactory.createForClass(Reference);
