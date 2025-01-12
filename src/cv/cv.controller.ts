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
} from '@nestjs/common';
import { CvService } from './cv.service';
import { Cv } from './schema/cv.schema';
import { AuthGuard } from '@nestjs/passport';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cvs')
@UseGuards(AuthGuard('jwt'))
export class CvController {
  constructor(private readonly cvService: CvService) {}

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

  @Get()
  async findAll(): Promise<Cv[]> {
    return this.cvService.getAllCvs();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cv> {
    return this.cvService.getCvById(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Cv> {
    return this.cvService.updateCv(id, updateCvDto, file);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Cv> {
    return this.cvService.deleteCv(id);
  }
}
