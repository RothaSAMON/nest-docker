// import {
//   Controller,
//   Post,
//   Body,
//   Get,
//   Param,
//   Patch,
//   Delete,
//   Req,
//   UseGuards,
// } from '@nestjs/common';
// import { CvService } from './cv.service';
// import { Cv } from './schema/cv.schema';
// import { AuthGuard } from '@nestjs/passport';

// @Controller('cvs')
// @UseGuards(AuthGuard('jwt')) // Ensure the user is authenticated
// export class CvController {
//   constructor(private readonly cvService: CvService) {}

//   @Post()
//   async create(@Body() cvData: Partial<Cv>, @Req() req): Promise<Cv> {
//     const userId = req.user._id; // Extract userId from the authenticated user
//     return this.cvService.createCv({ ...cvData, userId });
//   }

//   @Get()
//   async findAll(): Promise<Cv[]> {
//     return this.cvService.getAllCvs();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<any> {
//     return this.cvService.getCvById(id);
//   }

//   @Patch(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() cvData: Partial<Cv>,
//   ): Promise<Cv> {
//     return this.cvService.updateCv(id, cvData);
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: string): Promise<Cv> {
//     return this.cvService.deleteCv(id);
//   }
// }
// =====================================================
// import {
//   Controller,
//   Post,
//   Body,
//   Get,
//   Param,
//   Patch,
//   Delete,
//   Req,
//   UseGuards,
// } from '@nestjs/common';
// import { CvService } from './cv.service';
// import { Cv } from './schema/cv.schema';
// import { AuthGuard } from '@nestjs/passport';

// @Controller('cvs')
// @UseGuards(AuthGuard('jwt')) // Ensure the user is authenticated
// export class CvController {
//   constructor(private readonly cvService: CvService) {}

//   @Post()
//   async create(@Body() cvData: Partial<Cv>, @Req() req): Promise<Cv> {
//     const userId = req.user._id; // Extract userId from the authenticated user
//     return this.cvService.createCv({ ...cvData, userId });
//   }

//   @Get()
//   async findAll(): Promise<Cv[]> {
//     return this.cvService.getAllCvs();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<any> {
//     return this.cvService.getCvById(id);
//   }

//   @Patch(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() cvData: Partial<Cv>,
//   ): Promise<Cv> {
//     return this.cvService.updateCv(id, cvData);
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: string): Promise<Cv> {
//     return this.cvService.deleteCv(id);
//   }
// }

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Req,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { Cv } from './schema/cv.schema';
import { AuthGuard } from '@nestjs/passport';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('cvs')
// @UseGuards(AuthGuard('jwt'))
export class CvController {
  constructor(private readonly cvService: CvService) {}

  // @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createCvDto: CreateCvDto,
    @Req() req,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Cv> {
    const userId = req.user._id;
    return this.cvService.createCv({ ...createCvDto, userId }, file);
  }

  // @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req): Promise<{ message: string; data: Cv[] }> {
    const userId = req.user._id;
    const cvs = await this.cvService.getAllCvs(userId);
    return { message: 'CVs retrieved successfully', data: cvs };
  }

  // @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cv> {
    return this.cvService.getCvById(id);
  }

  // @Public()
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<{ message: string; data: Cv }> {
    const cv = await this.cvService.updateCv(id, updateCvDto, file);
    return { message: 'CV updated successfully', data: cv };
  }

  @Public()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.cvService.deleteCv(id);
    return { message: 'CV deleted successfully' };
  }
}
