import { Controller, Get } from '@nestjs/common';
import type { ProfileResponse } from '@portfolio/contracts';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(): Promise<ProfileResponse> {
    return this.profileService.getPublicProfile();
  }
}
