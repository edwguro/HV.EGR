import { Controller, Get } from '@nestjs/common';
import type { HealthResponse } from '@portfolio/contracts';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getStatus(): HealthResponse {
    return this.healthService.getStatus();
  }
}
