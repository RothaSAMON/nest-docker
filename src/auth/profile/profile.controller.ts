import { Controller, Get, Put, Param, Body, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from '../schema/user.schema';
import { UpdateProfileDto } from '../dto/update-profile.dto';

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
  async updateImageProfile(
    @Param('id') id: string,
    @Body('imageProfile') imageProfile: string,
  ): Promise<User> {
    return this.profileService.updateImageProfile(id, imageProfile);
  }
}
