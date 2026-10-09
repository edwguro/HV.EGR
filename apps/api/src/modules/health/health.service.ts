import { Injectable } from '@nestjs/common';
import type { HealthResponse } from '@portfolio/contracts';

@Injectable()
export class HealthService {
  getStatus(): HealthResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
