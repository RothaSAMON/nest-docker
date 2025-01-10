import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Template {
  @Prop({ required: true })
  name: string;

  @Prop()
  templateImage: string;

  @Prop()
  description: string;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
