import { Module } from '@nestjs/common';
import { AiContextService } from './ai-context.service';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
  controllers: [AiController],
  providers: [AiContextService, AiService],
})
export class AiModule {}
