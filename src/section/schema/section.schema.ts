// import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
// import mongoose, { Types } from 'mongoose';

// // Define allowed section types
// const SectionTypes = [
//   'PersonalDetail',
//   'Contact',
//   'Skills',
//   'Experiences',
//   'Education',
//   'Languages',
//   'Reference',
// ] as const;

// // Base schema for Section
// @Schema({ timestamps: true })
// export class Section {
//   @Prop({ type: Types.ObjectId, ref: 'Cv', required: true })
//   resumeId: Types.ObjectId;

//   @Prop({ required: true, enum: SectionTypes }) // Restrict to specific types
//   type: string;

//   @Prop({ type: Map, of: mongoose.Schema.Types.Mixed })
//   content: Map<string, any>;

//   @Prop({ default: Date.now })
//   createdAt: Date;

//   @Prop({ default: Date.now })
//   updatedAt: Date;
// }

// export const SectionSchema = SchemaFactory.createForClass(Section);

// // PersonalDetail schema
// @Schema()
// export class PersonalDetail extends Section {
//   @Prop() firstName: string;
//   @Prop() lastName: string;
//   @Prop() imageUrl: string;
//   @Prop() position: string;
//   @Prop() summary: string;
// }

// export const PersonalDetailSchema =
//   SchemaFactory.createForClass(PersonalDetail);

// // Contact schema
// @Schema()
// export class Contact extends Section {
//   @Prop() phoneNumber: string;
//   @Prop() email: string;
//   @Prop() address: string;
// }

// export const ContactSchema = SchemaFactory.createForClass(Contact);

// // Skills schema
// @Schema()
// export class Skills extends Section {
//   @Prop() name: string;
//   @Prop() level: string; // e.g., "beginner", "intermediate", "expert"
// }

// export const SkillsSchema = SchemaFactory.createForClass(Skills);

// // Experiences schema
// @Schema()
// export class Experiences extends Section {
//   @Prop() jobTitle: string;
//   @Prop() position: string;
//   @Prop() startDate: Date;
//   @Prop() endDate: Date;
// }

// export const ExperiencesSchema = SchemaFactory.createForClass(Experiences);

// // Education schema
// @Schema()
// export class Education extends Section {
//   @Prop() schoolName: string;
//   @Prop() degreeMajor: string;
//   @Prop() startDate: Date;
//   @Prop() endDate: Date;
// }

// export const EducationSchema = SchemaFactory.createForClass(Education);

// // Languages schema
// @Schema()
// export class Languages extends Section {
//   @Prop() language: string;
//   @Prop() level: string;
// }

// export const LanguagesSchema = SchemaFactory.createForClass(Languages);

// // Reference schema
// @Schema()
// export class Reference extends Section {
//   @Prop() firstName: string;
//   @Prop() lastName: string;
//   @Prop() position: string;
//   @Prop() company: string;
//   @Prop() email: string;
//   @Prop() phoneNumber: string;
// }

// export const ReferenceSchema = SchemaFactory.createForClass(Reference);

import { BadRequestException } from '@nestjs/common';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

// Define allowed section types
const SectionTypes = [
  'PersonalDetail',
  'Contact',
  'Skills',
  'Experiences',
  'Education',
  'Languages',
  'Reference',
] as const;

// Base schema for Section
@Schema({ timestamps: true })
export class Section {
  @Prop({ type: Types.ObjectId, ref: 'Cv', required: true })
  resumeId: Types.ObjectId;

  @Prop({ required: true, enum: SectionTypes })
  type: string;

  @Prop({ type: Map, of: mongoose.Schema.Types.Mixed })
  content: Map<string, any>;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const SectionSchema = SchemaFactory.createForClass(Section);

const requiredFieldsByType: Record<string, string[]> = {
  PersonalDetail: ['firstName', 'lastName', 'imageUrl', 'position', 'summary'],
  Contact: ['phoneNumber', 'email', 'address'],
  Skills: ['name', 'level'],
  Experiences: ['jobTitle', 'position', 'startDate', 'endDate'],
  Education: ['schoolName', 'degreeMajor', 'startDate', 'endDate'],
  Languages: ['language', 'level'],
  Reference: [
    'firstName',
    'lastName',
    'position',
    'company',
    'email',
    'phoneNumber',
  ],
};

// SectionSchema.pre('save', function (next) {
//   const section = this as any;

//   const requiredFieldsByType: Record<string, string[]> = {
//     PersonalDetail: [
//       'firstName',
//       'lastName',
//       'imageUrl',
//       'position',
//       'summary',
//     ],
//     Contact: ['phoneNumber', 'email', 'address'],
//     Skills: ['name', 'level'],
//     Experiences: ['jobTitle', 'position', 'startDate', 'endDate'],
//     Education: ['schoolName', 'degreeMajor', 'startDate', 'endDate'],
//     Languages: ['language', 'level'],
//     Reference: [
//       'firstName',
//       'lastName',
//       'position',
//       'company',
//       'email',
//       'phoneNumber',
//     ],
//   };

//   const requiredFields = requiredFieldsByType[section.type];

//   if (!requiredFields) {
//     return next(
//       new BadRequestException(`Invalid section type: ${section.type}`),
//     );
//   }

//   // FIX: Access fields directly from the content map using the get() method
//   const missingFields = requiredFields.filter(
//     (field) => !section.content.get(field),
//   );

//   if (missingFields.length > 0) {
//     return next(
//       new BadRequestException(
//         `Validation Error: Missing required fields - ${missingFields.join(', ')}.`,
//       ),
//     );
//   }

//   next();
// });

// PersonalDetail schema

SectionSchema.pre('save', function (next) {
  const section = this as any;

  const requiredFieldsByType: Record<string, string[]> = {
    PersonalDetail: ['firstName', 'lastName'],
    Contact: ['phoneNumber', 'email', 'address'],
    Skills: ['name', 'level'],
    Experiences: ['jobTitle', 'position', 'startDate', 'endDate'],
    Education: ['schoolName', 'degreeMajor', 'startDate', 'endDate'],
    Languages: ['language', 'level'],
    Reference: [
      'firstName',
      'lastName',
      'position',
      'company',
      'email',
      'phoneNumber',
    ],
  };

  const requiredFields = requiredFieldsByType[section.type];

  if (!requiredFields) {
    return next(
      new BadRequestException(`Invalid section type: ${section.type}`),
    );
  }

  // Only check for completely missing content (null or undefined)
  const missingFields = requiredFields.filter(
    (field) =>
      section.content.get(field) === null ||
      section.content.get(field) === undefined,
  );

  if (missingFields.length > 0) {
    return next(
      new BadRequestException(
        `Missing required fields: ${missingFields.join(', ')}`,
      ),
    );
  }

  next();
});

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
  @Prop() level: string;
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
