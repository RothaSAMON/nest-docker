import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cv } from './schema/cv.schema';
import { Section } from 'src/section/schema/section.schema';
import { deleteFromS3, uploadToS3 } from 'src/utils/s3.utils';

// @Injectable()
// export class CvService {
//   constructor(
//     @InjectModel(Cv.name) private readonly cvModel: Model<Cv>,
//     @InjectModel(Section.name) private readonly sectionModel: Model<Section>,
//   ) {}

//   async createCv(cvData: Partial<Cv>): Promise<Cv> {
//     const createdCv = new this.cvModel(cvData);
//     return createdCv.save();
//   }

//   async getAllCvs(): Promise<any[]> {
//     return this.cvModel.find().populate('userId').exec();
//   }

//   async getCvById(id: string): Promise<any> {
//     const cv = await this.cvModel.findById(id).populate('userId').exec();
//     if (!cv) throw new Error('CV not found');

//     const sections = await this.sectionModel.find({ resumeId: id }).exec();
//     return { ...cv.toObject(), sections };
//   }

//   async updateCv(id: string, cvData: Partial<Cv>): Promise<Cv> {
//     return this.cvModel.findByIdAndUpdate(id, cvData, { new: true }).exec();
//   }

//   async deleteCv(id: string): Promise<Cv> {
//     return this.cvModel.findByIdAndDelete(id).exec();
//   }
// }
// =====================================================
// @Injectable()
// export class CvService {
//   constructor(
//     @InjectModel(Cv.name) private readonly cvModel: Model<Cv>,
//     @InjectModel(Section.name) private readonly sectionModel: Model<Section>,
//   ) {}

//   async createCv(cvData: Partial<Cv>): Promise<Cv> {
//     const createdCv = new this.cvModel(cvData);
//     return createdCv.save();
//   }

//   async getAllCvs(): Promise<Cv[]> {
//     return this.cvModel.find().populate('userId').exec();
//   }

//   async getCvById(id: string): Promise<any> {
//     const cv = await this.cvModel.findById(id).populate('userId').exec();
//     if (!cv) throw new Error('CV not found');

//     const sections = await this.sectionModel.find({ resumeId: id }).exec();
//     return { ...cv.toObject(), sections };
//   }

//   async updateCv(id: string, cvData: Partial<Cv>): Promise<Cv> {
//     return this.cvModel.findByIdAndUpdate(id, cvData, { new: true }).exec();
//   }

//   async deleteCv(id: string): Promise<Cv> {
//     return this.cvModel.findByIdAndDelete(id).exec();
//   }
// }
@Injectable()
export class CvService {
  constructor(
    @InjectModel(Cv.name) private readonly cvModel: Model<Cv>,
    @InjectModel(Section.name) private readonly sectionModel: Model<Section>,
  ) {}

  async createCv(cvData: Partial<Cv>, file?: Express.Multer.File): Promise<Cv> {
    if (file) {
      const uploadResult = await uploadToS3(file);
      cvData.previewImageUrl = uploadResult.Location; // Save the S3 URL
    }
    const createdCv = new this.cvModel(cvData);
    return createdCv.save();
  }

  async getAllCvs(): Promise<Cv[]> {
    return this.cvModel.find().populate('userId').exec();
  }

  async getCvById(id: string): Promise<any> {
    const cv = await this.cvModel.findById(id).populate('userId').exec();
    if (!cv) throw new Error('CV not found');
    const sections = await this.sectionModel.find({ resumeId: id }).exec();
    return { ...cv.toObject(), sections };
  }

  async updateCv(
    id: string,
    cvData: Partial<Cv>,
    file?: Express.Multer.File,
  ): Promise<Cv> {
    if (file) {
      const existingCv = await this.cvModel.findById(id).exec();
      if (existingCv && existingCv.previewImageUrl) {
        const key = existingCv.previewImageUrl.split('/').pop(); // Extract the key
        await deleteFromS3(`ProfileImage/${key}`);
      }
      const uploadResult = await uploadToS3(file);
      cvData.previewImageUrl = uploadResult.Location;
    }
    return this.cvModel.findByIdAndUpdate(id, cvData, { new: true }).exec();
  }

  async deleteCv(id: string): Promise<Cv> {
    const cv = await this.cvModel.findByIdAndDelete(id).exec();
    if (cv && cv.previewImageUrl) {
      const key = cv.previewImageUrl.split('/').pop(); // Extract the key
      await deleteFromS3(`ProfileImage/${key}`);
    }
    return cv;
  }
}
