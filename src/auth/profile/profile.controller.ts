import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  Patch,
  UploadedFile,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from '../schema/user.schema';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<User> {
    return this.profileService.getProfile(id);
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    return this.profileService.updateProfile(id, updateProfileDto);
  }

  @Patch(':id/image')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async updateImageProfile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    return this.profileService.updateImageProfile(id, file);
  }

  @Delete(':id/image')
  async deleteImageProfile(@Param('id') id: string): Promise<User> {
    return this.profileService.deleteImageProfile(id);
  }
}
