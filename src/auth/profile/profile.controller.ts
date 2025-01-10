import {
  Controller,
  Get,
  Put,
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
import { UserId } from '../decorators/param.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@UserId() userId: string): Promise<User> {
    return this.profileService.getProfile(userId);
  }

  @Put()
  async updateProfile(
    @UserId() userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    return this.profileService.updateProfile(userId, updateProfileDto);
  }

  @Patch('/image')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async updateImageProfile(
    @UserId() userId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    return this.profileService.updateImageProfile(userId, file);
  }

  @Delete('/image')
  async deleteImageProfile(@UserId() userId: string): Promise<User> {
    return this.profileService.deleteImageProfile(userId);
  }
}
